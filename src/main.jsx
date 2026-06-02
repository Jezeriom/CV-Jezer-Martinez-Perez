import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import profileImage from '../Styling/playita.png';
import contactImage from '../Styling/IMG_20260328_165659.jpg';
import cvPdf from '../assets/CV.pdf?url';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/experiences';

const navItems = [
  { id: 'home', label: 'Inicio' },
  { id: 'about', label: 'Acerca de mi' },
  { id: 'education', label: 'Educacion' },
  { id: 'experience', label: 'Experiencias' },
  { id: 'contact', label: 'Contacto' },
  { id: 'admin', label: 'Admin' },
];

const emptyForm = {
  company: '',
  role: '',
  description: '',
  startDate: '',
  endDate: '',
};

function formatDate(value) {
  if (!value) return 'Actualidad';
  return new Intl.DateTimeFormat('es-CO', { month: 'short', year: 'numeric' }).format(new Date(value));
}

function useExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadExperiences() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('No se pudieron cargar las experiencias');
      const data = await response.json();
      setExperiences(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExperiences();
  }, []);

  return { experiences, loading, error, reload: loadExperiences, setError };
}

function App() {
  const [page, setPage] = useState(() => window.location.hash.replace('#', '') || 'home');
  const experienceState = useExperiences();

  useEffect(() => {
    const onHashChange = () => setPage(window.location.hash.replace('#', '') || 'home');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const CurrentPage = {
    home: Home,
    about: About,
    education: Education,
    experience: Experiences,
    contact: Contact,
    admin: Admin,
  }[page] || Home;

  return (
    <>
      <Background />
      <Header page={page} />
      <main className="page-shell">
        <CurrentPage experienceState={experienceState} />
      </main>
      <SocialDock />
      <Footer />
    </>
  );
}

function Header({ page }) {
  return (
    <header className="site-header">
      <nav className="nav-bar" aria-label="Navegacion principal">
        <ul className="list-draw">
          {navItems.map((item) => (
            <li key={item.id} className={`nav-item li-${item.id} ${page === item.id ? 'active' : ''}`}>
              <a href={`#${item.id}`}>{item.label}</a>
            </li>
          ))}
          <li className="nav-item li-skills">
            <a href={cvPdf} download target="_blank" rel="noreferrer">Hoja de vida</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Background() {
  return (
    <section className="parallax" aria-hidden="true">
      <div className="overlay" />
    </section>
  );
}

function Home() {
  return (
    <section className="content-panel home-panel">
      <div className="playita">
        <img src={profileImage} alt="Jezer Martinez Perez" />
      </div>
      <div className="intro-copy">
        <h1>Soy Jezer Martinez Perez</h1>
        <p>
          Estudiante de Ingenieria de Software en 4to semestre. Trabajo con SQL, HTML,
          CSS, Java, Python y Linux, y desarrollo proyectos personales como un motor
          3D y aplicaciones web.
        </p>
        <p>
          Ingles fluido y mentalidad de aprendizaje constante. Me gusta construir
          proyectos, experimentar y entender como funcionan las cosas desde dentro.
        </p>
      </div>
    </section>
  );
}

function About() {
  const cards = [
    {
      title: 'Acerca de mi',
      text: 'Soy estudiante de Ingenieria de Software (4to semestre) apasionado por entender como funcionan las cosas por dentro. No me interesa solo que el codigo funcione, me interesa saber por que funciona.',
    },
    {
      title: 'Mentalidad',
      text: 'Aprendo construyendo. Prefiero un repositorio imperfecto pero real antes que solo teoria sin practica. Disfruto enfrentarme a conceptos nuevos, investigar por mi cuenta y profundizar hasta entenderlos de verdad.',
    },
    {
      title: 'En que estoy enfocado',
      text: 'Actualmente estoy fortaleciendo mis bases en desarrollo de software, bases de datos y arquitectura de sistemas. Mi objetivo es seguir creciendo tecnicamente mientras construyo proyectos que reflejen mi progreso.',
    },
    {
      title: 'Personal',
      text: 'En mi tiempo libre, disfruto explorando nuevas tecnologias, participando en comunidades de desarrollo y colaborando en proyectos open source. Me gusta aprender de otros desarrolladores y compartir conocimientos con la comunidad.',
    },
  ];

  return (
    <section className="content-panel card-grid-panel">
      {cards.map((card) => (
        <article className="info-card" key={card.title}>
          <h1>{card.title}</h1>
          <p>{card.text}</p>
        </article>
      ))}
    </section>
  );
}

function Education() {
  const items = [
    {
      title: 'Ingenieria de Software',
      subtitle: 'En curso - 4to semestre',
      text: 'Actualmente me encuentro cursando Ingenieria de Software, donde he desarrollado bases solidas en programacion, bases de datos y logica computacional. Mi formacion esta enfocada en comprender no solo como funcionan los sistemas, sino tambien la estructura y los principios que los sostienen.',
    },
    {
      title: 'Formacion en Ingles',
      subtitle: 'Certificacion proxima',
      text: 'Curso estudios de ingles con nivel fluido en comprension, lectura y comunicacion oral. Esto me permite acceder a documentacion tecnica, cursos internacionales y comunidades globales de desarrollo sin limitaciones.',
    },
    {
      title: 'Bachiller Academico',
      subtitle: 'Graduado - 2023',
      text: 'Finalice mis estudios de educacion media con enfasis en formacion academica general, donde fortaleci habilidades en matematicas, analisis y comprension estructurada de problemas.',
    },
    {
      title: 'Intereses Academicos',
      text: 'Mantengo un interes constante por el estudio de las lenguas, las matematicas y la programacion. Estas areas fortalecen el pensamiento analitico y la capacidad de abordar problemas complejos desde una perspectiva logica y estructurada.',
    },
  ];

  return (
    <section className="content-panel text-panel">
      {items.map((item) => (
        <article className="text-block" key={item.title}>
          <h1>{item.title}</h1>
          {item.subtitle && <h2>{item.subtitle}</h2>}
          <p>{item.text}</p>
        </article>
      ))}
    </section>
  );
}

function Experiences({ experienceState }) {
  const { experiences, loading, error } = experienceState;

  return (
    <section className="content-panel experience-panel">
      <div className="section-heading">
        <h1>Experiencias profesionales</h1>
        <p>Listado consumido desde la API desarrollada en la unidad 3.</p>
      </div>
      {loading && <p className="status">Cargando experiencias...</p>}
      {error && <p className="status error">{error}. Verifica que el backend este corriendo.</p>}
      {!loading && !error && experiences.length === 0 && (
        <p className="status">Aun no hay experiencias registradas. Puedes agregarlas desde Admin.</p>
      )}
      <div className="experience-list">
        {experiences.map((experience) => (
          <article className="experience-card" key={experience._id}>
            <span>{formatDate(experience.startDate)} - {formatDate(experience.endDate)}</span>
            <h2>{experience.role}</h2>
            <strong>{experience.company}</strong>
            <p>{experience.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Admin({ experienceState }) {
  const { experiences, loading, error, reload, setError } = experienceState;
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const isEditing = Boolean(editingId);

  const sortedExperiences = useMemo(() => experiences, [experiences]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError('');
  }

  function editExperience(experience) {
    setEditingId(experience._id);
    setForm({
      company: experience.company || '',
      role: experience.role || '',
      description: experience.description || '',
      startDate: experience.startDate ? experience.startDate.slice(0, 10) : '',
      endDate: experience.endDate ? experience.endDate.slice(0, 10) : '',
    });
  }

  async function submitExperience(event) {
    event.preventDefault();
    if (!form.company.trim() || !form.role.trim() || !form.description.trim()) {
      setError('Empresa, cargo y descripcion son obligatorios');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const response = await fetch(isEditing ? `${API_URL}/${editingId}` : API_URL, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          startDate: form.startDate || null,
          endDate: form.endDate || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'No se pudo guardar la experiencia');
      }

      resetForm();
      await reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteExperience(id) {
    const confirmed = window.confirm('Deseas eliminar esta experiencia?');
    if (!confirmed) return;

    setError('');
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('No se pudo eliminar la experiencia');
      await reload();
      if (editingId === id) resetForm();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="content-panel admin-panel">
      <div className="section-heading admin-heading">
        <div>
          <h1>Administracion de experiencias</h1>
          <p>CRUD conectado a la API: crear, listar, editar y eliminar experiencias profesionales.</p>
        </div>
        <button className="ghost-button" type="button" onClick={reload}>Actualizar</button>
      </div>

      {error && <p className="status error">{error}</p>}

      <div className="admin-layout">
        <form className="experience-form" onSubmit={submitExperience}>
          <h2>{isEditing ? 'Editar experiencia' : 'Nueva experiencia'}</h2>
          <label>
            Empresa
            <input name="company" value={form.company} onChange={updateField} placeholder="Nombre de la empresa" />
          </label>
          <label>
            Cargo
            <input name="role" value={form.role} onChange={updateField} placeholder="Cargo desempenado" />
          </label>
          <label>
            Descripcion
            <textarea name="description" value={form.description} onChange={updateField} rows="5" placeholder="Responsabilidades, logros o tecnologias usadas" />
          </label>
          <div className="date-fields">
            <label>
              Fecha inicio
              <input type="date" name="startDate" value={form.startDate} onChange={updateField} />
            </label>
            <label>
              Fecha fin
              <input type="date" name="endDate" value={form.endDate} onChange={updateField} />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" disabled={saving}>{saving ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear experiencia'}</button>
            {isEditing && <button className="ghost-button" type="button" onClick={resetForm}>Cancelar</button>}
          </div>
        </form>

        <div className="admin-list">
          {loading && <p className="status">Cargando...</p>}
          {!loading && sortedExperiences.map((experience) => (
            <article className="admin-row" key={experience._id}>
              <div>
                <span>{formatDate(experience.startDate)} - {formatDate(experience.endDate)}</span>
                <h2>{experience.role}</h2>
                <strong>{experience.company}</strong>
                <p>{experience.description}</p>
              </div>
              <div className="row-actions">
                <button type="button" onClick={() => editExperience(experience)}>Editar</button>
                <button className="danger-button" type="button" onClick={() => deleteExperience(experience._id)}>Eliminar</button>
              </div>
            </article>
          ))}
          {!loading && sortedExperiences.length === 0 && <p className="status">No hay experiencias para administrar.</p>}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function submitContact(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = 'El nombre es obligatorio';
    if (!form.email.trim()) nextErrors.email = 'El email es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Email invalido';
    if (!form.message.trim()) nextErrors.message = 'El mensaje es obligatorio';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(`Contacto desde CV - ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nCorreo: ${form.email}`);
    window.location.href = `mailto:jmartinezp5@unicartagena.edu.co?subject=${subject}&body=${body}`;
  }

  return (
    <section className="content-panel contact-panel">
      <div className="contact-intro">
        <img className="contact-avatar" src={contactImage} alt="Jezer Martinez Perez" />
        <h1>Contactame!</h1>
        <p>Toca uno de los iconos para contactarme o completa el siguiente formulario.</p>
        <div className="contact-links">
          <a href="https://wa.me/573122201820" target="_blank" rel="noreferrer" aria-label="WhatsApp">WA</a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jmartinezp5@unicartagena.edu.co" target="_blank" rel="noreferrer" aria-label="Correo">Mail</a>
          <a href="https://www.linkedin.com/in/jezer-martinez-perez-423645333/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
        </div>
      </div>

      <form className="contact-form" onSubmit={submitContact}>
        <h2>Contactame</h2>
        <label>
          Nombre
          <input name="name" value={form.name} onChange={updateField} />
          {errors.name && <small>{errors.name}</small>}
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={updateField} />
          {errors.email && <small>{errors.email}</small>}
        </label>
        <label>
          Mensaje
          <textarea name="message" rows="4" value={form.message} onChange={updateField} />
          {errors.message && <small>{errors.message}</small>}
        </label>
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

function SocialDock() {
  return (
    <aside className="social-dock" aria-label="Redes sociales">
      <span className="right-arrow">&rsaquo;</span>
      <section className="icons-section">
        <a href="https://www.linkedin.com/in/jezer-martinez-perez-423645333/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://www.youtube.com/@Dan-271" target="_blank" rel="noreferrer">YouTube</a>
        <a href="https://www.facebook.com/profile.php?id=61551092084894" target="_blank" rel="noreferrer">Facebook</a>
        <a href="https://www.instagram.com/j3z3r1/" target="_blank" rel="noreferrer">Instagram</a>
      </section>
    </aside>
  );
}

function Footer() {
  return (
    <footer>
      <p>Patrocinado por la salchipapa que me comi el sabado, que seria de mi con tanta hambre :)</p>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
