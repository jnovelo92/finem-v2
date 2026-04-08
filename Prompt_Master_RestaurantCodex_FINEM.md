# PROMPT MASTER — Propuesta Web Restaurant Codex / Food Hub
## Para ejecutar en Claude Code

---

## 1. INSTRUCCIÓN PRINCIPAL

Construye una propuesta comercial como single-page React + Tailwind CSS. Debe ser responsive, con scroll suave entre secciones, animaciones de entrada por sección (fade-in + slide-up al hacer scroll), y estética dark premium minimalista.

Stack:
- React (functional components, hooks)
- Tailwind CSS
- Framer Motion para animaciones
- Lucide React para iconografía
- Google Fonts: **Instrument Serif** (display/headings) + **Satoshi** o **General Sans** (body). Si no están disponibles, usar Playfair Display + DM Sans.

Archivo único (.jsx) que se pueda renderizar como artifact.

---

## 2. CONTEXTO DEL PROYECTO

**Cliente:** Jose David Castro Zabarain — Chef profesional y fundador de Restaurant Codex, un SaaS de operaciones para restaurantes.

**Empresa:** Food Hub & Restaurant Codex LLC (Miami, FL). Actualmente David está en Cancún.

**Problema de negocio:** Tiene un producto funcional (restaurantcodex.com) y conocimiento profundo del sector, pero no tiene una máquina de contenido orgánico que lo posicione como referente y genere leads. Sus redes tienen tracción incipiente pero sin estrategia, sin identidad visual sólida para Codex, y sin producción consistente.

**Agencia:** FINEM (finem.mx) — Agencia de marketing digital y creatividad con oficinas en Cancún, CDMX y Mérida. Director: Julian.

**Relación:** David es contacto cercano de Julian. El tono de la propuesta debe ser profesional pero directo, sin pomposidad. No es un pitch frío.

**Alcance:** Estrategia de redes sociales, plan de contenido, producción multimedia, edición, publicación, community management, y diseño de logo/identidad para Restaurant Codex.

---

## 3. DIRECCIÓN ESTÉTICA

**Tema:** Dark minimalista. Limpio, con mucho espacio negativo. No maximalist — la sofisticación viene de la contención.

**Paleta:**

| Token | Hex | Uso |
|-------|-----|-----|
| Background | #0A0A0F | Fondo principal (más suave que el negro puro) |
| Surface | #141419 | Cards, secciones alternas |
| Accent Primary | #F97316 | CTAs, highlights, acento FINEM |
| Accent Secondary | #10B981 | Detalles de crecimiento, métricas positivas (verde esmeralda, guiño a hospitalidad/cocina) |
| Text Primary | #F5F5F5 | Títulos |
| Text Secondary | #A1A1AA | Cuerpo, descripciones |
| Border | #27272A | Bordes sutiles, separadores |

**Efectos:**
- NO blob gradients grandes — mantener minimalista
- Líneas finas decorativas (1px, color border) como separadores entre secciones
- Glass morphism sutil SOLO en cards de inversión (backdrop-blur-sm, bg-white/5, border border-white/10)
- Gradientes sutiles solo en el hero (radial gradient muy tenue desde accent colors)
- Hover states suaves (scale 1.02, opacity transitions)

**Tipografía:**
- Headings: Instrument Serif (o Playfair Display), font-weight 400, tracking tight
- Body: Satoshi (o DM Sans), font-weight 400
- Números/datos: DM Mono o el body font en tabular-nums
- Tamaños: Hero title 4xl-6xl, section titles 3xl, body lg

**Iconografía:** Lucide React. Tamaño 20-24px. Color accent o text-secondary. Sin fondos circulares — solo el icono limpio.

---

## 4. ARQUITECTURA DE SECCIONES

### Sección 1: HERO

Layout: Pantalla completa. Título centrado o left-aligned con foto de David a la derecha (placeholder con div redondeado).

Contenido:
```
Título: "Tu restaurante no tiene un problema de gente. Tiene un problema de sistemas."
Subtítulo: "Tu contenido debería decir lo mismo."
Párrafo: "Una estrategia de contenido diseñada para posicionar a Restaurant Codex como el estándar de operaciones en la industria restaurantera."
CTA: "Ver la propuesta" → scroll a siguiente sección
Nota pequeña: "Propuesta preparada por FINEM para David Castro — Abril 2026"
```

