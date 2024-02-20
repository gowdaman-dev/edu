"use server"
import { getDownloadURL, ref } from 'firebase/storage'
import axios from 'axios'
export async function PdfFetch() {
    try {
        const bytes = await axios.get("https://firebasestorage.googleapis.com/v0/b/lmsedu-e5dbc.appspot.com/o/files%2Fbf445950-853d-487f-9821-8db42b75118d?alt=media&token=4c1f18ac-edce-4dc7-98ef-5c94ec6335c6",{
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
