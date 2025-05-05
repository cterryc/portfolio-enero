'use client'

import { CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ProjectSkillsProps {
  skills: string[]
}

const ProjectSkills = ({ skills }: ProjectSkillsProps) => {
  return (
    <CardContent className='back flex items-center flex-col gap-1 pb-2'>
      <h2>Tecnologias usadas</h2>
      <div>
        {skills.map((skill, index) => (
          <Badge className='bg-white px-1' key={index}>
            {skill}
          </Badge>
        ))}
      </div>
    </CardContent>
  )
}

export default ProjectSkills
