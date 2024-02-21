"use server"
import axios from 'axios';

export default function PdfFetch(url) {
    return axios.get(url, {
        responseType: 'arraybuffer'
    })
    .then(response => {
        const data = new Uint8Array(response.data);
        return data;
    })
    .catch(error => {
        console.log(error.message);
        return { error: "on getting buffer problem" };
    });
}
