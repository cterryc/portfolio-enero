import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; statId: string }> }
) {
  try {
    const { statId } = await params
    const body = await request.json()

    const stat = await prisma.projectStat.update({
      where: { id: parseInt(statId) },
      data: {
        label: body.label,
        val: body.val,
        color: body.color
      }
    })

    return NextResponse.json(stat)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Error al actualizar estadística' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; statId: string }> }
) {
  const { statId, id } = await params
  console.log('statId', statId)

  try {
    await prisma.projectStat.delete({
      where: { id: parseInt(statId), projectId: id }
    })

    return NextResponse.json({ message: 'Estadística eliminada' })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Error al eliminar estadística' },
      { status: 500 }
    )
  }
}
