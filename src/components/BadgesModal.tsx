import React, { useEffect } from 'react';
import { X, Award, CheckCircle2 } from 'lucide-react';
import { ALL_BADGES } from '../utils/storage';
import { soundManager } from '../utils/audio';

interface BadgesModalProps {
  unlockedBadges: string[];
  onClose: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ unlockedBadges, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-4 sm:p-7 relative">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition cursor-pointer"
          aria-label="Fechar medalhas"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5 pb-3 border-b border-slate-800 pr-10">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4" />
            Galeria de Conquistas
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Medalhas do Técnico Mirim
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Você desbloqueou {unlockedBadges.length} de {ALL_BADGES.length} medalhas de honra da escola!
          </p>
        </div>

        {/* Badges List */}
        <div className="space-y-3">
          {ALL_BADGES.map((badge) => {
            const isUnlocked = unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border flex items-start gap-3.5 transition ${
                  isUnlocked
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                    : 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-60'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 border ${
                  isUnlocked
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-md shadow-amber-500/10'
                    : 'bg-slate-800 text-slate-600 border-slate-700'
                }`}>
                  {isUnlocked ? '🏅' : '🔒'}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {badge.name}
                    </h3>
                    {isUnlocked && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Conquistada
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
