/**
 * Speech synthesis utility for English and Russian pronunciation
 */

export function speakText(text: string, lang: 'en' | 'ru' = 'en', rate: number = 0.9): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech Synthesis API is not supported in this browser.');
      resolve();
      return;
    }

    // Cancel any previous speech
    window.speechSynthesis.cancel();

    // Clean up text
    const cleanText = text.replace(/\[.*?\]/g, '').replace(/[()]/g, '').trim();
    if (!cleanText) {
      resolve();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'ru' ? 'ru-RU' : 'en-US';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Try to find a natural native voice
    const voices = window.speechSynthesis.getVoices();
    const targetLang = lang === 'ru' ? 'ru' : 'en';
    const naturalVoice = voices.find(
      (v) => v.lang.toLowerCase().startsWith(targetLang) && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Siri') || v.name.includes('Premium'))
    ) || voices.find((v) => v.lang.toLowerCase().startsWith(targetLang));

    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}
