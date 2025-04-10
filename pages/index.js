import styles from "../styles/style.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.body}>
      <div className={styles.card}>
        <h1 className={styles.title}>Bem-vindo ao Bingo do Blindado</h1>
        <Link href="/simulador">
          <button className={styles.button}>🎯 Jogar</button>
        </Link>
      </div>
    </div>
  );
}
