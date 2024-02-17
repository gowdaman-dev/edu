"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useState } from "react";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { PdfFetch } from "./Main3";
const PdfViewer = () => {
    const [buffer, setBuffer] = useState([])
    useEffect(() => {
        async function fetchBytes() {
            try {
                const data = await PdfFetch();
                console.log(data);
                await setBuffer(data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchBytes();
    },[]);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className="h-screen w-screen">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={buffer}
        />
      </Worker>
    </div>
  );
};
export default PdfViewer;