import { Project } from './types'

export const projects: Project[] = [
  {
    id: 'saviorperu',
    title: 'SaviorPeru - Ecommerce de Moda con Admin Panel',
    description:
      'Plataforma e-commerce para ropa y accesorios con panel de administración completo y gestión de colecciones destacadas.',
    longDescription:
      'Tienda online desarrollada en Next.js que combina un catálogo de productos públicos con un panel de administración para gestionar colecciones, productos destacados y configuraciones de la tienda. Implementa validaciones con Zod, gestión de imágenes con Cloudinary, paginación y búsqueda en tiempo real, y mantiene un límite de 4 colecciones activas.',
    liveUrl: 'https://saviorperu.vercel.app',
    repoUrl: 'https://github.com/SaviorPeru/SaviorPeru',
    imageUrl:
      'https://res.cloudinary.com/dniekrmqb/image/upload/q_auto,w_800/v1746419358/portafolio/saviorperu.com_orql0e.webp',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Cloudinary',
      'PostgreSQL',
      'Prisma ORM',
      'Clerk (Autenticación)'
    ],
    features: [
      'Panel Administrativo con Gestión de Inventario (Full CRUD)',
      'Gestión de Media con Cloudinary & Imágenes Múltiples',
      'Validación de Datos y Tipado Estricto (Zod + TypeScript)',
      'Experiencia de Usuario Proactiva (Skeletons & Reintentos)',
      'Sistema de colecciones destacadas (máximo 4)',
      'Búsqueda y paginación en tiempo real',
      'Manejo de errores con reintentos',
      'Configuración de tienda (delivery, contacto, redes)',
      'Interfaz responsive y modo oscuro',
      'Productos destacados en homepage',
      'Sistema de stock y estados de producto'
    ],
    stats: [
      { label: 'Performance', val: '94%', color: 'green' },
      { label: 'SEO', val: '92%', color: 'blue' },
      { label: 'Accessibility', val: '89%', color: 'yellow' },
      { label: 'Commits', val: '102+', color: 'purple' },
      { label: 'Produc. gestionados', val: '50+', color: 'green' },
      {
        label: 'Tiempo desarrollo',
        val: '30 días',
        color: 'blue'
      }
    ],
    codeSnippet: {
      file: 'app/api/(public)/products/route.ts (API - Productos)',
      language: 'TypeScript',
      lines: [
        '// POST de productos  para crear productos en el catálogo.',
        'export async function POST(req: NextRequest) {',
        ' try {',
        '   const body = await req.json()',
        '',
        '   // La validación se realiza con Zod antes de la inserción.',
        '   const validatedData = createProductSchema.parse(body)',
        '',
        '   // Se usa Prisma ORM para persistir en PostgreSQL.',
        '   const product = await prisma.productos.create({',
        '     data: {',
        '     name: validatedData.name,',
        '     category: validatedData.category,',
        '     price: validatedData.price,',
        '     stock: validatedData.stock',
        '     }',
        '   })',
        '   return NextResponse.json({ data: product }, { status: 201 })',
        ' } catch (error) {',
        '   return NextResponse.json({ error: error.message }, { status: 400 })',
        ' }',
        '}'
      ]
    }
  },
  {
    id: 'pascomovil',
    title:
      'Pascomovil - Sistema Full-Stack de Reservas de Transporte Interprovincial',
    description:
      'Plataforma full-stack de reservas de viajes en bus entre Lima y Cerro de Pasco con selección visual de asientos, confirmación por WhatsApp y panel administrativo.',
    longDescription:
      'Sistema completo de reservas de transporte interprovincial que integra una aplicación web para usuarios finales, una API REST robusta y un panel administrativo. Permite búsqueda de viajes, selección visual de asientos, autenticación segura, generación automática de horarios basada en flota, protección de viajes con reservas activas y gestión administrativa con control de estados.',
    liveUrl: 'https://pascomovil.vercel.app',
    repoUrl: 'https://github.com/cterryc/pascomovil',
    imageUrl:
      'https://res.cloudinary.com/dniekrmqb/image/upload/q_auto,w_800/v1770085492/portafolio/Opera_Snapshot_2026-02-02_212426_pascomovil.vercel.app_hb6l5i.webp',
    technologies: [
      'React',
      'Redux Toolkit/Persist',
      'Tailwind',
      'Express.js',
      'PostgreSQL',
      'Sequelize ORM',
      'JWT (httpOnly cookies)',
      'Brevo (Email Service)'
    ],
    features: [
      'Selección Visual de Asientos en Tiempo Real',
      'Calendario Dinámico con Reglas de Disponibilidad',
      'Flujo de reserva progresivo con validación por pasos',
      'Notificaciones Dinámicas vía WhatsApp',
      'Búsqueda de viajes por origen, destino y fecha',
      'Autenticación completa con recuperación de contraseña',
      'Historial de reservas por usuario',
      'Panel administrativo con CRUD completo'
    ],
    stats: [
      { label: 'Performance', val: '92%', color: 'green' },
      { label: 'Seo', val: '92%', color: 'blue' },
      { label: 'Accessibility', val: '90%', color: 'yellow' },
      { label: 'Commits', val: '30+', color: 'purple' },
      { label: 'Capacidad', val: '7 asientos', color: 'green' },
      { label: 'Rutas activas', val: '2', color: 'blue' }
    ],
    codeSnippet: {
      file: 'src/controllers/reservations.controller.js (API - Gestión de Reservas)',
      language: 'JavaScript',
      lines: [
        '// La ruta está protegida por el middleware de autenticación',
        'reservations.post("/", authMiddleware, createReservation)',
        '',
        'export const createReservation = async (req, res) => {',
        '  const { tripId, seatIds, paymentMethod } = req.body',
        '  const userId = req.user.id',
        '',
        '  // Validación de entrada: Verifica campos requeridos.',
        '  if (!tripId || !seatIds || !paymentMethod) {',
        '    return res.status(400).json({ error: "Campos requeridos" })',
        '  }',
        '',
        '  try {',
        '    // Extrae el userId del token JWT mediante el middleware authMiddleware',
        '    const reservation = await reservationServices.createReservation({',
        '      tripId, seatIds, userId, paymentMethod',
        '    })',
        '    res.status(201).json(reservation)',
        '  } catch (error) {',
        '    res.status(400).json({ error: error.message })',
        '  }',
        '}'
      ]
    }
  },
  {
    id: 'grimreaper',
    title: 'GrimReaper - Sistema Full-Stack de Gestión DKP para WoW',
    description:
      'Aplicación full-stack para gestión de DKP (Dragon Kill Points) en World of Warcraft 3.3.5a',
    longDescription:
      'Sistema completo de gestión de clan para World of Warcraft que combina una SPA en React con una API RESTful en Express. Procesa exportaciones XML de DKP, gestiona personajes Main/Alter con PostgreSQL, implementa versionado temporal por zona horaria Perú (UTC-5) y utiliza un microservicio externo para scraping optimizado de equipamiento desde Warmane.',
    liveUrl: 'https://grimreaper.vercel.app',
    repoUrl: 'https://github.com/cterryc/Grimreaper',
    imageUrl:
      'https://res.cloudinary.com/dniekrmqb/image/upload/q_auto,w_800/v1725046794/portafolio/jthrlgwhpmzywde9oq7q.webp',
    technologies: [
      'React',
      'ReduxToolkit',
      'Express',
      'PostgreSQL',
      'Sequelize',
      'xml2js',
      'Puppeteer'
    ],
    features: [
      'Procesamiento XML con Categorización Automática (Main/Alter)',
      'Scraping Dinámico de Equipamiento (Warmane Armory)',
      'Sistema de Backup Cascada con Snapshots Temporales',
      'Resolución de Referencias Encadenadas',
      'Sistema DKP con ordenamiento múltiple (clase, nombre, rango, puntos)',
      'Visualización interactiva de ítems con tooltips y gemas',
      'Autenticación de administradores',
      'Persistencia de estado en frontend con redux-persist'
    ],
    stats: [
      { label: 'Performance', val: '100%', color: 'green' },
      { label: 'SEO', val: '88%', color: 'blue' },
      { label: 'Accessibility', val: '95%', color: 'yellow' },
      { label: 'Commits', val: '125+', color: 'blue' }
    ],
    codeSnippet: {
      file: 'scraper-service/index.js (Backend – Microservicio de Scraping)',
      language: 'JavaScript',
      lines: [
        '// Sistema de caché en memoria para reducir scraping repetido',
        'const cache = new Map()',
        'const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos',
        '',
        'app.get("/api/:character", async (req, res) => {',
        '  const { character } = req.params',
        '  const cacheKey = character.toLowerCase()',
        '  const cachedData = cache.get(cacheKey)',
        '',
        '  // Retornar desde caché si está disponible',
        '  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {',
        '    return res.status(200).send(cachedData.data)',
        '  }',
        '',
        '  // Configuración optimizada para Railway (memoria limitada)',
        '  const options = {',
        '    headless: "new",',
        '    args: [',
        '      "--no-sandbox",',
        '      "--disable-setuid-sandbox",',
        '      "--disable-dev-shm-usage",',
        '      "--memory-pressure-off",',
        '      "--max_old_space_size=256"',
        '    ]',
        '  }',
        '',
        '  const browser = await puppeteer.launch(options)',
        '  const page = await browser.newPage()',
        '',
        '  // Bloquear recursos pesados para ahorrar memoria',
        '  await page.setRequestInterception(true)',
        '  page.on("request", (request) => {',
        '    if (["image", "stylesheet", "font", "media"].includes(request.resourceType())) {',
        '      request.abort()',
        '    } else {',
        '      request.continue()',
        '    }',
        '  })',
        '',
        '  // Detección de Cloudflare Challenge',
        '  const titleText = await page.evaluate(el => el.textContent, await page.$("title"))',
        '  if (titleText.includes("Verificar que usted es un ser humano")) {',
        '    throw new Error("Cloudflare challenge detected")',
        '  }',
        '',
        '  const elementos = await page.evaluate(() => {',
        '    return {',
        '      left: extractElementsAttributes(document.querySelectorAll(".item-left div div a")),',
        '      right: extractElementsAttributes(document.querySelectorAll(".item-right div div a")),',
        '      bottom: extractElementsAttributes(document.querySelectorAll(".item-bottom div div a")),',
        '      scrapedAt: new Date().toISOString()',
        '    }',
        '  })',
        '',
        '  // Guardar en caché (máximo 50 personajes)',
        '  cache.set(cacheKey, { data: elementos, timestamp: Date.now() })',
        '  if (cache.size > 50) cache.delete(cache.keys().next().value)',
        '',
        '  await browser.close()',
        '  res.status(200).send(elementos)',
        '})'
      ]
    }
  },
  {
    id: 'marteldev',
    title: 'MartelDev - Landing Page de Templates E-commerce',
    description:
      'Landing page para venta de templates e-commerce con sistema de paquetes y galería de diseños.',
    longDescription:
      'Aplicación SPA desarrollada en React que presenta 5 templates de e-commerce pre-diseñados con 3 paquetes de servicio (Frontend, Fullstack, Personalizado). Implementa arquitectura JAMstack con datos estáticos centralizados en DTOs, integración con WhatsApp para conversión directa, y optimización de imágenes con Cloudinary. Sistema de routing client-side con React Router y despliegue en Vercel Edge Network.',
    liveUrl: 'https://marteldev.vercel.app',
    repoUrl: 'https://github.com/cterryc/marteldev-landingpage',
    imageUrl:
      'https://res.cloudinary.com/dniekrmqb/image/upload/q_auto,w_800/v1769099780/MartelDev-Ecommerce/1_fkjd7g.webp',
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'React Router v7',
      'Tailwind CSS',
      'Cloudinary',
      'Vercel',
      'WhatsApp Web API'
    ],
    features: [
      'Arquitectura JAMstack "Backendless"',
      'Gestión de Datos mediante DTOs en TypeScript',
      'Galería de Templates Especializados con Rutas Dinámicas',
      'Pipeline de Optimización de Assets (Cloudinary)',
      'Sistema de 3 paquetes de servicio (S/ 499 - S/ 1499)',
      'Integración directa con WhatsApp para conversión',
      'Tabla comparativa de paquetes',
      'Páginas de detalle por template'
    ],
    stats: [
      { label: 'Performance', val: '99%', color: 'green' },
      { label: 'Seo', val: '92', color: 'blue' },
      { label: 'Accessibility', val: '95', color: 'yellow' },
      { label: 'Commits', val: '6+', color: 'purple' }
    ],
    codeSnippet: {
      file: 'components/PackageCard.tsx (Sistema de Paquetes - Lógica de CTA)',
      language: 'TypeScript',
      lines: [
        'const PackageCard: React.FC<{ pkg: Package }> = ({ pkg }) => {',
        '  const navigate = useNavigate()',
        '  return (',
        '    <div className={`bg-charcoal border ${pkg.isPopular ? "border-2 border-primary" : "border-cream/10"}`}>',
        '      {pkg.isPopular && (',
        '        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-dark">',
        '          Más Popular',
        '        </div>',
        '      )}',
        '      ',
        '      {/* Feature list rendering */}',
        '      {pkg.features.map((feature, idx) => (',
        '        <div key={idx} className="flex items-start gap-3">',
        '          <svg className="w-5 h-5 text-primary">',
        '            <path d="M5 13l4 4L19 7" />',
        '          </svg>',
        '          <span>{feature}</span>',
        '        </div>',
        '      ))}',
        '',
        '      {/* Conditional CTA logic */}',
        '      <button',
        '        onClick={() => {',
        '          if (pkg.ctaText === "Cotizar por WhatsApp") {',
        '            contactWhatsApp(pkg.ctaText)',
        '          } else {',
        '            navigate("/templates")',
        '          }',
        '        }}',
        '      >',
        '        {pkg.ctaText}',
        '      </button>',
        '    </div>',
        '  )',
        '}'
      ]
    }
  },
  {
    id: 'pyme',
    title:
      'PYME Credit Platform - Sistema Full-Stack de Solicitudes de Crédito',
    description:
      'Plataforma full-stack para gestión de solicitudes de crédito para PYMEs con registro de empresas, carga de documentos, verificación KYC/AML, firma digital y panel administrativo.',
    longDescription:
      'Sistema completo de gestión de créditos para pequeñas y medianas empresas que integra una aplicación web React, una API REST robusta con TypeScript y un panel de administración. Permite registro y autenticación de usuarios, creación de perfiles empresariales, solicitudes de crédito con formularios dinámicos que guardan progreso automáticamente, carga de documentos a Supabase Storage, verificación KYC/AML, firma digital de documentos, y seguimiento en tiempo real del estado de las solicitudes.',
    liveUrl: 'https://pyme-two.vercel.app', // No especificado en el código
    repoUrl: 'https://github.com/cterryc/pyme',
    imageUrl:
      'https://res.cloudinary.com/dniekrmqb/image/upload/q_auto,w_800/v1770163851/portafolio/Opera_Snapshot_2026-02-03_191011_pyme-two.vercel.app_g5fwo4.webp', // No especificado en el código
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Express.js',
      'TypeORM',
      'PostgreSQL',
      'Supabase',
      'JWT'
    ],
    features: [
      'Sistema de Autorización Granular (RBAC) y Seguridad Avanzada',
      'Motor de Solicitudes de Crédito con Persistencia de Progreso',
      'Registro y autenticación de usuarios (empresas, operadores, administradores)',
      'Autenticación OAuth con Google',
      'Autenticación JWT stateless con tokens Bearer',
      'Registro y gestión de empresas/PYMEs',
      'Solicitudes de crédito con formularios dinámicos',
      'Guardado automático de progreso en solicitudes',
      'Cálculo de porcentaje de completitud de formularios',
      'Carga y gestión de documentos con Supabase Storage',
      'Validación de tipo y tamaño de archivos',
      'Verificación KYC/AML (Know Your Customer / Anti-Money Laundering)',
      'Firma digital de documentos',
      'Panel de administración para revisar y aprobar solicitudes',
      'Sistema de auditoría con logs de acciones',
      'Dashboard con estadísticas generales',
      'Validación de formularios con Zod',
      'Documentación API con Swagger',
      'Seguridad con Helmet, Rate Limiting y HPP',
      'Migraciones de base de datos con TypeORM'
    ],
    stats: [
      { label: 'Módulos API', val: '6+', color: 'blue' },
      { label: 'Entidades', val: '5+', color: 'green' },
      { label: 'Estados de Solicitud', val: '12', color: 'purple' },
      { label: 'Roles de Usuario', val: '3', color: 'yellow' }
    ],
    codeSnippet: {
      file: 'backend/src/config/middlewares.config.ts (Backend – Configuración de Seguridad)',
      language: 'TypeScript',
      lines: [
        '// Implementación clave: Configuración de middlewares de seguridad',
        '// Origen: cterryc/pyme (Backend)',
        '',
        '// Configuración CORS con múltiples orígenes permitidos',
        'const allowedOrigins = [',
        '  "http://localhost:5173",',
        '  "http://localhost:5174",',
        '  "http://localhost:3000",',
        '  config.FRONTEND_URL',
        '];',
        '',
        'app.use(cors({',
        '  origin: (origin, callback) => {',
        '    if (!origin || allowedOrigins.includes(origin)) {',
        '      callback(null, true);',
        '    } else {',
        '      callback(new Error("Not allowed by CORS"));',
        '    }',
        '  },',
        '  credentials: true,',
        '  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]',
        '}));',
        '',
        '// Seguridad con Helmet',
        'app.use(helmet());',
        '',
        '// Rate limiting solo en producción',
        'if (process.env.NODE_ENV === "production") {',
        '  const limiter = rateLimit({',
        '    windowMs: 15 * 60 * 1000, // 15 minutos',
        '    max: 1000, // 1000 requests por ventana',
        '    message: "Too many requests"',
        '  });',
        '  app.use(limiter);',
        '',
        '  // Rate limiting específico para autenticación',
        '  const authLimiter = rateLimit({',
        '    windowMs: 15 * 60 * 1000,',
        '    max: 100,',
        '    message: "Too many authentication attempts"',
        '  });',
        '  app.use("/api/auth/login", authLimiter);',
        '  app.use("/api/auth/register", authLimiter);',
        '}',
        '',
        '// Protección contra HTTP Parameter Pollution',
        'app.use(hpp());'
      ]
    }
  },
  {
    id: 'videogames',
    title: 'Videogames App - Catálogo Interactivo',
    description: 'Aplicación de catálogo de videojuegos con búsqueda avanzada',
    longDescription:
      'Proyecto académico full-stack desarrollado en Henry Bootcamp que consume la API RAWG para mostrar videojuegos con sistema de búsqueda, filtrado y creación de videojuegos personalizados.',
    liveUrl: 'https://videogames-terry.vercel.app',
    repoUrl: 'https://github.com/cterryc/PI-Videogames-Vite',
    imageUrl:
      'https://res.cloudinary.com/dniekrmqb/image/upload/q_auto,w_800/v1712559020/portafolio/zsve4caj9xzql0lotdna.webp', // Añadir URL después
    technologies: [
      'React.js',
      'Redux',
      'Express.js',
      'PostgreSQL',
      'Sequelize',
      'Axios',
      'RAWG API'
    ],
    features: [
      'Búsqueda y filtrado avanzado de videojuegos',
      'Consumo de API RAWG para datos actualizados',
      'Formulario controlado para crear videojuegos',
      'Ordenamiento múltiple (alfabético, rating, fecha)',
      'Base de datos PostgreSQL con Sequelize ORM',
      'Frontend responsive con React y Redux'
    ],
    stats: [
      { label: 'Performance', val: '94%', color: 'green' },
      { label: 'SEO', val: '85%', color: 'blue' },
      { label: 'Accessibility', val: '89%', color: 'yellow' },
      { label: 'Commits', val: '64', color: 'purple' }
    ],
    codeSnippet: {
      file: 'actions/gamesActions.js',
      language: 'JavaScript',
      lines: [
        '// Consumo de API RAWG para obtener videojuegos',
        'export const fetchGames = (filters = {}) => async (dispatch) => {',
        "  dispatch({ type: 'LOADING_GAMES' });",
        '  ',
        '  try {',
        '    const params = new URLSearchParams({',
        '      key: process.env.RAWG_API_KEY,',
        '      page_size: 40,',
        '      ...filters',
        '    });',
        '    ',
        '    const response = await axios.get(',
        '      `https://api.rawg.io/api/games?${params}`',
        '    );',
        '    ',
        '    const games = response.data.results.map((game) => ({',
        '      id: game.id,',
        '      name: game.name,',
        '      released: game.released,',
        '      rating: game.rating,',
        '      background_image: game.background_image,',
        '      genres: game.genres.map((g) => g.name),',
        '      platforms: game.platforms.map((p) => p.platform.name)',
        '    }));',
        '    ',
        '    dispatch({',
        "      type: 'SET_GAMES',",
        '      payload: { games, total: response.data.count }',
        '    });',
        '  } catch (error) {',
        '    dispatch({',
        "      type: 'SET_ERROR',",
        "      payload: 'Error al cargar videojuegos'",
        '    });',
        '  }',
        '};'
      ]
    }
  }
]

// Proyecto por defecto
// export const defaultProject = projects[0]
