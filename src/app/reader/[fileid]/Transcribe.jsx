import axios from 'axios'
async function Transcribe({ params }) {
    try {
        const { data } = await axios.get(`https://firebasestorage.googleapis.com/v0/b/lmsedu-e5dbc.appspot.com/o/transcript%2F${params.fileid}?alt=media&token=c193bafc-ce23-49f1-a2fc-8c65381721f2`)
        const {words} = await data
        return words
    } catch (error) {
        return
    }
}
export default Transcribe