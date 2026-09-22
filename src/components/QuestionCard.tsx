import React, { useState, useEffect, useCallback } from 'react';
import { Question, QuestionOption } from '../types';
import { soundManager, readTextAloud, stopSpeech } from '../utils/audio';
import { Volume2, HelpCircle, CheckCircle2, XCircle, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onAnswerSelected: (isCorrect: boolean) => void;
  onNextQuestion: () => void;
  speechEnabled: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  onAnswerSelected,
  onNextQuestion,
  speechEnabled
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Reset local state when question changes
  useEffect(() => {
    setSelectedOptionId(null);
    setHasAnswered(false);
    setShowHint(false);
    stopSpeech();
    setIsSpeaking(false);

    // Auto-read if speechEnabled is on
    if (speechEnabled) {
      const fullSpeech = `${question.title || ''}. ${question.prompt}`;
      readTextAloud(fullSpeech, () => setIsSpeaking(false));
      setIsSpeaking(true);
    }

    return () => {
      stopSpeech();
    };
  }, [question, speechEnabled]);

  const handleSelectOption = useCallback((option: QuestionOption) => {
    if (hasAnswered) return;

    setSelectedOptionId(option.id);
    setHasAnswered(true);

    if (option.isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }

    onAnswerSelected(option.isCorrect);

    // Optional audio explanation
    if (speechEnabled) {
      const speech = option.isCorrect 
        ? `Correto! ${question.explanation}` 
        : `Atenção. ${question.explanation}`;
      setIsSpeaking(true);
      readTextAloud(speech, () => setIsSpeaking(false));
    }
  }, [hasAnswered, onAnswerSelected, question.explanation, speechEnabled]);

  const handleNext = useCallback(() => {
    soundManager.playClick();
    stopSpeech();
    onNextQuestion();
  }, [onNextQuestion]);

  // Keyboard navigation: 1-4 or A-D to select, Enter or Space to proceed, H to toggle hint
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const key = e.key.toUpperCase();
      const code = e.code;

      if (!hasAnswered) {
        if (key === '1' || key === 'A' || code === 'Numpad1') {
          if (question.options[0]) handleSelectOption(question.options[0]);
        } else if (key === '2' || key === 'B' || code === 'Numpad2') {
          if (question.options[1]) handleSelectOption(question.options[1]);
        } else if (key === '3' || key === 'C' || code === 'Numpad3') {
          if (question.options[2]) handleSelectOption(question.options[2]);
        } else if (key === '4' || key === 'D' || code === 'Numpad4') {
          if (question.options[3]) handleSelectOption(question.options[3]);
        } else if (key === 'H' && question.hint) {
          setShowHint(prev => !prev);
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasAnswered, handleSelectOption, handleNext, question.options, question.hint]);

  const handleReadAloud = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      let text = '';
      if (hasAnswered) {
        const selectedOpt = question.options.find(o => o.id === selectedOptionId);
        const isRight = selectedOpt?.isCorrect;
        text = `${isRight ? 'Resposta correta!' : 'Atenção à explicação.'} ${question.explanation}`;
      } else {
        text = `${question.title ? question.title + '. ' : ''}${question.scenario ? question.scenario + '. ' : ''}${question.readingText ? question.readingText + '. ' : ''}${question.prompt}. Opções: A, ${question.options[0]?.text}. B, ${question.options[1]?.text}. C, ${question.options[2]?.text}. D, ${question.options[3]?.text}.`;
      }
      setIsSpeaking(true);
      readTextAloud(text, () => setIsSpeaking(false));
    }
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-800/90 border border-slate-700/80 rounded-2xl shadow-2xl p-4 sm:p-7 backdrop-blur transition-all">
      
      {/* Top Question Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-700/60">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs border border-cyan-500/30">
            Questão {questionIndex + 1} de {totalQuestions}
          </span>
          {question.title && (
            <span className="text-xs sm:text-sm font-semibold text-slate-300">
              {question.title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Read aloud button */}
          <button
            type="button"
            onClick={handleReadAloud}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition cursor-pointer ${
              isSpeaking
                ? 'bg-purple-600 text-white border-purple-400 animate-pulse'
                : 'bg-slate-700/60 text-slate-300 hover:text-white border-slate-600 hover:bg-slate-700'
            }`}
            title="Ouvir a pergunta em voz alta"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isSpeaking ? 'Parar Leitura' : 'Ouvir Pergunta'}</span>
          </button>

          {/* Hint button */}
          {question.hint && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setShowHint(!showHint);
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition cursor-pointer"
              title="Ver dica pedagógica"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Dica</span>
            </button>
          )}
        </div>
      </div>

      {/* Reading Text Box (for Portuguese comprehension phase) */}
      {question.readingText && (
        <div className="mb-5 p-4 sm:p-5 rounded-xl bg-amber-950/25 border-l-4 border-amber-500 text-slate-200 text-sm sm:text-base leading-relaxed shadow-inner">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            Texto para Leitura e Interpretação:
          </div>
          <p className="italic font-normal">{question.readingText}</p>
        </div>
      )}

      {/* Scenario Box (for contextual questions) */}
      {question.scenario && !question.readingText && (
        <div className="mb-4 p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 text-blue-200 text-sm sm:text-base font-medium flex items-center gap-2.5">
          <span className="text-xl">💡</span>
          <span>{question.scenario}</span>
        </div>
      )}

      {/* Visual Component Banner (Hardware/Software card) */}
      {question.imageVisual && (
        <div className="mb-5 flex justify-center">
          <div className={`px-5 py-3 rounded-xl border flex flex-col sm:flex-row items-center gap-2 sm:gap-4 shadow-md ${question.imageVisual.color}`}>
            <span className="text-base sm:text-lg font-bold tracking-wide">
              {question.imageVisual.label}
            </span>
            {question.imageVisual.sublabel && (
              <span className="text-xs sm:text-sm px-2.5 py-0.5 rounded-full bg-slate-900/60 font-semibold border border-current/20">
                {question.imageVisual.sublabel}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Main Question Prompt */}
      <h2 className="text-base sm:text-xl font-bold text-white mb-6 leading-relaxed">
        {question.prompt}
      </h2>

      {/* Hint Alert (if active) */}
      {showHint && question.hint && (
        <div className="mb-5 p-3.5 rounded-xl bg-amber-900/30 border border-amber-500/40 text-amber-200 text-xs sm:text-sm flex items-start gap-2 animate-fadeIn">
          <HelpCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <strong className="font-bold text-amber-300">Dica do Chip:</strong> {question.hint}
          </div>
        </div>
      )}

      {/* Options Grid (4 Multiple Choice Options) */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => {
          const letter = optionLetters[idx];
          const isSelected = selectedOptionId === option.id;
          
          let btnStyle = 'bg-slate-700/50 hover:bg-slate-700 text-slate-100 border-slate-600 hover:border-cyan-400/50 hover:scale-[1.005]';
          let letterBadge = 'bg-slate-800 text-cyan-300 border-slate-600';

          if (hasAnswered) {
            if (option.isCorrect) {
              btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/40';
              letterBadge = 'bg-emerald-600 text-white border-emerald-400';
            } else if (isSelected && !option.isCorrect) {
              btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-100 ring-2 ring-rose-500/40';
              letterBadge = 'bg-rose-600 text-white border-rose-400';
            } else {
              btnStyle = 'bg-slate-800/40 border-slate-700/60 text-slate-400 opacity-60';
              letterBadge = 'bg-slate-800 text-slate-500 border-slate-700';
            }
          }

          return (
            <button
              key={option.id}
              id={`option-${option.id}`}
              type="button"
              disabled={hasAnswered}
              onClick={() => handleSelectOption(option)}
              className={`w-full min-h-[52px] p-3 sm:p-4 rounded-xl border text-left flex items-start gap-3 transition duration-150 cursor-pointer ${btnStyle} ${
                hasAnswered ? 'cursor-default' : ''
              }`}
              aria-label={`Opção ${letter}: ${option.text}`}
            >
              {/* Hotkey Letter / Number Badge */}
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 border shadow-sm transition ${letterBadge}`}>
                {letter}
              </div>

              {/* Option Text */}
              <div className="flex-1 text-sm sm:text-base font-medium pt-0.5 leading-snug">
                {option.text}
              </div>

              {/* Status Icon */}
              {hasAnswered && (
                <div className="shrink-0 mt-0.5">
                  {option.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 animate-bounce" />
                  ) : isSelected ? (
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback & Pedagogical Explanation Box (Shown immediately after answer) */}
      {hasAnswered && (
        <div className="mt-5 p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-cyan-500/30 shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2 mb-2 font-bold text-sm sm:text-base">
            {question.options.find(o => o.id === selectedOptionId)?.isCorrect ? (
              <span className="text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5" />
                Excelente! Resposta correta!
              </span>
            ) : (
              <span className="text-rose-400 flex items-center gap-1.5">
                <XCircle className="w-5 h-5" />
                Quase lá! Veja a explicação:
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            {question.explanation}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <span className="text-xs text-slate-400 hidden sm:inline">
              Pressione <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-cyan-400 font-mono">Enter</kbd> ou <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-cyan-400 font-mono">Espaço</kbd> para prosseguir
            </span>

            <button
              id="btn-next-question"
              type="button"
              onClick={handleNext}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition hover:scale-[1.02] cursor-pointer"
            >
              <span>{questionIndex + 1 === totalQuestions ? 'Concluir Fase!' : 'Próxima Pergunta'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Helper Keyboard navigation hint at bottom */}
      {!hasAnswered && (
        <div className="mt-3 text-center text-xs text-slate-400">
          Dica: Use as teclas <span className="text-cyan-300 font-mono font-bold">1, 2, 3, 4</span> ou <span className="text-cyan-300 font-mono font-bold">A, B, C, D</span> no teclado do computador.
        </div>
      )}

    </div>
  );
};
