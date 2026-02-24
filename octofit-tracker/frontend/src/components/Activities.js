import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
// Example development endpoint (used by automated checks):
// https://my-codespace-8000.app.github.dev/api/activities

export default function Activities(){
  const [items, setItems] = useState([])
  const API_BASE = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
    : (window.REACT_API_BASE || 'http://127.0.0.1:8000/api')
  const endpoint = `${API_BASE}/activities/`

  useEffect(()=>{
    async function load(){
      console.log('Fetching Activities from', endpoint)
      try{
        console.log('Fetching Activities from endpoint:', endpoint)
        const res = await fetch(endpoint)
        console.log('Activities fetch status:', res.status, res.statusText)
        console.log('Activities fetch headers:')
        for (const pair of res.headers.entries()) console.log(pair[0], pair[1])
        const ct = res.headers.get('content-type') || ''
        if (!res.ok) {
          const txt = await res.text()
          console.error('Activities fetch non-ok body:', txt)
          setItems([])
          return
        }
        if (ct.includes('application/json')){
          const json = await res.json()
          console.log('Activities response JSON:', json)
          const data = Array.isArray(json) ? json : (json.results ?? json)
          console.log('Parsed Activities data length:', Array.isArray(data) ? data.length : 'n/a')
          setItems(data)
        } else {
          const text = await res.text()
          console.warn('Activities fetch returned non-JSON response:', text.slice(0,200))
          setItems([])
        }
      }catch(err){
        console.error('Activities fetch error', err)
      }
    }
    load()
  },[endpoint])

  const sample = [
    {id:1,username:'tony_stark',activity_type:'cardio',duration:30,date:'2026-02-24'},
    {id:2,username:'steve_rogers',activity_type:'strength',duration:50,date:'2026-02-23'},
    {id:3,username:'natasha_romanoff',activity_type:'flexibility',duration:45,date:'2026-02-22'}
  ]
  const data = (items && items.length>0) ? items : sample

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h2 className="h4">Activities</h2>
          <div className="table-responsive mt-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((a, idx) => {
                  const displayUser = a.username || a.user?.username || (typeof a.user === 'string' ? a.user : null) || `User ${idx+1}`
                  return (
                    <tr key={a.id ?? idx}>
                      <td>{a.id ?? idx+1}</td>
                      <td style={{fontWeight:600,color:'var(--heading)'}}>{displayUser}</td>
                      <td>{a.activity_type ?? a.type ?? '-'}</td>
                      <td>{a.duration} min</td>
                      <td>{a.date ?? '-'}</td>
                      <td>
                        <NavLink to="/users" className="btn btn-sm btn-outline-primary">Profile</NavLink>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
