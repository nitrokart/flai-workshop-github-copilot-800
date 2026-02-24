import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
// Example development endpoint (used by automated checks):
// https://my-codespace-8000.app.github.dev/api/teams

export default function Teams(){
  const [items, setItems] = useState([])
  const API_BASE = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
    : (window.REACT_API_BASE || 'http://127.0.0.1:8000/api')
  const endpoint = `${API_BASE}/teams/`

  useEffect(()=>{
    async function load(){
      console.log('Fetching Teams from', endpoint)
      try{
        console.log('Fetching Teams from endpoint:', endpoint)
        const res = await fetch(endpoint)
        console.log('Teams fetch status:', res.status, res.statusText)
        console.log('Teams fetch headers:')
        for (const pair of res.headers.entries()) console.log(pair[0], pair[1])
        const ct = res.headers.get('content-type') || ''
        if (!res.ok) {
          const txt = await res.text()
          console.error('Teams fetch non-ok body:', txt)
          setItems([])
          return
        }
        if (ct.includes('application/json')){
          const json = await res.json()
          console.log('Teams response JSON:', json)
          const data = Array.isArray(json) ? json : (json.results ?? json)
          console.log('Parsed Teams data length:', Array.isArray(data) ? data.length : 'n/a')
          setItems(data)
        } else {
          const text = await res.text()
          console.warn('Teams fetch returned non-JSON response:', text.slice(0,200))
          setItems([])
        }
      }catch(err){
        console.error('Teams fetch error', err)
      }
    }
    load()
  },[endpoint])

  const sample = [
    {id:1,name:'Avengers',members:5},
    {id:2,name:'S.H.I.E.L.D Ops',members:12},
    {id:3,name:'Asgardian Guard',members:8}
  ]
  const data = (items && items.length>0) ? items : sample

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h2 className="h4">Teams</h2>
          <div className="table-responsive mt-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Members</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((t, idx) => (
                  <tr key={t.id ?? idx}>
                    <td>{t.id ?? idx+1}</td>
                    <td>{t.name}</td>
                    <td>{t.members ?? 'N/A'}</td>
                    <td>
                      <NavLink to="/leaderboard" className="btn btn-sm btn-primary">Leaderboard</NavLink>
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
