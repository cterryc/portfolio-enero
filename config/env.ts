export const ENV = {
  DATABASE_URL: process.env.DATABASE_URL,
  EMAIL_FROM: process.env.EMAIL_FROM,
  USER_FROM: process.env.USER_FROM,
  // Puedes agregar valores por defecto si no existen
  API_KEY_BREVO: process.env.API_KEY_BREVO,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  NODE_ENV: process.env.NODE_ENV || 'development'
}

// Validación opcional (Muy recomendada)
if (!ENV.DATABASE_URL) {
  throw new Error('❌ Error: La variable DATABASE_URL no está definida')
}
