"use client";

import { createContext, useContext, useState } from "react";

// ===== Define types for safety =====
export type ThemeType = "wedding" | "funeral" | "anniversary";
export type PhaseType = "invitation" | "memory";
export type RoleType = "owner" | "guest";

interface AppModeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  phase: PhaseType;
  setPhase: (phase: PhaseType) => void;
  role: RoleType;
  setRole: (role: RoleType) => void;
}

// ===== Create Context with proper typing =====
const AppModeContext = createContext<AppModeContextType | undefined>(undefined);

export const AppModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("wedding");
  const [phase, setPhase] = useState<PhaseType>("invitation");
  const [role, setRole] = useState<RoleType>("guest");

  return (
    <AppModeContext.Provider value={{ theme, setTheme, phase, setPhase, role, setRole } as AppModeContextType}>
      {children}
    </AppModeContext.Provider>
  );
};

// ===== Custom Hook =====
export const useAppMode = (): AppModeContextType => {
  const context = useContext(AppModeContext);
  if (!context) throw new Error("useAppMode must be used within AppModeProvider");
  return context;
};
