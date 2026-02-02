import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ExperienceProvider } from "./context/ExperienceContext";
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
<ExperienceProvider>
<App />
</ExperienceProvider>
</BrowserRouter>
</StrictMode>
)
