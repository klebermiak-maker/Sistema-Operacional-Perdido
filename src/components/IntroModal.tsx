import React from 'react';
import { Play, Sparkles, AlertTriangle, ShieldCheck, BookOpen, Calculator, Cpu } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface IntroModalProps {
  onStartGame: () => void;
}

export const IntroModal: React.FC<IntroModalProps> = ({ onStartGame }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border-2 border-cyan-500/50 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl p-5 sm:p-8 relative">
        
        {/* Top Mascot / Alert Badge */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Alerta Vermelho no Laboratório Escolar!
          </span>
          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
            5º Ano • BNCC EF05CO07
          </span>
        </div>

        {/* Title */}
        <div className="space-y-2 mb-5">
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 leading-tight">
            MISSÃO: O SISTEMA OPERACIONAL PERDIDO
          </h2>
          <p className="text-xs sm:text-sm text-cyan-300 font-semibold">
            Chamando todos os Técnicos Mirins da Escola!
          </p>
        </div>

        {/* Story Dialogue Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3 mb-6 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/30 shrink-0">
              🤖
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Chip, o Assistente Digital da Escola:
              </div>
              <div className="text-xs text-slate-400">
                Relatório de Emergência
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            &ldquo;Socorro, Técnico Mirim! O <strong>Sistema Operacional</strong> dos nossos computadores desapareceu! As peças físicas de hardware — teclado, mouse, monitor, memória e impressora — continuam ligadas na tomada, mas <strong>sem o Sistema Operacional elas não sabem o que fazer e nenhum programa educativo consegue abrir!</strong>&rdquo;
          </p>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            &ldquo;Precisamos da sua ajuda para cumprir <strong>7 missões interdisciplinares</strong>, consertar os componentes e trazer o Sistema Operacional de volta!&rdquo;
          </p>
        </div>

        {/* The 3 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-center">
            <Cpu className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
            <div className="text-xs font-bold text-white">Computação</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Entenda o hardware e o papel mestre do SO</div>
          </div>

          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-center">
            <BookOpen className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <div className="text-xs font-bold text-white">Português</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Localize informações em textos explicativos</div>
          </div>

          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-center">
            <Calculator className="w-5 h-5 text-purple-400 mx-auto mb-1" />
            <div className="text-xs font-bold text-white">Matemática</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Calcule memórias, periféricos e arquivos</div>
          </div>
        </div>

        {/* Start Button */}
        <button
          id="btn-start-mission"
          onClick={() => {
            soundManager.playClick();
            onStartGame();
          }}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition hover:scale-[1.01] cursor-pointer"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Aceitar Missão e Começar!</span>
        </button>

      </div>
    </div>
  );
};
