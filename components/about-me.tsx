import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AboutMe() {
  return (
    <Card className='col-span-3 md:col-span-1 col-start-1'>
      <CardHeader>
        <CardTitle>Un poco sobre mi</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='max-[1000px]:text-sm'>
          Didfruto el ensamblaje de computadoras y comprendo la importancia de
          una base sólida en hardware para el desarrollo de software. Esto me
          permite tener una comprensión profunda de cómo interactúan los
          componentes de hardware y software para crear aplicaciones eficientes
          y robustas, Me formé en el {`${'"Instituto Tecnológico IDAT"'}`} y en
          el bootcamp {`${'"Soy Henry"'}`}, adquiriendo conocimientos sólidos en
          una amplia gama de tecnologías y metodologías de desarrollo.
        </p>
      </CardContent>
    </Card>
  )
}
