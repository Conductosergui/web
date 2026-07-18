# Integraciones con APIs de Google (Drive / Sheets)

## Principio de arquitectura: todo server-side

Las futuras conexiones con las APIs de Google Drive y Google Sheets se implementarán
siempre del lado del servidor (Server-Side), nunca desde el navegador del cliente.

En la práctica, dentro del App Router de Next.js esto significa que las llamadas a
Google solo pueden realizarse desde:

- Route Handlers (`src/app/api/**/route.ts`).
- Server Actions (funciones marcadas con `"use server"`).
- Server Components (por defecto en `/src/app/`).

Nunca deben realizarse peticiones a Google desde un Client Component (`"use client"`)
ni desde JavaScript que se ejecute en el navegador.

## Variables de entorno

Las credenciales (cuenta de servicio, claves privadas, IDs de hojas de cálculo o
carpetas de Drive) se configurarán exclusivamente mediante variables de entorno,
gestionadas de forma segura en el panel de Vercel (Project Settings, Environment
Variables) y nunca versionadas en el repositorio.

Convenciones:
- Nunca usar el prefijo `NEXT_PUBLIC_` para estas variables, ya que ese prefijo expone su valor al bundle del cliente.
- Nombres sugeridos: `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEETS_ID`, `GOOGLE_DRIVE_FOLDER_ID`.
- En local, estas variables viven en `.env.local` (ya excluido en `.gitignore`).
- En producción, se cargan como variables de entorno de Vercel para cada entorno (Production, Preview, Development) y nunca en un archivo `.env.production` versionado.

## Pendiente de implementación

Este archivo es una nota técnica de referencia. La implementación concreta
(cliente de `googleapis`, autenticación con cuenta de servicio, funciones de
lectura/escritura en Sheets o Drive) se añadirá más adelante en `src/lib/google/`
y se documentará aquí cuando esté disponible.
