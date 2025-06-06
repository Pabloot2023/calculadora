"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const calculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  const clear = () => setInput("");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Calculadora</h1>
      <div>
        <input
          type="text"
          value={input}
          readOnly
          style={{ fontSize: "2rem", width: "300px", textAlign: "right" }}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((val) => (
          <button
            key={val}
            onClick={() => (val === "=" ? calculate() : handleClick(val))}
            style={{
              fontSize: "1.5rem",
              width: "60px",
              height: "60px",
              margin: "5px"
            }}
          >
            {val}
          </button>
        ))}
        <div>
          <button
            onClick={clear}
            style={{
              fontSize: "1.2rem",
              padding: "10px 30px",
              marginTop: "10px",
              backgroundColor: "#f44336",
              color: "white"
            }}
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
}
