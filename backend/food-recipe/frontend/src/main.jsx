import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ContextProvider } from './features/auth/auth.context.jsx'
import { RecipeProvider } from './features/recipe/recipe.context.jsx'

createRoot(document.getElementById('root')).render(

  <ContextProvider>
    <RecipeProvider>
    <App />

    </RecipeProvider>
  </ContextProvider>
  
)
