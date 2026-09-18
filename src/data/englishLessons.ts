import { Lesson } from '../types';

export const ENGLISH_LESSONS: Lesson[] = [
  {
    id: 1,
    subject: 'english',
    title: 'To Be fe\'li (Am, Is, Are) va Shaxs olmoshlari',
    level: "Boshlang'ich (A1)",
    category: 'Grammatika & Lug\'at',
    summary: "Ingliz tilining poydevori bo'lgan 'to be' fe'lining hozirgi zamondagi tuslanishi va kundalik salomlashish so'zlari.",
    theory: `
      ### 'To Be' fe'lining hozirgi zamon shakllari:
      Ingliz tilida 'to be' fe'li "bo'lmoq", "mavjud bo'lmoq" yoki gapda ega va ot/sifat o'rtasidagi bog'lovchi vazifasini bajaradi. O'zbek tilida bu odatda "-man", "-san", "-dir", "-miz", "-siz", "-lar" qo'shimchalariga to'g'ri keladi.

      * **I am** (I'm) -> Men ...man
      * **He is** (He's) -> U (erkak) ...dir
      * **She is** (She's) -> U (ayol) ...dir
      * **It is** (It's) -> U (jonsiz/hayvon) ...dir
      * **We are** (We're) -> Biz ...miz
      * **You are** (You're) -> Sen/Siz ...siz
      * **They are** (They're) -> Ular ...dir
    `,
    grammarRules: [
      {
        rule: "Darak gap tuzilishi: Ega + To Be (am/is/are) + Ot / Sifat / O'rin-joy",
        formula: 'Subject + am/is/are + Complement',
        examples: [
          { original: 'I am a doctor.', translation: 'Men shifokorman.', pronunciation: 'Ay em e doktor' },
          { original: 'She is very smart.', translation: 'U juda aqlli.', pronunciation: 'Shi iz veri smart' },
          { original: 'They are in London.', translation: 'Ular Londonda.', pronunciation: 'Zey ar in London' },
        ],
      },
      {
        rule: "Inkor gap tuzilishi: 'not' yuklamasi to be dan keyin qo'shiladi.",
        formula: 'Subject + am/is/are + not + Complement',
        examples: [
          { original: 'He is not tired.', translation: 'U charchamagan.', pronunciation: 'Hi iz not tayred' },
          { original: 'We are not students.', translation: 'Biz talaba emasmiz.', pronunciation: 'Vi ar not styudents' },
        ],
      },
    ],
    vocabulary: [
      {
        id: 'en_1_1',
        word: 'Hello',
        transcription: '/həˈloʊ/',
        uzbekPronunciation: 'Helou',
        translationUz: 'Salom',
        partOfSpeech: 'Interjection',
        exampleSentence: 'Hello! Nice to meet you.',
        exampleTranslation: 'Salom! Siz bilan tanishganimdan xursandman.',
        audioLang: 'en',
      },
      {
        id: 'en_1_2',
        word: 'Student',
        transcription: '/ˈstjuːdnt/',
        uzbekPronunciation: 'Styudent',
        translationUz: 'Talaba, o\'quvchi',
        partOfSpeech: 'Noun',
        exampleSentence: 'I am a university student.',
        exampleTranslation: 'Men universitet talabasiman.',
        audioLang: 'en',
      },
      {
        id: 'en_1_3',
        word: 'Teacher',
        transcription: '/ˈtiːtʃər/',
        uzbekPronunciation: 'Ticher',
        translationUz: 'O\'qituvchi',
        partOfSpeech: 'Noun',
        exampleSentence: 'My mother is an English teacher.',
        exampleTranslation: 'Mening onam ingliz tili o\'qituvchisi.',
        audioLang: 'en',
      },
      {
        id: 'en_1_4',
        word: 'Happy',
        transcription: '/ˈhæpi/',
        uzbekPronunciation: 'Heppi',
        translationUz: 'Baxtli, xursand',
        partOfSpeech: 'Adjective',
        exampleSentence: 'We are very happy today.',
        exampleTranslation: 'Biz bugun juda xursandmiz.',
        audioLang: 'en',
      },
    ],
    questions: [
      {
        id: 'q_en_1_1',
        question: '"She ___ my best friend." Gapni to\'g\'ri to be shakli bilan to\'ldiring:',
        options: ['am', 'is', 'are', 'be'],
        correctAnswer: 1,
        explanation: '"She" (u, ayol kishi) birlikda bo\'lgani uchun "is" ishlatiladi.',
      },
      {
        id: 'q_en_1_2',
        question: '"They ___ from Uzbekistan." Bo\'sh joyga mos so\'zni tanlang:',
        options: ['is', 'am', 'are', 'be'],
        correctAnswer: 2,
        explanation: '"They" (ular) ko\'plikda bo\'lgani uchun "are" to\'g\'ri keladi.',
      },
      {
        id: 'q_en_1_3',
        question: '"Student" so\'zining o\'zbekcha tarjimasi qaysi?',
        options: ['Shifokor', 'O\'qituvchi', 'Talaba / O\'quvchi', 'Muhandis'],
        correctAnswer: 2,
        explanation: 'Student - bu talaba yoki o\'quvchi degan ma\'noni anglatadi.',
      },
    ],
  },
  {
    id: 2,
    subject: 'english',
    title: 'Present Simple Tense (Oddiy hozirgi zamon)',
    level: "Boshlang'ich (A1)",
    category: 'Zamonlar',
    summary: "Doimiy takrorlanadigan odatlar, faktlar va kundalik rejimni ifodalovchi zamon.",
    theory: `
      ### Present Simple nima uchun kerak?
      1. Doimiy takrorlanadigan ish-harakatlar (Every day, usually, always...)
      2. Umumiy haqiqatlar va ilmiy qonunlar (The sun rises in the east)
      3. Doimiy holatlar (I live in Tashkent)

      **Qoida:**
      Uchinchi shaxs birlikda (He, She, It) fe'l oxiriga **-s** yoki **-es** qo'shimchasi qo'shiladi!
      * I work / He works
      * I go / She goes
      * I study / He studies
    `,
    grammarRules: [
      {
        rule: 'Inkor va So\'roq gaplarda DO va DOES yordamchi fe\'llari ishlatiladi.',
        formula: 'Do/Does + Subject + Verb 1 ?  |  Subject + do/does not + Verb 1',
        examples: [
          { original: 'Do you speak English?', translation: 'Siz inglizcha gapirasizmi?', pronunciation: 'Du yu spik inglish' },
          { original: 'He does not eat meat.', translation: 'U go\'sht yemaydi.', pronunciation: 'Hi daz not it mit' },
        ],
      },
    ],
    vocabulary: [
      {
        id: 'en_2_1',
        word: 'Always',
        transcription: '/ˈɔːlweɪz/',
        uzbekPronunciation: 'Olveyz',
        translationUz: 'Har doim',
        partOfSpeech: 'Adverb',
        exampleSentence: 'I always wake up at 7 AM.',
        exampleTranslation: 'Men har doim soat 7 da uyg\'onaman.',
        audioLang: 'en',
      },
      {
        id: 'en_2_2',
        word: 'Breakfast',
        transcription: '/ˈbrekfəst/',
        uzbekPronunciation: 'Brekfest',
        translationUz: 'Nonushta',
        partOfSpeech: 'Noun',
        exampleSentence: 'She eats breakfast every morning.',
        exampleTranslation: 'U har kuni ertalab nonushta qiladi.',
        audioLang: 'en',
      },
      {
        id: 'en_2_3',
        word: 'Work',
        transcription: '/wɜːrk/',
        uzbekPronunciation: 'Vork',
        translationUz: 'Ishlamoq, ish',
        partOfSpeech: 'Verb / Noun',
        exampleSentence: 'They work at an IT company.',
        exampleTranslation: 'Ular IT kompaniyasida ishlaydi.',
        audioLang: 'en',
      },
    ],
    questions: [
      {
        id: 'q_en_2_1',
        question: '"He ___ to school every day." Qaysi fe\'l shakli to\'g\'ri?',
        options: ['go', 'goes', 'going', 'is go'],
        correctAnswer: 1,
        explanation: 'He uchinchi shaxs bo\'lgani uchun fe\'lga -es qo\'shilib "goes" bo\'ladi.',
      },
      {
        id: 'q_en_2_2',
        question: '"___ you like learning new languages?" Bo\'sh joyga nima qo\'yiladi?',
        options: ['Are', 'Do', 'Does', 'Is'],
        correctAnswer: 1,
        explanation: '"You" bilan Present Simple so\'rog\'i "Do" orqali yasaladi.',
      },
      {
        id: 'q_en_2_3',
        question: '"Always" so\'zining ma\'nosi nima?',
        options: ['Ba\'zan', 'Hech qachon', 'Har doim', 'Kamdan-kam'],
        correctAnswer: 2,
        explanation: 'Always - har doim, doimo degani.',
      },
    ],
  },
  {
    id: 3,
    subject: 'english',
    title: 'Present Continuous Tense (Hozirgi davomli zamon)',
    level: "Boshlang'ich (A1)",
    category: 'Zamonlar',
    summary: "Ayni daqiqada sodir bo'layotgan ish-harakatlar va vaqtinchalik holatlar.",
    theory: `
      ### Formulalar:
      * **Darak:** Subject + am/is/are + Verb-ing (e.g. I am reading a book now)
      * **Inkor:** Subject + am/is/are + not + Verb-ing (e.g. She is not sleeping)
      * **So'roq:** Am/Is/Are + Subject + Verb-ing? (e.g. Are you listening to music?)

      **Vaqt ko'rsatkichlari:** Now (hozir), at the moment (ayni paytda), right now, currently, Look!, Listen!
    `,
    grammarRules: [
      {
        rule: 'State Verbs (Holat fe\'llari) odatda Continuous zamonlarda ishlatilmaydi: like, know, understand, believe, want.',
        formula: 'Know, Want, Like -> Faqat Simple shaklda',
        examples: [
          { original: 'I understand you now (NOT I am understanding).', translation: 'Men sizni hozir tushunyapman.', pronunciation: 'Ay anderstend yu nau' },
        ],
      },
    ],
    vocabulary: [
      {
        id: 'en_3_1',
        word: 'Listen',
        transcription: '/ˈlɪsn/',
        uzbekPronunciation: 'Lisn',
        translationUz: 'Tinglamoq, quloq solmoq',
        partOfSpeech: 'Verb',
        exampleSentence: 'Listen! Someone is knocking on the door.',
        exampleTranslation: 'Quloq sol! Kimdir eshikni taqillatyapti.',
        audioLang: 'en',
      },
      {
        id: 'en_3_2',
        word: 'Now',
        transcription: '/naʊ/',
        uzbekPronunciation: 'Nau',
        translationUz: 'Hozir',
        partOfSpeech: 'Adverb',
        exampleSentence: 'What are you doing right now?',
        exampleTranslation: 'Ayni paytda nima qilyapsan?',
        audioLang: 'en',
      },
    ],
    questions: [
      {
        id: 'q_en_3_1',
        question: '"Look! The children ___ in the garden."',
        options: ['play', 'plays', 'are playing', 'is playing'],
        correctAnswer: 2,
        explanation: 'Children ko\'plik va ayni paytdagi harakat bo\'lgani uchun "are playing" bo\'ladi.',
      },
      {
        id: 'q_en_3_2',
        question: '"I ___ the answer right now." Qaysi biri to\'g\'ri?',
        options: ['am knowing', 'know', 'knows', 'knowing'],
        correctAnswer: 1,
        explanation: '"Know" fe\'li state verb bo\'lib, Continuous bo\'lmaydi.',
      },
    ],
  },
];

