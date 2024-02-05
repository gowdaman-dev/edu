export const dynamic = 'auto'
export const revalidate = 0
export const fetchCache = 'force-no-store'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
async function EventHandler({navGrade}) {
    const res = await fetch('/api/memberlist',{
        method:"PUT",
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify({standard:navGrade}),
        cache: 'no-store', next: { revalidate: 0 }})
    const data = await res.json();
    return data;
}
async function Fetched({navGrade}) {
    const data = await EventHandler({navGrade});
    return data
}
export default Fetched