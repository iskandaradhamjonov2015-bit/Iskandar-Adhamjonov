import React, { useState, useMemo } from 'react';
import { WordItem, UserProfile } from '../types';
import { CURATED_VOCABULARY, lookupWordSmart } from '../data/dictionaryData';
import { speakText } from '../utils/speech';
import {
  Search,
  Volume2,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Shuffle,
  ArrowRightLeft,
  BookOpen,
  VolumeX,
} from 'lucide-react';

interface DictionaryViewProps {
  userProfile: UserProfile;
  onToggleBookmark: (wordId: string) => void;
}

export const DictionaryView: React.FC<DictionaryViewProps> = ({
  userProfile,
  onToggleBookmark,
}) => {
  const [lang, setLang] = useState<'en' | 'ru'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSpeed, setActiveSpeed] = useState<number>(0.9);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'flashcards'>('list');
  const [searchMode, setSearchMode] = useState<'auto' | 'uz-to-target' | 'target-to-uz'>('auto');

  // Filter curated words for current active language
  const baseWords = useMemo(() => {
    return CURATED_VOCABULARY.filter((w) => w.audioLang === lang);
  }, [lang]);

  // Smart 290,000+ words lookup engine
  const searchResult = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return lookupWordSmart(searchQuery.trim(), lang, searchMode);
  }, [searchQuery, lang, searchMode]);

  const displayedWords = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const filtered = baseWords.filter((w) => {
        if (searchMode === 'uz-to-target') {
          return w.translationUz.toLowerCase().includes(q);
        }
        if (searchMode === 'target-to-uz') {
          return w.word.toLowerCase().includes(q) || w.uzbekPronunciation.toLowerCase().includes(q);
        }
        return (
          w.word.toLowerCase().includes(q) ||
          w.translationUz.toLowerCase().includes(q) ||
          w.uzbekPronunciation.toLowerCase().includes(q)
        );
      });

      // If smart lookup found an entry and not already in filtered, prepend it
      if (searchResult && !filtered.some((w) => w.word.toLowerCase() === searchResult.word.toLowerCase())) {
        return [searchResult, ...filtered];
      }
      return filtered.length > 0 ? filtered : searchResult ? [searchResult] : [];
    }

    return baseWords;
  }, [baseWords, searchQuery, searchResult, searchMode]);

  const handlePlayAudio = (text: string) => {
    speakText(text, lang, activeSpeed);
  };

  const currentFlashcard = displayedWords[flashcardIndex % (displayedWords.length || 1)];

  const quickSamples = [
    'Kitob',
    'Suv',
    'Do\'st',
    'Quyosh',
    'Universitet',
    'Salomatlik',
    'Oila',
    'Ish',
    'Muvaffaqiyat',
    'Matematika',
    'Kompyuter',
    'Chiroyli',
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-indigo-900 via-blue-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-3 border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>290 000+ So'zlar Bazasi & Fonetik Talaffuz</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'en'
              ? "Inglizcha ↔ O'zbekcha 290k Katta Lug'at"
              : "Ruscha ↔ O'zbekcha 290k Katta Lug'at"}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            {lang === 'en'
              ? "O'zbekcha so'z kiritsangiz (masalan: kitob, suv, do'st) — uning inglizcha tarjimasi, xalqaro IPA transkripsiyasi va audio talaffuzi chiqadi."
              : "O'zbekcha so'z kiritsangiz (masalan: kitob, suv, do'st) — uning ruscha tarjimasi, xalqaro IPA transkripsiyasi va audio talaffuzi chiqadi."}
          </p>

          {/* Controls: Language, Speed, View Mode */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {/* Language Selector */}
            <div className="flex bg-white/10 p-1 rounded-xl border border-white/20">
              <button
                id="dict-lang-en-btn"
                onClick={() => {
                  setLang('en');
                  setSearchQuery('');
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  lang === 'en' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                🇬🇧 Ingliz tili (290k)
              </button>
              <button
                id="dict-lang-ru-btn"
                onClick={() => {
                  setLang('ru');
                  setSearchQuery('');
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  lang === 'ru' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                🇷🇺 Rus tili (290k)
              </button>
            </div>

            {/* Audio Speed Controller */}
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 text-xs">
              <span className="text-slate-300 font-semibold">Tezlik:</span>
              {[0.75, 0.9, 1.1].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setActiveSpeed(spd)}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                    activeSpeed === spd ? 'bg-amber-400 text-slate-950' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-white/10 p-1 rounded-xl border border-white/20 text-xs">
              <button
                id="dict-view-list-btn"
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  viewMode === 'list' ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'
                }`}
              >
                Lug'at Ro'yxati
              </button>
              <button
                id="dict-view-flashcards-btn"
                onClick={() => {
                  setViewMode('flashcards');
                  setIsFlipped(false);
                }}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  viewMode === 'flashcards' ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'
                }`}
              >
                Kartochkalar (Flashcards)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FLASHCARDS INTERACTIVE MODE */}
      {viewMode === 'flashcards' && currentFlashcard && (
        <div className="max-w-xl mx-auto space-y-4">
          <div
            id="flashcard-card-box"
            onClick={() => setIsFlipped(!isFlipped)}
            className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-blue-200 shadow-xl cursor-pointer hover:border-blue-400 transition-all min-h-[280px] flex flex-col justify-between text-center relative select-none"
          >
            <div className="text-xs text-slate-600 font-semibold uppercase tracking-wider">
              {isFlipped ? "O'zbekcha tarjimasi (Bosing - qaytarish)" : "So'z (Bosing - o'zbekcha ma'nosini ko'rish)"}
            </div>

            {!isFlipped ? (
              <div className="space-y-2 my-auto">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">{currentFlashcard.word}</div>
                <div className="text-sm text-slate-600 font-mono">{currentFlashcard.transcription}</div>
                <div className="text-xs font-bold text-blue-600">O'qilishi: [{currentFlashcard.uzbekPronunciation}]</div>
              </div>
            ) : (
              <div className="space-y-3 my-auto animate-in fade-in zoom-in-95 duration-150">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-800">{currentFlashcard.translationUz}</div>
                {currentFlashcard.exampleSentence && (
                  <div className="text-xs text-slate-700 italic">"{currentFlashcard.exampleSentence}"</div>
                )}
                {currentFlashcard.exampleTranslation && (
                  <div className="text-xs text-slate-700">{currentFlashcard.exampleTranslation}</div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-600 font-medium">
                {flashcardIndex + 1} / {displayedWords.length}
              </span>
              <button
                id="flashcard-audio-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayAudio(currentFlashcard.word);
                }}
                className="p-2.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                title="Talaffuzni eshitish"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              id="flashcard-prev-btn"
              onClick={() => {
                setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : displayedWords.length - 1));
                setIsFlipped(false);
              }}
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Oldingisi
            </button>
            <button
              id="flashcard-shuffle-btn"
              onClick={() => {
                setFlashcardIndex((prev) => Math.floor(Math.random() * displayedWords.length));
                setIsFlipped(false);
              }}
              className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm font-bold text-blue-700 hover:bg-blue-100 flex items-center gap-1.5"
            >
              <Shuffle className="w-4 h-4" />
              Tasodifiy
            </button>
            <button
              id="flashcard-next-btn"
              onClick={() => {
                setFlashcardIndex((prev) => (prev + 1) % displayedWords.length);
                setIsFlipped(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-bold hover:bg-slate-800"
            >
              Keyingisi
            </button>
          </div>
        </div>
      )}

      {/* SEARCH AND WORD LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {/* Search Mode & Direction Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <ArrowRightLeft className="w-4 h-4 text-blue-600" />
              <span>Qidiruv yo'nalishi:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                id="search-mode-auto-btn"
                onClick={() => setSearchMode('auto')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  searchMode === 'auto'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Avtomatik (Ikki tomonlama)
              </button>
              <button
                id="search-mode-uz-target-btn"
                onClick={() => setSearchMode('uz-to-target')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  searchMode === 'uz-to-target'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                🇺🇿 O'zbekcha ➡️ {lang === 'en' ? '🇬🇧 Inglizcha' : '🇷🇺 Ruscha'}
              </button>
              <button
                id="search-mode-target-uz-btn"
                onClick={() => setSearchMode('target-to-uz')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  searchMode === 'target-to-uz'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lang === 'en' ? '🇬🇧 Inglizcha' : '🇷🇺 Ruscha'} ➡️ 🇺🇿 O'zbekcha
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <Search className="w-5 h-5 text-slate-600 absolute left-6 top-1/2 -translate-y-1/2" />
            <input
              id="dictionary-search-input"
              type="text"
              placeholder={
                searchMode === 'uz-to-target'
                  ? "O'zbekcha so'z kiriting (masalan: kitob, suv, quyosh, maktab, do'st, oila)..."
                  : lang === 'en'
                  ? "O'zbekcha yoki inglizcha so'z yozing (masalan: kitob, water, family, work, determination)..."
                  : "O'zbekcha yoki ruscha so'z yozing (masalan: kitob, семья, книга, работа, успех)..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-24 py-3 text-sm sm:text-base rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-slate-50/50"
            />
            {searchQuery && (
              <button
                id="dictionary-clear-search-btn"
                onClick={() => setSearchQuery('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-md bg-slate-200"
              >
                Tozalash
              </button>
            )}
          </div>

          {/* Quick Search Suggestions */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-600 font-semibold mr-1">Tezkor namunalar:</span>
            {quickSamples.map((sample) => (
              <button
                key={sample}
                onClick={() => setSearchQuery(sample)}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 font-medium transition-all"
              >
                {sample}
              </button>
            ))}
          </div>

          {/* Results Counter */}
          <div className="flex items-center justify-between text-xs text-slate-700 px-1">
            <span>
              Topilgan so'zlar: <strong>{displayedWords.length} ta</strong> {searchQuery && '(290 000+ bazadan)'}
            </span>
            <span className="text-blue-700 font-medium">💡 Ovoz tugmachasini bosib talaffuzni tinglang</span>
          </div>

          {/* Words Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedWords.map((item) => {
              const isBookmarked = userProfile.bookmarkedWords?.includes(item.id);

              return (
                <div
                  key={item.id}
                  id={`word-card-${item.id}`}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-900 tracking-tight">{item.word}</h3>
                          {item.level && (
                            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                              {item.level}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600 mt-1 font-mono">
                          <span>{item.transcription}</span>
                          <span className="text-blue-700 font-semibold">[{item.uzbekPronunciation}]</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          id={`play-word-${item.id}`}
                          onClick={() => handlePlayAudio(item.word)}
                          className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-105 transition-all shadow-2xs"
                          title="Talaffuzni tinglash"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          id={`bookmark-word-${item.id}`}
                          onClick={() => onToggleBookmark(item.id)}
                          className={`p-2 rounded-xl border transition-colors ${
                            isBookmarked
                              ? 'border-amber-300 bg-amber-50 text-amber-600'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                          title="Saqlab qo'yish"
                        >
                          {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-amber-500" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Meaning / Uzbek Translation */}
                    <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100/90">
                      <div className="text-[11px] text-emerald-800 font-semibold uppercase">O'zbekcha tarjimasi:</div>
                      <div className="text-sm sm:text-base font-bold text-emerald-950 mt-0.5">{item.translationUz}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5 italic">{item.partOfSpeech}</div>
                    </div>
                  </div>

                  {/* Sample sentence */}
                  {item.exampleSentence && (
                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-1">
                      <div className="text-slate-800 font-medium italic">"{item.exampleSentence}"</div>
                      <div className="text-slate-600">{item.exampleTranslation}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
