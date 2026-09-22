import React, { useState, useCallback, useEffect } from 'react';
import { VIRTUAL_DIAGNOSTIC_BUGS } from '../data/phasesData';
import { QuestionOption } from '../types';
import { soundManager, readTextAloud, stopSpeech } from '../utils/audio';
import { CheckCircle2, XCircle, ArrowRight, Wrench, RefreshCw, Cpu, HardDrive, Printer, Keyboard, Monitor, Volume2, VolumeX } from 'lucide-react';

interface VirtualComputerLabProps {
  onCompletePhase: (scoreToAdd: number, stars: number) => void;
  speechEnabled: boolean;
  onStepChange?: (currentStep: number, totalSteps: number) => void;
}

export const VirtualComputerLab: React.FC<VirtualComputerLabProps> = ({
  onCompletePhase,
  speechEnabled,
  onStepChange
}) => {
  const [currentBugIndex, setCurrentBugIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [solvedComponents, setSolvedComponents] = useState<string[]>([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const bug = VIRTUAL_DIAGNOSTIC_BUGS[currentBugIndex];
  const isLast = currentBugIndex === VIRTUAL_DIAGNOSTIC_BUGS.length - 1;

  // Report progress to parent
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentBugIndex + 1, VIRTUAL_DIAGNOSTIC_BUGS.length);
    }
  }, [currentBugIndex, onStepChange]);

  useEffect(() => {
    setSelectedOptionId(null);
    setHasAnswered(false);
    stopSpeech();
    setIsSpeaking(false);

    if (speechEnabled && bug) {
      setIsSpeaking(true);
      readTextAloud(`Diagnóstico no computador: ${bug.componentName}. ${bug.problemDescription}`, () => setIsSpeaking(false));
    }

    return () => {
      stopSpeech();
    };
  }, [currentBugIndex, bug, speechEnabled]);

  const handleSelectOption = useCallback((option: QuestionOption) => {
    if (hasAnswered) return;
    setSelectedOptionId(option.id);
    setHasAnswered(true);

    if (option.isCorrect) {
      soundManager.playCorrect();
      setSolvedComponents(prev => [...prev, bug.component]);
      setCorrectAnswersCount(prev => prev + 1);
    } else {
      soundManager.playIncorrect();
    }

    if (speechEnabled) {
      setIsSpeaking(true);
      readTextAloud(
        option.isCorrect ? `Excelente conserto! ${bug.explanation}` : `Atenção ao diagnóstico. ${bug.explanation}`,
        () => setIsSpeaking(false)
      );
    }
  }, [hasAnswered, bug, speechEnabled]);

  const handleNext = useCallback(() => {
    soundManager.playClick();
    if (isLast) {
      const finalScore = correctAnswersCount * 50 + 50;
      const stars = correctAnswersCount >= 3 ? 3 : correctAnswersCount >= 2 ? 2 : 1;
      onCompletePhase(finalScore, stars);
    } else {
      setCurrentBugIndex(prev => prev + 1);
    }
  }, [isLast, correctAnswersCount, onCompletePhase]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      const key = e.key.toUpperCase();
      const code = e.code;

      if (!hasAnswered) {
        if (key === '1' || key === 'A' || code === 'Numpad1') if (bug?.options[0]) handleSelectOption(bug.options[0]);
        if (key === '2' || key === 'B' || code === 'Numpad2') if (bug?.options[1]) handleSelectOption(bug.options[1]);
        if (key === '3' || key === 'C' || code === 'Numpad3') if (bug?.options[2]) handleSelectOption(bug.options[2]);
        if (key === '4' || key === 'D' || code === 'Numpad4') if (bug?.options[3]) handleSelectOption(bug.options[3]);
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasAnswered, handleSelectOption, handleNext, bug]);

  if (!bug) return null;

  const getComponentStatus = (compName: string) => {
    if (solvedComponents.includes(compName)) return 'restored';
    if (bug.component === compName) return 'diagnosing';
    return 'pending';
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleReadAloud = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      let text = '';
      if (hasAnswered) {
        const selectedOpt = bug.options.find(o => o.id === selectedOptionId);
        text = `${selectedOpt?.isCorrect ? 'Excelente conserto!' : 'Atenção ao diagnóstico.'} ${bug.explanation}`;
      } else {
        text = `Diagnóstico no computador: ${bug.componentName}. ${bug.problemDescription}. Pergunta: Como o Sistema Operacional deve agir para restaurar esse componente? Opções: A, ${bug.options[0]?.text}. B, ${bug.options[1]?.text}. C, ${bug.options[2]?.text}. D, ${bug.options[3]?.text}.`;
      }
      setIsSpeaking(true);
      readTextAloud(text, () => setIsSpeaking(false));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Visual Diagnostic Bench */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur relative overflow-hidden">
        
        {/* Bench Title */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Bancada do Técnico Mirim: Diagnóstico do Hardware
              </h2>
              <p className="text-xs text-slate-400">
                Identifique a ação que o Sistema Operacional deve tomar para gerenciar cada peça!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-read-aloud-lab"
              onClick={handleReadAloud}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-500/40 text-xs flex items-center gap-1 transition cursor-pointer"
              title="Ouvir Diagnóstico e Opções em Voz Alta"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-400 animate-pulse" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Parar Leitura' : 'Ouvir'}</span>
            </button>

            <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 font-bold text-xs border border-cyan-500/40">
              Desafio {currentBugIndex + 1} de {VIRTUAL_DIAGNOSTIC_BUGS.length}
            </span>
          </div>
        </div>

        {/* Interactive Virtual Computer Diagram */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 mb-6">
          
          {/* Teclado */}
          <div className={`p-2.5 rounded-xl border text-center transition-all ${
            getComponentStatus('teclado') === 'restored'
              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
              : getComponentStatus('teclado') === 'diagnosing'
              ? 'bg-rose-950/70 border-rose-500 text-rose-300 ring-2 ring-rose-500/40 animate-pulse'
              : 'bg-slate-800/60 border-slate-700 text-slate-400'
          }`}>
            <Keyboard className="w-5 h-5 mx-auto mb-1" />
            <div className="text-[11px] font-bold">Teclado USB</div>
            <div className="text-[9px] mt-0.5 font-semibold">
              {getComponentStatus('teclado') === 'restored' ? '✓ Gerenciado' : getComponentStatus('teclado') === 'diagnosing' ? '⚠️ Em Falha' : 'Aguardando'}
            </div>
          </div>

          {/* Impressora */}
          <div className={`p-2.5 rounded-xl border text-center transition-all ${
            getComponentStatus('impressora') === 'restored'
              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
              : getComponentStatus('impressora') === 'diagnosing'
              ? 'bg-rose-950/70 border-rose-500 text-rose-300 ring-2 ring-rose-500/40 animate-pulse'
              : 'bg-slate-800/60 border-slate-700 text-slate-400'
          }`}>
            <Printer className="w-5 h-5 mx-auto mb-1" />
            <div className="text-[11px] font-bold">Impressora</div>
            <div className="text-[9px] mt-0.5 font-semibold">
              {getComponentStatus('impressora') === 'restored' ? '✓ Gerenciado' : getComponentStatus('impressora') === 'diagnosing' ? '⚠️ Em Falha' : 'Aguardando'}
            </div>
          </div>

          {/* Central: Sistema Operacional (Core) */}
          <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl border bg-cyan-950/80 border-cyan-500 text-cyan-200 text-center shadow-lg shadow-cyan-500/10 sm:scale-105 order-first sm:order-none">
            <Cpu className="w-5 h-5 mx-auto mb-1 text-cyan-300 animate-spin" style={{ animationDuration: '8s' }} />
            <div className="text-[11px] font-black text-white">SISTEMA OPERACIONAL</div>
            <div className="text-[9px] mt-0.5 text-cyan-400 font-bold">O Maestro do Hardware</div>
          </div>

          {/* Memória RAM */}
          <div className={`p-2.5 rounded-xl border text-center transition-all ${
            getComponentStatus('memoria') === 'restored'
              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
              : getComponentStatus('memoria') === 'diagnosing'
              ? 'bg-rose-950/70 border-rose-500 text-rose-300 ring-2 ring-rose-500/40 animate-pulse'
              : 'bg-slate-800/60 border-slate-700 text-slate-400'
          }`}>
            <RefreshCw className="w-5 h-5 mx-auto mb-1" />
            <div className="text-[11px] font-bold">Memória RAM</div>
            <div className="text-[9px] mt-0.5 font-semibold">
              {getComponentStatus('memoria') === 'restored' ? '✓ Gerenciada' : getComponentStatus('memoria') === 'diagnosing' ? '⚠️ Em Falha' : 'Aguardando'}
            </div>
          </div>

          {/* Armazenamento SSD */}
          <div className={`p-2.5 rounded-xl border text-center transition-all ${
            getComponentStatus('armazenamento') === 'restored'
              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
              : getComponentStatus('armazenamento') === 'diagnosing'
              ? 'bg-rose-950/70 border-rose-500 text-rose-300 ring-2 ring-rose-500/40 animate-pulse'
              : 'bg-slate-800/60 border-slate-700 text-slate-400'
          }`}>
            <HardDrive className="w-5 h-5 mx-auto mb-1" />
            <div className="text-[11px] font-bold">Disco SSD/HD</div>
            <div className="text-[9px] mt-0.5 font-semibold">
              {getComponentStatus('armazenamento') === 'restored' ? '✓ Gerenciado' : getComponentStatus('armazenamento') === 'diagnosing' ? '⚠️ Em Falha' : 'Aguardando'}
            </div>
          </div>

        </div>

        {/* Current Alert Box */}
        <div className="mb-6 p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              Sintoma Detectado: {bug.componentName}
            </span>
            <span className="text-xs text-amber-300 font-semibold">
              Bancada de Testes
            </span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-white">
            {bug.problemDescription}
          </p>
        </div>

        {/* Question Prompt */}
        <h3 className="text-sm sm:text-base font-bold text-cyan-200 mb-4">
          Como o Sistema Operacional deve agir para restaurar esse componente?
        </h3>

        {/* Diagnostic Options */}
        <div className="space-y-3 mb-6">
          {bug.options.map((option, idx) => {
            const letter = optionLetters[idx];
            const isSelected = selectedOptionId === option.id;
            
            let btnStyle = 'bg-slate-800/90 hover:bg-slate-700 text-slate-100 border-slate-700 hover:border-cyan-400/50';
            let letterBadge = 'bg-slate-900 text-cyan-300 border-slate-700';

            if (hasAnswered) {
              if (option.isCorrect) {
                btnStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/40';
                letterBadge = 'bg-emerald-600 text-white border-emerald-400';
              } else if (isSelected && !option.isCorrect) {
                btnStyle = 'bg-rose-950/90 border-rose-500 text-rose-100 ring-2 ring-rose-500/40';
                letterBadge = 'bg-rose-600 text-white border-rose-400';
              } else {
                btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-50';
                letterBadge = 'bg-slate-900 text-slate-600 border-slate-800';
              }
            }

            return (
              <button
                key={option.id}
                id={`diag-option-${option.id}`}
                disabled={hasAnswered}
                onClick={() => handleSelectOption(option)}
                className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition cursor-pointer ${btnStyle} ${
                  hasAnswered ? 'cursor-default' : ''
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border ${letterBadge}`}>
                  {letter}
                </div>
                <div className="flex-1 text-xs sm:text-sm font-medium pt-0.5 leading-snug">
                  {option.text}
                </div>
                {hasAnswered && (
                  <div className="shrink-0 mt-0.5">
                    {option.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback block */}
        {hasAnswered && (
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 shadow-md">
            <div className="flex items-center gap-2 mb-2 font-bold text-sm">
              {bug.options.find(o => o.id === selectedOptionId)?.isCorrect ? (
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5" />
                  Reparo com Sucesso! Componente gerenciado pelo SO.
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-5 h-5" />
                  Atenção ao diagnóstico!
                </span>
              )}
            </div>

            <div className="mb-2.5 px-3 py-1.5 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              🛠️ Papel Técnico do SO: {bug.osRole}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {bug.explanation}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400 hidden sm:inline">
                Pressione <kbd className="px-1 py-0.5 bg-slate-800 rounded font-mono text-cyan-400">Enter</kbd> para avançar
              </span>
              <button
                id="btn-next-diagnostic"
                onClick={handleNext}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>{isLast ? 'Concluir Conserto!' : 'Próximo Diagnóstico'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
