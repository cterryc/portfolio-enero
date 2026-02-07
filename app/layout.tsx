// app/layout.tsx
import type { ReactNode } from 'react'
import './globals.css'
import Sidebar from '@/components/ui/Sidebar'
import TabsBar from '@/components/ui/TabsBar'
import Terminal from '@/components/ui/Terminal'
// Importamos nuestro nuevo componente de cliente
import DynamicStatusBar from '@/components/DynamicStatusBar'
import { FilesProvider } from '@/context/FileContext'
import { ProjectsProvider } from '@/context/ProjectsContext'

// Puedes agregar metadata ahora que es un Server Component
export const metadata = {
  title: 'Martel - FullStack Developer & App Specialist',
  description:
    'Desarrollador App - Web. Conoce mis proyectos y experiencia técnica en React, Node.js y más.',
  keywords: [
    'Desarrollador Full-Stack',
    'React',
    'Node.js',
    'TypeScript',
    'Next.js',
    'App Development',
    'Desarrollo Web',
    'Martel Portfolio'
  ]
}

export default function RootLayout({ children }: { children: ReactNode }) {
  // Ya no necesitamos hooks aquí

  return (
    <html lang='en' className='dark'>
      <body className='bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-gray-300 h-screen overflow-hidden flex flex-col selection:bg-primary/30 selection:text-primary'>
        <FilesProvider>
          <ProjectsProvider>
            <div className='flex flex-col h-screen overflow-hidden'>
              <div className='flex flex-1 overflow-hidden'>
                <Sidebar />
                <main className='flex-1 flex flex-col min-w-0 bg-panel-dark'>
                  <TabsBar />
                  {children}
                  <Terminal />
                </main>
              </div>
              {/* Renderizamos el componente cliente aquí */}
              <DynamicStatusBar />
            </div>
          </ProjectsProvider>
        </FilesProvider>
      </body>
    </html>
  )
}
