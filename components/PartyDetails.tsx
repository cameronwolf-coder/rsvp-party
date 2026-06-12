export default function PartyDetails() {
  return (
    <div style={styles.wrapper}>
      <p style={styles.eyebrow}>You're invited</p>
      <h1 style={styles.title}>Housewarming<br />& Birthday</h1>

      <div style={styles.details}>
        <div style={styles.detailRow}>
          <span style={styles.detailIcon}>📅</span>
          <div>
            <div style={styles.detailLabel}>When</div>
            <div style={styles.detailValue}>Saturday, TBD</div>
          </div>
        </div>

        <div style={styles.detailRow}>
          <span style={styles.detailIcon}>🕓</span>
          <div>
            <div style={styles.detailLabel}>Time</div>
            <div style={styles.detailValue}>4 PM <span style={styles.muted}>(subject to change)</span></div>
          </div>
        </div>

        <div style={styles.detailRow}>
          <span style={styles.detailIcon}>📍</span>
          <div>
            <div style={styles.detailLabel}>Where</div>
            <div style={styles.detailValue}>84 East Ave Unit 2310</div>
            <div style={styles.detailValue}>Austin, TX 78701</div>
          </div>
        </div>

        <div style={styles.detailRow}>
          <span style={styles.detailIcon}>🍻</span>
          <div>
            <div style={styles.detailLabel}>After</div>
            <div style={styles.detailValue}>Bars on Rainey Street</div>
          </div>
        </div>
      </div>

      <div style={styles.logistics}>
        <p style={styles.logisticsNote}>
          🚗 <strong>Uber/pool recommended</strong> — parking around Rainey is unpredictable.
          No guest parking at the unit.
        </p>
        <p style={styles.logisticsNote}>
          🏙️ Rooftop pool vibes if weather cooperates. Otherwise, we adapt.
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: { display: "flex", flexDirection: "column", gap: 20 },
  eyebrow: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--gold)",
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 36,
    fontWeight: 700,
    lineHeight: 1.15,
    color: "var(--text)",
    marginTop: 4,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    marginTop: 4,
  },
  detailRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
  },
  detailIcon: {
    fontSize: 18,
    width: 24,
    flexShrink: 0,
    marginTop: 2,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: 500,
    color: "var(--text)",
    lineHeight: 1.4,
  },
  muted: {
    color: "var(--muted)",
    fontWeight: 400,
  },
  logistics: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 4,
    padding: "14px 16px",
    background: "rgba(245, 166, 35, 0.06)",
    borderRadius: 10,
    border: "1px solid rgba(245, 166, 35, 0.15)",
  },
  logisticsNote: {
    fontSize: 13,
    color: "var(--muted)",
    lineHeight: 1.5,
  },
};
