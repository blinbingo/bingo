import React, { useState, useEffect } from "react";
import "../styles/style.css";

export default function Simulador() {
  const [cartelas, setCartelas] = useState([]);
  const [quantidadeCartelas, setQuantidadeCartelas] = useState(0);

  const gerarCartelas = () => {
    const novasCartelas = [];
    for (let i = 0; i < quantidadeCartelas; i++) {
      const numeros = [];
      while (numeros.length < 24) {
        const n = Math.floor(Math.random() * 60) + 1;
        if (!numeros.includes(n)) numeros.push(n);
      }
      novasCartelas.push(numeros);
    }
    setCartelas(novasCartelas);
  };

  return (
    <div className="body" style={{ flexDirection: "column" }}>
      {cartelas.length === 0 ? (
        <div className="card">
          <h2>Quantas cartelas deseja gerar?</h2>
          <input
            type="number"
            min="1"
            value={quantidadeCartelas}
            onChange={(e) => setQuantidadeCartelas(e.target.value)}
          />
          <br />
          <button className="generate-button" onClick={gerarCartelas}>
            🎯 Gerar Cartelas
          </button>
        </div>
      ) : (
        <div>
          {/* Aqui continua o restante do simulador */}
        </div>
      )}
    </div>
  );
}

