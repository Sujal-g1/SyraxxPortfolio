import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ExperienceProvider } from "./context/ExperienceContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
<ExperienceProvider>
<App />
</ExperienceProvider>
</StrictMode>
)
