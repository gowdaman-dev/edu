"use server"
import { getDownloadURL, ref } from 'firebase/storage'
import axios from 'axios'
export async function PdfFetch() {
    try {
        const bytes = await axios.get("https://firebasestorage.googleapis.com/v0/b/lmsedu-e5dbc.appspot.com/o/files%2F1a643660-8a4e-479d-a4b2-db84c6cc175d?alt=media&token=37114549-230b-476f-8fa9-6cd080dcbbbc",{
            method:'GET',
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
