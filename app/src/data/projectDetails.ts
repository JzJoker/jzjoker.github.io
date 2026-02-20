import type { ReactNode } from 'react';

export interface ProjectDetailHeader {
  /** Optional hero image for the large white card. If omitted, a placeholder is shown. */
  heroImageUrl?: string;
  title: string;
  subtitle: string;
  role: string;
  duration: string;
  readTime: string;
  techStackSummary: string;
  icon?: ReactNode;
}

export interface TechStackRow {
  layer: string;
  technology: string;
  purpose: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  items?: string[];
}

export interface ArchitectureEdge {
  from: string;
  to: string;
}

export interface ProjectArchitecture {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export interface ProjectDetailData {
  header: ProjectDetailHeader;
  introParagraphs: string[];
  techStack: TechStackRow[];
  architecture: ProjectArchitecture;
  conclusionParagraphs: string[];
}

export const projectDetails: Record<string, ProjectDetailData> = {
  'ux-interviewer': {
    header: {
      heroImageUrl: '/images/interviewer-banner.png',
      title: 'UX-INTERVIEWER',
      subtitle: 'The First Structured Interview Prep Platform for UI/UX Designers.',
      role: 'Full Stack Developer',
      duration: 'Nov 2025 - Present',
      readTime: '06 Minutes',
      techStackSummary: 'Next.js • AWS',
    },
    introParagraphs: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    techStack: [
      { layer: 'UI/UX', technology: 'Figma', purpose: 'Design & Prototyping' },
      { layer: 'Frontend', technology: 'React', purpose: 'Build UI' },
      { layer: 'Backend', technology: 'Node.js', purpose: 'API Server' },
      { layer: 'Database', technology: 'AWS DynamoDB', purpose: 'Data Storage' },
      { layer: 'Authentication', technology: 'AWS Cognito', purpose: 'User Authentication' },
      { layer: 'Deployment', technology: 'Vercel', purpose: 'Hosting' },
      { layer: 'Version Control', technology: 'Git', purpose: 'Code Management' },
      { layer: 'Analytics', technology: 'PostHog', purpose: 'User Behavior Tracking' },
      { layer: 'Communication', technology: 'Slack', purpose: 'Team Collaboration' },
      { layer: 'Other', technology: 'ElevenLabs', purpose: 'Text-to-Speech' },
    ],
    architecture: {
      nodes: [
        { id: 'user', label: 'User / Client' },
        {
          id: 'vercel',
          label: 'Vercel',
          items: ['Frontend Services', 'React', 'PostHog', 'Web Speech API'],
        },
        { id: 'node', label: 'Node.js' },
        {
          id: 'thirdparty',
          label: 'Third-Party Services',
          items: ['Upstash', 'Airtable', 'ElevenLabs'],
        },
        { id: 'cognito', label: 'AWS Cognito' },
        {
          id: 'databases',
          label: 'Databases',
          items: ['AWS DynamoDB', 'AWS S3'],
        },
      ],
      edges: [
        { from: 'user', to: 'vercel' },
        { from: 'vercel', to: 'node' },
        { from: 'node', to: 'thirdparty' },
        { from: 'node', to: 'cognito' },
        { from: 'node', to: 'databases' },
      ],
    },
    conclusionParagraphs: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    ],
  },
  'homelab': {
    header: {
      heroImageUrl: '/images/homelab-banner.svg',
      title: 'HOMELAB',
      subtitle: 'A Self-Hosted Sandbox Environment for Learning and Privacy.',
      role: 'Hobbyist',
      duration: 'Jan 2026 - Present',
      readTime: '04 Minutes',
      techStackSummary: 'Ubuntu Server • Docker • Tailscale',
    },
    introParagraphs: [
      'A personal homelab running on a Dell Optiplex Mini with Ubuntu Server. The setup prioritizes security and privacy—only a single port is open, restricted exclusively to Tailscale traffic, enabling secure remote access via SSH from anywhere.',
      'All services run in isolated Docker containers, making it easy to manage, update, and expand. The lab serves as both a learning environment for DevOps practices and a practical solution for self-hosted privacy tools.',
    ],
    techStack: [
      { layer: 'Hardware', technology: 'Dell Optiplex Mini', purpose: 'Compact, low-power server' },
      { layer: 'OS', technology: 'Ubuntu Server', purpose: 'Headless Linux host' },
      { layer: 'Networking', technology: 'Tailscale', purpose: 'Secure remote access (runs on root)' },
      { layer: 'DNS', technology: 'Pi-hole', purpose: 'Network-wide ad blocking' },
      { layer: 'Dashboard', technology: 'Homepage', purpose: 'Service overview dashboard' },
      { layer: 'Containers', technology: 'Portainer', purpose: 'Docker container management' },
      { layer: 'Monitoring', technology: 'Netdata', purpose: 'Real-time system stats' },
      { layer: 'Security', technology: 'Bitwarden', purpose: 'Self-hosted password manager' },
    ],
    architecture: {
      nodes: [
        { id: 'user', label: 'User Device' },
        { id: 'tailscale', label: 'Tailscale VPN', items: ['SSH Access', 'Single Port'] },
        { id: 'ubuntu', label: 'Ubuntu Server', items: ['Dell Optiplex Mini'] },
        { id: 'docker', label: 'Docker', items: ['Pi-hole', 'Homepage', 'Portainer', 'Netdata', 'Bitwarden'] },
      ],
      edges: [
        { from: 'user', to: 'tailscale' },
        { from: 'tailscale', to: 'ubuntu' },
        { from: 'ubuntu', to: 'docker' },
      ],
    },
    conclusionParagraphs: [
      'This homelab provides a hands-on environment for experimenting with containerization, networking, and self-hosted services while keeping all data private and under personal control.',
      'Future plans include adding more services, experimenting with Proxmox for virtualization, and potentially expanding to additional hardware.',
    ],
  },
};
