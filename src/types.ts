export type SubjectId = 'english' | 'russian' | 'math';

export type Grade = 5 | 4 | 3 | 2;

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface WordItem {
  id: string;
  word: string;
  transcription: string; // Phonetic / IPA
  uzbekPronunciation: string; // O'zbekcha o'qilishi
  translationUz: string; // O'zbekcha tarjimasi
  partOfSpeech: string;
  exampleSentence: string;
  exampleTranslation: string;
  level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category?: string;
  audioLang: 'en' | 'ru';
}

export interface Lesson {
  id: number; // 1 to 120
  subject: SubjectId;
  title: string;
  level: string; // e.g. "Boshlang'ich", "O'rta", "Yuqori"
  category: string; // e.g. "Tenses", "Padyejlar", "Algebra"
  summary: string;
  theory: string; // Markdown or rich HTML explanation
  grammarRules?: {
    rule: string;
    formula?: string;
    examples: { original: string; translation: string; pronunciation?: string }[];
  }[];
  vocabulary?: WordItem[];
  mathFormulas?: {
    name: string;
    formula: string;
    description: string;
    sampleProblem: string;
    stepByStepSolution: string[];
  }[];
  questions: TestQuestion[];
  isCompleted?: boolean;
  score?: number; // 0 - 100%
  grade?: Grade;
  earnedXp?: number;
  completedAt?: string;
}

export interface UserProfile {
  name: string;
  bio: string;
  avatarUrl: string;
  customAvatarData?: string; // Base64 uploaded image
  totalXp: number;
  streakDays: number;
  lastActiveDate: string;
  level: number;
  completedLessons: {
    [lessonKey: string]: {
      score: number;
      grade: Grade;
      earnedXp: number;
      completedAt: string;
    };
  };
  bookmarkedWords: string[];
  dailyReminderEnabled: boolean;
  reminderTime: string; // "09:00"
  studyGoalMinutes: number;
  joinedDate: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatarUrl: string;
  xp: number;
  gradeAverage: number;
  lessonsDone: number;
  streak: number;
  isCurrentUser?: boolean;
  badge?: string;
  rank?: number;
}

export interface MathSolverResult {
  problemType: string;
  expression: string;
  result: string;
  steps: string[];
  formulaUsed?: string;
}
