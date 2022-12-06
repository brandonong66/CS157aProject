import axios from "axios"
import React, { useEffect, useState, useContext } from "react"
import Container from "react-bootstrap/esm/Container"
import NavigationBar from "../components/NavigationBar"
import AssignmentBox from "../components/AssignmentBox"
import { HostsContext } from "../App"
import NewAssignment from "../components/forms/NewAssignment"

function ToDoPage() {
  const hosts = useContext(HostsContext)
  const [assignments, setAssignments] = useState([])
  const [student_id] = useState(
    sessionStorage.getItem("student_id")
      ? sessionStorage.getItem("student_id")
      : 0
  )
  useEffect(() => {
    axios
      .get(`${hosts.api}/assignment?student_id=${student_id}`)
      .then((response) => {
        setAssignments(response.data)
      })
  }, [student_id])
  return (
    <div>
      <NavigationBar />
      <Container>
        <h1 style={{ textAlign: "center" }}>Assignment To Do List</h1>
      </Container>
      <Container>
        {typeof assignments !== 'undefined' &&
          assignments.map((assignment) => {
            return (
              <AssignmentBox
                assignment={assignment}
                key={assignment.Assignment_Name}
              />
            )
          })}
          <NewAssignment />
      </Container>
    </div>
  )
}

export default ToDoPage
