# PROMPT MASTER: Propuesta Web Amerimed × FINEM

## INSTRUCCIÓN PRINCIPAL

Crea una propuesta web interactiva (single-page React con Tailwind CSS) para presentar los servicios de la agencia FINEM al Grupo Hospitalario Amerimed. Esta propuesta será enviada al socio operativo del consejo directivo de Amerimed. Debe ser visualmente impactante, clara para alguien sin conocimientos técnicos, y transmitir valor estratégico sin parecer una venta agresiva.

---

## CONTEXTO DEL PROYECTO

### Sobre el cliente

**Amerimed** es una red hospitalaria con **7 ubicaciones** en México: Cancún (sede principal), CDMX, Mérida, Playa del Carmen, Cozumel, Tulum e Isla Mujeres.

- **Nivel de infraestructura real:** Nivel 3 (Alta Especialidad). Tienen instalaciones, equipamiento y personal médico de primer nivel. Resonancia magnética, cateterismo cardíaco, UCI, neonatología, hemodinamia, +25 especialidades médicas y quirúrgicas, personal bilingüe, certificaciones del Consejo de Salubridad General y Medical Tourism Association de EE.UU.
- **Nivel de comunicación digital actual:** Nivel 1. La brecha entre lo que Amerimed ES y lo que Amerimed PARECE digitalmente es enorme.
- **Actualmente pagan:** ~$60,000 MXN/mes por servicios de marketing fragmentados.
- **Llevan +15 años** operando como red hospitalaria en destinos turísticos.

### Problema central

La comunicación digital de Amerimed no refleja su capacidad real. Esto les cuesta pacientes, posicionamiento y oportunidades de negocio en turismo médico.

### Sobre FINEM (la agencia)

FINEM es una agencia de marketing digital y creatividad con oficinas en Cancún, CDMX y Mérida. Posicionamiento: Partner estratégico de crecimiento, no proveedor de "paquetes de posts". Filosofía: No vendemos likes, vendemos ecosistemas. Si no suma, no sirve.

---

## DIRECCIÓN ESTÉTICA

### Base visual: Dark premium con tonalidades hospitalarias

La propuesta anterior ya se presentó en estética dark y fue bien recibida. Mantener esa dirección pero integrar elementos que comuniquen seriedad médica.

**Paleta de colores:**
- **Fondo base:** `#020410` (Deep Space — identidad FINEM)
- **Superficies/cards:** `rgba(255,255,255,0.04)` a `rgba(255,255,255,0.08)` con glass morphism
- **Acento primario:** `#14B8A6` (teal) — comunica salud, tecnología, confianza. Usar como color dominante de esta propuesta en lugar del orange de FINEM. El teal es más apropiado para el contexto hospitalario.
- **Acento secundario:** `#3B82F6` (blue) — para fases intermedias, datos, gráficas
- **Acento terciario:** `#F97316` (orange FINEM) — solo para CTAs y elementos de la agencia
- **Texto principal:** `#FFFFFF` para headlines, `#E2E8F0` para cuerpo, `#94A3B8` para texto secundario

**Tipografía:**
- Headlines: Font bold/extrabold, tracking tight, tamaño grande. Usar una tipografía premium de Google Fonts (Syne, Space Grotesk, o similar — NO Inter ni Roboto).
- Body: Font light/regular, legible. DM Sans o similar.
- Labels/etiquetas: Uppercase, tracking wide, tamaño pequeño.

**Efectos visuales:**
- Blob gradients suaves en background (teal + blue + purple, muy sutiles)
- Glass morphism en cards y paneles
- Animaciones de entrada suaves al hacer scroll (fade-in, slide-up)
- NO usar imágenes de stock. Todo se comunica con diseño, iconografía y datos.

**IMPORTANTE:** La estética debe sentirse como "consultoría de alto nivel para el sector salud", no como "agencia creativa cool". Sofisticada, seria, confiable, pero moderna.

