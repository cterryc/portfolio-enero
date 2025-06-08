'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { SiExpress, SiSequelize, SiPostgresql, SiPostman } from 'react-icons/si'
import { FaReact, FaGitAlt, FaGithub, FaWix } from 'react-icons/fa'
import { RiNodejsFill, RiNextjsFill } from 'react-icons/ri'
import { IoBriefcaseOutline } from 'react-icons/io5'
import { TbBrandRedux, TbBrandTypescript, TbBrandVercel } from 'react-icons/tb'
import { FiLink } from 'react-icons/fi'
import { Badge } from './ui/badge'
import './Imgenreverse.css'

const listaRepos = [
  {
    name: 'Facturagpt',
    description:
      'Desarrollé funciones plataforma que integraba APIs de Microsoft, Google y WhatsApp para capturar mensajes con archivos adjuntos (Drive, Gmail, Outlook, WhatsApp). Implementé la subida de archivos a S3, que luego eran procesados con la API de OpenAI.',
    api: 'https://api.github.com/repos/SAVIORPERU/SAVIORPERU',
    img: 'https://res.cloudinary.com/dniekrmqb/image/upload/v1749406028/portafolio/FacturaGpt2_njjvyq.webp',
    skills: [
      {
        skills: [
          <RiNextjsFill key={6} className='h-5 w-5' />,
          <FaReact key={2} className='h-5 w-5' />,
          <TbBrandRedux key={5} className='h-5 w-5' />,
          <TbBrandTypescript key={10} className='h-5 w-5' />
        ],
        name: 'FrontEnd'
      },
      {
        skills: [
          <FaGitAlt key={7} className='h-5 w-5' />,
          <FaGithub key={8} className='h-5 w-5' />,
          <TbBrandVercel key={11} className='h-5 w-5' />
        ],
        name: 'Tools'
      }
    ],
    homepage: 'https://facturagpt.com',
    languages_url: [
      'JavaScript',
      'React',
      'Redux',
      'Express',
      'CouchDB',
      'Nano'
    ]
  },
  {
    name: 'Savior',
    description:
      'Diseñé y desarrollé desde cero el frontend. Implementé carrito interactivo con sidebar, productos dinámicos, formulario de reclamos con envío vía WhatsApp, y gestión de estados con Context, useReducer y localStorage. Desplegado en Vercel con dominio propio y optimización de imágenes en Cloudinary.',
    api: 'https://api.github.com/repos/SAVIORPERU/SAVIORPERU',
    img: 'https://res.cloudinary.com/dniekrmqb/image/upload/v1746419358/portafolio/saviorperu.com_orql0e.webp',
    skills: [
      {
        skills: [
          <RiNextjsFill key={6} className='h-5 w-5' />,
          <FaReact key={2} className='h-5 w-5' />,
          <TbBrandRedux key={5} className='h-5 w-5' />,
          <TbBrandTypescript key={10} className='h-5 w-5' />
        ],
        name: 'FrontEnd'
      },
      {
        skills: [
          <FaGitAlt key={7} className='h-5 w-5' />,
          <FaGithub key={8} className='h-5 w-5' />,
          <TbBrandVercel key={11} className='h-5 w-5' />
        ],
        name: 'Tools'
      }
    ],
    homepage: 'https://saviorperu.com',
    languages_url: ['TypeScript', 'Next.js', 'React', 'Redux']
  },
  {
    name: 'Aythen',
    description:
      'Participé en el desarrollo de la aplicación, desde la creación de las partes que manejan la información en el back hasta la interfaz que ven los usuarios.',
    api: 'https://api.github.com/repos/cterryc/grimreaper-front',
    img: 'https://res.cloudinary.com/dniekrmqb/image/upload/v1739735833/portafolio/Aythen-720_bklwvi.webp',
    skills: [
      {
        skills: [
          <RiNextjsFill key={6} className='h-5 w-5' />,
          <FaReact key={2} className='h-5 w-5' />,
          <TbBrandRedux key={5} className='h-5 w-5' />
        ],
        name: 'FrontEnd'
      },
      {
        skills: [
          <SiExpress key={1} className='h-5 w-5' />,
          <RiNodejsFill key={3} className='h-5 w-5' />,
          <SiSequelize key={4} className='h-5 w-5' />
        ],
        name: 'BackEnd'
      },
      {
        skills: [<SiPostgresql key={0} className='h-5 w-5' />],
        name: 'DataBase'
      },
      {
        skills: [
          <FaGitAlt key={7} className='h-5 w-5' />,
          <FaGithub key={8} className='h-5 w-5' />,
          <SiPostman key={9} className='h-5 w-5' />
        ],
        name: 'Tools'
      }
    ],
    homepage: 'https://aythen.com',
    languages_url: [
      'JavaScript',
      'Next.js',
      'React',
      'Redux',
      'Express',
      'Sequelize',
      'PostgreSQL'
    ]
  },
  {
    name: 'Voy tu Asesora de belleza',
    description:
      'Mi primer proyecto profesional no-code fue una gran experiencia que me abrió las puertas al mundo del desarrollo web, mundo al que sigo dedicado desde entonces.',
    api: 'https://api.github.com/repos/pianti10/Bolsillo-Feliz',
    img: 'https://res.cloudinary.com/dniekrmqb/image/upload/v1739735833/portafolio/voy2-720_g8rgxe.webp',
    skills: [
      {
        skills: [<FaWix key={7} className='h-5 w-5' />],
        name: 'FrontEnd'
      }
    ],
    homepage: 'https://voytuasesora.wixsite.com/maquillaje',
    languages_url: ['No-Code']
  }
]

