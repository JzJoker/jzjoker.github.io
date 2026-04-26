export function HomeContact() {
  return (
    <section className="pf-contact" id="contact">
      <div className="pf-container">
        <div className="pf-section-marker reveal">
          <span className="pf-section-marker-num">06</span>
          <span>Get in touch</span>
          <span className="pf-section-marker-line" />
          <span className="pf-section-marker-meta">→ initiate contact</span>
        </div>

        <h2 className="pf-contact-headline reveal">
          Let's build<br />
          something <em>worth</em><br />
          shipping.
        </h2>

        <div className="pf-contact-grid reveal-stagger">
          <div>
            <div className="pf-contact-block-label">Email — fastest</div>
            <a href="mailto:hello@justinzhao.dev" className="pf-contact-email">
              hello@justinzhao.dev
            </a>
          </div>
          <div>
            <div className="pf-contact-block-label">Elsewhere</div>
            <div className="pf-contact-socials">
              <a href="https://github.com/JzJoker" className="pf-contact-social">
                <span>GitHub</span>
                <span className="handle">@JzJoker</span>
              </a>
              <a href="https://linkedin.com/in/justinzhao1" className="pf-contact-social">
                <span>LinkedIn</span>
                <span className="handle">/in/justinzhao1</span>
              </a>
              <a href="https://medium.com/@justinzhao1324" className="pf-contact-social">
                <span>Medium</span>
                <span className="handle">@justinzhao1324</span>
              </a>
              <a href="https://x.com/the_JzJoker" className="pf-contact-social">
                <span>Twitter / X</span>
                <span className="handle">@the_JzJoker</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pf-footer-bottom">
          <span>© 2026 Justin Zhao · Made in NYC</span>
          <span>
            Press <kbd className="pf-footer-kbd">⌘K</kbd> for shortcuts
          </span>
        </div>
      </div>
    </section>
  );
}
