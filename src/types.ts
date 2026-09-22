export type SubjectCategory = 'computacao' | 'portugues' | 'matematica' | 'misto';

export type ComponentRole = 
  | 'teclado' 
  | 'mouse' 
  | 'monitor' 
  | 'impressora' 
  | 'memoria' 
  | 'armazenamento' 
  | 'sistema_operacional';

export type ClassificationType = 'hardware' | 'software' | 'sistema_operacional';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  title?: string;
  scenario?: string; // Context or practical story
  readingText?: string; // For Portuguese reading questions
  iconName?: string;
  imageVisual?: {
    type: 'icon' | 'badge' | 'hardware' | 'scenario' | 'math';
    label: string;
    sublabel?: string;
    color: string;
  };
  prompt: string;
  options: QuestionOption[];
  explanation: string; // Pedagogical explanation for 5th grade EF05CO07
  hint?: string;
}

export interface Phase {
  id: number;
  title: string;
  shortTitle: string;
  category: SubjectCategory;
  description: string;
  bnccFocus: string;
  icon: string;
  themeColor: string;
  questions: Question[];
}

export interface VirtualDiagnosticBug {
  id: string;
  component: ComponentRole;
  componentName: string;
  symptom: string;
  problemDescription: string;
  options: QuestionOption[];
  explanation: string;
  osRole: string; // What the OS does in this case
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

export interface UserProgress {
  currentPhaseId: number;
  completedPhases: number[];
  phaseStars: Record<number, number>; // phaseId -> stars (0 to 3)
  phaseScores: Record<number, number>;
  totalScore: number;
  soundEnabled: boolean;
  speechEnabled: boolean;
  unlockedBadges: string[];
}
