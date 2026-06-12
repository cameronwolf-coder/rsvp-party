"use client";

import { useState } from "react";
import SuccessState from "./SuccessState";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (name.trim().length < 2) {
      setErrorMsg("Please enter your name (at least 2 characters).");
      return;
    }

    setErrorMsg("");
    setStatus("loading");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), attending }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Try again?");
    }
  }

  if (status === "success") {
    return <SuccessState name={name} attending={attending} />;
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form} noValidate>
      <div style={styles.field}>
        <label htmlFor="name" style={styles.label}>
          Your name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errorMsg) setErrorMsg("");
          }}
          placeholder="First name is fine"
          style={styles.input}
          autoComplete="name"
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Are you coming?</label>
        <div style={styles.toggle}>
          <button
            type="button"
            onClick={() => setAttending(true)}
            style={{
              ...styles.toggleBtn,
              ...(attending ? styles.toggleBtnActive : {}),
            }}
          >
            🥂 Going
          </button>
          <button
            type="button"
            onClick={() => setAttending(false)}
            style={{
              ...styles.toggleBtn,
              ...(!attending ? styles.toggleBtnActiveOut : {}),
            }}
          >
            🙅 Can't make it
          </button>
        </div>
      </div>

      {errorMsg && <p style={styles.error}>{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          ...styles.submitBtn,
          ...(status === "loading" ? styles.submitBtnDisabled : {}),
        }}
      >
        {status === "loading" ? (
          <span style={styles.spinner}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" strokeDasharray="22" strokeDashoffset="8" />
            </svg>
          </span>
        ) : (
          "RSVP"
        )}
      </button>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: { display: "flex", flexDirection: "column", gap: 20 },
  field: { display: "flex", flexDirection: "column", gap: 8 },
  label: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--muted)",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10,
    color: "var(--text)",
    fontSize: 15,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  toggle: {
    display: "flex",
    gap: 8,
  },
  toggleBtn: {
    flex: 1,
    padding: "10px 8px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10,
    color: "var(--muted)",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  toggleBtnActive: {
    background: "var(--gold)",
    borderColor: "var(--gold)",
    color: "#0f0f1a",
    fontWeight: 600,
  },
  toggleBtnActiveOut: {
    background: "rgba(248, 113, 113, 0.15)",
    borderColor: "rgba(248, 113, 113, 0.4)",
    color: "var(--error)",
    fontWeight: 600,
  },
  error: {
    fontSize: 13,
    color: "var(--error)",
    marginTop: -8,
  },
  submitBtn: {
    width: "100%",
    padding: "14px",
    background: "var(--gold)",
    border: "none",
    borderRadius: 10,
    color: "#0f0f1a",
    fontSize: 16,
    fontWeight: 700,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    letterSpacing: "0.04em",
    transition: "background 0.2s, transform 0.1s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  submitBtnDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  spinner: {
    display: "flex",
    animation: "spin 0.8s linear infinite",
  },
};