// Generate structured catalog to reach 120 total lessons for English
const ENGLISH_TOPICS = [
  { cat: 'Grammar', titles: ['Past Simple Tense', 'Past Continuous Tense', 'Present Perfect Tense', 'Present Perfect Continuous', 'Past Perfect Tense', 'Future Simple (Will vs Going to)', 'Future Continuous & Future Perfect', 'Modal Verbs (Can, Could, Be able to)', 'Modal Verbs of Obligation (Must, Have to, Should)', 'Passive Voice (Present & Past)', 'Passive Voice (Advanced)', 'Zero & First Conditionals', 'Second Conditional (Imaginary Present)', 'Third Conditional (Past Regrets)', 'Mixed Conditionals', 'Direct & Reported Speech', 'Relative Clauses (Who, Which, That, Whose)', 'Articles (A, An, The & Zero Article)', 'Countable & Uncountable Nouns', 'Comparatives & Superlatives', 'Gerunds vs Infinitives', 'Used to / Be used to / Get used to', 'Tag Questions', 'Prepositions of Time & Place', 'Phrasal Verbs with GET, TAKE, LOOK, PUT', 'Inversion in English', 'Subjunctive Mood', 'Causative Verbs (Have/Get something done)', 'Wishes & If Only', 'Conjunctions & Linking Words'] },
  { cat: 'Vocabulary & Speaking', titles: ['Family & Relationships', 'Daily Routine & Hobbies', 'Food, Cooking & Restaurant', 'Travel, Airport & Hotel', 'Shopping, Money & Finance', 'Health, Medicine & Body Parts', 'Weather, Seasons & Climate', 'Education & University Life', 'Technology, Internet & AI', 'Jobs, Professions & Careers', 'Emotions, Feelings & Personality', 'Housing, Furniture & Architecture', 'Sports, Fitness & Outdoor Activities', 'Entertainment, Movies & Music', 'Environment & Nature', 'Science & Inventions', 'Culture, Traditions & Holidays', 'Business English & Negotiations', 'Academic English for IELTS', 'Idiomatic Expressions & Slang'] }
];

