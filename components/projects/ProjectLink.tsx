'use client'

import { CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { FiLink } from 'react-icons/fi'

interface ProjectLinkProps {
  homepage: string
}

const ProjectLink = ({ homepage }: ProjectLinkProps) => {
  return (
    <CardContent className='flex items-center gap-2 pb-2 pt-2'>
      <FiLink />
      <Link
        className='text-blue-400 hover:text-blue-200'
        href={homepage}
        target='_blank'
      >
        {homepage}
      </Link>
    </CardContent>
  )
}

export default ProjectLink
