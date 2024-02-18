"use server"
import { getDownloadURL, ref } from 'firebase/storage'
import axios from 'axios'
export async function PdfFetch() {
    try {
        const bytes = await axios.get("https://firebasestorage.googleapis.com/v0/b/lmsedu-e5dbc.appspot.com/o/files%2Fca97e39c-ca5e-4060-8237-83c36dbfdc86?alt=media&token=1418003f-969d-41a4-976c-04a4bcf2d5b4",{
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
