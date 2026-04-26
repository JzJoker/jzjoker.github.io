export function HomeAbout() {
  return (
    <section className="pf-about" id="about">
      <div className="pf-container">
        <div className="pf-section-marker reveal">
          <span className="pf-section-marker-num">05</span>
          <span>About · Now</span>
          <span className="pf-section-marker-line" />
          <span className="pf-section-marker-meta">last updated April 2026</span>
        </div>

        <div className="pf-about-grid">
          <div className="pf-about-prose reveal">
            <p>
              I'm Justin — an engineer who likes building products with <em>impact</em> on real
              consumers. Crafting the perfect user flow. Optimizing the database. Caring about the
              details most people scroll past.
            </p>
            <p>
              I grew up making websites &amp; building PCs, shipped site reliability tools at{' '}
              <strong>Vanguard</strong>, and currently study at <strong>RIT</strong>, building things that
              my friends and I get overly-hyped about.
            </p>
            <p>
              When I'm not locked in at a cafe I'm probably on a long walk, in a rock climbing gym,
              or arguing with my friend about whether he is balding or not.
            </p>
          </div>

          <div className="pf-now-panel reveal">
            <div className="pf-now-panel-header">
              <span>~ /now</span>
              <span className="live">
                <span className="live-dot" />
                Live
              </span>
            </div>
            <div className="pf-now-row">
              <span className="pf-now-row-key">Building</span>
              <span className="pf-now-row-val">
                UX Interviewer
                <span className="secondary">v0.7 · beta</span>
              </span>
            </div>
            <div className="pf-now-row">
              <span className="pf-now-row-key">Reading</span>
              <span className="pf-now-row-val">
                The Courage to be Disliked
                <span className="secondary">Kishimi &amp; Koga</span>
              </span>
            </div>
            <div className="pf-now-row">
              <span className="pf-now-row-key">Listening</span>
              <span className="pf-now-row-val">
                Khruangbin radio
                <span className="secondary">on repeat</span>
              </span>
            </div>
            <div className="pf-now-row">
              <span className="pf-now-row-key">Learning</span>
              <span className="pf-now-row-val">
                Rust async runtimes
                <span className="secondary">slowly</span>
              </span>
            </div>
            <div className="pf-now-row">
              <span className="pf-now-row-key">Open to</span>
              <span className="pf-now-row-val" style={{ color: 'var(--accent)' }}>
                Select consulting
              </span>
            </div>
            <div className="pf-now-row">
              <span className="pf-now-row-key">Closed to</span>
              <span className="pf-now-row-val">
                Recruiter spam
                <span className="secondary">please</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
