'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProjectsProps } from './types'
import ProjectImage from './ProjectImage'
import ProjectLink from './ProjectLink'
import Languages from '../Languages'

interface ProjectCardProps {
  project: ProjectsProps
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className='grid grid-cols-1'>
      <CardHeader className='py-2'>
        <CardTitle className='text-lg'>{project?.name}</CardTitle>
      </CardHeader>
      <CardContent className='h-20 pb-2 max-md:h-auto max-[810px]:h-[160px] max-xl:h-28 max-[932px]:h-[140px]'>
        <p className='max-[550px]:text-sm max-[440px]:text-xs text-sm'>
          {project?.description ||
            'Proyecto para comparar precios de centros comerciales, proyecto realizado en Henry Bootcamp Genry'}
        </p>
      </CardContent>
      <ProjectImage project={project} />
      {project.homepage && <ProjectLink homepage={project.homepage} />}
      {project.languages_url && (
        <Languages languages={project.languages_url} svn={project.svn_url} />
      )}
    </Card>
  )
}

export default ProjectCard
