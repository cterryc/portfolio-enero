'use client'

import { useState, useEffect } from 'react'
import { 
  Monitor, 
  Server, 
  Database, 
  Wrench, 
  Plus, 
  X, 
  Save, 
  Loader2,
  AlertCircle
} from 'lucide-react'
import PasswordModal from '@/components/PasswordModal'
import toast, { Toaster } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

// Categorías fijas
const CATEGORIES = [
  { id: 'frontend', label: 'Frontend', icon: Monitor, color: 'text-primary' },
  { id: 'backend', label: 'Backend', icon: Server, color: 'text-blue-400' },
  { id: 'basesDeDatos', label: 'Bases de Datos', icon: Database, color: 'text-green-400' },
  { id: 'herramientas', label: 'Herramientas', icon: Wrench, color: 'text-purple-400' }
]

export default function SkillsManager() {
  const [skills, setSkills] = useState<Record<string, string[]>>({
    frontend: [],
    backend: [],
    basesDeDatos: [],
    herramientas: []
  })
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({})
  const [hasChanges, setHasChanges] = useState(false)

  // Cargar skills iniciales
  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills')
      if (res.ok) {
        const data = await res.json()
        // Asegurar que todas las categorías existan
        const fullData = {
          frontend: data.frontend || [],
          backend: data.backend || [],
          basesDeDatos: data.basesDeDatos || [],
          herramientas: data.herramientas || []
        }
        setSkills(fullData)
      }
    } catch (err) {
      console.error('Error fetching skills:', err)
      toast.error('Error al cargar skills')
    } finally {
      setLoading(false)
    }
  }

  const handleAddSkill = (categoryId: string) => {
    const value = newSkillInputs[categoryId]?.trim()
    if (!value) return

    if (skills[categoryId].includes(value)) {
      toast.error('Esta habilidad ya existe en esta categoría')
      return
    }

    setSkills(prev => ({
      ...prev,
      [categoryId]: [...prev[categoryId], value]
    }))
    setNewSkillInputs(prev => ({ ...prev, [categoryId]: '' }))
    setHasChanges(true)
  }

  const handleRemoveSkill = (categoryId: string, skillToRemove: string) => {
    setSkills(prev => ({
      ...prev,
      [categoryId]: prev[categoryId].filter(s => s !== skillToRemove)
    }))
    setHasChanges(true)
  }

  const handleSave = async (password: string) => {
    setIsSaving(true)
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillsData: skills,
          adminPassword: password
        })
      })

      if (res.ok) {
        toast.success('Skills sincronizados con éxito')
        setHasChanges(false)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-dark p-6 md:p-10 font-sans">
      <Toaster position="bottom-right" />
      
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Wrench className="text-primary w-8 h-8" />
              Skills Manager
            </h1>
            <p className="text-gray-400">
              Gestiona tu stack tecnológico mediante un sistema interactivo de etiquetas.
            </p>
          </div>
          
          <button
            onClick={() => setShowPasswordModal(true)}
            disabled={!hasChanges || isSaving}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg ${
              hasChanges 
                ? 'bg-primary text-background-dark hover:scale-105 hover:shadow-primary/20' 
                : 'bg-border-dark text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Sincronizar con DB
            {hasChanges && (
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-background-dark opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-background-dark"></span>
              </span>
            )}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-panel-dark border border-border-dark rounded-2xl p-6 hover:border-border-dark/80 transition-all group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-background-dark border border-border-dark ${cat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-white">{cat.label}</h2>
                  </div>
                  <span className="text-xs font-mono text-gray-500 bg-background-dark px-2 py-1 rounded-md border border-border-dark">
                    {skills[cat.id].length} items
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6 min-h-[100px] content-start">
                  <AnimatePresence>
                    {skills[cat.id].map((skill) => (
                      <motion.span
                        key={skill}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-background-dark border border-border-dark text-gray-300 rounded-lg text-sm group/chip hover:border-primary/50 transition-colors"
                      >
                        {skill}
                        <button
                          onClick={() => handleRemoveSkill(cat.id, skill)}
                          className="text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </motion.span>
                    ))}
                  </AnimatePresence>
                  
                  {skills[cat.id].length === 0 && (
                    <div className="w-full flex flex-col items-center justify-center py-4 border-2 border-dashed border-border-dark/50 rounded-xl">
                      <p className="text-xs text-gray-600 italic">No hay skills en esta categoría</p>
                    </div>
                  )}
                </div>

                <div className="relative mt-auto">
                  <input
                    type="text"
                    placeholder="Añadir nueva skill..."
                    value={newSkillInputs[cat.id] || ''}
                    onChange={(e) => setNewSkillInputs(prev => ({ ...prev, [cat.id]: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(cat.id)}
                    className="w-full bg-background-dark border border-border-dark rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-gray-600"
                  />
                  <button
                    onClick={() => handleAddSkill(cat.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-primary transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {hasChanges && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-3 text-primary text-sm"
          >
            <AlertCircle className="w-5 h-5" />
            Tienes cambios sin sincronizar. No olvides guardar antes de salir.
          </motion.div>
        )}
      </div>

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onConfirm={handleSave}
        isLoading={isSaving}
      />
    </div>
  )
}
