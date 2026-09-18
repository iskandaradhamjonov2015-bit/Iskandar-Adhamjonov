import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  Bell,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Volume2,
  Calendar,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RemindersModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

const MOTIVATIONAL_QUOTES = [
  '🎯 "Har kuni 15 daqiqa o\'rganish bir oyda katta natija beradi!"',
  '🚀 "Bilim - bu hech kim sizdan tortib ololmaydigan eng katta boylikdir."',
  '🌟 "Bugungi bitta yangi qoida ertangi ulkan muvaffaqiyat poydevoridir."',
  '💡 "Qiyin misol va yangi so\'zlar miyani kuchaytiradi."',
];

export const RemindersModal: React.FC<RemindersModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
}) => {
  const [isEnabled, setIsEnabled] = useState(userProfile.dailyReminderEnabled);
  const [time, setTime] = useState(userProfile.reminderTime || '20:00');
  const [notificationStatus, setNotificationStatus] = useState<string>('');
  const [testSent, setTestSent] = useState(false);

  if (!isOpen) return null;

  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    onUpdateProfile({ dailyReminderEnabled: checked });
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    onUpdateProfile({ reminderTime: newTime });
  };

  const handleRequestPermission = async () => {
    if (!('Notification' in window)) {
      setNotificationStatus('Ushbu brauzerda bildirishnomalar qo\'llab-quvvatlanmaydi.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationStatus('Bildirishnomalarga ruxsat berildi! ✅');
        new Notification('IlmHub 3-in-1: Eslatma Yoqildi! 🚀', {
          body: `Har kuni soat ${time} da darslarni o'rganish eslatmasi yuboriladi.`,
          icon: '/favicon.ico',
        });
        setTestSent(true);
        confetti({ particleCount: 30, spread: 40 });
      } else {
        setNotificationStatus('Ruxsat berilmadi yoki bekor qilindi.');
      }
    } catch (e) {
      setNotificationStatus('Xatolik yuz berdi.');
    }
  };

  const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-linear-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Kunlik Dars Eslatmalari</h3>
              <p className="text-xs text-slate-700 font-medium">O'rganish rejimini tartibga solish</p>
            </div>
          </div>
          <button
            id="reminders-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Main Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="font-bold text-slate-900 text-sm">Kunlik eslatmalarni yoqish</div>
              <div className="text-xs text-slate-700">Har kuni belgilangan vaqtda xabar olasiz</div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                id="reminder-toggle-checkbox"
                type="checkbox"
                checked={isEnabled}
                onChange={(e) => handleToggle(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:width-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Time Picker */}
          {isEnabled && (
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3 animate-in fade-in duration-150">
              <label htmlFor="reminder-time-input" className="block text-xs font-bold text-blue-900 uppercase">
                Dars qilish vaqtini tanlang:
              </label>

              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Clock className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="reminder-time-input"
                    type="time"
                    value={time}
                    onChange={(e) => handleTimeChange(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-blue-200 bg-white text-sm font-bold text-slate-900 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <button
                  id="send-test-notification-btn"
                  onClick={handleRequestPermission}
                  className="px-3.5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-2xs shrink-0"
                >
                  Test Qilish
                </button>
              </div>

              {notificationStatus && (
                <div className="text-xs text-blue-800 font-semibold flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{notificationStatus}</span>
                </div>
              )}
            </div>
          )}

          {/* Motivation Quote */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950 text-xs sm:text-sm leading-relaxed">
            <div className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Kunlik Motivatsiya:</span>
            </div>
            {randomQuote}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-right">
          <button
            id="reminders-save-close-btn"
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-800 transition-colors"
          >
            Saqlash va Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
