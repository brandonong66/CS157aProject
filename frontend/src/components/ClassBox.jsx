import axios from "axios"
import React, { useState, useContext } from "react"
import { Button, Container } from "react-bootstrap"
import { HostsContext } from "../App"

function ClassBox({ class_ }) {
  const hosts = useContext(HostsContext)
  const [student_id] = useState(
    sessionStorage.getItem("student_id")
      ? sessionStorage.getItem("student_id")
      : 0
  )

  function deleteEnrollment() {
    axios
      .delete(
        hosts.api +
          `/class-enrollment?student_id=${student_id}&class_id=${class_.Class_Id}`
      )
      .then((response) => {
        console.log(response.data)
      })
  }
  return (
    <Container key={class_.Course_Name} style={{ marginBottom: "2rem" }}>
      <h2>
        {class_.Course_Name} Sec {class_.Class_Section}
      </h2>
      <p>
        <b>Units:</b> {class_.Course_Units}
      </p>
      <p>
        <b>Location:</b> {class_.Location}
        <br />
        <b>Meets:</b> {class_.Meeting_Day} {class_.Start_Time} -{" "}
        {class_.End_Time}
      </p>
      <p>
        <b>Professor:</b> {class_.Professor_Name} <br />
        <b>Contact:</b> {class_.Professor_Email} <br />
        <b>Office Hours:</b> {class_.Office_Hours}
      </p>
      <Button
        variant="danger"
        onClick={() => {
          deleteEnrollment()
          window.location.reload(false)
        }}
      >
        Remove Class
      </Button>
    </Container>
  )
}

export default ClassBox
