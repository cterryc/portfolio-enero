'use client'

import { useState } from 'react'
import { useProjects } from '@/context/ProjectsContext'
import toast, { Toaster } from 'react-hot-toast'
import PasswordModalDelete from '@/components/PasswordModalDelete'

const DeleteProject = () => {
  const { projects, removeProject } = useProjects()
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteClick = (id: string) => {
    setProjectToDelete(id)
    setShowPasswordModal(true)
  }

  const handleConfirmDelete = async (password: string) => {
    if (!projectToDelete) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/projects/${projectToDelete}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPassword: password })
      })

      if (!response.ok) {
        const errorFetch = await response.json()
        throw new Error(errorFetch.error)
      }
      const data = await response.json()
      toast.success(data.message)
      removeProject(projectToDelete)
      setShowPasswordModal(false)
      setProjectToDelete(null)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error al eliminar no definido'
      toast.error(errorMessage)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancelDelete = () => {
    setShowPasswordModal(false)
    setProjectToDelete(null)
    setIsDeleting(false)
  }

  if (!projects || projects.length === 0) {
    return (
      <div className='min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center'>
            <div className='mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-6'>
              <svg
                className='h-10 w-10 text-gray-400 dark:text-gray-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
            </div>
            <h3 className='text-2xl font-bold text-gray-800 dark:text-white mb-3'>
              No hay proyectos disponibles
            </h3>
            <p className='text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto'>
              Actualmente no hay proyectos en el sistema. Agrega nuevos
              proyectos para gestionarlos aquí.
            </p>
          </div>
        </div>
        <Toaster
          position='top-right'
          toastOptions={{
            duration: 8000,
            className: 'dark:bg-gray-800 dark:text-white',
            style: {
              background: '#1f2937',
              color: '#fff',
              borderRadius: '0.75rem',
              padding: '1rem',
              border: '1px solid #374151'
            },
            success: {
              icon: '✅',
              style: {
                background: '#064e3b',
                border: '1px solid #059669'
              }
            },
            error: {
              icon: '❌',
              style: {
                background: '#7f1d1d',
                border: '1px solid #dc2626'
              }
            }
          }}
        />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        <header className='mb-8 md:mb-12'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2'>
            Gestión de Proyectos
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>
            Gestiona y elimina proyectos del sistema de forma segura
          </p>
        </header>

        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden'>
          <div className='p-6 border-b border-gray-200 dark:border-gray-700'>
            <div className='flex items-center justify-between mb-6'>
              <div>
                <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>
                  Proyectos Activos
                </h2>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  {projects.length} proyecto{projects.length !== 1 ? 's' : ''}{' '}
                  encontrado{projects.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full'>
                <span className='font-medium'>{projects.length}</span> total
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {projects.map((project) => (
                <div
                  key={project.id}
                  className='border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition-all duration-300 bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900'
                >
                  <div className='flex items-start justify-between mb-3'>
                    <div>
                      <div className='flex items-center space-x-2 mb-1'>
                        <svg
                          className='w-5 h-5 text-blue-600 dark:text-blue-400'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                          />
                        </svg>
                        <span className='text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded'>
                          ID: {project.id.substring(0, 8)}...
                        </span>
                      </div>
                      <h3 className='font-medium text-gray-800 dark:text-white line-clamp-1'>
                        {project.id || `Proyecto ${project.id.substring(0, 4)}`}
                      </h3>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <span className='text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'>
                        Activo
                      </span>
                    </div>
                  </div>

                  <div className='mt-4 pt-4 border-t border-gray-100 dark:border-gray-700'>
                    <div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2'>
                      <span>Creado:</span>
                      <span>
                        {new Date(
                          project.createdAt || Date.now()
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className='mt-4 pt-4 border-t border-gray-100 dark:border-gray-700'>
                    <button
                      onClick={() => handleDeleteClick(project.id)}
                      className='w-full py-2.5 px-4 rounded-xl bg-linear-to-r from-red-600 to-rose-600 text-white font-medium
                        hover:from-red-700 hover:to-rose-700 transition-all shadow-md hover:shadow-lg
                        flex items-center justify-center group'
                    >
                      <svg
                        className='w-5 h-5 mr-2 group-hover:scale-110 transition-transform'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        />
                      </svg>
                      Eliminar Proyecto
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700'>
            <div className='flex items-center p-4 rounded-xl bg-linear-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200 dark:border-red-800'>
              <div className='shrink-0 mr-4'>
                <svg
                  className='h-6 w-6 text-red-600 dark:text-red-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.698-.833-2.464 0L4.196 16.5c-.77.833.192 2.5 1.732 2.5z'
                  />
                </svg>
              </div>
              <div>
                <h4 className='text-sm font-medium text-red-800 dark:text-red-300'>
                  Advertencia: Eliminación permanente
                </h4>
                <p className='text-sm text-red-700 dark:text-red-400 mt-1'>
                  La eliminación de proyectos es permanente y no se puede
                  deshacer. Se requiere contraseña de administrador para
                  confirmar la acción.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster
        position='top-right'
        toastOptions={{
          duration: 8000,
          className: 'dark:bg-gray-800 dark:text-white',
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '0.75rem',
            padding: '1rem',
            border: '1px solid #374151'
          },
          success: {
            icon: '✅',
            style: {
              background: '#064e3b',
              border: '1px solid #059669'
            }
          },
          error: {
            icon: '❌',
            style: {
              background: '#7f1d1d',
              border: '1px solid #dc2626'
            }
          }
        }}
      />

      <PasswordModalDelete
        isOpen={showPasswordModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title='Confirmar Eliminación'
        message='Esta acción eliminará permanentemente el proyecto. Para continuar, introduce tu contraseña de administrador.'
        confirmText='Confirmar Eliminación'
        confirmButtonClass='bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700'
      />
    </div>
  )
}

export default DeleteProject
