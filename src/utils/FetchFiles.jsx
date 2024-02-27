import axios from "axios";
async function fetchFiles(session,contextGrade,schoolFilter) {
  const { user } = session
  let SCHOOL=user.school
  if(user.role =="superadmin"){

    SCHOOL=schoolFilter
  }
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