'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { File, FileJson, FileText, GitCommit, Terminal, X } from 'lucide-react'
import { useFiles } from '@/context/FileContext'

export default function TabsBar() {
  const pathname = usePathname()
  const route = useRouter()

  const { filesList, removeFile } = useFiles()

  const iconMap = {
    javascript: File,
    data_object: FileJson,
    history: GitCommit,
    description: FileText,
    terminal: Terminal
  }

  return (
    <div
      className='flex h-10 bg-background-dark border-b border-border-dark overflow-x-auto no-scrollbar max-md:hidden'
      id='tabsbar'
    >
      {filesList.map((tab, i) => {
        const Icon = iconMap[tab.icon as keyof typeof iconMap]
        return (
          <Link
            key={tab.path}
            href={tab.path}
            className={`flex items-center gap-2 px-4 min-w-35 border-t-2 text-sm transition-colors ${
              pathname === tab.path
                ? 'border-t-primary bg-panel-dark text-white'
                : 'border-t-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
            }`}
            aria-disabled={true}
          >
            <Icon className={`text-${tab.color}-400 text-[16px]`} />
            <span>{tab.name}</span>
            <X
              className={`text-[14px] ml-auto hover:text-white/80 w-5 h-5 ${filesList.length === 1 ? 'cursor-not-allowed' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log(tab.path, pathname)

                if (filesList.length !== 1) {
                  if (tab.path === pathname) {
                    route.push(filesList[i === 0 ? 1 : i - 1].path)
                  }
                  removeFile(tab.name)
                }
              }}
            />
          </Link>
        )
      })}
    </div>
  )
}
