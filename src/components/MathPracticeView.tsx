import React, { useState } from 'react';
import { solveMathProblem } from '../utils/mathSolver';
import { MathSolverResult } from '../types';
import {
  Calculator,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Shuffle,
  BookOpen,
  ArrowRight,
  Zap,
} from 'lucide-react';

const PRESET_PROBLEMS = [
  { label: 'Kvadrat tenglama: x² - 5x + 6 = 0', query: 'x^2 - 5x + 6 = 0' },
  { label: 'Kvadrat tenglama: 2x² - 4x - 6 = 0', query: '2x^2 - 4x - 6 = 0' },
  { label: 'Chiziqli tenglama: 3x + 12 = 27', query: '3x + 12 = 27' },
  { label: 'Kasrlarni qo\'shish: 2/5 + 1/10', query: '2/5 + 1/10' },
  { label: 'Foiz hisoblash: 15% of 240', query: '15% of 240' },
  { label: 'Trigonometriya: sin(30)', query: 'sin(30)' },
  { label: 'Trigonometriya: cos(60)', query: 'cos(60)' },
  { label: 'Arifmetik ifoda: 12 * (5 + 3)^2 - 50', query: '12 * (5 + 3)^2 - 50' },
];

const FORMULA_CHEATSHEET = [
  {
    title: 'Kvadrat tenglama',
    formula: 'ax² + bx + c = 0',
    details: 'D = b² - 4ac;  x₁,₂ = (-b ± √D) / (2a)',
  },
  {
    title: 'Pifagor teoremasi',
    formula: 'c² = a² + b²',
    details: 'To\'g\'ri burchakli uchburchakda gipotenuza kvadrati katetlar kvadratlari yig\'indisiga teng.',
  },
  {
    title: 'Qisqa ko\'paytirish',
    formula: '(a ± b)² = a² ± 2ab + b²',
    details: 'a² - b² = (a - b)(a + b);  (a ± b)³ = a³ ± 3a²b + 3ab² ± b³',
  },
  {
    title: 'Doira yuzasi va uzunligi',
    formula: 'S = πR²  |  L = 2πR',
    details: 'R - doira radiusi, π ≈ 3.14159',
  },
  {
    title: 'Arifmetik progressiya',
    formula: 'aₙ = a₁ + (n - 1)d',
    details: 'Sₙ = (a₁ + aₙ) · n / 2',
  },
  {
    title: 'Asosiy trigonometriya',
    formula: 'sin²α + cos²α = 1',
    details: 'tgα = sinα / cosα;  ctgα = cosα / sinα',
  },
];

export const MathPracticeView: React.FC = () => {
  const [inputQuery, setInputQuery] = useState('x^2 - 5x + 6 = 0');
  const [solution, setSolution] = useState<MathSolverResult | null>(() => solveMathProblem('x^2 - 5x + 6 = 0'));

  const handleSolve = (queryToSolve?: string) => {
    const q = queryToSolve || inputQuery;
    if (!q.trim()) return;
    const res = solveMathProblem(q);
    setSolution(res);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-emerald-800 via-teal-800 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-3 border border-emerald-400/30">
            <Zap className="w-3.5 h-3.5" />
            <span>Interaktiv Misollar Yechish & Matematik Qoidalar</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Matematika Masalalarini Bosqichma-Bosqich Yechish
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Tenglamalar, kasrlar, foizlar, trigonometriya yoki arifmetik ifodalarni kiriting — tizim har bir qadamni formulalari bilan tushuntirib beradi.
          </p>
        </div>
      </div>

      {/* Solver Input Card */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="math-problem-input" className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Matematik misol yoki tenglamani kiriting:</span>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="math-problem-input"
            type="text"
            placeholder="Masalan: x^2 - 5x + 6 = 0, 3x + 12 = 27, 2/5 + 1/10, sin(30), 20% of 150..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSolve();
            }}
            className="flex-1 px-4 py-3 text-base sm:text-lg font-mono rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-slate-50/50"
          />
          <button
            id="math-solve-btn"
            onClick={() => handleSolve()}
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center gap-2 text-sm sm:text-base shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Yechimni Ko'rish</span>
          </button>
        </div>

        {/* Preset Quick Buttons */}
        <div className="space-y-1.5 pt-2">
          <div className="text-xs font-semibold text-slate-700">Tayyor namunaviy misollarni sinab ko'ring:</div>
          <div className="flex flex-wrap gap-2">
            {PRESET_PROBLEMS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputQuery(p.query);
                  handleSolve(p.query);
                }}
                className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-medium hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Solution Display Area */}
      {solution && (
        <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-md space-y-5 animate-in fade-in zoom-in-98 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800">
                {solution.problemType}
              </span>
              <h3 className="text-xl font-mono font-bold text-slate-900 mt-1">
                {solution.expression}
              </h3>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs text-slate-700 font-semibold uppercase">Yakuniy Javob</div>
              <div className="text-2xl font-black text-emerald-800 font-mono">
                {solution.result}
              </div>
            </div>
          </div>

          {/* Formula Used */}
          {solution.formulaUsed && (
            <div className="p-3 bg-slate-900 text-amber-300 rounded-xl font-mono text-xs sm:text-sm">
              <span className="text-slate-400 mr-2">Qo'llanilgan formula:</span>
              <strong className="text-white">{solution.formulaUsed}</strong>
            </div>
          )}

          {/* Step by step */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Bosqichma-bosqich yechilishi:</span>
            </h4>
            <div className="space-y-2">
              {solution.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 leading-relaxed"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mathematics Essential Formulas Cheatsheet */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>Matematik Qoidalar & Asosiy Formulalar Banki</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FORMULA_CHEATSHEET.map((f, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all space-y-2"
            >
              <h4 className="font-bold text-slate-900 text-base">{f.title}</h4>
              <div className="p-2.5 bg-slate-900 text-emerald-300 font-mono text-xs sm:text-sm font-bold rounded-xl">
                {f.formula}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{f.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
