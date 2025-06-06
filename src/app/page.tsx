"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  const appendValue = (value: string) => {
    setInput((prev) => prev + value);
  };

  const calculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(input);
      setInput(String(result));
    } catch {
      setInput("Error");
    }
  };

  const clear = () => {
    setInput("");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Calculadora Versión 5</h1>

      {/* Contenedor gris rectangular */}
      <div className="bg-gray-500 p-6 rounded-lg shadow-lg">
        {/* Display alineado con la grilla */}
        <input
          type="text"
          className="mb-6 p-4 w-full rounded border border-gray-400 text-2xl bg-white text-black text-right"
          value={input}
          readOnly
        />

        {/* Grilla total de botones: 4 columnas (3 números, 1 operadores) */}
        <div className="grid grid-cols-4 gap-4">
          {/* Botones numéricos y punto */}
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].map((v, i) => (
            <button
              key={v}
              onClick={() => appendValue(v)}
              className="bg-white text-black p-4 rounded shadow text-xl hover:bg-gray-200 col-span-1"
            >
              {v}
            </button>
          ))}

          {/* Espacio vacío para alinear el punto debajo del 0 */}
          <div />

          {/* Botones de operaciones */}
          {["+", "-", "*", "/", "C", "="].map((op) => (
            <button
              key={op}
              onClick={() => {
                if (op === "C") clear();
                else if (op === "=") calculate();
                else appendValue(op);
              }}
              className={`${
                op === "="
                  ? "bg-green-600 hover:bg-green-700"
                  : op === "C"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white p-4 rounded shadow text-xl col-span-1`}
            >
              {op}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
