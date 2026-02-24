import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import logo from './assets/octofitapp-small.svg'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function Home(){
  return (
    <div className="octofit-hero card">
      <div className="card-body">
        <h1 className="h2 mb-2">Welcome to OctoFit Tracker</h1>
        <p className="lead mb-3">Track your activities, join teams, and climb the leaderboard.</p>
        <div className="d-flex gap-2 flex-wrap">
          <NavLink className="btn btn-primary" to="/activities">View Activities</NavLink>
          <NavLink className="btn btn-outline-light" to="/leaderboard">Leaderboard</NavLink>
        </div>
      </div>
    </div>
  )
}

export default function App(){
  console.log('App startup - REACT_API_BASE:', window.REACT_API_BASE, 'REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME)
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark octofit-nav">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} alt="OctoFit" className="app-logo"/>
            <span className="brand-text">OctoFit</span>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item"><NavLink className={({isActive})=>isActive?'nav-link active':'nav-link'} to="/activities">Activities</NavLink></li>
              <li className="nav-item"><NavLink className={({isActive})=>isActive?'nav-link active':'nav-link'} to="/workouts">Workouts</NavLink></li>
              <li className="nav-item"><NavLink className={({isActive})=>isActive?'nav-link active':'nav-link'} to="/teams">Teams</NavLink></li>
              <li className="nav-item"><NavLink className={({isActive})=>isActive?'nav-link active':'nav-link'} to="/users">Users</NavLink></li>
              <li className="nav-item"><NavLink className={({isActive})=>isActive?'nav-link active':'nav-link'} to="/leaderboard">Leaderboard</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/activities" element={<Activities/>} />
          <Route path="/workouts" element={<Workouts/>} />
          <Route path="/teams" element={<Teams/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
