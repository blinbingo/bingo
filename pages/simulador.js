import { useState, useEffect } from "react";
import styles from "../styles/style.module.css";
import * as XLSX from "xlsx";

export default function Simulador() {
  const [quantidadeCartelas, setQuantidadeCartelas] = useState(1);
  const [cartelas, setCartelas] = useState([]);
  const [bolasSorteadas, setBolasSorteadas] = useState([]);

  const gerarCartelas = () => {
    const novasCartelas = [];
    for (let i = 0; i < quantidadeCartelas; i++) {
      const numeros = new Set();
      while (numeros.size < 24) {
        numeros.add(Math.floor(Math.random() * 75) + 1);
      }
      novasCartelas.push({
        codigo: `C${i.toString().padStart(3, "0")}`,
        numeros: Array.from(numeros),
      });
    }
    setCartelas(novasCartelas);
  };

  const exportarExcel = () => {
    const wb = XLSX.utils.book_new();
    const wsData = cartelas.map((cartela) => cartela.numeros);
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Cartelas");
    XLSX.writeFile(wb, "cartelas.xlsx");
  };

  return (
    <div className={styles.body} style={{ flexDirection: "column" }}>
      {cartelas.length === 0 ? (
        <div className={styles.card}>
          <h2>Quantas cartelas deseja gerar?</h2>
          <input
            type="number"
            min="1"
            value={quantidadeCartelas}
            onChange={(e) => setQuantidadeCartelas(e.target.value)}
            className={styles.input}
          />
          <br />
          <button className={styles.button} onClick={gerarCartelas}>
            🎯 Gerar Cartelas
          </button>
        </div>
      ) : (
        <>
          <h2 style={{ marginBottom: "1rem" }}>Cartelas Geradas: {cartelas.length}</h2>
          <button className={styles.button} onClick={exportarExcel}>
            📁 Exportar Excel
          </button>
        </>
      )}
    </div>
  );
}


