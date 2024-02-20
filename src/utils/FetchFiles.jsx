async function fetchFiles(session) {
  const response = await fetch(`/api/files`);

  const data = await response.json();
  return data
 
}

export default fetchFiles