import React from 'react'
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
    {
        label: 'Teacher',
        value: 'teacher',
    },
]
function ManualAdder() {
    return (
        <div className='fixed top-0 left-0 h-full w-full bg-gray-600/[.6] grid place-items-center'>
            <div className="md:w-1/2 h-[500px] overflow-y-scroll bg-white rounded-lg flex flex-col p-2">
                <h1 className='text-center text-xl text-gray-700 font-medium py-2'>Add User Manually</h1>
                <form action="" method="post">
                    <div className="flex gap-2 ">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder='name' id='name' />
                    </div>
                    <div className="flex gap-2 ">
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder='Email' id='email' />
                    </div>

                    <div className="flex gap-2 ">
                        <label htmlFor="standard">Standard</label>
                        <select name="standard" id="standard">
                            {
                                grades.map((grade) => {
                                    return <option key={grade.value} value={grade.value}>{grade.label}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="flex gap-2 ">
                        <label htmlFor="role">Role</label>
                        <select name="role" id="role">
                            <option value="" >none</option>
                            <option value="teacher" >Teacher</option>
                            <option value="student" >Student</option>
                        </select>
                    </div>
                    <div className="flex gap-2 ">
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder='Email' id='email' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ManualAdder