import { useEffect, useState } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";

const gerarCartelas = (quantidade) => {
  const cartelas = [];
  for (let i = 0; i < quantidade; i++) {
    const numeros = new Set();
    while (numeros.size < 24) {
      numeros.add(Math.floor(Math.random() * 75) + 1);
    }
    cartelas.push({ codigo: `C${String(i + 1).padStart(3, "0")}`, numeros: [...numeros] });
  }
  return cartelas;
};

export default function Simulador() {
  const [cartelas, setCartelas] = useState([]);
  const [bolasSorteadas, setBolasSorteadas] = useState([]);
  const [quantidadeCartelas, setQuantidadeCartelas] = useState(0);
  const [ranking, setRanking] = useState([]);
  const [sorteando, setSorteando] = useState(false);
  const [premios, setPremios] = useState({});

  const metas = [0.25, 0.5, 0.75, 1];

  const sortearBola = () => {
    const restantes = [];
    for (let i = 1; i <= 75; i++) {
      if (!bolasSorteadas.includes(i)) restantes.push(i);
    }
    if (restantes.length === 0) return null;
    const escolhida = restantes[Math.floor(Math.random() * restantes.length)];
    setBolasSorteadas([...bolasSorteadas, escolhida]);
    return escolhida;
  };

  const iniciarSorteioAte100 = async () => {
    setSorteando(true);
    let atingiu100 = false;
    while (!atingiu100) {
      const bola = sortearBola();
      if (!bola) break;
      await new Promise((r) => setTimeout(r, 10000));
      const novosPremios = verificarPremios([...bolasSorteadas, bola]);
      setPremios(novosPremios);
      atingiu100 = Object.values(novosPremios).some((lista) =>
        lista.some((c) => c.percentual === 100)
      );
    }
    setSorteando(false);
  };

  const verificarPremios = (bolas) => {
    const resultado = {};
    cartelas.forEach((c) => {
      const acertos = c.numeros.filter((n) => bolas.includes(n)).length;
      metas.forEach((meta) => {
        const minimo = Math.ceil(24 * meta);
        if (acertos >= minimo) {
          if (!resultado[meta]) resultado[meta] = [];
          resultado[meta].push({ codigo: c.codigo, percentual: meta * 100 });
        }
      });
    });
    return resultado;
  };

  const gerarRanking = () => {
    const lista = cartelas.map((c) => {
      const faltas = metas.map((meta) => {
        const alvo = Math.ceil(24 * meta);
        const acertos = c.numeros.filter((n) => bolasSorteadas.includes(n)).length;
        return {
          meta,
          faltando: alvo - acertos,
          faltamNumeros: c.numeros.filter((n) => !bolasSorteadas.includes(n)).slice(0, 5),
        };
      });
      return { codigo: c.codigo, progresso: faltas };
    });
    const proximas = lista
      .map((c) => ({
        codigo: c.codigo,
        meta: c.progresso.find((m) => m.faltando > 0),
      }))
      .filter((c) => c.meta)
      .sort((a, b) => a.meta.faltando - b.meta.faltando);
    setRanking(proximas.slice(0, 5));
  };

  const exportarExcel = () => {
    const linhas = cartelas.map((c) => {
      const linha = { Código: c.codigo };
      c.numeros.forEach((n, i) => {
        linha[`N${i + 1}`] = n;
      });
      return linha;
    });
    const ws = XLSX.utils.json_to_sheet(linhas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cartelas");
    XLSX.writeFile(wb, "cartelas.xlsx");
  };

  useEffect(() => {
    if (cartelas.length > 0) gerarRanking();
  }, [bolasSorteadas]);

  return (
    <div className="body" style={{ flexDirection: "column" }}>
      {cartelas.length === 0 ? (
        <div className="card">
          <h2>Quantas cartelas deseja gerar?</h2>
          <input
            type="number"
            value={quantidadeCartelas}
            onChange={(e) => setQuantidadeCartelas(parseInt(e.target.value))}
          />
          <br />
          <button onClick={() => setCartelas(gerarCartelas(quantidadeCartelas))}>
            Gerar Cartelas
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <h2>Bolas Sorteadas</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {bolasSorteadas.map((n, i) => (
                  <div key={i} className="bola">{n}</div>
                ))}
              </div>
              <button className="button" onClick={sortearBola} disabled={sorteando}>
  Sortear Bola
</button>

<button className="button" onClick={iniciarSorteioAte100} disabled={sorteando}>
  Sortear até 100%
</button>

<button className="button" onClick={exportarExcel}>
  Exportar Cartelas
</button>

<Link href="/">
  <button className="button">Voltar ao menu</button>
</Link>

            </div>
            <div style={{ flex: 1 }}>
              <h2>Ranking - Quem está mais perto de ganhar</h2>
              <ul>
                {ranking.map((c, i) => (
                  <li key={i}>
                    {c.codigo} - faltam {c.meta.faltando} números para {c.meta.meta * 100}% (
                    {c.meta.faltamNumeros.join(", ")})
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h2>Cartelas Premiadas</h2>
            {Object.entries(premios).map(([meta, lista], i) => (
              <div key={i}>
                <strong>{meta * 100}%:</strong>{" "}
                {lista.map((c) => c.codigo).join(", ")}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
