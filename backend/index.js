require("dotenv").config()
const express = require("express")
const mysql = require("mysql2")
const bodyParser = require("body-parser")
const cors = require("cors")
const config = require("./config")
const session = require("express-session")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  next()
})

const hosts = {
  webserver:
    process.env.WEBSERVER_HOST,
  api: process.env.API_HOST + ":" + process.env.PORT,
  db: process.env.DB_HOST + ":" + process.env.DB_PORT,
}


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "projectdatabase",
})

app.get("/", (req, res) => {
  res.json("Hello this is backend!")
})
// app.post("/login", cors(corsOptions), (req, res) => {
//   try {
//     if (!req.body.student_id) {
//       throw new Error("Error: please specify student_id")
//     } else if (!req.body.student_password) {
//       throw new Error("Error: please specify student_password")
//     } else {
//       mysql_query =
//         "SELECT Student_Id FROM Student WHERE Student_Id = ? AND Student_Password = ?"
//       db.query(
//         mysql_query,
//         [req.body.student_id, req.body.student_password],
//         (err, data) => {
//           if (err) {
//             res.json(err)
//           } else if (data !== []) {
//             req.session.student_id = data[0]
//           } else {
//             res.redirect(`${hosts.webserver}/login`)
//           }
//         }
//       )
//     }
//   } catch (err) {
//     res.json(err.message)
//   }
// })
app.get("/notes",  (req, res) => {
  try {
    var student_id
    var mysql_query
    if (!req.query.student_id) {
      throw new Error("Error: please specify student_id (required)")
    } else {
      if (req.query.notes_id) {
        mysql_query = `SELECT * from Notes WHERE Notes_Id = ? AND Student_Id = ? `
        db.query(mysql_query, [req.query.notes_id, student_id], (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        })
      } else if (req.query.topic_id) {
        mysql_query = `SELECT * from Notes WHERE Topic_Id = ? AND Student_Id = ?`
        db.query(mysql_query, [req.query.topic_id, student_id], (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        })
      } else if (req.query.assignment_id) {
        mysql_query = `SELECT * from Notes_Info_VW
        INNER JOIN Assignment_Topic on Notes_Info_VW.Topic_Id = Assignment_Topic.Topic_Id
        WHERE Assignment_Id = ? AND Student_Id = ?`
        db.query(
          mysql_query,
          [req.query.assignment_id, req.query.student_id],
          (err, data) => {
            if (err) return res.json(err)
            return res.json(data)
          }
        )
      } else if (req.query.exam_id) {
        mysql_query = `SELECT * from Notes_Info_VW INNER JOIN Exam_Topic on Notes_Info_VW.Topic_Id = Exam_Topic.Topic_Id
        WHERE Exam_Id = ? AND Student_Id = ?`
        db.query(
          mysql_query,
          [req.query.exam_id, req.query.student_id],
          (err, data) => {
            if (err) return res.json(err)
            return res.json(data)
          }
        )
      } else {
        mysql_query = `SELECT * from Notes_Info_VW WHERE Student_Id = ?`
        db.query(mysql_query, [req.query.student_id], (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        })
      }
    }
  } catch (err) {
    res.json(err.message)
  }
})
app.post("/notes",  (req, res) => {
  try {
    if (!req.body.student_id) {
      throw new Error("Error: please specify student_id")
    } else if (!req.body.topic_id) {
      throw new Error("Error: please specify topic_id")
    } else if (!req.body.notes_content) {
      throw new Error("Error: please specify notes_content")
    } else {
      mysql_query = `INSERT INTO Notes (Notes_Content, Student_Id, Topic_Id) values
      (?,?,?)`
      db.query(
        mysql_query,
        [req.body.notes_content, req.body.student_id, req.body.topic_id],
        (err, data) => {
          if (err) return res.json(err)
          res.redirect(303, `${hosts.webserver}/new-entry`)
        }
      )
    }
  } catch (err) {
    res.json(err.message)
  }
})
app.put("/notes", (req, res) => {
  try {
    if (!req.body.notes_content) {
      throw new Error("Error: please specify notes_content")
    } else if (!req.body.notes_id) {
      throw new Error("Error: please specify notes_id")
    } else {
      mysql_query = `UPDATE Notes Set Notes_Content = ? WHERE Notes_Id = ?`
      db.query(
        mysql_query,
        [req.body.notes_content, req.body.notes_id],
        (err, data) => {
          // if (err) return res.json(err)
          // res.redirect(303, `${hosts.webserver}/`)
        }
      )
    }
  } catch (err) {
    res.json(err.message)
  }
})
app.delete("/notes",  (req, res) => {
  try {
    if (!req.query.notes_id) {
      throw new Error("Error: please specify notes_id")
    } else {
      mysql_query = `DELETE FROM Notes WHERE Notes_Id = ?`
      db.query(mysql_query, [req.query.notes_id], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
      })
    }
  } catch (err) {
    res.json(err.message)
  }
})
app.get("/class",  (req, res) => {
  try {
    var mysql_query
    if (!req.query.student_id) {
      mysql_query = `SELECT * from Class_Info_VW`
      db.query(mysql_query, (err, data) => {
        return res.json(data)
      })
    } else {
      if (!req.query.class_id) {
        mysql_query = `SELECT * from Class_Info_VW inner join Class_Enrollment on Class_Info_VW.Class_Id = Class_Enrollment.Class_Id WHERE
        Student_Id = ?`
        db.query(mysql_query, [req.query.student_id], (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        })
      } else {
        mysql_query = `SELECT * from Class_Info_VW inner join Class_Enrollment on Class_Info_VW.Class_Id = Class_Enrollment.Class_Id WHERE
        Student_Id = ? AND Class_Info_VW.Class_Id = ?`
        db.query(
          mysql_query,
          [req.query.student_id, req.query.class_id],
          (err, data) => {
            if (err) return res.json(err)
            return res.json(data)
          }
        )
      }
    }
  } catch (err) {
    res.json(err.message)
  }
})
app.post("/class",  (req, res) => {
  try {
    if (!req.body.location) {
      throw new Error("Error: please specify location")
    } else if (!req.body.meeting_day) {
      throw new Error("Error: please specify meeting_day")
    } else if (!req.body.start_time) {
      throw new Error("Error: please specify start_time")
    } else if (!req.body.end_time) {
      throw new Error("Error: please specify end_time")
    } else if (!req.body.professor_id) {
      throw new Error("Error: please specify professor_id")
    } else if (!req.body.course_id) {
      throw new Error("Error: please specify course_id")
    } else if (!req.body.class_section) {
      throw new Error("Error: please specify class_section")
    } else {
      mysql_query = `INSERT INTO Class (Location, Meeting_Day, Start_Time, End_Time, Professor_Id, Course_Id, Class_Section)
      values (?, ?, ?, ?, ?, ?, ?)`
      db.query(
        mysql_query,
        [
          req.body.location,
          req.body.meeting_day,
          req.body.start_time,
          req.body.end_time,
          req.body.professor_id,
          req.body.course_id,
          req.body.class_section,
        ],
        (err, data) => {
          if (err) return res.json(err)
          res.redirect(303, `${hosts.webserver}/new-entry`)
        }
      )
    }
  } catch (err) {
    res.json(err.message)
  }
})

