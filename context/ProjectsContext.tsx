'use client'

import { ProjectsContextProps } from '@/lib/types'
import { createContext, useContext, useEffect, useState } from 'react'

const ProjectsContext = createContext<ProjectsContextProps | undefined>(
  undefined
)

export const ProjectsProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [projects, setProjects] = useState<ProjectsContextProps['projects']>([])
  const [projectsErrorFetch, setProjectsErrorFetch] = useState('')

  useEffect(() => {
    if (!projects.length) {
      fetch('/api/projects')
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          setProjects(data)
          return
        })
        .catch((error) => {
          console.error(error)
          setProjectsErrorFetch(error.message)
          return
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const removeProject = (idProject: string) => {
    setProjects((prev) => {
      return prev.filter((project) => project.id !== idProject)
    })
  }

  return (
    <ProjectsContext.Provider
      value={{ projects, projectsErrorFetch, removeProject }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectsContext)
  if (context === undefined) {
    throw new Error('useFiles must be used within a FilesProvider')
  }
  return context
}
