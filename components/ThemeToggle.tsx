'use client';

import { useEffect, useState } from "react";

const themes = ["theme-light", "theme-gray", "theme-black"] as const;
type Theme = typeof themes[number];

export default function ThemeToggle() {
  const [themeIndex, setThemeIndex] = useState(0);

  useEffect(() => {
    document.body.classList.remove(...themes);
    document.body.classList.add(themes[themeIndex]);
  }, [themeIndex]);

  const toggleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  // Configuración visual por tema
  const theme = themes[themeIndex];
  const config = {
    "theme-light": {
      emoji: "☀️",
      bg: "bg-yellow-200",
      text: "text-yellow-800",
      hover: "hover:bg-yellow-300"
    },
    "theme-gray": {
      emoji: "☁️",
      bg: "bg-gray-700",
      text: "text-white",
      hover: "hover:bg-gray-600"
    },
    "theme-black": {
      emoji: "🌙",
      bg: "bg-zinc-900",
      text: "text-white",
      hover: "hover:bg-gray-800"
    }
  }[theme];

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-50 w-12 h-12 flex items-center justify-center rounded-full shadow transition text-2xl ${config.bg} ${config.text} ${config.hover}`}
      aria-label="Cambiar tema"
    >
      {config.emoji}
    </button>
  );
}
