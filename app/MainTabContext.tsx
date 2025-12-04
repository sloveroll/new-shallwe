// app/MainTabContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type MainTab = "home" | "youtube" | "instagram" | "blog";

type MainTabContextType = {
  mainTab: MainTab;
  setMainTab: (tab: MainTab) => void;
};

const MainTabContext = createContext<MainTabContextType | undefined>(
  undefined
);

export function MainTabProvider({ children }: { children: ReactNode }) {
  const [mainTab, setMainTab] = useState<MainTab>("home");

  return (
    <MainTabContext.Provider value={{ mainTab, setMainTab }}>
      {children}
    </MainTabContext.Provider>
  );
}

export function useMainTab() {
  const ctx = useContext(MainTabContext);
  if (!ctx) {
    throw new Error("useMainTab must be used within MainTabProvider");
  }
  return ctx;
}
