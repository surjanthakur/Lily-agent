import { createContext, useContext } from 'react'

const SidebarToggleContext = createContext({
  sidebarToggle: true,
  sidebarToggleSwitch: () => {},
})

export const SidebarToggleProvider = SidebarToggleContext.Provider

export function useSidebarSwitch() {
  return useContext(SidebarToggleContext)
}
