import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Button, Form, Card } from "react-bootstrap"
import { HostsContext } from "../../App"

function verifyUnusedTopic(topic_id, notes) {
  for (const note of notes) {
    if (topic_id === note.Topic_Id) return true
  }
  return false
}
function NewNotes() {
  const hosts = useContext(HostsContext)
  const [topics, setTopics] = useState([])
  const [notes, setNotes] = useState([])
  const [student_id] = useState(
    sessionStorage.getItem("student_id")
      ? sessionStorage.getItem("student_id")
      : 0
  )

  useEffect(() => {
    axios
      .get(`${hosts.api}/notes?student_id=${student_id}`)
      .then((response) => {
        setNotes(response.data)
      })
  }, [])
  useEffect(() => {
    axios.get(`${hosts.api}/topic`).then((response) => {
      setTopics(response.data)
    })
  }, [])
  return (
    <Card border="dark" style={{ margin: "1rem", padding: "1rem" }}>
      <Card.Title>New Notes</Card.Title>
      <Form method="POST" action={hosts.api + "/notes"}>
        <Form.Control type="hidden" name="student_id" value={student_id} />
        <Form.Label>Topic:</Form.Label>
        <Form.Select required name="topic_id" style={{ marginBottom: "1rem" }}>
          <option value="none" selected disabled hidden>
            Select a Topic
          </option>
          {topics.length !== 0 &&
            topics.map((topic) => {
              if (!verifyUnusedTopic(topic.Topic_Id, notes)) {
                return (
                  <option value={topic.Topic_Id} key={topic.Topic_Id}>
                    {topic.Topic_Name}
                  </option>
                )
              }
            })}
        </Form.Select>
        <Form.Label>Notes Content:</Form.Label>
        <Form.Control
          name="notes_content"
          required
          as="textarea"
          rows={4}
          placeholder="Relational Databases"
          style={{ marginBottom: "1rem" }}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  )
}

export default NewNotes
