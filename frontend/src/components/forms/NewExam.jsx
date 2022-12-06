import axios from "axios"
import React, { useState, useContext, useEffect } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { HostsContext } from "../../App"

function NewExam() {
  const hosts = useContext(HostsContext)
  const [showNewExamBox, setShowNewExamBox] = useState(false)
  const [checkCount, setCheckCount] = useState(0)
  const [topics, setTopics] = useState([])

  const [classes, setClasses] = useState([])
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
  },[])
  const handleChange = (event) => {
    if (event.target.checked) {
      setCheckCount((prevCount) => prevCount + 1)
    } else {
      setCheckCount((prevCount) => prevCount - 1)
    }
  }
  return (
    <div>
      {!showNewExamBox && (
        <Button variant="info" onClick={() => setShowNewExamBox(true)}>
          New Exam
        </Button>
      )}
      {showNewExamBox && (
        <Card border="dark">
          <Card.Body>
            <Form method="post" action={`${hosts.api}/exam`}>
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
              <Form.Label>Exam Name:</Form.Label>
              <Form.Control
                required
                name="exam_name"
                type="text"
                style={{ marginBottom: "1rem" }}
              />
              <Form.Label>Date:</Form.Label>
              <Form.Control
                required
                type="date"
                name="exam_date"
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
                      name="exam_topics"
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
                  setShowNewExamBox(false)
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

export default NewExam
