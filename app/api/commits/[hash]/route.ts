import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ENV } from '@/config/env'
import { revalidatePath } from 'next/cache'

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

    // Verificación de contraseña de administrador
    if (!body.adminPassword || body.adminPassword !== ENV.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Admin Password Incorrect' },
        { status: 500 }
      )
    }

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

    revalidatePath('/experience')
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
    const body = await request.json()

    // Verificación de contraseña de administrador
    if (!body.adminPassword || body.adminPassword !== ENV.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Admin Password Incorrect' },
        { status: 500 }
      )
    }

    await prisma.commit.delete({
      where: { hash: hash }
    })

    revalidatePath('/experience')
    return NextResponse.json({ message: 'Commit eliminado' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Error al eliminar commit' },
      { status: 500 }
    )
  }
}