---

## ARQUITECTURA DE SECCIONES

### SECCIÓN 1: HERO

**Objetivo:** Declaración de intención que enganche al socio operativo.

**Contenido:**
- Headline principal: Una frase que capture "Amerimed merece proyectarse como lo que realmente es". NO usar esa frase literal — crear algo más impactante y directo.
- Subheadline: Comunicar que esta propuesta es un plan integral de 12 meses para cerrar la brecha entre la infraestructura real de Amerimed y su presencia digital.
- Un dato de impacto visual: "7 hospitales. +25 especialidades. +15 años. 1 presencia digital fragmentada."
- NO poner logo de FINEM prominente — esta propuesta es SOBRE Amerimed, no sobre FINEM.

**Diseño:** Full viewport height. Blob gradient sutil de fondo. Texto centrado o ligeramente a la izquierda. Animación de entrada elegante.

---

### SECCIÓN 2: DIAGNÓSTICO

**Objetivo:** Mostrar el estado actual vs. el potencial real. Aquí se planta la semilla de por qué necesitan web nueva y posible rebranding, sin venderlo directamente.

**Contenido a incluir:**

**Panel izquierdo — "Lo que Amerimed ES":**
- Red hospitalaria de Alta Especialidad (Nivel 3)
- +25 especialidades médicas y quirúrgicas
- UCI, neonatología, hemodinamia, resonancia magnética, cateterismo
- Personal bilingüe certificado
- Certificaciones del Consejo de Salubridad General
- Certificación Medical Tourism Association (EE.UU.)
- Presencia en 7 destinos turísticos estratégicos
- +15 años de operación

**Panel derecho — "Lo que Amerimed PARECE digitalmente":**
- Instagram corporativo: 2,473 seguidores (con 1,401 posts publicados — engagement mínimo)
- Web fragmentada: 7 dominios separados sin conexión (amerimedcancun.com, amerimedisla.com, amerimedplaya.com, etc.)
- Sin sistema de citas en línea (TocDoc confirma: "no recibe citas en línea")
- Sin directorio médico funcional con perfiles individuales
- Sin versión en inglés completa (siendo que el turismo médico es un pilar de negocio)
- Sin journey digital del paciente: no hay flujo Google → Web → Información → Agendar
- Identidad visual inconsistente entre sedes (7 ubicaciones = 7 voces diferentes)
- Sin estrategia de contenido (se publica por publicar, sin narrativa conectada)

**Elemento visual:** Un "termómetro" o barra comparativa que muestre visualmente la brecha. Infraestructura real en verde/teal al 90%. Presencia digital en rojo/naranja al 20%.

**Texto de cierre de sección (transición natural):**
Algo como: "Esta brecha no es solo un problema de imagen — es un problema de negocio. Cada peso invertido en campañas se diluye cuando el ecosistema digital no está preparado para convertir. Un sitio web fragmentado, una identidad inconsistente y la ausencia de herramientas digitales de conversión limitan directamente los resultados de cualquier estrategia de marketing."

Este cierre planta la necesidad de la web nueva y el rebranding como prerrequisitos estratégicos, no como ventas adicionales.

---

### SECCIÓN 3: BENCHMARK COMPETITIVO

**Objetivo:** Mostrar con datos reales que los competidores ya están haciendo lo que Amerimed debería hacer. No atacar, sino usar como referencia de hacia dónde va el mercado.

**Datos reales verificados para incluir (NO inventar datos):**

**Competencia regional (Cancún / Península):**

