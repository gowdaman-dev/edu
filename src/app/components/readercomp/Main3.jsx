"use server"
import axios from 'axios'
export async function PdfFetch(url) {
    try {
        const bytes = await axios.get(url,{
            responseType:'arraybuffer'
        })
        const api= await fetch(url)
        return api
        const data = new Uint8Array(bytes.data)
        return data
    } catch (error) {
        console.log(error.message);
    }
    return (
        { error: "on getting buffer problem" }
    )
}
