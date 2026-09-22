import React, { useEffect } from 'react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ConfirmResetModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmResetModal: React.FC<ConfirmResetModalProps> = ({
  isOpen,
  onConfirm,
  onCancel
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div className="bg-slate-900 border-2 border-rose-500/50 rounded-3xl w-full max-w-md p-6 shadow-2xl relative text-center">
        
        {/* Close Icon */}
        <button
          onClick={() => {
            soundManager.playClick();
            onCancel();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition cursor-pointer"
          aria-label="Cancelar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Icon */}
        <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg shadow-rose-500/20">
          <AlertTriangle className="w-7 h-7 text-rose-400" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-white mb-2">
          Reiniciar Todo o Jogo?
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
          Esta ação irá zerar suas estrelas, pontos e fases concluídas para que você possa viver a aventura do Técnico Mirim novamente desde o início.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={() => {
              soundManager.playClick();
              onCancel();
            }}
            className="w-full sm:flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs sm:text-sm border border-slate-700 transition cursor-pointer"
          >
            Cancelar
          </button>

          <button
            id="btn-confirm-reset"
            onClick={() => {
              soundManager.playClick();
              onConfirm();
            }}
            className="w-full sm:flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Sim, Reiniciar</span>
          </button>
        </div>

      </div>
    </div>
  );
};
