import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FaReact, FaGitAlt, FaGithub } from 'react-icons/fa'
import { RiNextjsLine, RiTailwindCssLine, RiNodejsFill } from 'react-icons/ri'
import { TbBrandVite, TbBrandRedux, TbBrandMongodb } from 'react-icons/tb'
import {
  SiExpress,
  SiSequelize,
  SiNestjs,
  SiPostgresql,
  SiPostman,
  SiJsonwebtokens
} from 'react-icons/si'

export function Skills() {
  const skills = [
    {
      category: 'Frontend',
      items: [
        { name: 'React.js', svg: <FaReact /> },
        { name: 'Next.js', svg: <RiNextjsLine /> },
        { name: 'Vite', svg: <TbBrandVite /> },
        { name: 'Tailwind', svg: <RiTailwindCssLine /> },
        { name: 'ReduxToolkit', svg: <TbBrandRedux /> }
      ]
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', svg: <RiNodejsFill /> },
        { name: 'Express', svg: <SiExpress /> },
        { name: 'Sequelize', svg: <SiSequelize /> },
        { name: 'NestJS', svg: <SiNestjs /> }
      ]
    },
    {
      category: 'Bases de Datos',
      items: [
        { name: 'PostgreSQL', svg: <SiPostgresql /> },
        { name: 'MongoDB', svg: <TbBrandMongodb /> }
      ]
    },
    {
      category: 'Herramientas y otros',
      items: [
        { name: 'Git', svg: <FaGitAlt /> },
        { name: 'GitHub', svg: <FaGithub /> },
        { name: 'Postman', svg: <SiPostman /> },
        { name: 'JWT', svg: <SiJsonwebtokens /> }
      ]
    }
  ]

  return (
    <Card className='col-span-3 md:col-span-2'>
      <CardHeader>
        <CardTitle>Habilidades</CardTitle>
      </CardHeader>
      <CardContent>
        {skills.map((skill) => (
          <div key={skill.category} className='mb-4'>
            <h3 className='font-semibold mb-2'>{skill.category}</h3>
            <div className='flex flex-wrap gap-2'>
              {skill.items.map((item) => (
                <Badge
                  key={item.name}
                  variant='secondary'
                  className='cursor-pointer gap-1 text-sm font-light'
                >
                  {item.svg} {item.name}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
