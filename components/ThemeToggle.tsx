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
      className="fixed top-4 right-4 z-50 px-3 py-2 rounded bg-gray-300 text-black hover:bg-gray-400 transition"
    >
      Theme
    </button>
  );
}
