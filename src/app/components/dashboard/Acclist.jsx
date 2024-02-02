import React from 'react'

const members = async () => {
    try {
        const req = await fetch('/api/memberlist')
        if (req.ok) {
            const { datalist } = await req.json();
            console.log(datalist);
            return datalist
        }
    } catch (error) {
        return new Error('err', error)
    }
}

async function Acclist({ role }) {
    const data = await members();
    return (
        <table>
            <thead>
                <tr>
                    <td>name</td>
                    <td>email</td>
                    <td>standard</td>
                    <td>role</td>
                </tr>
            </thead>
            <tbody>
                {
                    !role && (
                        data.map((items) => {
                            return <tr key={items.email}>
                                <td>{items.name}</td>
                                <td>{items.email}</td>
                                <td>{items.standard}</td>
                                <td>{items.role}</td>
                            </tr>
                        })
                    )
                }
                {
                    (role == 'student') && (
                        data.map((items) => {
                            if (items.role == 'student') {
                                return <tr key={items.email}>
                                    <td>{items.name}</td>
                                    <td>{items.email}</td>
                                    <td>{items.standard}</td>
                                    <td>{items.role}</td>
                                </tr>
                            }
                        })
                    )
                }
                {
                    (role == 'teacher') && (
                        data.map((items) => {
                            if (items.role == 'teacher') {
                                return <tr key={items.email}>
                                    <td>{items.name}</td>
                                    <td>{items.email}</td>
                                    <td>{items.standard}</td>
                                    <td>{items.role}</td>
                                </tr>
                            }
                        })
                    )
                }

            </tbody>
        </table>
    )
}

export default Acclist