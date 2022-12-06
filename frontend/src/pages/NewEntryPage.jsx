import React from "react"
import Container from "react-bootstrap/esm/Container"
import NavigationBar from "../components/NavigationBar"
import NewStudent from "../components/forms/NewStudent"
import NewCourse from "../components/forms/NewCourse"
import NewProfessor from "../components/forms/NewProfessor"
import NewClass from "../components/forms/NewClass"
import NewTopic from "../components/forms/NewTopic"
import NewNotes from "../components/forms/NewNotes"

function NewEntryPage() {
  return (
    <div>
      <NavigationBar />
      <Container>
        <NewNotes />
        <NewTopic />
        <NewStudent />
        <NewProfessor />
        <NewCourse />
        <NewClass />
      </Container>
    </div>
  )
}

export default NewEntryPage
