# Portfolio-enero-2026 - Contexto del Proyecto

## Descripción General

Portfolio personal de **Daniel Martel** (Desarrollador Web Full Stack, Lima, Perú) con una interfaz inspirada en **Visual Studio Code**. Las páginas se tratan como "archivos" que se abren en pestañas, con terminal integrada y tema oscuro.

### Características Principales

- **Metáfora VSCode**: Navegación por archivos, pestañas, terminal (Ctrl+J) y barra de estado contextual
- **Tema oscuro** con fuente Fira Code y tokens de diseño personalizados
- **Estado global** mediante Context API (`FileContext`, `ProjectsContext`)
- **Base de datos PostgreSQL** con Prisma ORM para gestión de proyectos, habilidades y experiencia

## Stack Tecnológico

| Categoría | Tecnología |
|-----------|------------|
| **Framework** | Next.js 16.1.6 (App Router) |
| **UI** | React 19.2.3, TypeScript ^5 |
| **Estilos** | Tailwind CSS ^4 |
| **Iconos** | lucide-react ^0.563.0 |
| **Base de Datos** | PostgreSQL + Prisma ORM ^7.3.0 |
| **Runtime** | Node.js ^20 |
| **Editor de Código** | @monaco-editor/react ^4.7.0 |
| **Tour/Onboarding** | driver.js ^1.4.0 |
| **Notificaciones** | react-hot-toast ^2.6.0 |
| **AI Chat** | @google/generative-ai, react-markdown |

## Estructura del Proyecto

```
portfolio-enero-2026/
├── app/                      # App Router (Next.js 16)
│   ├── [id]/page.tsx         # Página dinámica de proyectos
│   ├── api/                  # Rutas de API
│   ├── contact/              # Página de contacto
│   ├── experience/           # Página de experiencia
│   ├── skills/               # Página de habilidades
│   ├── layout.tsx            # Layout raíz con providers
│   ├── page.tsx              # Página de inicio (Sobre mí)
│   └── globals.css           # Estilos globales
├── components/
│   ├── ui/                   # Componentes UI reutilizables
│   │   ├── Sidebar.tsx       # Barra lateral de archivos
│   │   ├── TabsBar.tsx       # Barra de pestañas
│   │   ├── Terminal.tsx      # Terminal integrada
│   │   ├── StatusBar.tsx     # Barra de estado
│   │   └── ChatWidget.tsx    # Chat con IA (Gemini)
│   ├── DynamicStatusBar.tsx  # Barra de estado dinámica
│   └── PasswordModal*.tsx    # Modales de autenticación
├── context/                  # Context API para estado global
│   ├── FileContext.tsx       # Gestión de archivos/pestañas
│   └── ProjectsContext.tsx   # Gestión de proyectos
├── lib/
│   ├── generated/prisma/     # Cliente Prisma generado
│   ├── prisma.ts             # Configuración de Prisma
│   ├── projects.ts           # Utilidades de proyectos
│   ├── types.ts              # Definiciones de tipos TypeScript
│   └── data.ts               # Datos estáticos (skills, commits)
├── prisma/
│   ├── schema.prisma         # Schema de base de datos
│   └── migrations/           # Migraciones de BD
├── config/
│   └── env.ts                # Configuración de variables de entorno
├── public/                   # Assets estáticos
├── services/                 # Servicios externos
└── app/
    └── api/
        └── chat/
            └── route.ts      # API de chat con IA (Gemini + Prisma)
```

## Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo (puerto 4000)
npm run dev

# Build de producción
npm run build

# Inicio en producción
npm start

# Linting
npm run lint
```

## Variables de Entorno

El proyecto requiere las siguientes variables definidas en `.env`:

```env
DATABASE_URL=postgresql://user:password@host:port/database
EMAIL_FROM=
USER_FROM=
API_KEY_BREVO=
ADMIN_PASSWORD=
NODE_ENV=development

