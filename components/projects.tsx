'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IoExtensionPuzzleOutline } from 'react-icons/io5'
import ProjectCard from './projects/ProjectCard'
import SoonCard from './projects/SoonCard'
import { FaReact, FaGitAlt, FaGithub } from 'react-icons/fa'
import { RiNodejsFill, RiNextjsLine, RiTailwindCssFill } from 'react-icons/ri'
import { SiPostgresql, SiExpress, SiSequelize, SiPostman } from 'react-icons/si'
import { TbBrandRedux, TbBrandVite } from 'react-icons/tb'

const listaRepos = [
  {
    api: 'https://api.github.com/repos/cterryc/grimreaper-front',
    img: 'https://res.cloudinary.com/dniekrmqb/image/upload/v1725046794/portafolio/jthrlgwhpmzywde9oq7q.webp',
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
    img: 'https://res.cloudinary.com/dniekrmqb/image/upload/v1712559020/portafolio/hmwxoprxwzyphmu52poj.webp',
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
    img: 'https://res.cloudinary.com/dniekrmqb/image/upload/v1712559020/portafolio/zsve4caj9xzql0lotdna.webp',
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
    img: 'https://res.cloudinary.com/dniekrmqb/image/upload/v1746421671/portafolio/tic-tac-toe-cterryc.vercel.app2_vnjuud.webp',
    skills: [
      <FaReact key={2} className='h-5 w-5' />,
      <TbBrandRedux key={5} className='h-5 w-5' />,
      <TbBrandVite key={6} className='h-5 w-5' />,
      <FaGitAlt key={7} className='h-5 w-5' />,
      <FaGithub key={8} className='h-5 w-5' />
    ]
  },
  {
    api: 'https://api.github.com/repos/cterryc/rick-mory-nextjs',
    img: 'https://res.cloudinary.com/dniekrmqb/image/upload/v1739737313/portafolio/rick-mory-nextjs720_uusk7b.webp',
    skills: [
      <FaReact key={2} className='h-5 w-5' />,
      <RiNextjsLine key={10} className='h-5 w-5' />,
      <RiTailwindCssFill key={8} className='h-5 w-5' />,
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
      Promise.all(
        listaRepos.map((item) => fetch(item.api).then((res) => res.json()))
      ).then((response) => {
        response.forEach((ele, index) => {
          ele.img = listaRepos[index].img
          ele.skills = listaRepos[index].skills
        })
        setProjects(response)
      })
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
            <ProjectCard key={project?.name} project={project} />
          ))}
          {projects.length % 2 !== 0 && <SoonCard />}
        </div>
      </CardContent>
    </Card>
  )
}
