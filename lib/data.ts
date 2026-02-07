import type { Commit } from './types'

// Git Commits
export const commits: Commit[] = [
  {
    hash: 'f8a7b3d1',
    role: 'Full Stack Developer',
    company: 'SaviorPeru (Freelance)',
    date: 'Ene 2026',
    head: true,
    branch: 'hotfix/backend',
    merge: true,
    details: {
      title: 'feat(freelance): Backend Completo @ SaviorPeru',
      description:
        'Desarrollé desde cero el backend completo para el e-commerce de ropa, incluyendo autenticación, gestión de productos, carga de imágenes y API RESTful.',
      achievements: [
        'Desarrollo completo del backend con autenticación Clerk',
        'Implementación de registro de usuarios y sistema de roles',
        'API RESTful para gestión de productos con Prisma ORM',
        'Integración con Cloudinary para carga y optimización de imágenes',
        'Conexión con frontend existente y despliegue en Vercel'
      ],
      technologies: [
        'Next.js',
        'TypeScript',
        'Prisma',
        'PostgreSQL',
        'Clerk',
        'Cloudinary',
        'Vercel'
      ],
      period: '3 de Enero 2026 - 20 de Enero 2026',
      location: 'Remoto'
    }
  },
  {
    hash: 'e9c4a2b8',
    role: 'Full Stack Developer',
    company: 'FacturapGpt',
    date: 'Ene 2024 - May 2025',
    head: false,
    branch: 'main',
    merge: true,
    details: {
      title: 'feat(career): Full Stack Developer @ FacturapGpt',
      description:
        'Desarrollé funciones para plataforma que integraba APIs de Microsoft, Google y WhatsApp para capturar mensajes con archivos adjuntos. Implementé procesamiento de archivos con OpenAI y almacenamiento en S3.',
      achievements: [
        'Integración de APIs de Microsoft, Google y WhatsApp para captura de mensajes',
        'Implementación de subida de archivos a AWS S3',
        'Procesamiento de archivos (PDF, imágenes, DOC) con API de OpenAI',
        'Desarrollo de interfaces en React.js siguiendo diseños en Figma',
        'Manejo de autenticación OAuth y tokens de sesión'
      ],
      technologies: [
        'Next.js',
        'React.js',
        'TypeScript',
        'Redux Toolkit',
        'Tailwind',
        'CouchDB',
        'nano',
        'AWS S3'
      ],
      period: 'Enero 2024 - Mayo 2025',
      location: 'Remoto'
    }
  },
  {
    hash: 'a9b4c2d8',
    role: 'Frontend Developer',
    company: 'SaviorPeru (Freelance)',
    date: 'Abr 2025 - May 2025',
    head: false,
    branch: 'feature/ecommerce',
    merge: false,
    details: {
      title: 'feat(freelance): E-commerce Frontend @ SaviorPeru',
      description:
        'Desarrollé desde cero el frontend para un e-commerce de ropa con carrito interactivo, formularios y optimización de imágenes.',
      achievements: [
        'Desarrollo completo del frontend con rutas públicas',
        'Implementación de carrito interactivo con Sidebar',
        'Formulario de libro de reclamaciones con envío por WhatsApp',
        'Gestión de estados con Context API y useReducer',
        'Integración de Cloudinary para optimización de imágenes'
      ],
      technologies: [
        'Next.js',
        'React.js',
        'TypeScript',
        'Context API',
        'Cloudinary',
        'Vercel'
      ],
      period: 'Abril 2025 - Mayo 2025',
      location: 'Remoto'
    }
  },
  {
    hash: 'd5f3e1c7',
    role: 'Full Stack Developer',
    company: 'Aythen',
    date: 'Jun 2023 - Ago 2024',
    head: false,
    branch: 'feature/microservices',
    merge: false,
    details: {
      title: 'feat(career): Full Stack Developer @ Aythen',
      description:
        'Participé en el desarrollo de la aplicación, creando componentes para manejo de comentarios, panel de configuración y panel de usuario tanto en frontend como backend.',
      achievements: [
        'Desarrollo y mantenimiento de microservicios con Express.js',
        'Implementación de panel de comentarios con React.js y Next.js',
        'Creación de rutas RESTful para autenticación y gestión de datos',
        'Edición y optimización de tablas en base de datos PostgreSQL',
        'Implementación de estados globales utilizando Redux'
      ],
      technologies: [
        'Next.js',
        'React.js',
        'Redux Toolkit',
        'Express.js',
        'Sequelize',
        'PostgreSQL',
        'Postman'
      ],
      period: 'Junio 2023 - Agosto 2024',
      location: 'Remoto'
    }
  },

  {
    hash: 'b2a9f4c6',
    role: 'Gestor de Área Tecnológica',
    company: 'Voy tu Asesora de Belleza',
    date: 'Ene 2021 - Dic 2022',
    head: false,
    branch: 'feature/nocode',
    merge: true,
    details: {
      title: 'chore(career): Primer proyecto profesional @ Voy tu Asesora',
      description:
        'Mi primer proyecto profesional no-code que me abrió las puertas al mundo del desarrollo web. Responsable de la presencia digital y contenido de la empresa.',
      achievements: [
        'Desarrollo de página web utilizando plataforma Wix',
        'Edición de videos y fotos para publicación en redes sociales',
        'Creación de contenido atractivo para aumentar presencia online',
        'Gestión básica de redes sociales de la empresa',
        'Aumento de crecimiento empresarial mediante implementación de contenido digital'
      ],
      technologies: [
        'Wix',
        'Herramientas de edición',
        'Gestión de redes sociales'
      ],
      period: 'Enero 2021 - Diciembre 2022',
      location: 'Lima, Perú'
    }
  }
]
