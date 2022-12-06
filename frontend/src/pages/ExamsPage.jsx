import React, { useEffect, useState, useContext } from "react"
import NavigationBar from "../components/NavigationBar"
import Container from "react-bootstrap/esm/Container"
import axios from "axios"
import ExamBox from "../components/ExamBox"
import { HostsContext } from "../App"
import NewExam from "../components/forms/NewExam"

function ExamsPage() {
  const hosts = useContext(HostsContext)
  const [student_id] = useState(
    sessionStorage.getItem("student_id")
      ? sessionStorage.getItem("student_id")
      : 0
  )
  const [exams, setExams] = useState([])

  useEffect(() => {
    axios.get(`${hosts.api}/exam?student_id=${student_id}`).then((response) => {
      setExams(response.data)
    })
  }, [student_id])
  return (
    <div>
      <NavigationBar />
      <Container>
        <h1 style={{ textAlign: "center" }}>Exams List</h1>
      </Container>
      <Container>
        {exams.length !== 0 &&
          exams.map((exam) => {
            return <ExamBox exam={exam} key={exam.Exam_Name} />
          })}
          <NewExam />
      </Container>
    </div>
  )
}

export default ExamsPage
