import React from 'react'
import { Card } from './ui/card'
import { HiMiniCodeBracket } from 'react-icons/hi2'
import { IoMdHeart } from 'react-icons/io'
import { FaReact } from 'react-icons/fa6'

const Footer = () => {
  return (
    <Card className='col-span-3 flex justify-center items-center h-10 gap-1'>
      <HiMiniCodeBracket /> with <IoMdHeart /> by <h3>Terry</h3> using
      <FaReact />
    </Card>
  )
}

export default Footer
