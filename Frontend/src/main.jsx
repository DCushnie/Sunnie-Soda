import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './CSS/index.css'
import App from './App.jsx'

const container = document.getElementById('root')

if(!container) {
  throw new Error('Root container missing in index.html')
}

let root = container._reactRoot

if (!root) {
  root = createRoot(container)
  container._reactRoot = root
}

root.render(
  <StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
      
  </StrictMode>,
)