# AI Chat - Google Gemini
GEMINI_API_KEY=  # Obtener en: https://aistudio.google.com/apikey
```

## Schema de Base de Datos (Prisma)

### Modelos

- **Project**: Proyectos del portfolio (título, descripción, tecnologías, snippet de código, stats)
- **ProjectStat**: Métricas de proyectos (Performance, SEO, Accesibilidad, Commits)
- **Commit**: Experiencia laboral representada como commits de Git
- **Skill**: Habilidades técnicas categorizadas (frontend/backend)

## Convenciones de Desarrollo

### TypeScript

- **Strict mode** habilitado en `tsconfig.json`
- **Paths**: Alias `@/*` apunta a la raíz del proyecto
- **Tipado**: Interfaces definidas en `lib/types.ts`

### Estilos (Tailwind CSS v4)

- **Dark mode**: `class` (forzado en `html` con `className='dark'`)
- **Colores personalizados**:
  - `primary`: #13ec80 (verde neón)
  - `background-light`: #f6f8f7
  - `background-dark`: #102219
  - `panel-dark`: #0b1812
  - `border-dark`: #1f3a2e
- **Fuentes**: Space Grotesk (display), Fira Code (mono)

### ESLint + Prettier

- **ESLint**: Configuración Next.js con TypeScript
- **Prettier**:
  - `singleQuote`: true
  - `jsxSingleQuote`: true
  - `semi`: false
  - `trailingComma`: none

### Arquitectura

- **Server Components**: Por defecto en App Router
- **Client Components**: Marcados con `'use client'` cuando usan hooks o interactividad
- **Estado Global**: Context API (`FileContext`, `ProjectsContext`)
- **Layout**: Layout raíz en `app/layout.tsx` con providers anidados

## Rutas de la Aplicación

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio (Sobre mí) |
| `/experience` | Experiencia laboral (formato Git commits) |
| `/skills` | Habilidades técnicas |
| `/contact` | Formulario de contacto |
| `/[id]` | Página dinámica de proyecto |
| `/api/projects` | API para CRUD de proyectos |
| `/api/chat` | API para chat con IA (Gemini + contexto Prisma) |
| `/new-project` | Crear nuevo proyecto (admin) |
| `/delete-project` | Eliminar proyecto (admin) |

## Componentes Clave

### FileContext

Gestiona el estado de archivos abiertos (pestañas) y visibilidad de terminal:

```typescript
interface ItemArrayFiles {
  name: string
  path: string
  icon: string
  color: string
}

// Hooks disponibles
useFiles() // filesList, addFile, removeFile, showTerminal, setShowTerminal
```

### ProjectsContext

Gestiona el estado de proyectos obtenidos desde la API:

```typescript
useProjects() // projects, projectsErrorFetch, removeProject
```

## Características de UI

### Sidebar (`#sidebar`)
- Lista de "archivos" navegables (Sobre mí, Experiencia, Proyectos, etc.)
- Iconos de Lucide con colores por tipo

### TabsBar (`#tabsbar`)
- Muestra archivos abiertos como pestañas
- Permite cerrar pestañas (excepto cuando hay solo una)
- Resalta la pestaña activa con borde superior verde

### Terminal (`#terminal`)
- Terminal integrada con atajo `Ctrl+J`
- Comandos disponibles mediante `help`

### DynamicStatusBar
- Barra de estado contextual
- Muestra información dinámica según la página

### ChatWidget (`components/ui/ChatWidget.tsx`)
- **Chat con IA** flotante en esquina inferior derecha
- **Tecnología**: Google Gemini (`gemini-3.1-flash-lite`) + react-markdown
- **Contexto inyectado**: Proyectos, skills y experiencia desde PostgreSQL
- **Historial**: Últimos 15 mensajes de la conversación
- **Características**:
  - Botón flotante con animación hover
  - Ventana responsive (95% ancho en móvil, max-w-md en desktop)
  - Altura dinámica: 50-60vh en móvil, 400-500px en desktop
  - Renderizado markdown con `react-markdown`
  - Indicador de "escribiendo..." animado
  - Scroll automático a nuevos mensajes
  - Envío con tecla Enter
  - Área táctil de 44px mínimo (accesibilidad móvil)
- **Responsive**: Optimizado para 375×667px (iPhone SE/5)

## Onboarding

El proyecto incluye un tour guiado con **driver.js** que se muestra en la primera visita (almacenado en `localStorage` como `driverGuide`).

## Despliegue

Recomendado en **Vercel**:

1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Despliegue automático con push a `main`

## Notas Importantes

- El cliente de Prisma se genera en `lib/generated/prisma`
- Las imágenes remotas están configuradas para `lh3.googleusercontent.com` y `res.cloudinary.com`
- El proyecto usa adaptador `@prisma/adapter-pg` para PostgreSQL
- Hot reload habilitado en desarrollo con `globalForPrisma` para evitar múltiples instancias
- **AI Chat**: El widget de chat usa `next/dynamic` con lazy loading para optimizar el bundle inicial
- **Markdown**: Las respuestas del chat se renderizan con `react-markdown` para formato adecuado
- **Contexto IA**: La API `/api/chat` inyecta contexto desde Prisma (proyectos, skills, commits) en cada request
