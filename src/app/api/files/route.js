const { NextResponse } = require('next/server')
import { connectMongoBD } from '@/app/lib/mongodb'
import libFiles from '@/app/models/libFiles'
import { parseUrl } from 'next/dist/shared/lib/router/utils/parse-url';
export async function GET (req) {
const request=await req.url
const parsedUrl = parseUrl(request)
const query=parsedUrl.query
const GRADE=Number(query.grade)||1
console.log("from api get /files");
if(query){

  try{
    await connectMongoBD()
   
    
     const data = await libFiles.find({file_school:{ $in: [query.school, "default"] },file_grade:GRADE})

    
    if (data.length > 0) {
      const fileData = data.map(({ file_name, file_size, file_date, file_id,file_url,trans_url,audio_url }) => ({
        fname: file_name,
       fsize: file_size,
        fdate: file_date,
        fid: file_id,
        furl:file_url,
        aurl:audio_url,
        turl:trans_url,
        
      }));
      
      return NextResponse.json(fileData);
    }
  }catch(e){
    return NextResponse.json({message:"connection with db throws a error"})
  
  }
}
  return NextResponse.json({message:"there is no files"})
    
}

export async function POST (req) {
console.log("from api post /files");

  try {
    let { fname,fsize,_fid,fgrade,fschool,furl,aurl,turl } = await req.json()
    fgrade=Number(fgrade);
    console.log(fschool);
    


    const date = new Date()
    await connectMongoBD()
await libFiles.create({ file_name:fname, file_id:_fid,file_size:fsize, file_date:date,file_grade:fgrade,file_school:fschool,file_url:furl,audio_url:aurl,trans_url:turl })
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
   await connectMongoBD()
 const data=await libFiles.deleteOne({file_id:id})
 console.log(data);
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