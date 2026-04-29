"use client";

import { useEffect, useMemo, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const STORAGE_KEY = "theme";

type ExplicitTheme = "light" | "dark";
type EffectiveTheme = "light" | "dark";

const themeToggleClassName =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-border/80 text-foreground transition-colors duration-200 hover:cursor-pointer hover:border-primary hover:text-primary md:h-auto md:w-auto md:gap-2 md:px-4 md:py-2 md:text-sm";

export default function ThemeToggle() {
  const [explicitTheme, setExplicitTheme] = useState<ExplicitTheme | null>(null);
  const [systemTheme, setSystemTheme] = useState<EffectiveTheme>("light");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    let frameId = 0;

    frameId = requestAnimationFrame(() => {
      const storedTheme = localStorage.getItem(STORAGE_KEY);
      if (storedTheme === "light" || storedTheme === "dark") {
        setExplicitTheme(storedTheme);
      }
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
      setIsReady(true);
    });

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      cancelAnimationFrame(frameId);
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const effectiveTheme = useMemo<EffectiveTheme>(() => {
    return explicitTheme ?? systemTheme;
  }, [explicitTheme, systemTheme]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const root = document.documentElement;
    if (explicitTheme) {
      root.setAttribute("data-theme", explicitTheme);
      root.style.colorScheme = explicitTheme;
      localStorage.setItem(STORAGE_KEY, explicitTheme);
      return;
    }

    root.removeAttribute("data-theme");
    root.style.colorScheme = systemTheme;
    localStorage.removeItem(STORAGE_KEY);
  }, [explicitTheme, isReady, systemTheme]);

  const handleToggle = () => {
    setExplicitTheme((currentTheme) => {
      const baseTheme = currentTheme ?? systemTheme;
      return baseTheme === "dark" ? "light" : "dark";
    });
  };

  const isDark = effectiveTheme === "dark";
  const isInitializing = !isReady;

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={themeToggleClassName}
      aria-label={
        isInitializing
          ? "Loading theme preference"
          : `Switch to ${isDark ? "light" : "dark"} mode`
      }
      aria-busy={isInitializing}
      disabled={isInitializing}
      title={
        isInitializing
          ? "Loading theme"
          : `Theme: ${isDark ? "dark" : "light"} (system by default)`
      }
    >
      {isInitializing ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-foreground/50 border-t-transparent"
          aria-hidden="true"
        />
      ) : isDark ? (
        <FiSun className="theme-icon-rotate h-4 w-4" />
      ) : (
        <FiMoon className="theme-icon-rotate h-4 w-4" />
      )}
      <span className="hidden w-14 text-center md:inline">{isInitializing ? "theme" : isDark ? "light" : "dark"}</span>
    </button>
  );
}