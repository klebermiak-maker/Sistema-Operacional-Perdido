import React from 'react';
import { Volume2, VolumeX, Volume1, Map, BookOpen, RotateCcw, Award } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  currentPhaseId: number;
  totalPhases: number;
  phaseTitle: string;
  score: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  speechEnabled: boolean;
  onToggleSpeech: () => void;
  onOpenMap: () => void;
  onOpenGlossary: () => void;
  onOpenBadges: () => void;
  onResetGame: () => void;
  isAllPhasesCompleted?: boolean;
  onOpenCertificate?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPhaseId,
  totalPhases,
  phaseTitle,
  score,
  soundEnabled,
  onToggleSound,
  speechEnabled,
  onToggleSpeech,
  onOpenMap,
  onOpenGlossary,
  onOpenBadges,
  onResetGame,
  isAllPhasesCompleted,
  onOpenCertificate
}) => {
  return (
    <header className="w-full bg-slate-900/95 border-b border-cyan-500/20 backdrop-blur sticky top-0 z-40 px-3 sm:px-6 py-2.5 transition-all">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        
        {/* Logo and Mission Title */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold text-lg ring-2 ring-cyan-400/30">
            <span role="img" aria-label="chip">💻</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                BNCC EF05CO07
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 hidden md:inline">
                5º Ano • Computação + Português + Matemática
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-slate-100 leading-tight">
              Missão: O Sistema Operacional Perdido
            </h1>
          </div>
        </div>

        {/* Center: Phase indicator */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
          {currentPhaseId > totalPhases ? (
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
              <span>🏆</span>
              <span>Missão Concluída! Certificado Emitido</span>
            </span>
          ) : (
            <>
              <span className="text-xs text-slate-400">Fase {currentPhaseId} de {totalPhases}:</span>
              <span className="text-xs font-bold text-cyan-300 max-w-[200px] truncate">{phaseTitle}</span>
            </>
          )}
        </div>

        {/* Right action controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Score Counter */}
          <div 
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/15 to-yellow-500/10 border border-amber-500/40 px-2.5 py-1 rounded-lg text-amber-300 font-bold text-xs sm:text-sm shadow-sm"
            title="Sua pontuação acumulada"
          >
            <span className="text-sm sm:text-base">⭐</span>
            <span>{score} pts</span>
          </div>

          {/* Certificate shortcut if all phases completed */}
          {isAllPhasesCompleted && onOpenCertificate && (
            <button
              id="btn-open-cert-header"
              onClick={() => {
                soundManager.playClick();
                onOpenCertificate();
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition cursor-pointer"
              title="Ver Certificado de Técnico Mirim"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Certificado</span>
            </button>
          )}

          {/* Map / Phases button */}
          <button
            id="btn-open-map"
            onClick={() => {
              soundManager.playClick();
              onOpenMap();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-500/50 text-xs font-medium transition cursor-pointer"
            title="Abrir mapa de fases"
            aria-label="Abrir mapa de fases"
          >
            <Map className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Fases</span>
          </button>

          {/* Glossary button */}
          <button
            id="btn-open-glossary"
            onClick={() => {
              soundManager.playClick();
              onOpenGlossary();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-emerald-500/50 text-xs font-medium transition cursor-pointer"
            title="Guia de Termos & Dicionário"
            aria-label="Dicionário de Informática"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Dicionário</span>
          </button>

          {/* Badges button */}
          <button
            id="btn-open-badges"
            onClick={() => {
              soundManager.playClick();
              onOpenBadges();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-amber-500/50 text-xs font-medium transition cursor-pointer"
            title="Ver medalhas conquistadas"
            aria-label="Ver medalhas"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Medalhas</span>
          </button>

          {/* Sound Toggle */}
          <button
            id="btn-toggle-sound"
            onClick={() => {
              onToggleSound();
              soundManager.playClick();
            }}
            className={`p-2 rounded-lg border text-xs transition cursor-pointer ${
              soundEnabled
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
            }`}
            title={soundEnabled ? 'Desativar sons' : 'Ativar sons'}
            aria-label={soundEnabled ? 'Desativar sons' : 'Ativar sons'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Speech Read Toggle */}
          <button
            id="btn-toggle-speech"
            onClick={() => {
              soundManager.playClick();
              onToggleSpeech();
            }}
            className={`p-2 rounded-lg border text-xs transition cursor-pointer ${
              speechEnabled
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
            }`}
            title={speechEnabled ? 'Leitura automática ativada' : 'Ativar leitura em voz alta'}
            aria-label={speechEnabled ? 'Leitura automática ativada' : 'Ativar leitura em voz alta'}
          >
            <Volume1 className="w-4 h-4" />
          </button>

          {/* Reset progress */}
          <button
            id="btn-reset-game"
            onClick={() => {
              soundManager.playClick();
              onResetGame();
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 border border-slate-700 transition cursor-pointer"
            title="Reiniciar jogo do início"
            aria-label="Reiniciar jogo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
