import RsvpForm from "@/components/RsvpForm";
import PartyDetails from "@/components/PartyDetails";

export default function Home() {
  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <PartyDetails />
        <div style={styles.divider} />
        <RsvpForm />
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    width: "100%",
    maxWidth: 480,
    animation: "fadeSlideUp 0.4s ease-out",
  },
  card: {
    background: "var(--card)",
    border: "1px solid rgba(245, 166, 35, 0.3)",
    borderRadius: "var(--radius)",
    padding: "32px 28px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 60px rgba(245, 166, 35, 0.05)",
  },
  divider: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(245, 166, 35, 0.4), transparent)",
    margin: "28px 0",
  },
};
