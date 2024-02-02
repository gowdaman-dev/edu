const data = async (role , grade) => {
    try {
        const res = await fetch('/api/memberlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role, grade })
        })
        const result = await res.json()
        console.log(result)
        if (res.ok) {
            return result;
        }
    } catch (error) {
        console.log(error);
    }
}
async function AccList({ role, grade }) {
    const {datalist} = await data(role , grade);
    return (
        <>
            {
                (!datalist) && (
                    <p>Accouts Not Found</p>
                )
            }
            {
                (datalist) && (
                    <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Grade</td>
                                <td>Role</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datalist.map((acc) => {
                                    return <tr key={acc.email}>
                                        <td>{acc.name}</td>
                                        <td>{acc.email}</td>
                                        <td>{acc.standard}</td>
                                        <td>{acc.role}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                )
            }
        </>
    )
}

export default AccList