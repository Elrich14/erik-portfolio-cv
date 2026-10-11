import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './theme/ThemeProvider'
import { LanguageProvider } from './i18n/LanguageProvider'
import { ConductorProvider } from './conductor/ConductorProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <ConductorProvider>
          <App />
        </ConductorProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
