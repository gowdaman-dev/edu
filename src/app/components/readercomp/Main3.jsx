"use server"
import { getDownloadURL, ref } from 'firebase/storage'
import axios from 'axios'
export async function PdfFetch() {
    try {
        const bytes = await axios.get("https://firebasestorage.googleapis.com/v0/b/lmsedu-e5dbc.appspot.com/o/files%2Fd9eaa0d5-de5c-4cb5-be82-cc9502a9c238?alt=media&token=64d1a4d8-ec13-478d-a295-743190c79526",{
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
