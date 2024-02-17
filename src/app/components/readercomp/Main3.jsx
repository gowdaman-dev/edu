"use server"
import { getDownloadURL, ref } from 'firebase/storage'
import axios from 'axios'
export async function PdfFetch() {
    try {
        const bytes = await axios.get("https://firebasestorage.googleapis.com/v0/b/lmsedu-e5dbc.appspot.com/o/files%2F9295393c-44a3-42d8-828b-239c1706f1a4?alt=media&token=4449c389-f4e4-435e-a395-b0036489b809",{
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
