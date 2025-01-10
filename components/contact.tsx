import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Linkedin, Github } from 'lucide-react'
import Link from 'next/link'

export function Contact() {
  return (
    <Card className='col-span-3 md:col-span-1'>
      <CardHeader>
        <CardTitle>Contacto</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Button variant='outline' className='w-full'>
          <Mail className='mr-2 h-4 w-4' /> daniel.martel1@gmail.com
        </Button>
        <Button variant='outline' className='w-full'>
          <Linkedin className='mr-2 h-4 w-4' />
          <Link
            href='https://www.linkedin.com/in/developer-martel/'
            target='_blank'
          >
            Linkedin
          </Link>
        </Button>
        <Button variant='outline' className='w-full'>
          <Github className='mr-2 h-4 w-4' />
          <Link href='https://github.com/cterryc' target='_blank'>
            GitHub
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
