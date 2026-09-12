'use client';

import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Database,
  FileText,
  GraduationCap,
  Maximize2,
  MessageSquareText,
  Network,
  Presentation,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Project = {
  code: string;
  title: string;
  director: string;
  team: string;
  line: 'robotica' | 'software' | 'educacion';
  photo: string;
};

const projects: Project[] = [
  {
    code: 'TI/22/116',
    title: 'Tecnología Arduino aplicada a requerimientos sociales',
    director: 'Pedro López',
    team: 'Carlos Niell · Fernando Armas · 6 alumnos',
    line: 'robotica',
    photo: '/investigadores/pedro-lopez.png',
  },
  {
    code: 'TI/26/140',
    title:
      'Arquitectura de Software para la Transformación hacia Sistemas Adaptativos Inteligentes',
    director: 'Alejandro Sartorio',
    team: 'Silvia Poncio · Soledad Ayala · Alejandro Hernández · María Andrea Guisen · 2 alumnos',
    line: 'software',
    photo: '/investigadores/alejandro-sartorio.png',
  },
  {
    code: 'TI/22/113',
    title:
      'La tecnología blockchain como impulso para la transformación digital de las organizaciones',
    director: 'Alejandro Hernández',
    team: 'Pablo Audoglio · Leonardo Prósperi · Claudia Pons · Jorge Kamlofsky · 5 alumnos · 2 graduados',
    line: 'software',
    photo: '/investigadores/alejandro-hernandez.png',
  },
  {
    code: 'TI/22/117',
    title: 'Hojas de rutas de aprendizaje aplicadas al desarrollo de software',
    director: 'Alejandro Sartorio',
    team: 'Matías Banega · Sebastián Velázquez · Carlos Neil · Marcelo De Vincenzi Zemborain · 4 alumnos',
    line: 'software',
    photo: '/investigadores/alejandro-sartorio.png',
  },
  {
    code: 'TI/20/114',
    title: 'Ciberseguridad, conceptos y aplicaciones',
    director: 'Santiago Roatta',
    team: 'Pedro López · María Eugenia Casco · 11 alumnos · 4 graduados',
    line: 'software',
    photo: '/investigadores/santiago-roatta.png',
  },
  {
    code: 'TI/26/139',
    title: 'Datawarehouse e IA para indicadores de Soft Skills',
    director: 'Silvia Poncio',
    team: 'Cintia Cuña · Alejandro Sartorio · 3 alumnos',
    line: 'educacion',
    photo: '/investigadores/silvia-poncio.png',
  },
  {
    code: 'TI/25/128',
    title:
      'Taxonomía de Prompting para la optimización de la Accesibilidad en Sistemas de IA Conversacional',
    director: 'María Andrea Guisen',
    team: 'Claudia Pons · Christian Parkinson · Alejandro Sartorio · 3 alumnos',
    line: 'educacion',
    photo: '/investigadores/maria-andrea-guisen.png',
  },
  {
    code: 'TI/25/129',
    title:
      'Punto tecnológico para la accesibilidad de personas con síndrome de Rett y otras condiciones neurológicas',
    director: 'María Andrea Guisen',
    team: 'Claudia Pons · Christian Parkinson · Mauro Soto · Nadia Carolina Ksybala · 3 alumnos',
    line: 'educacion',
    photo: '/investigadores/maria-andrea-guisen.png',
  },
  {
    code: 'TI/22/111',
    title:
      'Sitios web educativos e inteligencia artificial: análisis de estándares WCAG',
    director: 'Soledad Ayala',
    team: 'Alejandro Hernández · Juliana Carpinetti · Santiago Roatta · 3 alumnos',
    line: 'educacion',
    photo: '/investigadores/soledad-ayala.png',
  },
];

const lineMeta = {
  robotica: {
    label: 'Automatización y Robótica',
    color: '#ffb000',
    short: 'Robótica',
  },
  software: {
    label: 'Ingeniería de Software',
    color: '#15d4c5',
    short: 'Software',
  },
  educacion: {
    label: 'Sociedad del Conocimiento y Tecnologías aplicadas a la Educación',
    color: '#8b7cff',
    short: 'Educación',
  },
};

const management = [
  ['Gestión documental', FileText],
  ['Comunicación institucional', MessageSquareText],
  ['Gestión de investigadores', UsersRound],
  ['Tramitaciones y procesos', Database],
  ['Capacitación y entrenamiento', GraduationCap],
] as const;

