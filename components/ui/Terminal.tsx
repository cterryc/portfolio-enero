'use client'

import { useFiles } from '@/context/FileContext'
import { Plus, Trash2, Minimize2 } from 'lucide-react'
import { Fragment, JSX, useRef, useState, useEffect } from 'react'
import { projects } from '@/lib/projects'

interface ArrayTerminalTexts {
  html: JSX.Element
  bodyText: string
}

export default function Terminal() {
  const { showTerminal, setShowTerminal } = useFiles()
  const [terminalFocus, setTerminalFocus] = useState(false)
  const [terminalText, setTerminalText] = useState('')
  const [arrayTerminalTexts, setArrayTerminalTexts] = useState<
    ArrayTerminalTexts[]
  >([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current && terminalFocus) {
      inputRef.current.focus()
      inputRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [terminalFocus, arrayTerminalTexts])

  if (!showTerminal) {
    return null
  }

  // Comandos disponibles
  const commands = {
    help: {
      description: 'Muestra todos los comandos disponibles',
      execute: () => `
        Comandos disponibles:
        • help      - Muestra esta ayuda
        • ls        - Lista todos los proyectos
        • clear     - Limpia la terminal
        • echo <texto> - Repite el texto ingresado
        • date      - Muestra la fecha y hora actual
        • projects  - Muestra información detallada de proyectos
        • history   - Muestra el historial de comandos
        • pwd       - Muestra el directorio actual
      `
    },
    ls: {
      description: 'Lista todos los proyectos',
      execute: () => {
        const projectIds = projects
          .map((project) => `• ${project.id}.tsx`)
          .join('\n')
        return `Proyectos disponibles:\n${projectIds}`
      }
    },
    clear: {
      description: 'Limpia la terminal',
      execute: () => {
        setArrayTerminalTexts([])
        return null // No muestra output
      }
    },
    echo: {
      description: 'Repite el texto ingresado',
      execute: (args: string[]) => args.join(' ') || ' '
    },
    date: {
      description: 'Muestra la fecha y hora actual',
      execute: () => new Date().toLocaleString()
    },
    projects: {
      description: 'Muestra información detallada de los proyectos',
      execute: () => {
        return projects
          .map(
            (project) =>
              `\n📁 ${project.id}\n   ${project.title}\n   Tecnologías: ${project.technologies?.join(', ') || 'No especificado'}\n`
          )
          .join('')
      }
    },
    history: {
      description: 'Muestra el historial de comandos',
      execute: () => {
        if (commandHistory.length === 0) return 'No hay historial de comandos'
        return commandHistory.map((cmd, idx) => `${idx + 1}. ${cmd}`).join('\n')
      }
    },
    pwd: {
      description: 'Muestra el directorio actual',
      execute: () => '~/projects/portfolio'
    }
  }

  const processCommand = (command: string) => {
    const trimmedCommand = command.trim()
    if (!trimmedCommand) return

    // Agregar al historial
    setCommandHistory((prev) => [...prev, trimmedCommand])
    setHistoryIndex(-1)

    const parts = trimmedCommand.split(' ')
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1)

    let output: string | null = ''

    if (commands[cmd as keyof typeof commands]) {
      const commandObj = commands[cmd as keyof typeof commands]
      const result = commandObj.execute(args)
      if (cmd !== 'clear') {
        output = result
      } else {
        output = null // No mostrar output para clear
      }
    } else {
      output = `Comando no encontrado: ${cmd}\nEscribe 'help' para ver los comandos disponibles.`
    }

    // Solo agregar output si hay algo que mostrar
    if (output !== null) {
      setArrayTerminalTexts((prev) => [
        ...prev,
        {
          html: (
            <>
              <div className='flex items-center text-gray-400 mt-2'>
                <span className='text-primary font-bold mr-2'>➜</span>
                <span className='text-blue-400 mr-2'>
                  ~/projects/portfolio :
                </span>
                <span>{command}</span>
              </div>
              {output && (
                <div className='text-gray-300 ml-4 mt-1 whitespace-pre-line'>
                  {output.split('\n').map((line, i) => (
                    <Fragment key={i}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
                </div>
              )}
            </>
          ),
          bodyText: command
        }
      ])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(terminalText)
      setTerminalText('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex < commandHistory.length - 1
            ? historyIndex + 1
            : historyIndex
        setHistoryIndex(newIndex)
        if (newIndex >= 0) {
          setTerminalText(commandHistory[commandHistory.length - 1 - newIndex])
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setTerminalText(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setTerminalText('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const input = terminalText.toLowerCase()
      const matchingCommands = Object.keys(commands).filter((cmd) =>
        cmd.startsWith(input)
      )
      if (matchingCommands.length === 1) {
        setTerminalText(matchingCommands[0])
      }
    }
  }

  return (
    <div
      className='h-48 border-t border-border-dark bg-background-dark flex flex-col shrink-0 max-md:hidden'
      id='terminal'
    >
      <div className='flex items-center px-4 gap-6 border-b border-border-dark h-9'>
        <button className='text-xs font-bold text-white border-b-2 border-primary h-full pt-1'>
          TERMINAL
        </button>
        <button className='text-xs font-bold text-gray-500 hover:text-gray-300 h-full pt-1'>
          OUTPUT
        </button>
        <button className='text-xs font-bold text-gray-500 hover:text-gray-300 h-full pt-1'>
          DEBUG CONSOLE
        </button>
        <div className='ml-auto flex gap-2'>
          <Plus className='text-gray-500 text-[16px] cursor-pointer hover:text-white h-5 w-5' />
          <Trash2
            className='text-gray-500 text-[16px] cursor-pointer hover:text-white h-5 w-5'
            onClick={() => setShowTerminal(false)}
          />
          <Minimize2 className='text-gray-500 text-[16px] cursor-pointer hover:text-white h-5 w-5' />
        </div>
      </div>
      <div className='flex-1 p-4 font-mono text-sm overflow-y-auto'>
        <div className='mb-2'>
          <div className='flex items-center text-gray-400'>
            <span className='text-primary font-bold mr-2'>➜</span>
            <span className='text-blue-400 mr-2'>~/projects/portfolio</span>
            <span className='text-gray-500'>git:(</span>
            <span className='text-red-400'>main</span>
            <span className='text-gray-500'>)</span>
            <span className='ml-2 text-white'>npm run deploy</span>
          </div>
          <div className='text-gray-500 ml-4'>
            &gt; building production bundle...
          </div>
          <div className='text-green-400 ml-4'>
            ✔ Optimized build complete in 1.4s
          </div>
          <div className='text-gray-400 ml-4'>Serving from localhost:5173</div>
        </div>

        {arrayTerminalTexts.map((ele, index) => (
          <Fragment key={index}>{ele.html}</Fragment>
        ))}

        <div
          onClick={() => setTerminalFocus(true)}
          className='flex items-center text-gray-400 mt-2'
        >
          <span className='text-primary font-bold mr-2'>➜</span>
          <span className='text-blue-400 mr-2'>~/projects/portfolio :</span>
          <input
            type='text'
            value={terminalText}
            placeholder={`${terminalFocus ? '' : '_'}`}
            className={`outline-0 bg-transparent flex-1 ${!terminalFocus && !terminalText ? 'animate-pulse' : ''}`}
            onFocus={() => setTerminalFocus(true)}
            onBlur={() => setTerminalFocus(false)}
            onChange={(e) => setTerminalText(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            autoComplete='off'
            autoCorrect='off'
            spellCheck='false'
          />
        </div>

        <div className='text-gray-500 text-xs mt-2 opacity-50'>
          💡 Tip: Presiona ↑/↓ para navegar por el historial, Tab para
          autocompletar, {'"Ctrl + ñ"'} para cerrar/abrir terminal
        </div>
      </div>
    </div>
  )
}
