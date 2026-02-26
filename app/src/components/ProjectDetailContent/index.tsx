import type { ComponentType } from 'react';
import type { ProjectDetailData } from '@/data/projectDetails';
import { UxInterviewerContent } from './UxInterviewerContent';
import { HomelabContent } from './HomelabContent';
import { TcToolsContent } from './TcToolsContent';

export interface ProjectDetailContentProps {
  data: ProjectDetailData;
}

/**
 * Map of project slug to custom detail content component.
 * Add a component here to render custom HTML/CSS (JSX) between intro and conclusion for that project.
 */
export const projectDetailContent: Partial<
  Record<string, ComponentType<ProjectDetailContentProps>>
> = {
  'ux-interviewer': UxInterviewerContent,
  homelab: HomelabContent,
  TCTools: TcToolsContent,
};
