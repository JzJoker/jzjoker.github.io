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
      readTime: '10 Minutes',
      techStackSummary: 'Next.js • AWS',
    },
    introParagraphs: [
      'There are many interview prep resources for software engineers out there on the web—the most notorious being LeetCode; however, while software engineers can practice active recall for technical interiviews doing DSA problems, there is no real way to practice retrieval of UI/UX design principles in preperation for design interviews.',
      ' So we decided to make it. The First Structured Interview Prep Platform for UI/UX Design. Randomized case study problems and a scoring system to help you track your progress. Plus, realtime AI voice feedback to simulate a real interview and help you improve your design skills.',
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
      'Overall, this homelab provides a hands-on environment for experimenting with containerization, networking, and self-hosted services while keeping all data private and under personal control.',
      'Future plans include adding more services, experimenting with Proxmox for virtualization, and potentially expanding to additional hardware.',
    ],
  },
  'tc-tools': {
    header: {
      title: 'TC-TOOLS',
      subtitle: 'Post-Image Setup Automation for Lab and Department Machines.',
      role: 'Product Owner / Developer',
      duration: 'May 2024 - Aug 2024',
      readTime: '04 Minutes',
      techStackSummary: 'TypeScript • PowerShell',
    },
    introParagraphs: [
      'TC-Tools is a post-image setup automation suite built during my internship at RIT ITS. After reimaging lab and department machines, technicians needed a reliable way to configure software, policies, and backups without manual steps.',
      'The project combined TypeScript for a structured CLI and PowerShell for Windows configuration and scripting. It automated data backups, software installation, and policy application, cutting setup time and reducing human error.',
    ],
    conclusionParagraphs: [
      'The tool achieved department-wide adoption and significantly faster data backups. It demonstrated how scripting and automation can scale support operations and free technicians to focus on higher-value work.',
    ],
  },
};
