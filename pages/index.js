// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f4f4f4', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      <h1 style={{ color: '#17530b', fontSize: '2.5rem' }}>🎉 Bem-vindo ao Dashboard do Bingo!</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
        Acompanhe as metas, prêmios e sorteios dos participantes.
      </p>

      <Link href="/simulador">
        <a style={{
          backgroundColor: '#17530b',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '1.1rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          Acessar Simulador de Bingo
        </a>
      </Link>
    </div>
  );
}
