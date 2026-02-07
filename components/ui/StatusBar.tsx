'use client'

import {
  Braces,
  Database,
  GitBranch,
  FolderGit2,
  RefreshCw,
  AlertCircle,
  AlertTriangle,
  Bell
} from 'lucide-react'
import type { StatusBarProps } from '@/lib/types'

export default function StatusBar({
  line = '1',
  col = '1',
  lang = 'TypeScript React',
  icon = 'code'
}: StatusBarProps) {
  const iconMap = {
    code: Braces,
    data_object: Database,
    history: GitBranch
  }

  const Icon = iconMap[icon as keyof typeof iconMap] || Braces

  return (
    <footer className='h-6 bg-primary flex items-center px-3 justify-between text-background-dark text-xs font-bold shrink-0 select-none z-10'>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-1 cursor-pointer hover:bg-black/10 px-1 rounded'>
          <FolderGit2 className='text-[14px] w-5 h-5' />
          <span>main*</span>
        </div>
        <div className='flex items-center gap-1 cursor-pointer hover:bg-black/10 px-1 rounded'>
          <RefreshCw className='text-[14px] w-5 h-5' />
          <span>0↓ 1↑</span>
        </div>
        <div className='hidden md:flex items-center gap-1 px-1'>
          <AlertCircle className='text-[14px] text-red-700 w-5 h-5' />
          <span>0</span>
          <AlertTriangle className='text-[14px] ml-2 w-5 h-5' />
          <span>0</span>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <div className='hidden md:flex items-center gap-1 cursor-pointer hover:bg-black/10 px-1 rounded'>
          <span>
            Ln {line}, Col {col}
          </span>
        </div>
        <div className='hidden md:flex items-center gap-1 cursor-pointer hover:bg-black/10 px-1 rounded'>
          <span>UTF-8</span>
        </div>
        <div className='flex items-center gap-1 cursor-pointer hover:bg-black/10 px-1 rounded'>
          <Icon className='text-[14px] w-5 h-5' />
          <span>{lang}</span>
        </div>
        <div className='flex items-center gap-1 cursor-pointer hover:bg-black/10 px-1 rounded'>
          <Bell className='text-[14px] w-5 h-5' />
        </div>
      </div>
    </footer>
  )
}
