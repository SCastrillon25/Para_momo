import { useEffect, useState } from "react";
import "./birthday.css";

const BASE_URL = "http://34.51.107.65:3001";
const tokenKey = "momo_token";
const userKey = "momo_user";

async function api(path, options = {}) {
  const token = localStorage.getItem(tokenKey);

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Ha ocurrido un error.");
  }

  return data;
}

function Auth({ onAuthenticated }) {
  const [mode, setMode] = useState("register");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await api(`/api/auth/${mode}`, {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (mode === "register") {
        setMode("login");
        setForm({
          name: "",
          email: form.email,
          password: "",
        });
        setError(
          "Cuenta creada correctamente. Ahora inicia sesión para abrir tu regalo. ♡"
        );
      } else {
        localStorage.setItem(tokenKey, data.token);
        localStorage.setItem(userKey, JSON.stringify(data.user));
        onAuthenticated(data.user);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return <div className="auth-page">
        <div className="garden-decoration" aria-hidden="true">
      <span className="sunflower sunflower--left">🌻</span>
      <span className="sunflower sunflower--right">🌻</span>
      <span className="cake cake--left">🎂</span>
      <span className="cake cake--right">🧁</span>
      <span className="butterfly butterfly--1">🦋</span>
      <span className="butterfly butterfly--2">🦋</span>
      <span className="butterfly butterfly--3">🦋</span>
      <span className="butterfly butterfly--4">🦋</span>
    </div>
    <div className="auth-glow" />
    <div className="auth-card">
      <div className="auth-heart">♥</div>
      <p className="eyebrow">UN REGALO MUY ESPECIAL</p>
      <h1>{mode === "register" ? <>Antes de abrirlo,<br /><span>regístrate</span> ♡</> : <><br /> ♡</>}</h1>
      <p className="auth-intro">{mode === "register" ? "Primero crea tu cuenta. Después podrás entrar al regalo que preparé para ti." : "Inicia sesión para continuar hacia tu regalo."}</p>
      <form onSubmit={submit} className="auth-form">
        {mode === "register" && <label>Nombre<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tu nombre" required /></label>}
        <label>Correo electrónico<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tu@email.com" required /></label>
        <label>Contraseña<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Mínimo 6 caracteres" minLength="6" required /></label>
        {error && <p className="auth-error">{error}</p>}
        <button className="auth-submit" disabled={loading}>{loading ? "Preparando…" : mode === "register" ? "Crear mi cuenta ♡" : "Entrar al regalo ♡"}</button>
      </form>
      <button className="auth-switch" onClick={() => { setMode(mode === "register" ? "login" : "register"); setError(""); }}>
        {mode === "register" ? "Ya tengo una cuenta → Iniciar sesión" : "No tengo cuenta → Registrarme"}
      </button>
    </div>
  </div>;
}

function PhotoCarousel({ title, photos, onSelect }) {
  const [index, setIndex] = useState(0);
  const current = photos[index];
  const previous = () => setIndex((value) => (value - 1 + photos.length) % photos.length);
  const next = () => setIndex((value) => (value + 1) % photos.length);

  return <article className="album-carousel">
    <div className="album-carousel__header">
      <div><p className="eyebrow">ÁLBUM</p><h3>{title}</h3></div>
      <span className="album-carousel__count">{index + 1} / {photos.length}</span>
    </div>
    <div className="album-carousel__frame">
      <button className="carousel-arrow carousel-arrow--left" onClick={previous} aria-label="Foto anterior">‹</button>
      <button className="carousel-photo" onClick={() => onSelect(current)} aria-label={`Ver ${current.title}`}>
        <img src={current.src} alt={current.title} />
        <span className="carousel-photo__overlay"><strong>{current.title}</strong><small>{current.text}</small></span>
      </button>
      <button className="carousel-arrow carousel-arrow--right" onClick={next} aria-label="Siguiente foto">›</button>
    </div>
    <div className="carousel-dots" aria-label="Fotos del álbum">
      {photos.map((photo, photoIndex) => <button key={photo.src} className={photoIndex === index ? "active" : ""} onClick={() => setIndex(photoIndex)} aria-label={`Ir a la foto ${photoIndex + 1}`} />)}
    </div>
  </article>;
}

function App() {
  const [authenticated, setAuthenticated] = useState(Boolean(localStorage.getItem(tokenKey)));
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(null);
  const [gift, setGift] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authenticated) return;
    api("/api/gift/momo").then(setGift).catch((err) => {
      if (err.message.includes("sesión") || err.message.includes("registrarte")) { localStorage.removeItem(tokenKey); localStorage.removeItem(userKey); setAuthenticated(false); }
      else setError(err.message);
    });
  }, [authenticated]);

  if (!authenticated) return <Auth onAuthenticated={() => setAuthenticated(true)} />;
  if (error) return <div className="birthday-app"><section className="cover"><p className="eyebrow">UPS ♡</p><h1>No se pudo cargar<br /><span>el regalo</span></h1><p className="cover__intro">{error}</p></section></div>;
  if (!gift) return <div className="birthday-app"><section className="cover"><p className="eyebrow">PREPARANDO ALGO ESPECIAL</p><h1>Un momento,<br /><span>mi amor</span> ♡</h1></section></div>;

  return <div className="birthday-app">
    <div className="garden-decoration garden-decoration--app" aria-hidden="true">
      <span className="sunflower sunflower--left">🌻</span>
      <span className="sunflower sunflower--right">🌻</span>
      <span className="cake cake--left">🎂</span>
      <span className="cake cake--right">🧁</span>
      <span className="butterfly butterfly--1">🦋</span>
      <span className="butterfly butterfly--2">🦋</span>
      <span className="butterfly butterfly--3">🦋</span>
      <span className="butterfly butterfly--4">🦋</span>
    </div>
    <div className="floating-hearts" aria-hidden="true">♡　♥　♡　♥　♡</div>
    {!opened ? <section className="cover">
      <div className="cover__glow" /><p className="eyebrow">CUENTA VERIFICADA · UN REGALO HECHO PARA TI</p>
      <h1>Feliz cumpleaños,<br /><span>{gift.recipient}</span> ♡</h1>
      <p className="cover__intro">Hay recuerdos que merecen un lugar especial para que perduren.<br />Abre esto cuando estés quieras.</p>
      <button className="envelope" onClick={() => setOpened(true)}><span className="envelope__heart">♥</span><span className="envelope__label">Abrir mi regalo</span></button>
      <p className="hint">Da click en el sobre</p>
    </section> : <main>
      <section className="hero"><p className="eyebrow">HOY CELEBRAMOS A ALGUIEN MUY ESPECIAL</p><h1>Feliz cumpleaños,<br /><span>{gift.recipient}</span></h1><p className="hero__text">Un pequeño álbum de nosotros, porque algunos recuerdos merecen quedarse cerquita del corazón.</p><a className="scroll-link" href="#recuerdos">↓ Ver nuestros recuerdos</a></section>
      <section className="section" id="recuerdos"><div className="section-heading"><p className="eyebrow">NUESTROS RECUERDOS</p><h2>Pequeños momentos<br /><em>grandes recuerdos.</em></h2></div><div className="albums-grid">
        <PhotoCarousel title="Nuestros momentos" photos={gift.photos.slice(0, 6)} onSelect={setSelected} />
        <PhotoCarousel title="Días que guardo" photos={gift.photos.slice(6, 10)} onSelect={setSelected} />
        <PhotoCarousel title="Más recuerdos" photos={gift.photos.slice(10)} onSelect={setSelected} />
      </div><p className="gallery-note">Usa las flechas o los puntos para recorrer todas las fotos de cada álbum.</p></section>
      <section className="letter-section" id="carta"><div className="letter-card"><div className="letter-card__top">♡</div><p className="eyebrow">UNA CARTA PARA TI</p><h2>{gift.letter.greeting}</h2><div className="letter-body">{gift.letter.paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 20)}`}>{paragraph}</p>)}</div><p className="signature">{gift.letter.signature.split("\n").map((line, i) => <span key={line}>{line}{i === 0 && <br />}</span>)}</p></div></section>
      <section className="closing"><div className="closing__heart">♥</div><p className="eyebrow">{gift.closing.eyebrow}</p><h2>{gift.closing.title}</h2><p>{gift.closing.text}</p></section>
      <footer>Hecho con amor · Para {gift.recipient} · 2026</footer>
    </main>}
    {selected && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setSelected(null)}><button className="lightbox__close" onClick={() => setSelected(null)}>×</button><img src={selected.src} alt={selected.title} onClick={(e) => e.stopPropagation()} /><div className="lightbox__caption"><strong>{selected.title}</strong><span>{selected.text}</span></div></div>}
  </div>;
}

export { App };
