'use client';

import { useEffect, useState } from "react";

const themes = ["theme-light", "theme-gray", "theme-black"];

export default function ThemeToggle() {
  const [themeIndex, setThemeIndex] = useState(0);

  useEffect(() => {
    document.body.classList.remove(...themes);
    document.body.classList.add(themes[themeIndex]);
  }, [themeIndex]);

  const toggleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-yellow-200 text-yellow-800 text-2xl shadow hover:bg-yellow-300 transition"
      aria-label="Cambiar tema"
    >
      ☀️
    </button>
  );
}