| Indicador | Amerimed | Hospiten | Galenia |
|---|---|---|---|
| Instagram seguidores | 2,473 | 11,000 (global) + 7,854 (México) | 2,074 |
| Facebook seguidores | 20,184 (solo Cancún) | Red internacional | 25,301 |
| Web unificada | NO (7 dominios separados) | SÍ (hospiten.com con todas las sedes) | SÍ (hospitalgalenia.com) |
| App propia | NO | SÍ (citas, documentos médicos, gestión familiar) | NO |
| Citas en línea | NO | SÍ (desde la web y app) | Parcial |
| Blog/contenido de autoridad | NO | SÍ (artículos por sede y especialidad) | SÍ (podcast "Actitud Saludable") |
| Versión en inglés | Parcial (algunas páginas) | SÍ (completa) | SÍ (completa) |
| Presencia internacional | Solo México | 20 hospitales en 5 países | Rankings LatAm |

**Referentes nacionales/internacionales:**
- Hospiten: Red de 20 hospitales en 5 países. +55 años de operación. Ecosistema digital completo con app, citas online, blog de autoridad, identidad visual unificada. Son el benchmark directo de lo que Amerimed puede lograr.
- Hospital Galenia (Cancún): Ranking #40 de mejores hospitales de LatAm 2025 (IntelLat). Único hospital de Quintana Roo en rankings latinoamericanos. 4 certificaciones internacionales. A pesar de ser un solo hospital, su posicionamiento digital supera al de una red de 7.

**Mensaje clave:** "Amerimed tiene la infraestructura para liderar. Sus competidores lo están haciendo con menos recursos pero con una estrategia digital coherente."

**Diseño:** Cards comparativas con glass morphism. Iconos para cada indicador. Color coding: rojo para las carencias de Amerimed, teal para lo que los competidores ya tienen. NO incluir logos de competidores — solo nombres y datos.

---

### SECCIÓN 4: LA VISIÓN

**Objetivo:** Pintar el futuro a 12 meses. Cómo se verá Amerimed después de trabajar con FINEM.

**Contenido:**
- Un sitio web unificado, bilingüe, con directorio médico y sistema de citas en línea
- Identidad visual consistente en las 7 sedes
- Presencia activa y estratégica en redes sociales con contenido de autoridad médica
- Campañas de captación segmentadas (paciente local, turismo médico USA/Canadá, B2B aseguradoras)
- Sistema de gestión de reputación online (reviews Google/Facebook < 2 horas respuesta)
- Dashboard de inteligencia por plaza y servicio
- Especialistas posicionados como referentes en su área

**Diseño:** Visual tipo "antes y después" o una línea de transformación. Puede ser una animación de morfismo donde el estado actual se transforma en el futuro.

---

### SECCIÓN 5: PILARES DE INFRAESTRUCTURA

**Objetivo:** Presentar el sitio web y el rebranding como inversiones necesarias para que la estrategia funcione — NO como servicios adicionales de venta.

**Tono:** "Para que las 4 fases de trabajo generen el impacto proyectado, necesitamos construir dos pilares fundamentales."

**Pilar 1 — Plataforma Digital Unificada (Sitio Web)**
- Un solo ecosistema bajo amerimedhospitals.com con secciones por sede
- Directorio médico con perfiles individuales de cada doctor (+100 especialistas)
- Sistema de citas en línea integrado
- ~25-30 landing pages optimizadas por especialidad (SEO + conversión)
- Versión completa en inglés para turismo médico
- Arquitectura moderna, rápida, responsive, preparada para escalar
- **Inversión: $320,000 MXN** (pagaderos en 3 parcialidades durante los primeros 6 meses)
- **Contexto de valor:** "Un sitio web de esta magnitud — bilingüe, con directorio de +100 doctores, 7 sedes, 25+ landings SEO y sistema de citas — tiene un valor de mercado de $400,000 - $500,000 MXN con agencias especializadas."

**Pilar 2 — Rebranding Integral (Condicional)**
- Presentar como recomendación estratégica, NO como obligatorio
- Texto: "Si durante la Fase 1 de estandarización determinamos que la identidad visual actual no soporta la proyección que Amerimed necesita como red hospitalaria unificada, recomendaremos un proceso de rebranding integral."
- Incluye: nueva identidad visual, manual de marca, aplicaciones en todos los touchpoints digitales y físicos
- **Inversión estimada: $150,000 MXN**
- Enfatizar: "Esta inversión se activaría solo si el diagnóstico estratégico lo determina necesario."

