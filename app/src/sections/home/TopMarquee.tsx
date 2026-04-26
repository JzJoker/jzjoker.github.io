export function TopMarquee() {
  const items = [
    { text: 'Available for coffee chats', accent: false },
    { text: '◆', bullet: true },
    { text: 'Currently building UX Interviewer', accent: true },
    { text: '◆', bullet: true },
    { text: 'Open to collaborations', accent: false },
    { text: '◆', bullet: true },
    { text: 'Based in NYC', accent: false },
    { text: '◆', bullet: true },
    { text: 'Reading: The Courage to be Disliked', accent: true },
    { text: '◆', bullet: true },
  ];

  const renderItems = () =>
    items.map((item, i) => (
      <span
        key={i}
        className={item.bullet ? 'marquee-bullet' : item.accent ? 'm-accent' : undefined}
      >
        {item.text}
      </span>
    ));

  return (
    <div className="top-marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{renderItems()}</span>
        <span>{renderItems()}</span>
      </div>
    </div>
  );
}
