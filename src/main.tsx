import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Page from './App/property_pricing.tsx'
import BuildingProgress from './buildings/building-progress.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Page />
    <BuildingProgress />
  </StrictMode>,
)
