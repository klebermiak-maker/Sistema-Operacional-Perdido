import React from 'react';
import { Award, CheckCircle2, RotateCcw, Printer, Star, Sparkles, Map, BookOpen } from 'lucide-react';
import { ALL_BADGES } from '../utils/storage';
import { soundManager } from '../utils/audio';

interface VictoryScreenProps {
  score: number;
  totalPossibleScore: number;
  phaseStars: Record<number, number>;
  unlockedBadges: string[];
  onRestart: () => void;
  onOpenMap: () => void;
  onOpenGlossary: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  score,
  totalPossibleScore,
  phaseStars,
  unlockedBadges,
  onRestart,
  onOpenMap,
  onOpenGlossary
}) => {
  const totalStars = Object.values(phaseStars).reduce((a, b) => a + b, 0);
  const maxStars = 21; // 7 phases * 3 stars

  const handlePrint = () => {
    soundManager.playClick();
    try {
      window.print();
    } catch (err) {
      console.warn('Impressão direta não suportada no ambiente iframe:', err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fadeIn py-6 px-3 sm:px-0">
      
      {/* Grand Victory Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs sm:text-sm font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          Habilidade BNCC EF05CO07 Conquistada!
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-300 leading-tight">
          MISSÃO CONCLUÍDA! AGORA VOCÊ SABE POR QUE O COMPUTADOR PRECISA DE UM SISTEMA OPERACIONAL!
        </h1>

        <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto">
          Você cumpriu todas as 7 missões interdisciplinares, restaurou os computadores da escola e se tornou um verdadeiro <strong className="text-cyan-400">Técnico Mirim de Honra</strong>!
        </p>
      </div>

      {/* Official Certificate Card (Styled & Printable) */}
      <div 
        id="printable-certificate"
        className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-4 border-amber-500/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden print:bg-white print:text-black print:border-black print:shadow-none"
      >
        {/* Certificate Decorative Corners */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/60" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/60" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/60" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/60" />

        {/* Certificate Header */}
        <div className="text-center space-y-2 mb-6 border-b border-amber-500/30 pb-4 print:border-black">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto mb-2 shadow-lg shadow-amber-500/20">
            <Award className="w-9 h-9" />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-amber-400 print:text-gray-800">
            MINISTÉRIO DA COMPUTAÇÃO ESCOLAR • 5º ANO
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-white print:text-black">
            CERTIFICADO DE TÉCNICO MIRIM
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 print:text-gray-700">
            Habilidade EF05CO07 – Reconhecimento do Sistema Operacional
          </p>
        </div>

        {/* Certificate Body Text */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-8">
          <p className="text-sm sm:text-base text-slate-200 print:text-gray-900 leading-relaxed">
            Certificamos que o(a) <strong>Estudante do 5º Ano</strong> concluiu com êxito todas as etapas da jornada, demonstrando domínio sobre o papel fundamental do <strong>Sistema Operacional</strong> na coordenação de hardware (teclado, mouse, monitor, memória RAM, disco e impressora) e no suporte para a execução de programas educativos e jogos.
          </p>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-center print:border-gray-400 print:bg-gray-100">
              <div className="text-xl sm:text-2xl font-black text-amber-400 print:text-black">
                {score} pts
              </div>
              <div className="text-[11px] text-slate-400 print:text-gray-600 font-semibold">
                Pontuação Total
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-center print:border-gray-400 print:bg-gray-100">
              <div className="text-xl sm:text-2xl font-black text-cyan-400 print:text-black flex items-center justify-center gap-1">
                <span>{totalStars}</span>
                <span className="text-sm">/ {maxStars} ⭐</span>
              </div>
              <div className="text-[11px] text-slate-400 print:text-gray-600 font-semibold">
                Estrelas Conquistadas
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-center col-span-2 sm:col-span-1 print:border-gray-400 print:bg-gray-100">
              <div className="text-xl sm:text-2xl font-black text-emerald-400 print:text-black">
                7 / 7 Fases
              </div>
              <div className="text-[11px] text-slate-400 print:text-gray-600 font-semibold">
                Missões Restauradas
              </div>
            </div>
          </div>
        </div>

        {/* What did you learn? BNCC Summary Card */}
        <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-slate-200 text-xs sm:text-sm space-y-2 mb-6 print:bg-gray-50 print:border-gray-300 print:text-black">
          <h3 className="font-bold text-cyan-300 print:text-black text-sm uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            O que você aprendeu com esta missão (Conclusão Pedagógica):
          </h3>
          <ul className="space-y-1.5 list-disc list-inside text-slate-300 print:text-gray-800">
            <li>
              <strong>Não é apenas mais um programa:</strong> O Sistema Operacional é a base que dá vida e sentido ao computador.
            </li>
            <li>
              <strong>Gerencia o Hardware:</strong> Ele comanda e conecta as peças físicas — teclado, mouse, monitor, placa-mãe, memória RAM, SSD e impressora.
            </li>
            <li>
              <strong>Executa os Programas:</strong> Ele carrega os aplicativos na memória, divide o tempo do processador e impede que a máquina trave ao fazer multitarefa.
            </li>
            <li>
              <strong>Interdisciplinaridade:</strong> Você aplicou Língua Portuguesa para interpretar instruções e Matemática para calcular capacidades e recursos digitais!
            </li>
          </ul>
        </div>

        {/* Certificate Signatures */}
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-4 border-t border-slate-700 print:border-gray-300 text-center">
          <div>
            <div className="w-40 border-b border-slate-500 print:border-black mx-auto mb-1"></div>
            <div className="text-xs font-bold text-slate-300 print:text-black">Coordenação Pedagógica</div>
            <div className="text-[10px] text-slate-400 print:text-gray-600">Ensino Fundamental I</div>
          </div>
          <div>
            <div className="w-40 border-b border-slate-500 print:border-black mx-auto mb-1"></div>
            <div className="text-xs font-bold text-cyan-400 print:text-black">Chip, o Assistente da Escola</div>
            <div className="text-[10px] text-slate-400 print:text-gray-600">Instrutor de Computação Mirim</div>
          </div>
        </div>

      </div>

      {/* Badges Gallery */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 print:hidden">
        <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          Medalhas Conquistadas ({unlockedBadges.length} de {ALL_BADGES.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ALL_BADGES.map(badge => {
            const isUnlocked = unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-xl border flex items-start gap-3 transition ${
                  isUnlocked
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                    : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 border ${
                  isUnlocked
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    : 'bg-slate-800 text-slate-600 border-slate-700'
                }`}>
                  {isUnlocked ? '🏅' : '🔒'}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    {badge.name}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                    {badge.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons (Print, Replay, Map) */}
      <div className="flex flex-wrap items-center justify-center gap-3 print:hidden pt-2">
        <button
          id="btn-print-certificate"
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 flex items-center gap-2 transition hover:scale-[1.02] cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Imprimir Certificado
        </button>

        <button
          id="btn-review-map"
          onClick={() => {
            soundManager.playClick();
            onOpenMap();
          }}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-sm font-bold flex items-center gap-2 transition cursor-pointer"
        >
          <Map className="w-4 h-4 text-cyan-400" />
          Revisar Fases
        </button>

        <button
          id="btn-view-glossary-final"
          onClick={() => {
            soundManager.playClick();
            onOpenGlossary();
          }}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-sm font-bold flex items-center gap-2 transition cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          Consultar Dicionário
        </button>

        <button
          id="btn-restart-game-final"
          onClick={() => {
            soundManager.playClick();
            onRestart();
          }}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-200 hover:text-rose-300 border border-slate-700 hover:border-rose-500/50 text-sm font-bold flex items-center gap-2 transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Jogar Novamente
        </button>
      </div>

    </div>
  );
};
