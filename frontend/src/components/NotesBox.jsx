import axios from "axios"
import React, { useState, useContext } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { HostsContext } from "../App"

function NotesBox({ notes }) {
  const hosts = useContext(HostsContext)

  const [edit, setEdit] = useState(false)
  const [updatedNotesData, setUpdateNotesData] = useState({
    notes_id: notes.Notes_Id,
    notes_content: notes.Notes_Content,
    student_id: notes.Student_Id,
    topic_id: notes.Topic_Id,
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setUpdateNotesData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }
  const handleSubmit = (event) => {
    if (updatedNotesData.notes_content == "") {
      axios
        .delete(`${hosts.api}/notes?notes_id=${notes.Notes_Id}`)
        .then((response) => {
          console.log(response.data)
        })
    } else {
      axios.put(`${hosts.api}/notes`, updatedNotesData).then((response) => {
        console.log(response.data)
      })
    }
  }
  return (
    <Container>
      <h2>Topic: {notes.Topic_Name}</h2>
      {!edit && (
        <p style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
          {notes.Notes_Content}
        </p>
      )}
      {edit && (
        <Form onSubmit={handleSubmit}>
          <Form.Control
            name="notes_content"
            as="textarea"
            rows={10}
            style={{
              marginBottom: "1rem",
              whiteSpace: " pre-wrap",
              overflowWrap: "break-word",
            }}
            onChange={handleChange}
          >
            {notes.Notes_Content}
          </Form.Control>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <Button
              variant="primary"
              type="submit"
              hidden={!edit}
              style={{ marginInline: "0.5rem" }}
            >
              Save
            </Button>
            <Button
              variant="danger"
              type="button"
              hidden={!edit}
              onClick={() => setEdit(false)}
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
      <div style={{ float: "right" }}>
        <Button
          variant="primary"
          type="button"
          hidden={edit}
          onClick={() => setEdit(true)}
        >
          Edit
        </Button>
      </div>
    </Container>
  )
}

export default NotesBox
