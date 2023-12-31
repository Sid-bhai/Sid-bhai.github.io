import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name') 
  if (!name) {
  return NextResponse.json({ error: "Please Give your name in a query." }, { status: 500 })
  } else {
  return NextResponse.json({ name }, { status: 500 })
  }
}