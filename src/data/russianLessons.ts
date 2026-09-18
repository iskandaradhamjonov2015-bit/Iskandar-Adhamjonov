import { Lesson } from '../types';

export const RUSSIAN_LESSONS: Lesson[] = [
  {
    id: 1,
    subject: 'russian',
    title: 'Rus tili alifbosi, tovushlar va Rodlar (Мужской, Женский, Средний род)',
    level: "Boshlang'ich (A1)",
    category: 'Grammatika & Asoslar',
    summary: "Rus tilidagi 33 ta harf, unli va undosh tovushlar hamda otlarning jinsini (rod) aniqlash qoidalari.",
    theory: `
      ### Rus tilida 3 ta rod (jins) mavjud:
      1. **Мужской род (Muzhskoy rod - Erkak jinsi):**
         - Undosh harf bilan tugaydi: *дом, стол, брат, студент, город*
         - Ba'zi yumshatish belgisi (-ь) bilan tugaydiganlar: *день, словарь, рубль*
         - Erkak kishini bildiruvchi -а/-я bilan tugaydiganlar: *папа, дедушка, дядя*

      2. **Женский род (Zhenskiy rod - Ayol jinsi):**
         - **-а** yoki **-я** bilan tugaydi: *мама, книга, сестра, песня, семья*
         - **-ь** bilan tugaydigan ba'zi so'zlar: *ночь, мать, дверь, площадь*

      3. **Средний род (Sredniy rod - O'rta jins):**
         - **-о** yoki **-е** bilan tugaydi: *окно, письмо, море, здание, солнце*
         - **-мя** bilan tugaydigan 10 ta so'z: *время, имя, знамя*
    `,
    grammarRules: [
      {
        rule: 'Otlarning rodini aniqlash va mos olmoshlar: Он (u - muzhskoy), Она (u - zhenskiy), Оно (u - sredniy)',
        formula: 'Он = Мужской | Она = Женский | Оно = Средний | Они = Ko\'plik',
        examples: [
          { original: 'Это мой брат. Он студент.', translation: 'Bu mening akam. U talaba.', pronunciation: 'Eto moy brat. On student.' },
          { original: 'Это моя книга. Она интересная.', translation: 'Bu mening kitobim. U qiziqarli.', pronunciation: 'Eto moya kniga. Ona interesnaya.' },
          { original: 'Это наше окно. Оно большое.', translation: 'Bu bizning derazamiz. U katta.', pronunciation: 'Eto nashe okno. Ono bolshoye.' },
        ],
      },
    ],
    vocabulary: [
      {
        id: 'ru_1_1',
        word: 'Здравствуйте',
        transcription: '[ˈzdrastvujtʲe]',
        uzbekPronunciation: 'Zdravstvuyte',
        translationUz: 'Assalomu alaykum, salom',
        partOfSpeech: 'Приветствие',
        exampleSentence: 'Здравствуйте, как ваши дела?',
        exampleTranslation: 'Assalomu alaykum, ishlaringiz qalay?',
        audioLang: 'ru',
      },
      {
        id: 'ru_1_2',
        word: 'Спасибо',
        transcription: '[spɐˈsʲibə]',
        uzbekPronunciation: 'Spasibo',
        translationUz: 'Rahmat, tashakkur',
        partOfSpeech: 'Междометие',
        exampleSentence: 'Большое спасибо за помощь!',
        exampleTranslation: 'Yordamingiz uchun katta rahmat!',
        audioLang: 'ru',
      },
      {
        id: 'ru_1_3',
        word: 'Пожалуйста',
        transcription: '[pɐˈʐalʊstə]',
        uzbekPronunciation: 'Pojaluysta',
        translationUz: 'Iltimos / Arzimaydi',
        partOfSpeech: 'Вводное слово',
        exampleSentence: 'Пожалуйста, откройте окно.',
        exampleTranslation: 'Iltimos, derazani oching.',
        audioLang: 'ru',
      },
      {
        id: 'ru_1_4',
        word: 'Друг',
        transcription: '[druk]',
        uzbekPronunciation: 'Drug',
        translationUz: 'Do\'st, o\'rtoq',
        partOfSpeech: 'Существительное',
        exampleSentence: 'Антон — мой лучший друг.',
        exampleTranslation: 'Anton - mening eng yaxshi do\'stim.',
        audioLang: 'ru',
      },
    ],
    questions: [
      {
        id: 'q_ru_1_1',
        question: '"Книга" so\'zi qaysi rodga (jinsga) tegishli?',
        options: ['Мужской род', 'Женский род', 'Средний род', 'Jinsi yo\'q'],
        correctAnswer: 1,
        explanation: 'Oxiri "-а" bilan tugaganligi uchun Женский род bo\'ladi.',
      },
      {
        id: 'q_ru_1_2',
        question: '"Окно" so\'zi uchun qaysi olmosh to\'g\'ri keladi?',
        options: ['Он', 'Она', 'Оно', 'Они'],
        correctAnswer: 2,
        explanation: '"Окно" - sredniy rod bo\'lgani uchun "Оно" ishlatiladi.',
      },
      {
        id: 'q_ru_1_3',
        question: '"Спасибо" so\'zining o\'zbekcha ma\'nosi qaysi?',
        options: ['Salom', 'Xayr', 'Rahmat', 'Kechirasiz'],
        correctAnswer: 2,
        explanation: 'Спасибо - Rahmat, tashakkur degani.',
      },
    ],
  },
  {
    id: 2,
    subject: 'russian',
    title: 'Fe\'llarning hozirgi zamonda tuslanishi (1-е и 2-е спряжение)',
    level: "Boshlang'ich (A1)",
    category: 'Grammatika',
    summary: "Rus tilida fe'llarning shaxslar bo'yicha o'zgarishi: 1-va 2-tuslanish qoidalari.",
    theory: `
      ### 1-е спряжение (1-tuslanish -АТЬ, -ЯТЬ, -ЕТЬ):
      * Я чита**ю** (Men o'qiyapman)
      * Ты чита**ешь** (Sen o'qiyapsan)
      * Он/Она чита**ет** (U o'qiyapti)
      * Мы чита**ем** (Biz o'qiyapmiz)
      * Вы чита**ете** (Siz o'qiyapsiz)
      * Они чита**ют** (Ular o'qiyapti)

      ### 2-е спряжение (2-tuslanish -ИТЬ):
      * Я говор**ю** (Men gapiryapman)
      * Ты говор**ишь** (Sen gapiryapsan)
      * Он/Она говор**ит** (U gapiryapti)
      * Мы говор**им** (Biz gapiryapmiz)
      * Вы говор**ите** (Siz gapiryapsiz)
      * Они говор**ят** (Ular gapiryapti)
    `,
    grammarRules: [
      {
        rule: 'Tuslanish qo\'shimchalarini eslab qolish formulası',
        formula: '1-спряжение: -ю/-у, -ешь, -ет, -ем, -ете, -ют/-ут | 2-спряжение: -ю/-у, -ишь, -ит, -им, -ите, -ят/-ат',
        examples: [
          { original: 'Мы говорим по-русски.', translation: 'Biz ruscha gapiramiz.', pronunciation: 'My govorim po-russki' },
          { original: 'Они работают в банке.', translation: 'Ular bankda ishlaydilar.', pronunciation: 'Oni rabotayut v banke' },
        ],
      },
    ],
    vocabulary: [
      {
        id: 'ru_2_1',
        word: 'Работать',
        transcription: '[rɐˈbotətʲ]',
        uzbekPronunciation: 'Rabotat',
        translationUz: 'Ishlamoq',
        partOfSpeech: 'Глагол',
        exampleSentence: 'Где вы работаете?',
        exampleTranslation: 'Siz qayerda ishlaysiz?',
        audioLang: 'ru',
      },
      {
        id: 'ru_2_2',
        word: 'Говорить',
        transcription: '[ɡəvɐˈrʲitʲ]',
        uzbekPronunciation: 'Govorit',
        translationUz: 'Gapirmoq, so\'zlamoq',
        partOfSpeech: 'Глагол',
        exampleSentence: 'Я хорошо говорю по-русски.',
        exampleTranslation: 'Men ruscha yaxshi gapiraman.',
        audioLang: 'ru',
      },
    ],
    questions: [
      {
        id: 'q_ru_2_1',
        question: '"Мы ___ по-русски каждый день." Fe\'lning to\'g\'ri shakli qaysi?',
        options: ['говорю', 'говоришь', 'говорим', 'говорят'],
        correctAnswer: 2,
        explanation: '"Мы" (biz) olmoshi bilan fe\'lga "-им" qo\'shimchasi qo\'shiladi: говорим.',
      },
      {
        id: 'q_ru_2_2',
        question: '"Работать" fe\'li qaysi tuslanishga kiradi?',
        options: ['1-е спряжение', '2-е спряжение', 'Tuslanmaydi', 'Maxsus tuslanish'],
        correctAnswer: 0,
        explanation: 'Oxiri "-ать" bilan tugagani uchun 1-tuslanish hisoblanadi.',
      },
    ],
  },
  {
    id: 3,
    subject: 'russian',
    title: 'Предложный падеж (O\'rin-payt / 6-padyej: Где? В / На)',
    level: "Boshlang'ich (A1)",
    category: 'Padyejlar',
    summary: "Qayerda? (Где?) savoliga javob beruvchi va 'В' hamda 'На' predloglari bilan keluvchi 6-padyej.",
    theory: `
      ### Предложный падеж qoidalari:
      Joylashuvni bildirganda otlarning oxiriga odatda **-е** qo'shimchasi qo'shiladi:
      * Город -> в город**е** (shaharda)
      * Школа -> в школ**е** (maktabda)
      * Работа -> на работ**е** (ishda)
      * Россия -> в Росси**и** (-ия bilan tugaydigan so'zlar -ии bo'ladi)

      **В va НА farqi:**
      * **В** (ichida): в комнате, в доме, в банке, в парке, в Ташкенте.
      * **НА** (ustida yoki ochiq joy/tadbirlar): на столе, на улице, на стадионе, на концерте, на работе, на уроке.
    `,
    grammarRules: [
      {
        rule: 'Где? savoliga javob berganda В / НА + Ot (-е)',
        formula: 'В / НА + Существительное (-е / -ии)',
        examples: [
          { original: 'Я живу в Ташкенте.', translation: 'Men Toshkentda yashayman.', pronunciation: 'Ya zhivu v Tashkente' },
          { original: 'Студенты сейчас на уроке.', translation: 'Talabalar hozir darsda.', pronunciation: 'Studenty seychas na uroke' },
        ],
      },
    ],
    vocabulary: [
      {
        id: 'ru_3_1',
        word: 'Город',
        transcription: '[ˈɡorət]',
        uzbekPronunciation: 'Gorod',
        translationUz: 'Shahar',
        partOfSpeech: 'Существительное',
        exampleSentence: 'Это красивый и древний город.',
        exampleTranslation: 'Bu chiroyli va qadimiy shahar.',
        audioLang: 'ru',
      },
      {
        id: 'ru_3_2',
        word: 'Улица',
        transcription: '[ˈulʲɪtsə]',
        uzbekPronunciation: 'Ulitsa',
        translationUz: 'Ko\'cha',
        partOfSpeech: 'Существительное',
        exampleSentence: 'Дети играют на улице.',
        exampleTranslation: 'Bolalar ko\'chada o\'ynashyapti.',
        audioLang: 'ru',
      },
    ],
    questions: [
      {
        id: 'q_ru_3_1',
        question: '"Я сейчас нахожусь ___ (Москва)." To\'g\'ri shaklni tanlang:',
        options: ['в Москву', 'в Москве', 'на Москве', 'о Москве'],
        correctAnswer: 1,
        explanation: 'Moskvada - "в Москве" bo\'ladi (6-padyej, -е qo\'shimchasi).',
      },
      {
        id: 'q_ru_3_2',
        question: '"Ishda" ma\'nosida qaysi variant to\'g\'ri?',
        options: ['в работу', 'в работе', 'на работе', 'к работе'],
        correctAnswer: 2,
        explanation: '"Работа" so\'zi bilan "на" predlogi ishlatiladi: на работе.',
      },
    ],
  },
];

