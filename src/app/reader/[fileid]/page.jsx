
import PdfViewer from '@/app/components/readercomp/Renderpdf'
function Page () {
 
  return (
    <div className='h-screen    flex flex-col fixed z-[1]'>
      <PdfViewer/>
    </div>
  )
}


export default Page