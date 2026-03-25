import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = [
  { name: "React.js", icon: "⚛️", level: 85 },
  { name: "JavaScript", icon: "🟨", level: 88 },
  { name: "HTML5", icon: "🌐", level: 95 },
  { name: "CSS3", icon: "🎨", level: 90 },
  { name: "Tailwind CSS", icon: "💨", level: 85 },
  { name: "Bootstrap", icon: "🅱️", level: 80 },
  { name: "REST APIs", icon: "🔗", level: 78 },
  { name: "Git/GitHub", icon: "🐙", level: 82 },
  { name: "Three.js", icon: "🎮", level: 60 },
  { name: "Socket.io", icon: "⚡", level: 55 },
  { name: "Figma", icon: "🎭", level: 70 },
  { name: "Responsive Design", icon: "📱", level: 92 },
];

const PROJECTS = [
  {
    emoji: "🎬",
    title: "StreamVault",
    desc: "Netflix-style UI clone with content carousels, dynamic rendering, and a working search filter.",
    tags: ["HTML", "JavaScript", "Tailwind CSS"],
    link: "https://usama670.github.io/Netflixclone",
    color: "#e50914",
  },
  {
    emoji: "🎵",
    title: "Music Player",
    desc: "Responsive and interactive music player with play/pause, skip, volume controls and smooth animations.",
    tags: ["HTML", "JavaScript", "Tailwind CSS"],
    link: "https://usama670.github.io/Music-palyer",
    color: "#1db954",
  },
  {
    emoji: "🖼️",
    title: "Image Gallery",
    desc: "Curated image gallery focused on visual storytelling with lightbox preview and smooth transitions.",
    tags: ["HTML", "CSS3", "JavaScript"],
    link: "https://usama670.github.io/ImageGallery",
    color: "#00d4ff",
  },
  {
    emoji: "🧮",
    title: "Calculator App",
    desc: "Clean and functional calculator with keyboard support and smooth UI interactions.",
    tags: ["HTML", "CSS3", "JavaScript"],
    link: "https://usama670.github.io/Calculator",
    color: "#f59e0b",
  },
  {
    emoji: "⏳",
    title: "Website Loader",
    desc: "Mesmerizing lightweight loading animation built entirely with HTML and CSS. Zero JavaScript.",
    tags: ["HTML", "CSS3", "Animation"],
    link: "https://usama670.github.io/Loader-for-website",
    color: "#8b5cf6",
  },
  {
    emoji: "🎲",
    title: "Random Image Loader",
    desc: "Generate random images by number. Fun and lightweight image loader with clean minimal UI.",
    tags: ["HTML", "JavaScript", "API"],
    link: "https://usama670.github.io/Random-image-Loader",
    color: "#ec4899",
  },
];

const EXPERIENCE = [
  {
    role: "Frontend Developer Intern",
    company: "CodeAlpha",
    period: "2025",
    desc: "Built responsive UIs using React.js, HTML, CSS and Tailwind CSS. Integrated RESTful APIs and worked in an Agile development environment.",
    icon: "💼",
  },
];

