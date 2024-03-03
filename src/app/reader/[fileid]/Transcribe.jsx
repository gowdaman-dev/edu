import React from 'react'
import axios from 'axios'
async function Transcribe(id) {
    const {data} = await axios.get('https://firebasestorage.googleapis.com/v0/b/lmsedu-e5dbc.appspot.com/o/transcript%2F6cdd6c52-da48-4061-aeba-19782e43d717?alt=media&token=c193bafc-ce23-49f1-a2fc-8c65381721f2')
    return data
}
export default Transcribe