**Diseño:** Dos cards grandes, lado a lado. Glass morphism. Ícono representativo para cada pilar. El pilar de web con borde teal sólido (confirmado). El pilar de rebranding con borde discontinuo o más sutil (condicional).

---

### SECCIÓN 6: ROADMAP — PLAN DE ACCIÓN A 12 MESES

**Objetivo:** Mostrar las 4 fases con timeline visual y entregables claros por mes.

**FASE 1: ESTANDARIZACIÓN (Meses 1-3)**
Subtítulo: "Orden, unidad y base sólida"

Entregables:
- Manual de uso digital (tono, paleta, tipografía, templates para redes)
- Homologación de bios, portadas y perfiles de las 7 sedes en IG + FB
- LinkedIn corporativo configurado
- Protocolo de respuesta a comentarios y mensajes
- Protocolo de crisis y gestión de reputación
- 12 piezas de contenido originales/mes (corporativo, replicado con ajustes locales en 7 cuentas)
- 8-10 stories/mes por cuenta (plantillas reutilizables)
- 1 día de producción audiovisual/mes en Cancún (15-20 fotos editadas + 3-4 videos cortos)
- Inicio del desarrollo web (arquitectura, wireframes, diseño UI/UX)

**FASE 2: HUMANIZACIÓN (Meses 4-6)**
Subtítulo: "Confianza a través de rostros y tecnología"

Entregables:
- Se mantienen 12 piezas corporativas/mes
- Se añaden 4 piezas de contenido local/mes para Cancún y CDMX (doctores, testimoniales, tecnología)
- Total: 20 piezas originales/mes
- 12-15 stories/mes por cuenta
- 2 días de producción audiovisual/mes (1 Cancún + 1 rotativo CDMX/Mérida/Playa)
- Testimoniales de pacientes en video (1-2 por sesión)
- Desarrollo web: sedes completas, directorio médico, sistema de citas
- Inicio de versión en inglés
- SEO: optimización on-page por especialidad, Google My Business para 7 sedes
- Paid Media: arranque de campañas (check-ups + urgencias turísticas)
- Fee de administración de pauta: 15% sobre inversión publicitaria (presupuesto de pauta lo pone Amerimed)

**FASE 3: ADQUISICIÓN (Meses 7-9)**
Subtítulo: "De defensa a ataque"

Entregables:
- Contenido local se expande a Mérida y Playa del Carmen
- Total: 28 piezas originales/mes
- 2-3 días de producción audiovisual/mes (rotativo entre sedes)
- Versión en inglés del sitio web completa
- Funnels de conversión por servicio high-ticket (maternidad, check-ups ejecutivos, cirugía bariátrica)
- Campañas de turismo médico en inglés (USA/Canadá)
- Retargeting web
- Sistema de gestión de reviews Google/Facebook (respuesta < 2 horas)
- 1 refuerzo de marketing (medio tiempo o freelance)

**FASE 4: EXPANSIÓN (Meses 10-12)**
Subtítulo: "Cobertura total y optimización"

Entregables:
- Contenido local en las 7 sedes
- Total: 40 piezas originales/mes
- 3 días de producción audiovisual/mes (incluye sedes menores)
- Evaluación de TikTok con banco de video generado
- Optimización continua de web, A/B testing en funnels de conversión
- Dashboard de leads por sede y servicio
- Integración CRM custom para filtrado de leads (turismo médico vs. local vs. urgencias)

**Diseño del timeline:**
- Visual horizontal tipo roadmap con 4 bloques
- Cada fase con color progresivo (de más claro a más intenso en teal)
- Íconos representativos por tipo de entregable
- Al hacer hover o click en cada fase, se despliega el detalle de entregables
- Incluir indicadores de volumen: número de piezas, días de shooting, plataformas activas

