import { 
  Cloud, 
  Monitor, 
  FileCode, 
  Terminal,
  Database,
  Layout,
  Code,
  Palette,
  Wind,
  Triangle,
  Server,
  Container
} from 'lucide-react';
import type { ComponentType } from 'react';

export interface Technology {
  name: string;
  icon: ComponentType<{ className?: string }>;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  previewText?: string;
  imageUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  period: string;
  role: string;
  description: string;
  timePeriod: string;
  accentColor: string;
  technologies: Technology[];
  projects: Project[];
  metrics: Metric[];
  statusText: string;
  currentFocus?: string;
}

export const experiences: Record<string, Experience> = {
  default: {
    id: 'default',
    company: '',
    period: '',
    role: '',
    description: 'FULL-STACK ARCHITECTURE BASED IN NEW YORK CITY. SPECIALIZING IN HIGH-PERFORMANCE INTERFACES AND CLOUD INFRASTRUCTURE.',
    timePeriod: '',
    accentColor: '#3b82f6', // blue-500
    technologies: [
      { name: 'TAILWIND', icon: Wind },
      { name: 'NEXT.JS', icon: Triangle },
      { name: 'AWS', icon: Cloud },
      { name: 'TYPESCRIPT', icon: FileCode },
      { name: 'DYNAMODB', icon: Database },
      { name: 'POSTGRES', icon: Server },
      { name: 'DOCKER', icon: Container },
    ],
    projects: [
      {
        title: 'UX INTERVIEWER',
        subtitle: '2025-PRESENT',
        description: 'UI/UX INTERVIEWING PREP • AWS | NEXT.JS',
        imageUrl: '/images/interviewer-small.svg',
      },
      {
        title: 'BALLIGHTS',
        subtitle: '2026',
        description: 'ML-POWERED BASKETBALL HIGHLIGHTS • PYTHON | YOLOV5 | PYTORCH',
        imageUrl: '/images/ballights-small.svg'
      },
      {
        title: 'HOMELAB',
        subtitle: '2025',
        description: 'SELF-HOSTED SANDBOX ENVIRONMENT • UBUNTU SERVER | DOCKER',
        imageUrl: '/images/homelab-small.svg'
      },
      {
        title: 'TC-TOOLS',
        subtitle: '2024',
        description: 'POST-IMAGE SETUP AUTOMATION • TYPESCRIPT | POWERSHELL',
        imageUrl: '/images/tc-tools-small.svg'
      }
    ],
    metrics: [
      { value: '', label: '' },
    ],
    statusText: 'AVAILABLE',
    currentFocus: 'UX INTERVIEWER',
  },
  vanguard: {
    id: 'vanguard',
    company: 'VANGUARD',
    period: '2024-25',
    role: 'SITE RELIABILITY ENGINEER',
    description: 'SITE RELIABILITY ENGINEER AT THE MALVERN CAMPUS.',
    timePeriod: 'SEP 2024 - MAR 2025',
    accentColor: '#dc2626', // red-600
    technologies: [
      { name: 'AWS', icon: Cloud },
      { name: 'ELECTRON', icon: Monitor },
      { name: 'PYTHON', icon: Terminal },
      { name: 'POWERSHELL', icon: Terminal },
      { name: 'TYPESCRIPT', icon: FileCode },
      { name: 'FIGMA', icon: Palette },
    ],
    projects: [
      {
        title: 'ScriptHub',
        subtitle: 'PRODUCT OWNER',
        description: 'REMOTE SCRIPT EXECUTION • ELECTRON | POWERSHELL',
        previewText: 'LOCKED',
      },
    ],
    metrics: [
      { value: '20%', label: 'Team Backlog\nCompleted' },
      { value: '35K+', label: 'Endpoint Tasks\nAutomated' },
    ],
    statusText: 'EXPERIENCE',
  },
  ritits: {
    id: 'ritits',
    company: 'RIT ITS',
    period: '2024',
    role: 'SOFTWARE DEVELOPMENT INTERN',
    description: 'SOFTWARE DEVELOPMENT INTERN BUILDING POST IMAGE SETUP AUTOMATION TOOLS.',
    timePeriod: 'MAY 2024 - AUG 2024',
    accentColor: '#f97316', // orange-500
    technologies: [
      { name: 'WPF', icon: Layout },
      { name: 'TYPESCRIPT', icon: FileCode },
      { name: 'C#', icon: Code },
      { name: 'POWERSHELL', icon: Terminal },
      { name: 'FIGMA', icon: Palette },
    ],
    projects: [
      {
        title: 'TC-TOOLS',
        subtitle: 'PRODUCT OWNER',
        description: 'POST-IMAGE SETUP AUTOMATION • TYPESCRIPT | POWERSHELL',
      },
    ],
    metrics: [
      { value: '80%', label: 'Faster Data\nBackups' },
      { value: '100%', label: 'Department-\nWide Adoption' },
    ],
    statusText: 'EXPERIENCE',
  },
  rithr: {
    id: 'rithr',
    company: 'RIT HR',
    period: '2022-2023',
    role: 'WEB DEVELOPER',
    description: 'WEB AND MEDIA DEVELOPER FOR THE DEPARTMENT OF HUMAN RESOURCES @ RIT.',
    timePeriod: 'NOV 2022 - JUL 2023',
    accentColor: '#f97316', // orange-500
    technologies: [
      { name: 'DRUPAL', icon: Database },
      { name: 'JAVASCRIPT', icon: Code },
      { name: 'HTML', icon: Layout },
      { name: 'CSS', icon: Palette },
      { name: 'FIGMA', icon: Palette },
    ],
    projects: [
      {
        title: 'DEPARTMENT-WIDE SITE REDESIGN',
        subtitle: 'Web Developer',
        description: 'POST-IMAGE SETUP AUTOMATION • TYPESCRIPT | POWERSHELL',
      },
    ],
    metrics: [
      { value: '25+', label: 'Pages Designed\n& Created' },
      { value: '100%', label: 'Department-\nSites Migrated' },
    ],
    statusText: 'EXPERIENCE',
  },
};

export const defaultExperience = experiences.default;