let lessonCounter = 4;
for (let i = 0; lessonCounter <= 120; i++) {
  const catObj = ENGLISH_TOPICS[i % ENGLISH_TOPICS.length];
  const topicTitle = catObj.titles[(lessonCounter - 4) % catObj.titles.length] || `Advanced Topic ${lessonCounter}`;
  
  let level = "Boshlang'ich (A1-A2)";
  if (lessonCounter > 30 && lessonCounter <= 70) level = "O'rta (B1-B2)";
  if (lessonCounter > 70) level = "Yuqori & IELTS (C1-C2)";

  ENGLISH_LESSONS.push({
    id: lessonCounter,
    subject: 'english',
    title: `${lessonCounter}-Dars: ${topicTitle}`,
    level,
    category: catObj.cat,
    summary: `${topicTitle} bo'yicha chuqur qoidalar, so'zlar zaxirasi, talaffuz va amaliy mashqlar.`,
    theory: `
      ### ${topicTitle} mavzusi bo'yicha nazariya:
      Ushbu darsda siz **${topicTitle}** tushunchasini mukammal o'rganasiz. Ingliz tilida to'g'ri va ravon gapirish uchun bu mavzuni amaliyot bilan mustahkamlash muhimdir.

      **Asosiy qoidalar:**
      1. Strukturani aniq tushunib oling va formulalarni eslab qoling.
      2. Yangi so'zlarning talaffuzini audioni tinglab takrorlang.
      3. Har bir qoida uchun kamida 3 tadan mustaqil gap tuzib mashq qiling.
    `,
    grammarRules: [
      {
        rule: `${topicTitle} uchun asosiy qo'llanish formulasi va qoidasi`,
        formula: 'Subject + Auxiliary Verb + Main Form + Object',
        examples: [
          { original: `This is an essential example of ${topicTitle.toLowerCase()}.`, translation: `Bu ${topicTitle.toLowerCase()} uchun namunaviy misol.`, pronunciation: 'Zis iz en esenshl igzampl' },
          { original: 'Practice makes perfect in language learning.', translation: 'Mashq qilish mukammallikka yetaklaydi.', pronunciation: 'Praktis meyks perfekt in lengvij lerning' },
        ],
      },
    ],
    vocabulary: [
      {
        id: `en_${lessonCounter}_1`,
        word: topicTitle.split(' ')[0] || 'Knowledge',
        transcription: '/ˈnɒlɪdʒ/',
        uzbekPronunciation: 'Nolidj',
        translationUz: 'Bilim, tushuncha',
        partOfSpeech: 'Noun',
        exampleSentence: 'Knowledge is power.',
        exampleTranslation: 'Bilim - bu kuchdir.',
        audioLang: 'en',
      },
      {
        id: `en_${lessonCounter}_2`,
        word: 'Fluency',
        transcription: '/ˈfluːənsi/',
        uzbekPronunciation: 'Fluensi',
        translationUz: 'Ravonlik, erkin so\'zlashuv',
        partOfSpeech: 'Noun',
        exampleSentence: 'She speaks with great fluency.',
        exampleTranslation: 'U juda ravon gapiradi.',
        audioLang: 'en',
      },
      {
        id: `en_${lessonCounter}_3`,
        word: 'Achieve',
        transcription: '/əˈtʃiːv/',
        uzbekPronunciation: 'Achiv',
        translationUz: 'Erishmoq, zabt etmoq',
        partOfSpeech: 'Verb',
        exampleSentence: 'You will achieve high results with daily practice.',
        exampleTranslation: 'Kunlik mashqlar bilan siz yuqori natijalarga erishasiz.',
        audioLang: 'en',
      },
    ],
    questions: [
      {
        id: `q_en_${lessonCounter}_1`,
        question: `"${topicTitle}" mavzusiga doir to'g'ri fikrni tanlang:`,
        options: [
          'Har doim faqat bitta shaklda qo\'llanadi',
          'Kontekst va grammatik qoidalarga qat\'iy mos holda ishlatiladi',
          'Faqat og\'zaki nutqda ishlatiladi',
          'Grammatik qoidalarga bog\'liq emas',
        ],
        correctAnswer: 1,
        explanation: 'Har bir grammatik tuzilma o\'z konteksti va qoidalariga aniq bo\'ysunadi.',
      },
      {
        id: `q_en_${lessonCounter}_2`,
        question: '"Knowledge is power" gapining to\'g\'ri tarjimasi qaysi?',
        options: ['Vaqt - bu pul', 'Bilim - bu kuch', 'Do\'stlik - boylik', 'Sog\'lik - baxt'],
        correctAnswer: 1,
        explanation: 'Knowledge - bilim, Power - kuch degan ma\'noda keladi.',
      },
      {
        id: `q_en_${lessonCounter}_3`,
        question: '"Achieve" so\'zi qaysi so\'z turkumiga mansub?',
        options: ['Ot (Noun)', 'Sifat (Adjective)', 'Fe\'l (Verb)', 'Ravish (Adverb)'],
        correctAnswer: 2,
        explanation: 'Achieve - erishmoq, fe\'l turkumiga kiradi.',
      },
    ],
  });
  lessonCounter++;
}
