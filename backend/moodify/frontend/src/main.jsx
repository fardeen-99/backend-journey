import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ContextProvider } from './features/auth/auth.context.jsx'
import { ExpressionProvider } from './features/Expression/expression.context.jsx'

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <ExpressionProvider>
      <App />
    </ExpressionProvider>
  </ContextProvider>
)
