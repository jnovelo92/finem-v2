import React, { memo } from 'react';

/* -------------------------------------------------------------------------- */
/* SHARED: Logo, Animation variants, Styles                                    */
/* -------------------------------------------------------------------------- */

export const LogoFinem = memo(({ className }) => (
  <svg className={className} viewBox="0 0 1664.2 706.9" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M335.7,166.9h-133.6c0-18.8-15.3-34-34.2-34s-34.2,15.2-34.2,34h-.1v506c0,18.7-15.3,33.9-34.1,33.9H0V170.4C0,79.5,71.7,2.6,163.1,0c94.9-2.6,172.6,73,172.6,166.8Z" />
    <path d="M740,504v201.4h-99.3c-18.9,0-34.2-15.3-34.2-34.1v-167.3h-.1c0-18.7-15.3-34-34.2-34s-34.2,15.3-34.2,34h-.1v35.1c0,80.5-57.3,147.6-133.5,163.4-11.1,2.3-22.6,3.5-34.4,3.5s-23.2-1.2-34.2-3.5c-74.5-15.3-130.9-79.7-133.5-157.7v-172.7h133.5v167c0,18.8,15.3,34,34.2,34s34.2-15.2,34.2-34h.1v-31.6c0-91,71.8-167.9,163.2-170.3,94.8-2.5,172.5,73.1,172.5,166.8Z" />
    <path d="M268.9,304.4c18.9,0,34.2-15.2,34.2-34s-15.3-34-34.2-34-34.2,15.2-34.2,34,15.3,34,34.2,34Z" />
    <path d="M1664.2,507.9v197.9h-99.3c-18.9,0-34.2-15.2-34.2-34v-167.4h-.1c0-18.7-15.3-34-34.2-34s-34.2,15.3-34.2,34h-.1v201.4h-133.5v-201.4h-.1c0-18.7-15.3-34-34.2-34s-34.2,15.3-34.2,34h-.1v201.4h-99.4c-18.8,0-34.1-15.2-34.1-33.9v-163.9c0-92.4,74-169.9,166.9-170.4,38.3-.2,73.7,12.4,102,33.6,28.3-21.3,63.7-33.8,102-33.6,92.9.5,166.9,78,166.9,170.4Z" />
    <path d="M1087.1,624s0,.1-.1.2c-.2.4-.5.7-.7,1.1-14.4,23.6-34.6,43.4-58.6,57.4-.7.4-1.3.9-2,1.2-.6.4-1.3.8-2,1.1-24,13.3-51.6,20.8-81,20.8-92.8,0-168-74.8-168-167.1s64.2-155.5,147-165.8h0c6.9-.9,13.8-1.3,20.9-1.3s14.1.4,20.9,1.3h0c55,6.8,101.8,40.1,127,86.6l-113.9,79-43.2,29.9-10.8,7.5h0c-8.7,6.3-14.3,16.3-14.3,27.8,0,18.8,15.3,34,34.2,34s1.8,0,2.6-.1c.9,0,1.8-.2,2.6-.3.8-.1,1.6-.3,2.4-.5h.2c.8-.2,1.6-.4,2.4-.7.8-.3,1.6-.5,2.4-.9.8-.3,1.6-.6,2.3-1,1.5-.7,3-1.5,4.3-2.5l1.6-1.1,73.5-51,2.1-1.4c10.6-6.7,24.4-7.4,36-.6,16.2,9.5,21.5,30.3,12,46.5Z" />
  </svg>
));
LogoFinem.displayName = 'LogoFinem';

/* Animation variants reutilizables */
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] } }
};

export const lineReveal = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 1, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 } }
};

/* Section label reutilizable */
export const SectionLabel = ({ children, color = 'teal' }) => {
  const colors = {
    teal: 'text-teal-500/80 bg-teal-500/50',
    blue: 'text-blue-500/80 bg-blue-500/50',
    orange: 'text-orange-500/80 bg-orange-500/50',
    purple: 'text-violet-500/80 bg-violet-500/50',
    amber: 'text-amber-500/80 bg-amber-500/50',
  };
  const [textC, bgC] = (colors[color] || colors.teal).split(' ');
  return (
    <span className={`inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] ${textC} uppercase mb-6`}>
      <span className={`w-8 h-px ${bgC}`} />
      {children}
    </span>
  );
};

/* Estilos globales de la propuesta */
export const DiscoveryStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
    .proposal-amerimed { font-family: 'DM Sans', sans-serif; }
    .proposal-amerimed h1, .proposal-amerimed h2, .proposal-amerimed h3 { font-family: 'Space Grotesk', sans-serif; }
    @keyframes gradient-flow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient-flow { background-size: 300% 300%; animation: gradient-flow 6s ease infinite; }
    @keyframes pulse-ring {
      0% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.15); opacity: 0; }
      100% { transform: scale(1); opacity: 0; }
    }
    .pulse-ring { animation: pulse-ring 2.5s ease-out infinite; }
    @keyframes counter-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .counter-anim { animation: counter-up 0.6s ease-out forwards; }
  `}</style>
);
