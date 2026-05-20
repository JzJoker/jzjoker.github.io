interface AwardItem {
  image: string;
  hero: string;
  badge: string;
  detail: string;
}

const awards: AwardItem[] = [
  {
    image: '/images/awards/uncommonhacks.jpg',
    hero: 'UncommonHacks',
    badge: '1st Place',
    detail: 'Social Track · UChicago',
  },
  {
    image: '/images/awards/hackprinceton.jpg',
    hero: 'HackPrinceton',
    badge: '3 Awards',
    detail: 'Princeton University',
  },
  {
    image: '/images/awards/clayhacks.jpg',
    hero: 'ClayHacks',
    badge: '2nd Place',
    detail: 'Overall · RIT',
  },
];

export function HomeAwards() {
  return (
    <section className="pf-awards" id="awards">
      <div className="pf-container-wide">
        <div className="pf-section-marker reveal">
          <span className="pf-section-marker-num">00</span>
          <span>Awards</span>
          <span className="pf-section-marker-line" />
          <span className="pf-section-marker-meta">3× hackathon winner</span>
        </div>

        <div className="pf-awards-grid reveal-stagger">
          {awards.map((award, i) => (
            <div className="pf-award-card" key={i}>
              <div className="pf-award-image-wrap">
                <img src={award.image} alt={award.hero} className="pf-award-image" />
                <div className="pf-award-overlay" />
                <div className="pf-award-text">
                  <div className="pf-award-hero">{award.hero}</div>
                  <div className="pf-award-caption">
                    <span className="pf-award-badge">{award.badge}</span>
                    {' · '}{award.detail}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
