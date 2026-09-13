'use client';

import {
  ArrowLeft,
  ArrowRight,
  Bot,
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
  objective: string;
  publications: string[];
  featured?: Array<{ name: string; photo: string }>;
};

const projects: Project[] = [
  {
    code: 'TI/22/116',
    title: 'Tecnología Arduino aplicada a requerimientos sociales',
    director: 'Pedro López',
    team: 'Carlos Niell · Fernando Armas · 6 alumnos',
    line: 'robotica',
    photo: '/investigadores/pedro-lopez.png',
    objective:
      'Desarrollar robots orientados a necesidades de personas con capacidades diferentes.',
    publications: [
      'Passerini, S., Tabelione, F., & López, P. (2026). Desarrollo de un sistema cibernético de asistencia: prótesis robótica basada en visión computacional y arquitectura distribuida. WICC 2026.',
    ],
  },
  {
    code: 'TI/26/140',
    title:
      'Arquitectura de Software para la Transformación hacia Sistemas Adaptativos Inteligentes',
    director: 'Alejandro Sartorio',
    team: 'Silvia Poncio · Soledad Ayala · Alejandro Hernández · María Andrea Guisen · 2 alumnos',
    line: 'software',
    photo: '/investigadores/alejandro-sartorio.png',
    objective:
      'Definir y validar un método sistemático, incremental y reproducible, basado en arquitectura de software, para transformar propiedades y capacidades en sistemas de gestión empresarial consolidados.',
    publications: [
      'Sartorio, A., & Rossi, G. (2026). Transformación de LMS a ALS utilizando una arquitectura de referencia. WICC 2026.',
      'Sartorio, A., Ayala, S., & Hernández, A. (2025). Diseño de aplicaciones e-learning adaptativas: superando limitaciones mediante arquitecturas modulares y escalables. JAIIO 2025.',
    ],
  },
  {
    code: 'TI/22/113',
    title:
      'La tecnología blockchain como impulso para la transformación digital de las organizaciones',
    director: 'Alejandro Hernández',
    team: 'Pablo Audoglio · Leonardo Prósperi · Claudia Pons · Jorge Kamlofsky · 5 alumnos · 2 graduados',
    line: 'software',
    photo: '/investigadores/alejandro-hernandez.png',
    objective:
      'Estudiar casos de uso para la tecnología Blockchain y su aporte a la transformación digital de las organizaciones.',
    publications: [
      'Jaime, F., Estelles, J. P., Lodato, M., Torassa Colombero, V., & Hernández, A. (2025). Modelos de micropagos descentralizados: una propuesta basada en blockchain para servicios digitales. CONAIISI 2025.',
    ],
  },
  {
    code: 'TI/22/117',
    title: 'Hojas de rutas de aprendizaje aplicadas al desarrollo de software',
    director: 'Alejandro Sartorio',
    team: 'Matías Banega · Sebastián Velázquez · Carlos Neil · Marcelo De Vincenzi Zemborain · 4 alumnos',
    line: 'software',
    photo: '/investigadores/alejandro-sartorio.png',
    objective:
      'Crear un módulo tecnológico, metodológico y funcional que brinde servicios de construcción y utilización de hojas de rutas de actividades educativas aplicadas al desarrollo de software.',
    publications: [
      'Castellini, G., Avella, L., Villa, L., & Sartorio, A. (en prensa). Hojas de rutas de aprendizajes basadas en metodología ágil. CONAIISI.',
    ],
  },
  {
    code: 'TI/20/114',
    title: 'Ciberseguridad, conceptos y aplicaciones',
    director: 'Santiago Roatta',
    team: 'Pedro López · María Eugenia Casco · 11 alumnos · 4 graduados',
    line: 'software',
    photo: '/investigadores/santiago-roatta.png',
    objective:
      'Proteger la infraestructura de las redes informáticas y sus componentes a través de la ciberseguridad.',
    publications: [
      'Roatta, S., Casco, M. E., & Torassa, V. (2025). Dockerización de servidores SCADA: ciberseguridad industrial. WICC.',
      'Casco, M. E., & Roatta, S. E. (2025). Management of non-custodian digital evidence. Springer.',
    ],
    featured: [
      {
        name: 'Santiago Roatta',
        photo: '/investigadores/santiago-roatta.png',
      },
      {
        name: 'María Eugenia Casco',
        photo: '/investigadores/maria-eugenia-casco.png',
      },
    ],
  },
  {
    code: 'TI/26/139',
    title: 'Datawarehouse e IA para indicadores de Soft Skills',
    director: 'Silvia Poncio',
    team: 'Cintia Cuña · Alejandro Sartorio · 3 alumnos',
    line: 'educacion',
    photo: '/investigadores/silvia-poncio.png',
    objective:
      'Diseñar, implementar y validar un data warehouse con IA que permita diagnosticar y visualizar el desarrollo de soft skills mediante indicadores para formación y talento humano.',
    publications: [
      'Poncio, S., Cuña, C., Cardú, N., & Ruiz, G. (2025). Data Warehouse Soft Skills: modelo diagnóstico. TEYET.',
      'Bressan, C., et al. (2026). Modelo diagnóstico integral de competencias mediante BI e IA. WICC 2026.',
    ],
  },
  {
    code: 'TI/25/128',
    title:
      'Taxonomía de Prompting para la optimización de la Accesibilidad en Sistemas de IA Conversacional',
    director: 'María Andrea Guisen',
    team: 'Claudia Pons · Christian Parkinson · Alejandro Sartorio · 3 alumnos',
    line: 'educacion',
    photo: '/investigadores/maria-andrea-guisen.png',
    objective:
      'Desarrollar una taxonomía de prompts que integre dimensiones estructurales, funcionales, contextuales y expresivas para optimizar la accesibilidad en escenarios académicos universitarios.',
    publications: [
      'Guisen, M. A., et al. (2026). El prompt como unidad crítica de accesibilidad. WICC 2026.',
      'Acosta, M., et al. (2025). Accesibilidad y prompting en sistemas de IA conversacional. Revista RAIA.',
    ],
  },
  {
    code: 'TI/25/129',
    title:
      'Punto tecnológico para la accesibilidad de personas con síndrome de Rett y otras condiciones neurológicas',
    director: 'María Andrea Guisen',
    team: 'Claudia Pons · Christian Parkinson · Mauro Soto · Nadia Carolina Ksybala · 3 alumnos',
    line: 'educacion',
    photo: '/investigadores/maria-andrea-guisen.png',
    objective:
      'Identificar demandas emergentes de accesibilidad comunicacional y desarrollar soluciones informáticas de baja complejidad técnica y alto impacto social.',
    publications: [
      'Guisen, M. A., et al. (2026). Punto tecnológico para la accesibilidad de personas con síndrome de Rett. WICC 2026.',
      'Garay Angulo, L., et al. (2025). Manual de accesibilidad digital. CLACSO.',
    ],
  },
  {
    code: 'TI/22/111',
    title:
      'Sitios web educativos e inteligencia artificial: análisis de estándares WCAG',
    director: 'Soledad Ayala',
    team: 'Alejandro Hernández · Juliana Carpinetti · Santiago Roatta · 3 alumnos',
    line: 'educacion',
    photo: '/investigadores/soledad-ayala.png',
    objective:
      'Analizar condiciones de usabilidad en plataformas educativas e identificar el comportamiento de las Web Content Accessibility Guidelines.',
    publications: [
      'Ayala, S., Sartorio, A., Hernández, A., Gaseli, J., & Dip, M. (2025). Educación superior, plataformas e IA. SIDS, 54 JAIIO.',
      'Betta, L., Ayala, S., & Perren, M. (2025). Los materiales educativos digitales. RUEDA.',
    ],
  },
];

