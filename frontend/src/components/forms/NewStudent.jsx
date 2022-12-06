import React, { useContext } from "react"
import { Button, Form, Card, FormControl } from "react-bootstrap"
import { HostsContext } from "../../App"

function NewStudent() {
  const hosts = useContext(HostsContext)
  return (
    <Card border="dark" style={{ margin: "1rem", padding: "1rem" }}>
      <Card.Title>New Student</Card.Title>
      <Form method="POST" action={hosts.api + "/student"}>
        <Form.Label>Student ID:</Form.Label>
        <FormControl
          name="student_id"
          required
          type="number"
          placeholder="123"
          style={{ marginBottom: "1rem" }}
        />
        <Form.Label>Student Name:</Form.Label>
        <Form.Control
          name="student_name"
          required
          type="text"
          placeholder="Full Name"
          style={{ marginBottom: "1rem" }}
        />
        <Form.Label>Password:</Form.Label>
        <Form.Control
          name="student_password"
          required
          type="password"
          style={{ marginBottom: "1rem" }}
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  )
}

export default NewStudent
