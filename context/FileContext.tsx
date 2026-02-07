'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react'

interface ItemArrayFiles {
  name: string
  path: string
  icon: string
  color: string
}

interface FilesItems {
  filesList: ItemArrayFiles[]
  addFile: (file: ItemArrayFiles) => void
  removeFile: (file: string) => void
  setShowTerminal: (show: boolean) => void
  showTerminal: boolean
}

const FilesContext = createContext<FilesItems | undefined>(undefined)

export function FilesProvider({ children }: { children: React.ReactNode }) {
  const [showTerminal, setShowTerminal] = useState(true)
  const [filesList, setFilesList] = useState<FilesItems['filesList']>([
    {
      name: 'about.md',
      path: '/',
      icon: 'description',
      color: 'orange'
    },
    {
      name: 'experience.git',
      path: '/experience',
      icon: 'history',
      color: 'orange'
    }
  ])

  const addFile = useCallback(
    (file: ItemArrayFiles) => {
      const findOne = filesList.find((item) => item.name === file.name)
      if (!findOne) {
        setFilesList([...filesList, file])
      }
    },
    [filesList]
  )

  const removeFile = useCallback((file: string) => {
    setFilesList((prev) => prev.filter((item) => item.name !== file))
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && (event.key === 'ñ' || event.key === 'Ñ')) {
        event.preventDefault()
        setShowTerminal((prev) => !prev)
        console.log('Terminal toggled!')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <FilesContext.Provider
      value={{ filesList, addFile, removeFile, showTerminal, setShowTerminal }}
    >
      {children}
    </FilesContext.Provider>
  )
}

export function useFiles() {
  const context = useContext(FilesContext)
  if (context === undefined) {
    throw new Error('useFiles must be used within a FilesProvider')
  }
  return context
}
