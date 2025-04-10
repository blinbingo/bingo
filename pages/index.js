import Link from "next/link";
import "../public/style.css"; // garante que o CSS global seja aplicado

export default function Home() {
  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <h1 style={styles.title}>Bem-vindo ao Bingo do Blindado</h1>
        <Link href="/simulador">
          <button style={styles.button}>🎯 Jogar</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  body: {
    height: "100vh",
    margin: 0,
    background: "linear-gradient(135deg, #14532d, #22c55e)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: "40px",
    borderRadius: "12px",
    border: "3px solid #39FF14", // verde neon
    boxShadow: "0 0 20px #39FF14",
    textAlign: "center",
  },
  title: {
    fontSize: "2em",
    color: "white",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "1em",
    backgroundColor: "#39FF14",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#000",
    transition: "0.3s",
  },
};