### Sección 2: DIAGNÓSTICO

Título: "Dónde estás hoy"

Tres cards minimalistas, una por cuenta:

**Card 1 — @foodhub.io**
- 10,000 seguidores
- 117 publicaciones
- "Tu cuenta más fuerte. Ya tiene audiencia y la bio apunta a Codex. Pero sin estrategia de contenido consistente, el crecimiento se estancó."

**Card 2 — @restaurant.codex**
- 960 seguidores
- "La cuenta del producto. Sin momentum propio. Necesita contenido técnico (demos, features, comparativas) pero no necesita producción independiente — se alimenta de lo que ya produces para Food Hub."

**Card 3 — David Castro (personal)**
- ~4,000 seguidores
- "Tu marca personal como chef y operador. No entra en scope de producción — pero es un amplificador natural de lo que publiques en Food Hub."

Debajo de las cards:
```
Texto: "El diagnóstico es claro: tienes el producto, tienes el conocimiento, tienes la historia. Lo que falta es el sistema que convierte todo eso en contenido consistente que trabaje para ti todos los días."
```

### Sección 3: BENCHMARK

Título: "El panorama competitivo"

Tabla o cards comparativas:

| | Trainual | Restaurant365 | Toast | Restaurant Codex |
|--|----------|---------------|-------|-----------------|
| Instagram | 77K | Corporativo | Corporativo | 960 |
| Enfoque de contenido | Educativo, founder-led, con personalidad | Genérico, corporativo | Genérico, feature-based | Oportunidad |
| Inversión estimada en contenido | Alta | Muy alta | Muy alta | Por definir |

Texto debajo:
```
"Tus competidores más grandes gastan fortunas en contenido corporativo que nadie recuerda. Tu ventaja competitiva en contenido no es el presupuesto — es la autenticidad. Un chef real que operó restaurantes en tres países hablando desde la trinchera es más poderoso que cualquier video institucional de Toast."
```

### Sección 4: LA VISIÓN

Título: "Hacia dónde en 12 meses"

Layout: Statement grande + 3 métricas objetivo

```
Statement: "En 12 meses, David Castro es el nombre que aparece cuando un restaurantero busca cómo sistematizar su operación. Food Hub es el canal. Codex es la solución."
```

Métricas (en cards minimalistas con número grande + label):
- @foodhub.io → 25,000–30,000 seguidores
- @restaurant.codex → 5,000 seguidores
- Pipeline de leads orgánicos → medible y atribuible

### Sección 5: INFRAESTRUCTURA

Título: "Antes de escalar, hay que construir la base"

Contenido:
```
"Restaurant Codex necesita una identidad visual propia. Hoy el logo y los assets son genéricos. Antes de producir contenido a escala, necesitamos un logotipo profesional y un sistema visual mínimo que funcione en redes, en la web, y en todo lo que produzcamos."

Entregable: Logo + sistema de identidad básico para Restaurant Codex
Incluye: Logotipo, variantes (horizontal, vertical, isotipo), paleta de color, tipografía, lineamientos de uso básicos.
Inversión: $15,000 MXN (proyecto one-time, previo al arranque de contenido)
```

### Sección 6: ROADMAP

Título: "El plan: 4 fases en 12 meses"

Layout: Timeline horizontal en desktop, vertical en mobile. Cada fase es un bloque con nombre, meses, objetivo y entregables.

**Fase 1 — Setup Operativo (Meses 1–3)**
Objetivo: Orden, identidad visual y primeros contenidos
- 12 piezas/mes en @foodhub.io
- 1 sesión de producción/mes (video + foto)
- Definición de pilares de contenido
- Homologación de bios, highlights, links
- Logo y sistema visual de Codex

**Fase 2 — Autoridad & Consistencia (Meses 4–6)**
Objetivo: Posicionar a David como referente
- 16 piezas/mes en @foodhub.io
- Repurpose a @restaurant.codex y LinkedIn
- 2 sesiones de producción/mes
- Series de contenido recurrentes
- Contenido técnico de Codex (demos, antes/después)

