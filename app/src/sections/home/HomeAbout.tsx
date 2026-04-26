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
              I'm Justin — an engineer who likes the parts of the stack that <em>feel</em> things.
              Sweating microcopy. Tuning a query plan. Naming a variable for the third time.
            </p>
            <p>
              I grew up writing video-game mods, studied at <strong>RIT</strong>, shipped reliability
              tools at <strong>Vanguard</strong>, and now live in <strong>New York</strong> building
              things that make other builders faster.
            </p>
            <p>
              When I'm not at a keyboard I'm probably on a long walk, in a ramen shop, or arguing
              with a friend about whether the pour-over actually tastes different.
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
                DDIA · Kleppmann
                <span className="secondary">ch. 7 of 12</span>
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
