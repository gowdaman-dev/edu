import React from 'react'
import Request from '../components/Form'
import { webName } from '../components/globalDetails'
import Link from 'next/link'
const page = () => {
  const content = {
    Header: `${webName} Edu Request Form`,

    Comment: "Tell us more about yourself and the purpose of using our product",
  
    input_1:'Your Work Email',

    input_2:'Subject Name',
  }
  return (
    <div className=" mt-16" >
      <p className="text-center px-10 pb-8 text-lg">
        Note: this form is designed for EDUCATORS only. If you are a STUDENT,
        please  <Link className="text-[--web-primary-color]" href={"recommend"}>
          recommend it to your school
        </Link> instead.

      </p>
      <Request content={content} />
      <div className='grid justify-center'>
      <div className=" w-80 md:w-[600px] py-10">
        <h2 className="md:-ml-8 -ml-4  font-bold ">Instructions: </h2>
        <div className=" py-5 leading-6">
          <p className='pb-3 text-justify'>
            1. Only school personnel (not students) may register for an EDU
            account, such as teachers or school administrators
          </p>
          <p className='pb-3 text-justify'>
            2. Once a School is set up under your account, you as the account
            owner can create Classes and add Students & Teachers. Users set as
            "Teachers" have admin access to invite or delete other members.
          </p>
          <p className='pb-3 text-justify'>
            3. Under a free EDU account, all invited users also have free user
            limitations.
          </p>
          <p className='pb-3 text-justify'>
            4. If you are a student, you can <Link href={'recommend'} className='text-[--web-primary-color]'>request that your school</Link>  open an
            account with us.
          </p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default page
