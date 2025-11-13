"use client"

import { createContext, useContext, type ReactNode } from "react"

type ThemeContextType = {
  theme: "dark"
}

const ThemeContext = createContext<ThemeContextType>({ theme: "dark" })

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeContext.Provider value={{ theme: "dark" }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
