'use client'

import { useState, useEffect } from 'react'
import { 
  FolderCode, 
  Plus, 
  Save, 
  Trash2, 
  Globe, 
  Github, 
  Image as ImageIcon, 
  Layout, 
  Settings, 
  ChevronRight,
  Code2,
  Loader2,
  X,
  FileJson,
  Edit3,
  AlertCircle
} from 'lucide-react'
import { Editor } from '@monaco-editor/react'
import PasswordModal from '@/components/PasswordModal'
import PasswordModalDelete from '@/components/PasswordModalDelete'
import toast, { Toaster } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/lib/types'

const INITIAL_PROJECT_STATE: Partial<Project> = {
  id: '',
  title: '',
  description: '',
  longDescription: '',
  liveUrl: '',
  repoUrl: '',
  imageUrl: '',
  technologies: [],
  features: [],
  stats: [],
  codeSnippet: {
    file: 'index.tsx',
    language: 'typescript',
    lines: []
  }
}

export default function ProjectStudio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Partial<Project>>(INITIAL_PROJECT_STATE)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [viewMode, setViewMode] = useState<'studio' | 'json'>('studio')

  // Inputs temporales para chips
  const [techInput, setTechInput] = useState('')
  const [featureInput, setFeatureInput] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      if (res.ok) {
        const data = await res.json()
        setProjects(data)
      }
    } catch (err) {
      toast.error('Error al cargar proyectos')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project)
  }

  const handleNewProject = () => {
    setSelectedProject(INITIAL_PROJECT_STATE)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSelectedProject(prev => ({ ...prev, [name]: value }))
  }

  const handleAddChip = (field: 'technologies' | 'features', value: string) => {
    if (!value.trim()) return
    const current = selectedProject[field] || []
    if (current.includes(value.trim())) return
    
    setSelectedProject(prev => ({
      ...prev,
      [field]: [...current, value.trim()]
    }))
    if (field === 'technologies') setTechInput('')
    else setFeatureInput('')
  }

  const handleRemoveChip = (field: 'technologies' | 'features', value: string) => {
    setSelectedProject(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter(item => item !== value)
    }))
  }

  const handleSave = async (password: string) => {
    setIsSaving(true)
    const isUpdate = !!projects.find(p => p.id === selectedProject.id)
    const url = isUpdate ? `/api/projects/${selectedProject.id}` : '/api/projects'
    const method = isUpdate ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...selectedProject,
          adminPassword: password
        })
      })

      if (res.ok) {
        toast.success(isUpdate ? 'Proyecto actualizado' : 'Proyecto creado')
        fetchProjects()
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
      const res = await fetch(`/api/projects/${selectedProject.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPassword: password })
      })

      if (res.ok) {
        toast.success('Proyecto eliminado')
        setSelectedProject(INITIAL_PROJECT_STATE)
        fetchProjects()
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
      
      {/* Sidebar de Proyectos */}
      <aside className={`bg-panel-dark border-r border-border-dark flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-0 overflow-hidden'}`}>
        <div className="p-4 border-b border-border-dark flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Explorador</h2>
          <button onClick={handleNewProject} className="p-1 hover:bg-background-dark rounded-md text-primary transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-2 space-y-1">
            {projects.map(project => (
              <button
                key={project.id}
                onClick={() => handleSelectProject(project)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  selectedProject.id === project.id 
                    ? 'bg-background-dark text-primary border-l-2 border-primary' 
                    : 'hover:bg-background-dark/50 text-gray-400'
                }`}
              >
                <FolderCode className="w-4 h-4 shrink-0" />
                <span className="truncate">{project.title}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Área de Edición */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Toolbar Superior */}
        <header className="h-12 border-b border-border-dark bg-panel-dark flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-500">Proyectos</span>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white font-medium">{selectedProject.title || 'Nuevo Proyecto'}</span>
            
            {/* Toggle de Modo */}
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
            {selectedProject.id && (
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                title="Eliminar Proyecto"
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
              Guardar
            </button>
          </div>
        </header>

        {/* Contenido Dinámico */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {viewMode === 'studio' ? (
              <motion.div 
                key="studio"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="h-full overflow-y-auto p-8 space-y-10 max-w-5xl mx-auto w-full"
              >
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border-dark pb-2">
                    <Settings className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-white">Configuración General</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-500 uppercase">ID del Proyecto</label>
                      <input 
                        name="id"
                        value={selectedProject.id}
                        onChange={handleInputChange}
                        placeholder="ej: mi-proyecto-web"
                        className="w-full bg-panel-dark border border-border-dark rounded-lg p-3 text-sm focus:border-primary/50 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-500 uppercase">Título</label>
                      <input 
                        name="title"
                        value={selectedProject.title}
                        onChange={handleInputChange}
                        placeholder="Título del proyecto"
                        className="w-full bg-panel-dark border border-border-dark rounded-lg p-3 text-sm focus:border-primary/50 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-500 uppercase">Descripción Corta</label>
                    <textarea 
                      name="description"
                      value={selectedProject.description}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="Breve resumen para la tarjeta..."
                      className="w-full bg-panel-dark border border-border-dark rounded-lg p-3 text-sm focus:border-primary/50 focus:outline-none resize-none"
                    />
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border-dark pb-2">
                    <Globe className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-bold text-white">Links & Media</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-500 uppercase flex items-center gap-2">
                        <ImageIcon className="w-3 h-3" /> Imagen (URL)
                      </label>
                      <input 
                        name="imageUrl"
                        value={selectedProject.imageUrl}
                        onChange={handleInputChange}
                        placeholder="https://..."
                        className="w-full bg-panel-dark border border-border-dark rounded-lg p-3 text-sm focus:border-primary/50 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-500 uppercase flex items-center gap-2">
                        <Globe className="w-3 h-3" /> Live Demo (URL)
                      </label>
                      <input 
                        name="liveUrl"
                        value={selectedProject.liveUrl}
                        onChange={handleInputChange}
                        placeholder="https://..."
                        className="w-full bg-panel-dark border border-border-dark rounded-lg p-3 text-sm focus:border-primary/50 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-500 uppercase flex items-center gap-2">
                        <Github className="w-3 h-3" /> Repositorio (URL)
                      </label>
                      <input 
                        name="repoUrl"
                        value={selectedProject.repoUrl}
                        onChange={handleInputChange}
                        placeholder="https://github.com/..."
                        className="w-full bg-panel-dark border border-border-dark rounded-lg p-3 text-sm focus:border-primary/50 focus:outline-none"
                      />
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border-dark pb-2">
                    <Layout className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-bold text-white">Especificaciones</h3>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-mono text-gray-500 uppercase">Tecnologías</label>
                    <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-background-dark/50 border border-border-dark rounded-xl">
                      <AnimatePresence>
                        {(selectedProject.technologies || []).map(tech => (
                          <motion.span 
                            key={tech} 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="flex items-center gap-2 px-3 py-1 bg-panel-dark border border-border-dark rounded-md text-xs text-primary"
                          >
                            {tech}
                            <button onClick={() => handleRemoveChip('technologies', tech)}><X className="w-3 h-3" /></button>
                          </motion.span>
                        ))}
                      </AnimatePresence>
                      <input 
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddChip('technologies', techInput)}
                        placeholder="Añadir tech..."
                        className="bg-transparent border-none outline-none text-xs text-gray-300 w-24"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-mono text-gray-500 uppercase">Características Clave</label>
                    <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-background-dark/50 border border-border-dark rounded-xl">
                      <AnimatePresence>
                        {(selectedProject.features || []).map(feat => (
                          <motion.span 
                            key={feat} 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="flex items-center gap-2 px-3 py-1 bg-panel-dark border border-border-dark rounded-md text-xs text-gray-300"
                          >
                            {feat}
                            <button onClick={() => handleRemoveChip('features', feat)}><X className="w-3 h-3" /></button>
                          </motion.span>
                        ))}
                      </AnimatePresence>
                      <input 
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddChip('features', featureInput)}
                        placeholder="Añadir feature..."
                        className="bg-transparent border-none outline-none text-xs text-gray-300 w-32"
                      />
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border-dark pb-2">
                    <Code2 className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-lg font-bold text-white">Code Snippet (JSON)</h3>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-border-dark shadow-2xl">
                    <Editor
                      height="300px"
                      defaultLanguage="json"
                      theme="vs-dark"
                      value={JSON.stringify(selectedProject.codeSnippet, null, 2)}
                      onChange={(val) => {
                        try {
                          const parsed = JSON.parse(val || '{}')
                          setSelectedProject(prev => ({ ...prev, codeSnippet: parsed }))
                        } catch (e) { /* Error silencioso */ }
                      }}
                      options={{ minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false, automaticLayout: true }}
                    />
                  </div>
                </section>

                <section className="space-y-4 pb-20">
                  <div className="flex items-center gap-3 border-b border-border-dark pb-2">
                    <Layout className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-bold text-white">Descripción Extendida</h3>
                  </div>
                  <textarea 
                    name="longDescription"
                    value={selectedProject.longDescription}
                    onChange={handleInputChange}
                    rows={10}
                    placeholder="Contenido principal del proyecto (soporta Markdown)..."
                    className="w-full bg-panel-dark border border-border-dark rounded-xl p-4 text-sm focus:border-primary/50 focus:outline-none resize-y min-h-[200px]"
                  />
                </section>
              </motion.div>
            ) : (
              <motion.div 
                key="json"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col"
              >
                <div className="flex-1">
                  <Editor
                    height="100%"
                    defaultLanguage="json"
                    theme="vs-dark"
                    value={JSON.stringify(selectedProject, null, 2)}
                    onChange={(val) => {
                      try {
                        const parsed = JSON.parse(val || '{}')
                        setSelectedProject(parsed)
                      } catch (e) { /* Error silencioso */ }
                    }}
                    options={{
                      minimap: { enabled: true },
                      fontSize: 14,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      wordWrap: 'on',
                      padding: { top: 20 }
                    }}
                  />
                </div>
                <div className="p-4 bg-panel-dark border-t border-border-dark text-xs text-gray-500 flex items-center gap-4 shrink-0">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span>Cuidado: Los cambios en el JSON se sincronizan inmediatamente con el estado del formulario. Asegúrate de mantener la estructura correcta.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Modales */}
      <PasswordModal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} onConfirm={handleSave} isLoading={isSaving} />
      <PasswordModalDelete isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} isLoading={isDeleting} title="Eliminar Proyecto" message={`¿Estás seguro de que quieres eliminar "${selectedProject.title}"?`} />
    </div>
  )
}
