## Descripción

Portfolio personal de Daniel Martel (Desarrollador Web Full Stack, Lima, Perú) con una interfaz inspirada en Visual Studio Code. Las páginas se tratan como “archivos” que se abren en pestañas, con terminal integrada y tema oscuro.

## Stack Tecnológico

- **Framework**: Next.js 16.1.6 (App Router)
- **UI**: React 19.2.3, TypeScript ^5, Tailwind CSS ^4, lucide-react ^0.563.0
- **Runtime**: Node.js ^20

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev   # http://localhost:3000

# Producción
npm run build
npm start
```

## Estructura Clave

- `app/layout.tsx`: Layout raíz con `FilesProvider` y componentes persistentes estilo VSCode (Sidebar, TabsBar, Terminal, DynamicStatusBar).
- `app/page.tsx`: Perfil con tecnologías, experiencia destacada (Azure / Google Cloud) y educación.
- `lib/projects.ts`: Definición de la interfaz `Project` y listado de proyectos (e-commerce, catálogo de videojuegos).
- `lib/data.ts`: Datos de habilidades y commits con formato tipo Git.

## Características

- Metáfora VSCode: navegación por archivos, pestañas, terminal (Ctrl+Ñ) y barra de estado contextual.
- Tema oscuro con fuente Fira Code y tokens de diseño definidos en `app/globals.css`.
- Estado global mediante `FileContext` (archivos abiertos y visibilidad de la terminal).
- Rutas: `/`, `/about`, `/experience`, `/skills`, `/contact`, `/projects/:id`.

## Despliegue

La forma más sencilla es usar Vercel:

- Conecta el repositorio a Vercel.
- Configura variables de entorno si es necesario.
- Despliegue automático con cada push a la rama `main`.

## Notas

- El README original era el template genérico de `create-next-app`.
- Los proyectos incluyen snippets de código resaltados y métricas (Performance, SEO, Accesibilidad, Commits).
- La experiencia profesional se presenta como commits de Git, mostrando cambios y tecnologías usadas.

---
