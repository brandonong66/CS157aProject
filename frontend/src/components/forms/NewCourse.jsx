import React, { useContext } from "react"
import { Button, Form, Card } from "react-bootstrap"
import { HostsContext } from "../../App"

function NewCourse() {
  const hosts = useContext(HostsContext)
  return (
    <Card border="dark" style={{ margin: "1rem", padding: "1rem" }}>
      <Card.Title>New Course</Card.Title>
      <Form method="POST" action={hosts.api + "/course"}>
        <Form.Group>
          <Form.Label>Course Name:</Form.Label>
          <Form.Control
            required
            name="course_name"
            type="text"
            placeholder="CS123"
            style={{ marginBottom: "1rem" }}
          />
          <Form.Label>Units:</Form.Label>
          <Form.Control
            required
            name="course_units"
            type="number"
            placeholder="3"
            style={{ marginBottom: "1rem" }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  )
}

export default NewCourse
