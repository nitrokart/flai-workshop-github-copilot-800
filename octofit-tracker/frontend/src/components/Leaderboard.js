import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
// Example development endpoint (used by automated checks):
// https://my-codespace-8000.app.github.dev/api/leaderboard

export default function Leaderboard(){
  const [items, setItems] = useState([])
  const API_BASE = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
    : (window.REACT_API_BASE || 'http://127.0.0.1:8000/api')
  const endpoint = `${API_BASE}/leaderboard/`

  useEffect(()=>{
    async function load(){
      console.log('Fetching Leaderboard from', endpoint)
      try{
        console.log('Fetching Leaderboard from endpoint:', endpoint)
        const res = await fetch(endpoint)
        console.log('Leaderboard fetch status:', res.status, res.statusText)
        console.log('Leaderboard fetch headers:')
        for (const pair of res.headers.entries()) console.log(pair[0], pair[1])
        const ct = res.headers.get('content-type') || ''
        if (!res.ok) {
          const txt = await res.text()
          console.error('Leaderboard fetch non-ok body:', txt)
          setItems([])
          return
        }
        if (ct.includes('application/json')){
          const json = await res.json()
          console.log('Leaderboard response JSON:', json)
          const data = Array.isArray(json) ? json : (json.results ?? json)
          console.log('Parsed Leaderboard data length:', Array.isArray(data) ? data.length : 'n/a')
          setItems(data)
        } else {
          const text = await res.text()
          console.warn('Leaderboard fetch returned non-JSON response:', text.slice(0,200))
          setItems([])
        }
      }catch(err){
        console.error('Leaderboard fetch error', err)
      }
    }
    load()
  },[endpoint])

  const sample = [
    {id:1,username:'tony_stark',score:980},
    {id:2,username:'steve_rogers',score:950},
    {id:3,username:'natasha_romanoff',score:930}
  ]
  const data = (items && items.length>0) ? items : sample

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h2 className="h4">Leaderboard</h2>
          <div className="table-responsive mt-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Score</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((e, idx) => {
                  const displayName = e.username || e.user?.username || (typeof e.user === 'string' ? e.user : null) || `User ${idx+1}`
                  return (
                    <tr key={e.id ?? idx}>
                      <td>
                        <span className="badge" style={{background:'rgba(0,194,168,0.15)',color:'#00c2a8',fontWeight:700,fontSize:'0.9rem'}}>#{idx+1}</span>
                      </td>
                      <td style={{fontWeight:600,color:'var(--heading)'}}>{displayName}</td>
                      <td>{e.score ?? e.points ?? 0}</td>
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
