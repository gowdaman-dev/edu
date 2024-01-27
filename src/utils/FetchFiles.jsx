
async function fetchFiles() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}api/files`,{
    headers:{
      'token' : 'ONLY_FILE_INFO'
    },
    cache:"no-cache"
  });
  if (!response.ok) {
    throw new Error(`Fetch failed with status ${response.status}`);
  }
  const data = await response.json();
  return data
 
}

export default fetchFiles