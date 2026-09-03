import { createContext, useContext } from 'react'

// create context
const SidebarToggleContext = createContext({
  sidebarToggle: true,
  sidebarToggleSwitch: () => {},
})

// create context provider between multiple components
export const SidebarToggleProvider = SidebarToggleContext.Provider

export function useSidebarSwitch() {
  return useContext(SidebarToggleContext)
}
