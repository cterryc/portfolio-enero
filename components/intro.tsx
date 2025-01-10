import { Card, CardContent } from '@/components/ui/card'

export function Intro() {
  return (
    <Card className='col-span-3'>
      <CardContent className='p-6'>
        <h2 className='text-2xl font-semibold mb-4'>Hola, soy Daniel</h2>
        <p>
          Desarrollador full-stack junior con más de un año de experiencia
          creando aplicaciones web modernas y funcionales. Apasionado por el
          desarrollo de software, me especializo en tecnologías como JavaScript,
          Node.js, Express, Sequelize, PostgreSQL, Next.js y React.js, además de
          estar aprendiendo TypeScript y NestJS para ampliar mis habilidades.
        </p>
      </CardContent>
    </Card>
  )
}