**Fase 3 — Aceleración Orgánica (Meses 7–9)**
Objetivo: Crecer audiencia y generar leads orgánicos
- 16 piezas/mes + repurpose multiplataforma
- 2 sesiones de producción/mes
- Colaboraciones con cuentas del nicho restaurantero
- Contenido en inglés + español
- DM scripts para conversión

**Fase 4 — Consolidación & Escala (Meses 10–12)**
Objetivo: Optimizar y documentar
- 16 piezas/mes + repurpose multiplataforma
- 2 sesiones de producción/mes
- Dashboard de métricas
- Playbook documentado para internalización eventual

### Sección 7: ENTREGABLES

Título: "Qué recibes exactamente"

Lista limpia (NO bullet points con iconos grandes — texto con separadores sutiles):

**Estrategia & Planeación**
- Estrategia de redes sociales con pilares de contenido
- Calendario editorial mensual
- Guiones y briefs por pieza para David

**Producción**
- Sesiones de producción en Cancún (video + foto profesional)
- Dirección creativa en cada sesión
- Edición y post-producción de todo el material

**Publicación & Gestión**
- Publicación y scheduling en todas las cuentas activas
- Community management (DMs, comentarios, engagement proactivo)
- Repurpose de contenido a @restaurant.codex y LinkedIn

**Identidad Visual**
- Logo profesional para Restaurant Codex
- Sistema de identidad básico (one-time)

**Reporting**
- Reporte mensual de métricas clave

### Sección 8: METODOLOGÍA

Título: "Cómo trabajamos"

Breve. Máximo 3 bloques:

**Hub & Spoke**
"David es el hub — genera el conocimiento y la autoridad. FINEM es el sistema que convierte ese conocimiento en contenido que trabaja 24/7."

**Sistematizar tu contenido como tú sistematizas operaciones**
"Lo que Codex hace por un restaurante, nosotros lo hacemos por tu marca. Procesos claros, ejecución consistente, resultados medibles."

**Resultados sobre estética**
"Cada pieza tiene un objetivo. No publicamos por publicar."

### Sección 9: ONBOARDING

Título: "Los primeros 30 días"

Timeline vertical simple:

- **Semana 1:** Inmersión en Restaurant Codex — entendimiento profundo del producto, ICP, y propuesta de valor
- **Semana 2:** Definición de pilares de contenido, calendario mes 1, homologación de cuentas
- **Semana 3:** Primera sesión de producción multimedia
- **Semana 4:** Primeras publicaciones en vivo + entrega de logo

### Sección 10: ROI

Título: "Los números hablan"

Layout simple, no simulador interactivo. Solo matemáticas claras:

```
Tu inversión mensual promedio: ~$30,000 MXN (~$1,700 USD)
Tu inversión anual: ~$360,000 MXN (~$20,500 USD)

Un cliente DWY de Codex: $10,000 USD
Un cliente DFY de Codex: $21,000 USD

Si el contenido genera 2 clientes DWY en el año → la inversión se paga completamente.
Si genera 1 cliente DFY → la inversión se paga sola con margen.

Esto sin contar el valor compuesto: posicionamiento, autoridad, comunidad y pipeline orgánico que crece mes con mes.
```

Disclaimer pequeño al pie: "Estas son estimaciones basadas en tu pricing actual. No son garantías de resultados."

### Sección 11: INVERSIÓN

Título: "La inversión"

Dos cards principales con glass morphism:

**Card 1 — Fase 1 (Meses 1–3)**
$27,000 MXN/mes
- 12 piezas de contenido/mes
- 1 sesión de producción/mes
- Estrategia, publicación, community management
- ~$1,540 USD/mes

**Card 2 — Fases 2–4 (Meses 4–12)**
$32,000 MXN/mes
- 16 piezas de contenido/mes + repurpose multiplataforma
- 2 sesiones de producción/mes
- Estrategia, publicación, community management
- ~$1,830 USD/mes

**Proyecto one-time:**
Logo + identidad Restaurant Codex → $15,000 MXN

Texto debajo:
```
"Contratarlo fragmentado (agencia de contenido + producción independiente + diseñador + consultor estratégico) costaría entre $80,000 y $110,000 MXN mensuales. Con FINEM todo está integrado en un solo equipo con un solo interlocutor."

"Nota: esta propuesta no incluye pauta publicitaria ni funnels de conversión."
```

