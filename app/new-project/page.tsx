'use client'

import PasswordModal from '@/components/PasswordModal'
import { Editor } from '@monaco-editor/react'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

// Componente principal
export default function ConvertidorJSON() {
  const [inputRaw, setInputRaw] = useState('')
  const [jsonEdit, setJsonEdit] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showInput, setShowInput] = useState(true)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Efecto para limpiar errores cuando se cambia el input
  useEffect(() => {
    if (inputRaw.trim() && error) {
      setError(null)
    }
  }, [inputRaw, error])

  // Botón 1: Convertir
  const handleConvertir = () => {
    if (!inputRaw.trim()) {
      setError('Por favor, introduce un objeto JavaScript para convertir.')
      return
    }

    try {
      setError(null)
      // Usamos new Function para interpretar el "código" pegado
      const objeto = new Function(`return ${inputRaw}`)()

      // Lo convertimos a JSON "bonito" (con indentación de 2 espacios)
      const jsonString = JSON.stringify(objeto, null, 2)

      setJsonEdit(jsonString) // Lo pasamos al segundo campo editable
      setShowInput(false) // Ocultamos el textarea
    } catch (err) {
      console.error(err)
      setError(
        'Error de sintaxis: Verifica que el objeto esté bien escrito. Asegúrate de que sea un objeto JavaScript válido.'
      )
    }
  }

  // Botón para volver a editar el texto original
  const handleVolverAEditar = () => {
    setShowInput(true)
  }

  // Botón para cancelar
  const handleCancelar = () => {
    setJsonEdit('')
    setShowInput(true)
    setError(null)
  }

  // Botón para abrir modal de confirmación
  const handleAbrirModalGuardar = () => {
    try {
      // Validamos que el JSON editado sea válido
      JSON.parse(jsonEdit)
      setShowPasswordModal(true)
    } catch (err) {
      console.error(err)

      setError(
        'El JSON editado tiene errores de formato. Por favor, corrígelo antes de guardar.'
      )
    }
  }

  // Función para guardar con contraseña
  const handleGuardarConPassword = async (password: string) => {
    setIsSaving(true)

    try {
      const dataParaEnviar = JSON.parse(jsonEdit)

      // Agregamos la contraseña al objeto a enviar
      const dataConPassword = {
        projects: dataParaEnviar,
        adminPassword: password
      }

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataConPassword)
      })

      if (res.ok) {
        // alert('¡Datos guardados con éxito en la base de datos!')
        setShowPasswordModal(false)
        // Podríamos resetear el formulario aquí si queremos
        // handleCancelar();
        toast('¡Datos guardados con éxito en la base de datos!')
      } else {
        const data = await res.json()
        console.error(data)

        throw new Error(data.error)
      }
      console.log('dataConPassword', dataConPassword)
    } catch (err) {
      console.error(err)
      const errorInstance = err instanceof Error ? err.message : err
      toast(errorInstance as string)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8'>
      <Toaster
        toastOptions={{
          duration: 8000,
          className: 'w-96',
          success: { icon: '✅' },
          error: { icon: '❌' }
        }}
      />
      <div className='max-w-6xl mx-auto'>
        <header className='mb-8 md:mb-12'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2'>
            Crear nuevo Proyecto/Proyectos
          </h1>
        </header>

        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden'>
          {/* Paso 1: Pegar - Solo visible cuando showInput es true */}
          {showInput && (
            <div className='p-6 border-b border-gray-200 dark:border-gray-700 transition-all duration-300'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>
                  Paso 1: Introduce tu objeto JavaScript
                </h2>
                <div className='text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full'>
                  {inputRaw.length} caracteres
                </div>
              </div>

              <div className='mb-4'>
                <textarea
                  placeholder={`// Pega tu objeto JavaScript aquí...
// Ejemplo:
{
  nombre: "Ejemplo",
  datos: [1, 2, 3],
  config: {
    activo: true,
    version: "1.0"
  }
}`}
                  value={inputRaw}
                  onChange={(e) => setInputRaw(e.target.value)}
                  className='w-full h-64 font-mono text-sm p-4 rounded-xl border border-gray-300 dark:border-gray-600 
                    bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all
                    resize-none'
                  spellCheck='false'
                />
              </div>

              <div className='flex flex-col sm:flex-row gap-3'>
                <button
                  onClick={handleConvertir}
                  className='flex-1 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium py-3.5 px-6 
                    rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg
                    flex items-center justify-center'
                >
                  <svg
                    className='w-5 h-5 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                    />
                  </svg>
                  Convertir a JSON
                </button>

                <button
                  onClick={() => setInputRaw('')}
                  className='px-6 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 
                    hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium'
                >
                  Limpiar
                </button>
              </div>
            </div>
          )}

          {/* Paso 2: Editar JSON resultante - Solo visible cuando jsonEdit tiene contenido */}
          {jsonEdit && !showInput && (
            <div className='transition-all duration-300'>
              <div className='p-6 border-b border-gray-200 dark:border-gray-700'>
                <div className='flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4'>
                  <div>
                    <h2 className='text-xl font-semibold text-gray-800 dark:text-white mb-1'>
                      Paso 2: Edita el JSON resultante
                    </h2>
                    <p className='text-gray-600 dark:text-gray-400 text-sm'>
                      Usa el editor para modificar el JSON. El texto se ajusta
                      automáticamente (Alt+Z).
                    </p>
                  </div>

                  <button
                    onClick={handleVolverAEditar}
                    className='flex items-center justify-center px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 
                      text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium'
                  >
                    <svg
                      className='w-4 h-4 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M10 19l-7-7m0 0l7-7m-7 7h18'
                      />
                    </svg>
                    Volver a editar
                  </button>
                </div>

                <div className='rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600 shadow-lg'>
                  <Editor
                    height='60vh'
                    defaultLanguage='json'
                    value={jsonEdit}
                    theme='vs-dark'
                    onChange={(value) => {
                      setJsonEdit(value || '')
                    }}
                    options={{
                      wordWrap: 'on',
                      wrappingStrategy: 'advanced',
                      minimap: { enabled: false },
                      fontSize: 14,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      formatOnPaste: true,
                      formatOnType: true
                    }}
                  />
                </div>
              </div>

              <div className='p-6'>
                <div className='flex flex-col sm:flex-row gap-4'>
                  <button
                    onClick={handleAbrirModalGuardar}
                    className='flex-1 bg-linear-to-r from-green-600 to-emerald-600 text-white font-medium py-3.5 px-6 
                      rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg
                      flex items-center justify-center'
                  >
                    <svg
                      className='w-5 h-5 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    Guardar en Base de Datos
                  </button>

                  <button
                    onClick={handleCancelar}
                    className='flex-1 px-6 py-3.5 rounded-xl border border-red-300 dark:border-red-700 
                      text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 
                      transition-colors font-medium flex items-center justify-center'
                  >
                    <svg
                      className='w-5 h-5 mr-2'
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
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mensaje de error */}
          {error && (
            <div className='mx-6 mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'>
              <div className='flex items-start'>
                <div className='shrink-0'>
                  <svg
                    className='h-5 w-5 text-red-600 dark:text-red-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-red-800 dark:text-red-300'>
                    Error de conversión
                  </h3>
                  <div className='mt-2 text-sm text-red-700 dark:text-red-400'>
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Estado cuando no hay contenido */}
          {!jsonEdit && !showInput && (
            <div className='p-12 text-center'>
              <div className='mx-auto max-w-md'>
                <div className='mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6'>
                  <svg
                    className='h-8 w-8 text-blue-600 dark:text-blue-400'
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
                <h3 className='text-xl font-medium text-gray-800 dark:text-white mb-2'>
                  Esperando entrada de datos
                </h3>
                <p className='text-gray-600 dark:text-gray-400 mb-8'>
                  Introduce un objeto JavaScript en el campo de arriba y haz
                  clic en {'Convertir a JSON'}para comenzar.
                </p>
                <button
                  onClick={() => setShowInput(true)}
                  className='inline-flex items-center px-5 py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 
                    text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md'
                >
                  <svg
                    className='w-4 h-4 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                  Comenzar de nuevo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal para confirmación con contraseña */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onConfirm={handleGuardarConPassword}
        isLoading={isSaving}
      />
    </div>
  )
}
