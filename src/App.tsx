import React, { useState, useEffect } from 'react';
import { SubjectId, Lesson, UserProfile, Grade } from './types';
import { loadUserProfile, saveUserProfile } from './utils/storage';
import { ENGLISH_LESSONS } from './data/englishLessons';
import { RUSSIAN_LESSONS } from './data/russianLessons';
import { MATH_LESSONS } from './data/mathLessons';
import { Navbar } from './components/Navbar';
import { LessonList } from './components/LessonList';
import { LessonModal } from './components/LessonModal';
import { DictionaryView } from './components/DictionaryView';
import { MathPracticeView } from './components/MathPracticeView';
import { LeaderboardView } from './components/LeaderboardView';
import { ProfileView } from './components/ProfileView';
import { ProgressDashboard } from './components/ProgressDashboard';
import { RemindersModal } from './components/RemindersModal';

export default function App() {
  const [activeSubject, setActiveSubject] = useState<SubjectId>('english');
  const [activeTab, setActiveTab] = useState<
    'lessons' | 'dictionary' | 'math_solver' | 'leaderboard' | 'profile' | 'progress'
  >('lessons');
  const [userProfile, setUserProfile] = useState<UserProfile>(() => loadUserProfile());
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showReminders, setShowReminders] = useState(false);

  // Sync profile changes to localStorage
  useEffect(() => {
    saveUserProfile(userProfile);
  }, [userProfile]);

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
  };

  const handleSaveLessonProgress = (
    lessonId: number,
    subject: string,
    score: number,
    grade: Grade,
    earnedXp: number
  ) => {
    const lessonKey = `${subject}_${lessonId}`;
    const prevEarned = userProfile.completedLessons[lessonKey]?.earnedXp || 0;
    const netNewXp = Math.max(0, earnedXp - prevEarned);

    setUserProfile((prev) => {
      const nextCompleted = {
        ...prev.completedLessons,
        [lessonKey]: {
          score,
          grade,
          earnedXp,
          completedAt: new Date().toISOString(),
        },
      };

      const newTotalXp = prev.totalXp + netNewXp;
      const newLevel = Math.floor(newTotalXp / 100) + 1;

      return {
        ...prev,
        totalXp: newTotalXp,
        level: newLevel,
        completedLessons: nextCompleted,
        lastActiveDate: new Date().toISOString().split('T')[0],
      };
    });
  };

  const handleToggleBookmark = (wordId: string) => {
    setUserProfile((prev) => {
      const existing = prev.bookmarkedWords || [];
      const updated = existing.includes(wordId)
        ? existing.filter((id) => id !== wordId)
        : [...existing, wordId];
      return { ...prev, bookmarkedWords: updated };
    });
  };

  // Get current lessons list based on active subject
  const currentLessons: Lesson[] =
    activeSubject === 'english'
      ? ENGLISH_LESSONS
      : activeSubject === 'russian'
      ? RUSSIAN_LESSONS
      : MATH_LESSONS;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeSubject={activeSubject}
        onSelectSubject={(subj) => {
          setActiveSubject(subj);
        }}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        userProfile={userProfile}
        onOpenReminders={() => setShowReminders(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Tab 1: 120 Lessons View */}
        {activeTab === 'lessons' && (
          <LessonList
            lessons={currentLessons}
            subject={activeSubject}
            userProfile={userProfile}
            onOpenLesson={(lesson) => setSelectedLesson(lesson)}
          />
        )}

        {/* Tab 2: Dictionary (English & Russian 290k words + Audio) */}
        {activeTab === 'dictionary' && (
          <DictionaryView
            userProfile={userProfile}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* Tab 3: Math Problem Solver & Calculator */}
        {activeTab === 'math_solver' && <MathPracticeView />}

        {/* Tab 4: Leaderboard & XP */}
        {activeTab === 'leaderboard' && <LeaderboardView userProfile={userProfile} />}

        {/* Tab 5: User Profile & Avatar Upload */}
        {activeTab === 'profile' && (
          <ProfileView
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {/* Tab 6: Progress Dashboard */}
        {activeTab === 'progress' && (
          <ProgressDashboard
            userProfile={userProfile}
            englishLessons={ENGLISH_LESSONS}
            russianLessons={RUSSIAN_LESSONS}
            mathLessons={MATH_LESSONS}
            onSelectSubject={(s) => {
              setActiveSubject(s);
              setActiveTab('lessons');
            }}
            onSelectTab={setActiveTab}
          />
        )}
      </main>

      {/* Active Lesson Modal */}
      {selectedLesson && (
        <LessonModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
          userProfile={userProfile}
          onSaveProgress={handleSaveLessonProgress}
        />
      )}

      {/* Daily Reminders Modal */}
      <RemindersModal
        isOpen={showReminders}
        onClose={() => setShowReminders(false)}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-700">
          <p className="font-semibold text-slate-800">
            IlmHub 3-in-1: Ingliz Tili, Rus Tili va Matematika Ta'lim Platformasi
          </p>
          <p className="mt-1">
            Har bir fandan 120 ta dars • 290 000+ so'zlar lug'ati • Amaliy testlar va XP reyting tizimi
          </p>
        </div>
      </footer>
    </div>
  );
}
