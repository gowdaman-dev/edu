import { useSession } from "next-auth/react"

const UserInfo = async () => {
    const {data:session} = useSession();
    const exist = fetch('src/app/api/userExists',
    {
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email:session?.user?.email})
    })
    const {user} = await exist.json()
    return user
}

export default UserInfo