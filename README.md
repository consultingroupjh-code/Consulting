# consultingroup

Landing page de la agencia, construida con **React + Vite + Tailwind CSS**. Pensada para desplegarse en **Vercel**; más adelante se le agregará el pago de servicios con **Stripe**.

## Desarrollo

Este proyecto usa **pnpm** (`packageManager` en `package.json`). Si no lo tienes: `corepack enable` o `npm i -g pnpm`.

```bash
pnpm install
pnpm dev         # http://localhost:5173
pnpm build       # genera /dist
pnpm preview     # sirve el build localmente
```

`pnpm-workspace.yaml` autoriza el script de instalación de `esbuild` (pnpm bloquea los scripts de dependencias por defecto).

## Estructura

```
src/
  components/   Header, Footer, Logo, Icon
  sections/     Una sección de la home por archivo (Hero, Services, Faq, ...)
  pages/        Home.jsx compone las secciones
  data/         content.js: todos los textos, servicios, casos, FAQs
tailwind.config.js  Tokens de diseño (colores, tipografías, espaciados)
code.html           Diseño original de referencia
```

## Despliegue en Vercel (plan Hobby, gratuito)

1. Sube el proyecto a un repositorio de GitHub.
2. En vercel.com → **Add New Project** → importa el repo.
3. Vercel detecta Vite solo y usa pnpm al encontrar `pnpm-lock.yaml` (build `pnpm build`, output `dist`). Pulsa **Deploy**.
   - Para que Vercel use la misma versión de pnpm que está en `packageManager`, añade en **Settings → Environment Variables** la variable `ENABLE_EXPERIMENTAL_COREPACK=1` antes del primer deploy.

`vercel.json` ya redirige todas las rutas a `index.html` (excepto `/api/*`), así que el sitio está listo para tener más páginas.

## Siguiente fase: Stripe

La guía completa (requisitos, decisiones de negocio, código de ejemplo, pruebas y paso a producción) está en [`docs/STRIPE.md`](docs/STRIPE.md).

> Nota: el plan Hobby de Vercel es solo para uso no comercial. Revisa el punto 2.2 de la guía antes de empezar a cobrar.
