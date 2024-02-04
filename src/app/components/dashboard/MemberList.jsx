export const dynamic = 'auto'
export const revalidate = 0
export const fetchCache = 'force-no-store'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
async function EventHandler() {
    const res = await fetch('/api/memberlist',{
        method:"PUT",
        cache: 'no-store', next: { revalidate: 0 }})
    const data = await res.json();
    return data;
}
async function Fetched() {
    const data = await EventHandler();
    return data
}
export default Fetched