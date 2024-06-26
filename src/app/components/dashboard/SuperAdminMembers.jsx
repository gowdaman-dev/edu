'use client'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { UserContext } from '@/ContextUser'
import DataTable, { createTheme } from 'react-data-table-component';
import { json2csv } from 'json-2-csv';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineCloseCircle, AiOutlineDown, AiOutlineDownload, AiOutlineReload, AiOutlineUp } from 'react-icons/ai';
function SuperAdminMember() {
  const {
    navSearch,
    count,
    setCount,
    setExporter,
    exporter,
    userDetailpopup,
    setUserDetailpopup,
  } = useContext(UserContext)
  const [pulse, setPulse] = useState(false)
  const fetcher = async () => {
    const userdata = await fetch('/api/memberlistsuperadmin', {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ reqfrom: "superadmin" }),
      cache: 'no-store', next: { revalidate: 0 }
    })
    const responce = await userdata.json()
    return responce
  }
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
      name: 'school',
      selector: row => row.school,
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
      setExporter("false")
    }
  }, [exporter])
  const hoverstyle = {
    rows: {
      style: {
        background: 'red'
      }
    },
  }
  const [selectedrecord, setSelectedRecord] = useState({})
  const [usereditable, setUsereditable] = useState(false)
  const RowMenu = async (e) => {
    try {
      await setUserDetailpopup(true)
      setSelectedRecord({ id: e._id, name: e.name, email: e.email, school: e.school, role: e.role, standard: e?.standard });
    } catch (error) {

    }
  }
  const [updatinguser, setupdatinguser] = useState(false)
  const [deleteuser, setdeleteuser] = useState(false)
  const [status, setStatus] = useState(false)
  const UpdateUserEvent = async (e) => {
    setupdatinguser(true);
    e.preventDefault();
    const formdata = new FormData(e.target)
    formdata.append('id', selectedrecord.id)
    formdata.append('oldschool', selectedrecord.school)
    formdata.append('role', selectedrecord.role)
    setStatus(true)
    const res = await fetch('/api/register', {
      method: 'PUT',
      body: formdata
    })
    if (res.ok) {
      setUsereditable(false)
      setUserDetailpopup(false)
      setupdatinguser(false)
      setStatus(false)
      setCount(count + 1)
    }

  }
  const RemoveUserEvent = async (e) => {
    e.preventDefault();
    setUserDetailpopup(false)
    setdeleteuser(true)
  }
  const RemoveUserconformed = async () => {
    setStatus(true)
    const remover = await fetch('/api/superadmin/remover', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ role: selectedrecord.role, school: selectedrecord.school, id: selectedrecord.id })
    }).then((data) => {
      if (data.ok) {
        setdeleteuser(false)
        setStatus(false)
        setCount(count + 1)

      }
    })
  }

  const [schoolfilterdata, setSchoolFilterData] = useState({})
  const [memberdata, setMemberdata] = useState();
  useEffect(() => {
    setMemberdata(undefined)
    setPulse(true)
    fetcher().then((data) => {
      setMemberdata(data)
      setPulse(false)
    })
  }, [count])

  const [schoolfilter, setSchoolFilter] = useState('')
  const [schoolfiltertoggle, setSchoolFilterToggle] = useState(false)
  const [roleFilter, setroleFilter] = useState('')
  const [roleFilterToggle, setRoleFilterToggle] = useState(false)
  const [filterdata, setFilterdata] = useState(memberdata)
  const roleFilterRef = useRef(null);
  const schoolFilterRef = useRef(null);

  useEffect(() => {
    const handleClose = (e) => {
      if (e.target != schoolFilterRef.current) {
        setSchoolFilterToggle(false);
      }
      if (e.target != roleFilterRef.current) {
        setRoleFilterToggle(false);
      }
    }

    window.addEventListener('click', handleClose)

  }, [])

  const rolejson = ['admin', 'teacher', 'student']
  useEffect(() => {
    fetch('/api/schoolList', {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json'
      },
      cache: 'no-store', next: { revalidate: 0 }
    }).then((data) => data.json()).then((values) => setSchoolFilterData(values)).catch((err) => { })
  }, [schoolfilter, schoolfiltertoggle])
  useEffect(() => {
    let filter = async () => {
      try {
        if (!navSearch && !roleFilter && !schoolfilter) {
          setFilterdata(memberdata)
        }
        if (schoolfilter) {
          const sckfilter = memberdata.filter((item) => item.school.toLowerCase().includes(schoolfilter.toLowerCase()))
          setFilterdata(sckfilter)
        }
        if (roleFilter) {
          const rlfilter = memberdata.filter((item) => item.role.toLowerCase().includes(roleFilter.toLowerCase()))
          setFilterdata(rlfilter)
        }
        if (navSearch) {
          const nvfilter = memberdata.filter((item) => item.name.toLowerCase().includes(navSearch.toLowerCase()))
          setFilterdata(nvfilter)
        }
      } catch (error) {
      }
    }
    filter()
  }, [navSearch, roleFilter, schoolfilter, schoolfiltertoggle])

  const [inSchoolName, setInSchoolName] = useState([]);



  useEffect(() => {
    fetch("/api/schoolList", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setInSchoolName(data));
  }, []);

  const [outSchoolName, setOutSchoolName] = useState('')
  const [isSchoolOpen, setIsSchoolOpen] = useState(false);
  const [isNotValid, setIsNotValid] = useState(false);
  const [check, setCheck] = useState('')


  useEffect(() => {
    const validate = () => {
      const optionExist = inSchoolName.find(
        (item) => (
          item.schoolname?.toLowerCase() == outSchoolName.toLowerCase().trim()
        ));
      optionExist || outSchoolName == ""
        ? setIsNotValid(false)
        : setIsNotValid(true);
    };
    validate();


  }, [check]);



  const toggleSchool = () => {
    setIsSchoolOpen(true);

  };

  const handleChangeSchool = (e) => {
    const value = e.target.value;
    setIsSchoolOpen(true)
    setOutSchoolName(value)
  };

  const handleBlurSchool = (e) => {
    const value = e.target.value;
    setIsSchoolOpen(false)
    setOutSchoolName(value);
    (selectedrecord.role !== "admin") ? setCheck(value) : null
  };

  const handleClickSchool = (value) => {
    setOutSchoolName(value)

    setIsNotValid(false);
    setIsSchoolOpen(false);
  };

  const handleFocusSchool = () => {
    setIsSchoolOpen(true);
  }
  const handleEdit = () => {
    setUsereditable(!usereditable)
    setOutSchoolName(selectedrecord.school)
  }
  return (
    <div className='md:w-full w-screen'>
      <AnimatePresence mode='wait'>
        {
          userDetailpopup && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: 'tween', duration: .5 }} className="top-0 left-0 fixed z-[9] h-screen w-screen bg-gray-500/[.5] backdrop-blur-sm grid place-items-center">
              <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ opacity: 20 }} transition={{ type: 'tween', duration: .3, delay: .2 }} className="flex flex-col bg-white md:w-[500px] w-[90%] rounded-lg p-4 border">
                <div className="flex justify-between py-2 border-b text-xl">
                  <button className="" onClick={() => { setUserDetailpopup(false); setUsereditable(false) }}><AiOutlineClose /></button>
                  <h1 className='text-center font-medium text-gray-800'>Account detail ({selectedrecord.role})</h1>
                  <button className="" onClick={handleEdit}><FaRegEdit /></button>
                </div>
                <form onSubmit={usereditable ? UpdateUserEvent : RemoveUserEvent} className='w-full flex flex-col gap-4 py-2 pt-4' action="" method="post">
                  <div className="flex w-full justify-between">
                    <label htmlFor="name">Name</label>
                    {
                      usereditable ?
                        <input type="text" placeholder='name' id='name' defaultValue={selectedrecord.name} name='name' className='bg-gray-200 rounded-lg px-2 py-1 w-[80%]' /> :
                        <p className='bg-gray-50 rounded-lg px-2 py-1 w-[80%]' > {selectedrecord.name} </p>
                    }
                  </div>
                  <div className="flex w-full justify-between">
                    <label htmlFor="email">Email</label>
                    {
                      usereditable ?
                        <input type="email" placeholder='email' id='email' defaultValue={selectedrecord.email} name="email" className='bg-gray-200 rounded-lg px-2 py-1 w-[80%]' /> :
                        <p className='bg-gray-50 rounded-lg px-2 py-1 w-[80%]' >{selectedrecord.email}</p>
                    }
                  </div>
                  <div className="flex w-full justify-between">
                    <label htmlFor="school">school</label>
                    {
                      usereditable ? (
                        <div className='w-[80%] relative'>
                          <input type="text" value={outSchoolName} placeholder='school' id='school' name='school' onClick={toggleSchool} onBlur={handleBlurSchool} onFocus={handleFocusSchool} onChange={handleChangeSchool} className='capitalize bg-gray-200 w-full  rounded-lg px-2 py-1' />
                          {(selectedrecord.role !== "admin" && inSchoolName.filter((data) => {
                            return outSchoolName === "" ? true : data.schoolname.toLowerCase().trim().includes(outSchoolName.toLowerCase().trim());
                          }).length > 0) &&


                            <AnimatePresence mode="wait">
                              {isSchoolOpen && (
                                <motion.div
                                  initial={{ y: 10, opacity: 0.6 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: 10, opacity: 0 }}
                                  transition={{ duration: 0.5, type: "spring" }}
                                  className="absolute shadow max-h-64 overflow-auto w-full mt-2 z-40 pl-2 py-2 px-2 rounded-lg grid gap-2 bg-white round"
                                >
                                  {" "}
                                  {inSchoolName
                                    // filter the data according to input
                                    .filter((data) => {
                                      return outSchoolName === ""
                                        ? true
                                        : data.schoolname.toLowerCase().trim().includes(outSchoolName?.toLowerCase().trim());
                                    })
                                    .map((option, index) => {
                                      return (
                                        <p
                                          className="capitalize cursor-pointer p-1 w-full rounded-lg hover:bg-gray-100"


                                          onClick={() => {
                                            handleClickSchool(option.schoolname);
                                          }}
                                          key={option.schoolname}
                                        >
                                          {" "}
                                          {option.schoolname}
                                        </p>
                                      );
                                    })}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          }
                          {
                            isNotValid && (
                              <p className="text-red-500 text-xs">
                                Invalid School Name
                              </p>
                            )
                          }

                        </div>
                      ) :
                        <p className='bg-gray-50 rounded-lg px-2 py-1 w-[80%]' > {selectedrecord.school} </p>
                    }
                  </div>
                  {
                    usereditable && (
                         <button type='submit' disabled={isNotValid} className='w-full p-2 bg-yellow-200 rounded-lg'>Update Account</button>
                    )
                  }
                  {
                    !usereditable && (
                      <button type='submit' className='w-full p-2 bg-red-200 rounded-lg'>Remove Account</button>
                    )
                  }
                </form>
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        {
          deleteuser && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: 'tween', duration: .5 }} className="top-0 left-0 fixed z-[9] h-screen w-screen bg-gray-500/[.5] backdrop-blur-sm grid place-items-center">
              <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ opacity: 20 }} transition={{ type: 'tween', duration: .3, delay: .2 }} className="flex flex-col bg-white md:w-[500px] w-[90%] rounded-lg p-4 border">
                <div className="flex justify-between py-2 border-b text-xl">
                  <h1 className='text-center font-medium text-gray-800'>Conformation({selectedrecord.role})</h1>
                  <button className='text-red-500 text-md' onClick={() => { setdeleteuser(false); setUserDetailpopup(true) }}>Cancel</button>
                </div>
                {
                  (selectedrecord.role == "admin") && (
                    <p className='font-light text-sm text-gray-700 py-2'>Warning removing account {selectedrecord.email} will terminate <strong>all users</strong>  belong to {selectedrecord.school} school. click conform to remove</p>
                  )
                }
                {
                  (selectedrecord.role == "teacher") && (
                    <p className='font-light text-sm text-gray-700 py-2'>Warning removing account {selectedrecord.email} will terminate <strong>user</strong> belong to {selectedrecord.school} school. click conform to remove</p>
                  )
                }
                {
                  (selectedrecord.role == "student") && (
                    <p className='font-light text-sm text-gray-700 py-2'>Warning removing account {selectedrecord.email} will terminate <strong>user</strong> belong to {selectedrecord.school} school. click conform to remove</p>
                  )
                }
                <button onClick={RemoveUserconformed} className='w-full p-2 text-white rounded-lg bg-red-400'>{status ? "Removing.." : "Conform"}</button>
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence>
      <div className="flex flex-col">
        <div className="w-full flex justify-between items-center py-2 px-2">
          <h1 className='text-xl text-gray-700 '>Accounts List</h1>
          <div className="flex items-center px-2 gap-4">
            <div className="flex items-center justify-center">
              <div className="relative flex flex-col justify-right">
                {
                  !schoolfilter && (
                    <button
                      onClick={() => setSchoolFilterToggle(!schoolfiltertoggle)}
                      ref={schoolFilterRef}
                      className='bg-white text-gray-800 p-2 rounded-lg border flex items-center md:text-md text-sm gap-2'
                    >All School {schoolfiltertoggle ? <AiOutlineUp /> : <AiOutlineDown />}
                    </button>
                  )
                }
                {
                  schoolfilter && (
                    <button
                      className='relative bg-white max-w-[100px] pr-8 text-ellipsis text-gray-800 p-2 rounded-lg border flex items-center md:text-md text-sm gap-2'
                      onClick={() => { setSchoolFilterToggle(false); setSchoolFilter('') }}
                    >
                      <p className='whitespace-nowrap w-fit truncate'>{schoolfilter}</p><AiOutlineCloseCircle className='absolute bg-white text-[30px] p-2 right-0' />
                    </button>
                  )
                }
                {
                  schoolfiltertoggle && (
                    <div className="absolute right-0 top-full z-[8] mt-2 min-w-[180px] flex flex-col px-2 py-2 bg-white rounded-lg border">
                      {
                        schoolfilterdata.map((item) => {
                          return <button key={item._id} onClick={() => { setSchoolFilter(item.schoolname); setSchoolFilterToggle(false); }} className='text-sm text-gray-800 rounded-lg py-1 px-2 text-left px-2 hover:bg-gray-100'>{item.schoolname}</button>
                        })
                      }
                    </div>
                  )
                }
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative flex flex-col justify-right">
                {
                  !roleFilter && (
                    <button
                      onClick={() => setRoleFilterToggle(!roleFilterToggle)}
                      ref={roleFilterRef}
                      className='bg-white text-gray-800 p-2 rounded-lg border flex items-center md:text-md text-sm gap-2'
                    >All Roles {roleFilterToggle ? <AiOutlineUp /> : <AiOutlineDown />}
                    </button>
                  )
                }
                {
                  roleFilter && (
                    <button
                      className='bg-white text-gray-800 p-2 rounded-lg border flex items-center md:text-md text-sm gap-2'
                      onClick={() => { setRoleFilterToggle(false); setroleFilter('') }}
                    >
                      {roleFilter}<AiOutlineCloseCircle />
                    </button>
                  )
                }
                {
                  roleFilterToggle && (
                    <div className="absolute right-0 top-full z-[8] mt-2 min-w-[180px] flex flex-col px-2 py-2 bg-white rounded-lg border">
                      {
                        rolejson.map((item, i) => {
                          return <button key={i} onClick={() => { setroleFilter(item); setRoleFilterToggle(false) }} className='text-sm text-gray-800 rounded-lg py-1 px-2 text-left px-2 hover:bg-gray-100'>{item}</button>
                        })
                      }
                    </div>
                  )
                }
              </div>
            </div>
            <div className="grid place-items-center p-2 hover:bg-gray-100 rounded-lg border">
              <AiOutlineReload className='text-xl text-gray-800' onClick={() => setCount(count + 1)} />
            </div>
          </div>
        </div>
      </div>
      {
        (pulse) ? <Pulsecomponent /> :
          <DataTable columns={columns} data={filterdata ? filterdata : memberdata} direction="auto"
            fixedHeaderScrollHeight="100%"
            pagination
            responsive
            subHeaderAlign="right"
            subHeaderWrap
            customStyles={customStyles}
            theme='edulearntable'
            paginationResetDefaultPage={true}
            highlightOnHover={hoverstyle}
            onRowClicked={RowMenu}
          />
      }
    </div>
  )
}

export default SuperAdminMember


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