### Sección 12: CTA

Título: "¿Arrancamos?"

```
Texto: "El siguiente paso es una llamada de kick-off para alinear calendario y arrancar con la inmersión en Codex."
Botón: "Agendar kick-off" (link placeholder)
O: "Confirmar por WhatsApp" (link placeholder)
Texto pequeño: "Propuesta válida por 15 días a partir de la fecha de envío."
```

### Footer mínimo
```
FINEM — finem.mx
Cancún · CDMX · Mérida
```

---

## 5. ESPECIFICACIONES TÉCNICAS

- Scroll suave entre secciones (scroll-behavior: smooth)
- Cada sección tiene min-height apropiado (hero: 100vh, resto: auto con padding generoso py-24 a py-32)
- Animaciones de entrada: fade-in + translateY(20px) al entrar en viewport. Usar Framer Motion con whileInView.
- Stagger en cards y listas (delay 0.1s entre elementos)
- Responsive: mobile-first. En mobile las cards van en columna, la tabla de benchmark se convierte en cards apiladas.
- El hero tiene un gradiente radial muy sutil (accent colors al 5-8% opacity) en la esquina superior derecha
- Separadores entre secciones: línea horizontal de 1px con gradiente (transparent → border color → transparent)
- NO usar blob gradients, NO usar grain texture, NO usar custom cursor. Mantener minimalista.

---

## 6. DATOS DE REFERENCIA RÁPIDA

| Dato | Valor |
|------|-------|
| Iguala F1 | $27,000 MXN/mes |
| Iguala F2–F4 | $32,000 MXN/mes |
| Logo one-time | $15,000 MXN |
| Total año (3×27K + 9×32K + 15K) | $384,000 MXN |
| Total año USD (~17.5) | ~$21,943 USD |
| Piezas F1 | 12/mes |
| Piezas F2–F4 | 16/mes + repurpose |
| Sesiones producción F1 | 1/mes |
| Sesiones producción F2–F4 | 2/mes |
| @foodhub.io seguidores actuales | 10,000 |
| @restaurant.codex seguidores actuales | 960 |
| Trainual IG seguidores | 77,000 |
| Precio DWY Codex | $10,000 USD |
| Precio DFY Codex | $21,000 USD |
| Costo fragmentado estimado | $80,000–$110,000 MXN/mes |

---

## 7. INSTRUCCIONES FINALES

**Tono:** Directo, profesional, sin pomposidad. Como hablar entre colegas que se respetan. No usar "estimado cliente" ni "nos complace presentar". El texto debe sonar como Julian hablándole a David.

**Restricciones:**
- NO mencionar a Monetstrat ni a ninguna otra agencia
- NO incluir jerga de marketing que David no usaría (ROAS, funnel, CTR)
- NO prometer resultados específicos de seguidores o ventas (solo el ejercicio de ROI con disclaimer)
- El logo de FINEM solo aparece al cierre/footer
- Todo el contenido está en ESPAÑOL

**La pregunta que cada sección debe responder en la mente de David:**

| Sección | Pregunta implícita |
|---------|-------------------|
| Hero | "¿Esto es para mí?" → Sí, es exactamente tu problema |
| Diagnóstico | "¿Realmente entienden mi situación?" → Sí, con datos |
| Benchmark | "¿Hay oportunidad real?" → Sí, y tu ventaja es la autenticidad |
| Visión | "¿Hacia dónde vamos?" → A que seas el referente |
| Infraestructura | "¿Qué necesito antes de empezar?" → Un logo que no sea genérico |
| Roadmap | "¿Cuál es el plan?" → 4 fases progresivas, sin saltos |
| Entregables | "¿Qué recibo exactamente?" → Todo esto, sin sorpresas |
| Metodología | "¿Cómo trabajan?" → Como tú trabajas: sistemas |
| Onboarding | "¿Cómo arrancamos?" → En 4 semanas ya estamos publicando |
| ROI | "¿Vale la pena?" → Con 2 clientes se paga solo |
| Inversión | "¿Cuánto cuesta?" → Menos de lo que cuesta hacerlo fragmentado |
| CTA | "¿Qué hago ahora?" → Agendar kick-off |
