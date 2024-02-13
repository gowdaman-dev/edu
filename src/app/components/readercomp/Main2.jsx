"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/firebase/firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import axios from 'axios'
function Main2() {
    const [buffer, setBuffer] = useState([])
    useEffect(()=>{
async function fetchBytes(){
    try {

        const pathReference = ref(db, `files/1a643660-8a4e-479d-a4b2-db84c6cc175d`)
        const URL= await getDownloadURL(pathReference)
        const bytes= await axios.get("/api/pdfbytes",{
            params:{
                url: URL ,
            },
            responseType: 'ararybuffer'
        },).then(res=>setBuffer(res))
        

    } catch (error) {
        console.log(error.message);

    }

}
fetchBytes()
    },[])
  
    return (
        <div>jshs</div>
    )
}

export default Main2