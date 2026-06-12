interface Props {
  name: string;
  attending: boolean;
}

export default function SuccessState({ name, attending }: Props) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.checkmark}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="19" stroke="var(--gold)" strokeWidth="2" />
          <path
            d="M12 20.5L17.5 26L28 14"
            stroke="var(--gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2 style={styles.heading}>
        {attending ? "You're on the list!" : "Bummer — noted."}
      </h2>

      <p style={styles.message}>
        {attending
          ? `See you Saturday, ${name.split(" ")[0]}! I'll send a heads-up before the day.`
          : `No worries — I'll keep you in the loop for next time.`}
      </p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 16,
    animation: "fadeSlideUp 0.4s ease-out",
  },
  checkmark: {
    animation: "popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 26,
    fontWeight: 700,
    color: "var(--gold)",
  },
  message: {
    fontSize: 15,
    color: "var(--muted)",
    lineHeight: 1.6,
    maxWidth: 300,
  },
};
