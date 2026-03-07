'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, X, Send, Sparkles, Trash2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface ChatHistory {
  messages: Message[]
  expiresAt: number
}

// Configuración de persistencia
const CHAT_STORAGE_KEY = 'chat-history'
const CHAT_EXPIRY_HOURS = 48
const MAX_MESSAGES = 15

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [error, setError] = useState<string | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [promptDismissed, setPromptDismissed] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Restaurar chat desde localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY)
      if (stored) {
        const data: ChatHistory = JSON.parse(stored)
        if (Date.now() < data.expiresAt && data.messages.length > 0) {
          setMessages(data.messages)
        } else {
          localStorage.removeItem(CHAT_STORAGE_KEY)
        }
      }
    } catch (err) {
      console.error('Error al restaurar chat:', err)
      localStorage.removeItem(CHAT_STORAGE_KEY)
    }
  }, [])

  // Guardar chat en localStorage cuando cambian los mensajes
  useEffect(() => {
    if (messages.length > 0) {
      try {
        const history: ChatHistory = {
          messages: messages.slice(-MAX_MESSAGES),
          expiresAt: Date.now() + (CHAT_EXPIRY_HOURS * 60 * 60 * 1000)
        }
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history))
      } catch (err) {
        console.error('Error al guardar chat:', err)
      }
    }
  }, [messages])

  // Timer para mostrar popup de invitación después de 60 segundos
  useEffect(() => {
    // Solo mostrar si: chat cerrado, sin mensajes, no dismissado, no mostrado ya
    if (!isOpen && messages.length === 0 && !promptDismissed && !showPrompt) {
      const timer = setTimeout(() => {
        setShowPrompt(true)
      }, 60000) // 60 segundos

      return () => clearTimeout(timer)
    }
  }, [isOpen, messages.length, promptDismissed, showPrompt])

  // Scroll automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Foco en el input al abrir el chat
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Manejar envío del mensaje
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isSending) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsSending(true)
    setError(null)

    try {
      // Preparar historial de mensajes para la API
      const messagesPayload = messages.concat(userMessage).map((m) => ({
        role: m.role,
        content: m.content
      }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messagesPayload
        })
      })

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor')
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: data.timestamp
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error('Error al enviar mensaje:', err)
      setError('Error de conexión. Intenta nuevamente.')
    } finally {
      setIsSending(false)
    }
  }

  // Manejar envío con Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage()
  }

  // Limpiar chat
  const handleClearChat = () => {
    localStorage.removeItem(CHAT_STORAGE_KEY)
    setMessages([])
    setError(null)
  }

  return (
    <>
      {/* Popup de invitación */}
      {showPrompt && !isOpen && (
        <div className='fixed bottom-28 right-4 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300'>
          <div className='bg-panel-dark border border-border-dark rounded-lg shadow-2xl p-4 max-w-[280px] sm:max-w-xs'>
            <div className='flex items-start gap-3'>
              <Sparkles className='w-5 h-5 text-primary shrink-0 mt-0.5' />
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-semibold text-white'>
                  ¿Tienes dudas?
                </p>
                <p className='text-xs text-gray-400 mt-1 leading-relaxed'>
                  Pregúntame sobre los proyectos de Daniel. ¡Estoy aquí para ayudarte!
                </p>
              </div>
              <button
                onClick={() => {
                  setShowPrompt(false)
                  setPromptDismissed(true)
                }}
                className='text-gray-400 hover:text-white transition-colors shrink-0 -mr-1 -mt-1 p-1'
                aria-label='Cerrar'
              >
                <X className='w-4 h-4' />
              </button>
            </div>
            <button
              onClick={() => {
                setShowPrompt(false)
                setIsOpen(true)
              }}
              className='w-full mt-3 bg-primary hover:bg-green-400 text-background-dark text-xs font-semibold py-2 px-3 rounded transition-colors'
            >
              ¡Hablar ahora!
            </button>
          </div>
        </div>
      )}

      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className='fixed bottom-4 right-4 sm:bottom-8 sm:right-6 z-50 bg-primary hover:bg-green-400 text-background-dark p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-2 group justify-center'
          aria-label='Abrir chat con IA'
        >
          <Bot className='w-6 h-6' />
          <span className='hidden sm:max-w-xs sm:block transition-all duration-300 overflow-hidden whitespace-nowrap font-semibold'>
            Asistente IA
          </span>
        </button>
      )}

      {/* Ventana del Chat */}
      {isOpen && (
        <div className='fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95%] max-w-[calc(100vw-30px)] sm:max-w-md bg-panel-dark border border-border-dark rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300'>
          {/* Header */}
          <div className='bg-background-dark border-b border-border-dark px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between shrink-0'>
            <div className='flex items-center gap-2 min-w-0'>
              <Sparkles className='w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0' />
              <div className='min-w-0'>
                <h3 className='text-white font-semibold text-sm truncate'>
                  Asistente Virtual
                </h3>
                <p className='text-gray-400 text-[10px] sm:text-xs truncate hidden sm:block'>
                  Powered by Gemini AI · Daniel Martel Portfolio
                </p>
              </div>
            </div>
            <div className='flex items-center gap-1 shrink-0'>
              <button
                onClick={handleClearChat}
                className='text-gray-400 hover:text-red-400 transition-colors p-1'
                aria-label='Limpiar chat'
                title='Borrar conversación'
              >
                <Trash2 className='w-4 h-4 sm:w-5 sm:h-5' />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className='text-gray-400 hover:text-white transition-colors p-1'
                aria-label='Cerrar chat'
              >
                <X className='w-5 h-5' />
              </button>
            </div>
          </div>

          {/* Área de mensajes */}
          <div className='flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-[50vh] max-h-[60vh] sm:min-h-[400px] sm:max-h-[500px] bg-panel-dark'>
            {messages.length === 0 && (
              <div className='text-center text-gray-400 py-4 sm:py-8'>
                <Sparkles className='w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-primary/50' />
                <p className='text-xs sm:text-sm'>
                  ¡Hola! Soy el asistente virtual de Daniel.
                </p>
                <p className='text-[10px] sm:text-xs mt-1 sm:mt-2'>
                  Pregúntame sobre sus proyectos, experiencia o habilidades.
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-background-dark'
                      : 'bg-background-dark border border-border-dark text-gray-300'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div className='prose prose-invert prose-xs sm:prose-sm max-w-none'>
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}

            {isSending && (
              <div className='flex justify-start'>
                <div className='bg-background-dark border border-border-dark rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-300'>
                  <div className='flex items-center gap-1 sm:gap-2'>
                    <div className='flex gap-1'>
                      <span className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]'></span>
                      <span className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]'></span>
                      <span className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce'></span>
                    </div>
                    <span className='text-[10px] sm:text-xs text-gray-400 whitespace-nowrap'>
                      Daniel está escribiendo...
                    </span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className='flex justify-center'>
                <div className='bg-red-500/10 border border-red-500/30 rounded-lg px-3 sm:px-4 py-2 text-[10px] sm:text-xs text-red-400'>
                  {error}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className='border-t border-border-dark p-3 sm:p-4 bg-background-dark shrink-0'
          >
            <div className='flex items-center gap-2'>
              <input
                ref={inputRef}
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Escribe tu mensaje...'
                disabled={isSending}
                className='flex-1 bg-panel-dark border border-border-dark rounded-lg px-3 sm:px-4 py-2.5 sm:py-2.5 text-xs sm:text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 disabled:opacity-50 transition-colors min-h-[44px]'
              />
              <button
                type='submit'
                disabled={isSending || !inputValue.trim()}
                className='bg-primary hover:bg-green-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-background-dark p-2.5 sm:p-2.5 rounded-lg transition-colors shrink-0 min-w-[44px] min-h-[44px]'
                aria-label='Enviar mensaje'
              >
                <Send className='w-5 h-5' />
              </button>
            </div>
            <p className='text-[9px] sm:text-xs text-gray-500 mt-1 sm:mt-2 text-center'>
              Presiona Enter para enviar · IA puede cometer errores
            </p>
          </form>
        </div>
      )}
    </>
  )
}
