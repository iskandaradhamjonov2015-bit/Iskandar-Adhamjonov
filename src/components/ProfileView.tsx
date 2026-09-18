import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';
import { DEFAULT_AVATARS, getRankLeague } from '../utils/storage';
import {
  User,
  Upload,
  Camera,
  Edit2,
  Check,
  Trophy,
  Flame,
  Star,
  BookOpen,
  Award,
  Sparkles,
  Calendar,
  Save,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProfileViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(userProfile.name);
  const [bioInput, setBioInput] = useState(userProfile.bio);
  const [goalInput, setGoalInput] = useState(userProfile.studyGoalMinutes);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const league = getRankLeague(userProfile.totalXp);
  const avatarSrc = userProfile.customAvatarData || userProfile.avatarUrl;

  const completedKeys = Object.keys(userProfile.completedLessons);
  const totalCompleted = completedKeys.length;

  let grade5Count = 0;
  let grade4Count = 0;
  let grade3Count = 0;
  let grade2Count = 0;

  completedKeys.forEach((k) => {
    const g = userProfile.completedLessons[k].grade;
    if (g === 5) grade5Count++;
    else if (g === 4) grade4Count++;
    else if (g === 3) grade3Count++;
    else if (g === 2) grade2Count++;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 3MB for base64 storage)
    if (file.size > 3 * 1024 * 1024) {
      alert('Iltimos, hajmi 3MB dan kichik rasm tanlang.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result as string;
      onUpdateProfile({ customAvatarData: base64Data });
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    onUpdateProfile({
      name: nameInput.trim() || 'Foydalanuvchi',
      bio: bioInput.trim(),
      studyGoalMinutes: Number(goalInput) || 25,
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const ACHIEVEMENTS = [
    {
      id: 'first_lesson',
      title: 'Birinchi Qadam 🎯',
      desc: 'Kamida 1 ta darsni muvaffaqiyatli yakunlash',
      achieved: totalCompleted >= 1,
    },
    {
      id: 'xp_100',
      title: '100 XP Sohibi ⚡',
      desc: '100 XP dan ko\'proq ball to\'plash',
      achieved: userProfile.totalXp >= 100,
    },
    {
      id: 'perfect_5',
      title: 'A\'lochi O\'quvchi 🌟',
      desc: 'Kamida bitta darsdan 100% natija bilan 5 baho olish',
      achieved: grade5Count >= 1,
    },
    {
      id: 'streak_master',
      title: 'Matonatli 7 Kun 🔥',
      desc: '7 kunlik doimiy o\'rganish ketma-ketligiga erishish',
      achieved: userProfile.streakDays >= 7,
    },
    {
      id: 'math_wizard',
      title: 'Matematika Ustasi 📐',
      desc: 'Matematikadan darslarni topshirish',
      achieved: completedKeys.some((k) => k.startsWith('math')),
    },
    {
      id: 'polyglot',
      title: 'Poliglot 🌍',
      desc: 'Ingliz va Rus tillarining ikkalasidan ham dars o\'rganish',
      achieved:
        completedKeys.some((k) => k.startsWith('english')) &&
        completedKeys.some((k) => k.startsWith('russian')),
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Banner Cover */}
        <div className="h-36 sm:h-44 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-700 relative">
          <div className="absolute right-4 top-4 px-3 py-1 bg-black/20 backdrop-blur-md rounded-full text-white text-xs font-semibold">
            {league.name}
          </div>
        </div>

        {/* Profile Details Header */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
            {/* Avatar & Upload Button */}
            <div className="relative group self-start">
              <img
                src={avatarSrc}
                alt={userProfile.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-white shadow-xl bg-white"
              />
              
              <button
                id="upload-avatar-overlay-btn"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 rounded-3xl flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-xs"
                title="Kompyuterdan rasm yuklash"
              >
                <Camera className="w-6 h-6 mb-1" />
                <span className="text-[11px] font-bold">Rasm yuklash</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Actions: Edit profile & avatar selection */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="choose-avatar-presets-btn"
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Avatarlar</span>
              </button>

              <button
                id="upload-from-computer-btn"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold hover:bg-blue-100 transition-colors flex items-center gap-1.5"
              >
                <Upload className="w-4 h-4" />
                <span>Kompyuterdan Rasm Yuklash</span>
              </button>

              <button
                id="edit-profile-btn"
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
                  isEditing
                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <Edit2 className="w-4 h-4" />
                <span>{isEditing ? 'Bekor qilish' : 'Tahrirlash'}</span>
              </button>
            </div>
          </div>

          {/* Preset Avatar Selection Grid */}
          {showAvatarPicker && (
            <div className="p-4 mb-6 rounded-2xl bg-slate-50 border border-slate-200 animate-in fade-in duration-150">
              <div className="text-xs font-bold text-slate-700 mb-3">Tayyor avatarlardan birini tanlang:</div>
              <div className="flex flex-wrap gap-3">
                {DEFAULT_AVATARS.map((av, idx) => (
                  <img
                    key={idx}
                    src={av}
                    alt={`Avatar ${idx}`}
                    onClick={() => {
                      onUpdateProfile({ avatarUrl: av, customAvatarData: undefined });
                      setShowAvatarPicker(false);
                    }}
                    className={`w-12 h-12 rounded-2xl object-cover cursor-pointer hover:scale-110 transition-transform ring-2 ${
                      avatarSrc === av ? 'ring-blue-600 ring-offset-2' : 'ring-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Name & Bio View or Edit */}
          {!isEditing ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {userProfile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                  Daraja: {userProfile.level}
                </span>
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {userProfile.bio || '3 tasi 1 da: Ingliz, Rus va Matematika bilimlari sohibi 🚀'}
              </p>

              {savedSuccess && (
                <div className="p-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 mt-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Ma'lumotlar muvaffaqiyatli saqlandi!</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Ism va Familiyangiz:
                </label>
                <input
                  id="profile-name-input"
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Profil tavsifi (Bio):
                </label>
                <textarea
                  id="profile-bio-input"
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Kunlik o'rganish maqsadi (daqiqa):
                </label>
                <input
                  id="profile-goal-input"
                  type="number"
                  value={goalInput}
                  onChange={(e) => setGoalInput(Number(e.target.value))}
                  min={5}
                  max={180}
                  className="w-32 p-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <button
                id="save-profile-changes-btn"
                onClick={handleSaveProfile}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>O'zgarishlarni Saqlash</span>
              </button>
            </div>
          )}

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-center">
              <Trophy className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <div className="text-2xl font-black text-slate-900">{userProfile.totalXp}</div>
              <div className="text-xs text-slate-700 font-semibold uppercase">Jami XP</div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 text-center">
              <Flame className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <div className="text-2xl font-black text-slate-900">{userProfile.streakDays} kun</div>
              <div className="text-xs text-slate-700 font-semibold uppercase">Ketma-ketlik</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
              <BookOpen className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <div className="text-2xl font-black text-slate-900">{totalCompleted} / 360</div>
              <div className="text-xs text-slate-700 font-semibold uppercase">Tugatilgan Darslar</div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-center">
              <Star className="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <div className="text-2xl font-black text-slate-900">{grade5Count} ta</div>
              <div className="text-xs text-slate-700 font-semibold uppercase">5 (A'lo) Baholar</div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges & Achievements Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Foydalanuvchi Yutuqlari & Nishonlar</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all ${
                ach.achieved
                  ? 'bg-amber-50/40 border-amber-300 ring-1 ring-amber-300/40 shadow-xs'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900 text-sm">{ach.title}</span>
                {ach.achieved ? (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Ochildi ✨
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-600 font-medium">Qulflangan 🔒</span>
                )}
              </div>
              <p className="text-xs text-slate-700">{ach.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
