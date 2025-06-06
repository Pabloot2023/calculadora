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
      <h1 className="text-3xl font-bold mb-8">Calculadora Mejorada con Fondo y Números Negros</h1>

      {/* Fondo gris rectangular */}
      <div className="bg-gray-500 p-6 rounded-lg shadow-lg flex space-x-6">
        {/* Display */}
        <input
          type="text"
          className="mb-6 p-4 text-right w-72 rounded border border-gray-400 text-2xl bg-white text-black"
          value={input}
          readOnly
        />

        <div className="flex space-x-4">
          {/* Números y punto en grilla 3x4 */}
          <div className="grid grid-cols-3 gap-4">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].map((v) => (
              <button
                key={v}
                onClick={() => appendValue(v)}
                className="bg-white text-black p-4 rounded shadow text-xl hover:bg-gray-200"
              >
                {v}
              </button>
            ))}
          </div>

          {/* Botones de operaciones en columna */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => appendValue("+")}
              className="bg-blue-500 text-white p-4 rounded shadow text-xl hover:bg-blue-600"
            >
              +
            </button>
            <button
              onClick={() => appendValue("-")}
              className="bg-blue-500 text-white p-4 rounded shadow text-xl hover:bg-blue-600"
            >
              -
            </button>
            <button
              onClick={() => appendValue("*")}
              className="bg-blue-500 text-white p-4 rounded shadow text-xl hover:bg-blue-600"
            >
              *
            </button>
            <button
              onClick={() => appendValue("/")}
              className="bg-blue-500 text-white p-4 rounded shadow text-xl hover:bg-blue-600"
            >
              /
            </button>
            <button
              onClick={clear}
              className="bg-red-500 text-white p-4 rounded shadow text-xl hover:bg-red-600"
            >
              C
            </button>
            <button
              onClick={calculate}
              className="bg-green-600 text-white p-4 rounded shadow text-xl hover:bg-green-700"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
