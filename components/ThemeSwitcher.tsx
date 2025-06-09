"use client";

import { useEffect, useState } from "react";

const themes = ["theme-light", "theme-gray", "theme-dark"] as const;
type Theme = typeof themes[number];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("theme-light");

  // Cargar tema guardado o sistema al inicio
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme && themes.includes(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    } else {
      // Detectar preferencia sistema (claro/oscuro)
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const defaultTheme = prefersDark ? "theme-dark" : "theme-light";
      setTheme(defaultTheme);
      document.documentElement.className = defaultTheme;
    }
  }, []);

  // Cambiar tema y guardar en localStorage
  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex space-x-2">
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => changeTheme(t)}
          className={`px-4 py-2 rounded ${
            theme === t ? "bg-blue-600 text-white" : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
          aria-label={`Set ${t} theme`}
        >
          {t === "theme-light" && "Claro"}
          {t === "theme-gray" && "Gris"}
          {t === "theme-dark" && "Oscuro"}
        </button>
      ))}
    </div>
  );
}
