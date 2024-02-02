import React, { useEffect, useRef, useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { motion } from 'framer-motion'
const grades = [
    {
        label: 'grade 1',
        value: 1,
    },
    {
        label: 'grade 2',
        value: 2,
    },
    {
        label: 'grade 3',
        value: 3,
    },
    {
        label: 'grade 4',
        value: 4,
    },
    {
        label: 'grade 5',
        value: 5,
    },
    {
        label: 'grade 6',
        value: 6,
    },
    {
        label: 'grade 7',
        value: 7,
    },
    {
        label: 'grade 8',
        value: 8,
    },
    {
        label: 'grade 9',
        value: 9,
    },
    {
        label: 'grade 10',
        value: 10,
    },
    {
        label: 'grade 11',
        value: 11,
    },
    {
        label: 'grade 12',
        value: 12,
    },
]
function ManualAdder({ close }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [standard, setStandard] = useState('')
    const [role, setRole] = useState('')
    const [error, setError] = useState('')
    const password = 'Test@1234'
    const inner = useRef()
    const SignUpHandler = async (e) => {
        e.preventDefault()
        try {
            const resexist = await fetch('/api/userExists', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ email })
            })
            const { user } = await resexist.json()
            if (user !== null) {
                setError('Account Already exist')
                return
            }
        } catch (error) {
            console.log(error);
        }
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ name, email, password, standard, role })
            })
            if (res.ok) {
                const form = await e.form();
                form.reset();
                close(false)
                return
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        let handler = (e) => {
            try {
                if (!inner.current.contains(e.target)) {
                    close(false)
                }
            } catch (error) {

            }
        }
        window.addEventListener('mousedown', handler)
    })
    return (
        <motion.div initial={{ opacity: .4 }} animate={{ opacity: 1 }} transition={{ type: 's pring', duration: .5 }} exit={{ opacity: 0 }} className='fixed top-0 left-0 h-full w-full bg-gray-600/[.6] grid place-items-center'>
            <div className="absolute top-0">
                {
                    error && (
                        <motion.p initial={{ opacity: .5, y: '-40px' }} animate={{ opacity: 1, y: '0px' }} transition={{ type: 'spring', duration: .5 }} className='text-red-400 bg-white px-4 py-2 border-b rounded-lg border-red-500'>{error}</motion.p>
                    )
                }
            </div>
            <motion.div initial={{ scale: .7, opacity: .4 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', duration: .5 }} exit={{ scale: .7, opacity: 0 }} ref={inner} className="md:w-1/2 h-fit overflow-y-scroll bg-white rounded-lg flex flex-col p-2 py-4">
                <IoIosCloseCircleOutline className='text-2xl' onClick={() => close(false)} />
                <h1 className='text-center text-xl text-gray-700 font-medium py-2'>Add User Manually</h1>
                <form onSubmit={SignUpHandler} action="" className='px-5 flex flex-col gap-4' method="post">
                    <div className="flex justify-between gap-4 items-center w-full ">
                        <label className='text-xl' htmlFor="name">Name</label>
                        <input onChange={(e) => { setName(e.target.value) }} className='w-[80%] text-sm text-gray-700 outline-none bg-gray-200 p-2 rounded-lg' type="text" required placeholder='name' id='name' />
                    </div>
                    <div className="flex justify-between gap-4 items-center w-full ">
                        <label className='text-xl' htmlFor="email">Email</label>
                        <input onChange={(e) => { setEmail(e.target.value) }} className='w-[80%] text-sm text-gray-700 outline-none bg-gray-200 p-2 rounded-lg' type="email" required placeholder='Email' id='email' />
                    </div>

                    <div className="flex justify-between gap-4 items-center w-full ">
                        <label className='text-xl' htmlFor="standard">Standard</label>
                        <select onChange={(e) => { setStandard(e.target.value) }} className='w-[80%] rounded-lg text-gray-700 p-2' name="standard" required id="standard">
                            {
                                grades.map((grade) => {
                                    return <option key={grade.value} value={grade.value}>{grade.label}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="flex justify-between gap-4 items-center w-full ">
                        <label className='text-xl' htmlFor="role">Role</label>
                        <select onChange={(e) => { setRole(e.target.value) }} className='w-[80%] rounded-lg text-gray-700 p-2' required name="role" id="role">
                            <option value="" >none</option>
                            <option value="teacher" >Teacher</option>
                            <option value="student" >Student</option>
                        </select>
                    </div>
                    <button type='submit' className='w-full mt-2 py-2 bg-[--web-primary-color] rounded-lg text-white tracking-wide'>Add user</button>
                    <p className='text-[12px] font-light text-gray-700'>Note: By Default the password is set to "Test@1234"</p>
                </form>
            </motion.div>
        </motion.div>
    )
}

export default ManualAdder