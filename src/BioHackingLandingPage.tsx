import React, { useMemo, useState } from "react";

type CSS = React.CSSProperties;

const styles: Record<string, CSS> = {
  page: {
    minHeight: "100vh",
    background: "#0b0f17",
    color: "#eaf0ff",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, Arial, sans-serif',
  },
  container: { maxWidth: 1100, margin: "0 auto", padding: "24px 18px" },

  nav: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    backdropFilter: "blur(10px)",
    background: "rgba(11,15,23,0.7)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  navRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  brandMark: {
    width: 36,
    height: 36,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    display: "grid",
    placeItems: "center",
    fontWeight: 700,
  },
  brandTextTop: { fontWeight: 700, lineHeight: 1.1 },
  brandTextBottom: { fontSize: 12, opacity: 0.7 },

  navLinks: { display: "flex", gap: 16, alignItems: "center" },
  navLink: { fontSize: 14, opacity: 0.8, color: "inherit", textDecoration: "none" },

  hero: { padding: "44px 0 18px" },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 24,
    alignItems: "center",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    fontSize: 12,
    opacity: 0.9,
  },
  h1: { fontSize: 44, lineHeight: 1.1, margin: "14px 0 10px", letterSpacing: -0.5 },
  sub: { fontSize: 16, opacity: 0.8, lineHeight: 1.6, marginBottom: 16 },

  pills: { display: "flex", flexWrap: "wrap", gap: 10, margin: "18px 0 22px" },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.03)",
    fontSize: 13,
    opacity: 0.95,
  },

  ctaRow: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  input: {
    width: 320,
    maxWidth: "100%",
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.04)",
    color: "#eaf0ff",
    outline: "none",
  },
  btn: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "#ffffff",
    color: "#0b0f17",
    fontWeight: 700,
    cursor: "pointer",
  },
  btnGhost: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "transparent",
    color: "#eaf0ff",
    fontWeight: 600,
    cursor: "pointer",
  },

  card: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },
  cardPad: { padding: 18 },
  cardTitle: { fontWeight: 700, marginBottom: 6 },
  cardSub: { fontSize: 12, opacity: 0.75 },

  steps: { padding: "26px 0 8px" },
  sectionTitle: { fontSize: 26, margin: "0 0 8px" },
  sectionSub: { opacity: 0.75, margin: "0 0 18px", lineHeight: 1.6 },

  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 14,
  },
  smallCard: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.03)",
    padding: 16,
  },
  smallCardH: { fontWeight: 700, marginBottom: 6 },
  smallCardP: { fontSize: 13, opacity: 0.75, lineHeight: 1.5 },

  footer: {
    marginTop: 28,
    padding: "22px 0 36px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    opacity: 0.8,
    fontSize: 12,
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
  },
};

function useIsNarrow() {
  const [narrow, setNarrow] = useState(false);
  React.useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 900);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return narrow;
}

