const { NextResponse } = require('next/server')
import { connectMongoBD } from '@/app/lib/mongodb'
import libFiles from '@/app/models/libFiles'
import { headers } from 'next/headers';
export async function GET (req) {
const header=headers()


const token=header.get("token")
console.log("from api get /files");
  

  if(token==="ONLY_FILE_INFO"){

    await connectMongoBD()
    const data = await libFiles.find({},{filebuffer:0})
    if (data.length > 0) {
      const fileData = data.map(({ filename, size, date, _id }) => ({
        fname: filename,
        fsize: size,
        fdate: date,
        fid: _id,
      }));
      
      return NextResponse.json(fileData);
    }
  }
  return NextResponse.json({message:"file not found"})
    
}

export async function POST (req) {
console.log("from api post /files");

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
