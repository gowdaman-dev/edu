"use server"
import { db } from '@/firebase/firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import axios from 'axios'
async function Main3() {
    try {

        const pathReference = ref(db, `files/1a643660-8a4e-479d-a4b2-db84c6cc175d`)
        const URL = await getDownloadURL(pathReference)
        const bytes = await axios.get(URL)
        return bytes.data

    } catch (error) {
        console.log(error.message);

    }
    return (
        { error: "on getting buffer problem" }
    )
}
export default Main3