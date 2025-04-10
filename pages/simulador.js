import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import "../styles/style.css";

const gerarCartela = (id) => {
  const numeros = new Set();
  while (numeros.size < 24) {
    numeros.add(Math.floor(Math.random() * 75) + 1);
  }
  return {
    id: `C${id.toString().padStart(3, "0")}`,
    numeros: Array.from(numeros),
    premiada: false,
  };
};

export default function Simulador() {
  const [quantidadeCartelas, setQuantidadeCartelas] = useState(1);
  const [cartelas, setCartelas] = useState([]);
  const [bolasSorteadas, setBolasSorteadas] = useState([]);

  const gerarCartelas = () => {
    const novasCartelas = [];
    for (let i = 0; i < quantidadeCartelas; i++) {
      novasCartelas.push(gerarCartela(i));
    }
    setCartelas(novasCartelas);
  };

  const exportarExcel = () => {
    const wb = XLSX.utils.book_new();
    const data = cartelas.map((cartela) => {
      const row = {};
      cartela.numeros.forEach((num, index) => {
        row[`N${index + 1}`] = num;
      });
      row["ID"] = cartela.id;
      return row;
    });
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Cartelas");
    XLSX.writeFile(wb, "cartelas.xlsx");
  };

  useEffect(() => {
    if (cartelas.length > 0) {
      gerarRanking();
    }
  }, [bolasSorteadas]);

  const gerarRanking = () => {
    // lógica futura do ranking
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
            className="input-neon"
          />
          <br />
          <button className="generate-button" onClick={gerarCartelas}>
            🎟️ Gerar Cartelas
          </button>
        </div>
      ) : (
        <div>
          {/* Conteúdo do simulador após geração das cartelas */}
        </div>
      )}
    </div>
  );
}

