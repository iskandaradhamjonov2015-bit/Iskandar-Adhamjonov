import React from 'react';
import { UserProfile, SubjectId, Lesson } from '../types';
import {
  TrendingUp,
  CheckCircle2,
  BookOpen,
  Award,
  Star,
  Flame,
  PieChart,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

interface ProgressDashboardProps {
  userProfile: UserProfile;
  englishLessons: Lesson[];
  russianLessons: Lesson[];
  mathLessons: Lesson[];
  onSelectSubject: (s: SubjectId) => void;
  onSelectTab: (tab: 'lessons' | 'dictionary' | 'math_solver' | 'leaderboard' | 'profile' | 'progress') => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  userProfile,
  englishLessons,
  russianLessons,
  mathLessons,
  onSelectSubject,
  onSelectTab,
}) => {
  const completedKeys = Object.keys(userProfile.completedLessons);
  const totalCompleted = completedKeys.length;
  const totalLessons = 360; // 120 + 120 + 120

  const enDone = completedKeys.filter((k) => k.startsWith('english_')).length;
  const ruDone = completedKeys.filter((k) => k.startsWith('russian_')).length;
  const mathDone = completedKeys.filter((k) => k.startsWith('math_')).length;

  const enPercent = Math.round((enDone / 120) * 100);
  const ruPercent = Math.round((ruDone / 120) * 100);
  const mathPercent = Math.round((mathDone / 120) * 100);
  const overallPercent = Math.round((totalCompleted / totalLessons) * 100);

  // Grade Counts
  let g5 = 0, g4 = 0, g3 = 0, g2 = 0;
  let totalScoreSum = 0;

  completedKeys.forEach((k) => {
    const item = userProfile.completedLessons[k];
    if (item.grade === 5) g5++;
    else if (item.grade === 4) g4++;
    else if (item.grade === 3) g3++;
    else if (item.grade === 2) g2++;
    totalScoreSum += item.score;
  });

  const avgScore = totalCompleted > 0 ? Math.round(totalScoreSum / totalCompleted) : 100;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-slate-900 via-indigo-950 to-blue-950 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-3 border border-blue-400/30">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Umumiy O'quv Analitikasi & Progress Tizimi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Barcha Fanlar Bo'yicha Progressingiz
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Ingliz tili, Rus tili va Matematika fanlaridagi 120 tadan (jami 360 ta) darslar o'zlashtirilishi, o'rtacha ballar va natijalar.
            </p>
          </div>

          {/* Overall percentage circle card */}
          <div className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xs flex items-center gap-4 shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex flex-col items-center justify-center font-black text-xl shadow-md">
              <span>{overallPercent}%</span>
              <span className="text-[9px] font-semibold text-blue-200">Jami</span>
            </div>
            <div>
              <div className="text-xs text-slate-300 font-medium">Bajarilgan darslar:</div>
              <div className="text-xl font-bold text-white">
                {totalCompleted} / {totalLessons}
              </div>
              <div className="text-xs text-emerald-400 font-semibold mt-0.5">
                O'rtacha natija: {avgScore}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Subject Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* English */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col justify-between space-y-4 hover:border-blue-300 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇬🇧</span>
                <h3 className="font-bold text-slate-900 text-base">Ingliz Tili</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                {enPercent}%
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-2">
              Lug'at, 290k so'zlar, zamonlar va grammatika darslari.
            </p>

            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Darslar soni:</span>
                <span className="text-blue-600 font-bold">{enDone} / 120</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${enPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onSelectSubject('english');
              onSelectTab('lessons');
            }}
            className="w-full py-2.5 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Darslarni Davom Ettirish</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Russian */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col justify-between space-y-4 hover:border-rose-300 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇷🇺</span>
                <h3 className="font-bold text-slate-900 text-base">Rus Tili</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                {ruPercent}%
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-2">
              Barcha 6 ta padyej, fe'llar tuslanishi va urg'ular.
            </p>

            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Darslar soni:</span>
                <span className="text-rose-600 font-bold">{ruDone} / 120</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                <div
                  className="bg-rose-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${ruPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onSelectSubject('russian');
              onSelectTab('lessons');
            }}
            className="w-full py-2.5 rounded-xl bg-rose-50 text-rose-700 font-bold text-xs hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Darslarni Davom Ettirish</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Math */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📐</span>
                <h3 className="font-bold text-slate-900 text-base">Matematika</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {mathPercent}%
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-2">
              Algebraik tenglamalar, trigonometriya va geometriya misollari.
            </p>

            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Darslar soni:</span>
                <span className="text-emerald-600 font-bold">{mathDone} / 120</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${mathPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onSelectSubject('math');
              onSelectTab('lessons');
            }}
            className="w-full py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Darslarni Davom Ettirish</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grade Performance Distribution Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Test Baholari va Natijalar Taqsimoti</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <div className="text-3xl font-black text-emerald-700">{g5}</div>
            <div className="text-xs font-bold text-emerald-900 mt-1">5 (A'lo) Baho</div>
            <div className="text-[11px] text-emerald-600">100% to'g'ri • +3 XP</div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center">
            <div className="text-3xl font-black text-blue-700">{g4}</div>
            <div className="text-xs font-bold text-blue-900 mt-1">4 (Yaxshi) Baho</div>
            <div className="text-[11px] text-blue-600">80%+ to'g'ri • +2.5 XP</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
            <div className="text-3xl font-black text-amber-700">{g3}</div>
            <div className="text-xs font-bold text-amber-900 mt-1">3 (Qoniqarli) Baho</div>
            <div className="text-[11px] text-amber-600">60%+ to'g'ri • +2 XP</div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center">
            <div className="text-3xl font-black text-rose-700">{g2}</div>
            <div className="text-xs font-bold text-rose-900 mt-1">2 (Qoniqarsiz) Baho</div>
            <div className="text-[11px] text-rose-600">&lt;60% • +1 XP</div>
          </div>
        </div>
      </div>
    </div>
  );
};
