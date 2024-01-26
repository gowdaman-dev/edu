import React from 'react'

async function fetchFiles() {
    let resp=await fetch(`${process.env.NEXTAUTH_URL}api/files`)
    const resps=await resp.json()
    console.log(resps);
  return  "ok"
 
}

export default fetchFiles