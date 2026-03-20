import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { ChatProvider } from './features/chats/chat.context.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ChatProvider>
      <App />
    </ChatProvider>
  </AuthProvider>

)
