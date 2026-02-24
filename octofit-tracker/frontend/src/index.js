import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

// Derive API base in this order:
// 1. REACT_APP_CODESPACE_NAME env var (build-time)
// 2. Detect Codespace name from browser host (e.g. my-codespace-3000.app.github.dev)
// 3. Fallback to localhost API
let API_BASE
// Prefer explicit Codespace name when provided at build time.
if (process.env.REACT_APP_CODESPACE_NAME) {
  API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
} else if (process.env.NODE_ENV === 'development') {
  // In development prefer a relative `/api` so the React dev server can proxy requests
  // to the Django backend (avoids CORS and websocket issues).
  API_BASE = '/api'
} else if (typeof window !== 'undefined' && window.location && window.location.host) {
  const host = window.location.host
  // match patterns like <codespace>-3000.app.github.dev
  const m = host.match(/^(.*)-3000\.app\.github\.dev$/)
  if (m && m[1]) {
    const codespaceName = m[1]
    API_BASE = `https://${codespaceName}-8000.app.github.dev/api`
  }
}
if (!API_BASE) API_BASE = 'http://127.0.0.1:8000/api'
console.log('React API base:', API_BASE)
// expose for debugging in browser console
window.REACT_API_BASE = API_BASE

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
