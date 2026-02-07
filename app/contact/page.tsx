'use client'

import { Terminal as TerminalIcon } from 'lucide-react'
import Form from 'next/form'
import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

interface EmeailResponse {
  message: string
}

interface ErrorResponse {
  error: string
}

export default function ContactPage() {
  const [body, setBody] = useState({ email: '', message: '', name: '' })
  const inputRef = useRef<HTMLInputElement>(null)
  const texttareaRef = useRef<HTMLTextAreaElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    console.log(body)
  }, [body])

  const handleInputFocus = () => {
    inputRef.current?.setSelectionRange(0, 0)
  }

  const handleNameFocus = () => {
    nameRef.current?.setSelectionRange(0, 0)
  }

  const handleTextareaFocus = () => {
    texttareaRef.current?.setSelectionRange(0, 0)
  }

  async function createPost() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!body.email || !body.message || !body.name) {
      toast.error(
        `${!body.name ? 'Nombre' : !body.email ? 'Correo' : !body.message ? 'Mensaje' : ''} es necesario`
      )
      return // Detenemos la ejecución
    }

    if (!emailRegex.test(body.email)) {
      console.log('El correo electrónico proporcionado no es válido.')
      toast.error(`${body.email} debe ser un correo valido`)
      return // Detenemos la ejecución
    }

    const sendMail = fetch('/api/sendmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorMessage = await response.json()
          throw new Error(errorMessage.error)
        }
        return response.json()
      })
      .catch(async (error) => {
        const errorMessage = error instanceof Error ? error.message : error

        throw new Error(errorMessage)
      })

    toast.promise(sendMail, {
      loading: 'Loading',
      success: (data: EmeailResponse) => {
        setBody({
          email: '',
          message: '',
          name: ''
        })
        return data.message
      },
      error: (err: ErrorResponse) => err.error
    })

    // revalidatePath('/contact')
    // redirect('/contact')
  }

  return (
    <div className='flex-1 overflow-hidden relative flex flex-col bg-panel-dark'>
      <Toaster
        toastOptions={{
          duration: 8000,
          className: 'w-96',
          success: { icon: '✅' },
          error: { icon: '❌' }
        }}
      />
      <div className='flex-1 overflow-y-auto p-4 md:p-8 font-mono text-sm md:text-base'>
        <Form className='w-full max-w-4xl' action={createPost}>
          <div className='flex group hover:bg-white/2'>
            <div className='w-8 md:w-12 text-right pr-4 text-gray-600 select-none pt-1'>
              1
            </div>
            <div className='flex-1 pt-1 wrap-break-word'>
              <span>
                <span className='text-pink-400'>import</span> {'{'}
                <span className='text-yellow-300'>useState</span>
                {'}'} <span className='text-pink-400'>from</span>{' '}
                <span className='text-green-300'>{"'react'"}</span>;
              </span>
            </div>
          </div>
          <div className='flex group hover:bg-white/2'>
            <div className='w-8 md:w-12 text-right pr-4 text-gray-600 select-none pt-1'>
              2
            </div>
            <div className='flex-1 pt-1 wrap-break-word'>
              <span>
                <span className='text-pink-400'>import</span> {'{'}
                <span className='text-yellow-300'>sendToTerminal</span>
                {'}'} <span className='text-pink-400'>from</span>{' '}
                <span className='text-green-300'>{"'@/lib/api'"}</span>;
              </span>
            </div>
          </div>
          <div className='flex group hover:bg-white/2'>
            <div className='w-8 md:w-12 text-right pr-4 text-gray-600 select-none pt-1'>
              3
            </div>
            <div className='flex-1 pt-1 wrap-break-word'></div>
          </div>
          <div className='flex group hover:bg-white/2'>
            <div className='w-8 md:w-12 text-right pr-4 text-gray-600 select-none pt-1'>
              4
            </div>
            <div className='flex-1 pt-1 wrap-break-word'>
              <span className='text-gray-500'>
                {'//'} Initialize contact protocol
              </span>
            </div>
          </div>
          <div className='flex group hover:bg-white/2'>
            <div className='w-8 md:w-12 text-right pr-4 text-gray-600 select-none pt-1'>
              5
            </div>
            <div className='flex-1 pt-1 wrap-break-word'>
              <span>
                <span className='text-pink-400'>export default function</span>{' '}
                <span className='text-blue-400'>ContactForm</span>() {'{'}
              </span>
            </div>
          </div>
          <div className='flex group hover:bg-white/2'>
            <div className='w-8 md:w-12 text-right pr-4 text-gray-600 select-none pt-1'>
              6
            </div>
            <div className='flex-1 pt-1 wrap-break-word'>
              <span className='pl-4'>
                <span className='text-pink-400'>const</span>{' '}
                <span className='text-blue-400'>messageData</span> = {'{'}
              </span>
            </div>
          </div>
          <div className='flex group hover:bg-white/2 items-center py-1 relative'>
            <div className='w-8 md:w-12 text-right pr-4 text-gray-600 select-none'>
              7
            </div>
            <div className='flex-1 pl-8 flex items-center flex-wrap relative'>
              <label className='text-blue-300 mr-2 whitespace-nowrap'>
                nombre:
              </label>
              <span className='text-orange-300'>{'"'}</span>
              <input
                autoComplete='off'
                className='bg-transparent border-none p-0 h-6 flex-1 min-w-50 text-orange-300 focus:ring-0 placeholder-gray-600/50 font-mono focus:bg-white/5 rounded-sm transition-colors outline-0'
                placeholder='John Doe'
                type='text'
                required={true}
                value={body.name + '"'}
                onChange={(e) => {
                  console.log(e.target.value.split('"').join(''))

                  setBody({
                    ...body,
                    name: e.target.value.split('"').join('')
                  })
                }}
                onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                  console.log(e.currentTarget.name)

                  if (e.currentTarget.value === '"') {
                    // setTaget(e.currentTarget.name)
                    handleNameFocus()
                  }
                }}
                ref={nameRef}
                name='name'
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  const cursorPosition = e.currentTarget.selectionStart
                  const textLength = e.currentTarget.value.length
                  if (e.key === 'Backspace') {
                    if (cursorPosition === textLength) {
                      nameRef.current?.setSelectionRange(
                        e.currentTarget.value.length - 2,
                        e.currentTarget.value.length - 1
                      )
                    }
                  } else if (cursorPosition === textLength) {
                    nameRef.current?.setSelectionRange(
                      e.currentTarget.value.length,
                      e.currentTarget.value.length - 1
                    )
                  }
                }}
              />
              {/* <span className='absolute -bottom-5 bg-red-500'>
                Email invalido
              </span> */}
              {body.name === '' && (
                <span className='text-gray-500 absolute left-1/6 pointer-events-none'>
                  {'//'} type your name here ...
                </span>
              )}
            </div>
          </div>
          <div className='flex group hover:bg-white/2 items-center py-1 relative'>
            <div className='w-8 md:w-12 text-right pr-4 text-gray-600 select-none'>
              8
            </div>
            <div className='flex-1 pl-8 flex items-center flex-wrap relative'>
              <label className='text-blue-300 mr-2 whitespace-nowrap'>
                correo:
              </label>
              <span className='text-orange-300'>{'"'}</span>
              <input
                autoComplete='off'
                className='bg-transparent border-none p-0 h-6 flex-1 min-w-50 text-orange-300 focus:ring-0 placeholder-gray-600/50 font-mono focus:bg-white/5 rounded-sm transition-colors outline-0'
                placeholder='John Doe'
                type='text'
                required={true}
                value={body.email + '"'}
                onChange={(e) => {
                  console.log(e.target.value.split('"').join(''))

                  setBody({
                    ...body,
                    email: e.target.value.split('"').join('')
                  })
                }}
                onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                  console.log(e.currentTarget.name)

                  if (e.currentTarget.value === '"') {
                    // setTaget(e.currentTarget.name)
                    handleInputFocus()
                  }
                }}
                ref={inputRef}
                name='email'
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  const cursorPosition = e.currentTarget.selectionStart
                  const textLength = e.currentTarget.value.length
                  if (e.key === 'Backspace') {
                    if (cursorPosition === textLength) {
                      inputRef.current?.setSelectionRange(
                        e.currentTarget.value.length - 2,
                        e.currentTarget.value.length - 1
                      )
                    }
                  } else if (cursorPosition === textLength) {
                    inputRef.current?.setSelectionRange(
                      e.currentTarget.value.length,
                      e.currentTarget.value.length - 1
                    )
                  }
                }}
              />
              {/* <span className='absolute -bottom-5 bg-red-500'>
                Email invalido
              </span> */}
              {body.email === '' && (
                <span className='text-gray-500 absolute left-1/6 pointer-events-none'>
                  {'//'} type your email here ...
                </span>
              )}
            </div>
          </div>
          <div className='flex group hover:bg-white/2 items-start py-1'>
            <div className='w-8 md:w-12 text-right pr-4 text-gray-600 select-none pt-1'>
              9
            </div>
            <div className='flex-1 pl-8 flex items-start flex-wrap relative'>
              <label className='text-blue-300 mr-2 whitespace-nowrap pt-1'>
                mensaje:
              </label>
              <span className='text-orange-300 pt-1'>{'"'}</span>
              <textarea
                className='bg-transparent border-none py-1 px-0 w-full md:w-2/3 text-orange-300 focus:ring-0 placeholder-gray-600/50 resize-none font-mono focus:bg-white/5 rounded-sm transition-colors leading-6 outline-0'
                placeholder='Type your message here...'
                rows={4}
                required={true}
                value={body.message + '"'}
                onChange={(e) => {
                  console.log(e.target.value.split('"').join(''))

                  setBody({
                    ...body,
                    message: e.target.value.split('"').join('')
                  })
                }}
                onClick={(e: React.MouseEvent<HTMLTextAreaElement>) => {
                  console.log(e.currentTarget.name)

                  if (e.currentTarget.value === '"') {
                    // setTaget(e.currentTarget.name)
                    handleTextareaFocus()
                  }
                }}
                ref={texttareaRef}
                name='message'
                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                  const cursorPosition = e.currentTarget.selectionStart
                  const textLength = e.currentTarget.value.length
                  if (e.key === 'Backspace') {
                    if (cursorPosition === textLength) {
                      texttareaRef.current?.setSelectionRange(
                        e.currentTarget.value.length - 2,
                        e.currentTarget.value.length - 1
                      )
                    }
                  } else if (cursorPosition === textLength) {
                    texttareaRef.current?.setSelectionRange(
                      e.currentTarget.value.length,
                      e.currentTarget.value.length - 1
                    )
                  }
                }}
              ></textarea>
              {body.message === '' && (
                <span className='text-gray-500 absolute left-1/5 pointer-events-none'>
                  {'//'} Type your message here...
                </span>
              )}
            </div>
          </div>
          <div className='flex group hover:bg-white/2 py-2'>
            <div className='w-8 md:w-12 text-right pr-4 text-gray-600 select-none pt-2'>
              10
            </div>
            <div className='flex-1 pl-4'>
              <button
                type='submit'
                className='group/btn relative inline-flex items-center gap-3 px-6 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/50 text-primary rounded transition-all'
              >
                <TerminalIcon className='text-[18px]' />
                <span className='font-bold'>await send(messageData)</span>
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
