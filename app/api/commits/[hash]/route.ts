import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ hash: string }> }
) {
  try {
    const { hash } = await params
    const commit = await prisma.commit.findUnique({
      where: { hash: hash }
    })

    if (!commit) {
      return NextResponse.json(
        { error: 'Commit no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(commit)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Error al obtener commit' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ hash: string }> }
) {
  try {
    const body = await request.json()
    const { hash } = await params

    const commit = await prisma.commit.update({
      where: { hash: hash },
      data: {
        role: body.role,
        company: body.company,
        date: body.date,
        head: body.head,
        branch: body.branch,
        merge: body.merge,
        details: body.details
      }
    })

    return NextResponse.json(commit)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Error al actualizar commit' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ hash: string }> }
) {
  try {
    const { hash } = await params
    await prisma.commit.delete({
      where: { hash: hash }
    })

    return NextResponse.json({ message: 'Commit eliminado' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Error al eliminar commit' },
      { status: 500 }
    )
  }
}
