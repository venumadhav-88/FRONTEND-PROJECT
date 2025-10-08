import React from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import App from './App'
import './index.css'
import { DataProvider } from './context/DataContext'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#7c3aed' },
    secondary: { main: '#06b6d4' },
    background: { default: '#071026', paper: '#071026' },
  },
  typography: {
    fontFamily: `Inter, Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
  },
  components: {
    MuiButton: {
      defaultProps: { variant: 'contained', disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 12, textTransform: 'none' }
      }
    },
    MuiPaper: {
      styleOverrides: { root: { background: 'transparent' } }
    }
  },
})

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DataProvider>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
