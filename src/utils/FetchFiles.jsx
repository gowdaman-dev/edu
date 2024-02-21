import axios from "axios";
async function fetchFiles(session,contextGrade) {
  const { user } = session
  const SCHOOL=user.school
  
  const GRADE = "grade" in user ? user.grade : contextGrade;
  const response = await axios.get(`/api/files`, {
    params: {
      grade: GRADE,
      school: SCHOOL,

    }
  });

  return response.data

}

export default fetchFiles