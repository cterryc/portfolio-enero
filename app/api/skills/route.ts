import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ENV } from '@/config/env'

export async function GET() {
  try {
    const skills = await prisma.skill.findMany()
    
    // Transformar de [{key: 'frontend', value: [...]}, ...] a {frontend: [...], ...}
    const skillsObject = skills.reduce((acc, curr) => {
      acc[curr.key] = curr.value
      return acc
    }, {} as Record<string, string[]>)

    return NextResponse.json(skillsObject)
  } catch (error) {
    console.error('Error al obtener skills:', error)
    return NextResponse.json(
      { error: 'Error al obtener skills de la base de datos' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Verificación de contraseña de administrador
    if (!body.adminPassword || body.adminPassword !== ENV.ADMIN_PASSWORD) {
      console.error('Admin Password Incorrect')
      return NextResponse.json(
        { error: 'Admin Password Incorrect' },
        { status: 500 }
      )
    }

    const skillsData = body.skillsData

    if (!skillsData || typeof skillsData !== 'object') {
       return NextResponse.json(
        { error: 'Formato de skillsData inválido' },
        { status: 400 }
      )
    }

    // 1. Array temporal para los objetos { key, value }
    const recordsToInsert: { key: string; value: string[] }[] = []

    // 2. Transforma el objeto de entrada en arreglos
    // Por ejemplo: { frontend: ['React'], backend: ['Node'] } ->
    // [{ key: 'frontend', value: ['React'] }, { key: 'backend', value: ['Node'] }]
    for (const [key, value] of Object.entries(skillsData)) {
      if (Array.isArray(value)) {
        recordsToInsert.push({
          key,
          value: value.map(v => String(v)) // aseguramos que todos sean string
        })
      }
    }

    // 3. Ejecutar transacción: borrar todo y crear de nuevo
    await prisma.$transaction([
      prisma.skill.deleteMany(),
      prisma.skill.createMany({
        data: recordsToInsert
      })
    ])

    return NextResponse.json(
      { message: 'Skills actualizados correctamente', count: recordsToInsert.length },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error al guardar skills:', error)
    return NextResponse.json(
      { error: 'Error al actualizar skills en la base de datos' },
      { status: 500 }
    )
  }
}
