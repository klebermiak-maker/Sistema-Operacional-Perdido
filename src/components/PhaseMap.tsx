import React from 'react';
import { Phase } from '../types';
import { PHASES_DATA } from '../data/phasesData';
import { soundManager } from '../utils/audio';
import { X, Lock, CheckCircle2, Star, Play, Award, BookOpen, Calculator, Cpu, Layers, Activity, Wrench } from 'lucide-react';

interface PhaseMapProps {
  currentPhaseId: number;
  completedPhases: number[];
  phaseStars: Record<number, number>;
  phaseScores: Record<number, number>;
  onSelectPhase: (phaseId: number) => void;
  onClose: () => void;
}

export const PhaseMap: React.FC<PhaseMapProps> = ({
  currentPhaseId,
  completedPhases,
  phaseStars,
  phaseScores,
  onSelectPhase,
  onClose
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const getPhaseIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Calculator': return <Calculator className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'computacao':
        return <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold">Computação</span>;
      case 'portugues':
        return <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">Língua Portuguesa</span>;
      case 'matematica':
        return <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-bold">Matemática</span>;
      case 'misto':
        return <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold">Interdisciplinar</span>;
      default:
        return null;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-4 sm:p-7 relative">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition cursor-pointer"
          aria-label="Fechar mapa"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-slate-800 pr-10">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Mapa de Missões do Técnico Mirim
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Escolha uma Fase para Jogar ou Revisar
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Cumpra as 7 fases em ordem para restaurar o Sistema Operacional da escola e conquistar o diploma de honra!
          </p>
        </div>

        {/* Phases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {PHASES_DATA.map((phase: Phase) => {
            const isCompleted = completedPhases.includes(phase.id);
            const isCurrent = currentPhaseId === phase.id;
            // Phase is unlocked if it's phase 1, or if the previous phase was completed, or if it's already completed
            const isUnlocked = phase.id === 1 || completedPhases.includes(phase.id - 1) || isCompleted;
            const stars = phaseStars[phase.id] || 0;
            const score = phaseScores[phase.id] || 0;

            let cardBorder = 'border-slate-800 bg-slate-800/40 opacity-60';
            if (isUnlocked) {
              cardBorder = isCurrent 
                ? 'border-cyan-400 ring-2 ring-cyan-400/30 bg-slate-800/90 shadow-lg shadow-cyan-500/10' 
                : isCompleted 
                ? 'border-emerald-500/50 bg-slate-800/80 hover:border-emerald-400' 
                : 'border-slate-700 bg-slate-800/70 hover:border-cyan-500/50';
            }

            return (
              <div
                key={phase.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${cardBorder}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                        isCompleted 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                          : isUnlocked 
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' 
                          : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}>
                        {getPhaseIcon(phase.icon)}
                      </div>
                      <span className="text-xs font-bold text-slate-400">
                        Missão {phase.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {getCategoryBadge(phase.category)}
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                    {phase.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-2">
                    {phase.description}
                  </p>

                  <div className="text-[10px] text-cyan-400/90 font-medium bg-slate-900/60 p-1.5 rounded-lg border border-slate-800">
                    {phase.bnccFocus}
                  </div>
                </div>

                {/* Card Footer: Stars, Score and Action Button */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map(s => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= stars
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    ))}
                    {score > 0 && (
                      <span className="text-xs font-bold text-amber-300 ml-1.5">
                        +{score} pts
                      </span>
                    )}
                  </div>

                  {isUnlocked ? (
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        onSelectPhase(phase.id);
                        onClose();
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                        isCurrent
                          ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-md'
                          : isCompleted
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : 'bg-slate-700 hover:bg-cyan-600 text-white'
                      }`}
                    >
                      {isCurrent ? (
                        <>
                          <Play className="w-3 h-3 fill-current" />
                          <span>Fase Atual</span>
                        </>
                      ) : isCompleted ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Rejogar</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-current" />
                          <span>Iniciar</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Bloqueada</span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Certificate shortcut if all phases completed */}
        {completedPhases.length >= PHASES_DATA.length && (
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border border-amber-500/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🏆</span>
              <div>
                <h4 className="text-sm font-bold text-amber-300">Missão Total Concluída!</h4>
                <p className="text-xs text-slate-300">Você já restaurou todas as 7 fases do Sistema Operacional!</p>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                onSelectPhase(PHASES_DATA.length + 1);
                onClose();
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              Ver Certificado e Resultado
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
