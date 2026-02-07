'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Folder,
  FolderOpen,
  File,
  FileJson,
  GitCommit,
  FileText,
  Terminal,
  MoreHorizontal,
  ChevronRight,
  Linkedin,
  Github,
  Mail,
  Menu,
  X
} from 'lucide-react'
import { useFiles } from '@/context/FileContext'
import { useProjects } from '@/context/ProjectsContext'
import { useState, useEffect } from 'react'

const iconMap = {
  javascript: File,
  data_object: FileJson,
  history: GitCommit,
  description: FileText,
  terminal: Terminal
}

const namesFiles = {
  about: 'Sobre Mí',
  experience: 'Experiencia',
  skills: 'Habilidades',
  contact: 'Contacto'
}

export default function Sidebar() {
  const pathname = usePathname()
  const { addFile } = useFiles()
  const { projects } = useProjects()
  const navigate = useRouter()
  const [openFolder, setOpenFolder] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false)
      }
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  // Cerrar sidebar al navegar en móvil
  useEffect(() => {
    if (isMobile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsMobileOpen(false)
    }
  }, [pathname, isMobile])

  const linkComponent = (
    path: string,
    color: string,
    name: string,
    icon: string
  ) => {
    const Icon = iconMap[icon as keyof typeof iconMap]
    const splitName = name.split('.')[0] as 'about'
    const nameFile = namesFiles[splitName]
    return (
      <Link
        href={path}
        className={`flex items-center gap-2 px-3 py-1.5 mb-0.5 w-full text-left hover:bg-white/5 group cursor-pointer ${
          pathname === path
            ? 'bg-primary/10 border-l-2 border-primary'
            : 'hover:bg-white/5'
        }`}
        onClick={() => {
          addFile({ color, icon, name, path })
          if (isMobile) setIsMobileOpen(false)
        }}
      >
        <Icon className={`text-${color}-400 text-[18px]`} />
        <span className='text-sm text-gray-400 group-hover:text-white'>
          {nameFile}
        </span>
      </Link>
    )
  }

  const sidebarContent = (
    <>
      <div className='h-10 px-4 flex items-center justify-between text-xs font-bold tracking-widest text-gray-400'>
        <span>EXPLORER</span>
        <MoreHorizontal className='text-[16px] cursor-pointer hover:text-white' />
      </div>
      <div className='flex-1 overflow-y-auto py-2'>
        <div className='px-2 pb-1'>
          <button className='flex items-center gap-1 w-full text-left text-xs font-bold text-gray-200 hover:text-white group'>
            <ChevronRight className='text-[16px] transition-transform group-hover:rotate-90' />
            PORTFOLIO-V2
          </button>
        </div>
        <div className='flex flex-col gap-0 mt-1' id='sidebar'>
          <div className='mt-2 px-2'>
            {linkComponent('/', 'orange', 'about.md', 'description')}
            {linkComponent(
              '/experience',
              'orange',
              'experience.git',
              'history'
            )}
          </div>
          <div
            className='pl-3 py-1 mx-2 mb-0.5 flex items-center gap-1.5 text-sm text-gray-400 cursor-pointer hover:bg-white/5'
            onClick={() => {
              setOpenFolder(!openFolder)
            }}
          >
            {projects.length && openFolder ? (
              <FolderOpen className='text-[16px]' />
            ) : (
              <Folder className='text-[16px]' />
            )}
            <span>Proyectos</span>
          </div>
          <div className='pl-8 flex flex-col gap-0.5'>
            {!!projects.length &&
              openFolder &&
              projects.map((file) => {
                const Icon = iconMap['description']
                return (
                  <button
                    key={file.id}
                    className={`flex items-center gap-2 px-3 py-1.5 w-full text-left transition-colors group cursor-pointer ${
                      pathname === '/' + file.id
                        ? 'bg-primary/10 border-l-2 border-primary'
                        : 'hover:bg-white/5'
                    }`}
                    onClick={() => {
                      addFile({
                        color: 'blue',
                        icon: 'description',
                        name: file.id + '.tsx',
                        path: '/' + file.id
                      })
                      navigate.push(`/${file.id}`)
                      if (isMobile) setIsMobileOpen(false)
                    }}
                  >
                    <Icon className={`text-blue-400 text-[18px]`} />
                    <span
                      className={`text-sm ${
                        pathname === '/' + file.id
                          ? 'text-white font-medium'
                          : 'text-gray-400 group-hover:text-white'
                      }`}
                    >
                      {file.title.split(' - ')[0]}
                    </span>
                  </button>
                )
              })}
          </div>
          <div className='px-2'>
            {linkComponent('/skills', 'green', 'skills.json', 'data_object')}
            {linkComponent('/contact', 'blue', 'contact.tsx', 'javascript')}
          </div>
        </div>
      </div>
      <div className='flex gap-4 mb-8 w-full justify-center' id='redes'>
        <a
          href='https://www.linkedin.com/in/developer-martel/'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white p-3 rounded-lg transition-colors'
        >
          <Linkedin className='w-6 h-6' />
        </a>
        <a
          href='https://github.com/cterryc'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors'
        >
          <Github className='w-6 h-6' />
        </a>
        <a
          href='mailto:danyel.martel@gmail.com'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors'
        >
          <Mail className='w-6 h-6' />
        </a>
      </div>
    </>
  )

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <button
        id='toggleMenu'
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={
          'md:hidden fixed top-1 right-1 z-50 p-2 bg-background-dark border border-border-dark rounded-lg hover:bg-white/5 transition-colors'
        }
        aria-label='Toggle menu'
      >
        {isMobileOpen ? (
          <X className='w-6 h-6 text-gray-400 hover:text-white' />
        ) : (
          <Menu className='w-6 h-6 text-gray-400 hover:text-white' />
        )}
      </button>

      {/* Overlay para móvil */}
      {isMobileOpen && isMobile && (
        <div
          className='md:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm'
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar para desktop */}
      <aside className='w-64 hidden md:flex flex-col bg-background-dark border-r border-border-dark shrink-0'>
        {sidebarContent}
      </aside>

      {/* Sidebar para móvil */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-64 flex flex-col bg-background-dark border-r border-border-dark shrink-0 z-40 transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
