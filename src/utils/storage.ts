import { UserProgress, Badge } from '../types';

const STORAGE_KEY = 'missao_so_perdido_save_v1';

export const ALL_BADGES: Badge[] = [
  {
    id: 'first_step',
    name: 'Primeiro Diagnóstico',
    description: 'Identificou as funções de todos os componentes e periféricos.',
    icon: 'Search'
  },
  {
    id: 'hardware_master',
    name: 'Mestre do Hardware & Software',
    description: 'Diferenciou perfeitamente partes físicas e programas lógicos.',
    icon: 'Cpu'
  },
  {
    id: 'so_conductor',
    name: 'Maestro do Computador',
    description: 'Compreendeu por que o Sistema Operacional é essencial para executar programas.',
    icon: 'Sparkles'
  },
  {
    id: 'curious_reader',
    name: 'Leitor Conectado',
    description: 'Localizou com precisão as informações nos textos de informática.',
    icon: 'BookOpen'
  },
  {
    id: 'math_genius',
    name: 'Calculista dos Bytes',
    description: 'Resolveu todos os desafios matemáticos de armazenamento e computadores.',
    icon: 'Calculator'
  },
  {
    id: 'tech_hero',
    name: 'Técnico Mirim de Honra',
    description: 'Diagnosticou os erros, restaurou o Sistema Operacional e salvou a escola!',
    icon: 'Award'
  }
];

export const INITIAL_PROGRESS: UserProgress = {
  currentPhaseId: 1,
  completedPhases: [],
  phaseStars: {},
  phaseScores: {},
  totalScore: 0,
  soundEnabled: true,
  speechEnabled: false,
  unlockedBadges: []
};

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_PROGRESS,
      ...parsed
    };
  } catch {
    return INITIAL_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota issues
  }
}

export function resetProgress(): UserProgress {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return INITIAL_PROGRESS;
}
