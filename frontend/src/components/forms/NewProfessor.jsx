import React, { useContext } from "react"
import { Button, Form, Card } from "react-bootstrap"
import { HostsContext } from "../../App"

function NewProfessor() {
  const hosts = useContext(HostsContext)
  return (
    <Card border="dark" style={{ margin: "1rem", padding: "1rem" }}>
      <Card.Title>New Professor</Card.Title>
      <Form method="POST" action={hosts.api + "/professor"}>
        <Form.Group>
          <Form.Label>Professor Name:</Form.Label>
          <Form.Control
            required
            name="professor_name"
            type="text"
            placeholder="John Doe"
            style={{ marginBottom: "1rem" }}
          />
          <Form.Label>Email:</Form.Label>
          <Form.Control
            required
            name="professor_email"
            type="email"
            placeholder="john.doe@sjsu.edu"
            style={{ marginBottom: "1rem" }}
          />
          <Form.Label>Office Hours:</Form.Label>
          <Form.Control
            required
            name="office_hours"
            type="text"
            placeholder="MW 12:00 or through zoom (email for zoom link)"
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

export default NewProfessor
