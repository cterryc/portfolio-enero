'use client'

import Image from 'next/image'
import { CardContent } from '@/components/ui/card'
import { ProjectsProps } from './types'
import ProjectSkills from './ProjectSkills'

interface ProjectImageProps {
  project: ProjectsProps
}

const ProjectImage = ({ project }: ProjectImageProps) => {
  return (
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
        {project.skills && <ProjectSkills skills={project.skills} />}
      </div>
    </CardContent>
  )
}

export default ProjectImage
