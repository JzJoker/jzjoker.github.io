import { TopMarquee } from './sections/home/TopMarquee';
import { useReveal } from './hooks/useReveal';
import { HomeNav } from './sections/home/HomeNav';
import { HomeHero } from './sections/home/HomeHero';
import { HomeWork } from './sections/home/HomeWork';
import { HomeExperience } from './sections/home/HomeExperience';
import { HomeStack } from './sections/home/HomeStack';
import { HomeWriting } from './sections/home/HomeWriting';
import { HomeAbout } from './sections/home/HomeAbout';
import { HomeContact } from './sections/home/HomeContact';


function App() {
  useReveal();

  return (
    <div
      className="pf-root"
      style={{
        background: 'var(--bg)',
        color: 'var(--fg)',
        fontFamily: 'var(--mono)',
        fontSize: '14px',
        lineHeight: '1.55',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <div className="grid-bg" aria-hidden="true" />

      <TopMarquee />
      <HomeNav hasMarquee />

      <main>
        <HomeHero />
        <HomeWork />
        <HomeExperience />
        <HomeStack />
        <HomeWriting />
        <HomeAbout />
        <HomeContact />
      </main>
    </div>
  );
}

export default App;
