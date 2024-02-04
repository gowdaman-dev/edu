const { NextResponse } = require('next/server')
import { connectMongoBD } from '@/app/lib/mongodb'
import libFiles from '@/app/models/libFiles'
import { headers } from 'next/headers';
export async function GET () {
const header=headers()


const token=header.get("token")
console.log("from api get /files");
  

  if(token==="ONLY_FILE_INFO"){
try{

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
}catch(e){
  return NextResponse.json({message:"connection with db throws a error"},{status: 500})

}
  }
  return NextResponse.json({message:"file not found"},{status:404})
    
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

export async function DELETE(req){
  console.log("from api/files/delete")
  try{
    const {id}=await req.json()
    if(id){
      console.log(id);
   await connectMongoBD()
   await libFiles.deleteOne({_id:id})
  return NextResponse.json({message:"deleted successfully"},{status:200})
     
    }
  }catch(e){
    return NextResponse.json({message:"connection with db throws a error"},{status: 500})


  }
 
  return NextResponse.json({message:"file not found"},{status:404})


}