app.get("/class-enrollment",  (req, res) => {
  try {
    if (req.query.student_id) {
      var mysql_query = `SELECT * from Class_Enrollment WHERE Student_Id = ?`
      db.query(mysql_query, [req.query.student_id], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
      })
    } else {
      var mysql_query = "SELECT * from Class_Enrollment"
      db.query(mysql_query, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
      })
    }
  } catch (err) {
    res.json(err.message)
  }
})
app.post("/class-enrollment",  (req, res) => {
  try {
    if (!req.body.student_id) {
      throw new Error("Error: please specify student_id")
    } else if (!req.body.class_id) {
      throw new Error("Error: please specify class_id")
    } else {
      mysql_query = `INSERT INTO Class_Enrollment (Class_Id, Student_Id) values
      (?, ?)`
      db.query(
        mysql_query,
        [req.body.class_id, req.body.student_id],
        (err, data) => {
          res.redirect(303, `${hosts.webserver}/`)
        }
      )
    }
  } catch (err) {
    res.json(err.message)
  }
})
app.delete("/class-enrollment",  (req, res) => {
  try {
    if (!req.query.student_id) {
      throw new Error("Error: please specify student_id")
    } else if (!req.query.class_id) {
      throw new Error("Error: please specify class_id")
    } else {
      mysql_query = `DELETE FROM Class_Enrollment WHERE
      Class_Id = ? AND Student_Id = ?`
      db.query(
        mysql_query,
        [req.query.class_id, req.query.student_id],
        (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        }
      )
    }
  } catch (err) {
    res.json(err.message)
  }
})
app.get("/course",  (req, res) => {
  try {
    var mysql_query
    if (!req.query.course_id) {
      mysql_query = `SELECT * from Course ORDER BY Course_Name ASC`
      db.query(mysql_query, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
      })
    } else {
      mysql_query = `SELECT * from Course WHERE Course_Id = ? ORDER BY Course_Name ASC`
      db.query(mysql_query, [req.query.course_id], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
      })
    }
  } catch (err) {
    res.json(err.message)
  }
})
app.post("/course", (req, res) => {
  try {
    if (!req.body.course_name) {
      throw new Error("Error: please specify course_name")
    } else if (!req.body.course_units) {
      throw new Error("Error: please specify course_units")
    } else {
      var mysql_query = `INSERT INTO Course (Course_Name, Course_Units)
      values (?, ?)`
      db.query(
        mysql_query,
        [req.body.course_name, req.body.course_units],
        (err, data) => {
          res.redirect(303, `${hosts.webserver}/new-entry`)
        }
      )
    }
  } catch (err) {
    res.json(err.message)
  }
})
app.get("/exam",  (req, res) => {
  try {
    var mysql_query
    if (!req.query.student_id) {
      throw new Error(
        "Error: please specify student_id to retrieve applicable exams"
      )
    } else {
      if (!req.query.exam_id) {
        mysql_query = `SELECT * from Exam_Info_VW inner join Class_Enrollment on Exam_Info_VW.Class_Id = Class_Enrollment.Class_Id
        WHERE Student_Id = ? ORDER BY Exam_Date ASC`
        db.query(mysql_query, [req.query.student_id], (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        })
      } else {
        mysql_query = `SELECT * from Exam_Info_VW inner join Class_Enrollment on Exam_Info_VW.Class_Id = Class_Enrollment.Class_Id
        WHERE Student_Id = ? AND Exam_Id = ? ORDER BY Exam_Date ASC`
        db.query(
          mysql_query,
          [req.query.student_id, req.query.exam_id],
          (err, data) => {
            if (err) return res.json(err)
            return res.json(data)
          }
        )
      }
    }
  } catch (err) {
    res.json(err.message)
  }
})
app.post("/exam",  (req, res) => {
  try {
    if (!req.body.class_id) {
      throw new Error("Error: please specify class_id")
    } else if (!req.body.exam_name) {
      throw new Error("Error: please specify exam_name")
    } else if (!req.body.exam_date) {
      throw new Error("Error: please specify exam_date")
    } else if (!req.body.exam_topics) {
      throw new Error("Error: please specify exam_topics")
    } else {
      db.beginTransaction((err) => {
        if (err) {
          console.log("POST Exam Error: begin transaction failed")
        } else {
          var mysql_query = `INSERT INTO Exam (Exam_Date, Exam_Name, Class_Id) values (?, ?, ?)`
          db.query(
            mysql_query,
            [req.body.exam_date, req.body.exam_name, req.body.class_id],
            (err, data) => {
              if (err) {
                return db.rollback(() => {
                  console.log("POST Exam Error: failed to insert into Exam")
                })
              } else {
                mysql_query = `SELECT Exam_Id FROM Exam WHERE Exam_Name = ? AND Class_Id = ?`
                db.query(
                  mysql_query,
                  [req.body.exam_name, req.body.class_id],
                  (err, data) => {
                    if (err) {
                      return db.rollback(() => {
                        console.log(
                          "POST Exam Error: failed to get new Exam_Id"
                        )
                      })
                    } else {
                      exam_id = data[0].Exam_Id
                      //if only 1 exam topic selected
                      if (typeof req.body.exam_topics == "string") {
                        mysql_query = `INSERT INTO Exam_Topic (Exam_Id, Topic_Id) values (?, ?)`
                        db.query(
                          mysql_query,
                          [exam_id, req.body.exam_topics],
                          (err, data) => {
                            if (err) {
                              return db.rollback(() => {
                                console.log(
                                  "POST Exam Error: failed to insert into Exam_Topic"
                                )
                              })
                            } else {
                              db.commit((err) => {
                                if (err) {
                                  console.log(
                                    "POST Exam Error: failed to commit"
                                  )
                                }
                                res.redirect(303, `${hosts.webserver}/exams`)
                              })
                            }
                          }
                        )
                      }
                      //if multiple exam topics selected
                      else {
                        mysql_query = `INSERT INTO Exam_Topic (Exam_Id, Topic_Id) values `
                        for (topic_id of req.body.exam_topics) {
                          mysql_query += `(${exam_id},${topic_id}),`
                        }
                        //remove the last comma
                        mysql_query = mysql_query.slice(0, -1)

                        db.query(mysql_query, (err, data) => {
                          if (err) {
                            return db.rollback(() => {
                              console.log(
                                "POST Exam Error: failed to insert into Exam_Topic"
                              )
                            })
                          } else {
                            db.commit((err) => {
                              if (err) {
                                console.log("POST Exam Error: failed to commit")
                              }
                            })
                            res.redirect(303, `${hosts.webserver}/exams`)
                          }
                        })
                      }
                    }
                  }
                )
              }
            }
          )
        }
      })
      // var mysql_query = `INSERT INTO Exam (Exam_Date, Exam_Name, Class_Id) values (?, ?, ?)`
      // db.query(
      //   mysql_query,
      //   [req.body.exam_date, req.body.exam_name, req.body.class_id],
      //   (err, data) => {
      //     if (err) return res.json(err)
      //     else {
      //       const getNewExamId = (query, argsArray, callback) => {
      //         db.query(query, argsArray, (err, data) => {
      //           if (err) return res.json(err)
      //           else callback(data[0].Exam_Id)
      //         })
      //       }
      //       getNewExamId(
      //         `SELECT Exam_Id FROM Exam WHERE Exam_Name = ? AND Class_Id = ?`,
      //         [req.body.exam_name, req.body.class_id],
      //         (exam_id) => {
      //           //if only 1 exam topic selected
      //           if (typeof req.body.exam_topics == "string") {
      //             mysql_query = `INSERT INTO Exam_Topic (Exam_Id, Topic_Id) values (?, ?)`
      //             db.query(
      //               mysql_query,
      //               [exam_id, req.body.exam_topics],
      //               (err, data) => {
      //                 if (err) return res.json(err)
      //                 res.redirect(303, `${hosts.webserver}/exams`)
      //               }
      //             )
      //           }
      //           //if multiple exam topics selected
      //           else {
      //             mysql_query = `INSERT INTO Exam_Topic (Exam_Id, Topic_Id)
      //           values `
      //             for (topic_id of req.body.exam_topics) {
      //               mysql_query += `(${exam_id},${topic_id}),`
      //             }
      //             //remove the last comma
      //             mysql_query = mysql_query.slice(0, -1)

      //             db.query(mysql_query, (err, data) => {
      //               if (err) return res.json(err)
      //               res.redirect(303, `${hosts.webserver}/exams`)
      //             })
      //           }
      //         }
      //       )
      //     }
      //   }
      // )
    }
  } catch (err) {
    res.json(err.message)
  }
})
app.delete("/exam",  (req, res) => {
  try {
    if (!req.query.exam_id) {
      throw new Error("Error: please specify exam_id")
    } else {
      db.beginTransaction(function (err) {
        if (err) {
          console.log("DELETE Exam Error: initiate transaction failed")
        } else {
          mysql_query = `DELETE FROM Exam_Topic WHERE Exam_Id = ?`
          db.query(mysql_query, [req.query.exam_id], (err, data) => {
            if (err) {
              return db.rollback(() => {
                console.log("DELETE Exam Error: error deleting from Exam_Topic")
              })
            } else {
              mysql_query = `DELETE FROM Exam WHERE Exam_Id = ?`
              db.query(mysql_query, [req.query.exam_id], (err, data) => {
                if (err) {
                  return db.rollback(() => {
                    console.log("error deleting from Exam")
                  })
                } else {
                  db.commit((err) => {
                    if (err) {
                      return db.rollback(() => {
                        console.log("Error committing transaction")
                        return res.json(err)
                      })
                    }
                  })
                  return res.json(data)
                }
              })
            }
          })
        }
      })
    }
  } catch (err) {
    res.json(err.message)
  }
})
app.get("/assignment",  (req, res) => {
  try {
    var mysql_query
    if (!req.query.student_id) {
      throw new Error(
        "Error: please specify student_id to retrieve applicable assignments"
      )
    } else {
      if (!req.query.assignment_id) {
        mysql_query = `SELECT * from Assignment_Info_VW inner join Class_Enrollment on Assignment_Info_VW.Class_Id = Class_Enrollment.Class_Id
        WHERE ? = Class_Enrollment.Student_Id ORDER BY Assignment_Due_Date ASC`
        db.query(mysql_query, [req.query.student_id], (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        })
      } else {
        mysql_query = `SELECT * from Assignment_Info_VW inner join Class_Enrollment on Assignment_Info_VW.Class_Id = Class_Enrollment.Class_Id
        WHERE ? = Class_Enrollment.Student_Id AND ? = Assignment_Id ORDER BY Assignment_Due_Date ASC`
        db.query(
          mysql_query,
          [req.query.student_id, req.query.assignment_id],
          (err, data) => {
            if (err) return res.json(err)
            return res.json(data)
          }
        )
      }
    }
  } catch (err) {
    res.json(err.message)
  }
})
app.post("/assignment",  (req, res) => {
  try {
    if (!req.body.class_id) {
      throw new Error("Error: please specify class_id")
    } else if (!req.body.assignment_name) {
      throw new Error("Error: please specify assignment_name")
    } else if (!req.body.assignment_type) {
      throw new Error("Error: please specify assignment_type")
    } else if (!req.body.assignment_due_date) {
      throw new Error("Error: please specify assignment_due_date")
    } else if (!req.body.assignment_topics) {
      throw new Error("Error: please specify assignment_topics")
    } else {
      db.beginTransaction((err) => {
        if (!err) {
          var mysql_query = `INSERT INTO Assignment (Assignment_Due_Date, Assignment_Type, Assignment_Name, Class_Id) values (?, ?, ?, ?)`
          db.query(
            mysql_query,
            [
              req.body.assignment_due_date,
              req.body.assignment_type,
              req.body.assignment_name,
              req.body.class_id,
            ],
            (err, data) => {
              if (err) {
                return db.rollback(() => {
                  console.log(
                    "POST Assignment Rollback: error inserting into assignment"
                  )
                })
              } else {
                mysql_query =
                  "SELECT Assignment_Id from Assignment WHERE Assignment_Name = ? AND Class_Id = ?"
                db.query(
                  mysql_query,
                  [req.body.assignment_name, req.body.class_id],
                  (err, data) => {
                    if (err) {
                      return db.rollback(() => {
                        console.log(
                          "POST Assignment Rollback: error getting new assignment_id"
                        )
                      })
                    } else {
                      assignment_id = data[0].Assignment_Id
                      // if only 1 topic selected
                      if (typeof req.body.assignment_topics == "string") {
                        mysql_query =
                          "INSERT INTO Assignment_Topic (Assignment_Id, Topic_Id) values (?, ?)"
                        db.query(
                          mysql_query,
                          [assignment_id, req.body.assignment_topics],
                          (err, data) => {
                            if (err) {
                              return db.rollback(() => {
                                console.log(
                                  "POST Assignment Rollback: error inserting into Assignment_Topic"
                                )
                              })
                            } else {
                              db.commit((err) => {
                                if (err) {
                                  return db.rollback(() => {
                                    console.log(
                                      "POST Assignment Rollback: error committing"
                                    )
                                  })
                                }
                                res.redirect(303, `${hosts.webserver}/todo`)
                              })
                            }
                          }
                        )
                      }
                      // if multiple topics selected
                      else {
                        mysql_query = `INSERT INTO Assignment_Topic (Assignment_Id, Topic_Id) values `
                        for (topic_id of req.body.assignment_topics) {
                          mysql_query += `(${assignment_id},${topic_id}),`
                        }
                        //remove the last comma
                        mysql_query = mysql_query.slice(0, -1)
                        db.query(mysql_query, (err, data) => {
                          if (err) {
                            return db.rollback(() => {
                              console.log(
                                "POST Assignment Rollback: Error inserting into Assignment_Topic"
                              )
                            })
                          } else {
                            db.commit((err) => {
                              if (err) {
                                return db.rollback(() => {
                                  console.log(
                                    "POST Assignment Rollback: error committing"
                                  )
                                })
                              }
                              res.redirect(303, `${hosts.webserver}/todo`)
                            })
                          }
                        })
                      }
                    }
                  }
                )
              }
            }
          )
        }
      })
    }
  } catch (err) {
    res.json(err.message)
  }
})

