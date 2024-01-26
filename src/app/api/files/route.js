const { NextResponse } = require('next/server')
import { connectMongoBD } from '@/app/lib/mongodb'
import libFiles from '@/app/models/libFiles'
export async function GET (req) {
  
    await connectMongoBD()
    const data = await libFiles.find()
    console.log(data);
    if(data)console.log(true);
    return NextResponse.json(data)
  
}

export async function POST (req) {
  try {
    const file = await req.formData()
    const fileData = file.get('file')
    const { size, name } = fileData
    const date = new Date()
    const bytes = await fileData.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await connectMongoBD()
    const createField = await libFiles.create({ filename:name, filebuffer:buffer, size:size, date:date })
    console.log('createdFile', createField)
  } catch (err) {
    return NextResponse.json(
      { message: 'internal server error' },
      { status: 500 }
    )
  }

  return NextResponse.json({ post: 'ok' })
}
