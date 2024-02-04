import { PiUsersLight } from "react-icons/pi";
import { VscLibrary } from "react-icons/vsc";
import { IoSchoolOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
export const grades = [
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

export const adminnavlinks = [
    {
        label:"Member List",
        path:'/dashboard',
        icon:<PiUsersLight className='text-xl' />
    },
    {
        label:"Sharded Library",
        path:'/dashboard/library',
        icon:<VscLibrary  className='text-xl'/>
    },
    {
        label:"School Information",
        path:'',
        icon:<IoSchoolOutline className='text-xl'/>
    },
    {
        label:"Account Information",
        path:'',
        icon: <MdOutlineManageAccounts className='text-xl'/>
    },
]