const RUSSIAN_TOPICS = [
  { cat: 'Padyejlar (Падежи)', titles: ['Родительный падеж (Kogo? Chego? - Ot/Sifat qo\'shimchalari)', 'Родительный падеж с предлогами: из, с, до, для, без, около', 'Дательный падеж (Komu? Chemu? - Berish, yo\'nalish)', 'Дательный падеж с предлогами: к, по, благодаря, вопреки', 'Винительный падеж (Kogo? Chto? - Jonli va jonsiz otlar)', 'Винительный падеж yo\'nalish ma\'nosida: Куда? В / На', 'Творительный падеж (Kem? Chem? - Qurol va birgalik: с кем?)', 'Творительный падеж kasb-hunar va sifatlar bilan: быть врачом', 'Предложный падеж haqida gapirganda: О ком? О чём?', 'Ko\'plikdagi padyej qo\'shimchalari (Множественное число во всех падежах)'] },
  { cat: 'Fe\'llar va Harakat (Глаголы)', titles: ['Глаголы движения без приставок: идти / ходить', 'Глаголы движения: ехать / ездить, бежать / бегать', 'Приставочные глаголы движения: прийти, уйти, войти, выйти', 'Приставочные глаголы: перейти, дойти, зайти, объехать', 'Виды глаголов: Совершенный и Несовершенный вид (СВ / НСВ)', 'Особенности употребления СВ и НСВ в прошедшем и будущем времени', 'Возвратные глаголы на -СЯ и -СЬ (Учиться, встречаться)', 'Повелительное наклонение (Buyruq mayli: Читай! Читайте!)', 'Условное и сослагательное наклонение (Shart mayli: Если бы...)'] },
  { cat: 'Nutq, Sintaksis va Boyitish', titles: ['Причастия (Sifatdoshlar: читающий, прочитанный)', 'Деепричастия (Ravishdoshlar: читая, прочитав)', 'Сложноподчиненные предложения (который, потому что, чтобы)', 'Числительные: Miqdor va tartib sonlarning turlanishi (Склонение числительных)', 'Собирательные числительные: двое, трое, четверо', 'Сравнительная и превосходная степень прилагательных (Kattaroq, Eng katta)', 'Наречия времени, места и образа действия', 'Ударение и интонация в русском языке', 'Фразеологизмы и крылатые выражения', 'Деловой русский язык: расписки, заявления, резюме'] }
];

