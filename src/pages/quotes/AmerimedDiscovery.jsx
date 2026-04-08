import React, { useEffect } from 'react';
import { DiscoveryStyles } from './amerimed-discovery/shared';
import { DiscoveryNavbar, HeroSection } from './amerimed-discovery/SectionHero';
import { DiagnosticoSection } from './amerimed-discovery/SectionDiagnostico';
import { BenchmarkSection } from './amerimed-discovery/SectionBenchmark';
import { VisionSection, PilaresSection, RoadmapSection } from './amerimed-discovery/SectionVisionPilaresRoadmap';
import { EntregablesSection, MetodologiaSection, OnboardingSection } from './amerimed-discovery/SectionEntregablesMetodologiaOnboarding';
import { ROISection, InversionSection, CTASection, DiscoveryFooter } from './amerimed-discovery/SectionROIInversionCTA';

/* -------------------------------------------------------------------------- */
/* AMERIMED DISCOVERY — Propuesta Integral 12 Meses                            */
/* -------------------------------------------------------------------------- */

const AmerimedDiscovery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="proposal-amerimed">
      <DiscoveryStyles />
      <DiscoveryNavbar />

      <main className="relative z-10">
        {/* 1.  Hero — Declaración de intención */}
        <HeroSection />
        {/* 2.  Diagnóstico — Lo que ES vs Lo que PARECE */}
        <DiagnosticoSection />
        {/* 3.  Benchmark — Competencia ya se mueve */}
        <BenchmarkSection />
        {/* 4.  Visión — Amerimed en 12 meses */}
        <VisionSection />
        {/* 5.  Pilares — Web + Rebranding */}
        <PilaresSection />
        {/* 6.  Roadmap — 4 fases con entregables */}
        <RoadmapSection />
        {/* 7.  Entregables — Detalle mensual */}
        <EntregablesSection />
        {/* 8.  Metodología — Hub & Spoke, Torre de Control */}
        <MetodologiaSection />
        {/* 9.  Onboarding — Primeros 30 días */}
        <OnboardingSection />
        {/* 10. ROI — Simulador interactivo */}
        <ROISection />
        {/* 11. Inversión — Pricing escalonado */}
        <InversionSection />
        {/* 12. CTA — Siguiente paso */}
        <CTASection />
      </main>

      <DiscoveryFooter />
    </div>
  );
};

export default AmerimedDiscovery;