const lineMeta = {
  robotica: {
    label: 'Automatización y Robótica',
    color: '#ffb000',
    short: 'Robótica',
    icon: '🤖',
  },
  software: {
    label: 'Ingeniería de Software',
    color: '#15d4c5',
    short: 'Software',
    icon: '💻',
  },
  educacion: {
    label: 'Sociedad del Conocimiento y Tecnologías aplicadas a la Educación',
    color: '#8b7cff',
    short: 'Educación',
    icon: '🎓',
  },
};

const management = [
  ['Gestión documental', FileText],
  ['Comunicación institucional', MessageSquareText],
  ['Gestión de investigadores', UsersRound],
  ['Tramitaciones y procesos', Database],
  ['Capacitación y entrenamiento', GraduationCap],
] as const;

const evidence = [
  [
    'arquitectura-humano-agente.png',
    'Agentes especializados trabajando en paralelo',
  ],
  ['equipo-caeti.png', 'Investigadores CAETI Rosario'],
  ['dashboard-proyectos.png', 'Tablero de proyectos'],
  ['dashboard-objetivos.png', 'Seguimiento de objetivos'],
  ['formulario-incorporacion.png', 'Incorporación de participantes'],
  ['odoo-aplicaciones.png', 'Aplicaciones de gestión integradas'],
  ['crm-kanban.png', 'Flujo de incorporación en CRM'],
  ['crm-investigador.png', 'Seguimiento de cada investigador'],
  ['eventos.png', 'Gestión de eventos institucionales'],
  ['proyectos-odoo.png', 'Cartera de proyectos en Odoo'],
  ['proyecto-adaptativo-odoo.png', 'Proyecto troncal en operación'],
  ['tareas-kanban.png', 'Tareas y verificaciones'],
  ['entorno-colaborativo.png', 'Trabajo colaborativo con agentes'],
  ['contactos.png', 'Gestión de investigadores y contactos'],
  ['bot-telegram.png', 'Agentes disponibles desde Telegram'],
  ['hoja-ruta.png', 'Hoja de ruta estratégica'],
  ['objetivos-estrategicos.png', 'Objetivos y líneas de acción'],
  ['alineacion-caeti.png', 'Alineación con el plan institucional'],
] as const;

