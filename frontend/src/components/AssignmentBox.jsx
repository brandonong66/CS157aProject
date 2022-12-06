import axios from "axios"
import React, { useEffect, useState, useContext } from "react"
import { Button, Card, ListGroup } from "react-bootstrap"
import NotesBox from "./NotesBox"
import { HostsContext } from "../App"

function reformat_date(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  var date2 = new Date(date)
  return (
    days[date2.getDay()] +
    ", " +
    months[date2.getMonth()] +
    " " +
    date2.getDate() +
    ", " +
    date2.getFullYear()
  )
}
function AssignmentBox({ assignment }) {
  const hosts = useContext(HostsContext)
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios
      .get(
        `${hosts.api}/notes?student_id=${sessionStorage.getItem(
          "student_id"
        )}&assignment_id=${assignment.Assignment_Id}`
      )
      .then((response) => {
        setNotes(response.data)
      })
  }, [assignment])

  function deleteAssignment() {
    if (window.confirm("Are you sure you want to delete?")) {
      axios
        .delete(
          `${hosts.api}/assignment?assignment_id=${assignment.Assignment_Id}`
        )
        .then((response) => {
          console.log(response.data)
        })
        window.location.reload(false)
    }
  }
  return (
    <div style={{ paddingBottom: "2rem" }}>
      <Card border="dark">
        <Card.Body>
          <Button
            variant="danger"
            style={{ float: "right" }}
            onClick={() => {
              deleteAssignment()
            }}
          >
            Delete
          </Button>
          <h2>{assignment.Assignment_Name}</h2>
          <p>
            <b>{assignment.Course_Name}</b>
            <br />
            <b>Due:</b>
            {reformat_date(assignment.Assignment_Due_Date)}
            <br />
            <b>Type:</b> {assignment.Assignment_Type}
            <br />
            <b>Relevant Topics:</b> {Object.values(assignment)[6]}
          </p>
          {!showNotes && notes.length !== 0 && (
            <Button variant="primary" onClick={() => setShowNotes(true)}>
              Show Notes
            </Button>
          )}
          {showNotes && notes.length !== 0 && (
            <div>
              <Button
                variant="danger"
                onClick={() => setShowNotes(false)}
                style={{ margin: "1rem" }}
              >
                Hide Notes
              </Button>

              <Card border="light" key={assignment.Assignment_Name}>
                <ListGroup>
                  {notes.map((note) => {
                    return (
                      <ListGroup.Item key={note.Notes_Id}>
                        <NotesBox notes={note} key={note.Notes_Id} />
                      </ListGroup.Item>
                    )
                  })}
                </ListGroup>
              </Card>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default AssignmentBox
