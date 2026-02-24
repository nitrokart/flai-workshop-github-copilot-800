import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function Home(){
  return (
    <div className="container mt-4">
      <h1>OctoFit Tracker</h1>
      <p>Welcome to the OctoFit Tracker frontend.</p>
    </div>
  )
}

export default function App(){
  console.log('App startup - REACT_API_BASE:', window.REACT_API_BASE, 'REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME)
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">OctoFit</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/activities" element={<Activities/>} />
        <Route path="/workouts" element={<Workouts/>} />
        <Route path="/teams" element={<Teams/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
      </Routes>
    </BrowserRouter>
  )
}
