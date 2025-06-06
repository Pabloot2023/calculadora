"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [justCalculated, setJustCalculated] = useState(false);

  // Ref para mantener el valor actualizado sincrónicamente
  const inputRef = useRef("");
  inputRef.current = input; // siempre sincronizamos el ref con el estado

  const appendValue = (value: string) => {
    if (justCalculated) {
      if ("+-*/".includes(value)) {
        // Continúa la expresión con operador
        setInput((prev) => {
          const newVal = prev + value;
          inputRef.current = newVal;
          return newVal;
        });
      } else {
        // Reinicia con nuevo valor (número o punto)
        setInput(value);
        inputRef.current = value;
      }
      setJustCalculated(false);
    } else {
      setInput((prev) => {
        const newVal = prev + value;
        inputRef.current = newVal;
        return newVal;
      });
    }
  };

  const calculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(inputRef.current);
      setInput(String(result));
      inputRef.current = String(result);
      setJustCalculated(true);
    } catch {
      setInput("Error");
      inputRef.current = "";
      setJustCalculated(false);
    }
  };

  const clear = () => {
    setInput("");
    inputRef.current = "";
    setJustCalculated(false);
  };

  // Backspace con lógica de borrar todo si justo se acaba de calcular
  const backspace = () => {
    if (justCalculated) {
      clear();
    } else {
      setInput((prev) => {
        const newVal = prev.slice(0, -1);
        inputRef.current = newVal;
        return newVal;
      });
    }
  };

  // 🎹 Soporte para teclado físico
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const allowedKeys = "0123456789+-*/.";

      if (allowedKeys.includes(e.key)) {
        appendValue(e.key);
      } else if (e.key === "Enter") {
        e.preventDefault();
        calculate();
      } else if (
        e.key === "Escape" ||
        e.key.toLowerCase() === "c" ||
        e.key === "Delete"
      ) {
        clear();
      } else if (e.key === "Backspace") {
        backspace();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [justCalculated]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Calculadora con Continuación Mejorada</h1>

      {/* Caja gris completa */}
      <div className="bg-gray-500 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        {/* Display superior */}
        <input
          type="text"
          className="mb-6 p-4 w-full rounded border border-gray-400 text-2xl bg-white text-black text-right"
          value={input}
          readOnly
        />

        {/* Botones: números y operadores */}
        <div className="flex space-x-4 w-full">
          {/* Números en grilla 3x4 */}
          <div className="grid grid-cols-3 gap-4 flex-[3]">
            {[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "Back",
              "0",
              ".",
            ].map((v, i) =>
              v === "Back" ? (
                <button
                  key={v}
                  onClick={backspace}
                  className="bg-white text-black p-4 rounded shadow text-xl hover:bg-gray-200"
                  aria-label="Backspace"
                >
                  ←
                </button>
              ) : (
                <button
                  key={v}
                  onClick={() => appendValue(v)}
                  className="bg-white text-black p-4 rounded shadow text-xl hover:bg-gray-200"
                >
                  {v}
                </button>
              )
            )}
          </div>

          {/* Operadores */}
          <div className="flex flex-col space-y-4 flex-[1]">
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
                } text-white p-4 rounded shadow text-xl`}
              >
                {op}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