**TABLA RESUMEN (incluir visualmente):**

| Concepto | F1 (M1-3) | F2 (M4-6) | F3 (M7-9) | F4 (M10-12) |
|---|---|---|---|---|
| Piezas originales/mes | 12 | 20 | 28 | 40 |
| Días de producción/mes | 1 | 2 | 2-3 | 3 |
| Plataformas | IG+FB (7) + LI (1) | Igual | Igual | + TikTok (evaluación) |
| Web | Diseño + inicio dev | Dev + Directorio + Citas | Inglés + Funnels | Optimización |
| SEO | — | GMB + On-page | Expansión | Mantenimiento |
| Paid Media | — | Arranque | Campañas EN + Retargeting | Full |

---

### SECCIÓN 7: ENTREGABLES DETALLADOS

**Objetivo:** Para el socio operativo que quiere saber exactamente QUÉ recibe cada mes. Desglose claro sin tecnicismos.

Organizar por categorías con íconos:

**Redes Sociales**
- Plataformas: Instagram + Facebook para las 7 sedes, LinkedIn corporativo
- Contenido: De 12 a 40 piezas originales/mes (crecimiento progresivo por fase)
- Formatos: Posts estáticos, carruseles educativos, reels/videos cortos, stories
- Community Management: Gestión de comentarios y mensajes en todas las cuentas
- Reportes mensuales de métricas por sede

**Producción Audiovisual**
- De 1 a 3 días de shooting profesional/mes (crecimiento por fase)
- Entregables por día: 15-20 fotos editadas + 3-4 videos cortos
- Contenido: Retratos de doctores, instalaciones, tecnología, testimoniales de pacientes
- Rotación entre sedes según calendario estratégico
- Viáticos de producción fuera de Cancún: los cubre Amerimed

**Estrategia y Dirección**
- Dirección estratégica dedicada por Director de cuenta FINEM
- Planificación mensual de contenido alineada al plan comercial de Amerimed
- Calendario editorial basado en temporadas, especialidades y objetivos de negocio
- Juntas de seguimiento y revisión de resultados

**SEO y Posicionamiento**
- Optimización on-page por especialidad médica
- Google My Business optimizado y actualizado para las 7 sedes
- Landing pages por especialidad optimizadas para búsqueda

**Publicidad Digital (Paid Media)**
- Estrategia y administración de campañas (Google Ads + Meta Ads)
- Segmentación: paciente local, turismo médico, B2B
- Campañas en español e inglés
- Fee de administración: 15% sobre inversión publicitaria
- Presupuesto de pauta: lo invierte directamente Amerimed (no incluido en la iguala)
- Reportes de rendimiento con métricas de conversión

**Reputación Online**
- Monitoreo de reviews en Google y Facebook
- Protocolo de respuesta en menos de 2 horas
- Gestión proactiva de reputación digital

**Diseño:** Cards o acordeones expandibles por categoría. Cada uno con ícono, título, y bullet points claros. Lenguaje simple, sin tecnicismos.

---

### SECCIÓN 8: METODOLOGÍA FINEM

**Objetivo:** Mostrar CÓMO trabaja FINEM — que no es una agencia que improvisa.

**Contenido (resumido, sin rollo corporativo):**

**"No hacemos marketing. Construimos ecosistemas."**

Tres principios visuales:

1. **Hub & Spoke** — Una narrativa central de marca (corporativo) con ejecuciones tácticas locales (por sede). Centralización estratégica con relevancia local.

2. **Torre de Control** — Un solo equipo con visión completa de las 7 sedes. No 7 freelancers descoordinados. Esto elimina duplicidad, inconsistencias y "ruido" de marca.

3. **Resultados sobre estética** — Cada pieza de contenido tiene un objetivo medible. No publicamos por publicar. Si no cumple un objetivo del plan comercial, no se produce.

