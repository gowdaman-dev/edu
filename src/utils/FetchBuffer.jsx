"use server"
import axios from 'axios'
export async function PdfFetch(url) {
    try {
        const bytes = await axios.get(url,{
            responseType:'arraybuffer'
        })
        const data = new Uint8Array(bytes.data)
        return data
    } catch (error) {
        console.log(error.message);
    }
    return (
        { error: "on getting buffer problem" }
    )
}
