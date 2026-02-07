'use client'

import { useState, useEffect } from 'react'

interface PasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (password: string) => void
  isLoading?: boolean
  title?: string
  message?: string
  confirmText?: string
  confirmButtonClass?: string
}

function PasswordModalDelete({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title = 'Confirmar Acción',
  message = 'Para continuar, introduce tu contraseña de administrador.',
  confirmText = 'Confirmar',
  confirmButtonClass = 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
}: PasswordModalProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPassword('')
      setError('')
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!password.trim()) {
      setError('La contraseña es obligatoria')
      return
    }

    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres')
      return
    }

    onConfirm(password)
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 p-4'>
      <div className='absolute w-full h-full -z-1 backdrop-blur-sm'></div>
      <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all'>
        <div className='p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center space-x-3'>
              <div className='shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-red-600 dark:text-red-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-800 dark:text-white'>
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
              disabled={isLoading}
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          <div className='mb-6'>
            <p className='text-gray-600 dark:text-gray-300'>{message}</p>
            <div className='mt-4 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'>
              <div className='flex items-start'>
                <svg
                  className='w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-2 shrink-0'
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
                <p className='text-sm text-yellow-700 dark:text-yellow-400'>
                  Esta acción requiere privilegios de administrador y no se
                  puede deshacer.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Contraseña de Administrador
              </label>
              <input
                type='password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                  bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                placeholder='Introduce tu contraseña'
                autoFocus
                disabled={isLoading}
              />
              {error && (
                <p className='mt-2 text-sm text-red-600 dark:text-red-400'>
                  {error}
                </p>
              )}
            </div>

            <div className='flex justify-end space-x-3'>
              <button
                type='button'
                onClick={onClose}
                className='px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 
                  hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium'
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type='submit'
                className={`px-5 py-2.5 rounded-xl text-white font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed ${confirmButtonClass}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className='flex items-center'>
                    <svg
                      className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      />
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      />
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  confirmText
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PasswordModalDelete
