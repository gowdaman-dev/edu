export const resetpassword = ({ id, name, email }) => {
    return (
        <div style={{ background: "white", alignItems: 'center', padding: '2rem 1rem', borderRadius: "10px" }}>
            <h1 style={{ color: 'purple' }} className="text-purple-800">welcome {name}</h1>
            <p>Thanks for using our eduationial service.You have requested to reset your edulearn password for a mail id {email}</p>
            <p>reset password <a href={`http://localhost:3000/resetpassword/${id}`}>click here</a></p>
        </div>
    )
}