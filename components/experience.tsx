'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { FiLink } from 'react-icons/fi'
import { FaReact, FaGitAlt, FaGithub, FaWix } from 'react-icons/fa'
import { RiNodejsFill, RiNextjsFill } from 'react-icons/ri'
import { TbBrandRedux } from 'react-icons/tb'
import { SiExpress, SiSequelize, SiPostgresql, SiPostman } from 'react-icons/si'
import { Badge } from './ui/badge'
import './Imgenreverse.css'

const nameSkills = ['Front-End', 'Back-End', 'Data-Base', 'Tools']

const listaRepos = [
  {
    name: 'Aythen',
    description:
      'Participé en el desarrollo de la aplicación, desde la creación de las partes que manejan la información en el back hasta la interfaz que ven los usuarios.',
    api: 'https://api.github.com/repos/cterryc/grimreaper-front',
    img: 'https://res.cloudinary.com/dniekrmqb/image/upload/v1736519838/Aythen_igi1dy.png',
    skills: [
      {
        skills: [
          <RiNextjsFill key={6} className='h-5 w-5' />,
          <FaReact key={2} className='h-5 w-5' />,
          <TbBrandRedux key={5} className='h-5 w-5' />
        ]
      },
      {
        skills: [
          <SiExpress key={1} className='h-5 w-5' />,
          <RiNodejsFill key={3} className='h-5 w-5' />,
          <SiSequelize key={4} className='h-5 w-5' />
        ]
      },
      { skills: [<SiPostgresql key={0} className='h-5 w-5' />] },
      {
        skills: [
          <FaGitAlt key={7} className='h-5 w-5' />,
          <FaGithub key={8} className='h-5 w-5' />,
          <SiPostman key={9} className='h-5 w-5' />
        ]
      }
    ],
    homepage: 'https://aythen.com',
    languages_url: ['JavaScript', 'CSS', 'HTML']
  },
  {
    name: 'Voy tu Asesora de belleza',
    description:
      'Mi primer proyecto profesional no-code fue una gran experiencia que me abrió las puertas al mundo del desarrollo web, mundo al que sigo dedicado desde entonces.',
    api: 'https://api.github.com/repos/pianti10/Bolsillo-Feliz',
    img: 'https://res.cloudinary.com/dniekrmqb/image/upload/v1736520386/voy2-720_wf20wt.png',
    skills: [
      {
        skills: [<FaWix key={7} className='h-5 w-5' />]
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
        <CardTitle>Experiencia Laboral</CardTitle>
      </CardHeader>
      <CardContent className='max-[420px]:px-2'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {listaRepos.map((project) => (
            <Card key={project?.name} className='grid grid-cols-1'>
              <CardHeader>
                <CardTitle className='text-lg'>{project?.name}</CardTitle>
              </CardHeader>
              <CardContent className='h-20 pb-0'>
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
                        width={500}
                        height={260}
                        alt={project.name}
                        className='imagen-projects'
                      />
                    </div>
                  )}
                  {project.skills && (
                    <CardContent className='back flex items-center flex-col gap-1 pb-0 px-1'>
                      <h2>Tecnologias usadas</h2>
                      <div className='grid grid-cols-4 gap-x-2'>
                        {project.skills.map((skills, i) => {
                          return (
                            <div
                              key={i}
                              className='text-sm flex flex-col w-full'
                            >
                              <h1 className='w-full'>{nameSkills[i]}</h1>
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
                <CardContent className='flex items-center gap-2 pb-2 pt-2'>
                  <FiLink />
                  <Link
                    className='text-blue-400 hover:text-blue-200 w-full text-sm'
                    href={project.homepage}
                  >
                    {project.homepage}
                  </Link>
                </CardContent>
              )}
              <CardContent>
                {project.languages_url.map((ele, index) => {
                  return (
                    <Link
                      key={index}
                      href={project.homepage}
                      target=' _blank'
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