function Brand() {
  return (
    <div className="brand" aria-label="CAETI UAI">
      <span className="brand-mark">C</span>
      <span>
        <strong>CAETI</strong>
        <small>FTI · UAI</small>
      </span>
    </div>
  );
}

function SlideShell({
  eyebrow,
  title,
  children,
  className = '',
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`slide-shell ${className}`}>
      <div className="slide-heading">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Placeholder({ kind }: { kind: 'collab' | 'odoo' }) {
  const isCollab = kind === 'collab';
  return (
    <div className={`capture-placeholder ${kind}`}>
      <div className="placeholder-toolbar">
        <i />
        <i />
        <i />
        <span>
          {isCollab ? 'Entorno colaborativo' : 'Plataforma de gestión'}
        </span>
      </div>
      <Image
        src={
          isCollab
            ? '/capturas/entorno-colaborativo.png'
            : '/capturas/odoo-proyectos.png'
        }
        alt={
          isCollab
            ? 'Personas y agentes conversando en el entorno colaborativo'
            : 'Proyectos de investigación gestionados en Odoo'
        }
        width={1200}
        height={760}
        unoptimized
      />
      <span className="capture-tag">
        {isCollab ? 'Humanos + agentes' : 'Proyectos + procesos'}
      </span>
    </div>
  );
}

export default function Home() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const [seconds, setSeconds] = useState(0);
  const total = 10;

  useEffect(() => {
    const timer = window.setInterval(
      () => setSeconds((value) => value + 1),
      1000,
    );
    return () => window.clearInterval(timer);
  }, []);

  const go = useCallback((next: number) => {
    setSelected(null);
    setIndex(Math.max(0, Math.min(total - 1, next)));
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selected) return setSelected(null);
      if (
        event.key === 'ArrowRight' ||
        event.key === 'PageDown' ||
        event.key === ' '
      )
        go(index + 1);
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') go(index - 1);
      if (event.key.toLowerCase() === 'f')
        void document.documentElement.requestFullscreen?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, index, selected]);

  const time = useMemo(
    () =>
      `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`,
    [seconds],
  );

  const slides = [
    <section className="cover" key="cover">
      <div className="cover-grid" />
      <div className="cover-orbit orbit-a" />
      <div className="cover-orbit orbit-b" />
      <div className="cover-content">
        <span className="kicker">CAETI · FTI ROSARIO · 2026</span>
        <h1>
          Arquitectura de Software para la Transformación hacia Sistemas
          Adaptativos Inteligentes
        </h1>
        <p>
          Una plataforma experimental para investigar, gestionar y colaborar con
          agentes inteligentes
        </p>
        <div className="presenter">
          <span>Presenta</span>
          <strong>Alejandro Sartorio</strong>
          <small>Director del CAETI</small>
        </div>
      </div>
      <div className="cover-seal">
        <Network />
        <span>
          Sistema
          <br />
          activo
        </span>
      </div>
    </section>,

    <SlideShell
      key="challenge"
      eyebrow="01 · EL DESAFÍO"
      title="Los sistemas institucionales deben incorporar capacidades nuevas"
    >
      <div className="challenge-layout">
        <div className="legacy-system">
          <span>Sistema consolidado</span>
          <div className="legacy-stack">
            <i />
            <i />
            <i />
            <i />
          </div>
          <small>Procesos · datos · reglas · personas</small>
        </div>
        <div className="transformation-pulse">
          <Sparkles />
          <span>
            Transformación
            <br />
            incremental
          </span>
        </div>
        <div className="capability-list">
          <div>
            <Bot />
            <span>Agentes inteligentes</span>
          </div>
          <div>
            <Network />
            <span>Nuevas integraciones</span>
          </div>
          <div>
            <ShieldCheck />
            <span>Continuidad operativa</span>
          </div>
        </div>
      </div>
      <p className="big-question">
        ¿Cómo transformar lo que ya funciona sin empezar de cero?
      </p>
    </SlideShell>,

    <SlideShell
      key="trunk"
      eyebrow="02 · PROYECTO TRONCAL"
      title="Una arquitectura para transformar capacidades de manera sistemática"
    >
      <div className="trunk-layout">
        <div className="trunk-code">TI/26/140</div>
        <div className="trunk-center">
          <Network />
          <strong>
            Arquitectura
            <br />
            adaptativa
          </strong>
          <span>método incremental y reproducible</span>
        </div>
        <div className="trunk-rings">
          <i />
          <i />
          <i />
        </div>
        <div className="trunk-copy">
          <p>
            El proyecto define y valida un método basado en arquitectura de
            software para incorporar nuevas propiedades en sistemas de gestión
            consolidados.
          </p>
          <dl>
            <div>
              <dt>Director</dt>
              <dd>Alejandro Sartorio</dd>
            </div>
            <div>
              <dt>Equipo</dt>
              <dd>
                Silvia Poncio · Soledad Ayala
                <br />
                Alejandro Hernández · María Andrea Guisen
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </SlideShell>,

    <SlideShell
      key="platform"
      eyebrow="03 · PLATAFORMA EXPERIMENTAL"
      title="La investigación sucede en un entorno real de trabajo"
    >
      <div className="dual-platform">
        <div>
          <span className="platform-label">
            <UsersRound /> Colaboración
          </span>
          <Placeholder kind="collab" />
        </div>
        <div className="platform-bridge">
          <span>
            arquitectura
            <br />
            adaptativa
          </span>
          <i />
        </div>
        <div>
          <span className="platform-label">
            <Database /> Gestión
          </span>
          <Placeholder kind="odoo" />
        </div>
      </div>
      <p className="slide-caption">
        Personas y agentes investigan, toman decisiones y ejecutan procesos
        sobre una infraestructura común.
      </p>
    </SlideShell>,

    <SlideShell
      key="capabilities"
      eyebrow="04 · SOPORTE INSTITUCIONAL"
      title="La plataforma conecta el trabajo cotidiano con los procesos formales"
    >
      <div className="capability-stage">
        <div className="capability-core">
          <Database />
          <span>
            Plataforma
            <br />
            de gestión
          </span>
        </div>
        {management.map(([label, Icon], i) => (
          <div className={`service service-${i}`} key={label}>
            <Icon />
            <span>{label}</span>
          </div>
        ))}
        <svg
          className="service-lines"
          viewBox="0 0 1000 440"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M500 220 L180 90 M500 220 L815 90 M500 220 L130 345 M500 220 L500 390 M500 220 L870 345" />
        </svg>
      </div>
    </SlideShell>,

    <SlideShell
      key="ecosystem"
      eyebrow="05 · ECOSISTEMA CAETI"
      title="Tres líneas articulan nueve proyectos de investigación"
    >
      <div className="ecosystem">
        <div className="ecosystem-core">
          <Network />
          <span>TI/26/140</span>
          <strong>
            Arquitectura
            <br />
            adaptativa
          </strong>
        </div>
        {(Object.keys(lineMeta) as Array<keyof typeof lineMeta>).map(
          (line, lineIndex) => (
            <div
              className={`line-cluster cluster-${lineIndex}`}
              key={line}
              style={
                { '--line-color': lineMeta[line].color } as React.CSSProperties
              }
            >
              <h3>{lineMeta[line].label}</h3>
              <div>
                {projects
                  .filter((p) => p.line === line)
                  .map((p) => (
                    <button key={p.code} onClick={() => setSelected(p)}>
                      {p.code}
                    </button>
                  ))}
              </div>
            </div>
          ),
        )}
      </div>
      <p className="interaction-hint">
        Seleccioná un proyecto para abrir su ficha
      </p>
    </SlideShell>,

    <SlideShell
      key="projects"
      eyebrow="06 · PROYECTOS"
      title="Cada iniciativa aporta conocimiento al entorno compartido"
    >
      <div className="project-list">
        {projects.map((project) => (
          <button
            key={project.code}
            onClick={() => setSelected(project)}
            style={
              {
                '--line-color': lineMeta[project.line].color,
              } as React.CSSProperties
            }
          >
            <span className="project-code">{project.code}</span>
            <strong>{project.title}</strong>
            <span className="project-director">{project.director}</span>
            <ChevronRight />
          </button>
        ))}
      </div>
    </SlideShell>,

    <SlideShell
      key="actors"
      eyebrow="07 · COMUNIDAD AUMENTADA"
      title="Personas y agentes trabajan sobre el mismo espacio institucional"
    >
      <div className="actors-stage">
        <div className="actor human">
          <CircleUserRound />
          <strong>Investigadores</strong>
          <span>definen, validan y producen conocimiento</span>
        </div>
        <div className="actor students">
          <GraduationCap />
          <strong>Estudiantes y graduados</strong>
          <span>se forman mientras participan</span>
        </div>
        <div className="shared-work">
          <Network />
          <span>Espacio compartido</span>
          <i />
          <i />
          <i />
        </div>
        <div className="actor agents">
          <Bot />
          <strong>Agentes inteligentes</strong>
          <span>asisten, automatizan y conectan información</span>
        </div>
        <div className="actor management">
          <Database />
          <strong>Gestión institucional</strong>
          <span>formaliza y sostiene los procesos</span>
        </div>
      </div>
    </SlideShell>,

    <SlideShell
      key="journey"
      eyebrow="08 · PARTICIPACIÓN"
      title="La plataforma acompaña todo el recorrido de investigación"
    >
      <div className="journey">
        {[
          ['01', 'Convocatoria', 'Interés y preinscripción'],
          ['02', 'Formación', 'Taller institucional y metodológico'],
          ['03', 'Proyecto', 'Trabajo con dirección y equipo'],
          ['04', 'Producción', 'Artículo, congreso o publicación'],
          ['05', 'Reconocimiento', 'Beca, certificación y competencias'],
        ].map(([number, title, copy], i) => (
          <div className="journey-step" key={number}>
            <span>{number}</span>
            <i className={i < 4 ? 'active' : ''} />
            <strong>{title}</strong>
            <small>{copy}</small>
          </div>
        ))}
      </div>
      <div className="journey-callout">
        <GraduationCap />
        <p>
          La gestión y la formación forman parte del mismo sistema experimental.
        </p>
      </div>
    </SlideShell>,

    <section className="closing" key="closing">
      <div className="closing-network">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <span className="kicker">CAETI · 2026</span>
      <h2>
        Una arquitectura que se transforma mientras la comunidad investiga
      </h2>
      <p>
        La plataforma integra proyectos, personas, agentes inteligentes y
        procesos institucionales en un entorno común.
      </p>
      <div className="closing-actions">
        <span>
          <Check /> 9 proyectos
        </span>
        <span>
          <Check /> 3 líneas de investigación
        </span>
        <span>
          <Check /> 1 plataforma experimental
        </span>
      </div>
      <a
        href="https://nbapi.uai.edu.ar/convocatorias/"
        target="_blank"
        rel="noreferrer"
      >
        Conocer las convocatorias <ArrowRight />
      </a>
    </section>,
  ];

  return (
    <main className="presentation-app">
      <header className="topbar">
        <Brand />
        <div className="topbar-meta">
          <span>
            <Clock3 /> {time}
          </span>
          <button
            onClick={() => void document.documentElement.requestFullscreen?.()}
            title="Pantalla completa (F)"
          >
            <Maximize2 />
          </button>
        </div>
      </header>
      <div className="viewport">{slides[index]}</div>
      <footer className="controls">
        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Anterior"
        >
          <ArrowLeft />
        </button>
        <div className="progress-wrap">
          <span>
            {String(index + 1).padStart(2, '0')} / {total}
          </span>
          <div className="progress">
            <i style={{ width: `${((index + 1) / total) * 100}%` }} />
          </div>
        </div>
        <button
          onClick={() => go(index + 1)}
          disabled={index === total - 1}
          aria-label="Siguiente"
        >
          <ArrowRight />
        </button>
      </footer>
      <div className="key-hint">
        <Presentation /> Flechas para navegar · F para pantalla completa
      </div>
      {selected && (
        <dialog
          open
          className="project-modal"
          aria-label={`Proyecto ${selected.code}`}
        >
          <button
            className="modal-backdrop"
            onClick={() => setSelected(null)}
            aria-label="Cerrar ficha del proyecto"
          />
          <article
            style={
              {
                '--line-color': lineMeta[selected.line].color,
              } as React.CSSProperties
            }
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Cerrar"
            >
              <X />
            </button>
            <span className="modal-line">{lineMeta[selected.line].label}</span>
            <span className="modal-code">{selected.code}</span>
            <Image
              className="director-photo"
              src={selected.photo}
              alt={`Retrato de ${selected.director}`}
              width={164}
              height={164}
              unoptimized
            />
            <h3>{selected.title}</h3>
            <dl>
              <div>
                <dt>Dirección</dt>
                <dd>{selected.director}</dd>
              </div>
              <div>
                <dt>Equipo de investigación</dt>
                <dd>{selected.team}</dd>
              </div>
            </dl>
          </article>
        </dialog>
      )}
    </main>
  );
}
