import React, { useState, useEffect, useCallback } from 'react';
import { UserProgress, Phase } from './types';
import { PHASES_DATA } from './data/phasesData';
import { loadProgress, saveProgress, resetProgress } from './utils/storage';
import { soundManager } from './utils/audio';
import { Header } from './components/Header';
import { QuestionCard } from './components/QuestionCard';
import { VirtualComputerLab } from './components/VirtualComputerLab';
import { VictoryScreen } from './components/VictoryScreen';
import { PhaseMap } from './components/PhaseMap';
import { GlossaryModal } from './components/GlossaryModal';
import { BadgesModal } from './components/BadgesModal';
import { IntroModal } from './components/IntroModal';
import { ConfirmResetModal } from './components/ConfirmResetModal';
import { Star, ArrowRight, Award, CheckCircle2, Sparkles, BookOpen, Layers, Cpu, Calculator, Activity } from 'lucide-react';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [phaseCorrectCount, setPhaseCorrectCount] = useState<number>(0);
  const [phase6Step, setPhase6Step] = useState<{ current: number; total: number }>({ current: 1, total: 4 });
  
  // Modals
  const [showIntroModal, setShowIntroModal] = useState<boolean>(() => {
    // Show intro on first visit if no completed phases
    const p = loadProgress();
    return p.completedPhases.length === 0 && p.totalScore === 0;
  });
  const [showMapModal, setShowMapModal] = useState<boolean>(false);
  const [showGlossaryModal, setShowGlossaryModal] = useState<boolean>(false);
  const [showBadgesModal, setShowBadgesModal] = useState<boolean>(false);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [phaseCelebration, setPhaseCelebration] = useState<{
    phaseId: number;
    phaseTitle: string;
    stars: number;
    scoreAdded: number;
  } | null>(null);

  // Sync sound manager settings with state
  useEffect(() => {
    soundManager.setEnabled(progress.soundEnabled);
  }, [progress.soundEnabled]);

  // Save progress whenever it updates
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const currentPhase: Phase = PHASES_DATA.find(p => p.id === progress.currentPhaseId) || PHASES_DATA[0];
  const isAllPhasesCompleted = progress.completedPhases.length >= PHASES_DATA.length;

  const handleToggleSound = () => {
    setProgress(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  };

  const handleToggleSpeech = () => {
    setProgress(prev => ({
      ...prev,
      speechEnabled: !prev.speechEnabled
    }));
  };

  const handleResetGame = () => {
    const fresh = resetProgress();
    setProgress(fresh);
    setCurrentQuestionIndex(0);
    setPhaseCorrectCount(0);
    setPhaseCelebration(null);
    setShowIntroModal(true);
  };

  const handleSelectPhase = (phaseId: number) => {
    setProgress(prev => ({
      ...prev,
      currentPhaseId: phaseId
    }));
    setCurrentQuestionIndex(0);
    setPhaseCorrectCount(0);
    setPhaseCelebration(null);
  };

  // Called when a question option is chosen
  const handleAnswerSelected = (isCorrect: boolean) => {
    if (isCorrect) {
      setPhaseCorrectCount(prev => prev + 1);
    }
  };

  // Called when proceeding to next question or completing phase
  const handleNextQuestion = () => {
    const totalQuestionsInPhase = currentPhase.questions.length;

    if (currentQuestionIndex + 1 < totalQuestionsInPhase) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Phase finished!
      completeCurrentPhase(phaseCorrectCount, totalQuestionsInPhase);
    }
  };

  // Complete phase logic
  const completeCurrentPhase = (correct: number, total: number) => {
    const ratio = total > 0 ? correct / total : 1;
    let stars = 1;
    if (ratio >= 0.75) stars = 3;
    else if (ratio >= 0.5) stars = 2;

    const phaseScore = correct * 30 + 50; // 30 per correct + 50 bonus for completing

    // Unlock badges based on phase completed
    const newBadges = [...progress.unlockedBadges];
    if (progress.currentPhaseId === 1 && !newBadges.includes('first_step')) {
      newBadges.push('first_step');
    }
    if (progress.currentPhaseId === 2 && !newBadges.includes('hardware_master')) {
      newBadges.push('hardware_master');
    }
    if (progress.currentPhaseId === 3 && !newBadges.includes('so_conductor')) {
      newBadges.push('so_conductor');
    }
    if (progress.currentPhaseId === 4 && !newBadges.includes('curious_reader')) {
      newBadges.push('curious_reader');
    }
    if (progress.currentPhaseId === 5 && !newBadges.includes('math_genius')) {
      newBadges.push('math_genius');
    }
    if ((progress.currentPhaseId === 6 || progress.currentPhaseId === 7) && !newBadges.includes('tech_hero')) {
      newBadges.push('tech_hero');
    }

    const updatedCompletedPhases = Array.from(new Set([...progress.completedPhases, progress.currentPhaseId]));
    const updatedPhaseStars = {
      ...progress.phaseStars,
      [progress.currentPhaseId]: Math.max(progress.phaseStars[progress.currentPhaseId] || 0, stars)
    };
    const updatedPhaseScores = {
      ...progress.phaseScores,
      [progress.currentPhaseId]: Math.max(progress.phaseScores[progress.currentPhaseId] || 0, phaseScore)
    };

    const newTotalScore = Object.values(updatedPhaseScores).reduce((a, b) => a + b, 0);

    setProgress(prev => ({
      ...prev,
      completedPhases: updatedCompletedPhases,
      phaseStars: updatedPhaseStars,
      phaseScores: updatedPhaseScores,
      totalScore: newTotalScore,
      unlockedBadges: newBadges
    }));

    if (progress.currentPhaseId === 7) {
      soundManager.playGrandVictory();
    } else {
      soundManager.playPhaseComplete();
    }

    // Show celebration card
    setPhaseCelebration({
      phaseId: progress.currentPhaseId,
      phaseTitle: currentPhase.title,
      stars,
      scoreAdded: phaseScore
    });
  };

  // Advance to next phase after celebration
  const handleProceedAfterCelebration = () => {
    soundManager.playClick();
    const nextPhaseId = progress.currentPhaseId + 1;
    if (nextPhaseId <= PHASES_DATA.length) {
      setProgress(prev => ({
        ...prev,
        currentPhaseId: nextPhaseId
      }));
      setCurrentQuestionIndex(0);
      setPhaseCorrectCount(0);
      setPhaseCelebration(null);
    } else {
      // Completed all 7 phases! Transition to Grand Victory Screen
      setProgress(prev => ({
        ...prev,
        currentPhaseId: PHASES_DATA.length + 1
      }));
      setPhaseCelebration(null);
    }
  };

  // Special handler for Phase 6 Lab
  const handleCompletePhase6Lab = (scoreToAdd: number, stars: number) => {
    const newBadges = [...progress.unlockedBadges];
    if (!newBadges.includes('tech_hero')) {
      newBadges.push('tech_hero');
    }

    const updatedCompletedPhases = Array.from(new Set([...progress.completedPhases, 6]));
    const updatedPhaseStars = {
      ...progress.phaseStars,
      [6]: Math.max(progress.phaseStars[6] || 0, stars)
    };
    const updatedPhaseScores = {
      ...progress.phaseScores,
      [6]: Math.max(progress.phaseScores[6] || 0, scoreToAdd)
    };
    const newTotalScore = Object.values(updatedPhaseScores).reduce((a, b) => a + b, 0);

    setProgress(prev => ({
      ...prev,
      completedPhases: updatedCompletedPhases,
      phaseStars: updatedPhaseStars,
      phaseScores: updatedPhaseScores,
      totalScore: newTotalScore,
      unlockedBadges: newBadges
    }));

    soundManager.playPhaseComplete();

    setPhaseCelebration({
      phaseId: 6,
      phaseTitle: 'Fase 6: Conserte o Computador',
      stars,
      scoreAdded: scoreToAdd
    });
  };

  // Calculate current progress percentages
  const currentQuestion = currentPhase.questions[currentQuestionIndex];
  const phaseProgressPercent = currentPhase.id === 6 
    ? (phase6Step.current / phase6Step.total) * 100
    : currentPhase.questions.length > 0 
    ? ((currentQuestionIndex + 1) / currentPhase.questions.length) * 100
    : 100;
  const progressSubtitle = currentPhase.id === 6
    ? `Desafio ${phase6Step.current} de ${phase6Step.total}`
    : `Questão ${currentQuestionIndex + 1} de ${currentPhase.questions.length}`;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* App Header */}
      <Header
        currentPhaseId={progress.currentPhaseId}
        totalPhases={PHASES_DATA.length}
        phaseTitle={currentPhase.shortTitle}
        score={progress.totalScore}
        soundEnabled={progress.soundEnabled}
        onToggleSound={handleToggleSound}
        speechEnabled={progress.speechEnabled}
        onToggleSpeech={handleToggleSpeech}
        onOpenMap={() => setShowMapModal(true)}
        onOpenGlossary={() => setShowGlossaryModal(true)}
        onOpenBadges={() => setShowBadgesModal(true)}
        onResetGame={() => setShowResetModal(true)}
        isAllPhasesCompleted={isAllPhasesCompleted}
        onOpenCertificate={() => {
          setProgress(prev => ({ ...prev, currentPhaseId: PHASES_DATA.length + 1 }));
          setPhaseCelebration(null);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-6 flex flex-col justify-start">
        
        {/* Phase celebration modal / card */}
        {phaseCelebration && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
            <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg shadow-emerald-500/20">
                🎉
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Missão Cumprida com Sucesso!
              </span>

              <h2 className="text-xl sm:text-2xl font-black text-white mt-1 mb-2">
                {phaseCelebration.phaseTitle}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                Você restaurou mais uma parte essencial dos computadores da escola!
              </p>

              {/* Stars Earned */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2, 3].map(s => (
                  <Star
                    key={s}
                    className={`w-9 h-9 sm:w-10 sm:h-10 transition-all ${
                      s <= phaseCelebration.stars
                        ? 'text-amber-400 fill-amber-400 animate-bounce'
                        : 'text-slate-700'
                    }`}
                    style={{ animationDelay: `${s * 0.15}s` }}
                  />
                ))}
              </div>

              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5 mb-6 text-sm font-bold text-amber-300">
                +{phaseCelebration.scoreAdded} Pontos Conquistados!
              </div>

              <button
                id="btn-continue-after-celebration"
                onClick={handleProceedAfterCelebration}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition hover:scale-[1.01] cursor-pointer"
              >
                <span>{phaseCelebration.phaseId === 7 ? 'Ver Resultado Final!' : 'Avançar para a Próxima Fase!'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* If game is finished (all 7 phases done and player viewing final victory) */}
        {isAllPhasesCompleted && !phaseCelebration && progress.currentPhaseId > PHASES_DATA.length ? (
          <VictoryScreen
            score={progress.totalScore}
            totalPossibleScore={1450}
            phaseStars={progress.phaseStars}
            unlockedBadges={progress.unlockedBadges}
            onRestart={() => setShowResetModal(true)}
            onOpenMap={() => setShowMapModal(true)}
            onOpenGlossary={() => setShowGlossaryModal(true)}
          />
        ) : (
          <div className="space-y-4 sm:space-y-6">
            
            {/* Top Phase Header & Double Progress Bar */}
            <div className="bg-slate-800/60 border border-slate-700/70 rounded-2xl p-3.5 sm:p-5 backdrop-blur">
              
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-xs">
                    {currentPhase.id}
                  </span>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-white">
                      {currentPhase.title}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-slate-400">
                      {currentPhase.bnccFocus}
                    </p>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    {progressSubtitle}
                  </span>
                  <span className="hidden sm:inline">|</span>
                  <span className="hidden sm:inline">
                    Concluídas: <strong className="text-cyan-300">{progress.completedPhases.length}/{PHASES_DATA.length}</strong> Fases
                  </span>
                </div>
              </div>

              {/* Progress bars */}
              <div className="space-y-2">
                {/* Phase progress */}
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${phaseProgressPercent}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Render Current Phase Component */}
            {currentPhase.id === 6 ? (
              // Dedicated Virtual Computer Diagnostic Lab
              <VirtualComputerLab
                onCompletePhase={handleCompletePhase6Lab}
                speechEnabled={progress.speechEnabled}
                onStepChange={(curr, tot) => setPhase6Step({ current: curr, total: tot })}
              />
            ) : currentQuestion ? (
              // Standard Multiple Choice Question Card
              <QuestionCard
                key={currentQuestion.id}
                question={currentQuestion}
                questionIndex={currentQuestionIndex}
                totalQuestions={currentPhase.questions.length}
                onAnswerSelected={handleAnswerSelected}
                onNextQuestion={handleNextQuestion}
                speechEnabled={progress.speechEnabled}
              />
            ) : null}

          </div>
        )}

      </main>

      {/* Persistent Bottom Bar with Helpful Quick Navigation */}
      <footer className="w-full bg-slate-950/80 border-t border-slate-800/80 py-2.5 px-4 text-center text-xs text-slate-400">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">BNCC EF05CO07:</span>
            <span>O Sistema Operacional é essencial para executar programas e gerenciar o hardware.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowGlossaryModal(true)}
              className="text-slate-400 hover:text-emerald-400 transition cursor-pointer underline underline-offset-2"
            >
              Dicionário
            </button>
            <span>•</span>
            <button
              onClick={() => setShowBadgesModal(true)}
              className="text-slate-400 hover:text-amber-400 transition cursor-pointer underline underline-offset-2"
            >
              Medalhas ({progress.unlockedBadges.length})
            </button>
            <span>•</span>
            <button
              onClick={() => setShowIntroModal(true)}
              className="text-slate-400 hover:text-cyan-400 transition cursor-pointer underline underline-offset-2"
            >
              Ver História
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showIntroModal && (
        <IntroModal onStartGame={() => setShowIntroModal(false)} />
      )}

      {showMapModal && (
        <PhaseMap
          currentPhaseId={progress.currentPhaseId}
          completedPhases={progress.completedPhases}
          phaseStars={progress.phaseStars}
          phaseScores={progress.phaseScores}
          onSelectPhase={handleSelectPhase}
          onClose={() => setShowMapModal(false)}
        />
      )}

      {showGlossaryModal && (
        <GlossaryModal onClose={() => setShowGlossaryModal(false)} />
      )}

      {showBadgesModal && (
        <BadgesModal
          unlockedBadges={progress.unlockedBadges}
          onClose={() => setShowBadgesModal(false)}
        />
      )}

      {showResetModal && (
        <ConfirmResetModal
          isOpen={showResetModal}
          onConfirm={() => {
            handleResetGame();
            setShowResetModal(false);
          }}
          onCancel={() => setShowResetModal(false)}
        />
      )}

    </div>
  );
}
