import React, { useContext, useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import axios from "axios"
import { HostsContext } from "../App"

function verifyEnrollment(class_id, classEnrollment) {
  for (const enrollmentEntry of classEnrollment) {
    if (class_id == enrollmentEntry.Class_Id) {
      return true
    }
  }
  return false
}
function AddClass() {
  const hosts = useContext(HostsContext)
  const [allClasses, setAllClasses] = useState([])
  const [classEnrollment, setClassEnrollment] = useState([])
  const [addClass, setAddClass] = useState(false)
  const [student_id] = useState(
    sessionStorage.getItem("student_id")
      ? sessionStorage.getItem("student_id")
      : 0
  )
  useEffect(() => {
    sessionStorage.setItem("student_id", student_id)
    axios.get(`${hosts.api}/class`).then((response) => {
      setAllClasses(response.data)
    })
  }, [student_id])

  useEffect(() => {
    axios
      .get(`${hosts.api}/class-enrollment?student_id=${student_id}`)
      .then((response) => {
        setClassEnrollment(response.data)
      })
  }, [])

  return (
    <div>
      {!addClass && (
        <Button variant="info" onClick={() => setAddClass(true)}>
          Add a Class
        </Button>
      )}

      {addClass && (
        <Card border="dark">
          <Card.Body>
            <Form method="POST" action={hosts.api + "/class-enrollment"}>
              <Form.Control
                type="hidden"
                name="student_id"
                value={student_id}
              />
              <Form.Label>Select a Class:</Form.Label>
              <Form.Select
                required
                name="class_id"
                style={{ marginBottom: "1rem" }}
              >
                {allClasses.length !== 0 &&
                  allClasses.map((class_) => {
                    if (!verifyEnrollment(class_.Class_Id, classEnrollment)) {
                      return (
                        <option value={class_.Class_Id} key={class_.Class_Id}>
                          {class_.Course_Name} Sec {class_.Class_Section}
                        </option>
                      )
                    }
                  })}
              </Form.Select>
              <Button variant="success" type="submit">
                Add Class
              </Button>
            </Form>

            <div style={{ display: "flex", justifyContent: "right" }}>
              <Button variant="danger" onClick={() => setAddClass(false)}>
                Cancel
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  )
}

export default AddClass
