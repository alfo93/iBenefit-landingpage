export const translations = {
  en: {
    nav: {
      home: "Home",
      bio: "Mission",
      about: "About Us",
      contact: "Contact",
    },
    hero: {
      tagline: "MEASURE. IMPROVE. DOMINATE.",
      hint: "Scroll ↓",
    },
    bio: {
      title: "Mission",
      p1: "The human body is capable of far more than most of us ever experience. The problem isn't potential — it's the lack of the right tools, knowledge, and support to unlock it.",
      p2: "IBenefit is built to change that. We combine scientific research, biohacking strategies, and personalized coaching to help individuals and organizations take control of their health — not just reactively, but proactively. We track, we measure, we optimize. From nutrition and recovery to mental performance and longevity, we cover every dimension of what it means to feel and function at your peak.",
      quote: "Because living longer isn't enough. It's time to live better.",
    },
    about: {
      title: "About Us",
      quote: "The best investment you can make is in yourself.",
      email: "Email",
      phone: "Phone",
      locationLabel: "Location",
      location: "Bologna, Italy",
    },
    contact: {
      title: "Stay Tuned",
      subtitle: "Leave your details and we'll get in touch with you.",
      name: "Name",
      surname: "Surname",
      email: "Email",
      phone: "Phone",
      affiliation: "Affiliation",
      send: "Send →",
      sending: "Sending...",
      success: "✓ Thank you! We'll be in touch soon.",
      error: "Something went wrong. Please try again.",
    },
  },
  it: {
    nav: {
      home: "Home",
      bio: "Mission",
      about: "Chi Siamo",
      contact: "Contatti",
    },
    hero: {
      tagline: "MISURA. MIGLIORA. DOMINA.",
      hint: "Scorri ↓",
    },
    bio: {
      title: "Mission",
      p1: "Il corpo umano è capace di molto più di quanto la maggior parte di noi abbia mai sperimentato. Il problema non è il potenziale — è la mancanza degli strumenti giusti, delle conoscenze e del supporto per liberarlo.",
      p2: "IBenefit è nata per cambiare questo. Combiniamo ricerca scientifica, strategie di biohacking e coaching personalizzato per aiutare individui e organizzazioni a prendere il controllo della propria salute — non in modo reattivo, ma proattivo. Tracciamo, misuriamo, ottimizziamo. Dalla nutrizione al recupero, dalle performance mentali alla longevità, copriamo ogni dimensione del benessere.",
      quote: "Perché non basta vivere più a lungo. È tempo di vivere meglio.",
    },
    about: {
      title: "Chi Siamo",
      quote: "Il miglior investimento che puoi fare è su te stesso.",
      email: "Email",
      phone: "Telefono",
      locationLabel: "Sede",
      location: "Bologna, Italia",
    },
    contact: {
      title: "Resta Aggiornato",
      subtitle: "Lascia i tuoi dati e ti contatteremo presto.",
      name: "Nome",
      surname: "Cognome",
      email: "Email",
      phone: "Telefono",
      affiliation: "Affiliazione",
      send: "Invia →",
      sending: "Invio in corso...",
      success: "✓ Grazie! Ti contatteremo presto.",
      error: "Qualcosa è andato storto. Riprova.",
    },
  },
} as const;

export type Lang = keyof typeof translations;