export default function BioHackingLandingPage() {
  const [email, setEmail] = useState("");
  const narrow = useIsNarrow();

  const pills = useMemo(() => ["Sleep", "Focus", "Recovery", "Performance"], []);

  const heroGridStyle: CSS = narrow
    ? { ...styles.heroGrid, gridTemplateColumns: "1fr" }
    : styles.heroGrid;

  const grid3Style: CSS = narrow
    ? { ...styles.grid3, gridTemplateColumns: "1fr" }
    : styles.grid3;

  return (
    <div style={styles.page}>
      {/* NAV */}
      <header style={styles.nav}>
        <div style={styles.container}>
          <div style={styles.navRow}>
            <div style={styles.brand}>
              <div style={styles.brandMark}>PS</div>
              <div>
                <div style={styles.brandTextTop}>PulseStack</div>
                <div style={styles.brandTextBottom}>Biohacking OS</div>
              </div>
            </div>

            {!narrow && (
              <nav style={styles.navLinks}>
                <a style={styles.navLink} href="#how">
                  How it works
                </a>
                <a style={styles.navLink} href="#stack">
                  Stack
                </a>
                <a style={styles.navLink} href="#pricing">
                  Pricing
                </a>
              </nav>
            )}

            <div style={{ display: "flex", gap: 10 }}>
              {!narrow && <button style={styles.btnGhost}>Log in</button>}
              <button style={styles.btn}>Get early access</button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section style={styles.hero}>
          <div style={styles.container}>
            <div style={heroGridStyle}>
              <div>
                <span style={styles.badge}>Evidence-first • Low friction • Safety guardrails</span>

                <h1 style={styles.h1}>
                  Your daily biohacking plan—
                  <span style={{ opacity: 0.7 }}> personalized, simple, consistent.</span>
                </h1>

                <p style={styles.sub}>
                  PulseStack turns your goals into a weekly protocol: sleep timing, light exposure,
                  training, nutrition, and supplements—guided by your data and constraints.
                </p>

                <div style={styles.pills}>
                  {pills.map((p) => (
                    <span key={p} style={styles.pill}>
                      {p}
                    </span>
                  ))}
                </div>

                <div style={styles.ctaRow}>
                  <input
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    style={styles.btn}
                    onClick={() => alert("Thanks! We'll be in touch.")}
                    disabled={!email.trim()}
                  >
                    Join waitlist →
                  </button>
                </div>

                <p style={{ marginTop: 12, opacity: 0.65, fontSize: 12, lineHeight: 1.5 }}>
                  Not medical advice. Educational only. Consult a clinician for medical decisions.
                </p>
              </div>

              <div>
                <div style={styles.card}>
                  <div style={styles.cardPad}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <div>
                        <div style={styles.cardTitle}>Today’s Protocol</div>
                        <div style={styles.cardSub}>Adaptive plan • v0.9</div>
                      </div>
                      <span style={styles.badge}>Low friction</span>
                    </div>

                    <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                      <div style={styles.smallCard}>
                        <div style={styles.smallCardH}>AM light + walk</div>
                        <div style={styles.smallCardP}>
                          Bright outdoor light within 60 minutes of waking. Pair with nasal breathing.
                        </div>
                      </div>
                      <div style={styles.smallCard}>
                        <div style={styles.smallCardH}>Caffeine window</div>
                        <div style={styles.smallCardP}>
                          Delay caffeine ~90 minutes to reduce crash and protect sleep pressure.
                        </div>
                      </div>
                      <div style={styles.smallCard}>
                        <div style={styles.smallCardH}>Evening wind-down</div>
                        <div style={styles.smallCardP}>
                          Dim lights + simple breath cadence + optional magnesium (if appropriate).
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 12, opacity: 0.7, fontSize: 12 }}>
                  Tip: Once this renders, we can reintroduce Tailwind/shadcn safely if you still want.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW */}
        <section id="how" style={styles.steps}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Turn goals into a protocol—without spreadsheets.</h2>
            <p style={styles.sectionSub}>
              Choose outcomes (sleep, HRV, body composition, cognition). We translate that into a minimal
              plan and iterate every 14 days.
            </p>

            <div style={grid3Style}>
              <div style={styles.smallCard}>
                <div style={styles.smallCardH}>1) Set constraints</div>
                <div style={styles.smallCardP}>Time, budget, diet preferences, what you won’t do.</div>
              </div>
              <div style={styles.smallCard}>
                <div style={styles.smallCardH}>2) Get a weekly plan</div>
                <div style={styles.smallCardP}>Sleep, light, training, nutrition—prioritized.</div>
              </div>
              <div style={styles.smallCard}>
                <div style={styles.smallCardH}>3) Track in minutes</div>
                <div style={styles.smallCardP}>Simple daily check-ins. Keep what works.</div>
              </div>
            </div>
          </div>
        </section>

        {/* STACK */}
        <section id="stack" style={{ padding: "22px 0" }}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>The stack, simplified.</h2>
            <p style={styles.sectionSub}>Start with fundamentals, then add only what’s worth attention.</p>

            <div style={grid3Style}>
              <div style={styles.smallCard}>
                <div style={styles.smallCardH}>Foundation</div>
                <div style={styles.smallCardP}>Wake time, light timing, steps, protein anchor meals.</div>
              </div>
              <div style={styles.smallCard}>
                <div style={styles.smallCardH}>Performance</div>
                <div style={styles.smallCardP}>Strength + zone 2 dosing, readiness cues, deload prompts.</div>
              </div>
              <div style={styles.smallCard}>
                <div style={styles.smallCardH}>Supplements (optional)</div>
                <div style={styles.smallCardP}>Goal-based shortlists with interaction reminders.</div>
              </div>
            </div>

            <div id="pricing" style={{ marginTop: 18, ...styles.card }}>
              <div style={styles.cardPad}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <div>
                    <div style={styles.cardTitle}>Pricing</div>
                    <div style={styles.cardSub}>Simple tiers. Cancel anytime.</div>
                  </div>
                  <span style={styles.badge}>Founder-friendly</span>
                </div>

                <div style={{ marginTop: 12, ...grid3Style }}>
                  <div style={styles.smallCard}>
                    <div style={styles.smallCardH}>Starter • €9/mo</div>
                    <div style={styles.smallCardP}>Weekly plan + daily check-in + education library.</div>
                  </div>
                  <div style={styles.smallCard}>
                    <div style={styles.smallCardH}>Coach • €19/mo</div>
                    <div style={styles.smallCardP}>Adaptive adjustments + guardrails + exports.</div>
                  </div>
                  <div style={styles.smallCard}>
                    <div style={styles.smallCardH}>Lab • €39/mo</div>
                    <div style={styles.smallCardP}>Experiment templates + A/B cycles + deeper tracking.</div>
                  </div>
                </div>

                <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button style={styles.btn}>Join waitlist</button>
                  <button style={styles.btnGhost}>Contact</button>
                </div>
              </div>
            </div>

            <footer style={{ ...styles.container, ...styles.footer }}>
              <span>© {new Date().getFullYear()} PulseStack</span>
              <span>Privacy • Terms • Contact</span>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}