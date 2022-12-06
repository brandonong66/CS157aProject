import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
import NavigationBar from "../components/NavigationBar"
import Container from "react-bootstrap/esm/Container"
import AddClass from "../components/AddClass"
import { HostsContext } from "../App"
import ClassBox from "../components/ClassBox"

function HomePage() {
  const hosts = useContext(HostsContext)
  const [classes, setClasses] = useState([])
  const [student_id] = useState(
    sessionStorage.getItem("student_id")
      ? sessionStorage.getItem("student_id")
      : 0
  )

  useEffect(() => {
    sessionStorage.setItem("student_id", student_id)
    axios
      .get(`${hosts.api}/class?student_id=${student_id}`)
      .then((response) => {
        setClasses(response.data)
      })
  }, [student_id])
  return (
    <div>
      <NavigationBar />
      <h1 style={{ textAlign: "center" }}>Class List</h1>
      {student_id !== 0 && classes.length !== 0 && (
        <div>
          {classes.map((class_) => {
            return <ClassBox class_={class_} key={class_.Class_Id} />
          })}
        </div>
      )}
      <Container>
        <AddClass />
      </Container>
    </div>
  )
}

export default HomePage