function Brand() {
  return (
    <div className="brand" aria-label="CAETI UAI">
      <span className="brand-mark">UAI</span>
      <span>
        <strong>CAETI</strong>
        <small>FTI · ROSARIO</small>
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

export default function Home() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<
    (typeof evidence)[number] | null
  >(null);
  const [closingVision, setClosingVision] = useState<
    'fantasia' | 'caeti' | 'gemelos'
  >('fantasia');
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
    setSelectedEvidence(null);
    setIndex(Math.max(0, Math.min(total - 1, next)));
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedEvidence)
        return setSelectedEvidence(null);
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
  }, [go, index, selected, selectedEvidence]);

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
      key="identity"
      eyebrow="CAETI · IDENTIDAD"
      title="Investigación aplicada con impacto en la sociedad"
      className="identity-slide"
    >
      <div className="identity-layout">
        <div className="identity-copy">
          <article>
            <span>Misión</span>
            <p>
              Contribuir al desarrollo de las TIC mediante investigación básica
              y aplicada, formar recursos humanos y transferir resultados hacia
              la industria y la sociedad.
            </p>
          </article>
          <article>
            <span>Visión</span>
            <p>
              Abordar problemas relevantes y necesidades sociales con soluciones
              tecnológicas, pensamiento organizado y capacidad de innovación.
            </p>
          </article>
        </div>
        <div className="research-lines">
          <span>Líneas de investigación</span>
          <strong>🤖 Automatización y Robótica</strong>
          <strong>💻 Ingeniería de Software</strong>
          <strong>
            🎓 Sociedad del Conocimiento y Tecnologías aplicadas a la Educación
          </strong>
        </div>
      </div>
    </SlideShell>,

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
      title="Un entorno real, observable y trazable"
      className="evidence-mosaic-slide"
    >
      <div className="evidence-mosaic">
        {evidence.map((item, itemIndex) => (
          <button key={item[0]} onClick={() => setSelectedEvidence(item)}>
            <Image
              src={`/evidencias/${item[0]}`}
              alt={item[1]}
              width={520}
              height={310}
              unoptimized
            />
            <span>{String(itemIndex + 1).padStart(2, '0')}</span>
            <strong>{item[1]}</strong>
          </button>
        ))}
      </div>
      <p className="interaction-hint">Seleccioná una imagen para ampliarla</p>
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
      <div className="unified-projects">
        {(Object.keys(lineMeta) as Array<keyof typeof lineMeta>).map((line) => (
          <div
            className="line-cluster"
            key={line}
            style={
              { '--line-color': lineMeta[line].color } as React.CSSProperties
            }
          >
            <h3>
              <span aria-hidden="true">{lineMeta[line].icon}</span>
              {lineMeta[line].label}
            </h3>
            <div>
              {projects
                .filter((p) => p.line === line)
                .map((p) => (
                  <button key={p.code} onClick={() => setSelected(p)}>
                    <span>{p.code}</span>
                    <strong>{p.title}</strong>
                    <small>{p.director}</small>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
      <p className="interaction-hint">
        Seleccioná un proyecto para abrir su ficha
      </p>
    </SlideShell>,

    <SlideShell
      key="hyperproductivity"
      eyebrow="07 · PROPIEDAD ADAPTATIVA"
      title="La hiperproductividad emerge al articular tres entornos"
    >
      <div className="hyper-visuals">
        {[
          [
            'agentes-personales.png',
            'Agentes personales',
            'Capacidades especializadas',
          ],
          [
            'canales-colaborativos.jpg',
            'Entorno colaborativo',
            'Humanos y agentes en canales',
          ],
          [
            'oficina-virtual.png',
            'Gestión integrada',
            'Procesos y trazabilidad',
          ],
        ].map(([src, label, copy]) => (
          <figure key={src}>
            <Image
              src={`/hiperproductividad/${src}`}
              alt={label}
              width={720}
              height={440}
              unoptimized
            />
            <figcaption>
              <strong>{label}</strong>
              <span>{copy}</span>
            </figcaption>
          </figure>
        ))}
        <div className="hyper-result">
          <Sparkles />
          <strong>Hiper(n)productividad</strong>
          <span>una propiedad adaptativa que escala ciclo tras ciclo</span>
        </div>
      </div>
      <div
        className="hyper-concepts"
        aria-label="Componentes del entorno adaptativo"
      >
        {[
          ['⚙️', 'Proceso'],
          ['👤', 'Humano'],
          ['🤖', 'Robot'],
          ['🛠️', 'Soporte Tech'],
          ['🧩', 'Ambiente de trabajo'],
        ].map(([icon, label]) => (
          <div key={label}>
            <span aria-hidden="true">{icon}</span>
            <strong>{label}</strong>
          </div>
        ))}
      </div>
      <a
        className="hyper-link"
        href="https://hiperprodu.asartorio.online/"
        target="_blank"
        rel="noreferrer"
      >
        Explorar Hiperproductividad <ArrowRight />
      </a>
    </SlideShell>,

    <section className="landing-closing" key="landing-closing">
      <span className="kicker">10 · IA Y TRANSFORMACIÓN ORGANIZACIONAL</span>
      <h2>
        <span>EL ATERRIZAJE DE LA</span>
        <strong>
          HIPER<sup>N</sup>PRODUCTIVIDAD
        </strong>
      </h2>
      <p>
        De la capacidad de la IA a su adopción efectiva en la última milla
        organizacional.
      </p>
      <div className="closing-vision-stage">
        <div className="closing-vision-selector">
          {[
            [
              'fantasia',
              '01',
              'La fantasía profesional',
              'Humanos + robots en la oficina',
            ],
            [
              'caeti',
              '02',
              'Lo que ya hacemos',
              'El ecosistema experimental CAETI',
            ],
            [
              'gemelos',
              '03',
              'La organización posible',
              'Un investigador ↔ un agente gemelo',
            ],
          ].map(([value, number, title, copy]) => (
            <button
              className={closingVision === value ? 'active' : ''}
              key={value}
              onClick={() => setClosingVision(value as typeof closingVision)}
            >
              <b>{number}</b>
              <span>{title}</span>
              <small>{copy}</small>
            </button>
          ))}
          <a
            className="closing-qr"
            href="https://t.me/cateti2026_bot"
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir el bot CAETI 2026 en Telegram"
          >
            <Image
              src="/cierre/telegram-caeti-qr.png"
              alt="Código QR para acceder al bot CAETI 2026 en Telegram"
              width={220}
              height={220}
              unoptimized
            />
            <span>
              <strong>Consultá al CAETI</strong>
              <small>Escaneá el QR · @cateti2026_bot</small>
            </span>
          </a>
        </div>
        <div className="closing-vision-display">
          {closingVision === 'fantasia' && (
            <figure>
              <Image
                src="/cierre/colaboracion-profesional-humanos-robots.jpg"
                alt="Profesionales y robots colaborando en una oficina"
                width={1400}
                height={1400}
                unoptimized
              />
              <figcaption>
                <b>IMAGINARIO COLECTIVO</b>
                <strong>
                  La oficina conocida incorpora nuevos compañeros digitales
                </strong>
                <span>
                  Procesos estandarizados · roles reconocibles · convivencia
                  humano–robot
                </span>
              </figcaption>
            </figure>
          )}
          {closingVision === 'caeti' && (
            <div className="caeti-vision">
              <div>
                {[
                  'cerebro-datos.png',
                  'terminal-agentes.png',
                  'canales-colaborativos.jpg',
                ].map((src) => (
                  <Image
                    key={src}
                    src={`/hiperproductividad/${src}`}
                    alt="Ecosistema tecnológico CAETI"
                    width={620}
                    height={390}
                    unoptimized
                  />
                ))}
              </div>
              <strong>CAETI</strong>
              <span>agentes · canales · gestión · datos · investigación</span>
            </div>
          )}
          {closingVision === 'gemelos' && (
            <div className="twin-vision">
              <article>
                <span>👤</span>
                <b>Investigador</b>
                <small>Objetivos · criterio · autoridad</small>
              </article>
              <i>↔</i>
              <article className="twin-core">
                <span>◎</span>
                <b>Agente gemelo</b>
                <small>Contexto · coordinación · memoria</small>
              </article>
              <i>→</i>
              <div>
                <span>👥 Humanos</span>
                <span>🤖 Agentes</span>
                <span>⚙️ Sistemas</span>
                <span>📚 Proyectos</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="closing-vision-feedback">
        Una arquitectura adaptativa convierte capacidades tecnológicas en una
        nueva forma de investigar, colaborar y gestionar.
      </div>
    </section>,

    <section className="thanks-slide" key="thanks">
      <div className="thanks-copy">
        <span className="kicker">CAETI · FTI ROSARIO · 2026</span>
        <h2>Gracias.</h2>
        <p>Nos vemos en estos lugares:</p>
      </div>
      <div className="thanks-destinations">
        <a
          className="thanks-telegram"
          href="https://t.me/cateti2026_bot"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/cierre/telegram-caeti-qr.png"
            alt="Código QR para acceder al bot CAETI 2026"
            width={520}
            height={520}
            unoptimized
          />
          <div>
            <span>01 · SEGUIMOS CONVERSANDO</span>
            <strong>
              En la Hiper<sup>N</sup>productividad del CAETI
            </strong>
            <small>Escaneá el QR · @cateti2026_bot</small>
          </div>
        </a>
        <a
          className="thanks-jinzo"
          href="https://jinzo.app/"
          target="_blank"
          rel="noreferrer"
        >
          <span>02 · UNA INVITACIÓN</span>
          <Image
            src="/cierre/jinzo-by-hitofusion.png"
            alt="Jinzo, una plataforma de HitoFusion"
            width={619}
            height={160}
            unoptimized
          />
          <strong>Conocé Jinzo de HitoFusion</strong>
          <small>Agentes de IA conectados a procesos reales</small>
          <b>
            Visitar jinzo.app <ArrowRight />
          </b>
        </a>
      </div>
    </section>,
  ];

  return (
    <main className="presentation-app">
      <header className="topbar">
        <Brand />
        <a
          className="ciiti-brand"
          href="https://www.uai.edu.ar/ciiti/2026/buenos-aires/"
          target="_blank"
          rel="noreferrer"
          aria-label="CIITI 2026"
        >
          <Image
            src="/ciiti-2026.png"
            alt="CIITI 2026"
            width={350}
            height={74}
            unoptimized
            priority
          />
        </a>
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
            <div className="featured-people">
              {(
                selected.featured ?? [
                  { name: selected.director, photo: selected.photo },
                ]
              ).map((person) => (
                <figure key={person.name}>
                  <Image
                    src={person.photo}
                    alt={`Retrato de ${person.name}`}
                    width={164}
                    height={164}
                    unoptimized
                  />
                  <figcaption>{person.name}</figcaption>
                </figure>
              ))}
            </div>
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
              <div>
                <dt>Objetivo</dt>
                <dd>{selected.objective}</dd>
              </div>
            </dl>
            <section className="modal-publications">
              <h4>Publicaciones · formato APA</h4>
              <ul>
                {selected.publications.map((publication) => (
                  <li key={publication}>{publication}</li>
                ))}
              </ul>
            </section>
          </article>
        </dialog>
      )}
      {selectedEvidence && (
        <dialog
          open
          className="evidence-lightbox"
          aria-label={selectedEvidence[1]}
        >
          <button
            className="modal-backdrop"
            onClick={() => setSelectedEvidence(null)}
            aria-label="Cerrar imagen"
          />
          <figure>
            <button
              className="modal-close"
              onClick={() => setSelectedEvidence(null)}
              aria-label="Cerrar"
            >
              <X />
            </button>
            <Image
              src={`/evidencias/${selectedEvidence[0]}`}
              alt={selectedEvidence[1]}
              width={1902}
              height={950}
              unoptimized
            />
            <figcaption>{selectedEvidence[1]}</figcaption>
          </figure>
        </dialog>
      )}
    </main>
  );
}
