import type { ReactNode } from 'react';
import { InlineLink } from '@/components/ExternalLink';

export interface TechStackRow {
  layer: string;
  technology: string;
  purpose: string;
}

export interface Screenshot {
  src: string;
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
  intro: string[];
  techStack?: TechStackRow[];
  screenshots?: Screenshot[];
  conclusion?: string[];
  repoUrl?: string;
  liveUrl?: string;
  blogUrl?: string;
  devpostUrl?: string;
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
    subtitle: 'Where I host my OpenClaw agent, Pi-Hole DNS, JellyFin server, BitWarden, and more.',
    role: 'Hobbyist',
    duration: '2026',
    sortAt: '2026-01-01',
    techSummary: 'Ubuntu Server · Docker · Tailscale',
    tags: ['Ubuntu', 'Docker', 'Tailscale'],
    heroImage: '/images/dell-micro.svg',
    blogUrl: '/work/homelab',
    featured: true,
    intro: [
      'A personal homelab running on a Dell Optiplex Mini with Ubuntu Server. The setup prioritizes security and privacy — a single port is open, restricted to Tailscale traffic, and every service lives in its own Docker container.',
      'It doubles as a learning environment for DevOps practices and a practical solution for self-hosted privacy tools.',
    ],
    techStack: [
      { layer: 'Hardware', technology: 'Dell Optiplex Micro', purpose: 'Low-power always-on host' },
      { layer: 'OS', technology: 'Ubuntu Server', purpose: 'Headless Linux base' },
      { layer: 'Networking', technology: 'Tailscale', purpose: 'Zero-trust remote access' },
      { layer: 'Runtime', technology: 'Docker', purpose: 'Service isolation' },
    ],
    screenshots: [
      { src: '/images/screenshots/homelab-homepage.png', caption: 'Homepage dashboard' },
    ],
    conclusion: [
      'The homelab is a hands-on environment for experimenting with containerization, networking, and self-hosted services while keeping data private.',
      'Future plans: more services, Proxmox for virtualization, and possibly a second node.',
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
      'The prompt: build the best SuperPlane canvas for auto-fixing GitHub issues — general enough to handle any issue shape (bug, enhancement, multi-part feature) and rigorous enough to actually validate that the previous step worked before moving on. Judged against five real issues from the SuperPlane repo covering everything from markdown rendering to canvas UX regressions.',
      'The factory is one canvas: a /solve comment on an issue triggers Triage & Spec (LLM emits a machine-checkable spec), then Localize (find the files that actually need to change), Implement (a coding-agent runner clones, edits, branches, opens a PR), Test (baseline diff + assertions on the new behavior), independent Review of the diff, a Render preview deploy, and finally a Playwright smoke check on the live URL that posts the preview link back to the PR.',
      'Every stage is a gate that can fail and route back — no silent "it built, ship it" shortcuts. The design bet: a shared requirements[] array threaded through all five gates, tracked per-item, so a partial PoC ships with clear disclosure instead of getting stuck in retry loops on subjective requirements like "warnings should be more visible."',
    ],
    techStack: [
      { layer: 'Orchestration', technology: 'SuperPlane canvas', purpose: 'Nodes, gates, payload chain, retry loops' },
      { layer: 'Spec + Review', technology: 'LLM integration nodes', purpose: 'Triage, grounded-spec check, independent diff review' },
      { layer: 'Implementation', technology: 'Runner + coding agent', purpose: 'Clone, edit, branch, PR — with test-first discipline' },
      { layer: 'Deploy', technology: 'Render preview envs', purpose: 'Per-PR live URL, torn down when the PR closes' },
      { layer: 'Verification', technology: 'Playwright smoke', purpose: 'DOM-level assertions run against the deployed preview' },
      { layer: 'Target repo', technology: 'JzJoker/superplane fork', purpose: 'Five test issues: #5164, #5366, #5368, #5704, #5705' },
    ],
    conclusion: [
      'Design philosophy: localization is the #1 bottleneck (find the right files first), gates catch failures at the earliest possible stage, and vague inputs surface an explicit assumptions[] field so the PoC\'s interpretation is visible to reviewers rather than silently baked in.',
      'Calibrated to the PoC bar — a subjective requirement verdicted "partial" ships with disclosure, only "inadequate" retries. Otherwise the factory loops forever on things that can never cleanly resolve.',
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
    role: 'Hackathon',
    duration: 'April 2026',
    sortAt: '2026-04-01',
    techSummary: 'Hackathon',
    tags: ['Hackathon'],
    heroImage: '/images/awards/hackprinceton.jpg',
    featured: true,
    repoUrl: 'https://github.com/JzJoker/hackprinceton-island-habits',
    liveUrl: 'https://someonesave.us/',
    devpostUrl: 'https://devpost.com/software/faaah',
    intro: [
      'Shipped a working prototype in 36 hours alongside a small team at Princeton.',
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
    duration: 'September 2023',
    sortAt: '2023-09-01',
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
    role: 'Hackathon',
    duration: 'May 2026',
    sortAt: '2026-05-01',
    techSummary: 'Hackathon',
    tags: ['Hackathon'],
    heroImage: '/images/awards/uncommonhacks.jpg',
    featured: true,
    repoUrl: 'https://github.com/JzJoker/uncommonhacks-life-story',
    devpostUrl: 'https://devpost.com/software/lifestory',
    intro: [
      'Traveled to compete; delivered a working project within the event window.',
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
