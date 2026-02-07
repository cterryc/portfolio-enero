import { useState, useEffect } from 'react'

interface PasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (string: string) => void
  isLoading: boolean
}

export default function PasswordModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading
}: PasswordModalProps) {
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPassword('')
      setError('')
    }
  }, [isOpen])

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
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
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all'>
        <div className='p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-xl font-bold text-gray-800 dark:text-white'>
              Confirmar Guardado
            </h3>
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

          <p className='text-gray-600 dark:text-gray-300 mb-6'>
            Para guardar los cambios en la base de datos, por favor introduce tu
            contraseña de administrador.
          </p>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Contraseña
              </label>
              <input
                type='password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
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
                className='px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 
                  hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium'
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type='submit'
                className='px-5 py-2.5 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium
                  hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed'
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
                    Guardando...
                  </span>
                ) : (
                  'Confirmar y Guardar'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
