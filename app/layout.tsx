import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Daniel - Desarrollador Full-Stack',
  description: 'Portfolio de Daniel, desarrollador full-stack',
  icons: {
    icon: '/fondo5.png', // Formato tradicional
    shortcut: '/fondo5.png',
    apple: '/fondo5.png' // Para dispositivos Apple
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
