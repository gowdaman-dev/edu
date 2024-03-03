import { ref, getDownloadURL } from "firebase/storage";
import { db } from "@/firebase/firebase";

function Audio(params) {
    const audioRefDb = ref(db, `/audio/${params}`)
    getDownloadURL(audioRefDb).then((data) => {
        console.log(data);
        return data
    })
}

export default Audio