**Diseño:** 3 cards horizontales o verticales con ícono y texto breve. Glass morphism. Animación sutil al scroll.

---

### SECCIÓN 9: ONBOARDING Y ARRANQUE

**Objetivo:** Mostrar que FINEM arranca desde el negocio del cliente, no desde la creatividad. Esto es lo que diferencia a FINEM de una agencia de posts.

**Título:** "Los primeros 30 días: Inmersión total en tu negocio"

**Contenido visual tipo timeline o steps:**

**Semana 1 — Inmersión**
- Reunión con directivos y responsables de cada sede
- Revisión del plan anual de negocio y plan comercial de Amerimed
- Identificación de servicios prioritarios por temporada y por sede
- Auditoría completa de presencia digital actual (todas las plataformas, todas las sedes)

**Semana 2 — Diagnóstico y KPIs**
- Definición de KPIs alineados a objetivos comerciales (no métricas vanidosas)
- Benchmark detallado por sede vs. competencia local
- Mapeo de audiencias por sede y por servicio
- Identificación de quick wins (oportunidades inmediatas)

**Semana 3 — Estrategia**
- Presentación del plan estratégico anual
- Calendario editorial alineado a temporadas, eventos y plan comercial
- Definición de pilares de contenido por sede
- Protocolos de comunicación y crisis

**Semana 4 — Ejecución**
- Homologación de perfiles (bios, portadas, información de contacto)
- Primer shooting de producción audiovisual
- Primeras publicaciones bajo la nueva estrategia
- Activación del manual de uso digital

**Texto de cierre:** "No arrancamos con un post bonito. Arrancamos con tu plan de negocio en la mano. Cada decisión creativa tiene un fundamento comercial."

**Diseño:** Timeline vertical con pasos numerados. Cada paso con ícono y resumen breve. Animación de revelado progresivo al scroll.

---

### SECCIÓN 10: SIMULADOR DE ROI (Interactivo)

**Objetivo:** Herramienta interactiva que proyecte resultados estimados basados en benchmarks reales del sector salud. Con disclaimer claro.

**Funcionalidad:**
- Slider o input donde el usuario pueda ajustar la inversión mensual en pauta publicitaria ($10,000 - $100,000 MXN)
- Al mover el slider, se actualizan las proyecciones en tiempo real:
  - Impresiones estimadas/mes
  - Clicks estimados/mes
  - Leads estimados/mes (formularios + llamadas + WhatsApp)
  - Costo por lead estimado

**Benchmarks para el cálculo (datos reales del sector salud en México):**
- CPM promedio sector salud México: $35-$60 MXN (usar $45)
- CTR promedio sector salud: 1.2% - 2.5% (usar 1.8%)
- Tasa de conversión landing page salud: 3% - 8% (usar 5%)
- Fórmulas:
  - Impresiones = (Inversión / CPM) × 1000
  - Clicks = Impresiones × CTR
  - Leads = Clicks × Tasa de conversión

**DISCLAIMER OBLIGATORIO (debe aparecer visible):**
"*Estas proyecciones son estimaciones basadas en benchmarks promedio del sector salud en México y campañas similares administradas por FINEM. Los resultados reales varían según temporada, competencia, calidad del contenido y múltiples factores externos. No constituyen una garantía de resultados.*"

**Ejemplo con $30,000 de pauta:**
- Impresiones: ~666,667/mes
- Clicks: ~12,000/mes
- Leads: ~600/mes
- Costo por lead: ~$50 MXN

**Diseño:** Card grande con glass morphism. Slider con estilo premium. Números grandes animados (counter animation). Gráfica simple que se actualiza. Disclaimer en texto pequeño pero legible debajo.

---

### SECCIÓN 11: INVERSIÓN

**Objetivo:** Presentar el pricing escalonado de forma clara, con contexto de valor.

**Estructura:**

**Primero — Iguala mensual (operación continua):**

Presentar como 4 cards de fase:

