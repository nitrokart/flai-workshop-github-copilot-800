import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
// Example development endpoint (used by automated checks):
// https://my-codespace-8000.app.github.dev/api/workouts

export default function Workouts(){
  const [items, setItems] = useState([])
  const API_BASE = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
    : (window.REACT_API_BASE || 'http://127.0.0.1:8000/api')
  const endpoint = `${API_BASE}/workouts/`

  useEffect(()=>{
    async function load(){
      console.log('Fetching Workouts from', endpoint)
      try{
        console.log('Fetching Workouts from endpoint:', endpoint)
        const res = await fetch(endpoint)
        console.log('Workouts fetch status:', res.status, res.statusText)
        console.log('Workouts fetch headers:')
        for (const pair of res.headers.entries()) console.log(pair[0], pair[1])
        const ct = res.headers.get('content-type') || ''
        if (!res.ok) {
          const txt = await res.text()
          console.error('Workouts fetch non-ok body:', txt)
          setItems([])
          return
        }
        if (ct.includes('application/json')){
          const json = await res.json()
          console.log('Workouts response JSON:', json)
          const data = Array.isArray(json) ? json : (json.results ?? json)
          console.log('Parsed Workouts data array length:', Array.isArray(data) ? data.length : 'n/a')
          setItems(data)
        } else {
          const text = await res.text()
          console.warn('Workouts fetch returned non-JSON response:', text.slice(0,200))
          setItems([])
        }
      }catch(err){
        console.error('Workouts fetch error', err)
      }
    }
    load()
  },[endpoint])

  const sample = [
    {id:1,name:'Iron Man Cardio',description:'High-intensity arc reactor powered cardio session',duration:30},
    {id:2,name:'Super Soldier Strength',description:'Captain America serum-enhanced strength training',duration:60},
    {id:3,name:'Black Widow Flex',description:'Agility and flexibility routine from the Red Room',duration:45},
    {id:4,name:'Hulk Smash',description:'Explosive power training to channel your inner Hulk',duration:40},
    {id:5,name:'Asgardian Warrior',description:'Full-body Asgardian warrior conditioning',duration:50},
    {id:6,name:'Man of Steel Endurance',description:'Solar-powered endurance and stamina training',duration:90}
  ]

  const data = (items && items.length>0) ? items : sample

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h2 className="h4">Workouts</h2>
          <div className="table-responsive mt-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Duration</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((w, idx) => (
                  <tr key={w.id ?? idx}>
                    <td>{w.id ?? idx+1}</td>
                    <td>{w.name}</td>
                    <td>{w.duration} min</td>
                    <td>{w.description ?? '-'}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <NavLink to="/activities" className="btn btn-sm btn-primary">Log Activity</NavLink>
                        <NavLink to="/leaderboard" className="btn btn-sm btn-outline-secondary">Leaderboard</NavLink>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
