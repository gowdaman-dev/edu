"use client"
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/ContextUser";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import LoaderPage from "../loader/LoadingPage";

import { PdfFetch } from "@/utils/FetchBuffer";
const PdfViewer = () => {
  const { url } = useContext(UserContext);
  const [buffer, setBuffer] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    async function fetchBytes() {
      try {
        const data = await PdfFetch(url);
        console.log(url);
        setBuffer(data);
        setLoading(false); 
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchBytes();
  }, [url]);


  const defaultLayoutPluginInstance = defaultLayoutPlugin();
console.log(loading);
  return (
    <>
      {loading && <LoaderPage />}
      {buffer.length > 0 && (
        <div className="h-screen w-screen">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={buffer} />
          </Worker>
        </div>
      )}
     
    </>
  );
};

export default PdfViewer;