app.delete("/assignment",  (req, res) => {
  try {
    if (!req.query.assignment_id) {
      throw new Error("Error: please specify assignment_id")
    } else {
      db.beginTransaction(function (err) {
        if (err) {
          console.log("DELETE Assignment error: begin transaction failed")
        } else {
          mysql_query = `DELETE FROM Assignment_Topic WHERE Assignment_Id = ?`
          db.query(mysql_query, [req.query.assignment_id], (err, data) => {
            if (err) {
              return db.rollback(() => {
                console.log(
                  "DELETE Assignment error:failed deleting from Assignment_Topic"
                )
              })
            } else {
              mysql_query = `DELETE FROM Assignment WHERE Assignment_Id = ?`
              db.query(mysql_query, [req.query.assignment_id], (err, data) => {
                if (err) {
                  return db.rollback(() => {
                    console.log("error deleting from Assignment")
                  })
                } else {
                  db.commit((err) => {
                    if (err) {
                      return db.rollback(() => {
                        console.log("Error committing transaction")
                      })
                    } else {
                      return res.json(data)
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  } catch (err) {
    res.json(err.message)
  }
})
app.get("/topic", (req, res) => {
  try {
    mysql_query = `SELECT * from Topic ORDER BY Topic_Name ASC`
    db.query(mysql_query, (err, data) => {
      if (err) return res.json(err)
      return res.json(data)
    })
  } catch (err) {
    res.json(err.message)
  }
})
app.post("/topic",  (req, res) => {
  try {
    if (!req.body.topic_name) {
      throw new Error("Error: please specify topic_name")
    } else {
      mysql_query = `INSERT INTO Topic (Topic_Name) values (?)`
      db.query(mysql_query, [req.body.topic_name], (err, data) => {
        // if (err) return res.json(err)
        res.redirect(303, `${hosts.webserver}/new-entry`)
      })
    }
  } catch (err) {
    res.json(err.message)
  }
})
app.get("/student",  (req, res) => {
  try {
    var mysql_query
    if (!req.query.student_id) {
      mysql_query = `SELECT * from Student`
    } else {
      mysql_query = `SELECT * from Student WHERE Student_Id = ?`
    }
    db.query(mysql_query, [req.query.student_id], (err, data) => {
      if (err) return res.json(err)
      return res.json(data)
    })
  } catch (err) {
    res.json(err.message)
  }
})
app.post("/student",  (req, res) => {
  try {
    if (!req.body.student_name) {
      throw new Error("Error: please specify a student_name")
    } else if (!req.body.student_id) {
      throw new Error("Error: please specify a unique student_id")
    } else if (!req.body.student_password) {
      throw new Error("Error: please specify a student_password")
    } else {
      var mysql_query = `INSERT INTO Student (Student_Id, Student_Name, Student_Password) values
      (?, ?, ?) `
      db.query(
        mysql_query,
        [req.body.student_id, req.body.student_name, req.body.student_password],
        (err, data) => {
          // if (err) res.json({ error: "failed" })
          res.redirect(303, `${hosts.webserver}/new-entry`)
        }
      )
    }
  } catch (err) {
    res.json(err.message)
  }
})

app.get("/professor",  (req, res) => {
  try {
    var mysql_query
    if (!req.query.professor_id) {
      mysql_query = `SELECT * from Professor ORDER BY Professor_Name ASC`
    } else {
      mysql_query = `SELECT * from Professor WHERE Professor_Id = ? Professor_Name ASC`
    }
    db.query(mysql_query, [req.query.professor_id], (err, data) => {
      if (err) return res.json(err)
      return res.json(data)
    })
  } catch (err) {
    res.json(err.message)
  }
})
app.post("/professor",  (req, res) => {
  try {
    if (!req.body.professor_name) {
      throw new Error("Error: please specify professor_name")
    } else if (!req.body.professor_email) {
      throw new Error("Error: please specify professor_email")
    } else if (!req.body.office_hours) {
      throw new Error("Error: please specify office_hours information")
    } else {
      var mysql_query = `INSERT INTO Professor (Professor_Name, Professor_Email, Office_Hours) values
      (?, ?, ?)`
      db.query(
        mysql_query,
        [
          req.body.professor_name,
          req.body.professor_email,
          req.body.office_hours,
        ],
        (err, data) => {
          if (err) return res.json(err)
          res.redirect(303, `${hosts.webserver}/new-entry`)
        }
      )
    }
  } catch (err) {
    res.json(err.message)
  }
})

var port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("Connected to backend at port " + port)
})
