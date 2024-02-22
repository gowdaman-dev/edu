"use client"
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/ContextUser";
import { useParams } from 'next/navigation'

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import LoaderPage from "../loader/LoadingPage";
import axios from "axios";
import { getDownloadURL, ref } from "firebase/storage";
import { db } from "@/firebase/firebase";
const PdfViewer = () => {
  const params = useParams()
  const [buffer, setBuffer] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  
  useEffect(() => {
    async function fetchBytes() {
      const reference = ref(db, `files/${params.fileid}`)
      const URL = await getDownloadURL(reference);
      try {
        const data1 = await axios.get(URL, { responseType: "arraybuffer" })
        const dataArray = new Uint8Array(data1.data)
        console.log(dataArray);
        setBuffer(dataArray);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchBytes();
  }, []);


  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  console.log(loading);
  return (
    <>
      {loading && <LoaderPage />}
      {buffer && (

        <div className="h-screen w-screen scrollbar-hide " >
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer className="scrollbar-hide "  fileUrl={buffer} enableSmoothScroll/>
          </Worker>
        </div>
      )}

    </>
  );
};

export default PdfViewer;
