import LoginForm from '../pages/loginForm'
import Dashboard from '../pages/Dashboard.jsx'
import { ThemeProvider } from '../context/themecontext.js'
import { useState, useEffect } from 'react'

export default function MainLayout() {
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window === 'undefined') {
      return 'dark'
    }

    const storedTheme = localStorage.getItem('themeMode')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  // set light mode
  const lightTheme = () => {
    setThemeMode('light')
    localStorage.setItem('themeMode', 'light')
  }

  // set dark mode
  const darkTheme = () => {
    setThemeMode('dark')
    localStorage.setItem('themeMode', 'dark')
  }

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(themeMode)
    root.style.colorScheme = themeMode
  }, [themeMode])
  return (
    <>
      <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
        <Dashboard />
        <LoginForm />
      </ThemeProvider>
    </>
  )
}
