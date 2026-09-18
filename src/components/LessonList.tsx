import React, { useState, useMemo } from 'react';
import { Lesson, SubjectId, UserProfile } from '../types';
import { Search, CheckCircle2, PlayCircle, Star, Filter, Sparkles, BookOpen, Layers } from 'lucide-react';

interface LessonListProps {
  lessons: Lesson[];
  subject: SubjectId;
  userProfile: UserProfile;
  onOpenLesson: (lesson: Lesson) => void;
}

export const LessonList: React.FC<LessonListProps> = ({
  lessons,
  subject,
  userProfile,
  onOpenLesson,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'uncompleted'>('all');

  const subjectConfig = {
    english: {
      name: 'Ingliz Tili (English Language)',
      badge: '120 Ta Dars • A1 dan C2 gacha',
      gradient: 'from-blue-600 to-indigo-700',
      flag: '🇬🇧',
      desc: 'Lug\'at zaxirasi, 290 000+ so\'zlar, grammatika, zamonlar va xalqaro IELTS darajalari.',
    },
    russian: {
      name: 'Rus Tili (Русский Язык)',
      badge: '120 Ta Dars • 6 Ta Padyej & Fe\'llar',
      gradient: 'from-rose-600 to-red-700',
      flag: '🇷🇺',
      desc: 'Barcha padyejlar, fe\'l tuslanishlari, harakat fe\'llari, urg\'ular va so\'zlashuv grammatikasi.',
    },
    math: {
      name: 'Matematika & Geometriya',
      badge: '120 Ta Dars • 5-11 Sinf & DTM',
      gradient: 'from-emerald-600 to-teal-700',
      flag: '📐',
      desc: 'Arifmetika, algebra, tenglamalar, trigonometriya, geometriya va amaliy misollar yechish.',
    },
  }[subject];

  // Calculate subject stats
  const completedCount = lessons.filter((l) => {
    const key = `${l.subject}_${l.id}`;
    return !!userProfile.completedLessons[key];
  }).length;

  const completionPercent = Math.round((completedCount / lessons.length) * 100);

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const key = `${lesson.subject}_${lesson.id}`;
      const isDone = !!userProfile.completedLessons[key];

      // Status filter
      if (statusFilter === 'completed' && !isDone) return false;
      if (statusFilter === 'uncompleted' && isDone) return false;

      // Level filter
      if (selectedLevel !== 'all') {
        if (!lesson.level.toLowerCase().includes(selectedLevel.toLowerCase())) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = lesson.title.toLowerCase().includes(q);
        const matchesSummary = lesson.summary.toLowerCase().includes(q);
        const matchesId = lesson.id.toString() === q.replace(/[^0-9]/g, '');
        return matchesTitle || matchesSummary || matchesId;
      }

      return true;
    });
  }, [lessons, searchQuery, selectedLevel, statusFilter, userProfile.completedLessons]);

  return (
    <div className="space-y-6">
      {/* Subject Hero Header */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-linear-to-r ${subjectConfig.gradient} text-white shadow-xl relative overflow-hidden`}>
        <div className="absolute right-0 bottom-0 opacity-10 text-9xl select-none pointer-events-none transform translate-x-4 translate-y-4">
          {subjectConfig.flag}
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-white text-xs font-bold mb-3 border border-white/20">
            <span>{subjectConfig.flag}</span>
            <span>{subjectConfig.badge}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{subjectConfig.name}</h1>
          <p className="text-white/90 text-sm sm:text-base mt-2 leading-relaxed">{subjectConfig.desc}</p>

          {/* Progress Bar in Card */}
          <div className="mt-5 pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="w-full sm:max-w-md">
              <div className="flex justify-between text-xs font-semibold text-white/90 mb-1.5">
                <span>O'rganilgan darslar: {completedCount} / {lessons.length}</span>
                <span>{completionPercent}%</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-2.5 overflow-hidden border border-white/20">
                <div
                  className="bg-amber-300 h-full rounded-full transition-all duration-500 shadow-xs"
                  style={{ width: `${completionPercent}%` }}
                ></div>
              </div>
            </div>

            <div className="text-xs text-white/90 font-medium">
              💡 Har bir dars oxirida test topshirib XP to'plang!
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="lesson-search-input"
            type="text"
            placeholder="Dars raqami yoki mavzuni qidiring (masalan: 1, Past Simple, Padyej, Kvadrat)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-slate-50/50"
          />
        </div>

        {/* Level and Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <select
            id="level-filter-select"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-hidden focus:border-blue-500 shrink-0"
          >
            <option value="all">Barcha Darajalar</option>
            <option value="boshlang'ich">Boshlang'ich (A1/A2 / 5-7 sinf)</option>
            <option value="o'rta">O'rta (B1/B2 / 8-9 sinf)</option>
            <option value="yuqori">Yuqori (C1/C2 / 10-11 sinf)</option>
          </select>

          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                statusFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hammasi ({lessons.length})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                statusFilter === 'completed' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bajarilgan ({completedCount})
            </button>
            <button
              onClick={() => setStatusFilter('uncompleted')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                statusFilter === 'uncompleted' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Qolgan ({lessons.length - completedCount})
            </button>
          </div>
        </div>
      </div>

      {/* 120 Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLessons.map((lesson) => {
          const lessonKey = `${lesson.subject}_${lesson.id}`;
          const progress = userProfile.completedLessons[lessonKey];
          const isDone = !!progress;

          return (
            <div
              key={lesson.id}
              className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between group hover:shadow-md ${
                isDone
                  ? 'bg-emerald-50/20 border-emerald-200/80 hover:border-emerald-300'
                  : 'bg-white border-slate-200 hover:border-blue-300'
              }`}
            >
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-800">
                      {lesson.id}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                      {lesson.level}
                    </span>
                  </div>

                  {isDone ? (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Baho: {progress.grade}</span>
                      <span className="text-[10px] text-emerald-600">(+{progress.earnedXp} XP)</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-600 font-medium">Bajarilmagan</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-2">
                  {lesson.title}
                </h3>

                <div className="text-xs font-semibold text-blue-700 mt-1 mb-2">
                  📂 {lesson.category}
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
                  {lesson.summary}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-700">
                  {lesson.questions.length} ta savol
                </span>

                <button
                  id={`open-lesson-${lesson.id}-btn`}
                  onClick={() => onOpenLesson(lesson)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs ${
                    isDone
                      ? 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700 group-hover:scale-105'
                  }`}
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>{isDone ? 'Takrorlash' : 'Boshlash & Test'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLessons.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-700">
          <BookOpen className="w-10 h-10 mx-auto text-slate-500 mb-3" />
          <p className="font-medium">Qidiruv bo'yicha darslar topilmadi.</p>
          <p className="text-xs text-slate-600 mt-1">Filtr parametrlarini o'zgartirib ko'ring.</p>
        </div>
      )}
    </div>
  );
};
