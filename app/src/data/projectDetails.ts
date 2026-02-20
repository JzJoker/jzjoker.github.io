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
};
