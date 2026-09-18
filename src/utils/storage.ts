import { UserProfile, Grade } from '../types';

const STORAGE_KEY = 'ilmhub_user_profile_v2';

export const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Iskandar Adhamjonov',
  bio: '3 tasi 1 da: Ingliz, Rus va Matematika bilimlari sohibi 🚀',
  avatarUrl: DEFAULT_AVATARS[2],
  totalXp: 125,
  streakDays: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  level: 1,
  completedLessons: {
    'english_1': { score: 100, grade: 5, earnedXp: 3, completedAt: new Date(Date.now() - 86400000 * 2).toISOString() },
    'russian_1': { score: 100, grade: 5, earnedXp: 3, completedAt: new Date(Date.now() - 86400000).toISOString() },
    'math_1': { score: 85, grade: 4, earnedXp: 2.5, completedAt: new Date().toISOString() },
  },
  bookmarkedWords: [],
  dailyReminderEnabled: true,
  reminderTime: '20:00',
  studyGoalMinutes: 25,
  joinedDate: '2026-08-01',
};

export function loadUserProfile(): UserProfile {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return INITIAL_USER_PROFILE;
    const parsed = JSON.parse(data) as UserProfile;
    
    // Check and update streak
    const today = new Date().toISOString().split('T')[0];
    const lastActive = parsed.lastActiveDate;
    if (lastActive) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastActive === yesterday) {
        // Streak is continuous
      } else if (lastActive !== today) {
        // Missed a day, streak resets to 1 if active today
      }
    }
    return { ...INITIAL_USER_PROFILE, ...parsed };
  } catch (e) {
    console.error('Failed to load user profile:', e);
    return INITIAL_USER_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save user profile:', e);
  }
}

export function calculateGradeAndXp(scorePercent: number): { grade: Grade; xp: number } {
  if (scorePercent === 100) {
    return { grade: 5, xp: 3 }; // 100% ga 3 XP va 5 baho
  } else if (scorePercent >= 80) {
    return { grade: 4, xp: 2.5 }; // 80%+ ga 4 baho
  } else if (scorePercent >= 60) {
    return { grade: 3, xp: 2 }; // 60%+ ga 3 baho
  } else {
    return { grade: 2, xp: 1 }; // <60% ga 2 baho
  }
}

export function getRankLeague(xp: number): { name: string; color: string; icon: string; minXp: number } {
  if (xp >= 500) return { name: 'Olmos Liga 💎', color: 'from-cyan-500 to-blue-600', icon: 'diamond', minXp: 500 };
  if (xp >= 300) return { name: 'Oltin Liga 👑', color: 'from-amber-400 to-amber-600', icon: 'crown', minXp: 300 };
  if (xp >= 150) return { name: 'Kumush Liga 🥈', color: 'from-slate-300 to-slate-500', icon: 'medal', minXp: 150 };
  return { name: 'Bronza Liga 🥉', color: 'from-amber-700 to-orange-800', icon: 'shield', minXp: 0 };
}
