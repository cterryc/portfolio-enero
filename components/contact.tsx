'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Linkedin, Github } from 'lucide-react'

export function Contact() {
  const handleRedirect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // window.open('https://www.google.com', '_blank')
    e.preventDefault()
    const email = 'daniel.martel1@gmail.com'
    const subject = 'Developer Daniel'
    const body = 'Hola, necesito información sobre...'
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    const target = e.target as HTMLButtonElement
    console.log(target.id)
    if (target.id === 'linkedin') {
      window.open('https://www.linkedin.com/in/developer-martel/', '_blank')
    } else if (target.id === 'github') {
      window.open('https://github.com/cterryc', '_blank')
    } else {
      window.open(gmailUrl, '_blank')
    }
  }
  return (
    <Card className='col-span-3 md:col-span-1'>
      <CardHeader>
        <CardTitle>Contacto</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Button variant='outline' onClick={handleRedirect} className='w-full'>
          <Mail className='mr-2 h-4 w-4' /> daniel.martel1@gmail.com
        </Button>
        <Button
          variant='outline'
          id='linkedin'
          onClick={handleRedirect}
          className='w-full'
        >
          <Linkedin className='mr-2 h-4 w-4' />
          Linkedin
        </Button>

        <Button
          variant='outline'
          id='github'
          onClick={handleRedirect}
          className='w-full'
        >
          <Github className='mr-2 h-4 w-4' />
          GitHub
        </Button>
      </CardContent>
    </Card>
  )
}