| Fase | Período | Inversión mensual |
|---|---|---|
| F1: Estandarización | Meses 1-3 | $95,000 MXN + IVA |
| F2: Humanización | Meses 4-6 | $105,000 MXN + IVA |
| F3: Adquisición | Meses 7-9 | $120,000 MXN + IVA |
| F4: Expansión | Meses 10-12 | $120,000 MXN + IVA |

**Inversión anual en iguala: $1,320,000 MXN + IVA**
**Promedio mensual: $110,000 MXN + IVA**

**Segundo — Inversión en infraestructura digital:**

| Concepto | Inversión | Condición |
|---|---|---|
| Plataforma Web Unificada | $320,000 MXN + IVA | Pagadero en 3 parcialidades (meses 1, 3 y 5) |
| Rebranding Integral | $150,000 MXN + IVA | Condicional — se activa si la Fase 1 lo determina necesario |

**Tercero — Comparativo de valor:**

Mostrar una comparativa visual:

- "El costo de contratar servicios equivalentes por separado para 7 sedes:"
  - 7 agencias locales de redes sociales (a $15,000 c/u): $105,000/mes
  - Agencia de SEO: $20,000/mes
  - Agencia de paid media: $15,000/mes
  - Productora audiovisual: $25,000/mes
  - Desarrollador web: $24,000/mes
  - Director estratégico freelance: $35,000/mes
  - **Total fragmentado: $224,000/mes**
- "Con FINEM, todo integrado y coordinado: $110,000/mes promedio"
- **"Ahorro del 51% con calidad centralizada y visión estratégica unificada"**

**Notas importantes (texto pequeño pero claro):**
- La inversión en pauta publicitaria (Google Ads, Meta Ads) NO está incluida. Amerimed la invierte directamente en las plataformas. FINEM administra y optimiza con un fee del 15%.
- Viáticos de producción audiovisual fuera de Cancún los cubre Amerimed.
- Precios en pesos mexicanos antes de IVA.

**Diseño:** Cards con glass morphism para cada fase. El comparativo de valor puede ser una barra visual que muestre $224K fragmentado vs. $110K FINEM, con el ahorro destacado en teal.

---

### SECCIÓN 12: CTA — SIGUIENTE PASO

**Objetivo:** Cerrar con acción clara y profesional.

**Contenido:**
- Headline: Algo como "El siguiente paso" o "Empecemos"
- Texto breve: "Agenda una reunión para revisar esta propuesta en detalle y definir juntos las fechas de arranque."
- Botón de WhatsApp o enlace de contacto
- Datos: hola@finem.mx | finem.mx | Cancún · CDMX · Mérida
- Logo FINEM (aquí sí, al cierre)

