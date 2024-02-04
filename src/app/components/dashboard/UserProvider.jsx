'use client'
import React, { useContext, useEffect, useState } from 'react'
import Fetched from './MemberList'
import { UserContext } from '@/ContextUser'
import DataTable, { createTheme } from 'react-data-table-component';
function UserProvider({ }) {
    const { fetchrole } = useContext(UserContext)
    const [membersdata, setMemberdata] = useState([])
    const [pulse, setPulse] = useState(false)
    useEffect(() => {
        setPulse(true)
        setMemberdata([])
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
    }, [fetchrole])
    createTheme('edulearntable', {
        text: {
            primary: '#000000',
            secondary: 'gray',
        },
        background: {
            default: 'var(--web-container)',
        },
        context: {
            background: 'red',
            text: '#FFFFFF',
        },
        divider: {
            default: '#6c757d27',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    }, 'dark');
    const customStyles = {
        rows: {
            style: {
                border: 'none',
                shadow: 'none',
                background: 'var(--web-container)',
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                background: 'var(--web-container)',
                fontWeight: 400,
                color: "#6c757d",
                fontSize: "1.1rem"
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
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
            sortable: true,
        },
        {
            name: 'role',
            selector: row => row.role,
        },
    ];
    const [filterText, setFilterText] = React.useState('');
    useEffect(()=>{
        const filteredItems = membersdata.filter(
            (item) =>item.role && item.role.includes(fetchrole)
        );
        setFilterText(filteredItems)
    })
    return (
        <div className='w-full'>
            {
                membersdata && (
                    <DataTable columns={columns} data={filterText} direction="auto"
                        fixedHeaderScrollHeight="100%"
                        pagination
                        responsive
                        subHeaderAlign="right"
                        subHeaderWrap
                        customStyles={customStyles}
                        theme='edulearntable'
                        paginationResetDefaultPage={true}
                    />
                )
            }
        </div>
    )
}

export default UserProvider


const Pulsecomponent = () => {
    return (
        <tr className="w-full py-2 px-2 animate-pulse">
            <td className='px-4 py-2 h-fit'>
                <div className="w-1/2 py-2 bg-black/[.4] rounded-full"></div>
            </td>
            <td className='px-4 py-2 h-fit'>
                <div className="w-1/2 py-2 bg-black/[.4] rounded-full"></div>
            </td>
            <td className='px-4 py-2 h-fit'>
                <div className="w-1/2 py-2 bg-black/[.4] rounded-full"></div>
            </td>
            <td className='px-4 py-2 h-fit'>
                <div className="w-1/2 py-2 bg-black/[.4] rounded-full"></div>
            </td>
        </tr>
    )
}
// <table className='w-full '>
//     <thead className='border-b py-2 border-gray-200/[.5]'>
//         <tr className='py-2'>
//             <td className='py-2 px-4'>Name</td>
//             <td className='py-2 px-4'>Email</td>
//             <td className='py-2 px-4'>Standard</td>
//             <td className='py-2 px-4'>Role</td>
//         </tr>
//     </thead>
//     <tbody className='min-h-[50vh] overflow-scroll bg-red-300 py-2'>
//         {
//             pulse?Array(6).fill(0).map((d , i)=>{
//                 return <Pulsecomponent key={i}/>
//             }):''
//         }
//         {
//             membersdata.filter((data) => {
//                 return fetchrole == '' ? data : data.role.includes(fetchrole)
//             }).map((data) => {
//                 return <tr key={data.email} className={`border-b bg-white/[.2]`}>
//                     <td className="px-4 text-md font-light">{data.name}</td>
//                     <td className="px-4 text-md font-light">{data.email}</td>
//                     <td className="px-4 text-md font-light">{data.standard}</td>
//                     <td className="px-4 text-md font-light">{data.role}</td>
//                 </tr>
//             })
//         }
//     </tbody>
// </table>