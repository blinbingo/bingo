import { useState } from "react";
import styles from "../styles/style.module.css";

export default function Simulador() {
  const [quantidadeCartelas, setQuantidadeCartelas] = useState(0);

  const gerarCartelas = () => {
    // lógica temporária de redirecionamento
    alert(`Gerar ${quantidadeCartelas} cartelas!`);
  };

  return (
    <div className={styles.body}>
      <div className={styles.card}>
        <h2>Quantas cartelas deseja gerar?</h2>
        <input
          type="number"
          min="1"
          value={quantidadeCartelas}
          onChange={(e) => setQuantidadeCartelas(e.target.value)}
          className={styles.inputNeon}
        />
        <br />
        <button className={styles.generateButton} onClick={gerarCartelas}>
          🎯 Gerar Cartelas
        </button>
      </div>
    </div>
  );
}
