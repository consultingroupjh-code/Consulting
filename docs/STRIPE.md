# Integración de Stripe: guía de implementación

Esta guía explica qué hace falta y en qué orden para cobrar servicios con Stripe en **consultingroup** (React + Vite desplegado en Vercel).

---

## 1. Cómo va a funcionar

Usaremos **Stripe Checkout** (la página de pago alojada por Stripe). Es la opción más rápida y segura: Stripe se encarga del formulario de tarjeta, 3D Secure, Apple Pay/Google Pay y el cumplimiento PCI. Nosotros nunca tocamos datos de tarjeta.

```
Usuario                 Frontend (React)          /api (Vercel Functions)          Stripe
   │  clic "Pagar"  ──►  POST /api/checkout  ──►  crea Checkout Session  ──►   devuelve URL
   │                     ◄── { url } ─────────────────────────────────────────────┘
   │  redirección a checkout.stripe.com  ──────────────────────────────────────►  paga
   │  ◄── vuelve a /pago-exitoso o /pago-cancelado
   │                                              /api/webhook  ◄── checkout.session.completed
   │                                              (confirma el pago, envía correo, etc.)
```

Piezas:

| Pieza | Dónde | Para qué |
|---|---|---|
| Productos y precios | Dashboard de Stripe | Definir cada servicio y cuánto cuesta |
| `api/checkout.js` | Función serverless en Vercel | Crear la sesión de pago con la clave secreta |
| `api/webhook.js` | Función serverless en Vercel | Recibir la confirmación real del pago |
| Botones "Pagar" | React | Llamar a `/api/checkout` y redirigir |
| Páginas de resultado | React | `/pago-exitoso` y `/pago-cancelado` |

> Regla de oro: **la clave secreta (`sk_...`) solo vive en el servidor** (variables de entorno de Vercel). Nunca en código React ni en variables `VITE_*`, porque esas se publican en el navegador.

---

## 2. Requisitos previos (lo que hace falta)

