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
  subtitle: string;
  role: string;
  duration: string;
  techSummary: string;
  tags: string[];
  heroImage?: string;
  intro: string[];
  techStack?: TechStackRow[];
  screenshots?: Screenshot[];
  conclusion?: string[];
  links?: { label: string; href: string }[];
}

export const projects: ProjectDetail[] = [
  {
    slug: 'ux-interviewer',
    title: 'UX Interviewer',
    subtitle: 'The first structured interview prep platform for UI/UX designers.',
    role: 'Full-Stack Developer',
    duration: '2025 — Present',
    techSummary: 'Next.js · AWS · DynamoDB · ElevenLabs',
    tags: ['Next.js', 'AWS', 'DynamoDB', 'ElevenLabs'],
    heroImage: '/images/interviewer-banner.png',
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
    subtitle: 'A self-hosted sandbox environment for learning and privacy.',
    role: 'Hobbyist',
    duration: '2026 — Present',
    techSummary: 'Ubuntu Server · Docker · Tailscale',
    tags: ['Ubuntu', 'Docker', 'Tailscale'],
    heroImage: '/images/homelab-banner.svg',
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
    slug: 'tctools',
    title: 'TCTools',
    subtitle: 'Post-image setup automation for lab and department machines.',
    role: 'Product Owner / Developer',
    duration: '2024',
    techSummary: 'TypeScript · PowerShell · C#',
    tags: ['TypeScript', 'PowerShell', 'C#'],
    heroImage: '/images/tctools-banner.svg',
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
    techSummary: 'Python · YOLOv5 · PyTorch',
    tags: ['Python', 'YOLOv5', 'PyTorch'],
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
];

export function getProject(slug: string): ProjectDetail | undefined {
  return projects.find((p) => p.slug === slug);
}
