'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Eye, Info, Code, ExternalLink, Github } from 'lucide-react'
// import { projects } from '@/lib/projects'
import { useParams } from 'next/navigation'
import { useProjects } from '@/context/ProjectsContext'
import { useFiles } from '@/context/FileContext'

export default function ProjectExplorerPage() {
  const { projects } = useProjects()
  const { addFile, filesList } = useFiles()
  const params = useParams()
  const [selectedProject, setSelectedProject] = useState({
    id: '',
    title: '',
    description: '',
    longDescription: '',
    liveUrl: '',
    repoUrl: '',
    imageUrl: '',
    technologies: ['', ''],
    features: ['', '', ''],
    stats: [
      { label: 'Performance', val: '--', color: 'gray' },
      { label: 'SEO', val: '--', color: 'gray' },
      { label: 'Accessibility', val: '--', color: 'gray' },
      { label: 'Commits', val: '--', color: 'gray' }
    ],
    codeSnippet: {
      file: '',
      language: '',
      lines: ['', '', '']
    }
  })

  const [imageError, setImageError] = useState(false)

  // Encontrar proyecto por ID de la ruta
  useEffect(() => {
    if (params.id) {
      const project = projects.find((p) => p.id === params.id)
      if (project) {
        const findFromFileList = filesList.find((file) => {
          return file.path === params.id
        })

        if (!findFromFileList) {
          addFile({
            color: 'blue',
            icon: 'description',
            name: project.id + '.tsx',
            path: '/' + project.id
          })
        }
        setSelectedProject(project)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, projects])

  // Manejar error en imagen
  const handleImageError = () => {
    setImageError(true)
  }

  // Placeholder para imagen
  const placeholderImage =
    'data:image/svg+xml;base64,' +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#1a1a1a"/>
      <rect x="50" y="50" width="700" height="500" fill="#2a2a2a" rx="10"/>
      <text x="400" y="300" text-anchor="middle" fill="#4a4a4a" font-family="Arial" font-size="24">
        ${selectedProject.title}
      </text>
      <text x="400" y="330" text-anchor="middle" fill="#3a3a3a" font-family="Arial" font-size="16">
        Captura del proyecto
      </text>
    </svg>
  `)

  // Función auxiliar para resaltar sintaxis de forma más precisa
  const highlightSyntax = (line: string) => {
    if (line.trim().startsWith('//'))
      return <span className='text-gray-500 italic'>{line}</span>

    return line
      .split(/(\s+|\(|\)|\[|\]|\{|\}|\.|\,|=|:|;|\?|\!)/)
      .map((part, i) => {
        if (
          /^(export|const|let|var|return|async|await|if|else|try|catch|import|from|type|interface|default)$/.test(
            part
          )
        ) {
          return (
            <span key={i} className='text-pink-400'>
              {part}
            </span>
          )
        }
        if (
          /^(function|dispatch|useReducer|addItem|removeItem|fetchGames|fetch|axios|launch|newPage|evaluate|launch|get|set|delete)$/.test(
            part
          )
        ) {
          return (
            <span key={i} className='text-yellow-300'>
              {part}
            </span>
          )
        }
        if (/^(['"].*['"])$/.test(part)) {
          return (
            <span key={i} className='text-green-400'>
              {part}
            </span>
          )
        }
        if (/^[0-9]+$/.test(part)) {
          return (
            <span key={i} className='text-orange-400'>
              {part}
            </span>
          )
        }
        if (/^[A-Z][a-zA-Z0-9]+$/.test(part)) {
          return (
            <span key={i} className='text-blue-300'>
              {part}
            </span>
          )
        }
        if (/^(=|=>|\+|\-|\*|\/|:|!|\?)$/.test(part)) {
          return (
            <span key={i} className='text-purple-400'>
              {part}
            </span>
          )
        }
        return <span key={i}>{part}</span>
      })
  }

  return (
    <div className='flex-1 flex flex-col lg:flex-row overflow-hidden'>
      {/* Panel izquierdo: Código/Detalles */}
      <div className='flex-1 overflow-y-auto bg-panel-dark relative border-b lg:border-b-0 lg:border-r border-border-dark'>
        <div className='p-8 max-w-3xl mx-auto'>
          <div className='mb-6'>
            <p className='font-mono text-primary text-sm mb-2'>
              # Detalles del Proyecto
            </p>
            <h1 className='text-4xl font-bold text-white mb-4 tracking-tight'>
              {selectedProject.title}
            </h1>
            <div className='flex flex-wrap gap-2 mb-6'>
              {selectedProject.technologies.map((tech, index) => (
                <span
                  key={index}
                  className='px-3 py-1 rounded bg-white/5 border border-white/10 text-gray-300 text-xs font-mono'
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className='prose prose-invert prose-p:text-gray-400 prose-headings:text-white max-w-none'>
            <h3 className='text-lg font-semibold text-white mb-2 flex items-center gap-2'>
              <Info className='text-primary text-xl' />
              Descripción General
            </h3>
            <p className='text-gray-400 leading-relaxed mb-6'>
              {selectedProject.longDescription}
            </p>

            <h3 className='text-lg font-semibold text-white mb-2 flex items-center gap-2'>
              <Code className='text-primary text-xl' />
              Implementación Clave
            </h3>

            {/* RENDERIZADO MEJORADO DEL EDITOR DE CÓDIGO */}
            <div className='bg-[#0d1117] rounded-lg border border-border-dark overflow-hidden mb-8 font-mono text-[13px] relative group shadow-2xl'>
              <div className='px-4 py-2 bg-[#161b22] border-b border-white/5 text-xs text-gray-400 flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <Code size={14} className='text-blue-400' />
                  <span>{selectedProject.codeSnippet.file}</span>
                </div>
                <span className='bg-white/5 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider'>
                  {selectedProject.codeSnippet.language}
                </span>
              </div>
              <div className='p-4 overflow-x-auto custom-scrollbar bg-[#0d1117]'>
                <table className='w-full border-collapse'>
                  <tbody>
                    {selectedProject.codeSnippet.lines.map((line, index) => (
                      <tr
                        key={index}
                        className='hover:bg-white/2 group/line leading-6'
                      >
                        <td className='text-gray-600 w-10 text-right pr-4 select-none border-r border-white/5 font-mono text-xs'>
                          {index + 1}
                        </td>
                        <td className='pl-4 whitespace-pre text-[#e6edf3]'>
                          {highlightSyntax(line)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 mt-8'>
              <a
                href={selectedProject.repoUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='flex-1 bg-white hover:bg-gray-100 text-background-dark font-bold py-3 px-4 rounded flex items-center justify-center gap-1 transition-colors text-sm'
              >
                <Github size={20} />
                Código Fuente
              </a>
              <a
                href={selectedProject.liveUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='flex-1 bg-transparent hover:bg-white/5 border border-border-dark text-white font-bold py-3 px-4 rounded flex items-center justify-center gap-1 transition-colors text-sm'
              >
                <ExternalLink size={20} />
                Sitio en Vivo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho: Vista previa visual */}
      <div className='flex-1 p-6 overflow-y-auto  bg-panel-dark lg:max-w-96'>
        <div className='bg-background-dark rounded-xl overflow-hidden shadow-2xl border border-border-dark'>
          <div className='h-8 bg-[#1a2e24] flex items-center px-4 gap-2 border-b border-border-dark'>
            <div className='flex gap-1.5'>
              <div className='w-3 h-3 rounded-full bg-red-500/80'></div>
              <div className='w-3 h-3 rounded-full bg-yellow-500/80'></div>
              <div className='w-3 h-3 rounded-full bg-green-500/80'></div>
            </div>
            <div className='flex-1 flex justify-center'>
              <div className='bg-black/20 px-3 py-0.5 rounded text-[10px] text-gray-500 font-mono truncate max-w-50'>
                {selectedProject.liveUrl.replace('https://', '')}
              </div>
            </div>
          </div>
          <div className='relative aspect-video w-full bg-gray-900 group'>
            {!imageError && selectedProject.imageUrl ? (
              <Image
                alt={`Captura de ${selectedProject.title}`}
                src={selectedProject.imageUrl}
                fill
                className='object-cover opacity-90 group-hover:opacity-100 transition-opacity'
                onError={handleImageError}
              />
            ) : (
              <div
                className='absolute inset-0 bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center'
                style={{
                  backgroundImage: `url("${placeholderImage}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            )}
            <div className='absolute inset-0 flex flex-col gap-1 items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]'>
              <a
                href={selectedProject.liveUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-primary hover:bg-green-400 text-background-dark font-bold py-2 px-6 rounded-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300'
              >
                <Eye size={18} />
                Ver Demo en Vivo
              </a>
              <a
                href={selectedProject.repoUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-white hover:bg-gray-200 text-background-dark font-bold py-2 px-6 rounded-lg flex items-center justify-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 w-full max-w-52'
              >
                <Github size={18} />
                Ver Código
              </a>
            </div>
          </div>
        </div>

        <div className='mt-3 grid grid-cols-2 gap-2'>
          {selectedProject.stats.map((stat) => (
            <div
              key={stat.label}
              className='bg-background-dark p-3 rounded-lg border border-border-dark'
            >
              <div className='text-xs text-gray-500 uppercase'>
                {stat.label}
              </div>
              <div className={`text-${stat.color}-400 font-bold text-base`}>
                {stat.val}
              </div>
            </div>
          ))}
        </div>

        <div className='mt-3 bg-background-dark p-4 rounded-lg border border-border-dark'>
          <h3 className='text-white font-bold mb-3 flex items-center gap-2'>
            <Info size={18} className='text-primary' />
            Características Principales
          </h3>
          <ul className='space-y-2'>
            {selectedProject.features.slice(0, 4).map((feature, index) => (
              <li
                key={index}
                className='text-gray-400 text-sm flex items-start gap-2'
              >
                <span className='text-primary mb-1'>•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
