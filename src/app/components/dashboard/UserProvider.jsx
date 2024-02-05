'use client'
import React, { useContext, useEffect, useState } from 'react'
import Fetched from './MemberList'
import { UserContext } from '@/ContextUser'
import DataTable, { createTheme } from 'react-data-table-component';
import { json2csv } from 'json-2-csv';
function UserProvider({ }) {
    const { fetchrole, count, setExporter, exporter } = useContext(UserContext)
    const [membersdata, setMemberdata] = useState([])
    const [pulse, setPulse] = useState(false)
    useEffect(() => {
        setPulse(true)
        Fetched()
            .then((res) => {
                if (res) {
                    const finaldata = res.filter((data) => {
                        return fetchrole == '' ? data : data.row.includes(fetchrole)
                    })
                    setMemberdata(finaldata);
                    setPulse(false)
                }
            }).catch((err) => {
                console.log(err);
            })
    }, [count])
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
                width:'100%'
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
                width:'100%'
            },
        },
        cells: {
            style: {
                padding:'8px',
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
            const exported = json2csv(filterText ? filterText : membersdata)
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
            const studentdata = membersdata.filter((data) => data.role.includes('student'))
            setFilterText(studentdata)
        }
        if (fetchrole == 'teacher') {
            const teacherdata = membersdata.filter((data) => data.role.includes('teacher'))
            setFilterText(teacherdata)
        }
    }, [fetchrole])
    useEffect(() => {
        if (fetchrole == '') {
            setFilterText(membersdata)
        }
    })
    const hoverstyle = {
        rows: {
            style: {
                background: 'red'
            }
        },
    }
    return (
        <div className='md:w-full w-screen overflow-x-scroll'>
            {
                (pulse && !filterText) ? <Pulsecomponent /> :
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

                    />
            }
        </div>
    )
}

export default UserProvider


const Pulsecomponent = () => {
    return (
        <div className="w-full py-2 px-2 animate-pulse flex flex-col gap-4">
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