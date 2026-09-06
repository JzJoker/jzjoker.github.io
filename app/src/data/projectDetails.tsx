import type { ReactNode } from 'react';
import { InlineLink } from '@/components/ExternalLink';

const Code = ({ children }: { children: ReactNode }) => (
  <code className="font-mono text-[0.9em] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 ease-in-out">
    {children}
  </code>
);

export interface TechStackRow {
  layer: string;
  technology: string;
  purpose: string;
}

export interface Screenshot {
  src: string;
  caption?: string;
}

export interface DeckSlide {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle: ReactNode;
  role: string;
  /** Human-readable date shown in the UI. */
  duration: string;
  /** ISO date used purely for chronological sorting (newest first). */
  sortAt: string;
  techSummary: string;
  tags: string[];
  heroImage?: string;
  intro: ReactNode[];
  techStack?: TechStackRow[];
  screenshots?: Screenshot[];
  deck?: DeckSlide[];
  conclusion?: ReactNode[];
  repoUrl?: string;
  liveUrl?: string;
  blogUrl?: string;
  devpostUrl?: string;
  demoUrl?: string;
  links?: { label: string; href: string }[];
  /** Show on the home page's Technical Work list. */
  featured?: boolean;
}

export const projects: ProjectDetail[] = [
  {
    slug: 'forecast-arena',
    title: 'Forecast Arena',
    subtitle: 'Experimenting with various LLM forecasting architectures. My findings on what works best.',
    role: 'Solo Project',
    duration: '2026',
    sortAt: '2026-06-24',
    techSummary: 'Python CLI · Multi-provider LLM APIs',
    tags: ['Python', 'LLMs', 'Benchmarks', 'CLI'],
    heroImage: '/images/forecast-arena-banner.jpg',
    repoUrl: 'https://github.com/JzJoker/Forecast-Arena',
    blogUrl: '/work/forecast-arena',
    demoUrl: 'https://colab.research.google.com/drive/1bnaQmiQ5ILr7iuPXF7h1ilr-646MH1hF?usp=sharing',
    featured: true,
    intro: [
      'Forecast Arena is a Python CLI that runs the same prediction question ("Will China invade Taiwan by end of 2026?", say) through five interchangeable LLM forecasting architectures and reports the results side by side — prediction, confidence, tokens, wall-clock time, and USD cost.',
      'The five configurations are Single LLM (baseline), Voting Swarm (N models vote), LLM Council (models critique each other before voting), Orchestrator + Subagents (division of labor: one lead decomposes and delegates), and Mixture of Experts (engineered disagreement — each expert gets a distinct perspective or information diet, then a reconciler weighs them).',
      'All five sit behind a common interface — same question in, same result schema out — so the benchmarking engine is decoupled from any single architecture and the presentation layer. Runs render to a static HTML report; a web UI can be bolted on later without touching the engine.',
    ],
    techStack: [
      { layer: 'Runtime', technology: 'Python CLI', purpose: 'Engine + config runner' },
      { layer: 'Frontier models', technology: 'GPT-5.5, Claude Opus 4.8, Gemini 3.1 Pro', purpose: 'Orchestrators, council leads, single-LLM baseline' },
      { layer: 'Workhorse models', technology: 'GPT-5.4 Mini, Sonnet 4.6, Gemini 3 Flash', purpose: 'Swarm voters and subagents' },
      { layer: 'Contrarians', technology: 'Kimi K2.5, Qwen 3.5, DeepSeek V3.2, Llama 4', purpose: 'MoE diversity — different training distributions' },
      { layer: 'Controls', technology: '--budget · --time-limit · --models', purpose: 'Hard USD cap, wall-clock cap, per-role model mapping' },
      { layer: 'Output', technology: 'Static HTML report', purpose: 'Side-by-side comparison of the five runs' },
    ],
    conclusion: [
      'Design bias throughout: configs stay behind the common interface, cost and tokens are tracked at the call site (not the config), and anything embarrassingly parallel (subagents, experts) runs in parallel.',
      'Active experiment — next steps: scale the question set, add calibration scoring so architectures can be compared on accuracy alongside cost, and eventually a web UI over the same engine.',
    ],
  },
  {
    slug: 'ux-interviewer',
    title: 'UX Interviewer',
    subtitle: 'The first structured interview prep platform for UI/UX designers.',
    role: 'Full-Stack Developer',
    duration: '2025',
    sortAt: '2025-01-01',
    techSummary: 'Next.js · AWS · DynamoDB · ElevenLabs',
    tags: ['Next.js', 'AWS', 'DynamoDB', 'ElevenLabs'],
    heroImage: '/images/interviewer-banner.png',
    repoUrl: 'https://github.com/Junheng-Zheng/UXInterviewer',
    liveUrl: 'https://ux-interviewer.vercel.app/',
    blogUrl: '/work/ux-interviewer',
    featured: true,
    intro: [
      'Software engineers have LeetCode. Designers have nothing. UX Interviewer is an attempt to fix that — a structured way to practice retrieval of UI/UX principles the same way engineers grind data structures.',
      'The core loop is a randomized case-study prompt, a scoring system that tracks progress over time, and a real-time AI voice that simulates a design interviewer so you can rehearse out loud.',
    ],
    techStack: [
      { layer: 'Frontend', technology: 'Next.js + React', purpose: 'App shell and interactive UI' },
      { layer: 'Backend', technology: 'Node.js', purpose: 'API routes and orchestration' },
      { layer: 'Database', technology: 'AWS DynamoDB', purpose: 'Session and progress storage' },
      { layer: 'Auth', technology: 'AWS Cognito', purpose: 'User authentication' },
      { layer: 'Voice', technology: 'ElevenLabs', purpose: 'Real-time interviewer voice' },
      { layer: 'Payments', technology: 'Stripe', purpose: 'Subscription plans' },
      { layer: 'Hosting', technology: 'Vercel', purpose: 'Deployment and edge functions' },
    ],
    screenshots: [
      { src: '/images/screenshots/ux-interviewer-login.png', caption: 'Login' },
      { src: '/images/screenshots/ux-interviewer-prompt.png', caption: 'Case-study prompt' },
      { src: '/images/screenshots/ux-interviewer-diagramming.png', caption: 'In-session diagramming' },
      { src: '/images/screenshots/ux-interviewer-history.png', caption: 'Session history' },
      { src: '/images/screenshots/ux-interviewer-plans.png', caption: 'Subscription plans' },
      { src: '/images/screenshots/ux-interviewer-stripe.png', caption: 'Stripe checkout' },
    ],
    conclusion: [
      'UX Interviewer is the project I keep coming back to — it sits at the intersection of tooling, design education, and voice AI, all of which I want to keep going deeper on.',
    ],
  },
  {
    slug: 'homelab',
    title: 'Homelab',
    subtitle: 'Always-on Ubuntu server hosting Pi-hole, Plex, Bitwarden, and my OpenClaw agent, all behind Tailscale.',
    role: 'Hobbyist',
    duration: '2026',
    sortAt: '2026-01-01',
    techSummary: 'Ubuntu 24.04 · Docker Compose · Tailscale · Caddy · Pi-hole',
    tags: ['Ubuntu', 'Docker', 'Tailscale'],
    heroImage: '/images/dell-micro.svg',
    blogUrl: '/work/homelab',
    repoUrl: 'https://github.com/JzJoker/homelab',
    featured: true,
    intro: [
      (
        <>
          <Code>brickserver</Code> is a Dell Optiplex Micro (Intel i7-8700) running Ubuntu 24.04 as a headless home server. Everything runs as Docker Compose stacks, and every service port binds to the Tailscale IP rather than <Code>0.0.0.0</Code> — nothing is reachable from the public internet.
        </>
      ),
      (
        <>
          The security posture is deliberate: Tailscale is the only ingress, Caddy issues HTTPS certs via the Tailscale socket (no Let's Encrypt DNS-01 dance, no exposed :443), and Pi-hole handles network-wide DNS + ad blocking so every device on the LAN benefits without per-device config. Real secrets live in gitignored <Code>.env</Code> files with <Code>.env.example</Code> templates checked in.
        </>
      ),
      'Layout is split into small stacks: a core stack (Homepage, Portainer, Pi-hole, Netdata, Speedtest Tracker, OpenClaw), a Caddy stack, a Bitwarden stack managed by bitwarden.sh, a media stack (Plex + Prowlarr / Radarr / Sonarr / Bazarr / qBittorrent / Seerr), and a go2rtc restream for the Bambu 3D printer. Each stack is deployable on its own via docker compose.',
    ],
    techStack: [
      { layer: 'Hardware', technology: 'Dell Optiplex Micro (i7-8700)', purpose: 'Low-power always-on host' },
      { layer: 'OS', technology: 'Ubuntu 24.04 Server', purpose: 'Headless Linux base' },
      { layer: 'Networking', technology: 'Tailscale', purpose: 'Only ingress — zero-trust remote access' },
      { layer: 'Reverse proxy', technology: 'Caddy (host mode + Tailscale socket)', purpose: 'Automatic HTTPS with Tailscale-issued certs' },
      { layer: 'DNS + ads', technology: 'Pi-hole', purpose: 'Network-wide ad blocker and local DNS' },
      { layer: 'Runtime', technology: 'Docker + Compose', purpose: 'Per-service isolation, one stack per concern' },
      { layer: 'Management', technology: 'Portainer', purpose: 'Container UI for quick inspection' },
      { layer: 'Monitoring', technology: 'Netdata + Speedtest Tracker', purpose: 'Host metrics and ISP sanity checks' },
      { layer: 'Dashboard', technology: 'Homepage', purpose: 'Single landing page for every service' },
      { layer: 'Passwords', technology: 'Bitwarden (self-hosted)', purpose: 'Family password vault behind Caddy' },
      { layer: 'Media', technology: 'Plex + Prowlarr / Radarr / Sonarr / Bazarr / qBittorrent / Seerr', purpose: 'Full *arr automation on a shared /srv/media volume for hardlinking' },
      { layer: 'IoT', technology: 'go2rtc (Bambu restream)', purpose: 'Pull the printer\'s camera into a normal RTSP/WebRTC feed' },
      { layer: 'Agent', technology: 'OpenClaw', purpose: 'Long-running personal agent' },
    ],
    screenshots: [
      { src: '/images/screenshots/homelab-homepage.png', caption: 'Homepage dashboard' },
    ],
    conclusion: [
      (
        <>
          Design principle: nothing is exposed to the public internet, ever. Every service binds to <Code>${'{HOST_IP}'}</Code> (the Tailscale IP), and access from off-LAN goes through the Tailscale tailnet — no port forwarding on the router.
        </>
      ),
      (
        <>
          The <Code>arr</Code> stack mounts the whole <Code>/srv/media</Code> volume into every container instead of individual subdirectories. Radarr and Sonarr can hardlink downloads into the library instead of copying — atomic, no space doubling, no I/O spike when a torrent finishes.
        </>
      ),
      'Future: more services (Immich for photo backup is the next candidate), maybe Proxmox to virtualize the host so I can test destructive changes without nuking my Bitwarden vault.',
    ],
  },
  {
    slug: 'superplane-hackathon',
    title: 'Software Factory',
    subtitle: (
      <>
        LLM development pipeline that turns any Github issue into a fully deployed PR.{' '}
        <strong className="font-normal underline underline-offset-4">1st place</strong> at{' '}
        <InlineLink href="https://superplane.com" arrow={false}>
          SuperPlane
        </InlineLink>
        's NYC Hackathon.
      </>
    ),
    role: 'Team Brunson',
    duration: 'July 2026',
    sortAt: '2026-07-19',
    techSummary: 'SuperPlane · LLM agents · Render · Playwright',
    tags: ['Hackathon'],
    heroImage: '/images/awards/superplane.jpg',
    featured: true,
    blogUrl: '/work/superplane-hackathon',
    intro: [
      (
	<>
	<strong>The prompt:</strong> build the best SuperPlane canvas for auto-fixing GitHub issues — general enough to handle any issue shape (bug, enhancement, multi-part feature) and rigorous enough to actually validate that the previous step worked before moving on. Judged against five real issues from the SuperPlane repo covering everything from markdown rendering to canvas UX regressions.
	</>
      ),
      (
        <>
          The factory is one canvas: a <Code>/solve</Code> comment on an issue triggers <strong>Triage & Spec</strong> (LLM emits a machine-checkable spec), then <strong>Localize</strong> (find the files that actually need to change), <strong>Implement</strong> (a coding-agent runner clones, edits, branches, opens a PR), <strong>Test</strong> (baseline diff + assertions on the new behavior), <strong>independent Review</strong> of the diff, a <strong>Render preview deploy</strong>, and finally a Playwright <strong>smoke check</strong> on the live URL that posts the preview link back to the PR.
        </>
      ),
      (
        <>
          Every stage is a gate that can fail and route back — no silent "it built, ship it" shortcuts. The design bet: a shared <Code>requirements[]</Code> array threaded through all five gates, tracked per-item, so a partial PoC ships with clear disclosure instead of getting stuck in retry loops on subjective requirements like "warnings should be more visible."
        </>
      ),
    ],
    techStack: [
      { layer: 'Orchestration', technology: 'SuperPlane canvas', purpose: 'Nodes, gates, payload chain, retry loops' },
      { layer: 'Spec + Review', technology: 'LLM integration nodes', purpose: 'Triage, grounded-spec check, independent diff review' },
      { layer: 'Implementation', technology: 'Runner + coding agent', purpose: 'Clone, edit, branch, PR — with test-first discipline' },
      { layer: 'Deploy', technology: 'Render preview envs', purpose: 'Per-PR live URL, torn down when the PR closes' },
      { layer: 'Verification', technology: 'Playwright smoke', purpose: 'DOM-level assertions run against the deployed preview' },
      { layer: 'Target repo', technology: 'JzJoker/superplane fork', purpose: 'Five test issues: #5164, #5366, #5368, #5704, #5705' },
    ],
    deck: [
      {
        src: '/images/superplane-deck/slide-00.jpg',
        alt: 'On Solve trigger fires Triage & Spec',
        caption: 'Entry — a /solve comment on the issue triggers Triage & Spec.',
      },
      {
        src: '/images/superplane-deck/slide-01.jpg',
        alt: 'Triage & Spec stage detail',
        caption: 'Triage & Spec — Claude classifies the issue and emits a machine-checkable spec that every downstream gate reads from.',
      },
      {
        src: '/images/superplane-deck/slide-02.jpg',
        alt: 'Spec Grounded gate and Baseline test',
        caption: 'Spec Grounded (gate-spec) + Baseline — gate a usable spec, then record which tests already fail at HEAD.',
      },
      {
        src: '/images/superplane-deck/slide-03.jpg',
        alt: 'Implement coding stage',
        caption: 'Implement — smallest change, factory/issue-<n>-<runId> branch, test-first, open a PR. Currently stubbed to PR #9.',
      },
      {
        src: '/images/superplane-deck/slide-04.jpg',
        alt: 'Build OK and No New Failures gates',
        caption: 'Build OK? + No New Failures? — compile check, then baseline-aware regression that lets pre-existing red tests through.',
      },
      {
        src: '/images/superplane-deck/slide-05.jpg',
        alt: 'New Behavior gate and Independent Review',
        caption: 'New Behavior Passes? + Independent Review — prove the new test passes; a separate Claude grades the diff against acceptance criteria.',
      },
      {
        src: '/images/superplane-deck/slide-06.jpg',
        alt: 'Deploy Preview success',
        caption: 'Deploy Preview — Render preview env comes up, Playwright smoke runs against the live URL, link posts back to the PR.',
      },
    ],
    conclusion: [
      (
        <>
          Design philosophy: localization is the #1 bottleneck (find the right files first), gates catch failures at the earliest possible stage, and vague inputs surface an explicit <Code>assumptions[]</Code> field so the PoC's interpretation is visible to reviewers rather than silently baked in.
        </>
      ),
      (
        <>
          Calibrated to the PoC bar — a subjective requirement verdicted <Code>partial</Code> ships with disclosure, only <Code>inadequate</Code> retries. Otherwise the factory loops forever on things that can never cleanly resolve.
        </>
      ),
    ],
  },
  {
    slug: 'buy-high-sell-low',
    title: 'Buy High, Sell Low',
    subtitle: 'Tracking stock sentiment across Reddit.',
    role: 'Cloud computing term project · Team of 5',
    duration: 'Spring 2026',
    sortAt: '2026-04-23',
    techSummary: 'Python · PRAW · AWS Comprehend · Lambda · DynamoDB · Terraform · React',
    tags: ['Python', 'AWS', 'Terraform', 'React'],
    repoUrl: 'https://github.com/JzJoker/term-project-buy-high-sell-low',
    blogUrl: '/work/buy-high-sell-low',
    featured: true,
    intro: [
      'Buy High, Sell Low scrapes r/wallstreetbets and r/stocks every 30 minutes, runs each post through AWS Comprehend for sentiment and entity extraction, and surfaces the result in a terminal-styled dashboard so you can see which tickers Reddit is loving or hating in near-real-time.',
      (
        <>
          The scraper is a <Code>PRAW</Code> loop in a Docker container running on an EC2 auto-scaling group inside a NAT-gated VPC. Each cycle sweeps eight fetch strategies — <Code>new</Code>, <Code>rising</Code>, <Code>hot</Code>, plus <Code>top</Code> and <Code>controversial</Code> across day/week/month windows — deduplicates within the cycle, and batch-writes into a DynamoDB raw table.
        </>
      ),
      (
        <>
          Each new raw item fires a DynamoDB Stream that triggers a Comprehend Lambda (<Code>detect_sentiment</Code> + <Code>detect_entities</Code>), and the enriched output lands in a second table. An API Gateway Lambda serves <Code>/entities</Code>, <Code>/entities/counts</Code>, and <Code>/sentiments</Code> to a React frontend hosted on S3 + CloudFront. Everything is defined in Terraform with an S3 state backend.
        </>
      ),
    ],
    techStack: [
      { layer: 'Scraper', technology: 'Python + PRAW', purpose: '30-min ingest loop across 8 sort strategies with retry + dedup' },
      { layer: 'Compute', technology: 'EC2 Auto Scaling Group', purpose: 'Runs the scraper container, scales on CPU target' },
      { layer: 'Container', technology: 'Docker + ECR', purpose: 'Reproducible scraper image pulled on every EC2 launch' },
      { layer: 'Raw store', technology: 'DynamoDB (streams)', purpose: 'Source of truth for scraped posts, streams fan out to Comprehend' },
      { layer: 'NLP', technology: 'AWS Comprehend', purpose: 'Sentiment + entity extraction per post' },
      { layer: 'Enrichment', technology: 'Lambda (Python)', purpose: 'Stream trigger — writes enriched output to the processed table' },
      { layer: 'API', technology: 'API Gateway + Lambda', purpose: 'Filterable entities and sentiments routes' },
      { layer: 'Frontend', technology: 'React + Vite on S3/CloudFront', purpose: 'Terminal-styled dashboard' },
      { layer: 'IaC', technology: 'Terraform (S3 backend)', purpose: 'VPC, subnets, NAT, IAM, Lambda, EC2, DynamoDB, ECR, CloudFront' },
    ],
    conclusion: [
      'Built for a cloud computing course — the fun part was the architecture, not the ML. Comprehend does the sentiment heavy lifting, so the design work went into making the data path event-driven end to end: scraper → DynamoDB → stream → Lambda → processed table → API, no polling anywhere.',
    ],
  },
  {
    slug: 'hackprinceton',
    title: 'SomeoneSave.Us',
    subtitle: (
      <>
        A game where real-life decisions shape your in-game success.{' '}
        <strong className="font-normal underline underline-offset-4">
          Best Entertainment Hack
        </strong>{' '}
        at{' '}
        <InlineLink href="https://www.hackprinceton.com/" arrow={false}>
          HackPrinceton
        </InlineLink>
        .
      </>
    ),
    role: 'Full-stack + agent system · Team of 4',
    duration: 'April 2026',
    sortAt: '2026-04-01',
    techSummary: 'React + R3F · Convex · Photon iMessage · K2 Think · Knot',
    tags: ['Hackathon'],
    heroImage: '/images/awards/hackprinceton.jpg',
    featured: true,
    blogUrl: '/work/hackprinceton',
    repoUrl: 'https://github.com/JzJoker/hackprinceton-island-habits',
    liveUrl: 'https://someonesave.us/',
    devpostUrl: 'https://devpost.com/software/faaah',
    intro: [
      (
        <>
          SomeoneSave.Us is a co-op idle game where your productivity IRL is the gameplay. Add the bot to your group chat, text <Code>/start</Code>, pick daily quests, and each player gets an AI agent on a shared island. Hit your goal — your agent builds faster. Skip it — they slow down and start gossiping about you to your friends' agents.
        </>
      ),
      'The island floods. If the crew logs enough real-world progress, everyone escapes to the next one. If not, you sink together. The design bet: people will do things for a pixelated dependent that they won\'t do for themselves — Tamagotchi logic — and peer pressure lands softer when the roast comes from an AI proxy instead of your actual friend.',
      'Two surfaces, one world. The 3D island runs in the browser (React Three Fiber). The social layer runs in iMessage — reminders, check-ins, votes, and the agents\' gossip all show up in the group chat you already have open. Convex is the source of truth, so a check-in from iMessage updates the island in every browser instantly with no custom WebSocket code.',
    ],
    techStack: [
      { layer: 'Frontend', technology: 'React + Vite + TypeScript', purpose: 'Mobile-first app shell' },
      { layer: '3D', technology: 'Three.js + React Three Fiber', purpose: 'Low-poly island, buildings, agents' },
      { layer: 'Realtime + DB', technology: 'Convex', purpose: 'Reactive queries — single source of truth across surfaces' },
      { layer: 'Messaging', technology: 'Photon iMessage + Spectrum.ts', purpose: 'Play the whole game from a group chat' },
      { layer: 'LLM', technology: 'K2 Think V2', purpose: 'Agent personalities, gossip, reminders, narrative beats' },
      { layer: 'Vision', technology: 'Google Gemma', purpose: 'Photo-based quest validation from images in the chat' },
      { layer: 'Voice', technology: 'ElevenLabs TTS', purpose: 'In-world narration' },
      { layer: 'Jobs', technology: 'Python + Flask on DigitalOcean', purpose: 'Morning reminders, miss detection, build progression, weekly summaries' },
      { layer: 'Habits', technology: 'Knot API', purpose: 'Optional transaction-based quest verification (e.g. did you actually skip McDonald\'s?)' },
      { layer: 'Auth', technology: 'Clerk', purpose: 'Phone-number-based sign-in' },
      { layer: 'Repo', technology: 'Turborepo', purpose: 'Monorepo for web + agents + jobs' },
    ],
    conclusion: [
      (
        <>
          Personality consistency was the hardest part. Every message is a separate LLM call, so the character has to survive round-trips without persistent sessions — solved by structuring each agent's personality as data and injecting it into every prompt. Structured-output parsing had to tolerate the model returning not-quite-JSON without falling over.
        </>
      ),
      '3D on mobile browsers took real tuning. Phone number normalization across regions turned out to be its own project. The rest — sync across web and iMessage — Convex mostly handled, which is exactly why we picked it in a 36-hour window.',
      'Best domain name at the hackathon, for what it\'s worth. What worked in playtests: real-world actions actually moving the needle in a shared virtual world, and the AI-on-AI trash talk landing as funny instead of demoralizing when you missed a goal.',
    ],
  },
  {
    slug: 'clayhacks',
    title: 'ClayHacks',
    subtitle: (
      <>
        Navigation dashboard. Easily track classes, events, and nearby amenities.{' '}
        <strong className="font-normal underline underline-offset-4">2nd place</strong> at <InlineLink href="https://www.instagram.com/brickhack/?hl=en" arrow={false}>ClayHack</InlineLink>.
      </>
    ),
    role: 'Hackathon',
    duration: 'September 2022',
    sortAt: '2022-09-01',
    techSummary: 'Hackathon',
    tags: ['Hackathon'],
    heroImage: '/images/awards/clayhacks.jpg',
    featured: true,
    devpostUrl: 'https://devpost.com/software/brick-planner',
    intro: [
      'Built and demoed a full-stack project end-to-end during the weekend event.',
    ],
  },
  {
    slug: 'uncommonhacks',
    title: 'LifeStory',
    subtitle: (
      <>
        A collaborative memory journal for Alzheimer's patients.{' '}
        <strong className="font-normal underline underline-offset-4">
          Best Social Impact
        </strong>{' '}
        at{' '}
        <InlineLink href="https://uncommonhacks.com/" arrow={false}>
          UncommonHacks
        </InlineLink>
        .
      </>
    ),
    role: 'Backend + feature dev · Team of 4',
    duration: 'May 2026',
    sortAt: '2026-05-01',
    techSummary: 'Next.js · Supabase · ElevenLabs · ESP32-S3 · DINOv2 + ORB',
    tags: ['Hackathon'],
    heroImage: '/images/awards/uncommonhacks.jpg',
    featured: true,
    blogUrl: '/work/uncommonhacks',
    repoUrl: 'https://github.com/JzJoker/uncommonhacks-life-story',
    devpostUrl: 'https://devpost.com/software/lifestory',
    intro: [
      'LifeStory is a "living memory journal" for people with Alzheimer\'s. Families collaboratively upload photos and record short factual narrations; the patient explores familiar faces and moments through a calm, guided app that never quizzes them.',
      'The premise came from watching a grandmother repeatedly ask "Who are you?" — by the fortieth time, even the most patient caregiver is drained. A consistent, warm narration voice can answer that question indefinitely without emotional exhaustion. That reframe — repetition as therapy rather than limitation — drove every design choice.',
      (
        <>
          The interaction model was rebuilt around one principle: never put the patient in a position to fail. No quiz prompts, no "do you remember?", no AI-improvised stories. When a photo opens, the app narrates it in third person — <Code>"This is Sarah, your daughter. In this photo, you were taking her to the park."</Code> — and lets recognition happen on its own.
        </>
      ),
    ],
    techStack: [
      { layer: 'Frontend', technology: 'Next.js + React + Tailwind', purpose: 'Mobile / tablet / desktop app shell' },
      { layer: 'Backend', technology: 'Supabase', purpose: 'Auth, storage, database for family-supplied facts' },
      { layer: 'Voice', technology: 'ElevenLabs', purpose: 'Warm third-person narration, consistent across sessions' },
      { layer: 'Vision', technology: 'Object/person detection (no facial recognition)', purpose: 'Tap-on-person interactions without biometrics' },
      { layer: 'Hardware trigger', technology: 'ESP32-S3 camera', purpose: 'Memory Record Player — slide a printed photo under the lens to trigger playback' },
      { layer: 'Photo matching', technology: 'DINOv2 → ORB/RANSAC (PyTorch + OpenCV)', purpose: 'Rank by global similarity, verify with local keypoint alignment' },
    ],
    conclusion: [
      (
        <>
          The hybrid matching pipeline exists because neither half is enough alone. <Code>ORB</Code> matches keypoints locally but produces false positives under glare, blur, and angled photos. <Code>DINOv2</Code> filters for global visual similarity but doesn't verify that the same object is present. Running <Code>DINOv2</Code> first, then <Code>ORB/RANSAC</Code> on its shortlist, catches false positives in both directions — if <Code>DINO</Code> similarity is too low, no <Code>ORB</Code> match rescues it; if <Code>ORB</Code> inliers are weak, close <Code>DINO</Code> scores don't disambiguate.
        </>
      ),
      'Self-imposed constraints: no facial recognition, no hallucinated narrations, no unverified content, explicit consent for voice cloning, and human validation before anything reaches the patient. The AI is deliberately narrow — it reads family-supplied facts in the voice we trained, and nothing else.',
      'Biggest lesson: good AI design is often about knowing where to place limits. Consistency mattered more than intelligence here. Calm repetition was the therapy. Ethical constraints made the product better, not weaker.',
    ],
  },
  {
    slug: 'tctools',
    title: 'TCTools',
    subtitle: 'Post-image setup automation for lab and department machines.',
    role: 'Product Owner / Developer',
    duration: '2024',
    sortAt: '2024-05-01',
    techSummary: 'TypeScript · PowerShell · C#',
    tags: ['TypeScript', 'PowerShell', 'C#'],
    heroImage: '/images/tctools-banner.svg',
    blogUrl: '/work/tctools',
    intro: [
      'TCTools is a post-image setup automation suite built during my internship at RIT ITS. After reimaging lab and department machines, technicians needed a reliable way to configure software, policies, and backups without doing it by hand.',
      'It pairs a TypeScript CLI for structure and orchestration with PowerShell for Windows-level scripting, and shipped as a WPF desktop tool for technicians in the field.',
    ],
    techStack: [
      { layer: 'Desktop UI', technology: 'WPF (C#)', purpose: 'Technician-facing tool' },
      { layer: 'Orchestration', technology: 'TypeScript CLI', purpose: 'Task graph + config' },
      { layer: 'Windows Scripting', technology: 'PowerShell', purpose: 'Install, policy, backup' },
      { layer: 'Docs', technology: 'Confluence', purpose: 'Internal runbook + rollout' },
    ],
    screenshots: [
      { src: '/images/screenshots/TCTools-Desktop - 1.png', caption: 'Desktop tool — home' },
      { src: '/images/screenshots/TCTools-Desktop - 2.png' },
      { src: '/images/screenshots/TCTools-Desktop - 3.png' },
      { src: '/images/screenshots/TCTools-Desktop - 4.png' },
      { src: '/images/screenshots/TCTools-Desktop - 5.png' },
      { src: '/images/screenshots/TCTools-Desktop - 6.png' },
      { src: '/images/screenshots/TCTools-Desktop - 7.png' },
      { src: '/images/screenshots/TCTools-Confluence.png', caption: 'Confluence rollout docs' },
    ],
    conclusion: [
      'TCTools hit department-wide adoption and cut data-backup time by roughly 80%. It was a good lesson in how a small amount of automation can scale a support team.',
    ],
  },
  {
    slug: 'ballights',
    title: 'Ballights',
    subtitle: 'ML-powered basketball highlight extraction.',
    role: 'Solo Project',
    duration: '2026',
    sortAt: '2026-01-01',
    techSummary: 'Python · YOLOv5 · PyTorch',
    tags: ['Python', 'YOLOv5', 'PyTorch'],
    blogUrl: '/work/ballights',
    intro: [
      'Ballights takes a raw basketball game recording and returns a highlight reel. It uses a YOLOv5 object detector to find the ball, rim, and players, then heuristics on top of the detections to decide which clips are worth keeping.',
      'The goal is a one-command pipeline: point it at a video file and get a shareable highlights cut out the other end.',
    ],
    techStack: [
      { layer: 'Model', technology: 'YOLOv5', purpose: 'Ball / rim / player detection' },
      { layer: 'Training', technology: 'PyTorch', purpose: 'Fine-tuning on basketball footage' },
      { layer: 'Pipeline', technology: 'Python + ffmpeg', purpose: 'Clip selection and stitching' },
    ],
    conclusion: [
      'Still an active work in progress — next steps are better shot-detection accuracy and a small web UI to review flagged clips before export.',
    ],
  },
].sort((a, b) => b.sortAt.localeCompare(a.sortAt));

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): ProjectDetail | undefined {
  return projects.find((p) => p.slug === slug);
}
