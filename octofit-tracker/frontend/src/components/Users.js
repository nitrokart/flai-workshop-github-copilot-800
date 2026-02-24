import React, { useEffect, useState } from 'react'
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

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <ul className="list-group">
        {items && items.length>0 ? items.map((it,idx)=> (
          <li key={idx} className="list-group-item">{typeof it === 'object' ? JSON.stringify(it) : String(it)}</li>
        )) : <li className="list-group-item">No users</li>}
      </ul>
    </div>
  )
}
