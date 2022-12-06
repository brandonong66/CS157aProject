import React, { useContext } from "react"
import { Card, Form, FormControl, Button } from "react-bootstrap"
import { HostsContext } from "../../App"

function LoginForm() {
  const hosts = useContext(HostsContext)

  return (
    <Form method="post" action={`${hosts.api}/login`}>
      <Form.Label>Student ID:</Form.Label>
      <FormControl
        name="student_id"
        required
        type="number"
        placeholder="123"
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
  )
}

export default LoginForm
