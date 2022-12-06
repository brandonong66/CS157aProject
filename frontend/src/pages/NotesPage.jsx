import axios from "axios"
import React, { useEffect, useState, useContext } from "react"
import { Container, Card, ListGroup } from "react-bootstrap"
import NavigationBar from "../components/NavigationBar"
import NotesBox from "../components/NotesBox"
import { HostsContext } from "../App"

function NotesPage() {
  const hosts = useContext(HostsContext)
  const [student_id] = useState(
    sessionStorage.getItem("student_id")
      ? sessionStorage.getItem("student_id")
      : 0
  )
  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios
      .get(`${hosts.api}/notes?student_id=${student_id}`)
      .then((response) => {
        setNotes(response.data)
      })
  }, [])

  return (
    <div>
      <NavigationBar />
      <Container>
        <h1 style={{ textAlign: "center" }}>All Notes</h1>
        <Card border="light">
          <ListGroup>
            {typeof notes !== "undefined" &&
              notes.map((note) => {
                return (
                  <ListGroup.Item key={note.Notes_Id}>
                    <NotesBox notes={note} key={note.Notes_Id} />
                  </ListGroup.Item>
                )
              })}
          </ListGroup>
        </Card>
      </Container>
    </div>
  )
}

export default NotesPage
