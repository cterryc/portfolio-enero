import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Education() {
  return (
    <Card className='col-span-3 md:col-span-2'>
      <CardHeader>
        <CardTitle>Educación Profesional</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='list-disc pl-5 space-y-2 text-sm max-[400px]:text-xs'>
          <li>
            Técnico Redes y Comunicaciones. Instituto tecnológico IDAT.
            <p>Mayo 2016 - Junio 2018</p>
          </li>
          <li>
            Full Stack Web Developer. Henry Bootcamp. Cursado teórico-práctico.
            <p>Mayo 2022 - Mayo 2023</p>
          </li>
          <br />
          <h1>EDUCACIÓN COMPLEMENTARIA:</h1>
          <li>HTML/CSS. Udemy. 2020.</li>
          <li>Escuela de Javascript. Udemy. 2021.</li>
        </ul>
      </CardContent>
    </Card>
  )
}
