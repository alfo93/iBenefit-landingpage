import { useEffect, useMemo, useRef, useState } from "react";
import logo from "./assets/logo.png";
import "./onepager.css";

type SectionId = "home" | "bio" | "contact";

function useActiveSection(ids: SectionId[]) {
  const [active, setActive] = useState<SectionId>("home");
  const refs = useRef<Record<SectionId, HTMLElement | null>>({
    home: null,
    bio: null,
    contact: null,
  });

  useEffect(() => {
    const els = ids.map((id) => refs.current[id]).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // choose the most visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id as SectionId);
      },
      { threshold: [0.35, 0.55, 0.75] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  return { active, refs };
}

export default function IBenefitOnePager() {
  const ids = useMemo(() => ["home", "bio", "contact"] as SectionId[], []);
  const { active, refs } = useActiveSection(ids);

  const scrollTo = (id: SectionId) => {
    refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page">
      {/* Minimal floating nav (mobile-friendly) */}
      <div className="navPills" role="navigation" aria-label="Section navigation">
        <button
          className={`pill ${active === "home" ? "pillActive" : ""}`}
          onClick={() => scrollTo("home")}
        >
          Home
        </button>
        <button
          className={`pill ${active === "bio" ? "pillActive" : ""}`}
          onClick={() => scrollTo("bio")}
        >
          Bio
        </button>
        <button
          className={`pill ${active === "contact" ? "pillActive" : ""}`}
          onClick={() => scrollTo("contact")}
        >
          Contact
        </button>
      </div>

      <main className="snap">
        {/* 1) Logo */}
        <section
            id="home"
            ref={(el) => {
              refs.current.home = el;
            }}
            className="panel panelHome"
            >
            <div className="heroFull">
                <img className="logoFull" src={logo} alt="IBENEFIT logo" />
                <div className="heroTagline">MEASURE. IMPROVE. DOMINATE.</div>
                <div className="heroHint">Scroll ↓</div>
            </div>
        </section>

        {/* 2) Bio */}
       <section id="bio" ref={(el) => { refs.current.bio = el; }} className="panel panelBio">
        <div className="textBlock animateIn">
          <h2 className="title">Bio</h2>
          <p className="lead">
            IBenefit is the world's first vertical marketplace dedicated to those who want to live with intention, physical power, and mental clarity.
          </p>
          <p>
            In a world where healthcare systems are increasingly reactive and fragmented, we take a different approach — one that is proactive, data-driven, and deeply personal. We curate the best protocols, hi-tech tools, and scientifically validated biohacking strategies to help you monitor, optimize, and take full control of your health.
          </p>
          <p>
            We train <strong>IBenefit Coaches</strong> — highly qualified professionals who guide athletes, entrepreneurs, and organizations toward a high-performance lifestyle, where wellbeing, productivity, and longevity reinforce each other.
          </p>
          <p>
            Our ecosystem brings together technology, AI, and human expertise to anticipate risks, elevate energy, and redefine what it means to feel your best.
          </p>
          <p className="muted">
            <em>Because living longer isn't enough. It's time to live better. Starting now. For good.</em>
          </p>
        </div>
      </section>

        {/* 3) Contacts */}
        <section
          id="contact"
          ref={(el) => {
            refs.current.contact = el;
          }}
          className="panel panelContact"
        >
          <div className="panelInner">
            <div className="contactGrid animateIn">
              <div className="contactCard">
                <h2>Contact</h2>
                <p className="muted">Examples — replace with your real info.</p>
              </div>

              <a className="contactCard linkCard" href="mailto:ibenefit.customercare@outlook.com">
                <div className="label">Email</div>
                <div className="value">ibenefit.customercare@outlook.com</div>
              </a>

              <a className="contactCard linkCard" href="tel:+393406249133">
                <div className="label">Phone</div>
                <div className="value">+39 340 624 9133</div>
              </a>

              <a className="contactCard linkCard" href="https://www.instagram.com/ibenefit_official/" onClick={(e) => e.preventDefault()}>
                <div className="label">Instagram</div>
                <div className="value">@ibenefit_official</div>
              </a>

              <a className="contactCard linkCard" href="#" onClick={(e) => e.preventDefault()}>
                <div className="label">LinkedIn</div>
                <div className="value">IBenefit</div>
              </a>

              <div className="contactCard">
                <div className="label">Location</div>
                <div className="value">Bologna, Italy</div>
              </div>
            </div>
          </div>

          <footer className="footer">
            © {new Date().getFullYear()} IBenefit
          </footer>
        </section>
      </main>
    </div>
  );
}