import type { ReactNode } from 'react';
import { InlineLink } from '@/components/ExternalLink';

const IMG = '/images/blog/18-pitches';

const P = ({ children }: { children: ReactNode }) => (
  <p className="text-base leading-relaxed max-w-[62ch] mx-auto">{children}</p>
);

const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="text-xl md:text-2xl font-medium tracking-tight leading-snug max-w-[62ch] mx-auto pt-6">
    {children}
  </h3>
);

const Quote = ({ children }: { children: ReactNode }) => (
  <blockquote className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 italic text-neutral-600 dark:text-neutral-300 max-w-[62ch] mx-auto leading-relaxed">
    {children}
  </blockquote>
);

const Figure = ({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
}) => (
  <figure className="space-y-3 my-2 max-w-[62ch] mx-auto">
    <img src={src} alt={alt} loading="lazy" className="w-full h-auto" />
    {caption && (
      <figcaption className="text-xs font-mono uppercase tracking-widest text-neutral-400 text-center">
        {caption}
      </figcaption>
    )}
  </figure>
);

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  /** ISO date used for sorting (newest first). */
  date: string;
  displayDate: string;
  readTime: string;
  heroImage?: string;
  externalUrl?: string;
  content: ReactNode;
}

export const posts: BlogPost[] = [
  {
    slug: 'how-18-pitches-taught-me-what-i-actually-built',
    title: 'How 18 Pitches Taught Me What I Actually Built',
    subtitle: 'Win by Selling the Vision, Not the Demo',
    date: '2026-04-22',
    displayDate: 'Apr 22, 2026',
    readTime: '7 min read',
    heroImage: `${IMG}/08-final.jpg`,
    externalUrl:
      'https://medium.com/@justinzhao1324/how-18-pitches-taught-me-what-i-actually-built-77cc8dd7a4d1',
    content: (
      <>
        <Figure
          src={`${IMG}/01-trash-talk.png`}
          alt="Someone Save Us — game screen with players on a shared island"
        />

        <Quote>“Bro really thinks skipping leg day is a personality.”</Quote>

        <P>
          That’s one of our AI agents trash talking another AI agent, who was slacking because the player controlling him, me, hadn’t gone for a run in two days.
        </P>

        <P>
          The agents live on a slowly flooding island. If we don’t lock in IRL, they drown. If we do, they build, level up, and escape to the next island. We called it Someone Save Us, and over 36 hours at HackPrinceton, I pitched it to 18 different judges. It took eighteen pitches for me to see what we’d actually made.
        </P>

        <H3>Two weeks before the hackathon, I didn’t want to build this.</H3>
        <P>
          I’d pitched idea after idea to my teammates, and my teammate Aman had shot all of them down. Too familiar, he said. Doesn’t stand out. Doesn’t move people. I thought my ideas were good. I thought he was being difficult. What I didn’t understand yet was that he was right.
        </P>

        <P>
          The idea we eventually went with was his: a to-do list app where users generated a shared 3D structure as they completed goals. I hated it. For three days I argued against it. But, somewhere around day four, I sent him this message:
        </P>

        <Quote>
          “I want us to move forward with the iMessage habit game route. I want us to be able to align and build something as a team that we all like…”
        </Quote>

        <P>
          After days of back and forth, I took a step back and realized: a team can’t win if everyone on it isn’t fully aligned. That was the first thing the hackathon taught me, and it taught me before the hackathon even started.
        </P>

        <H3>Once I stopped fighting the idea, I started building on it.</H3>
        <P>
          If we were going to do a habit game with a 3D world, I didn’t want it to be a chore tracker with a gimmick slapped on it. I wanted to add depth. I started sending Aman walls of text.
        </P>

        <P>What if users had characterized avatars?</P>

        <P>What if completing a task triggered a GIF of your character powering up in real time, instant gratification, not a checkmark?</P>

        <P>What if there was in-game currency? Stats?</P>

        <Figure
          src={`${IMG}/02-flight-to-newark.jpg`}
          alt="Airplane wing at sunset, on the way to Newark"
          caption="The Flight to Newark"
        />

        <P>Aman, being the goat that he is, said yes to almost all of it.</P>

        <P>We were finally aligning.</P>

        <Figure
          src={`${IMG}/03-pre-hackathon-lunch.jpg`}
          alt="The team eating lunch together before the hackathon"
          caption="Pre-Hackathon Lunch with the Team"
        />

        <P>
          The hackathon started, and for the first twelve hours everything was heads-down. Aman, Hung, Shiva, and I were shipping. The 3D world rendered. The agents moved. The buildings went up. On paper, the game worked.
        </P>

        <Figure
          src={`${IMG}/04-the-room.jpg`}
          alt="The room the team worked out of during the hackathon"
          caption="The Room We Worked Out Of"
        />

        <P>But I couldn’t shake the feeling that something was missing.</P>

        <P>
          While my teammates kept building, I sat with a doc open and wrote pages. Pages. What were the agents actually doing? Why did they want to leave the island? What happened if you failed your goals, other than a number going down?
        </P>

        <P>
          I thought back to something that came up in our planning meetings. “We need to pitch ourselves as a game that requires real life actions, not a habit tracker that has a game”.
        </P>

        <P>
          Our project needed to be game-first; we needed to make it more like a game. I worked out the mechanics first.
        </P>

        <P>
          Agents would collect rocks and logs, build structures, earn XP for the whole group.
          <br />
          Hit enough XP and you and your friends escape to the next island, which is harder.
          <br />
          Fail together, sink together. Good. A loop.
        </P>

        <H3>But the loop still felt dead.</H3>
        <P>
          The agents had no personality, the app did not feel special. Then I had a thought:
        </P>

        <P>What if the agents trash-talked each other?</P>

        <P>
          Not polite NPC voice lines. Real slang. Teenage cadence. If you skipped your run, your agent didn’t just slow down. The other agents noticed, and they dragged you for it, in front of all your friends.
        </P>

        <P>
          That was the moment the game started to feel alive. It wasn’t a new mechanic. It was a personality. And it hit me, standing there, that Aman had been trying to tell me this two weeks earlier — when he kept saying my ideas didn’t move people.
        </P>

        <Figure
          src={`${IMG}/05-agents-trash-talking.jpg`}
          alt="In-game agents trash talking each other in speech bubbles"
          caption="Agents Trash Talking Each Other"
        />

        <H3>We were hyped.</H3>
        <P>
          By the time pitching started, I thought we were ready. We had a working demo, a clear gameplay loop, and agents that literally roasted each other. Aman, Hung, Shiva, and I had grinded for 36 hours to get the thing running. I was going to walk the judges through what we’d built.
        </P>

        <P>
          That’s what we did for the first few pitches. I walked them through it. “It’s a imessage group chat game. Your AI agents live on a flooding island. You do habits in real life, they build faster.” We demoed the iMessage integration. We showed the 3D world. We showed the agents talking.
        </P>

        <P>
          Judges nodded. They smiled. They asked polite questions. And then they moved on.
        </P>

        <H3>But something wasn’t landing.</H3>
        <P>
          We were getting polite nods, but no real excitement. The friction point was almost always the same question: “How do you actually validate that users did their tasks?” We had an answer: “Well, we connect to the Knot API for financial goals…” But even as I said it, it sounded half-baked. It sounded like homework, not a game.
        </P>

        <Figure
          src={`${IMG}/06-knot-api.jpg`}
          alt="Knot API integration screenshot"
          caption="Knot API Integration"
        />

        <P>
          During our next pitch, scrambling for a better answer to the exact same question, I blurted something else out: “Eventually, with enough external providers, users wouldn’t have to check off items manually at all.” The judge leaned in. His eyes lit up. For the first time, someone was truly hooked. I watched his reaction.
        </P>

        <H3>It finally hit me</H3>
        <P>
          If we had enough external integrations, the entire concept of the “to-do list” completely disappears. You wouldn’t need to open the app. You wouldn’t need to click a checkbox. You would just live your everyday life, and your real-world actions would automatically dictate your agent’s survival.
        </P>

        <P>
          During our planning meetings two weeks prior, we had casually said, “We need to innovate in the game interaction space.” Standing in front of that judge, I realized we actually had. We just hadn’t realized it.
        </P>

        <P>
          I immediately emphasized to my team. We need to change our strategy. We have to sell the vision of having so many providers that you would literally be playing the game while living your everyday life. Without ever opening the app. Without sending any messages or clicking to do list items. We went all in on this. We led with “Someone Save Us is a game that requires you to perform real life actions in order for you to do well in the game”.
        </P>

        <P>
          Somewhere around pitch 4, we stopped describing what we’d built. We started describing what it could become. Most of the time the judges were not even looking at the UI, they were making eye contact and listening to what we had to say. I said something like: “Right now, users check in manually. But imagine when they don’t have to. Your Apple Health data confirms you went for a run. Your calendar confirms you called your mom. Your bank statement confirms you didn’t order DoorDash. You stop playing the game on your phone. You start playing it by living your life.”
        </P>

        <P>
          By pitch 10, I wasn’t walking judges through features anymore. I opened with the vision, let the demo support it, and watched people light up in a way they hadn’t during our first rounds. By pitch 15, my voice was gone and I was reaching for water between judges. By pitch 18, I was saying the same thing I’d said an hour earlier, and it still landed.
        </P>

        <Figure
          src={`${IMG}/07-judge-rajesh.jpg`}
          alt="Team photo with judge Rajesh Lingam"
          caption="Picture with Judge Rajesh Lingam"
        />

        <H3>We won three tracks that weekend</H3>
        <P>
          Overall Best Entertainment & Media Hack, runner-up for Beautifully Engineered Nonsense by Sonar, and an Honorable Mention by Institute of Foundation Models for best use K2 Think v2. The project didn’t change between pitch 1 and pitch 18. What changed was how we described it , and by extension, what I understood it to be.
        </P>

        <P>
          Here’s what I’m taking with me. Judges, investors, users, teammates. Nobody is evaluating what you built in 36 hours. They’re evaluating what they can imagine you building next. Your demo is evidence. Your vision is the product. If you can’t articulate where this thing goes in a year, you haven’t finished building it yet.
        </P>

        <Figure
          src={`${IMG}/08-final.jpg`}
          alt="Closing image — the pitch that won it"
        />

        <P>That was the pitch that won it. Not the demo. The vision.</P>

        <P>
          If you want to see more of what I’m building, follow me here or check out the project on{' '}
          <InlineLink href="https://devpost.com/software/faaah" arrow={false}>
            Devpost
          </InlineLink>
          .
        </P>
      </>
    ),
  },
  {
    slug: 'i-hate-siri-openclaw-shortcuts',
    title: "I hate Siri. Replacing iPhone's voice assistant with OpenClaw using Siri Shortcuts.",
    subtitle: 'Draft in progress.',
    date: '2026-07-21',
    displayDate: 'Jul 21, 2026',
    readTime: '— min read',
    heroImage: '/images/blog/siri-shortcuts.webp',
    content: (
      <P>Draft in progress — check back soon.</P>
    ),
  },
  {
    slug: 'openclaw-3d-printer-camera-proxy',
    title: "Weekend Project: Connecting OpenClaw to my 3d printer's camera using a proxy server",
    subtitle: 'Draft in progress.',
    date: '2026-07-14',
    displayDate: 'Jul 14, 2026',
    readTime: '— min read',
    heroImage: '/images/blog/bambu-a1.webp',
    content: (
      <P>Draft in progress — check back soon.</P>
    ),
  },
  {
    slug: 'vibe-coding-github-discord-bot',
    title: 'Integrating GitHub into Discord: 3 increasingly customizable ways to do it.',
    subtitle: 'Draft in progress.',
    date: '2026-07-18',
    displayDate: 'Jul 18, 2026',
    readTime: '— min read',
    heroImage: '/images/blog/discord-bot.jpg',
    content: (
      <P>Draft in progress — check back soon.</P>
    ),
  },
  {
    slug: 'higgsfield-mcp-music-videos',
    title: 'What I learned from making music videos with Higgsfield MCP',
    subtitle: 'Draft in progress.',
    date: '2026-07-10',
    displayDate: 'Jul 10, 2026',
    readTime: '— min read',
    heroImage: '/images/blog/higgsfield.jpg',
    content: (
      <P>Draft in progress — check back soon.</P>
    ),
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
