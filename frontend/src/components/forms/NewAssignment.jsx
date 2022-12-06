import axios from "axios"
import React, { useState, useContext, useEffect } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { HostsContext } from "../../App"

function NewAssignment() {
  const hosts = useContext(HostsContext)
  const [classes, setClasses] = useState([])
  const [showNewAssignmentBox, setShowNewAssignmentBox] = useState(false)
  const [topics, setTopics] = useState([])
  const [checkCount, setCheckCount] = useState(0)
  const [student_id] = useState(
    sessionStorage.getItem("student_id")
      ? sessionStorage.getItem("student_id")
      : 0
  )
  useEffect(() => {
    axios
      .get(`${hosts.api}/class?student_id=${student_id}`)
      .then((response) => {
        setClasses(response.data)
      })
  }, [student_id])
  useEffect(() => {
    axios.get(`${hosts.api}/topic`).then((response) => {
      setTopics(response.data)
    })
  })

  const handleChange = (event) => {
    if (event.target.checked) {
      setCheckCount((prevCount) => prevCount + 1)
    } else {
      setCheckCount((prevCount) => prevCount - 1)
    }
  }
  return (
    <div>
      {!showNewAssignmentBox && (
        <Button variant="info" onClick={() => setShowNewAssignmentBox(true)}>
          New Assignment
        </Button>
      )}
      {showNewAssignmentBox && (
        <Card border="dark">
          <Card.Body>
            <Form method="post" action={`${hosts.api}/assignment`}>
              <Form.Control
                type="hidden"
                name="student_id"
                value={student_id}
              />
              <Form.Label>Class:</Form.Label>
              <Form.Select name="class_id">
                {typeof classes !== "undefined" &&
                  classes.map((class_) => {
                    return (
                      <option value={class_.Class_Id} key={class_.Class_Id}>
                        {class_.Course_Name} Sec {class_.Class_Secion}
                      </option>
                    )
                  })}
              </Form.Select>
              <Form.Label>Assignment Name:</Form.Label>
              <Form.Control
                required
                type="text"
                name="assignment_name"
                placeholder="Homework 1"
                style={{ marginBottom: "1rem" }}
              />
              <Form.Label>Assignment Type:</Form.Label>
              <Form.Control
                required
                type="text"
                name="assignment_type"
                placeholder="Homework"
                style={{ marginBottom: "1rem" }}
              />
              <Form.Label>Due Date:</Form.Label>
              <Form.Control
                required
                type="date"
                name="assignment_due_date"
                style={{ marginBottom: "1rem" }}
              />
              <Form.Label>Topics: </Form.Label>
              <Form.Text className="text-muted"> At least 1 required</Form.Text>
              {typeof topics !== "undefined" &&
                topics.map((topic) => {
                  return (
                    <Form.Check
                      type="checkbox"
                      label={topic.Topic_Name}
                      value={topic.Topic_Id}
                      name="assignment_topics"
                      onChange={handleChange}
                    />
                  )
                })}
              <Button
                variant="success"
                type="submit"
                disabled={checkCount == 0}
              >
                Submit
              </Button>
            </Form>
            <div style={{ display: "flex", justifyContent: "right" }}>
              <Button
                variant="danger"
                onClick={() => {
                  setShowNewAssignmentBox(false)
                  setCheckCount(0)
                }}
              >
                Cancel
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  )
}

export default NewAssignment
