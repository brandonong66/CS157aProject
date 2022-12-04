const express = require("express")
const mysql = require("mysql2")
const bodyParser = require("body-parser")

const app = express()
const jsonParser = bodyParser.json()

const db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "1234",
  database: "projectdatabase",
})

app.get("/", (req, res) => {
  res.json("Hello this is backend!")
})

app.get("/notes", jsonParser, (req, res) => {
  try {
    var student_id
    var query
    if (!req.body.student_id) {
      throw new Error("Error: please specify student_id (required)")
    } else {
      student_id = req.body.student_id
    }

    if (req.body.notes_id) {
      query = `SELECT * from Notes WHERE Notes_Id = ${req.body.notes_id} AND Student_Id = ${student_id}`
    } else if (req.body.topic_id) {
      query = `SELECT * from Notes WHERE Topic_Id = ${req.body.topic_id} AND Student_Id = ${student_id}`
    } else if (req.body.class_id) {
      query = `SELECT * from Notes WHERE Class_Id = ${req.body.class_id} AND Student_Id = ${student_id}`
    } else {
      throw new Error(
        "Error: please specify how to query notes. Try notes_id, topic_id, class_id?"
      )
    }

    db.query(query, (err, data) => {
      if (err) return res.json(err)
      return res.json(data)
    })
  } catch (err) {
    res.json(err.message)
  }
})

app.get("/class", jsonParser, (req, res) => {
  try {
    var query
    if (!req.body.class_id) {
      query = `SELECT * from Class_Info_VW`
    } else {
      query = `SELECT * from Class_Info_VW WHERE Class_Id = ${req.body.class_id}`
    }
    db.query(query, (err, data) => {
      if (err) return res.json(err)
      return res.json(data)
    })
  } catch (err) {
    res.json(err.message)
  }
})

app.get("/exam", jsonParser, (req, res) => {
  try {
    var query
    if (!req.body.exam_id) {
      query = `SELECT * from Exam_Info_VW`
    } else {
      query = `SELECT * from Exam_Info_VW WHERE Exam_Id = ${req.body.exam_id}`
    }
    db.query(query, (err, data) => {
      if (err) return res.json(err)
      return res.json(data)
    })
  } catch (err) {
    res.json(err.message)
  }
})

app.get("/assignment", jsonParser, (req, res) => {
  try {
    var query
    if (!req.body.assignment_id) {
      query = `SELECT * from Assignment_Info_VW`
    } else {
      query = `SELECT * from Assignment_Info_VW WHERE Assignment_Id = ${req.body.assignment_id}`
    }
    db.query(query, (err, data) => {
      if (err) return res.json(err)
      return res.json(data)
    })
  } catch (err) {
    res.res.json(err.message)
  }
})
app.listen(5002, () => {
  console.log("Connected to backend at port 5002")
})
