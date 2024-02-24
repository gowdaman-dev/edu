"use client"
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import { useEffect, useState, useRef ,useCallback} from "react";
import { useParams } from 'next/navigation'
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import axios from "axios";
import { getDownloadURL, ref } from "firebase/storage";
import { db } from "@/firebase/firebase";
import ProgressComp from "../library/ProgressComponent";
const PdfViewer = () => {
  const params = useParams()
  const [buffer, setBuffer] = useState([]);
  const viewerRef = useRef(null);
  const [progress, setProgress] = useState(0)
  const [progVisible, setProgVisible] = useState(false)

  //plugins 
  const zoomPluginInstance = zoomPlugin();



  //player
  const [isPlay, setIsPlay] = useState(false)


  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
  const [render, setRender] = useState(false)


  const updateProgress = (progressEvent) => {
    let progressChange = Math.floor((progressEvent.loaded / progressEvent.total) * 100);

      setProgress((prev)=>{
        if(prev<progressChange){
          return progressChange
        }
         return prev;
      });
  }
  useEffect(() => {
    setProgVisible(true)
    const randomParam = Math.random().toString().slice(2);
    async function fetchBytes() {
      const reference = ref(db, `files/${params.fileid}`)
      const URL = await getDownloadURL(reference);
      //to clear cache for prevent page reload after pdf set
      const URLWithParam = `${URL}?r=${randomParam}`;

      try {
        const data1 = await axios.get(URLWithParam, {
          responseType: "arraybuffer", onDownloadProgress: updateProgress,
        })
        const dataArray = new Uint8Array(data1.data)


        setBuffer(dataArray);
        setProgress(0)
        setProgVisible(false)
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchBytes();
  }, []);

  useEffect(() => {
    const dataPresent = viewerRef.current
    if (dataPresent.querySelector(".rpv-core__inner-pages--vertical")) {

      const mainClass = dataPresent.querySelector(".rpv-core__inner-pages--vertical")
      dataPresent.querySelector(".rpv-core__viewer").style.width = "100vw"
      //hide side bar 
      mainClass.classList.add('scrollbar-hide')
      const updatingPages = mainClass.children[0]


    }

  }, [render]);
  const handleDocumentLoad = () => {
    setRender(!render)
  };






  return (
    <>
      <section className='absolute flex flex-col items-center w-screen z-[1] '>

        {progVisible && (
          <ProgressComp progressChange={progress} click={setProgVisible} title={"Downloading :"} icon={"download"} />
        )}
      </section>
      {!progVisible && (

        <div ref={viewerRef} className="h-screen w-screen scrollbar-hide font-mono text-2xl" >
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <div
              className="rpv-core__viewer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  backgroundColor: '#eeeeee',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '4px',
                }}
              >
                <ZoomOutButton />
                <ZoomPopover />
                <ZoomInButton />
              </div>
              <div
                style={{
                  flex: 1,
                  overflow: 'hidden',
                }}
              >
                <Viewer plugins={[zoomPluginInstance]} fileUrl={buffer} enableSmoothScroll onDocumentLoad={handleDocumentLoad} defaultScale={SpecialZoomLevel.PageWidth} />
              </div>
            </div>
          </Worker>
        </div>
      )}

    </>
  );
};

export default PdfViewer;
/* const handlePageChange = (e) => {
  const currentPage=e.currentPage
  if(viewerRef.current.querySelector(".rpv-core__inner-pages--vertical")){
    const data=viewerRef.current.querySelector(".rpv-core__inner-pages--vertical").children[0].lastChild.textContent  ? viewerRef.current.querySelector(".rpv-core__inner-pages--vertical").children[0].children[currentPage].textContent : viewerRef.current.querySelector(".rpv-core__inner-pages--vertical").children[0].lastChild.textContent 

    const cleanText = data.replace(/\f|\b[0-9a-fA-F]{2}\b/g, '') 

    console.log(data);
    console.log(currentPage);
  }

} */