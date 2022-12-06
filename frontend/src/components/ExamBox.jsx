import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
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
function ExamBox({ exam }) {
  const hosts = useContext(HostsContext)
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios
      .get(
        `${hosts.api}/notes?student_id=${sessionStorage.getItem(
          "student_id"
        )}&exam_id=${exam.Exam_Id}`
      )
      .then((response) => {
        setNotes(response.data)
      })
  }, [exam])

  function deleteExam() {
    if (window.confirm("Are you sure you want to delete?")) {
      axios
        .delete(`${hosts.api}/exam?exam_id=${exam.Exam_Id}`)
        .then((response) => {
          console.log(response.data)
        })
      window.location.reload(false)
    }
  }

  return (
    <div key={exam.Exam_Name} style={{ paddingBottom: "2rem" }}>
      <Card border="dark">
        <Card.Body>
          <Button
            variant="danger"
            style={{ float: "right" }}
            onClick={() => {
              deleteExam()
            }}
          >
            Delete
          </Button>
          <h2>{exam.Exam_Name}</h2>
          <p>
            <b>{exam.Course_Name}</b>
            <br />
            <b>Due:</b>
            {reformat_date(exam.Exam_Date)}
            <br />
            <b>Relevant Topics:</b> {Object.values(exam)[5]}
          </p>
          {!showNotes && notes.length !== 0 && (
            <div>
              <Button variant="primary" onClick={() => setShowNotes(true)}>
                Show Notes
              </Button>
            </div>
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

              <Card border="light" key={exam.Exam_Name}>
                <ListGroup>
                  {notes.map((note) => {
                    return (
                      <ListGroup.Item key={note.Notes_Id}>
                        <NotesBox notes={note} />
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

export default ExamBox
