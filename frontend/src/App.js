import "./App.css"
import HomePage from "./pages/HomePage"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ToDoPage from "./pages/ToDoPage"
import ExamsPage from "./pages/ExamsPage"
import NewEntryPage from "./pages/NewEntryPage"
import { createContext } from "react"
import NotesPage from "./pages/NotesPage"
import LoginPage from "./pages/LoginPage"

const config = require("./config")
export const HostsContext = createContext()

function App() {
  const hosts = {
    api: process.env.REACT_APP_API_HOST,
    webserver: config.webserver.host + config.webserver.port,
  }
  return (
    <div>
      <HostsContext.Provider value={hosts}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/todo" element={<ToDoPage />} />
            <Route path="/exams" element={<ExamsPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/new-entry" element={<NewEntryPage />} />
          </Routes>
        </Router>
      </HostsContext.Provider>
    </div>
  )
}
export default App