export function Experience() {
  return (
    <Card className='col-span-3'>
      <CardHeader>
        <CardTitle className='flex gap-2'>
          <IoBriefcaseOutline />
          Experiencia Laboral
        </CardTitle>
      </CardHeader>
      <CardContent className='max-[420px]:px-2'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {listaRepos.map((project) => (
            <Card key={project?.name} className='grid grid-cols-1'>
              <CardHeader className='py-2'>
                <CardTitle className='text-lg'>{project?.name}</CardTitle>
              </CardHeader>
              <CardContent className='h-20 pb-0 max-sm:h-auto max-[810px]:h-[160px] max-xl:h-28 max-[932px]:h-[140px]'>
                <p className='max-[550px]:text-sm max-[440px]:text-xs text-sm'>
                  {project?.description}
                </p>
              </CardContent>
              <CardContent className='flip-container pb-2 pt-2'>
                <div className='flipper'>
                  {project.img && (
                    <div className='front'>
                      <Image
                        src={project.img}
                        fill
                        alt={project.name}
                        className='imagen-projects object-contain'
                      />
                    </div>
                  )}
                  {project.skills && (
                    <CardContent className='back flex items-center flex-col gap-1 pb-0 px-1'>
                      <h2>Tecnologias usadas</h2>
                      <div className='flex gap-2'>
                        {project.skills.map((skills, i) => {
                          return (
                            <div
                              key={i}
                              className='text-sm flex flex-col w-full'
                            >
                              <h1 className='w-full max-[500px]:text-xs'>
                                {skills.name}
                              </h1>
                              <div className='flex justify-center'>
                                {skills.skills.map((skill, i) => {
                                  return (
                                    <Badge key={i} className='bg-white px-0'>
                                      {skill}
                                    </Badge>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  )}
                </div>
              </CardContent>
              {project.homepage && (
                <CardContent className='flex items-center gap-2 pb-2 pt-4'>
                  <FiLink />
                  <Link
                    className='text-blue-400 hover:text-blue-200 w-full text-sm'
                    href={project.homepage}
                    target='_blank'
                  >
                    {project.homepage}
                  </Link>
                </CardContent>
              )}
              <CardContent className='flex gap-1 flex-wrap h-16 pb-0'>
                {project.languages_url.map((ele, index) => {
                  return (
                    <Link
                      key={index}
                      href={project.homepage}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Badge className='bg-blue-800 hover:bg-blue-400 text-white'>
                        {ele}
                      </Badge>
                    </Link>
                  )
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
