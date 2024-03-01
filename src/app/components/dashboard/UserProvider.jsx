'use client'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/ContextUser'
import DataTable, { createTheme } from 'react-data-table-component';
import { json2csv } from 'json-2-csv';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { grades } from '../navigator/Navjson';
import { FaSlideshare } from 'react-icons/fa6';

const datalist = async ({ standard, school, role }) => {
    try {
        const res = await fetch('/api/memberlist', {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ standard, school, role }),
            cache: 'no-store', next: { revalidate: 0 }
        })
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error);
    }
}

function UserProvider() {
    const { navSearch, fetchrole, count, setCount, setExporter, exporter, navGrade } = useContext(UserContext)
    const [pulse, setPulse] = useState(false)
    const { data: session } = useSession()
    const [memberdata, setMemberdata] = useState()
    useEffect(() => {
        setMemberdata(undefined)
        setPulse(true)
        datalist({ standard: navGrade, school: session?.user?.school, role: session?.user?.role }).then((data) => {
            setMemberdata(data)
            setPulse(false)
            console.log(data);
        })
        //console.log(datalist);
    }, [count, navGrade])
    createTheme('edulearntable', {
        text: {
            primary: '#000000',
            secondary: 'gray',
        },
        background: {
            default: 'var(--web-container)',
            hover: 'blue'
        },
        context: {
            background: 'red',
            text: '#FFFFFF',
        },
        divider: {
            default: '#6c757d27',
        },
        action: {
            button: 'red',
            hover: 'red',
            disabled: 'rgba(0,0,0,.12)',
        },
    }, 'light');
    const customStyles = {
        rows: {
            style: {
                border: 'none',
                shadow: 'none',
                background: 'var(--web-container)',
                width: '100%'
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                background: 'var(--web-container)',
                fontWeight: 400,
                color: "#6c757d",
                fontSize: "1rem",
                width: '100%'
            },
        },
        cells: {
            style: {
                padding: '8px',
            },
        },
    };
    const columns = [
        {
            name: 'name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'email',
            selector: row => row.email,
        },
        {
            name: 'standard',
            selector: row => row.standard,
        },
        {
            name: 'role',
            selector: row => row.role,
            sortable: true,
        },
    ];
    const [filterText, setFilterText] = React.useState('');
    useEffect(() => {
        if (exporter == "export") {
            const exported = json2csv(filterText ? filterText : memberdata)
            let csvContent = "data:text/csv;charset=utf-8," + exported
            var encodedUri = encodeURI(csvContent);
            const handleDownload = () => {
                const link = document.createElement('a');
                link.download = 'member-list-export';
                link.href = encodedUri;
                link.click();
            };
            handleDownload()
            console.log(csvContent);
            setExporter("false")
        }
    }, [exporter])
    useEffect(() => {
        if (fetchrole == 'student') {
            const studentdata = memberdata.filter((data) => data.role.includes('student'))
            if (navSearch) {
                const Navsearch = studentdata.filter((data) => data.name.toLowerCase().includes(navSearch.toLowerCase()))
                setFilterText(Navsearch)
            }
            else {
                setFilterText(studentdata)
            }
        }
        if (fetchrole == 'teacher') {
            const teacherdata = memberdata.filter((data) => data.role.includes('teacher'))
            if (navSearch) {
                const Navsearch = teacherdata.filter((data) => data.name.toLowerCase().includes(navSearch.toLowerCase()))
                setFilterText(Navsearch)
            }
            else {
                setFilterText(teacherdata)
            }
        }
    }, [fetchrole, navSearch])
    useEffect(() => {
        if (fetchrole == '') {
            setFilterText(memberdata)
        }
        if (navSearch && !fetchrole) {
            const Searchdata = memberdata.filter((data) => data.name.toLowerCase().includes(navSearch.toLowerCase()))
            setFilterText(Searchdata)
        }
    })
    const hoverstyle = {
        rows: {
            style: {
                background: 'red'
            }
        },
    }
    const [detailpop, setDetailpop] = useState(false)
    const [dataeditable, setdataeditable] = useState(false)
    const [selecteddetailpop, setSelectedDetailpop] = useState({})
    const [removeConformer, setRemoveConformer] = useState(false)
    const RowSelected = async (e) => {
        try {
            await setSelectedDetailpop({ id: e._id, name: e.name, email: e.email, school: e.school, role: e.role, standard: e?.standard });
            await setDetailpop(true)
        } catch (error) {

        }
    }
    const userremoveConformer = (e) => {
        e.preventDefault();
        setRemoveConformer(true);
        setDetailpop(false)
    }
    const [removeanime, setRemoveanime] = useState(false)
    const removerbyadmin = async () => {
        await setRemoveanime(true)
        await fetch('/api/superadmin/remover', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: selecteddetailpop.role, school: selecteddetailpop.school, id: selecteddetailpop.id })
        }).then((data) => {
            if (data.ok) {
                setRemoveConformer(false)
                setRemoveanime(false)
                setCount(count + 1)
            }
        })
    }
    const updaterbyadmin = async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target)
        await formdata.append('id', selecteddetailpop.id)
        await formdata.append('grade', selecteddetailpop.standard)
        const res = await fetch('/api/adminupdater', {
            method: 'PUT',
            body: formdata
        })
        if (res.ok) {
            setdataeditable(false)
            setCount(count + 1)
            setDetailpop(false)
        }
    }
    return (
        <div className='md:w-full w-screen h-fit'>
            {
                detailpop && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: 'tween', duration: .5 }} className="top-0 left-0 fixed z-[9] h-screen w-screen bg-gray-500/[.5] backdrop-blur-sm grid place-items-center">
                        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ opacity: 20 }} transition={{ type: 'tween', duration: .3, delay: .2 }} className="flex flex-col bg-white md:w-[500px] w-[90%] rounded-lg p-4 border">
                            <div className="flex justify-between py-2 border-b text-xl">
                                <button className="" onClick={() => { setDetailpop(false); setdataeditable(false) }}><AiOutlineClose /></button>
                                <h1 className='text-center font-medium text-gray-800'>Account detail ({selecteddetailpop.role})</h1>
                                <button className="" onClick={() => setdataeditable(!dataeditable)}><FaRegEdit /></button>
                            </div>
                            <form onSubmit={dataeditable ? updaterbyadmin : userremoveConformer} className='w-full flex flex-col gap-4 py-2 pt-4' action="" method="post">
                                <div className="flex w-full justify-between items-center">
                                    <label htmlFor="name">Name</label>
                                    {
                                        dataeditable ?
                                            <input type="text" placeholder='name' id='name' name='name' className='bg-gray-200 rounded-lg px-2 py-1 w-[80%]' /> :
                                            <input type="text" placeholder='name' id='name' name='name' value={selecteddetailpop.name} disabled={!dataeditable} className='w-[80%] rounded-lg px-2 py-1 w-[80%]' />
                                    }
                                </div>
                                <div className="flex w-full justify-between items-center">
                                    <label htmlFor="email">Email</label>
                                    {
                                        dataeditable ?
                                            <input type="email" placeholder='email' id='email' name="email" className='bg-gray-200 rounded-lg px-2 py-1 w-[80%]' /> :
                                            <input type="eamil" placeholder='email' id='email' name="email" value={selecteddetailpop.email} disabled={!dataeditable} className='w-[80%] rounded-lg px-2 py-1 w-[80%]' />
                                    }
                                </div>
                                <div className="flex w-full justify-between items-center">
                                    <label htmlFor="school">Grade</label>
                                    {
                                        dataeditable ?
                                            <select className='w-[80%] rounded-lg px-2 py-1 w-[80%]' name="grade" id="grade">
                                                <option value="">update grade</option>
                                                {
                                                    grades.map((item, i) => {
                                                        return <option key={i} value={item.value}>{item.label}</option>
                                                    })
                                                }
                                            </select> :
                                            <p className='w-[80%] rounded-lg px-2 py-1 w-[80%]'>{selecteddetailpop.standard} grade</p>
                                    }
                                </div>
                                {
                                    dataeditable && (
                                        <button type='submit' className='w-full p-2 bg-yellow-200 rounded-lg'>Update Account</button>
                                    )
                                }
                                {
                                    !dataeditable && (
                                        <button type='submit' className='w-full p-2 bg-red-200 rounded-lg'>Remove Account</button>
                                    )
                                }
                            </form>
                        </motion.div>
                    </motion.div>
                )
            }
            {
                removeConformer && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: 'tween', duration: .5 }} className="top-0 left-0 fixed z-[9] h-screen w-screen bg-gray-500/[.5] backdrop-blur-sm grid place-items-center">
                        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ opacity: 20 }} transition={{ type: 'tween', duration: .3, delay: .2 }} className="flex flex-col bg-white md:w-[500px] w-[90%] rounded-lg p-4 border">
                            <div className="flex justify-between py-2 border-b text-xl">
                                <h1 className='text-center font-medium text-gray-800'>Conformation({selecteddetailpop.role})</h1>
                                <button className='text-red-500 text-md' onClick={() => { setRemoveConformer(false); setDetailpop(true) }}>Cancel</button>
                            </div>
                            {
                                (selecteddetailpop.role == "teacher") && (
                                    <p className='font-light text-sm text-gray-700 py-2'>Warning removing account <strong>{selecteddetailpop.email}</strong> will terminate <strong>user</strong> belong to {selecteddetailpop.school} school. click conform to remove</p>
                                )
                            }
                            {
                                (selecteddetailpop.role == "student") && (
                                    <p className='font-light text-sm text-gray-700 py-2'>Warning removing account <strong>{selecteddetailpop.email}</strong> will terminate <strong>user</strong> belong to {selecteddetailpop.school} school. click conform to remove</p>
                                )
                            }
                            <button onClick={removerbyadmin} className='w-full p-2 text-white rounded-lg bg-red-400' disabled={removeanime}>{removeanime ? 'deleting...' : 'Conform'}</button>
                        </motion.div>
                    </motion.div>
                )
            }
            {
                (pulse) ? <Pulsecomponent /> :
                    <DataTable columns={columns} data={filterText} direction="auto"
                        fixedHeaderScrollHeight="100%"
                        pagination
                        responsive
                        subHeaderAlign="right"
                        subHeaderWrap
                        customStyles={customStyles}
                        theme='edulearntable'
                        paginationResetDefaultPage={true}
                        highlightOnHover={hoverstyle}
                        onRowClicked={RowSelected}
                    />
            }
        </div>
    )
}

export default UserProvider


const Pulsecomponent = () => {
    return (
        <div className="md:w-full md:relative absolute left-0 w-screen py-2 px-2 animate-pulse flex flex-col gap-4">
            <div className="row px-2 py-5 bg-gray-200 w-full rounded-lg"></div>
            <div className="row px-2 py-5 bg-gray-200 w-full rounded-lg"></div>
            <div className="row px-2 py-5 bg-gray-200 w-full rounded-lg"></div>
            <div className="row px-2 py-5 bg-gray-200 w-full rounded-lg"></div>
            <div className="row px-2 py-5 bg-gray-200 w-full rounded-lg"></div>
            <div className="row px-2 py-5 bg-gray-200 w-full rounded-lg"></div>
            <div className="row px-2 py-5 bg-gray-200 w-full rounded-lg"></div>
            <div className="row px-2 py-5 bg-gray-200 w-full rounded-lg"></div>
            <div className="row px-2 py-5 bg-gray-200 w-full rounded-lg"></div>
        </div>
    )
}