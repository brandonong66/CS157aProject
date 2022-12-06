import React, { useContext, useState } from "react"
import { Card, Form, FormControl, Button } from "react-bootstrap"
import NewStudent from "../components/forms/NewStudent"
import { HostsContext } from "../App"
import LoginForm from "../components/forms/LoginForm"

function LoginPage() {
  const hosts = useContext(HostsContext)
  const [newUser, setNewUser] = useState(false)

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        border="dark"
        style={{ width: "50%", position: "absolute", top: "30%" }}
      >
        <Card.Body>
          <Card.Title>
            {newUser ? "Create a New Account" : "Login"}
            <Button
              style={{ float: "right" }}
              hidden={newUser}
              onClick={() => {
                setNewUser(true)
              }}
            >
              Sign Up
            </Button>
            <Button
              style={{ float: "right" }}
              hidden={!newUser}
              onClick={() => {
                setNewUser(false)
              }}
            >
              Login
            </Button>
          </Card.Title>
          {newUser ? <NewStudent /> : <LoginForm />}
        </Card.Body>
      </Card>
    </div>
  )
}

export default LoginPage
