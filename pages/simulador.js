// pages/simulador.js
// pages/simulador.js
import { useState } from 'react';

const TOTAL_BOLAS = 60;
const METAS = [0.25, 0.5, 0.75, 1];

const gerarCartelas = (quantidade) => {
  return Array.from({ length: quantidade }, (_, id) => {
    const numeros = new Set();
    while (numeros.size < 15) {
      numeros.add(Math.floor(Math.random() * TOTAL_BOLAS) + 1);
    }
    return { id: id + 1, numeros: Array.from(numeros), acertos: 0, premiado: {} };
  });
};

export default function Simulador() {
  const [bolasSorteadas, setBolasSorteadas] = useState([]);
  const [cartelas] = useState(gerarCartelas(10));
  const [premios, setPremios] = useState({});

  const handleClick = (numero) => {
    if (bolasSorteadas.includes(numero)) return;

    const novasBolas = [...bolasSorteadas, numero];
    const novosPremios = { ...premios };

    cartelas.forEach((cartela) => {
      if (!cartela.premiado[100]) {
        const novosAcertos = cartela.numeros.filter((n) => novasBolas.includes(n)).length;
        const porcentagem = novosAcertos / 15;
        cartela.acertos = novosAcertos;

        METAS.forEach((meta) => {
          const metaPercentual = meta * 100;
          if (porcentagem >= meta && !cartela.premiado[metaPercentual]) {
            cartela.premiado[metaPercentual] = true;
            if (!novosPremios[metaPercentual]) {
              novosPremios[metaPercentual] = {
                bola: numero,
                cartelas: [cartela.id],
              };
            } else if (novosPremios[metaPercentual].bola === numero) {
              novosPremios[metaPercentual].cartelas.push(cartela.id);
            }
          }
        });
      }
    });

    setBolasSorteadas(novasBolas);
    setPremios(novosPremios);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <h1 style={{ color: '#17530b', fontSize: '2rem', marginBottom: '1rem' }}>🔢 Simulador de Bingo Manual</h1>
      <p style={{ marginBottom: '20px' }}>Clique nos números abaixo para simular o sorteio manualmente.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px', marginBottom: '30px' }}>
        {Array.from({ length: TOTAL_BOLAS }, (_, i) => {
          const numero = i + 1;
          const sorteado = bolasSorteadas.includes(numero);
          return (
            <button
              key={numero}
              onClick={() => handleClick(numero)}
              disabled={sorteado}
              style={{
                padding: '10px',
                backgroundColor: sorteado ? '#17530b' : '#fff',
                color: sorteado ? '#fff' : '#000',
                border: '1px solid #ccc',
                borderRadius: '8px',
                cursor: sorteado ? 'not-allowed' : 'pointer',
                fontWeight: 'bold'
              }}
            >
              {numero}
            </button>
          );
        })}
      </div>

      <h2 style={{ color: '#17530b', fontSize: '1.5rem', marginBottom: '1rem' }}>🎉 Prêmios desbloqueados</h2>
      {Object.keys(premios).length === 0 && <p>Nenhum prêmio desbloqueado ainda.</p>}
      {Object.entries(premios).map(([meta, { bola, cartelas }]) => (
        <div key={meta} style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '8px', color: '#17530b' }}>🏆 {meta}% - Desbloqueado na bola {bola}</h3>
          <p><strong>Cartelas premiadas:</strong> {cartelas.join(', ')}</p>
          <p><strong>Total de ganhadores:</strong> {cartelas.length}</p>
        </div>
      ))}
    </div>
  );
}

