import React from 'react'
import { TbRefresh } from "react-icons/tb";
import Link from 'next/link';

function Acountinformation() {
    return (
        < div className='flex justify-center h-[100vh]  bg-slate-200 p-10 '>
            <div className='h-[100%] w-[90%] bg-white p-4 relative rounded-sm shadow-xl shadow-slate-800/20 '>
                <div className='flex h-[5%] w-full justify-between align-middle  border-b-2 '>
                    <h1 className='text-lg font-semibold'>
                        Acount Information
                    </h1>
                    <TbRefresh size={20} className='cursor-pointer' />
                </div>
                <div className='h-[20%] flex p-3  border-b-2 '>
                    <h1 className='text-lg font-medium'>
                        Email :
                    </h1>
                    {/* <span>
                        //enter Curront Email of user
                    </span> */}
                    <button className='ml-[10%] text-teal-700'>
                        Change Password
                    </button>
                </div>
                <div className='h-[20%] flex p-3   '>
                    <div className='flex w-[20%] h-[20%]  justify-between items-center min-w-[300px] '>

                        <h1 className='text-lg font-medium'>
                            Licence :
                        </h1>
                        <h3>
                            Free Edu Group plan
                        </h3>
                    </div>

                </div>
                <footer className=' h-[6%] justify-end p-3  flex w-[100%] right-0 bottom-0 border-t-2 border-b-slate-900 absolute '>
                    <Link href={"/"} className=''>
                    <h3 className='text-teal-700 font-normal  '>
                        Cancel
                    </h3>
                    </Link>
                    
                </footer>

            </div>
        </div>

    )
}

export default Acountinformation