import React, { useState, useEffect, useContext } from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Container from "react-bootstrap/Container"
import axios from "axios"
import { HostsContext } from "../App"

function NavigationBar() {
  const hosts = useContext(HostsContext)
  const [students, setStudents] = useState([])
  const [student_id, setStudent_id] = useState(
    sessionStorage.getItem("student_id")
      ? sessionStorage.getItem("student_id")
      : 0
  )
  const [student_name, setStudent_Name] = useState()
  useEffect(() => {
    sessionStorage.setItem("student_id", student_id)
    axios
      .get(`${hosts.api}/student?student_id=${student_id}`)
      .then((response) => {
        setStudent_Name(response.data[0].Student_Name)
      })

    axios.get(`${hosts.api}/student`).then((response) => {
      setStudents(response.data)
    })
  }, [student_id])

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <NavDropdown title={student_name ? student_name : "Student"}>
          {students.map((student) => {
            return (
              <NavDropdown.Item
                onClick={() => {
                  setStudent_id(student.Student_Id)
                  window.location.reload(false)
                }}
                key={student.Student_Name}
              >
                {student.Student_Name} - {student.Student_Id}
              </NavDropdown.Item>
            )
          })}
        </NavDropdown>
        <Nav.Link href="/">Classes</Nav.Link>
        <Nav.Link href="/todo">To Do List</Nav.Link>
        <Nav.Link href="/exams">Exams</Nav.Link>
        <Nav.Link href="/notes">All Notes</Nav.Link>
        <Nav.Link href="/new-entry">New Entry</Nav.Link>
        
      </Container>
    </Navbar>
  )
}

export default NavigationBar
