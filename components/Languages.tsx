import React, { useCallback, useEffect, useState } from 'react'
import { CardContent } from './ui/card'
import { Badge } from './ui/badge'
import Link from 'next/link'

interface ProjectsProps {
  languages: string
  svn: string
}

const Languages = ({ languages, svn }: ProjectsProps) => {
  const [data, setData] = useState<number[]>([])
  const handleRequest = useCallback(async () => {
    try {
      const response = await fetch(languages)
      const result = await response.json()
      return setData(result)
    } catch (error) {
      console.error(error)
    }
  }, [languages])

  useEffect(() => {
    handleRequest()
  }, [handleRequest])
  const array = []
  let total_count = 0
  for (const index in data) {
    array.push(index)
    total_count += data[index]
  }

  return (
    <CardContent className='flex gap-1 flex-wrap h-16 pb-2'>
      {/* <Link href={svn}>
        <Badge>{languages_url}</Badge>
      </Link> */}
      {array.length
        ? array.map((language: string | number) => (
            <Link
              key={language}
              href={svn + `/search?l=${language}`}
              target=' _blank'
              rel='noopener noreferrer'
            >
              <Badge className='bg-blue-800 hover:bg-blue-400 text-white'>
                {language}:{' '}
                {Math.trunc((data[language as number] / total_count) * 1000) /
                  10}{' '}
                %
              </Badge>
            </Link>
          ))
        : 'code yet to be deployed.'}
    </CardContent>
  )
}

export default Languages
