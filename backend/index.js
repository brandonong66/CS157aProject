const express = require("express")
const mysql = require("mysql2")

const app = express()

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

app.get("/notes", (req, res) => {
  const query = "SELECT * from Notes"
  db.query(query, (err, data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.listen(5002, () => {
  console.log("Connected to backend at port 5002")
})
