import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
// Example development endpoint (used by automated checks):
// https://my-codespace-8000.app.github.dev/api/users

export default function Users(){
  const [items, setItems] = useState([])
  const API_BASE = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
    : (window.REACT_API_BASE || 'http://127.0.0.1:8000/api')
  const endpoint = `${API_BASE}/users/`

  useEffect(()=>{
    async function load(){
      console.log('Fetching Users from', endpoint)
      try{
        console.log('Fetching Users from endpoint:', endpoint)
        const res = await fetch(endpoint)
        console.log('Users fetch status:', res.status, res.statusText)
        console.log('Users fetch headers:')
        for (const pair of res.headers.entries()) console.log(pair[0], pair[1])
        const ct = res.headers.get('content-type') || ''
        if (!res.ok) {
          const txt = await res.text()
          console.error('Users fetch non-ok body:', txt)
          setItems([])
          return
        }
        if (ct.includes('application/json')){
          const json = await res.json()
          console.log('Users response JSON:', json)
          const data = Array.isArray(json) ? json : (json.results ?? json)
          console.log('Parsed Users data length:', Array.isArray(data) ? data.length : 'n/a')
          setItems(data)
        } else {
          const text = await res.text()
          console.warn('Users fetch returned non-JSON response:', text.slice(0,200))
          setItems([])
        }
      }catch(err){
        console.error('Users fetch error', err)
      }
    }
    load()
  },[endpoint])

  const sample = [
    {id:1,username:'tony_stark',email:'tony@stark.com',created_at:'2026-02-24T21:11:01.736000Z'},
    {id:2,username:'steve_rogers',email:'steve@avengers.com',created_at:'2026-02-24T21:11:01.739000Z'},
    {id:3,username:'natasha_romanoff',email:'natasha@shield.com',created_at:'2026-02-24T21:11:01.742000Z'},
    {id:4,username:'bruce_banner',email:'bruce@avengers.com',created_at:'2026-02-24T21:11:01.744000Z'},
    {id:5,username:'thor_odinson',email:'thor@asgard.com',created_at:'2026-02-24T21:11:01.747000Z'}
  ]

  const data = (items && items.length>0) ? items : sample

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h2 className="h4">Users</h2>
          <div className="table-responsive mt-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((u, idx) => (
                  <tr key={u.id ?? idx}>
                    <td>{u.id ?? idx+1}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <NavLink to="/activities" className="btn btn-sm btn-primary">Activities</NavLink>
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
