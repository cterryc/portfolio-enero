'use client'

import React from 'react'
import { Button } from './ui/button'
import { SiReaddotcv } from 'react-icons/si'

const Resume = () => {
  const handleButton = () => {
    window.open(
      'https://drive.google.com/file/d/1ixGxYnTgSYMWBBHKQUXcPuNOo6uP9lVL/view?usp=sharing',
      '_blank'
    )
  }
  return (
    <Button
      variant='outline'
      onClick={handleButton}
      className='bg-gray-900 border border-slate-600'
    >
      <SiReaddotcv />
    </Button>
  )
}

export default Resume
