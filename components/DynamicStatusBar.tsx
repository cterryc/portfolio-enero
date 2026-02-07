// components/DynamicStatusBar.tsx
'use client' // 👈 Esto marca este archivo como componente de cliente

import { usePathname } from 'next/navigation'
import StatusBar from '@/components/ui/StatusBar'

export default function DynamicStatusBar() {
  const pathname = usePathname()

  // Mueve la lógica aquí
  const getStatusInfo = () => {
    switch (pathname) {
      case '/skills':
        return { line: '29', col: '1', lang: 'JSON', icon: 'data_object' }
      case '/experience':
        return { line: '1', col: '1', lang: 'Git Graph', icon: 'history' }
      case '/contact':
        return { line: '15', col: '1', lang: 'TypeScript React', icon: 'code' }
      default:
        return { line: '12', col: '40', lang: 'TypeScript React', icon: 'code' }
    }
  }

  const status = getStatusInfo()

  return <StatusBar {...status} />
}
