import Navbar from '../components/readercomp/Navbar'
import HeadBar from '../components/readercomp/HeadBar'
import Main  from '../components/readercomp/Main'

function Page () {
 
  return (
    <div className='h-screen'>
      <header className='h-[60px] border-b-[1px] border-[#008C8C] '>
        <HeadBar />
      </header>
        <main className='flex justify-center h-[90%] '>
      <Main/>
        </main>
    </div>
  )
}


export default Page