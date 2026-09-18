import React, { useState } from 'react';
import { UserProfile, LeaderboardUser } from '../types';
import { Trophy, Medal, Crown, Flame, Star, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { getRankLeague } from '../utils/storage';

interface LeaderboardViewProps {
  userProfile: UserProfile;
}

const STATIC_TOP_USERS: Omit<LeaderboardUser, 'rank'>[] = [
  {
    id: 'u1',
    name: 'Dilnoza Karimova',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    xp: 340,
    gradeAverage: 5.0,
    lessonsDone: 78,
    streak: 15,
    badge: 'IELTS Master',
  },
  {
    id: 'u2',
    name: 'Bekzod Rahmonov',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    xp: 295,
    gradeAverage: 4.9,
    lessonsDone: 65,
    streak: 12,
    badge: 'Math Guru',
  },
  {
    id: 'u3',
    name: 'Madina Aliyeva',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    xp: 210,
    gradeAverage: 4.8,
    lessonsDone: 52,
    streak: 8,
    badge: 'Poliglot',
  },
  {
    id: 'u4',
    name: 'Javohir Usmonov',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    xp: 180,
    gradeAverage: 4.7,
    lessonsDone: 44,
    streak: 6,
  },
  {
    id: 'u5',
    name: 'Sevara Saidova',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    xp: 145,
    gradeAverage: 4.6,
    lessonsDone: 38,
    streak: 5,
  },
  {
    id: 'u6',
    name: 'Bobur Mirzayev',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    xp: 90,
    gradeAverage: 4.5,
    lessonsDone: 25,
    streak: 3,
  },
];

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ userProfile }) => {
  const [leagueTab, setLeagueTab] = useState<'all' | 'weekly'>('all');

  // Compute user's average grade from completed lessons
  const completedKeys = Object.keys(userProfile.completedLessons);
  const lessonsDoneCount = completedKeys.length;
  let gradeSum = 0;
  completedKeys.forEach((k) => {
    gradeSum += userProfile.completedLessons[k].grade;
  });
  const userGradeAvg = lessonsDoneCount > 0 ? +(gradeSum / lessonsDoneCount).toFixed(1) : 5.0;

  const currentUserEntry: LeaderboardUser = {
    id: 'current_user',
    name: userProfile.name,
    avatarUrl: userProfile.customAvatarData || userProfile.avatarUrl,
    xp: userProfile.totalXp,
    gradeAverage: userGradeAvg,
    lessonsDone: lessonsDoneCount,
    streak: userProfile.streakDays,
    isCurrentUser: true,
  };

  // Combine and sort
  const allUsers: LeaderboardUser[] = [...STATIC_TOP_USERS, currentUserEntry]
    .sort((a, b) => b.xp - a.xp)
    .map((u, index) => ({ ...u, rank: index + 1 }));

  const currentRank = allUsers.find((u) => u.isCurrentUser)?.rank || 1;
  const userLeague = getRankLeague(userProfile.totalXp);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-amber-600 via-orange-600 to-rose-700 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold mb-3 border border-white/20">
            <Trophy className="w-3.5 h-3.5 text-amber-200" />
            <span>Foydalanuvchilar Reytingi & XP Tizimi</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Yetakchilar Jadvali (Leaderboard)
          </h1>
          <p className="text-white/90 text-sm sm:text-base mt-2">
            Har bir dars testidan 100% natija bilan 5 baho olib 3 XP to'plang, ligalar bo'yicha ko'tariling va reytingda 1-o'ringa chiqing!
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="p-3 rounded-2xl bg-black/20 border border-white/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black text-lg shadow-md">
                #{currentRank}
              </div>
              <div>
                <div className="text-xs text-white/80 font-medium">Sizning o'rningiz:</div>
                <div className="text-sm font-bold text-white">
                  {userLeague.name} • {userProfile.totalXp} XP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leagues Progress Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { name: 'Bronza', icon: '🥉', xp: '0-149 XP', active: userProfile.totalXp < 150 },
          { name: 'Kumush', icon: '🥈', xp: '150-299 XP', active: userProfile.totalXp >= 150 && userProfile.totalXp < 300 },
          { name: 'Oltin', icon: '👑', xp: '300-499 XP', active: userProfile.totalXp >= 300 && userProfile.totalXp < 500 },
          { name: 'Olmos', icon: '💎', xp: '500+ XP', active: userProfile.totalXp >= 500 },
        ].map((lg, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border transition-all text-center ${
              lg.active
                ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-400/30 shadow-md'
                : 'bg-white border-slate-200 opacity-80'
            }`}
          >
            <div className="text-2xl mb-1">{lg.icon}</div>
            <div className="font-bold text-slate-900 text-sm">{lg.name} Liga</div>
            <div className="text-xs text-slate-700 font-medium mt-0.5">{lg.xp}</div>
            {lg.active && (
              <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-blue-600 text-white">
                Siz shu yerdasiz
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Leaderboard Table List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Top Bilimdonlar Reytingi</span>
          </h3>
          <span className="text-xs text-slate-700 font-medium">Baho va XP bo'yicha saralangan</span>
        </div>

        <div className="divide-y divide-slate-100">
          {allUsers.map((user) => {
            const isTop1 = user.rank === 1;
            const isTop2 = user.rank === 2;
            const isTop3 = user.rank === 3;

            return (
              <div
                key={user.id}
                className={`p-4 sm:p-5 flex items-center justify-between gap-3 transition-colors ${
                  user.isCurrentUser
                    ? 'bg-blue-50/80 font-bold border-l-4 border-l-blue-600'
                    : 'hover:bg-slate-50'
                }`}
              >
                {/* Rank & User Details */}
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Rank badge */}
                  <div className="w-8 flex items-center justify-center font-extrabold text-sm sm:text-base">
                    {isTop1 ? (
                      <span className="text-2xl">🥇</span>
                    ) : isTop2 ? (
                      <span className="text-2xl">🥈</span>
                    ) : isTop3 ? (
                      <span className="text-2xl">🥉</span>
                    ) : (
                      <span className="text-slate-600">#{user.rank}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl object-cover ring-2 ring-slate-200"
                  />

                  {/* Name and Badges */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        {user.name}
                      </span>
                      {user.isCurrentUser && (
                        <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold">
                          Siz
                        </span>
                      )}
                      {user.badge && (
                        <span className="hidden sm:inline px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-semibold">
                          {user.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-700 mt-0.5">
                      <span>{user.lessonsDone} ta dars</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-amber-700 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        O'rtacha baho: {user.gradeAverage}
                      </span>
                    </div>
                  </div>
                </div>

                {/* XP and Streak */}
                <div className="text-right shrink-0">
                  <div className="text-base sm:text-lg font-black text-blue-700">
                    {user.xp} XP
                  </div>
                  <div className="flex items-center justify-end gap-1 text-xs text-amber-700 font-bold">
                    <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{user.streak} kun</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
