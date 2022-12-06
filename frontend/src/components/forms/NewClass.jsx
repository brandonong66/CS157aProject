import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Button, Form, Card } from "react-bootstrap"
import { HostsContext } from "../../App"

function NewClass() {
  const [professors, setProfessors] = useState([])
  const [courses, setCourses] = useState([])

  const hosts = useContext(HostsContext)
  useEffect(() => {
    axios.get(`${hosts.api}/professor`).then((response) => {
      setProfessors(response.data)
    })
    axios.get(`${hosts.api}/course`).then((response) => {
      setCourses(response.data)
    })
  }, [])

  return (
    <Card border="dark" style={{ margin: "1rem", padding: "1rem" }}>
      <Card.Title>New Class</Card.Title>
      <Form method="POST" action={hosts.api + "/class"}>
        <Form.Group>
          <Form.Label>Professor:</Form.Label>
          <Form.Select
            required
            name="professor_id"
            style={{ marginBottom: "1rem" }}
          >
            <option value="none" selected disabled hidden>
              Select a Professor
            </option>
            {professors.length !== 0 &&
              professors.map((professor) => {
                return (
                  <option
                    value={professor.Professor_Id}
                    key={professor.Professor_Id}
                  >
                    {professor.Professor_Name}
                  </option>
                )
              })}
          </Form.Select>
          <Form.Label>Course:</Form.Label>
          <Form.Select
            required
            name="course_id"
            style={{ marginBottom: "1rem" }}
          >
            <option value="none" selected disabled hidden>
              Select a Course
            </option>
            {courses.length !== 0 &&
              courses.map((course) => {
                return (
                  <option value={course.Course_Id} key={course.Course_Id}>{course.Course_Name}</option>
                )
              })}
          </Form.Select>
          <Form.Label>Location:</Form.Label>
          <Form.Control
            required
            name="location"
            type="text"
            placeholder="MacQurrie Hall 123"
            style={{ marginBottom: "1rem" }}
          />
          <Form.Label>Meeting Days:</Form.Label>
          <Form.Control
            required
            name="meeting_day"
            type="text"
            placeholder="Tuesday Thursday"
            style={{ marginBottom: "1rem" }}
          />
          <Form.Label>Start Time:</Form.Label>
          <Form.Control
            required
            name="start_time"
            type="text"
            placeholder="12:00:00"
            style={{ marginBottom: "1rem" }}
          />
          <Form.Label>End Time:</Form.Label>
          <Form.Control
            required
            name="end_time"
            type="text"
            placeholder="13:15:00"
            style={{ marginBottom: "1rem" }}
          />

          <Form.Label>Class Section:</Form.Label>
          <Form.Control
            required
            name="class_section"
            type="number"
            placeholder="1"
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

export default NewClass
