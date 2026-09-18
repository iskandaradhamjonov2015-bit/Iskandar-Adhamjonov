import React, { useState } from 'react';
import { Lesson, UserProfile, Grade } from '../types';
import { speakText } from '../utils/speech';
import { calculateGradeAndXp } from '../utils/storage';
import {
  X,
  Volume2,
  CheckCircle,
  HelpCircle,
  Award,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Sparkles,
  Check,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LessonModalProps {
  lesson: Lesson;
  onClose: () => void;
  userProfile: UserProfile;
  onSaveProgress: (lessonId: number, subject: string, score: number, grade: Grade, earnedXp: number) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  lesson,
  onClose,
  userProfile,
  onSaveProgress,
}) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'vocab' | 'test'>('theory');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);

  const lessonKey = `${lesson.subject}_${lesson.id}`;
  const prevProgress = userProfile.completedLessons[lessonKey];

  const handlePlayAudio = async (text: string, lang: 'en' | 'ru', wordId?: string) => {
    if (wordId) setPlayingWordId(wordId);
    await speakText(text, lang);
    if (wordId) setPlayingWordId(null);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (testSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateTestResults = () => {
    let correctCount = 0;
    lesson.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const total = lesson.questions.length;
    const scorePercent = Math.round((correctCount / total) * 100);
    const { grade, xp } = calculateGradeAndXp(scorePercent);

    return { correctCount, total, scorePercent, grade, xp };
  };

  const handleSubmitTest = () => {
    const results = calculateTestResults();
    setTestSubmitted(true);

    if (results.scorePercent >= 80) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }

    onSaveProgress(lesson.id, lesson.subject, results.scorePercent, results.grade, results.xp);
  };

  const handleResetTest = () => {
    setSelectedAnswers({});
    setTestSubmitted(false);
  };

  const allAnswered = lesson.questions.length > 0 && lesson.questions.every((q) => selectedAnswers[q.id] !== undefined);
  const testResults = testSubmitted ? calculateTestResults() : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-linear-to-r from-slate-50 to-blue-50/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-blue-100 text-blue-800">
                {lesson.level}
              </span>
              <span className="text-xs text-slate-700 font-medium">#{lesson.id}-dars • {lesson.category}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">{lesson.title}</h2>
          </div>
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 gap-2 pt-2 text-xs sm:text-sm font-semibold">
          <button
            id="modal-tab-theory"
            onClick={() => setActiveTab('theory')}
            className={`pb-2.5 px-3 border-b-2 transition-all ${
              activeTab === 'theory'
                ? 'border-blue-600 text-blue-700 font-bold'
                : 'border-transparent text-slate-700 hover:text-slate-900'
            }`}
          >
            📖 Nazariya & Qoidalar
          </button>

          {(lesson.vocabulary && lesson.vocabulary.length > 0) || (lesson.mathFormulas && lesson.mathFormulas.length > 0) ? (
            <button
              id="modal-tab-vocab"
              onClick={() => setActiveTab('vocab')}
              className={`pb-2.5 px-3 border-b-2 transition-all ${
                activeTab === 'vocab'
                  ? 'border-blue-600 text-blue-700 font-bold'
                  : 'border-transparent text-slate-700 hover:text-slate-900'
              }`}
            >
              {lesson.subject === 'math' ? '📐 Formulalar & Yechimlar' : '🗣️ Lug\'at & Talaffuz'}
            </button>
          ) : null}

          <button
            id="modal-tab-test"
            onClick={() => setActiveTab('test')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'test'
                ? 'border-blue-600 text-blue-700 font-bold'
                : 'border-transparent text-slate-700 hover:text-slate-900'
            }`}
          >
            <span>📝 Amaliy Test</span>
            {prevProgress && (
              <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] rounded-full">
                Baho: {prevProgress.grade}
              </span>
            )}
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-slate-800 space-y-6">
          {/* TAB 1: THEORY */}
          {activeTab === 'theory' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-sm text-blue-950 leading-relaxed">
                <div className="font-semibold text-blue-900 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Darsning qisqacha mazmuni:</span>
                </div>
                {lesson.summary}
              </div>

              {/* Theory text */}
              <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed bg-white p-4 rounded-xl border border-slate-100 shadow-2xs">
                {lesson.theory.split('\n').map((line, idx) => {
                  const trimmed = line.trim();
                  if (trimmed.startsWith('###')) {
                    return <h3 key={idx} className="text-base sm:text-lg font-bold text-slate-900 mt-4 mb-2">{trimmed.replace('###', '')}</h3>;
                  }
                  if (trimmed.startsWith('*')) {
                    return <li key={idx} className="ml-4 list-disc text-slate-700 mb-1">{trimmed.replace('*', '').trim()}</li>;
                  }
                  if (trimmed) {
                    return <p key={idx} className="text-slate-700 mb-2">{trimmed}</p>;
                  }
                  return null;
                })}
              </div>

              {/* Grammar Rules Section */}
              {lesson.grammarRules && lesson.grammarRules.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>Grammatik Qoidalar va Formulalar:</span>
                  </h4>
                  {lesson.grammarRules.map((rule, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="font-semibold text-slate-900 text-sm">{rule.rule}</div>
                      {rule.formula && (
                        <div className="p-2.5 bg-slate-900 text-amber-300 rounded-lg font-mono text-xs sm:text-sm tracking-wide">
                          {rule.formula}
                        </div>
                      )}
                      <div className="space-y-2 pt-1">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Namunaviy gaplar:</span>
                        {rule.examples.map((ex, exIdx) => (
                          <div key={exIdx} className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm">
                            <div>
                              <div className="font-semibold text-slate-900">{ex.original}</div>
                              <div className="text-slate-700 text-xs">{ex.translation}</div>
                              {ex.pronunciation && (
                                <div className="text-[11px] text-blue-700 font-medium">Talaffuzi: [{ex.pronunciation}]</div>
                              )}
                            </div>
                            <button
                              onClick={() => handlePlayAudio(ex.original, lesson.subject === 'russian' ? 'ru' : 'en')}
                              className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors shrink-0 ml-2"
                              title="Tinglash"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Math Formulas Section */}
              {lesson.mathFormulas && lesson.mathFormulas.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 text-base">📐 Formulalar va Namunaviy Yechimlar:</h4>
                  {lesson.mathFormulas.map((mf, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-3">
                      <div className="font-bold text-emerald-950">{mf.name}</div>
                      <div className="p-2.5 bg-slate-900 text-emerald-300 rounded-lg font-mono text-sm font-bold">
                        {mf.formula}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700">{mf.description}</p>
                      
                      <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                        <div className="font-semibold text-xs text-slate-700">Namunaviy masala:</div>
                        <div className="text-sm font-medium text-slate-900">{mf.sampleProblem}</div>
                        <div className="space-y-1 pt-1 border-t border-slate-100 text-xs text-slate-700">
                          {mf.stepByStepSolution.map((step, sIdx) => (
                            <div key={sIdx} className="font-mono text-slate-800">{step}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VOCABULARY & PRONUNCIATION */}
          {activeTab === 'vocab' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-xs text-slate-700">
                <span>Darsdagi yangi so'zlar va talaffuz namunasi (Tinglash uchun ovoz tugmasini bosing):</span>
              </div>

              {lesson.vocabulary && lesson.vocabulary.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lesson.vocabulary.map((v) => (
                    <div
                      key={v.id}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-base">{v.word}</span>
                          <button
                            onClick={() => handlePlayAudio(v.word, v.audioLang, v.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              playingWordId === v.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                            }`}
                            title="Talaffuzni eshitish"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-xs">
                          <span className="text-slate-700 font-mono">{v.transcription}</span>
                          <span className="text-blue-700 font-medium">({v.uzbekPronunciation})</span>
                        </div>
                        <div className="mt-2 text-sm font-semibold text-emerald-800">
                          {v.translationUz}
                        </div>
                      </div>

                      {v.exampleSentence && (
                        <div className="mt-3 pt-2 border-t border-slate-100 text-xs">
                          <div className="text-slate-700 italic">"{v.exampleSentence}"</div>
                          <div className="text-slate-700 mt-0.5">{v.exampleTranslation}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-slate-700">
                  Ushbu dars uchun formulalar nazariya bo'limida keltirilgan.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TEST & SCORING */}
          {activeTab === 'test' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Test Results Summary Banner */}
              {testSubmitted && testResults && (
                <div
                  className={`p-5 rounded-2xl border text-center space-y-3 ${
                    testResults.scorePercent >= 80
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : testResults.scorePercent >= 60
                      ? 'bg-blue-50 border-blue-200 text-blue-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Award className="w-6 h-6 text-amber-500" />
                    <h3 className="text-xl font-bold">
                      {testResults.scorePercent === 100
                        ? "A'lo natija! 100% To'liq to'g'ri!"
                        : testResults.scorePercent >= 80
                        ? 'Yaxshi natija!'
                        : testResults.scorePercent >= 60
                        ? 'Qoniqarli natija'
                        : 'Yana mashq qilish tavsiya etiladi'}
                    </h3>
                  </div>

                  <div className="flex items-center justify-center gap-6 text-sm sm:text-base">
                    <div>
                      <div className="text-xs text-slate-700 uppercase font-semibold">Qo'yilgan Baho</div>
                      <div className="text-2xl font-black text-slate-900">
                        {testResults.grade === 5 ? '5 (A\'lo)' : testResults.grade === 4 ? '4 (Yaxshi)' : testResults.grade === 3 ? '3 (Qoniqarli)' : '2 (Qoniqarsiz)'}
                      </div>
                    </div>
                    <div className="h-8 w-px bg-slate-300"></div>
                    <div>
                      <div className="text-xs text-slate-700 uppercase font-semibold">To'plangan XP</div>
                      <div className="text-2xl font-black text-blue-700">+{testResults.xp} XP</div>
                    </div>
                    <div className="h-8 w-px bg-slate-300"></div>
                    <div>
                      <div className="text-xs text-slate-700 uppercase font-semibold">To'g'ri javoblar</div>
                      <div className="text-2xl font-black text-slate-900">
                        {testResults.correctCount} / {testResults.total} ({testResults.scorePercent}%)
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 pt-1">
                    *100% natijaga 3 XP va 5 baho, 80%+ ga 4 baho va 2.5 XP beriladi.
                  </p>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-5">
                {lesson.questions.map((q, qIndex) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isCorrect = selectedAnswers[q.id] === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border transition-all ${
                        testSubmitted
                          ? isCorrect
                            ? 'bg-emerald-50/40 border-emerald-300'
                            : 'bg-rose-50/40 border-rose-300'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="font-semibold text-slate-900 text-sm sm:text-base mb-3 flex items-start gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-xs text-slate-700 font-bold shrink-0 mt-0.5">
                          {qIndex + 1}
                        </span>
                        <span>{q.question}</span>
                      </div>

                      <div className="space-y-2">
                        {q.options.map((opt, optIndex) => {
                          const isSelected = selectedAnswers[q.id] === optIndex;
                          let btnStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700';

                          if (testSubmitted) {
                            if (optIndex === q.correctAnswer) {
                              btnStyle = 'border-emerald-500 bg-emerald-100/70 text-emerald-900 font-bold';
                            } else if (isSelected && !isCorrect) {
                              btnStyle = 'border-rose-500 bg-rose-100 text-rose-900 line-through';
                            } else {
                              btnStyle = 'border-slate-200 text-slate-700 opacity-60';
                            }
                          } else if (isSelected) {
                            btnStyle = 'border-blue-600 bg-blue-50 text-blue-900 font-semibold ring-1 ring-blue-500';
                          }

                          return (
                            <button
                              key={optIndex}
                              disabled={testSubmitted}
                              onClick={() => handleSelectOption(q.id, optIndex)}
                              className={`w-full p-3 rounded-lg border text-left text-xs sm:text-sm flex items-center justify-between transition-colors ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {testSubmitted && optIndex === q.correctAnswer && (
                                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {testSubmitted && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200 text-xs text-slate-700 flex items-start gap-1.5">
                          <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                          <span>
                            <strong>Izoh:</strong> {q.explanation}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer with action buttons */}
        <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          {activeTab !== 'test' ? (
            <>
              <div className="text-xs text-slate-700">Nazariyani o'rgangach, testni topshiring.</div>
              <button
                id="modal-next-test-btn"
                onClick={() => setActiveTab('test')}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Testga o'tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              {!testSubmitted ? (
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs text-slate-700">
                    Javob berildi: {Object.keys(selectedAnswers).length} / {lesson.questions.length}
                  </span>
                  <button
                    id="modal-submit-test-btn"
                    disabled={!allAnswered}
                    onClick={handleSubmitTest}
                    className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
                      allAnswered
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md'
                        : 'bg-slate-200 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    Testni Yakunlash & Baho Olish
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <button
                    onClick={handleResetTest}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Qayta topshirish</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-800 transition-colors"
                  >
                    Yopish & Davom etish
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
