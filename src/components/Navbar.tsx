import React from 'react';
import { SubjectId, UserProfile } from '../types';
import { BookOpen, Flame, Trophy, User, Bell, Sparkles, CheckCircle2 } from 'lucide-react';
import { getRankLeague } from '../utils/storage';

interface NavbarProps {
  activeSubject: SubjectId;
  onSelectSubject: (s: SubjectId) => void;
  activeTab: 'lessons' | 'dictionary' | 'math_solver' | 'leaderboard' | 'profile' | 'progress';
  onSelectTab: (tab: 'lessons' | 'dictionary' | 'math_solver' | 'leaderboard' | 'profile' | 'progress') => void;
  userProfile: UserProfile;
  onOpenReminders: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSubject,
  onSelectSubject,
  activeTab,
  onSelectTab,
  userProfile,
  onOpenReminders,
}) => {
  const league = getRankLeague(userProfile.totalXp);
  const avatarSrc = userProfile.customAvatarData || userProfile.avatarUrl;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <button
              id="brand-logo-btn"
              onClick={() => onSelectTab('lessons')}
              className="flex items-center gap-2 text-left group focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 via-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                  <span>IlmHub</span>
                  <span className="text-xs px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-700 font-semibold">3-in-1</span>
                </div>
                <div className="text-xs text-slate-700 font-medium">Ingliz • Rus • Matematika</div>
              </div>
            </button>

            {/* Subject Selector Tabs */}
            <nav className="flex items-center bg-slate-100 p-1 rounded-xl ml-2 sm:ml-4 border border-slate-200/80">
              <button
                id="subject-tab-english"
                onClick={() => {
                  onSelectSubject('english');
                  if (activeTab === 'math_solver') onSelectTab('lessons');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeSubject === 'english'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span className="text-base">🇬🇧</span>
                <span className="hidden md:inline">Ingliz tili</span>
                <span className="md:hidden">EN</span>
              </button>

              <button
                id="subject-tab-russian"
                onClick={() => {
                  onSelectSubject('russian');
                  if (activeTab === 'math_solver') onSelectTab('lessons');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeSubject === 'russian'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span className="text-base">🇷🇺</span>
                <span className="hidden md:inline">Rus tili</span>
                <span className="md:hidden">RU</span>
              </button>

              <button
                id="subject-tab-math"
                onClick={() => {
                  onSelectSubject('math');
                  if (activeTab === 'dictionary') onSelectTab('lessons');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeSubject === 'math'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span className="text-base">📐</span>
                <span className="hidden md:inline">Matematika</span>
                <span className="md:hidden">MATH</span>
              </button>
            </nav>
          </div>

          {/* Quick Nav Tools & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak Counter */}
            <div
              className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs sm:text-sm font-bold shadow-2xs"
              title="Kunlik o'rganish ketma-ketligi"
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{userProfile.streakDays} kun</span>
            </div>

            {/* Total XP & League */}
            <button
              id="xp-badge-btn"
              onClick={() => onSelectTab('leaderboard')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl text-blue-900 text-xs sm:text-sm font-bold shadow-2xs hover:border-blue-300 transition-colors"
              title="XP va Reyting"
            >
              <Trophy className="w-4 h-4 text-blue-600" />
              <span>{userProfile.totalXp} XP</span>
            </button>

            {/* Reminder Bell */}
            <button
              id="reminder-bell-btn"
              onClick={onOpenReminders}
              className="p-2 rounded-xl text-slate-700 hover:text-blue-700 hover:bg-slate-100 border border-slate-200 relative transition-colors"
              title="Kunlik eslatmalar"
            >
              <Bell className="w-4 h-4" />
              {userProfile.dailyReminderEnabled && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
              )}
            </button>

            {/* Profile Avatar Button */}
            <button
              id="profile-avatar-btn"
              onClick={() => onSelectTab('profile')}
              className={`flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-xl border transition-all ${
                activeTab === 'profile'
                  ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <img
                src={avatarSrc}
                alt={userProfile.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-300"
              />
              <span className="hidden md:inline text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                {userProfile.name.split(' ')[0]}
              </span>
            </button>
          </div>
        </div>

        {/* Secondary Sub-navigation Bar */}
        <div className="flex items-center justify-between border-t border-slate-100 py-2 overflow-x-auto text-xs sm:text-sm">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              id="subnav-lessons-btn"
              onClick={() => onSelectTab('lessons')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                activeTab === 'lessons'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              📚 120 Darslik Dastur
            </button>

            {activeSubject !== 'math' ? (
              <button
                id="subnav-dict-btn"
                onClick={() => onSelectTab('dictionary')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  activeTab === 'dictionary'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                📖 290k Lug'at & Talaffuz
              </button>
            ) : (
              <button
                id="subnav-mathsolver-btn"
                onClick={() => onSelectTab('math_solver')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  activeTab === 'math_solver'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                ⚡ Misollar Yechish & Kalkulyator
              </button>
            )}

            <button
              id="subnav-progress-btn"
              onClick={() => onSelectTab('progress')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                activeTab === 'progress'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              📊 Progress & Statistika
            </button>

            <button
              id="subnav-leaderboard-btn"
              onClick={() => onSelectTab('leaderboard')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                activeTab === 'leaderboard'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              🏆 Leaderboard & XP
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-700">
            <span className="font-semibold text-slate-700">Liga:</span>
            <span className="font-bold text-indigo-700">{league.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