const EDUCATION = [
  {
    degree: "BS Information Technology",
    school: "Virtual University of Pakistan",
    period: "2022 — 2026",
    icon: "🎓",
  },
  {
    degree: "Matriculation",
    school: "Inspire College",
    period: "Graduated 2021",
    icon: "📚",
  },
];

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      el.style.transition = "all 0.7s ease";
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [followerPos, setFollowerPos] = useState({ x: 0, y: 0 });
  const followerRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useScrollReveal();

  useEffect(() => {
    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);

    let animFrame;
    const animate = () => {
      followerRef.current.x += (mouseRef.current.x - followerRef.current.x) * 0.1;
      followerRef.current.y += (mouseRef.current.y - followerRef.current.y) * 0.1;
      setFollowerPos({ x: followerRef.current.x, y: followerRef.current.y });
      animFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((l) => l.toLowerCase());
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#060a14", color: "#e2e8f0", overflowX: "hidden", cursor: "none" }}>
      {/* Cursor */}
      <div style={{
        position: "fixed", width: 8, height: 8, background: "#00d4ff",
        borderRadius: "50%", pointerEvents: "none", zIndex: 9999,
        left: cursorPos.x - 4, top: cursorPos.y - 4, mixBlendMode: "difference",
      }} />
      <div style={{
        position: "fixed", width: 32, height: 32,
        border: "1.5px solid rgba(0,212,255,0.6)", borderRadius: "50%",
        pointerEvents: "none", zIndex: 9998,
        left: followerPos.x - 16, top: followerPos.y - 16,
        transition: "opacity 0.3s",
      }} />

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1.2rem 4rem", display: "flex", justifyContent: "space-between",
        alignItems: "center", backdropFilter: "blur(20px)",
        background: "rgba(6,10,20,0.85)", borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <a href="#home" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#fff", textDecoration: "none" }}>
          U<span style={{ color: "#00d4ff" }}>.</span>dev
        </a>
        <div style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
          {NAV_LINKS.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} style={{
              color: activeSection === link.toLowerCase() ? "#00d4ff" : "#64748b",
              textDecoration: "none", fontSize: "0.88rem", fontWeight: 500,
              transition: "color 0.3s", letterSpacing: "0.3px",
            }}>{link}</a>
          ))}
          <a href="mailto:usamasheikh670@gmail.com" style={{
            background: "#00d4ff", color: "#060a14", padding: "0.45rem 1.1rem",
            borderRadius: "6px", fontWeight: 700, textDecoration: "none", fontSize: "0.85rem",
          }}>Hire Me</a>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "8rem 4rem 4rem", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 55% 55% at 65% 50%, rgba(0,212,255,0.07) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 15% 75%, rgba(124,58,237,0.09) 0%, transparent 60%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)",
            borderRadius: 100, padding: "0.4rem 1rem", fontSize: "0.78rem",
            color: "#00d4ff", fontWeight: 500, marginBottom: "1.8rem",
            animation: "fadeUp 0.8s ease both",
          }}>
            <span style={{ width: 6, height: 6, background: "#00d4ff", borderRadius: "50%", animation: "pulse 2s infinite", display: "inline-block" }} />
            Available for Freelance & Internships
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
            fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", color: "#fff",
            animation: "fadeUp 0.8s ease 0.1s both",
          }}>
            Muhammad<br />
            <span style={{
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Usama.</span>
          </h1>

          <p style={{
            fontSize: "1.08rem", color: "#64748b", lineHeight: 1.75,
            marginTop: "1.4rem", maxWidth: 500, fontWeight: 300,
            animation: "fadeUp 0.8s ease 0.2s both",
          }}>
            Frontend Developer crafting fast, responsive, and visually stunning web experiences using <strong style={{ color: "#94a3b8" }}>React.js</strong>, <strong style={{ color: "#94a3b8" }}>JavaScript</strong>, and modern CSS.
          </p>

          <div style={{ display: "flex", gap: "1rem", marginTop: "2.2rem", animation: "fadeUp 0.8s ease 0.3s both" }}>
            <a href="#projects" style={{
              background: "#00d4ff", color: "#060a14", padding: "0.8rem 1.8rem",
              borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "0.9rem",
              transition: "all 0.3s", display: "inline-flex", alignItems: "center", gap: "0.4rem",
            }}>View Projects →</a>
            <a href="#contact" style={{
              background: "transparent", color: "#e2e8f0", padding: "0.8rem 1.8rem",
              borderRadius: 8, fontWeight: 500, textDecoration: "none", fontSize: "0.9rem",
              border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.3s",
            }}>Contact Me</a>
          </div>

          <div style={{ display: "flex", gap: "3rem", marginTop: "3.5rem", animation: "fadeUp 0.8s ease 0.4s both" }}>
            {[["12+", "Projects Built"], ["1+", "Years Exp"], ["5+", "Technologies"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 800, color: "#fff" }}>
                  <span style={{ color: "#00d4ff" }}>{num}</span>
                </div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating code cards */}
        <div style={{ position: "absolute", right: "4rem", top: "50%", transform: "translateY(-50%)", width: 380, height: 380 }}>
          <CodeCard style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 310, animation: "float 6s ease-in-out infinite" }}>
            <CodeLine><Kw>const</Kw> <Bl>developer</Bl> = {"{"}</CodeLine>
            <CodeLine>&nbsp;&nbsp;<Gr>name</Gr>: <Yw>"Muhammad Usama"</Yw>,</CodeLine>
            <CodeLine>&nbsp;&nbsp;<Gr>role</Gr>: <Yw>"Frontend Dev"</Yw>,</CodeLine>
            <CodeLine>&nbsp;&nbsp;<Gr>skills</Gr>: [<Yw>"React"</Yw>, <Yw>"JS"</Yw>],</CodeLine>
            <CodeLine>&nbsp;&nbsp;<Gr>location</Gr>: <Yw>"Lahore, PK"</Yw>,</CodeLine>
            <CodeLine>&nbsp;&nbsp;<Gr>available</Gr>: <Cy>true</Cy>,</CodeLine>
            <CodeLine>{"}"}</CodeLine>
          </CodeCard>
          <CodeCard style={{ position: "absolute", top: "2%", right: "-5%", width: 155, animation: "float2 5s ease-in-out infinite 1s", fontSize: "0.7rem" }}>
            <CodeLine><Kw>import</Kw> React</CodeLine>
            <CodeLine><Kw>from</Kw> <Yw>'react'</Yw></CodeLine>
            <CodeLine style={{ color: "#4b5563" }}>// building...</CodeLine>
            <CodeLine><Gr>✓ compiled</Gr></CodeLine>
          </CodeCard>
          <CodeCard style={{ position: "absolute", bottom: "2%", left: "-5%", width: 148, animation: "float2 7s ease-in-out infinite 0.5s", fontSize: "0.7rem" }}>
            <CodeLine><Cy>npm</Cy> run dev</CodeLine>
            <CodeLine style={{ color: "#4b5563" }}>Starting...</CodeLine>
            <CodeLine><Gr>✓ ready</Gr></CodeLine>
            <CodeLine><Cy>localhost</Cy>:5173</CodeLine>
          </CodeCard>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: "7rem 4rem", background: "#0a0f1e" }}>
        <SectionTag>About Me</SectionTag>
        <h2 className="reveal" style={sectionTitle}>Who I Am</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center", marginTop: "3rem" }}>
          <div className="reveal">
            {[
              <>Hi! I'm <strong style={{ color: "#e2e8f0" }}>Muhammad Usama</strong>, a Frontend Developer based in <strong style={{ color: "#e2e8f0" }}>Lahore, Pakistan</strong>. I specialize in building modern, responsive, and user-friendly web experiences.</>,
              <>I'm pursuing my <strong style={{ color: "#e2e8f0" }}>BS in Information Technology</strong> at Virtual University of Pakistan (graduating 2026) and completed my internship at <strong style={{ color: "#e2e8f0" }}>CodeAlpha</strong> in 2025.</>,
              <>Passionate about clean code and beautiful interfaces. Currently exploring <strong style={{ color: "#e2e8f0" }}>Three.js & React Three Fiber</strong>, building a 3D multiplayer card game platform.</>,
            ].map((text, i) => (
              <p key={i} style={{ color: "#64748b", lineHeight: 1.8, marginBottom: "1.1rem", fontSize: "0.98rem" }}>{text}</p>
            ))}
          </div>
          <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { icon: "🎓", title: "Education", text: "BS IT — Virtual University Pakistan, 2026" },
              { icon: "💼", title: "Experience", text: "Frontend Dev Intern at CodeAlpha, 2025" },
              { icon: "📍", title: "Location", text: "Lahore, Pakistan — Open to Remote" },
              { icon: "🚀", title: "Currently", text: "Building 3D Multiplayer Card Game" },
            ].map(({ icon, title, text }) => (
              <div key={title} style={{
                background: "#111827", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12, padding: "1.4rem", transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: "1.4rem", marginBottom: "0.6rem" }}>{icon}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#fff", fontSize: "0.9rem", marginBottom: "0.3rem" }}>{title}</div>
                <div style={{ fontSize: "0.78rem", color: "#64748b", lineHeight: 1.5 }}>{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ padding: "7rem 4rem" }}>
        <SectionTag>Expertise</SectionTag>
        <h2 className="reveal" style={sectionTitle}>Skills & Technologies</h2>
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "1rem", marginTop: "3rem" }}>
          {SKILLS.map(({ name, icon, level }) => (
            <div key={name} style={{
              background: "#111827", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12, padding: "1.3rem", textAlign: "center", transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)"; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,212,255,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: "1.7rem", marginBottom: "0.5rem" }}>{icon}</div>
              <div style={{ fontSize: "0.8rem", fontWeight: 500, color: "#e2e8f0", marginBottom: "0.6rem" }}>{name}</div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 10 }}>
                <div style={{ height: "100%", width: `${level}%`, background: "linear-gradient(90deg, #00d4ff, #7c3aed)", borderRadius: 10, transition: "width 1s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ padding: "7rem 4rem", background: "#0a0f1e" }}>
        <SectionTag>Work</SectionTag>
        <h2 className="reveal" style={sectionTitle}>Featured Projects</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}>
          {PROJECTS.map(({ emoji, title, desc, tags, link, color }) => (
            <div key={title} className="reveal" style={{
              background: "#111827", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16, padding: "2rem", transition: "all 0.3s", position: "relative", overflow: "hidden",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}40`; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 20px 50px ${color}15`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: "2.3rem", marginBottom: "0.8rem" }}>{emoji}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#fff", fontSize: "1.1rem", marginBottom: "0.5rem" }}>{title}</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, marginBottom: "1.3rem" }}>{desc}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.3rem" }}>
                {tags.map(tag => (
                  <span key={tag} style={{
                    background: `${color}15`, border: `1px solid ${color}30`,
                    color: color, padding: "0.2rem 0.65rem", borderRadius: 100, fontSize: "0.72rem", fontWeight: 500,
                  }}>{tag}</span>
                ))}
              </div>
              <a href={link} target="_blank" rel="noreferrer" style={{ color: color, textDecoration: "none", fontSize: "0.83rem", fontWeight: 600 }}>
                Live Demo →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" style={{ padding: "7rem 4rem" }}>
        <SectionTag>Journey</SectionTag>
        <h2 className="reveal" style={sectionTitle}>Experience & Education</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginTop: "3rem" }}>
          <div className="reveal">
            <h3 style={{ fontFamily: "'Syne', sans-serif", color: "#00d4ff", fontSize: "1rem", fontWeight: 700, marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: 2 }}>Work Experience</h3>
            {EXPERIENCE.map(({ role, company, period, desc, icon }) => (
              <div key={role} style={{
                background: "#111827", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 14, padding: "1.8rem", marginBottom: "1rem",
              }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.8rem" }}>{icon}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#fff", fontSize: "1rem" }}>{role}</div>
                <div style={{ color: "#00d4ff", fontSize: "0.85rem", fontWeight: 600, margin: "0.3rem 0" }}>{company}</div>
                <div style={{ color: "#64748b", fontSize: "0.78rem", marginBottom: "0.8rem" }}>{period}</div>
                <div style={{ color: "#64748b", fontSize: "0.85rem", lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
          <div className="reveal">
            <h3 style={{ fontFamily: "'Syne', sans-serif", color: "#7c3aed", fontSize: "1rem", fontWeight: 700, marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: 2 }}>Education</h3>
            {EDUCATION.map(({ degree, school, period, icon }) => (
              <div key={degree} style={{
                background: "#111827", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 14, padding: "1.8rem", marginBottom: "1rem",
              }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.8rem" }}>{icon}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#fff", fontSize: "1rem" }}>{degree}</div>
                <div style={{ color: "#7c3aed", fontSize: "0.85rem", fontWeight: 600, margin: "0.3rem 0" }}>{school}</div>
                <div style={{ color: "#64748b", fontSize: "0.78rem" }}>{period}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "7rem 4rem", background: "#0a0f1e", textAlign: "center" }}>
        <SectionTag>Get In Touch</SectionTag>
        <h2 className="reveal" style={{ ...sectionTitle, textAlign: "center" }}>Let's Work Together</h2>
        <p className="reveal" style={{ color: "#64748b", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 520, margin: "1.5rem auto 2.5rem", fontWeight: 300 }}>
          Available for freelance projects and internship opportunities. Whether you need a website, web app, or just want to chat — my inbox is always open!
        </p>
        <div className="reveal" style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          {[
            { icon: "📧", label: "usamasheikh670@gmail.com", href: "mailto:usamasheikh670@gmail.com" },
            { icon: "💼", label: "LinkedIn", href: "https://linkedin.com/in/muhammad-usama-593a812a7" },
            { icon: "🐙", label: "GitHub", href: "https://github.com/Usama670" },
            { icon: "🎯", label: "Fiverr", href: "https://www.fiverr.com/iamalfa" },
          ].map(({ icon, label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "#111827", border: "1px solid rgba(255,255,255,0.06)",
              color: "#e2e8f0", textDecoration: "none", padding: "0.75rem 1.4rem",
              borderRadius: 10, fontSize: "0.88rem", fontWeight: 500, transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)"; e.currentTarget.style.color = "#00d4ff"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {icon} {label}
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "2rem 4rem", borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        color: "#64748b", fontSize: "0.82rem",
      }}>
        <div>© 2026 Muhammad Usama — Built with React.js ❤️</div>
        <div>Lahore, Pakistan 🇵🇰</div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translate(-50%,-50%) translateY(0); } 50% { transform:translate(-50%,-50%) translateY(-12px); } }
        @keyframes float2 { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(1.4); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #060a14; }
        ::-webkit-scrollbar-thumb { background: #00d4ff40; border-radius: 10px; }
      `}</style>
    </div>
  );
}

// Helper components
const CodeCard = ({ children, style }) => (
  <div style={{
    background: "#111827", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14, padding: "1.3rem", fontFamily: "'Courier New', monospace",
    fontSize: "0.76rem", lineHeight: 1.65, boxShadow: "0 20px 60px rgba(0,0,0,0.6)", ...style,
  }}>
    <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
      {["#ff5f57", "#febc2e", "#28c840"].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, display: "inline-block" }} />)}
    </div>
    {children}
  </div>
);

const CodeLine = ({ children, style }) => <div style={{ marginBottom: 1, ...style }}>{children}</div>;
const Kw = ({ children }) => <span style={{ color: "#c084fc" }}>{children}</span>;
const Bl = ({ children }) => <span style={{ color: "#60a5fa" }}>{children}</span>;
const Gr = ({ children }) => <span style={{ color: "#4ade80" }}>{children}</span>;
const Yw = ({ children }) => <span style={{ color: "#fbbf24" }}>{children}</span>;
const Cy = ({ children }) => <span style={{ color: "#22d3ee" }}>{children}</span>;

const SectionTag = ({ children }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: 3, color: "#00d4ff", fontWeight: 600, marginBottom: "0.8rem" }}>
    <span style={{ width: 22, height: 1, background: "#00d4ff", display: "inline-block" }} />
    {children}
  </div>
);

const sectionTitle = {
  fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
  fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1.1,
};