### 2.1 Cuenta de Stripe
- [ ] Crear cuenta en https://dashboard.stripe.com/register
- [ ] **Verificar que el país de tu negocio sea compatible con Stripe** (https://stripe.com/global). Si tu empresa no está en un país compatible, una alternativa habitual es una LLC en EE. UU. (por ejemplo con Stripe Atlas). Esto hay que resolverlo antes de todo lo demás.
- [ ] Para cobrar en vivo, completar la activación de la cuenta: datos legales de la empresa, representante, **cuenta bancaria** para los depósitos y descriptor de cobro (el nombre que aparece en el estado de cuenta del cliente).
- [ ] Mientras tanto se puede desarrollar todo en **modo de prueba** (test mode) sin activar la cuenta.

### 2.2 Hosting en Vercel: ojo con el plan
- [ ] El plan **Hobby (gratis) de Vercel es solo para uso personal y no comercial**, según sus términos. Un sitio de empresa que cobra servicios es uso comercial, así que lo correcto es el plan **Pro** (de pago, por miembro y por mes).
- Opciones si se quiere mantener costo cero:
  - Desarrollar y probar en Hobby, y pasar a Pro al empezar a cobrar en vivo.
  - Alternativas cuyo plan gratuito sí permite uso comercial (por ejemplo Cloudflare Pages + Workers o Netlify). La lógica de esta guía es la misma; solo cambia dónde viven las funciones.
- Revisa los términos vigentes de cada proveedor antes de decidir; cambian con el tiempo.

### 2.3 Herramientas locales
- [ ] Node.js 18+ (ya instalado)
- [ ] Vercel CLI: `npm i -g vercel`, que permite correr `/api` en local con `vercel dev`
- [ ] Stripe CLI (https://docs.stripe.com/stripe-cli), que permite recibir webhooks en local

### 2.4 Decisiones de negocio (definir antes de programar)
- [ ] **Qué se cobra en línea**: ¿un precio fijo por servicio? ¿un anticipo (por ejemplo, 50%)? ¿la consulta inicial? Los servicios con presupuesto a medida suelen cobrarse con **Payment Links** o **facturas** de Stripe en lugar de un botón público.
- [ ] **Pago único o suscripción**: por ejemplo, gestión de redes o SEO mensual = suscripción (`mode: 'subscription'`).
- [ ] **Moneda** (USD) y si los precios incluyen impuestos. Revisar **Stripe Tax** si hace falta calcular sales tax en EE. UU.
- [ ] **Política de reembolsos y términos de servicio**: Stripe y los clientes los exigen. Hoy los enlaces del footer apuntan a `#`.
- [ ] Qué pasa después del pago: correo de confirmación, aviso al equipo, registro en CRM, etc.

---

## 3. Paso a paso

### Paso 1: Crear productos y precios en Stripe
1. Dashboard → (modo prueba) → **Catálogo de productos** → **Añadir producto**.
2. Crear un producto por servicio cobrable (por ejemplo "Landing Page", "Gestión de Redes, mensual").
3. Copiar el **Price ID** de cada uno (`price_...`).

### Paso 2: Variables de entorno
Las claves están en Dashboard → **Desarrolladores → Claves de API**.

`.env.local` (local, no se sube a git):
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

En Vercel: **Project → Settings → Environment Variables**, con las mismas variables. Usa claves `sk_test_` en *Preview* y `sk_live_` solo en *Production* cuando la cuenta esté activada.

### Paso 3: Instalar el SDK
```bash
npm install stripe
```
No hace falta `@stripe/stripe-js` en el frontend: con Checkout basta con redirigir a la URL que devuelve el servidor.

### Paso 4: Catálogo de precios en el servidor
`api/_prices.js` (el prefijo `_` evita que Vercel lo exponga como endpoint):
```js
// El cliente solo envía el id del servicio; el precio real se decide aquí.
export const PRICES = {
  landing: { price: 'price_XXXX', mode: 'payment' },
  'redes-mensual': { price: 'price_YYYY', mode: 'subscription' },
}
```
> Nunca aceptes montos enviados desde el navegador: cualquiera podría modificarlos.

### Paso 5: Función que crea la sesión de pago
`api/checkout.js`:
```js
import Stripe from 'stripe'
import { PRICES } from './_prices.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  const { serviceId, email } = await request.json()
  const item = PRICES[serviceId]
  if (!item) return Response.json({ error: 'Servicio no válido' }, { status: 400 })

  const origin = new URL(request.url).origin
  const session = await stripe.checkout.sessions.create({
    mode: item.mode,
    line_items: [{ price: item.price, quantity: 1 }],
    customer_email: email || undefined,
    success_url: `${origin}/pago-exitoso?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pago-cancelado`,
    metadata: { serviceId },
  })

  return Response.json({ url: session.url })
}
```

### Paso 6: Webhook (confirmación real del pago)
La página de éxito **no** es prueba de pago (el usuario puede cerrar la pestaña o escribir la URL a mano). La confirmación fiable es el webhook.

`api/webhook.js`:
```js
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  const signature = request.headers.get('stripe-signature')
  const body = await request.text() // cuerpo crudo, necesario para verificar la firma

  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return new Response(`Firma inválida: ${err.message}`, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      // TODO: enviar correo, registrar en CRM, avisar al equipo...
      console.log('Pago completado', session.id, session.metadata.serviceId)
      break
    }
    case 'invoice.payment_failed':
      // Solo para suscripciones: avisar al cliente
      break
  }

  return new Response('ok')
}
```
Registrar el endpoint: Dashboard → **Desarrolladores → Webhooks → Añadir endpoint** → `https://TU-DOMINIO/api/webhook`, evento `checkout.session.completed` (y los de suscripción si aplica). Copiar el **Signing secret** (`whsec_...`) a `STRIPE_WEBHOOK_SECRET`.

### Paso 7: Botón de pago en React
```jsx
async function pagar(serviceId) {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ serviceId }),
  })
  const { url, error } = await res.json()
  if (url) window.location.href = url
  else alert(error)
}
```
Lo natural es crear una sección o página de **Planes y precios** con un botón "Contratar" por servicio. Hoy las tarjetas de servicios solo llevan al formulario de contacto.

### Paso 8: Páginas de resultado
- `/pago-exitoso`: agradecimiento y próximos pasos. Opcionalmente se consulta `session_id` desde una función `api/session.js` para mostrar el resumen.
- `/pago-cancelado`: mensaje y botón para reintentar.

Para tener rutas reales hace falta un router (`npm install react-router-dom`). `vercel.json` ya redirige las rutas a `index.html`.

### Paso 9: Probar en local
```bash
vercel dev                                             # sirve React + /api en http://localhost:3000
stripe login
stripe listen --forward-to localhost:3000/api/webhook  # imprime un whsec_ temporal para .env.local
```
Tarjetas de prueba (cualquier fecha futura y CVC):

| Número | Resultado |
|---|---|
| `4242 4242 4242 4242` | Pago exitoso |
| `4000 0025 0000 3155` | Requiere autenticación 3D Secure |
| `4000 0000 0000 9995` | Rechazada (fondos insuficientes) |

### Paso 10: Pasar a producción
- [ ] Cuenta de Stripe activada (paso 2.1)
- [ ] Productos y precios recreados en **modo live** (los IDs `price_` de prueba no sirven en vivo)
- [ ] `STRIPE_SECRET_KEY=sk_live_...` y el `whsec_` del webhook live en las variables de *Production* de Vercel
- [ ] Webhook live registrado apuntando al dominio final
- [ ] Páginas legales publicadas (privacidad, términos, reembolsos)
- [ ] Un pago real de bajo monto y su reembolso para verificar todo el flujo

---

## 4. Checklist de seguridad
- La clave secreta solo está en variables de entorno del servidor; `.env*` está en `.gitignore`.
- Los precios se resuelven en el servidor a partir de un id, nunca desde un monto del cliente.
- El webhook verifica la firma con `constructEvent`.
- La entrega del servicio se dispara desde el webhook, no desde la página de éxito.
- El webhook es idempotente: Stripe puede reenviar el mismo evento, así que guarda `event.id` o `session.id` procesados.

## 5. Costos de referencia
- **Stripe**: no tiene mensualidad; cobra una comisión por transacción que depende del país y del método de pago (consulta https://stripe.com/pricing). Stripe Tax y otras funciones tienen costo adicional.
- **Vercel**: ver el punto 2.2 sobre el uso comercial.

## 6. Documentación oficial
- Checkout: https://docs.stripe.com/payments/checkout
- Webhooks: https://docs.stripe.com/webhooks
- Pruebas: https://docs.stripe.com/testing
- Vercel Functions: https://vercel.com/docs/functions
