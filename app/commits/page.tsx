'use client'

import { useState, useEffect } from 'react'
import { 
  GitCommit, 
  Plus, 
  Save, 
  Trash2, 
  ChevronRight,
  Loader2,
  GitBranch,
  Calendar,
  Briefcase,
  Building2,
  MapPin,
  GitMerge,
  Info,
  Edit3,
  FileJson,
  AlertCircle
} from 'lucide-react'
import { Editor } from '@monaco-editor/react'
import PasswordModal from '@/components/PasswordModal'
import PasswordModalDelete from '@/components/PasswordModalDelete'
import toast, { Toaster } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Commit } from '@/lib/types'

const INITIAL_COMMIT_STATE: Partial<Commit> = {
  hash: '',
  role: '',
  company: '',
  date: '',
  head: false,
  branch: 'main',
  merge: false,
  details: {
    title: '',
    description: '',
    achievements: [],
    technologies: [],
    period: '',
    location: ''
  }
}

export default function CommitStudio() {
  const [commits, setCommits] = useState<Commit[]>([])
  const [selectedCommit, setSelectedCommit] = useState<Partial<Commit>>(INITIAL_COMMIT_STATE)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [viewMode, setViewMode] = useState<'studio' | 'json'>('studio')

  useEffect(() => {
    fetchCommits()
  }, [])

  const fetchCommits = async () => {
    try {
      const res = await fetch('/api/commits')
      if (res.ok) {
        const data = await res.json()
        setCommits(data)
      }
    } catch (err) {
      toast.error('Error al cargar historial')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectCommit = (commit: Commit) => {
    setSelectedCommit(commit)
  }

  const handleNewCommit = () => {
    setSelectedCommit({
      ...INITIAL_COMMIT_STATE,
      hash: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10)
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (name.startsWith('details.')) {
      const field = name.split('.')[1]
      setSelectedCommit(prev => ({
        ...prev,
        details: { ...prev.details!, [field]: value }
      }))
    } else {
      const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      setSelectedCommit(prev => ({ ...prev, [name]: val }))
    }
  }

  const handleSave = async (password: string) => {
    setIsSaving(true)
    const isUpdate = !!commits.find(c => c.hash === selectedCommit.hash)
    const url = isUpdate ? `/api/commits/${selectedCommit.hash}` : '/api/commits'
    const method = isUpdate ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...selectedCommit,
          adminPassword: password
        })
      })

      if (res.ok) {
        toast.success(isUpdate ? 'Commit actualizado' : 'Commit creado')
        fetchCommits()
        setShowPasswordModal(false)
      } else {
        const data = await res.json()
        throw new Error(data.error || 'Error al guardar')
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (password: string) => {
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/commits/${selectedCommit.hash}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPassword: password })
      })

      if (res.ok) {
        toast.success('Commit eliminado del historial')
        setSelectedCommit(INITIAL_COMMIT_STATE)
        fetchCommits()
        setShowDeleteModal(false)
      } else {
        const data = await res.json()
        throw new Error(data.error)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al eliminar')
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-dark">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background-dark text-gray-300 font-sans overflow-hidden">
      <Toaster position="bottom-right" />
      
      {/* Sidebar de Commits */}
      <aside className="w-80 bg-panel-dark border-r border-border-dark flex flex-col shrink-0">
        <div className="p-4 border-b border-border-dark flex items-center justify-between bg-background-dark/50">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Git History</h2>
          </div>
          <button onClick={handleNewCommit} className="p-1 hover:bg-background-dark rounded-md text-primary transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col">
            {commits.map(commit => (
              <button
                key={commit.hash}
                onClick={() => handleSelectCommit(commit)}
                className={`flex flex-col gap-1 p-4 border-b border-border-dark/50 text-left transition-all relative group ${
                  selectedCommit.hash === commit.hash 
                    ? 'bg-background-dark border-l-2 border-l-primary' 
                    : 'hover:bg-background-dark/30 border-l-2 border-l-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-yellow-500">{commit.hash.substring(0, 7)}</span>
                  <span className="text-[10px] text-gray-600 font-mono">{commit.date}</span>
                </div>
                <span className="text-sm font-bold text-white truncate">{commit.role}</span>
                <span className="text-xs text-gray-500 truncate">@ {commit.company}</span>
                {commit.head && (
                  <span className="absolute right-2 bottom-2 text-[10px] bg-blue-500/10 text-blue-400 px-1.5 rounded border border-blue-500/20">HEAD</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Editor Panel */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Toolbar Superior */}
        <header className="h-12 border-b border-border-dark bg-panel-dark flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <GitCommit className="w-4 h-4" />
              <span>Experience</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white font-medium">{selectedCommit.role || 'Nuevo Commit'}</span>
            
            <div className="flex items-center bg-background-dark rounded-md p-1 ml-4 border border-border-dark">
              <button 
                onClick={() => setViewMode('studio')}
                className={`flex items-center gap-2 px-3 py-0.5 rounded text-xs transition-all ${viewMode === 'studio' ? 'bg-panel-dark text-primary shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <Edit3 className="w-3.5 h-3.5" /> Studio
              </button>
              <button 
                onClick={() => setViewMode('json')}
                className={`flex items-center gap-2 px-3 py-0.5 rounded text-xs transition-all ${viewMode === 'json' ? 'bg-panel-dark text-primary shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <FileJson className="w-3.5 h-3.5" /> JSON
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {selectedCommit.hash && (
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="p-2 text-gray-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={() => setShowPasswordModal(true)}
              disabled={isSaving}
              className="flex items-center gap-2 bg-primary text-background-dark px-4 py-1.5 rounded-md font-bold text-sm hover:scale-105 transition-all"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Push Changes
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {viewMode === 'studio' ? (
              <motion.div 
                key="studio"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full overflow-y-auto p-8 space-y-10 max-w-4xl mx-auto w-full"
              >
                {/* Meta Section */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border-dark pb-2">
                    <Info className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-white">Commit Metadata</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-500 uppercase">Hash</label>
                      <input 
                        name="hash"
                        value={selectedCommit.hash}
                        onChange={handleInputChange}
                        className="w-full bg-panel-dark border border-border-dark rounded-lg p-3 text-sm font-mono text-yellow-500 focus:border-primary/50 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-500 uppercase">Branch</label>
                      <input 
                        name="branch"
                        value={selectedCommit.branch}
                        onChange={handleInputChange}
                        placeholder="main, freelance, dev..."
                        className="w-full bg-panel-dark border border-border-dark rounded-lg p-3 text-sm text-pink-400 focus:border-primary/50 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        name="head"
                        checked={selectedCommit.head}
                        onChange={(e) => setSelectedCommit(prev => ({ ...prev, head: e.target.checked }))}
                        className="w-4 h-4 rounded border-border-dark bg-panel-dark text-primary focus:ring-primary/20"
                      />
                      <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Mark as HEAD (Current Job)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        name="merge"
                        checked={selectedCommit.merge}
                        onChange={(e) => setSelectedCommit(prev => ({ ...prev, merge: e.target.checked }))}
                        className="w-4 h-4 rounded border-border-dark bg-panel-dark text-green-500 focus:ring-green-500/20"
                      />
                      <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Is Merge Commit</span>
                    </label>
                  </div>
                </section>

                {/* Job Info Section */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border-dark pb-2">
                    <Briefcase className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-bold text-white">Professional Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-500 uppercase flex items-center gap-2">
                        <Edit3 className="w-3 h-3" /> Role / Title
                      </label>
                      <input 
                        name="role"
                        value={selectedCommit.role}
                        onChange={handleInputChange}
                        placeholder="Full Stack Developer"
                        className="w-full bg-panel-dark border border-border-dark rounded-lg p-3 text-sm focus:border-primary/50 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-500 uppercase flex items-center gap-2">
                        <Building2 className="w-3 h-3" /> Company
                      </label>
                      <input 
                        name="company"
                        value={selectedCommit.company}
                        onChange={handleInputChange}
                        placeholder="Freelance / Company Name"
                        className="w-full bg-panel-dark border border-border-dark rounded-lg p-3 text-sm focus:border-primary/50 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-500 uppercase flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> Display Date
                      </label>
                      <input 
                        name="date"
                        value={selectedCommit.date}
                        onChange={handleInputChange}
                        placeholder="Feb 2024"
                        className="w-full bg-panel-dark border border-border-dark rounded-lg p-3 text-sm focus:border-primary/50 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-500 uppercase flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> Location
                      </label>
                      <input 
                        name="details.location"
                        value={selectedCommit.details?.location}
                        onChange={handleInputChange}
                        placeholder="Lima, Perú (Remote)"
                        className="w-full bg-panel-dark border border-border-dark rounded-lg p-3 text-sm focus:border-primary/50 focus:outline-none"
                      />
                    </div>
                  </div>
                </section>

                {/* Details Section (The "Diff" Content) */}
                <section className="space-y-6 pb-20">
                  <div className="flex items-center gap-3 border-b border-border-dark pb-2">
                    <GitMerge className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-bold text-white">Commit Details (Diff Data)</h3>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-border-dark shadow-2xl">
                    <div className="bg-background-dark px-4 py-2 text-xs font-mono text-gray-500 border-b border-border-dark flex justify-between">
                      <span>edit details.json</span>
                      <span className="text-green-500">format: git-diff compatible</span>
                    </div>
                    <Editor
                      height="400px"
                      defaultLanguage="json"
                      theme="vs-dark"
                      value={JSON.stringify(selectedCommit.details, null, 2)}
                      onChange={(val) => {
                        try {
                          const parsed = JSON.parse(val || '{}')
                          setSelectedCommit(prev => ({ ...prev, details: parsed }))
                        } catch (e) {}
                      }}
                      options={{ minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false, automaticLayout: true }}
                    />
                  </div>
                </section>
              </motion.div>
            ) : (
              <motion.div 
                key="json"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="h-full flex flex-col"
              >
                <div className="flex-1">
                  <Editor
                    height="100%"
                    defaultLanguage="json"
                    theme="vs-dark"
                    value={JSON.stringify(selectedCommit, null, 2)}
                    onChange={(val) => {
                      try {
                        const parsed = JSON.parse(val || '{}')
                        setSelectedCommit(parsed)
                      } catch (e) {}
                    }}
                    options={{ minimap: { enabled: true }, fontSize: 14, automaticLayout: true, wordWrap: 'on' }}
                  />
                </div>
                <div className="p-4 bg-panel-dark border-t border-border-dark text-xs text-gray-500 flex items-center gap-4 shrink-0">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span>Direct Commit Object Modification. Use with caution.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Modals */}
      <PasswordModal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} onConfirm={handleSave} isLoading={isSaving} />
      <PasswordModalDelete 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)} 
        onConfirm={handleDelete} 
        isLoading={isDeleting} 
        title="Delete Commit" 
        message={`Are you sure you want to remove the commit "${selectedCommit.hash}"? This will erase this work experience from your history.`} 
      />
    </div>
  )
}
