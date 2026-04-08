/**
 * OrganicNailsContentHub - Calendario Editorial Febrero 2025
 * Cliente: Organic Nails
 * Usa los componentes existentes del sistema content-hub
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, List } from 'lucide-react';
import { CalendarView } from '../../components/content-hub/CalendarView';
import { FeedView } from '../../components/content-hub/FeedView';
import { FilterBar } from '../../components/content-hub/FilterBar';
import { PostModal } from '../../components/content-hub/PostModal';

// ============================================
// DATOS - ORGANIC NAILS FEBRERO 2025
// ============================================
const clientData = {
    clientName: "Organic Nails",
    month: "2025-02",
    monthDisplay: "Febrero 2025",
    location: "Cancún"
};

const postsData = [
    {
        id: "on-001",
        title: "Ritual de Amor Propio",
        type: "video",
        platform: "instagram",
        status: "scheduled",
        scheduledAt: "2025-02-04T12:00:00.000Z",
        publishedAt: null,
        mediaUrl: "https://youtube.com/shorts/MIRktADfEZo?si=xYCUbE9AUxWzMFi8",
        caption: `🎀 Maximiza tu rentabilidad con geles de alta densidad y cobertura total en capas ultra delgadas. En Organic Nails no solo creamos productos; creamos oportunidades para que tu talento brille con luz propia.✨

¿Lista para dominar el arte? Únete a nuestros talleres y perfecciona tu técnica con nosotros. 

#OrganicNails #Cancún #SelfLove #Gel`,
        feedback: { hasFeedback: false, lastComment: null }
    },
    {
        id: "on-002",
        title: "Bioseguridad Profesional",
        type: "video",
        platform: "instagram",
        status: "scheduled",
        scheduledAt: "2025-02-06T12:00:00.000Z",
        publishedAt: null,
        mediaUrl: "https://youtube.com/shorts/z-emGyDlM4k?si=P44nwqYetduZt4SM",
        caption: `🫧✨ Nuestras herramientas de acero quirúrgico de alta calidad con un afilado de precisión mecánica que garantiza cortes limpios y una desinfección total sin degradación.                                                                                   ¡Aprende los protocolos de higiene que nos distinguen en nuestros talleres complementarios!

#OrganicNails #Cancún #HigieneUñas #SafeBeauty #NailCare`,
        feedback: { hasFeedback: false, lastComment: null }
    },
    {
        id: "on-003",
        title: "Nail Artist Emprendedora",
        type: "video",
        platform: "instagram",
        status: "scheduled",
        scheduledAt: "2025-02-07T12:00:00.000Z",
        publishedAt: null,
        mediaUrl: "https://youtube.com/shorts/CV5OPyFoePw?si=kIKbN2Rto15zvaeL",
        caption: `✨ Ser Nail Artist es tener el poder de crear arte en miniatura y la libertad de ser tu propia jefa. ☁️ El mundo necesita tu talento y tus ganas de brillar. 🩰💸
¡Da el primer paso en nuestros talleres complementarios y profesionaliza tu pasión! 🎓💖 

#OrganicNails #Cancún #NailArtist #GirlBoss #Emprendedora`,
        feedback: { hasFeedback: false, lastComment: null }
    },
    {
        id: "on-004",
        title: "Estándar de Excelencia",
        type: "video",
        platform: "instagram",
        status: "scheduled",
        scheduledAt: "2025-02-11T12:00:00.000Z",
        publishedAt: null,
        mediaUrl: "https://youtube.com/shorts/ek_bE30TQiA?si=qIwMJlDxyz2bE-vJ",
        caption: `🧪 Únete a nuestro curso de Tech Gel y perfecciona el control de viscosidad, moldeado de precisión para aplicaciones más ligeras y resistentes. 💅✨

Inscríbete a nuestros talleres hoy mismo.🎓💗

#OrganicNails #Cancún #NailLuxury #Elite`,
        feedback: { hasFeedback: false, lastComment: null }
    },
    {
        id: "on-005",
        title: "Colores Vibrantes",
        type: "video",
        platform: "instagram",
        status: "scheduled",
        scheduledAt: "2025-02-13T12:00:00.000Z",
        publishedAt: null,
        mediaUrl: "https://youtube.com/shorts/e5_yaLE44-M?si=IHvVzpiM4gRAt6dw",
        caption: `🎨 Nuestra fórmula de alta saturación cromática garantiza tonos vibrantes, sin sedimentación y con una estabilidad de color excepcional bajo cualquier exposición lumínica. 

¡Sé una experta en color! Únete a nuestros talleres complementarios y domina la aplicación. 🎟️💕

#OrganicNails #Cancún #ColorEnergy #AestheticVibes`,
        feedback: { hasFeedback: false, lastComment: null }
    },
    {
        id: "on-006",
        title: "Dry Pedi Aesthetic",
        type: "video",
        platform: "instagram",
        status: "scheduled",
        scheduledAt: "2025-02-14T12:00:00.000Z",
        publishedAt: null,
        mediaUrl: "https://youtube.com/shorts/ybHqO_vj5Fo?si=9G68oQSzQaOvLYdf",
        caption: `✨ Maximiza la higiene y precisión de tu Dry Pedicure con nuestro sistema especializado. 👣

¿Te late aprender? Inscribete a nuestros talleres complementarios y dale un plus a tu servicio. 🎀🕊️
 
#OrganicNails #Cancún #DryPedicure #CleanAesthetic #FeetCare`,
        feedback: { hasFeedback: false, lastComment: null }
    },
    {
        id: "on-007",
        title: "Estación de Trabajo Premium",
        type: "video",
        platform: "instagram",
        status: "scheduled",
        scheduledAt: "2025-02-18T12:00:00.000Z",
        publishedAt: null,
        mediaUrl: "https://youtube.com/shorts/PeHZSkZlK8Q?si=jDlETYmJdIIIBfmO",
        caption: `💗 En nuestros cursos aprenderás la ingeniería de producto y las técnicas de aplicación avanzada necesarias para emprender con éxito.🧠💗

¡Inscríbete hoy y construye tu propio negocio! 🎟️💖

#OrganicNails #Cancún #NailTechLife #ProfessionalSetup #CleanLook
`,
        feedback: { hasFeedback: false, lastComment: null }
    },
    {
        id: "on-008",
        title: "Maestra Paola Vargas",
        type: "video",
        platform: "instagram",
        status: "scheduled",
        scheduledAt: "2025-02-20T12:00:00.000Z",
        publishedAt: null,
        mediaUrl: "https://youtube.com/shorts/YSfFVzEgCV0?si=QPp7bNbZoKgA76Yb",
        caption: `Maestría, estilo y pasión. 🫧 Descubre los secretos del éxito de la mano de la Maestra Paola Vargas. El nivel que tu talento necesita para brillar. 🩰💖

¿Te vemos en los talleres? Pasa a apartar tu lugar y transforma tu técnica. 🎟️💕

#OrganicNails #Cancún #NailExpert #PaolaVargas #LevelUp`,
        feedback: { hasFeedback: false, lastComment: null }
    },
    {
        id: "on-009",
        title: "Durabilidad Profesional",
        type: "video",
        platform: "instagram",
        status: "scheduled",
        scheduledAt: "2025-02-21T12:00:00.000Z",
        publishedAt: null,
        mediaUrl: "https://youtube.com/shorts/qS3pvlttxrM?si=CZ03a7U8gO_3VYJC",
        caption: `💎 La estabilidad molecular de nuestros productos previene el amarillamiento y la degradación del color, asegurando que la alta pigmentación se mantenga intacta hasta el próximo servicio.🌷💖

Echa un ojo a los talleres y descubre cómo lograr aplicaciones de larga duración. 🎟️💕

#OrganicNails #Cancún #LongLasting #NailArt #Calidad`,
        feedback: { hasFeedback: false, lastComment: null }
    },
    {
        id: "on-010",
        title: "Manos que Cierran Tratos",
        type: "video",
        platform: "instagram",
        status: "scheduled",
        scheduledAt: "2025-02-25T12:00:00.000Z",
        publishedAt: null,
        mediaUrl: " https://youtube.com/shorts/1G4VEkueHLM?si=H8odYGkJHdj1GMzo",
        caption: `Nuestros Geles permiten un manejo preciso que evita escurrimientos en laterales, facilitando una nivelación automática que reduce drásticamente el tiempo de limado. 📐✨

¡Descubre el control total del Gel en nuestros talleres! 🎟️ 🌷#OrganicNails #Cancún #TechGel #NailEducation`,
        feedback: { hasFeedback: false, lastComment: null }
    },
    {
        id: "on-011",
        title: "Pigmentos y Colores",
        type: "video",
        platform: "instagram",
        status: "scheduled",
        scheduledAt: "2025-02-27T12:00:00.000Z",
        publishedAt: null,
        mediaUrl: "https://youtube.com/shorts/oOW9oO_pmd4?si=bEHJVIzQAVEBR7Hk",
        caption: `¿Buscas el pigmento perfecto para tu próximo diseño? 🎨 Explora una variedad de colores que enamoran a primera vista y tienen una cobertura impecable.

Si quieres crear magia, vente a los talleres y descubre todo lo que puedes lograr.💘

#OrganicNails #Cancún #NailArt #Colorful #GamaOrganic`,
        feedback: { hasFeedback: false, lastComment: null }
    },
    {
        id: "on-012",
        title: "Identidad y Personalidad",
        type: "video",
        platform: "instagram",
        status: "scheduled",
        scheduledAt: "2025-02-28T12:00:00.000Z",
        publishedAt: null,
        mediaUrl: "https://youtube.com/shorts/s8PjyuFOA2A?si=CYjTxYaNIW6TrPcy",
        caption: `¿Sabías que exite la posibilidad de aprender a crear un diseño que capture tu esencia más auténtica? 🎀Incribete a nuestros talleres complementarios y diseña con intención. 💗

#OrganicNails #Cancún #NailIdentity #AestheticVibes #Personalidad`,
        feedback: { hasFeedback: false, lastComment: null }
    }
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const OrganicNailsContentHub = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('calendar');
    const [selectedPost, setSelectedPost] = useState(null);
    const [filters, setFilters] = useState({
        platforms: [],
        statuses: [],
        search: ''
    });

    // Detectar móvil para cambiar vista automáticamente
    useEffect(() => {
        const checkMobile = () => {
            setViewMode(window.innerWidth < 768 ? 'feed' : 'calendar');
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Formatear mes para mostrar
    const formatMonthYear = (monthStr) => {
        const [year, month] = monthStr.split('-');
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return `${months[parseInt(month) - 1]} ${year}`;
    };

    return (
        <div className="min-h-screen bg-[#020410]">
            {/* Header con navegación */}
            <header className="sticky top-0 z-40 bg-[#020410]/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Back + Título */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                                aria-label="Volver al inicio"
                            >
                                <ArrowLeft className="w-5 h-5 text-slate-400" />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-white">
                                    {clientData.clientName}
                                </h1>
                                <p className="text-sm text-slate-500">
                                    Calendario Editorial • <span className="capitalize text-orange-400">{formatMonthYear(clientData.month)}</span>
                                </p>
                            </div>
                        </div>

                        {/* Toggle Vista (solo desktop) */}
                        <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('calendar')}
                                className={`p-2 rounded-md transition-colors ${viewMode === 'calendar'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                                aria-label="Vista calendario"
                            >
                                <Calendar className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('feed')}
                                className={`p-2 rounded-md transition-colors ${viewMode === 'feed'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                                aria-label="Vista lista"
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Barra de Filtros */}
                <FilterBar
                    filters={filters}
                    onChange={setFilters}
                    postCount={postsData.length}
                />
            </header>

            {/* Contenido Principal */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <AnimatePresence mode="wait">
                    {viewMode === 'calendar' ? (
                        <motion.div
                            key="calendar"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CalendarView
                                posts={postsData}
                                filters={filters}
                                currentMonth={clientData.month}
                                onPostClick={setSelectedPost}
                                onMonthChange={() => { }} // Mes fijo para este cliente
                                isLoading={false}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="feed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FeedView
                                posts={postsData}
                                filters={filters}
                                onPostClick={setSelectedPost}
                                isLoading={false}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Modal de Detalle del Post */}
            <PostModal
                post={selectedPost}
                isOpen={!!selectedPost}
                onClose={() => setSelectedPost(null)}
            />
        </div>
    );
};

export default OrganicNailsContentHub;