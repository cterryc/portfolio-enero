'use client'

import Image from 'next/image'
import {
  User,
  Briefcase,
  // Code,
  MapPin,
  Calendar,
  Cpu,
  GraduationCap,
  Award,
  ExternalLink,
  Linkedin,
  Github,
  Mail
} from 'lucide-react'
import Link from 'next/link'
import { useFiles } from '@/context/FileContext'
import { useProjects } from '@/context/ProjectsContext'
import { useEffect } from 'react'
import { driver } from 'driver.js'

export default function SobreMi() {
  const { addFile } = useFiles()
  const { projects } = useProjects()

  useEffect(() => {
    const getDriverFromStorage = window.localStorage.getItem('driverGuide')
    const driverFromStorage = getDriverFromStorage
      ? JSON.parse(getDriverFromStorage)
      : null

    // ✅ Usar matchMedia para mejor compatibilidad
    const isDesktop = window.matchMedia('(min-width: 768px)').matches

    if (!driverFromStorage && isDesktop) {
      setTimeout(() => {
        const driverObj = driver({
          showProgress: true,
          steps: [
            {
              element: '#sidebar',
              popover: {
                title: 'Barra de Archivos',
                description:
                  'Archivos con información "Sobre mí, Experiencias, Proyectos, Habilidades y Contacto".'
              }
            },
            {
              element: '#tabsbar',
              popover: {
                title: 'Archivos abiertos',
                description: 'Aquí se mostrarán los archivos abiertos.'
              }
            },
            {
              element: '#terminal',
              popover: {
                title: 'Terminal interactivo',
                description: 'Escribe "help" para ver los comandos.'
              }
            },
            {
              element: '#redes',
              popover: {
                title: 'Contactame',
                description:
                  'Ponte en contacto conmigo, que tengas un excelente día.'
              }
            }
          ],
          allowClose: false
        })

        driverObj.drive()
        window.localStorage.setItem(
          'driverGuide',
          JSON.stringify('driverGuide')
        )
      }, 300)
    } else if (!driverFromStorage) {
      setTimeout(() => {
        const driverObj = driver({
          showProgress: true,
          steps: [
            {
              element: '#toggleMenu',
              popover: {
                title: 'Menú de Archivos',
                description:
                  'Para una mejor experiencia, te recomiendo usar un ordenador o PC.'
              }
            },
            {
              element: '#displayOne',
              popover: {
                title: 'Descripción Detallada',
                description:
                  'Aquí encontrarás información completa y detallada del archivo seleccionado.'
              }
            },
            {
              element: '#displayTwo',
              popover: {
                title: 'Información Resumida',
                description:
                  'Muestra un resumen conciso con los datos más importantes del archivo.'
              }
            }
          ],
          allowClose: false
        })

        driverObj.drive()
        window.localStorage.setItem(
          'driverGuide',
          JSON.stringify('driverGuide')
        )
      }, 300)
    }
  }, [])

  const educacion = [
    {
      titulo: 'Técnico Redes y Comunicaciones',
      institucion: 'Instituto Tecnológico IDAT',
      periodo: 'Mayo 2016 - Junio 2018'
    },
    {
      titulo: 'Full Stack Web Developer',
      institucion: 'Henry Bootcamp',
      periodo: 'Mayo 2022 - Mayo 2023'
    }
    // {
    //   titulo: 'HTML/CSS',
    //   institucion: 'Udemy',
    //   periodo: '2020'
    // },
    // {
    //   titulo: 'Escuela de Javascript',
    //   institucion: 'Udemy',
    //   periodo: '2021'
    // }
  ]

  return (
    <div className='flex-1 flex flex-col lg:flex-row overflow-hidden'>
      {/* Panel izquierdo: Descripción detallada */}
      <div
        className='flex-1 lg:w-2/3 overflow-y-auto bg-panel-dark relative border-b lg:border-b-0 lg:border-r border-border-dark'
        id='displayOne'
      >
        <div className='p-6 md:p-8 max-w-3xl mx-auto'>
          {/* Sección: Sobre mí */}
          <div className='mb-10'>
            <div className='flex items-center gap-3 mb-6'>
              <h2 className='text-lg font-bold text-white'>
                Full Stack Developer - 2 años construyendo aplicaciones
                escalables con React, Node.js y PostgreSQL.
              </h2>
            </div>
            <div className='flex items-center gap-3 mb-6'>
              <User className='text-primary w-7 h-7' />
              <h2 className='text-2xl font-bold text-white'>Sobre Mí</h2>
            </div>
            <div className='prose prose-invert max-w-none'>
              <p className='text-gray-300 leading-relaxed mb-4'>
                Disfruto el ensamblaje de computadoras y comprendo la
                importancia de una base sólida en hardware para el desarrollo de
                software. Esto me permite tener una comprensión profunda de cómo
                interactúan los componentes de hardware y software para crear
                aplicaciones eficientes y robustas.
              </p>
              <p className='text-gray-300 leading-relaxed'>
                Me formé en el {'"Instituto Tecnológico IDAT"'} y en el bootcamp{' '}
                {'"Soy Henry"'}, adquiriendo conocimientos sólidos en una amplia
                gama de tecnologías y metodologías de desarrollo.
              </p>
            </div>
          </div>

          {/* Sección: Experiencia Destacada */}
          <div className='mb-10'>
            <div className='flex items-center gap-3 mb-6'>
              <Briefcase className='text-primary w-7 h-7' />
              <h2 className='text-2xl font-bold text-white'>
                Experiencia Destacada
              </h2>
            </div>
            <div className='bg-background-dark rounded-xl border border-border-dark p-6'>
              <h3 className='text-white text-xl font-semibold mb-3'>
                Implementación Cloud
              </h3>
              <p className='text-gray-300 mb-4'>
                Implementé integraciones con Microsoft Azure y Google Cloud,
                desarrollando el backend para autenticación (login) mediante
                ambas plataformas. Habilité el acceso programático a servicios
                como Gmail, Outlook, Google Drive y OneDrive, gestionando la
                obtención y procesamiento de la información de cada proveedor.
              </p>
              <div className='flex flex-wrap gap-3'>
                <span className='px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center gap-2'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full'></span>
                  Microsoft Azure
                </span>
                <span className='px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm flex items-center gap-2'>
                  <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                  Google Cloud
                </span>
                <span className='px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-full text-sm flex items-center gap-2'>
                  <span className='w-2 h-2 bg-yellow-500 rounded-full'></span>
                  APIs de Correo
                </span>
                <span className='px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm flex items-center gap-2'>
                  <span className='w-2 h-2 bg-purple-500 rounded-full'></span>
                  Drive/OneDrive
                </span>
              </div>
            </div>
          </div>

          {/* Sección: Educación */}
          <div className='mb-8'>
            <div className='flex items-center gap-3 mb-6'>
              <GraduationCap className='text-primary w-7 h-7' />
              <h2 className='text-2xl font-bold text-white'>
                Educación y Certificaciones
              </h2>
            </div>
            <div className='space-y-4'>
              {educacion.map((item, index) => (
                <div
                  key={index}
                  className='bg-background-dark rounded-lg border border-border-dark p-5 hover:border-primary/30 transition-colors'
                >
                  <div className='flex flex-col md:flex-row md:items-center justify-between mb-2'>
                    <h3 className='text-white font-semibold text-lg'>
                      {item.titulo}
                    </h3>
                    <span className='text-primary text-sm font-mono mt-1 md:mt-0'>
                      {item.periodo}
                    </span>
                  </div>
                  <p className='text-gray-300'>{item.institucion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Enlace al portafolio */}
          {!!projects.length && (
            <div className='mt-10 pt-6 border-t border-border-dark'>
              <Link
                href={'/' + projects[0].id}
                className='inline-flex items-center gap-2 text-primary hover:text-green-400 transition-colors'
                onClick={() => {
                  addFile({
                    color: 'blue',
                    icon: 'description',
                    name: projects[0].id + '.tsx',
                    path: '/' + projects[0].id
                  })
                }}
              >
                <span>Ver mis proyectos</span>
                <ExternalLink className='w-4 h-4' />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Panel Derecho: Foto e información básica */}
      <div
        className='flex-1 lg:max-w-96 p-6 overflow-y-auto  bg-panel-dark'
        id='displayTwo'
      >
        <div className='flex flex-col items-center'>
          {/* Foto de perfil */}
          <div className='relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 mb-6'>
            <Image
              src='https://res.cloudinary.com/dniekrmqb/image/upload/q_auto/v1736975908/eie39wrcbgdhayy5qqu8.webp'
              alt='Daniel Martel - Desarrollador Web'
              fill
              className='object-cover'
              priority
            />
          </div>

          <h1 className='text-3xl font-bold text-white mb-2 text-center'>
            Daniel Martel
          </h1>
          <p className='text-primary text-lg mb-6 text-center'>
            Desarrollador Web App
          </p>

          {/* Información de contacto */}
          <div className='w-full space-y-2 mb-6'>
            <div className='flex items-center justify-center gap-2 text-gray-300'>
              <MapPin className='text-primary w-5 h-5' />
              <span>Lima, Perú</span>
            </div>
            <div className='flex items-center  justify-center gap-2 text-gray-300'>
              <Calendar className='text-primary w-5 h-5' />
              <span>2 años de experiencia</span>
            </div>
            <div className='flex items-center  justify-center gap-2 text-gray-300'>
              <Cpu className='text-primary w-5 h-5' />
              <span>Ensamble de computadoras</span>
            </div>
          </div>

          {/* Enlaces a redes */}
          <div className='flex gap-4 mb-6'>
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

          {/* Tarjeta de experiencia destacada */}
          <div className='w-full bg-background-dark rounded-xl p-5 border border-border-dark'>
            <div className='flex items-center gap-2 mb-3'>
              <Award className='text-yellow-500 w-5 h-5' />
              <h3 className='text-white font-semibold'>Logro Destacado</h3>
            </div>
            <p className='text-gray-300 text-sm'>
              Implementación de Microsoft Azure y Google Cloud para
              autenticación y acceso a APIs de correo, Drive y OneDrive.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
