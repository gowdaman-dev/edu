"use client"
import { Viewer, Worker,createTheme } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useState, useRef } from "react";
import { useParams } from 'next/navigation'
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import LoaderPage from "../loader/LoadingPage";
import axios from "axios";
import { getDownloadURL, ref } from "firebase/storage";
import { db } from "@/firebase/firebase";
const PdfViewer = () => {
  const params = useParams()
  const [buffer, setBuffer] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const viewerRef = useRef(null);

  useEffect(() => {
    async function fetchBytes() {
      const reference = ref(db, `files/${params.fileid}`)
      const URL = await getDownloadURL(reference);
      try {
        const data1 = await axios.get(URL, { responseType: "arraybuffer" })
        const dataArray = new Uint8Array(data1.data)
        setBuffer(dataArray);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchBytes();
  }, []);

  useEffect(() => {
 let interval=   setInterval(()=>{
const dataPresent= viewerRef.current
if(dataPresent.querySelector(".rpv-core__inner-pages--vertical")){

 const mainClass= dataPresent.querySelector(".rpv-core__inner-pages--vertical")
//hide side bar 
mainClass.classList.add('scrollbar-hide')
const updatingPages=mainClass.children[0]



  clearInterval(interval)
}
  },1000)
return ()=>clearInterval(interval)
  
  });
  return (
    <>
      {loading && <LoaderPage />}
      {buffer && (

        <div ref={viewerRef} className="h-screen w-screen scrollbar-hide font-mono text-2xl" >
          <Worker  workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={buffer} enableSmoothScroll />
          </Worker>
        </div>
      )}

    </>
  );
};

export default PdfViewer;
