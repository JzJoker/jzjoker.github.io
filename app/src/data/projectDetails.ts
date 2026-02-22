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
  techStack?: TechStackRow[];
  architecture?: ProjectArchitecture;
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
      { layer: 'Frontend', technology: 'React', purpose: 'Build UI' },
      { layer: 'Backend', technology: 'Node.js', purpose: 'API Server' },
      { layer: 'Database', technology: 'AWS DynamoDB', purpose: 'Data Storage' },
      { layer: 'Authentication', technology: 'AWS Cognito', purpose: 'User Authentication' },
      { layer: 'Deployment', technology: 'Vercel', purpose: 'Hosting' },
      { layer: 'Version Control', technology: 'Git', purpose: 'Code Management' },
      { layer: 'Other', technology: 'ElevenLabs', purpose: 'Text-to-Speech' },
    ],
    architecture: {
      nodes: [
        { id: 'frontend', label: 'Frontend', items: ['React'] },
        { id: 'backend', label: 'Backend', items: ['Node.js', 'API Server'] },
        { id: 'database', label: 'Database', items: ['AWS DynamoDB'] },
        { id: 'auth', label: 'Authentication', items: ['AWS Cognito'] },
        { id: 'deployment', label: 'Deployment', items: ['Vercel'] },
        { id: 'vcs', label: 'Version Control', items: ['Git'] },
        { id: 'other', label: 'Other', items: ['ElevenLabs', 'Text-to-Speech'] },
      ],
      edges: [
        { from: 'frontend', to: 'backend' },
        { from: 'backend', to: 'database' },
        { from: 'database', to: 'auth' },
        { from: 'auth', to: 'deployment' },
        { from: 'deployment', to: 'vcs' },
        { from: 'vcs', to: 'other' },
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
    conclusionParagraphs: [
      'This homelab provides a hands-on environment for experimenting with containerization, networking, and self-hosted services while keeping all data private and under personal control.',
      'Future plans include adding more services, experimenting with Proxmox for virtualization, and potentially expanding to additional hardware.',
    ],
  },
};
