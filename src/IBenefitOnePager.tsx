import { useEffect, useMemo, useRef, useState } from "react";
import logo from "./assets/logo.png";
import "./onepager.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type SectionId = "home" | "bio" | "about" | "contact";

function useActiveSection(ids: SectionId[]) {
  const [active, setActive] = useState<SectionId>("home");
  const refs = useRef<Record<SectionId, HTMLElement | null>>({
    home: null,
    bio: null,
    about: null,
    contact: null,
  });

  useEffect(() => {
    const els = ids.map((id) => refs.current[id]).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
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
  const ids = useMemo(() => ["home", "bio", "about", "contact"] as SectionId[], []);
  const { active, refs } = useActiveSection(ids);
  const [phone, setPhone] = useState<string>("");

  const scrollTo = (id: SectionId) => {
    refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page">
      <div className="navPills" role="navigation" aria-label="Section navigation">
        <button className={`pill ${active === "home" ? "pillActive" : ""}`} onClick={() => scrollTo("home")}>Home</button>
        <button className={`pill ${active === "bio" ? "pillActive" : ""}`} onClick={() => scrollTo("bio")}>Bio</button>
        <button className={`pill ${active === "about" ? "pillActive" : ""}`} onClick={() => scrollTo("about")}>About</button>
        <button className={`pill ${active === "contact" ? "pillActive" : ""}`} onClick={() => scrollTo("contact")}>Contact</button>
      </div>

      <main className="snap">
        {/* 1) Home */}
        <section
          id="home"
          ref={(el) => { refs.current.home = el; }}
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
          <div className="bioContent animateIn">
            <h2>Bio</h2>
            <p>IBenefit is the world's first vertical marketplace for biohacking, longevity, and performance optimization.</p>
            <p>We curate the best protocols, hi-tech tools, and IBenefit Coaches to help athletes, entrepreneurs, and organizations live and perform at their peak.</p>
            <p className="muted"><em>Because living longer isn't enough. It's time to live better.</em></p>
          </div>
        </section>

        {/* 3) About */}
        <section
          id="about"
          ref={(el) => { refs.current.about = el; }}
          className="panel panelAbout"
        >
          <div className="panelInner">
            <div className="contactGrid animateIn">
              <div className="contactCard">
                <h2>About</h2>
                <p className="muted">Get in touch with us.</p>
              </div>

              <a className="contactCard linkCard" href="mailto:ibenefit.customercare@outlook.com">
                <div className="label">Email</div>
                <div className="value">ibenefit.customercare@outlook.com</div>
              </a>

              <a className="contactCard linkCard" href="tel:+393406249133">
                <div className="label">Phone</div>
                <div className="value">+39 340 624 9133</div>
              </a>

              <a className="contactCard linkCard" href="https://www.instagram.com/ibenefit_official/" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
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
        </section>

        {/* 4) Contact */}
        <section
          id="contact"
          ref={(el) => { refs.current.contact = el; }}
          className="panel panelContact"
        >
          <div className="textBlock animateIn">
            <h2>Contact</h2>
            <p className="muted">Leave your details and we'll get in touch with you.</p>

            <form className="joinForm" onSubmit={(e) => { e.preventDefault(); alert("Thank you! We'll be in touch soon."); }}>
              <div className="formRow">
                <div className="formGroup">
                  <label className="formLabel">Name</label>
                  <input className="formInput" type="text" placeholder="Mario" required />
                </div>
                <div className="formGroup">
                  <label className="formLabel">Surname</label>
                  <input className="formInput" type="text" placeholder="Rossi" required />
                </div>
              </div>

              <div className="formGroup">
                <label className="formLabel">Email</label>
                <input className="formInput" type="email" placeholder="mario.rossi@email.com" required />
              </div>

              <div className="formGroup">
                <label className="formLabel">Phone</label>
                <PhoneInput
                  className="phoneInput"
                  placeholder="+39 340 624 9133"
                  value={phone}
                  onChange={(val) => setPhone(val ?? "")}
                  defaultCountry="IT"
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">Affiliation</label>
                <input className="formInput" type="text" placeholder="Company, university, or role..." />
              </div>

              <button className="formBtn" type="submit">Send →</button>
            </form>
          </div>

          <footer className="footer">
            © {new Date().getFullYear()} IBenefit
          </footer>
        </section>
      </main>
    </div>
  );
}