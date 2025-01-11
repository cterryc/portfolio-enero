'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Languages from './Languages'
import { SiExpress, SiSequelize, SiPostgresql, SiPostman } from 'react-icons/si'
import { FaReact, FaGitAlt, FaGithub } from 'react-icons/fa'
import { TbBrandVite, TbBrandRedux } from 'react-icons/tb'
import { IoExtensionPuzzleOutline } from 'react-icons/io5'
import { RiNodejsFill } from 'react-icons/ri'
import { FiLink } from 'react-icons/fi'
import { Badge } from './ui/badge'
import './Imgenreverse.css'

const listaRepos = [
  {
    api: 'https://api.github.com/repos/cterryc/grimreaper-front',
    img: 'https://res.cloudinary.com/dniekrmqb/image/upload/v1725046794/portafolio/jthrlgwhpmzywde9oq7q.png',
    skills: [
      <SiPostgresql key={0} className='h-5 w-5' />,
      <SiExpress key={1} className='h-5 w-5' />,
      <FaReact key={2} className='h-5 w-5' />,
      <RiNodejsFill key={3} className='h-5 w-5' />,
      <SiSequelize key={4} className='h-5 w-5' />,
      <TbBrandRedux key={5} className='h-5 w-5' />,
      <TbBrandVite key={6} className='h-5 w-5' />,
      <FaGitAlt key={7} className='h-5 w-5' />,
      <FaGithub key={8} className='h-5 w-5' />,
      <SiPostman key={9} className='h-5 w-5' />
    ]
  },
  {
    api: 'https://api.github.com/repos/pianti10/Bolsillo-Feliz',
    img: 'https://res.cloudinary.com/dniekrmqb/image/upload/v1712559020/portafolio/hmwxoprxwzyphmu52poj.png',
    skills: [
      <SiPostgresql key={0} className='h-5 w-5' />,
      <SiExpress key={1} className='h-5 w-5' />,
      <FaReact key={2} className='h-5 w-5' />,
      <RiNodejsFill key={3} className='h-5 w-5' />,
      <SiSequelize key={4} className='h-5 w-5' />,
      <TbBrandRedux key={5} className='h-5 w-5' />,
      <TbBrandVite key={6} className='h-5 w-5' />,
      <FaGitAlt key={7} className='h-5 w-5' />,
      <FaGithub key={8} className='h-5 w-5' />,
      <SiPostman key={9} className='h-5 w-5' />
    ]
  },
  {
    api: 'https://api.github.com/repos/cterryc/PI-Videogames-Vite',
    img: 'https://res.cloudinary.com/dniekrmqb/image/upload/v1712559020/portafolio/zsve4caj9xzql0lotdna.png',
    skills: [
      <SiPostgresql key={0} className='h-5 w-5' />,
      <SiExpress key={1} className='h-5 w-5' />,
      <FaReact key={2} className='h-5 w-5' />,
      <RiNodejsFill key={3} className='h-5 w-5' />,
      <SiSequelize key={4} className='h-5 w-5' />,
      <TbBrandRedux key={5} className='h-5 w-5' />,
      <TbBrandVite key={6} className='h-5 w-5' />,
      <FaGitAlt key={7} className='h-5 w-5' />,
      <FaGithub key={8} className='h-5 w-5' />,
      <SiPostman key={9} className='h-5 w-5' />
    ]
  },
  {
    api: 'https://api.github.com/repos/cterryc/tic-tac-toe',
    img: 'https://res.cloudinary.com/dniekrmqb/image/upload/v1712559019/portafolio/tdwaw7zg8l3wllakom0a.png',
    skills: [
      <FaReact key={2} className='h-5 w-5' />,
      <TbBrandRedux key={5} className='h-5 w-5' />,
      <TbBrandVite key={6} className='h-5 w-5' />,
      <FaGitAlt key={7} className='h-5 w-5' />,
      <FaGithub key={8} className='h-5 w-5' />
    ]
  }
]

interface ProjectsProps {
  title: string
  description: string
  name: string
  svn_url: string
  stargazers_count: string
  languages_url: string
  pushed_at: string
  homepage: string
  img: string
  skills: string[]
}

export function Projects() {
  const [projects, setProjects] = useState<ProjectsProps[]>([])

  useEffect(() => {
    try {
      const responses = Promise.all(
        listaRepos.map((item) => fetch(item.api).then((res) => res.json()))
      ).then((response) => {
        response.forEach((ele, index) => {
          ele.img = listaRepos[index].img
          ele.skills = listaRepos[index].skills
        })
        console.log(response)
        setProjects(response)
      })
      console.log(responses) // Aquí tienes un array con las respuestas
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [])

  return (
    <Card className='col-span-3'>
      <CardHeader>
        <CardTitle className='flex gap-2'>
          <IoExtensionPuzzleOutline />
          Proyectos Personales
        </CardTitle>
      </CardHeader>
      <CardContent className='max-[420px]:px-2'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {projects.map((project) => (
            <Card key={project?.name} className='grid grid-cols-1'>
              <CardHeader>
                <CardTitle className='text-lg'>{project?.name}</CardTitle>
              </CardHeader>
              <CardContent className='h-20 pb-0'>
                <p className='max-[550px]:text-sm max-[440px]:text-xs text-sm'>
                  {project?.description ||
                    'Proyecto para comparar precios de centros comerciales, proyecto realizado en Henry Bootcamp Genry'}
                </p>
              </CardContent>
              <CardContent className='flip-container pb-2'>
                <div className='flipper'>
                  {project.img && (
                    <div className='front'>
                      <Image
                        src={project.img}
                        width={500}
                        height={300}
                        alt={project.name}
                        className='imagen-projects'
                      />
                    </div>
                  )}
                  {project.skills && (
                    <CardContent className='back flex items-center flex-wrap gap-1 pb-2'>
                      <h2>Tecnologias usadas</h2>
                      <div>
                        {project.skills.map((skill, index) => {
                          return (
                            <Badge className='bg-white px-1' key={index}>
                              {skill}
                            </Badge>
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
                    className='text-blue-400 hover:text-blue-200'
                    href={project.homepage}
                  >
                    {project.homepage}
                  </Link>
                </CardContent>
              )}

              {project.languages_url && (
                <Languages
                  languages={project.languages_url}
                  svn={project.svn_url}
                />
              )}
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
