'use client'

import { useState, useEffect } from 'react'
import { GitCommit as GitCommitIcon, Merge, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Commit } from '@/lib/types'

export default function ExperiencePage() {
  const [commits, setCommits] = useState<Commit[]>([])
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/commits')
      .then(res => res.json())
      .then(data => {
        setCommits(data)
        if (data.length > 0) setSelectedCommit(data[0])
      })
      .catch(err => console.error('Error loading experience:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-panel-dark">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    )
  }

  if (commits.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-panel-dark text-gray-500 font-mono italic">
        // No commits found in history.
      </div>
    )
  }

  return (
    <div className='flex-1 flex flex-col lg:flex-row overflow-hidden'>
      {/* Left Pane: Git Log */}
      <div className='flex-1 lg:max-w-96 2xl:max-w-max overflow-y-auto border-b lg:border-b-0 lg:border-r border-border-dark bg-panel-dark font-mono text-xs md:text-sm'>
        <div className='sticky top-0 z-10 bg-background-dark border-b border-border-dark px-4 py-2 flex text-gray-500 text-[10px] uppercase tracking-wider'>
          <div className='w-16'>Graph</div>
          <div className='w-20'>Hash</div>
          <div className='flex-1'>Description</div>
          <div className='hidden sm:block'>Date</div>
        </div>

        <div className='flex flex-col'>
          {commits.map((commit) => (
            <div
              key={commit.hash}
              onClick={() => setSelectedCommit(commit)}
              className={`flex items-center group cursor-pointer hover:bg-white/5 border-l-2 transition-colors ${
                selectedCommit?.hash === commit.hash
                  ? 'bg-white/10 border-primary'
                  : commit.head
                    ? 'bg-white/5 border-blue-500'
                    : 'border-transparent'
              }`}
            >
              <div className='w-16 pl-4 py-3 shrink-0 font-bold text-lg leading-none select-none text-primary flex items-center gap-1'>
                {commit.merge ? (
                  <>
                    <Merge className='w-3 h-3 text-green-500' />
                    <span className='text-primary'>|</span>
                  </>
                ) : (
                  <GitCommitIcon className='w-4 h-4' />
                )}
              </div>
              <div className='w-20 shrink-0 text-yellow-500 group-hover:underline text-[10px]'>
                {commit.hash.substring(0, 8)}
              </div>
              <div className='flex-1 py-3 pr-4 truncate'>
                {commit.head && (
                  <span className='text-blue-400 mr-2'>(HEAD → {commit.branch || 'freelance'})</span>
                )}
                {commit.branch && !commit.head && (
                  <span className='text-pink-400 mr-2'>({commit.branch})</span>
                )}
                <span className='text-white font-bold'>{commit.role}</span>
                {commit.company && (
                  <span className='text-gray-500'> @ {commit.company}</span>
                )}
              </div>
              <div className='hidden sm:block text-gray-500 text-[10px] pr-4'>
                {commit.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Pane: Commit Details */}
      <div className='flex-1 lg:w-7/12 overflow-y-auto bg-panel-dark relative border-l border-border-dark'>
        <AnimatePresence mode="wait">
          {selectedCommit && (
            <motion.div 
              key={selectedCommit.hash}
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              transition={{ duration: 0.15 }}
              className='p-6 md:p-8 font-mono text-sm leading-relaxed max-w-4xl'
            >
              <div className='mb-6 pb-6 border-b border-white/5'>
                <div className='flex flex-col gap-1 mb-4'>
                  <div className='flex gap-2 text-yellow-500 text-xs md:text-sm'>
                    commit {selectedCommit.hash}
                    {selectedCommit.head && (
                      <span className='text-blue-400'>(HEAD → {selectedCommit.branch})</span>
                    )}
                  </div>
                  <div className='text-gray-400 text-xs'>
                    Author: <span className='text-white'>Daniel Martel</span>
                    {selectedCommit.details.location && (
                      <span className='text-gray-500 ml-2'>
                        • {selectedCommit.details.location}
                      </span>
                    )}
                  </div>
                  <div className='text-gray-400 text-xs'>
                    Date:{' '}
                    <span className='text-white'>
                      {selectedCommit.details.period}
                    </span>
                  </div>
                </div>
                <div className='pl-4 border-l-2 border-white/10 text-gray-200'>
                  <p className='font-bold text-lg mb-2 text-white'>
                    {selectedCommit.details.title}
                  </p>
                  <p className='text-gray-400 mb-4'>
                    {selectedCommit.details.description}
                  </p>

                  <div className='flex flex-wrap gap-2 mb-4'>
                    {selectedCommit.details.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className='px-2 py-1 bg-white/5 rounded text-[10px] text-cyan-400 border border-white/10'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className='space-y-1'>
                <div className='text-cyan-600 text-[10px] mb-2'>
                  @@ -0,0 +1,{selectedCommit.details.achievements.length + 2} @@
                </div>
                <div className='text-green-400'>+ ## Logros Principales</div>
                {selectedCommit.details.achievements.map((achievement, index) => (
                  <div key={index} className='text-green-400'>
                    + • {achievement}
                  </div>
                ))}

                <div className='mt-6 pt-4 border-t border-white/5'>
                  <div className='text-cyan-600 text-[10px] mb-2'>@@ -0,0 +1,3 @@</div>
                  <div className='text-green-400'>+ ## Información del Branch</div>
                  <div className='text-green-400'>
                    + Branch:{' '}
                    <span className='text-pink-400'>
                      {selectedCommit.branch || 'main'}
                    </span>
                  </div>
                  <div className='text-green-400'>
                    + Status:{' '}
                    <span
                      className={
                        selectedCommit.head ? 'text-blue-400' : 'text-gray-400'
                      }
                    >
                      {selectedCommit.head ? 'Activo' : 'Completado'}
                    </span>
                  </div>
                </div>

                <div className='text-gray-500 italic mt-8 text-xs'>
                  {'//'} End of commit
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