**Diseño:** Sección limpia, sin mucho ruido. Fondo más oscuro. Logo FINEM sutil. Botón de acción en orange (#F97316) — el único momento donde el orange domina.

---

## ESPECIFICACIONES TÉCNICAS

### Stack
- React (JSX) — single component con export default
- Tailwind CSS (utility classes)
- Lucide React para iconografía
- Recharts o Chart.js si se necesitan gráficas
- Framer Motion o CSS animations para animaciones de scroll
- Google Fonts: importar tipografías premium (NO Inter, NO Roboto, NO Arial)
- Responsive: mobile-first, debe verse perfecto en móvil (el socio operativo lo verá probablemente desde su celular)

### Comportamiento
- Single page con scroll suave entre secciones
- Navegación fija (sticky header) con links a cada sección — mínima, casi invisible, que aparezca al hacer scroll
- Animaciones de entrada al scroll (intersection observer)
- El simulador de ROI debe ser completamente funcional con el slider
- Las tablas deben ser legibles en móvil (posiblemente convertir a cards en mobile)
- NO lazy load de imágenes porque no hay imágenes — todo es UI/código

### Calidad
- El código debe ser limpio, bien estructurado, con comentarios en las secciones principales
- Verificar que no haya errores de ortografía en español
- Verificar coherencia de datos: los números deben cuadrar entre secciones (si dices 12 piezas en el roadmap, debe decir 12 en el desglose de entregables)
- Los precios deben ser consistentes en todas las menciones

---

## DATOS DE REFERENCIA RÁPIDA (para verificación de coherencia)

### Amerimed — Datos actuales
- Instagram: @amerimedhospitals — 2,473 seguidores, 1,401 posts
- Facebook Cancún: 20,184 likes
- Sedes: 7 (Cancún, CDMX, Mérida, Playa del Carmen, Cozumel, Tulum, Isla Mujeres)
- Dominios separados: amerimedcancun.com, amerimedhospitals.com, amerimedisla.com, amerimedplaya.com, amerimedcozumel.com, etc.
- Especialidades: ~25-30 (angiología, cardiología, gastroenterología, ginecología, neurología, traumatología, urología, cirugía bariátrica, cirugía general, cirugía pediátrica, cirugía plástica, dermatología, alergología, nefrología, neumología, otorrinolaringología, oftalmología, medicina interna, urgencias, terapia intensiva, neonatología, hemodinamia, rehabilitación, entre otras)
- Certificaciones: Consejo de Salubridad General, Medical Tourism Association (EE.UU.)
- Sin citas en línea
- Sin app
- Sin blog activo

### Competidores — Datos verificados
- Hospiten: 20 hospitales, 5 países, 55+ años. Instagram global 11K + México @hospitenmx 7,854. App propia. Citas online. Blog activo. Web unificada hospiten.com.
- Galenia: 1 hospital en Cancún. Ranking #40 LatAm 2025 (IntelLat). 4 certificaciones internacionales. Facebook 25,301. Instagram @hospital.galenia 2,074. Web hospitalgalenia.com.

### Pricing
- Iguala F1: $95,000/mes
- Iguala F2: $105,000/mes
- Iguala F3: $120,000/mes
- Iguala F4: $120,000/mes
- Promedio: $110,000/mes
- Anual iguala: $1,320,000
- Web: $320,000 (3 parcialidades)
- Rebranding: $150,000 (condicional)
- Total año 1 sin rebranding: $1,640,000
- Total año 1 con rebranding: $1,790,000
- Fee de pauta: 15%
- Comparativo mercado fragmentado: $224,000/mes
- Ahorro vs fragmentado: 51%

### Simulador ROI — Parámetros
- CPM: $45 MXN
- CTR: 1.8%
- Conversión: 5%
- Fórmula leads: (Inversión / 45) × 1000 × 0.018 × 0.05

---

## INSTRUCCIONES FINALES

1. NO generar contenido creativo (copies, ideas de posts, ejemplos de diseño para Amerimed). La propuesta habla de ESTRUCTURA y PROCESO, no de ideas creativas.
2. El tono es de consultor estratégico que entiende de negocios, no de vendedor de servicios creativos.
3. Todo dato numérico debe tener fuente implícita (datos de redes sociales verificados, benchmarks del sector).
4. El documento debe poder leerse de principio a fin en 8-12 minutos (scroll fluido, secciones concisas).
5. Cada sección debe responder una pregunta del tomador de decisiones:
   - Hero: "¿De qué se trata esto?"
   - Diagnóstico: "¿Cuál es el problema?"
   - Benchmark: "¿Qué están haciendo los demás?"
   - Visión: "¿Hacia dónde vamos?"
   - Pilares: "¿Qué necesitamos construir primero?"
   - Roadmap: "¿Cuál es el plan?"
   - Entregables: "¿Qué recibo exactamente?"
   - Metodología: "¿Cómo trabajan?"
   - Onboarding: "¿Cómo empezamos?"
   - ROI: "¿Qué resultados puedo esperar?"
   - Inversión: "¿Cuánto cuesta y por qué vale la pena?"
   - CTA: "¿Qué hago ahora?"
