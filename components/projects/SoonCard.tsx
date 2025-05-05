'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { FiLink } from 'react-icons/fi'

const SoonCard = () => {
  return (
    <Card key={'soon'} className='grid grid-cols-1'>
      <CardHeader>
        <CardTitle className='text-lg'>
          Pronto proximo proyecto
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col h-20 pb-0 gap-1'>
        <p className='w-full h-6 bg-slate-800 rounded-full'></p>
        <p className='w-full h-6 bg-slate-800 rounded-full'></p>
      </CardContent>
      <CardContent className='soon-container pb-2'>
        <div className='flipper'>
          <div className='front'>
            <Image
              src={'https://kzmofy8h0kyl1dp3r433.lite.vusercontent.net/placeholder.svg?height=300&width=500'}
              width={500}
              height={300}
              alt={'soon'}
              className='imagen-projects'
            />
          </div>
        </div>
      </CardContent>
      <CardContent className='flex items-center gap-2 pb-2 pt-2'>
        <FiLink />
        <Link
          className='text-blue-400 hover:text-blue-200'
          href={'https://github.com/cterryc'}
        >
          https://github.com/cterryc
        </Link>
      </CardContent>

      <div className='flex h-16 gap-1 px-5'>
        <p className='w-28 h-6 bg-slate-800 rounded-full'></p>
        <p className='w-28 h-6 bg-slate-800 rounded-full'></p>
        <p className='w-28 h-6 bg-slate-800 rounded-full'></p>
      </div>
    </Card>
  )
}

export default SoonCard
