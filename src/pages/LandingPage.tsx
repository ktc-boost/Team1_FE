import { useEffect } from 'react';
import LandingNavigation from '@/features/landing/components/LandingNavigation';
import HeroSection from '@/features/landing/components/HeroSection';
import FeatureSection from '@/features/landing/components/FeatureSection';
import LandingFooter from '@/features/landing/components/LandingFooter';
import TeamSection from '@/features/landing/components/TeamSection';
import {
  FEATURES,
  SECTION_INTERSECTION_THRESHOLD,
} from '@/features/landing/constants/landingConstants';
import InquireFloatingButton from '@/features/inquire/components/InquireFloatingButton';

const LandingPage = () => {
  useEffect(() => {
    resetInitialHash();
    const observer = observeSections();
    window.gtag('event', 'view_landing');
    return () => observer.disconnect();
  }, []);

  const resetInitialHash = () => {
    if (!window.location.hash) return;

    window.history.replaceState(null, '', window.location.pathname);
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 0);
  };

  const observeSections = () => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.history.replaceState(null, '', `#${entry.target.id}`);
          }
        });
      },
      { threshold: SECTION_INTERSECTION_THRESHOLD },
    );

    sections.forEach((section) => observer.observe(section));
    return observer;
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <LandingNavigation />

      <section id="home" aria-label="home 섹션">
        <HeroSection />
      </section>

      <section id="about" aria-label="기능 소개 섹션" className="w-full py-20">
        {FEATURES.map((feature) => (
          <FeatureSection
            key={feature.title}
            title={feature.title}
            subtitle={feature.subtitle}
            description={feature.description}
            animationType={feature.animationType}
          />
        ))}
      </section>

      <section id="team" aria-label="팀 소개 섹션">
        <TeamSection />
      </section>

      <section id="help" aria-label="도움말 섹션" className="w-full">
        <LandingFooter />
      </section>

      <InquireFloatingButton />
    </div>
  );
};

export default LandingPage;
