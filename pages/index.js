
import Link from "next/link";

export default function Home() {
  return (
    <div className="body">
      <div className="card">
        <h1>Bem-vindo ao Bingo do Blindado</h1>
        <Link href="/simulador">
          <button className="button">🎯 CRIAR SORTEIO</button>
        </Link>
      </div>
    </div>
  );
}

