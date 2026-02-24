import React, { useEffect, useState } from 'react'

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

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <ol className="list-group list-group-numbered">
        {items && items.length>0 ? items.map((it,idx)=> (
          <li key={idx} className="list-group-item">{typeof it === 'object' ? JSON.stringify(it) : String(it)}</li>
        )) : <li className="list-group-item">No leaderboard entries</li>}
      </ol>
    </div>
  )
}
