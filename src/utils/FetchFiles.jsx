async function fetchFiles() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}api/files`,{
    headers:{
      'token' : 'ONLY_FILE_INFO'
    },
    cache:"no-cache"
  });

  const data = await response.json();
  return data
 
}

export default fetchFiles