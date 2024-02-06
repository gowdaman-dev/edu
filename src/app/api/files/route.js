const { NextResponse } = require('next/server')
import { connectMongoBD } from '@/app/lib/mongodb'
import libFiles from '@/app/models/libFiles'
import { headers } from 'next/headers';
export async function GET () {


console.log("from api get /files");
  

try{

  await connectMongoBD()
  const data = await libFiles.find()
  if (data.length > 0) {
    const fileData = data.map(({ file_name, file_size, file_date, file_id }) => ({
      fname: file_name,
     fsize: file_size,
      fdate: file_date,
      fid: file_id,
    }));
    
    return NextResponse.json(fileData);
  }
}catch(e){
  return NextResponse.json({message:"connection with db throws a error"},{status: 500})

}
  return NextResponse.json({message:"file not found"},{status:404})
    
}

export async function POST (req) {
console.log("from api post /files");

  try {
    let { fname,fsize,_fid } = await req.json()
    
    const date = new Date()
    await connectMongoBD()
    const createField = await libFiles.create({ file_name:fname, file_id:_fid,file_size:fsize, file_date:date })
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
 await libFiles.deleteOne({file_id:id})
  return NextResponse.json({message:"deleted successfully"},{status:200})
     
    }
  }catch(e){
    return NextResponse.json({message:"connection with db throws a error"},{status: 500})


  }
 
  return NextResponse.json({message:"file not found"},{status:404})


}


export async function PUT(req){
  console.log("from api/files/put")
  try{
    let {id,name}=await req.json()
    if(id && name){
      name=name+".pdf"
      console.log(name);

      console.log(id);
   await connectMongoBD()
  await libFiles.updateOne({file_id:id},{file_name:name})

  return NextResponse.json({message:"Updated successfully"},{status:200})

}

}
catch(e){
  return NextResponse.json({message:"connection with db throws a error"},{status: 500})
}
return NextResponse.json({message:"file not found"},{status:404})


}