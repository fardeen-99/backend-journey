import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from './features/auth/auth.context.jsx'
import "./index.css"
createRoot(document.getElementById('root')).render(
<Provider>
  <App />
</Provider>  
)