let ruCounter = 4;
for (let i = 0; ruCounter <= 120; i++) {
  const catObj = RUSSIAN_TOPICS[i % RUSSIAN_TOPICS.length];
  const topicTitle = catObj.titles[(ruCounter - 4) % catObj.titles.length] || `Chuqurlashtirilgan mavzu ${ruCounter}`;
  
  let level = "Boshlang'ich (A1-A2)";
  if (ruCounter > 30 && ruCounter <= 70) level = "O'rta (B1-B2)";
  if (ruCounter > 70) level = "Yuqori & Rasmiy (C1-C2)";

  RUSSIAN_LESSONS.push({
    id: ruCounter,
    subject: 'russian',
    title: `${ruCounter}-Dars: ${topicTitle}`,
    level,
    category: catObj.cat,
    summary: `${topicTitle} bo'yicha batafsil grammatika, gap tuzish qoidalari, so'zlar va testlar.`,
    theory: `
      ### ${topicTitle} bo'yicha qoidalar:
      Rus tili grammatikasining ushbu muhim bo'limida **${topicTitle}** tushunchasi va uni og'zaki hamda yozma nutqda xatosiz qo'llash sirlarini o'rganamiz.

      **Muhim eslatmalar:**
      1. Padyej va fe'l zamonlari mosligiga qat'iy e'tibor bering.
      2. Urg'u (ударение) qayerga tushishini talaffuz tugmasi orqali eshiting.
      3. Yangi so'zlarni gaplar ichida qo'llab yod oling.
    `,
    grammarRules: [
      {
        rule: `${topicTitle} uchun namunaviy qoida va tuzilma`,
        formula: 'Ega + Moslashgan Fe\'l / Padyej shakli + Bog\'lovchi + Ikkinchi darajali bo\'lak',
        examples: [
          { original: `Это прекрасный пример употребления темы: ${topicTitle.toLowerCase()}.`, translation: `Bu mavzuni qo'llashga ajoyib misoldir.`, pronunciation: 'Eto prekrasny primer upotrebleniya' },
          { original: 'Повторение — мать учения.', translation: 'Qaytarish - bilimning onasidir.', pronunciation: 'Povtoreniye - mat ucheniya' },
        ],
      },
    ],
    vocabulary: [
      {
        id: `ru_${ruCounter}_1`,
        word: topicTitle.split(' ')[0] || 'Знание',
        transcription: '[ˈznanʲɪjə]',
        uzbekPronunciation: 'Znaniye',
        translationUz: 'Bilim, ilm',
        partOfSpeech: 'Существительное',
        exampleSentence: 'Знание языков открывает все двери.',
        exampleTranslation: 'Tillar bilish barcha eshiklarni ochadi.',
        audioLang: 'ru',
      },
      {
        id: `ru_${ruCounter}_2`,
        word: 'Успех',
        transcription: '[ʊˈspʲex]',
        uzbekPronunciation: 'Uspex',
        translationUz: 'Muvaffaqiyat, yutuq',
        partOfSpeech: 'Существительное',
        exampleSentence: 'Желаю вам огромного успеха в учёбе!',
        exampleTranslation: 'O\'qishingizda ulkan muvaffaqiyatlar tilayman!',
        audioLang: 'ru',
      },
      {
        id: `ru_${ruCounter}_3`,
        word: 'Развивать',
        transcription: '[rəzvʲɪˈvatʲ]',
        uzbekPronunciation: 'Razvivat',
        translationUz: 'Rivojlantirmoq, o\'stirmoq',
        partOfSpeech: 'Глагол',
        exampleSentence: 'Каждый день нужно развивать свои навыки.',
        exampleTranslation: 'Har kuni o\'z ko\'nikmalarini rivojlantirish kerak.',
        audioLang: 'ru',
      },
    ],
    questions: [
      {
        id: `q_ru_${ruCounter}_1`,
        question: `"${topicTitle}" mavzusiga mos to'g'ri qoidani belgilang:`,
        options: [
          'Rus tilida barcha so\'zlar bir xil qo\'shimcha oladi',
          'Urg\'u, rod va zamon qoidalariga qat\'iy amal qilinadi',
          'Faqat yozma shaklda ishlatiladi',
          'Predloglar bilan birikmaydi',
        ],
        correctAnswer: 1,
        explanation: 'Rus tili fleksiv til bo\'lib, rod, son va kelishik qoidalariga aniq amal qilinadi.',
      },
      {
        id: `q_ru_${ruCounter}_2`,
        question: '"Знание" so\'zining o\'zbekcha ma\'nosi nima?',
        options: ['Kitob', 'Bilim / Ilm', 'Maktab', 'O\'qituvchi'],
        correctAnswer: 1,
        explanation: 'Знание - bilim, ilm-ma\'rifat degani.',
      },
      {
        id: `q_ru_${ruCounter}_3`,
        question: '"Успех" so\'zining ma\'nosi qaysi javobda to\'g\'ri?',
        options: ['Muvaffaqiyat', 'Omadsizlik', 'Imtihon', 'Vaqt'],
        correctAnswer: 0,
        explanation: 'Успех - muvaffaqiyat, g\'alaba.',
      },
    ],
  });
  ruCounter++;
}
