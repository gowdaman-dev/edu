export const fetchCache = 'force-no-store';
async function EventHandler() {
    const res = await fetch('/api/memberlist',{ cache: 'no-store', next: { revalidate: 0 }})
    const data = await res.json();
    return data;
}
async function Fetched() {
    const data = await EventHandler();
    return data
}
export default Fetched