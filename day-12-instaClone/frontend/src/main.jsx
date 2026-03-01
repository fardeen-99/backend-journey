import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from './features/auth/auth.context.jsx'
import "./index.css"
import { ProviderPost } from './features/post/post.context.jsx'
createRoot(document.getElementById('root')).render(
<Provider>
<ProviderPost>
  <App />
</ProviderPost>
</Provider>  
)
