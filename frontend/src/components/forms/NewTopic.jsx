import React, { useContext } from "react"
import { Button, Form, Card, FormControl } from "react-bootstrap"
import { HostsContext } from "../../App"

function NewTopic() {
  const hosts = useContext(HostsContext)
  return (
    <Card border="dark" style={{ margin: "1rem", padding: "1rem" }}>
      <Card.Title>New Topic</Card.Title>
      <Form method="POST" action={hosts.api + "/topic"}>
        <Form.Label>Topic Name:</Form.Label>
        <Form.Control
          name="topic_name"
          required
          type="text"
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

export default NewTopic
