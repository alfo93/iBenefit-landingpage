import { useEffect, useMemo, useRef, useState } from "react";
import logo from "./assets/logo.png";
import "./onepager.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { supabase } from "./supabaseClient";

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

  const [formData, setFormData] = useState({ name: "", surname: "", email: "", affiliation: "", phone: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    console.log("Submitting:", formData); // 👈 add this

    const { data, error } = await supabase.from("leads").insert([formData]);

    console.log("Response:", data, error); // 👈 add this
    if (error) {
      console.error(error);
      setFormStatus("error");
    } else {
      setFormStatus("success");
      setFormData({ name: "", surname: "", email: "", affiliation: "", phone: "" });
    }
  };

  const scrollTo = (id: SectionId) => {
    refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page">
      <div className="navPills" role="navigation" aria-label="Section navigation">
        <button className={`pill ${active === "home" ? "pillActive" : ""}`} onClick={() => scrollTo("home")}>Home</button>
        <button className={`pill ${active === "bio" ? "pillActive" : ""}`} onClick={() => scrollTo("bio")}>Mission</button>
        <button className={`pill ${active === "about" ? "pillActive" : ""}`} onClick={() => scrollTo("about")}>About Us</button>
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
            <h2>Mission</h2>
            <p>The human body is capable of far more than most of us ever experience. The problem isn't potential — it's the lack of the right tools, knowledge, and support to unlock it.</p>
            <p>IBenefit is built to change that. We combine scientific research, biohacking strategies, and personalized coaching to help individuals and organizations take control of their health — not just reactively, but proactively.
                We track, we measure, we optimize. From nutrition and recovery to mental performance and longevity, we cover every dimension of what it means to feel and function at your peak.</p>
            <p className="muted"><em>Because living longer isn't enough. It's time to live better.</em></p>
          </div>
        </section>

        {/* 3) About */}
        
        <section
          id="about"
          ref={(el) => { refs.current.about = el; }}
          className="panel panelAbout"
        >
          <h1>About Us</h1>
          <div className="panelInner">
            
            <div className="contactGrid animateIn">
              <div className="contactCard">
                <h2>IBenefit</h2>
                <p className="muted"><em>The best investment you can make is in yourself.</em></p>
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
            <h2>Stay Tuned</h2>
            <p className="muted">Leave your details and we'll get in touch with you.</p>

            <form className="joinForm" onSubmit={handleSubmit}>
            <div className="formRow">
              <div className="formGroup">
                <label className="formLabel">Name</label>
                <input
                  className="formInput"
                  type="text"
                  placeholder="Mario"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="formGroup">
                <label className="formLabel">Surname</label>
                <input
                  className="formInput"
                  type="text"
                  placeholder="Rossi"
                  required
                  value={formData.surname}
                  onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                />
              </div>
            </div>

            <div className="formGroup">
              <label className="formLabel">Email</label>
              <input
                className="formInput"
                type="email"
                placeholder="mario.rossi@email.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="formGroup">
              <label className="formLabel">Phone</label>
              <PhoneInput
                className="phoneInput"
                placeholder="+39 340 624 9133"
                value={formData.phone}
                onChange={(val) => setFormData({ ...formData, phone: val ?? "" })}
                defaultCountry="IT"
              />
            </div>

            <div className="formGroup">
              <label className="formLabel">Affiliation</label>
              <input
                className="formInput"
                type="text"
                placeholder="Company, university, or role..."
                value={formData.affiliation}
                onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
              />
            </div>

            {formStatus === "success" && (
              <p style={{ color: "#4ade80" }}>✓ Thank you! We'll be in touch soon.</p>
            )}
            {formStatus === "error" && (
              <p style={{ color: "#f87171" }}>Something went wrong. Please try again.</p>
            )}

            <button className="formBtn" type="submit" disabled={formStatus === "loading"}>
              {formStatus === "loading" ? "Sending..." : "Send →"}
            </button>
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