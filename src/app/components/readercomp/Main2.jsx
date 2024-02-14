"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/firebase/firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import axios from 'axios'
import Main3 from './Main3'
function Main2() {
    const [buffer, setBuffer] = useState([])

    useEffect(() => {
        async function fetchBytes() {
            try {
                const data = await Main3();
                const utf8Bytes = new TextEncoder().encode(data);

                const uint8Array = new Blob(utf8Bytes);
                const arrayBuffer = await uint8Array.arrayBuffer();

                setBuffer(Buffer.from(arrayBuffer));


            } catch (error) {
                console.log(error.message);
            }
        }
        fetchBytes();
    }, []);
    const doenloadpdf = () => {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf');
        document.body.appendChild(link);
        link.click();
    }
    return (
        <div>
            <button onClick={doenloadpdf}>pdf download</button>
        </div>
    )
}

export default Main2