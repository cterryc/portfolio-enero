'use client'

import { useState, useEffect } from 'react'
import { Monitor, Database, Server, Wrench, Code, Loader2 } from 'lucide-react'

export default function SkillsPage() {
  const [skills, setSkills] = useState<Record<string, string[]>>({
    frontend: [],
    backend: [],
    basesDeDatos: [],
    herramientas: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => {
        setSkills({
          frontend: data.frontend || [],
          backend: data.backend || [],
          basesDeDatos: data.basesDeDatos || [],
          herramientas: data.herramientas || []
        })
      })
      .catch((err) => console.error('Error loading skills:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className='flex-1 flex items-center justify-center bg-panel-dark'>
        <Loader2 className='w-10 h-10 text-primary animate-spin' />
      </div>
    )
  }

  // Generar dinámicamente las líneas del editor mock
  const codeLines: React.ReactNode[] = []
  let currentLine = 1

  const addCodeLine = (content: React.ReactNode, indent = 0) => {
    codeLines.push(
      <div
        key={currentLine}
        className='h-[1.5em] flex items-center'
        style={{ paddingLeft: `${indent * 1}rem` }}
      >
        {content}
      </div>
    )
    currentLine++
  }

  addCodeLine(<span className='text-yellow-300'>{'{'}</span>)

  const categories = Object.entries(skills)
  categories.forEach(([key, values], catIdx) => {
    addCodeLine(
      <>
        <span className='text-purple-400'>{`"${key}"`}</span>
        <span className='text-gray-300'>: [</span>
      </>,
      1
    )

    values.forEach((val, idx) => {
      addCodeLine(
        <>
          <span className='text-green-400'>{`"${val}"`}</span>
          {idx < values.length - 1 && <span className='text-gray-300'>,</span>}
        </>,
        2
      )
    })

    addCodeLine(
      <span className='text-gray-300'>
        {`]${catIdx < categories.length - 1 ? ',' : ''}`}
      </span>,
      1
    )
  })

  addCodeLine(<span className='text-yellow-300'>{'}'}</span>)

  return (
    <div className='flex-1 flex flex-col lg:flex-row overflow-hidden'>
      {/* Panel izquierdo: Tecnologías Visuales */}
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
              {skills.frontend.map((tech) => (
                <div
                  key={tech}
                  className='bg-background-dark rounded-lg border border-border-dark p-4 hover:border-primary/50 transition-colors group'
                >
                  <span className='text-white font-medium'>{tech}</span>
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
              {skills.backend.map((tech) => (
                <div
                  key={tech}
                  className='bg-background-dark rounded-lg border border-border-dark p-4 hover:border-blue-400/50 transition-colors group'
                >
                  <span className='text-white font-medium'>{tech}</span>
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
              {skills.basesDeDatos.map((tech) => (
                <div
                  key={tech}
                  className='bg-background-dark rounded-lg border border-border-dark p-4 hover:border-green-400/50 transition-colors group'
                >
                  <span className='text-white font-medium'>{tech}</span>
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
              {skills.herramientas.map((tech) => (
                <div
                  key={tech}
                  className='bg-background-dark rounded-lg border border-border-dark p-4 hover:border-purple-400/50 transition-colors group'
                >
                  <span className='text-white font-medium'>{tech}</span>
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

      {/* Panel derecho: Editor de código mejorado */}
      <div className='flex-1 lg:max-w-96 max-md:hidden p-0 overflow-y-auto bg-panel-dark relative'>
        <div className='flex font-mono text-sm leading-relaxed min-h-full'>
          {/* Números de línea */}
          <div className='w-12 shrink-0 flex flex-col bg-background-dark/30 border-r border-border-dark/50 py-5'>
            {Array.from({ length: currentLine - 1 }, (_, i) => (
              <div
                key={i}
                className='h-[1.5em] flex items-center justify-end pr-3 text-gray-600 select-none'
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Contenido del código dinámico */}
          <div className='flex-1 overflow-auto py-5'>
            <div className='space-y-0 px-4'>{codeLines}</div>

            {/* Footer del editor */}
            <div className='mt-4 px-4 text-xs text-gray-500 flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <span>UTF-8</span>
                <span>JSON</span>
                <span>Líneas: {currentLine - 1}</span>
              </div>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
