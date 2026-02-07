'use client'

import { Monitor, Database, Server, Wrench, Code } from 'lucide-react'

export default function SkillsPage() {
  const tecnologias = {
    frontend: [
      { nombre: 'React.js', color: 'border-primary' },
      { nombre: 'Next.js', color: 'border-primary' },
      { nombre: 'Vite', color: 'border-primary' },
      { nombre: 'Tailwind', color: 'border-primary' },
      { nombre: 'ReduxToolkit', color: 'border-primary' }
    ],
    backend: [
      { nombre: 'Node.js', color: 'border-blue-500' },
      { nombre: 'Express', color: 'border-blue-500' },
      { nombre: 'Sequelize', color: 'border-blue-500' },
      { nombre: 'NestJS', color: 'border-blue-500' },
      { nombre: 'Prisma', color: 'border-blue-500' }
    ],
    basesDeDatos: [
      { nombre: 'PostgreSQL', color: 'border-green-500' },
      { nombre: 'MongoDB', color: 'border-green-500' }
    ],
    herramientas: [
      { nombre: 'Git', color: 'border-purple-500' },
      { nombre: 'GitHub', color: 'border-purple-500' },
      { nombre: 'Vercel', color: 'border-purple-500' },
      { nombre: 'Render', color: 'border-purple-500' },
      { nombre: 'Postman', color: 'border-purple-500' },
      { nombre: 'JWT', color: 'border-purple-500' }
    ]
  }

  return (
    <div className='flex-1 flex flex-col lg:flex-row overflow-hidden'>
      {/* Panel derecho: Tecnologías */}
      <div className='flex-1 lg:w-1/2 overflow-y-auto bg-panel-dark relative border-b lg:border-b-0 lg:border-r border-border-dark'>
        <div className='p-6 md:p-8 max-w-3xl mx-auto'>
          {/* Cabecera */}
          <div className='mb-10'>
            <div className='flex items-center gap-3 mb-2'>
              <Code className='text-primary w-7 h-7' />
              <h1 className='text-2xl font-bold text-white'>
                Stack Tecnológico
              </h1>
            </div>
            <p className='text-gray-400'>
              Mi conjunto de herramientas y tecnologías organizadas por
              categorías
            </p>
          </div>

          {/* Sección: Frontend */}
          <div className='mb-10'>
            <div className='flex items-center gap-3 mb-6'>
              <Monitor className='text-primary w-6 h-6' />
              <h2 className='text-xl font-bold text-white'>Frontend</h2>
            </div>
            <div className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3'>
              {tecnologias.frontend.map((tech) => (
                <div
                  key={tech.nombre}
                  className='bg-background-dark rounded-lg border border-border-dark p-4 hover:border-primary/50 transition-colors group'
                >
                  <span className='text-white font-medium'>{tech.nombre}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sección: Backend */}
          <div className='mb-10'>
            <div className='flex items-center gap-3 mb-6'>
              <Server className='text-blue-400 w-6 h-6' />
              <h2 className='text-xl font-bold text-white'>Backend</h2>
            </div>
            <div className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3'>
              {tecnologias.backend.map((tech) => (
                <div
                  key={tech.nombre}
                  className='bg-background-dark rounded-lg border border-border-dark p-4 hover:border-blue-400/50 transition-colors group'
                >
                  <span className='text-white font-medium'>{tech.nombre}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sección: Bases de Datos */}
          <div className='mb-10'>
            <div className='flex items-center gap-3 mb-6'>
              <Database className='text-green-400 w-6 h-6' />
              <h2 className='text-xl font-bold text-white'>Bases de Datos</h2>
            </div>
            <div className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3'>
              {tecnologias.basesDeDatos.map((tech) => (
                <div
                  key={tech.nombre}
                  className='bg-background-dark rounded-lg border border-border-dark p-4 hover:border-green-400/50 transition-colors group'
                >
                  <span className='text-white font-medium'>{tech.nombre}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sección: Herramientas */}
          <div className='mb-8'>
            <div className='flex items-center gap-3 mb-6'>
              <Wrench className='text-purple-400 w-6 h-6' />
              <h2 className='text-xl font-bold text-white'>Herramientas</h2>
            </div>
            <div className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3'>
              {tecnologias.herramientas.map((tech) => (
                <div
                  key={tech.nombre}
                  className='bg-background-dark rounded-lg border border-border-dark p-4 hover:border-purple-400/50 transition-colors group'
                >
                  <span className='text-white font-medium'>{tech.nombre}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nota al pie */}
          <div className='mt-12 pt-6 border-t border-border-dark text-center'>
            <p className='text-gray-500 text-sm'>
              Conocimientos adquiridos a través de formación técnica y práctica
              continua
            </p>
          </div>
        </div>
      </div>

      {/* Panel izquierdo: Editor de código mejorado */}
      <div className='flex-1 lg:max-w-96 max-md:hidden p-0 overflow-y-auto bg-panel-dark relative'>
        <div className='flex font-mono text-sm leading-relaxed min-h-full'>
          {/* Números de línea - alineados correctamente */}
          <div className='w-12 shrink-0 flex flex-col bg-background-dark/30 border-r border-border-dark/50 py-4'>
            {Array.from({ length: 23 }, (_, i) => (
              <div
                key={i}
                className='h-6.5 flex items-center justify-end pr-3 text-gray-600 select-none'
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Contenido del código */}
          <div className='flex-1 overflow-auto py-5'>
            {/* Código JSON - cada línea con altura consistente */}
            <div className='space-y-0 px-4'>
              {/* Línea 1 */}
              <div className='h-[1.5em] flex items-center'>
                <span className='text-yellow-300'>{'{'}</span>
              </div>

              {/* Frontend */}
              {/* Línea 2 */}
              <div className='h-[1.5em] flex items-center pl-4'>
                <span className='text-purple-400'>{'"frontend"'}</span>
                <span className='text-gray-300'>: [</span>
              </div>

              {/* Líneas 3-7 */}
              {tecnologias.frontend.map((tech, idx) => (
                <div
                  key={tech.nombre}
                  className='h-[1.5em] flex items-center pl-8'
                >
                  <span className='text-green-400'>{`"${tech.nombre}"`}</span>
                  {idx < tecnologias.frontend.length - 1 && (
                    <span className='text-gray-300'>,</span>
                  )}
                </div>
              ))}

              {/* Línea 8 */}
              <div className='h-[1.5em] flex items-center pl-4'>
                <span className='text-gray-300'>],</span>
              </div>

              {/* Backend */}
              {/* Línea 9 */}
              <div className='h-[1.5em] flex items-center pl-4'>
                <span className='text-purple-400'>{'"backend"'}</span>
                <span className='text-gray-300'>: [</span>
              </div>

              {/* Líneas 10-14 */}
              {tecnologias.backend.map((tech, idx) => (
                <div
                  key={tech.nombre}
                  className='h-[1.5em] flex items-center pl-8'
                >
                  <span className='text-green-400'>{`"${tech.nombre}"`}</span>
                  {idx < tecnologias.backend.length - 1 && (
                    <span className='text-gray-300'>,</span>
                  )}
                </div>
              ))}

              {/* Línea 15 */}
              <div className='h-[1.5em] flex items-center pl-4'>
                <span className='text-gray-300'>],</span>
              </div>

              {/* Bases de Datos */}
              {/* Línea 16 */}
              <div className='h-[1.5em] flex items-center pl-4'>
                <span className='text-purple-400'>{'"databases"'}</span>
                <span className='text-gray-300'>: [</span>
              </div>

              {/* Líneas 17-18 */}
              {tecnologias.basesDeDatos.map((tech, idx) => (
                <div
                  key={tech.nombre}
                  className='h-[1.5em] flex items-center pl-8'
                >
                  <span className='text-green-400'>{`"${tech.nombre}"`}</span>
                  {idx < tecnologias.basesDeDatos.length - 1 && (
                    <span className='text-gray-300'>,</span>
                  )}
                </div>
              ))}

              {/* Línea 19 */}
              <div className='h-[1.5em] flex items-center pl-4'>
                <span className='text-gray-300'>],</span>
              </div>

              {/* Herramientas */}
              {/* Línea 20 */}
              <div className='h-[1.5em] flex items-center pl-4'>
                <span className='text-purple-400'>{'"tools"'}</span>
                <span className='text-gray-300'>: [</span>
              </div>

              {/* Líneas 21-26 */}
              {tecnologias.herramientas.map((tech, idx) => (
                <div
                  key={tech.nombre}
                  className='h-[1.5em] flex items-center pl-8'
                >
                  <span className='text-green-400'>{`"${tech.nombre}"`}</span>
                  {idx < tecnologias.herramientas.length - 1 && (
                    <span className='text-gray-300'>,</span>
                  )}
                </div>
              ))}

              {/* Línea 27 */}
              <div className='h-[1.5em] flex items-center pl-4'>
                <span className='text-gray-300'>]</span>
              </div>

              {/* Línea 28 */}
              <div className='h-[1.5em] flex items-center'>
                <span className='text-yellow-300'>{'}'}</span>
              </div>
            </div>

            {/* Footer del editor */}
            <div className='mt-4 px-4 text-xs text-gray-500 flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <span>UTF-8</span>
                <span>JavaScript</span>
                <span>Líneas: 23</span>
              </div>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
