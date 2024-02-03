async function fetchFiles() {
  const response = await fetch(`/api/files`,{
    headers:{
      'token' : 'ONLY_FILE_INFO'
    },
    cache:"no-cache"
  });

  const data = await response.json();
  return data
 
}

export default fetchFiles