import { useEffect, useMemo, useRef, useState } from "react";
import logo from "./assets/logo.png";
import "./onepager.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { supabase } from "./supabaseClient";
import { translations, type Lang } from "./translations";

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

  const [lang, setLang] = useState<Lang>("it");
  const t = translations[lang];

  const [formData, setFormData] = useState({ name: "", surname: "", email: "", affiliation: "", phone: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    const { error } = await supabase.from("leads").insert([formData]);

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
        <button className={`pill ${active === "home" ? "pillActive" : ""}`} onClick={() => scrollTo("home")}>{t.nav.home}</button>
        <button className={`pill ${active === "bio" ? "pillActive" : ""}`} onClick={() => scrollTo("bio")}>{t.nav.bio}</button>
        <button className={`pill ${active === "about" ? "pillActive" : ""}`} onClick={() => scrollTo("about")}>{t.nav.about}</button>
        <button className={`pill ${active === "contact" ? "pillActive" : ""}`} onClick={() => scrollTo("contact")}>{t.nav.contact}</button>
        <button
          className="pill langSwitcher"
          onClick={() => setLang(lang === "en" ? "it" : "en")}
        >
          {lang === "en" ? "🇮🇹 IT" : "🇬🇧 EN"}
        </button>
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
            <div className="heroTagline">{t.hero.tagline}</div>
            <div className="heroHint">{t.hero.hint}</div>
          </div>
        </section>

        {/* 2) Bio */}
        <section
          id="bio"
          ref={(el) => { refs.current.bio = el; }}
          className="panel panelBio"
        >
          <div className="bioContent animateIn">
            <h2>{t.bio.title}</h2>
            <p>{t.bio.p1}</p>
            <p>{t.bio.p2}</p>
            <p className="muted"><em>{t.bio.quote}</em></p>
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
                <h2>IBenefit</h2>
                <p className="muted"><em>{t.about.quote}</em></p>
              </div>

              <a className="contactCard linkCard" href="mailto:ibenefit.customercare@outlook.com">
                <div className="label">{t.about.email}</div>
                <div className="value">ibenefit.customercare@outlook.com</div>
              </a>

              <a className="contactCard linkCard" href="tel:+393406249133">
                <div className="label">{t.about.phone}</div>
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
                <div className="label">{t.about.locationLabel}</div>
                <div className="value">{t.about.location}</div>
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
            <h2>{t.contact.title}</h2>
            <p className="muted">{t.contact.subtitle}</p>

            <form className="joinForm" onSubmit={handleSubmit}>
              <div className="formRow">
                <div className="formGroup">
                  <label className="formLabel">{t.contact.name}</label>
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
                  <label className="formLabel">{t.contact.surname}</label>
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
                <label className="formLabel">{t.contact.email}</label>
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
                <label className="formLabel">{t.contact.phone}</label>
                <PhoneInput
                  className="phoneInput"
                  placeholder="+39 340 624 9133"
                  value={formData.phone}
                  onChange={(val) => setFormData({ ...formData, phone: val ?? "" })}
                  defaultCountry="IT"
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">{t.contact.affiliation}</label>
                <input
                  className="formInput"
                  type="text"
                  placeholder="Company, university, or role..."
                  value={formData.affiliation}
                  onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                />
              </div>

              {formStatus === "success" && (
                <p style={{ color: "#4ade80" }}>{t.contact.success}</p>
              )}
              {formStatus === "error" && (
                <p style={{ color: "#f87171" }}>{t.contact.error}</p>
              )}

              <button className="formBtn" type="submit" disabled={formStatus === "loading"}>
                {formStatus === "loading" ? t.contact.sending : t.contact.send}
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