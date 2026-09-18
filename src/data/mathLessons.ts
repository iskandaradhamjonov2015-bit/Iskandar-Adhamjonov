import { Lesson } from '../types';

export const MATH_LESSONS: Lesson[] = [
  {
    id: 1,
    subject: 'math',
    title: 'Natural sonlar, Arifmetik amallar va Amallar tartibi',
    level: "Boshlang'ich (5-6 sinf)",
    category: 'Arifmetika & Qoidalar',
    summary: "Natural sonlar ustida 4 asosiy amal, qavslar va amallar ketma-ketligi (PEMDAS) qoidalari.",
    theory: `
      ### Amallar tartibi qoidasi:
      Matematik ifodalarda amallar qat'iy ketma-ketlikda bajariladi:
      1. **Qavs ichidagi amallar** (eng ichki qavsdan boshlab)
      2. **Darajaga ko'tarish va Ildiz chiqarish**
      3. **Ko'paytirish va Bo'lish** (chapdan o'ngga qarab)
      4. **Qo'shish va Ayirish** (chapdan o'ngga qarab)

      *Misol:* 10 + 2 × (6 - 1)² = 10 + 2 × (5)² = 10 + 2 × 25 = 10 + 50 = **60**
    `,
    mathFormulas: [
      {
        name: 'Qo\'shish va Ko\'paytirish qonunlari',
        formula: 'a + b = b + a (O\'rin almashtirish) | a · (b + c) = a·b + a·c (Taqsimot qonuni)',
        description: 'Taqsimot qonuni orqali ifodalarni qavslardan ochish va soddalashtirish osonlashadi.',
        sampleProblem: '25 · 48 + 25 · 52 ni qulay usulda hisoblang.',
        stepByStepSolution: [
          '1-qadam: Umumiy ko\'paytuvchi 25 ni qavsdan tashqariga chiqaramiz:',
          '   = 25 · (48 + 52)',
          '2-qadam: Qavs ichidagi yig\'indini hisoblaymiz: 48 + 52 = 100',
          '3-qadam: Ko\'paytiramiz: 25 · 100 = 2500',
        ],
      },
    ],
    questions: [
      {
        id: 'q_math_1_1',
        question: 'Hisoblang: 20 - 4 × 3 + 2',
        options: ['50', '10', '26', '6'],
        correctAnswer: 1,
        explanation: 'Oldin ko\'paytirish: 4 × 3 = 12. Keyin chapdan o\'ngga: 20 - 12 = 8. Keyin: 8 + 2 = 10.',
      },
      {
        id: 'q_math_1_2',
        question: 'Taqsimot qonuni qaysi qatorda to\'g\'ri ko\'rsatilgan?',
        options: ['a + b = b + a', 'a · (b + c) = a·b + a·c', 'a - b = b - a', 'a / b = b / a'],
        correctAnswer: 1,
        explanation: 'a · (b + c) = a·b + a·c bu ko\'paytirishning qo\'shishga nisbatan taqsimot qonunidir.',
      },
      {
        id: 'q_math_1_3',
        question: '(8 + 2)² - 15 ning qiymatini toping:',
        options: ['85', '49', '100', '25'],
        correctAnswer: 0,
        explanation: '(8 + 2) = 10; 10² = 100; 100 - 15 = 85.',
      },
    ],
  },
  {
    id: 2,
    subject: 'math',
    title: 'Kasrlar (Oddiy va O\'nli kasrlar), Qisqartirish va Umumiy maxraj',
    level: "Boshlang'ich (5-6 sinf)",
    category: 'Kasrlar',
    summary: "Kasrlarni qo'shish, ayirish, ko'paytirish, bo'lish va o'nli kasrga o'tkazish usullari.",
    theory: `
      ### Kasrlar ustida amallar:
      * **Qo'shish/Ayirish:** Har doim umumiy maxrajga keltiriladi.
        $$\\frac{a}{b} + \\frac{c}{d} = \\frac{a \\cdot d + b \\cdot c}{b \\cdot d}$$
      * **Ko'paytirish:** Surat suratga, maxraj maxrajga ko'paytiriladi.
        $$\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}$$
      * **Bo'lish:** Ikkinchi kasr teskarisiga o'girilib ko'paytiriladi.
        $$\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c} = \\frac{a \\cdot d}{b \\cdot c}$$
    `,
    mathFormulas: [
      {
        name: 'Kasrlarni umumiy maxrajga keltirish',
        formula: 'EKUK(b, d) orqali umumiy maxraj topiladi',
        description: 'Turli maxrajli kasrlarni qo\'shishda EKUK topish hisoblashni soddalashtiradi.',
        sampleProblem: '1/3 + 1/6 ni hisoblang.',
        stepByStepSolution: [
          '1-qadam: 3 va 6 ning umumiy maxraji (EKUK) = 6',
          '2-qadam: Birinchi kasrni 2 ga ko\'paytiramiz: 2/6',
          '3-qadam: Qo\'shamiz: 2/6 + 1/6 = 3/6',
          '4-qadam: 3 ga qisqartiramiz: 1/2 = 0.5',
        ],
      },
    ],
    questions: [
      {
        id: 'q_math_2_1',
        question: 'Hisoblang: 2/5 + 1/10',
        options: ['3/15', '1/2', '3/10', '4/10'],
        correctAnswer: 1,
        explanation: 'Umumiy maxraj 10: 4/10 + 1/10 = 5/10 = 1/2.',
      },
      {
        id: 'q_math_2_2',
        question: '3/4 : 3/8 amalini bajaring:',
        options: ['1/2', '2', '9/32', '1'],
        correctAnswer: 1,
        explanation: '3/4 · 8/3 = 24/12 = 2.',
      },
    ],
  },
  {
    id: 3,
    subject: 'math',
    title: 'Kvadrat tenglamalar va Viyet teoremasi',
    level: "O'rta (8-sinf)",
    category: 'Algebra',
    summary: "ax² + bx + c = 0 ko'rinishidagi tenglamalarni Diskriminant va Viyet teoremasi orqali yechish.",
    theory: `
      ### Kvadrat tenglama yechish:
      Formulasi: **ax² + bx + c = 0** (a ≠ 0)
      
      **1. Diskriminant usuli:**
      $$D = b^2 - 4ac$$
      * Agar $D > 0$: ikkita haqiqiy ildiz: $x_{1,2} = \\frac{-b \\pm \\sqrt{D}}{2a}$
      * Agar $D = 0$: bitta karrali ildiz: $x = -\\frac{b}{2a}$
      * Agar $D < 0$: haqiqiy ildizlar yo'q.

      **2. Viyet teoremasi (keltirilgan x² + px + q = 0 uchun):**
      $$x_1 + x_2 = -p$$
      $$x_1 \\cdot x_2 = q$$
    `,
    mathFormulas: [
      {
        name: 'Diskriminant formulasi',
        formula: 'D = b² - 4ac; x = (-b ± √D) / (2a)',
        description: 'Ixtiyoriy kvadrat tenglamani yechishning universal formulasi.',
        sampleProblem: 'x² - 5x + 6 = 0 tenglamani yeching.',
        stepByStepSolution: [
          '1-qadam: a = 1, b = -5, c = 6',
          '2-qadam: D = (-5)² - 4·1·6 = 25 - 24 = 1',
          '3-qadam: √D = √1 = 1',
          '4-qadam: x₁ = (5 + 1) / 2 = 3;  x₂ = (5 - 1) / 2 = 2',
        ],
      },
    ],
    questions: [
      {
        id: 'q_math_3_1',
        question: 'x² - 7x + 10 = 0 tenglamaning ildizlarini toping:',
        options: ['x = 2; x = 5', 'x = -2; x = -5', 'x = 1; x = 10', 'x = 3; x = 4'],
        correctAnswer: 0,
        explanation: 'Viyet bo\'yicha: x₁ + x₂ = 7 va x₁ · x₂ = 10. Bular 2 va 5 sonlaridir.',
      },
      {
        id: 'q_math_3_2',
        question: 'D < 0 bo\'lsa kvadrat tenglama nechta haqiqiy ildizga ega?',
        options: ['2 ta', '1 ta', 'Ildizga ega emas (0 ta)', 'Cheksiz ko\'p'],
        correctAnswer: 2,
        explanation: 'Diskriminant noldan kichik bo\'lsa, haqiqiy sonlar to\'plamida ildiz mavjud emas.',
      },
    ],
  },
];

const MATH_TOPICS = [
  { cat: 'Algebra & Tenglamalar', titles: ['Chiziqli tenglamalar va proporsiyalar', 'Tenglamalar sistemasi (Qo\'shish va o\'rniga qo\'yish usullari)', 'Chiziqli va kvadrat tengsizliklar', 'Modulli tenglamalar va tengsizliklar', 'Qisqa ko\'paytirish formulalari ((a±b)², a³±b³)', 'Ko\'phadlarni ko\'paytuvchilarga ajratish', 'Irratsional tenglamalar va ildizlar', 'Ko\'rsatkichli tenglamalar (a^x = b)', 'Logarifm xossalari va logarifmik tenglamalar', 'Arifmetik progressiya (a_n = a_1 + (n-1)d)', 'Geometrik progressiya (b_n = b_1 · q^(n-1))', 'Cheksiz kamayuvchi geometrik progressiya yig\'indisi'] },
  { cat: 'Geometriya & Trigonometriya', titles: ['Uchburchaklar turlari va tenglik alomatlari', 'Pifagor teoremasi va to\'g\'ri burchakli uchburchak', 'Sinuslar va Kosinuslar teoremalari', 'Uchburchak yuzasi formulalari (Geron, 1/2 a·h, 1/2 a·b·sinC)', 'To\'rtburchaklar (Kvadrat, To\'g\'ri to\'rtburchak, Romb, Parallelogramm)', 'Trapetsiya va uning o\'rta chizig\'i hamda yuzi', 'Doira va Aylana (Yuzi S = πR², Uzunligi L = 2πR)', 'Fazoviy geometriya: Kub, Parallelepiped, Prizma hajmi va sirt yuzi', 'Piramida, Silindr, Konus va Shar hajmi', 'Trigonometrik asosiy ayniyatlar (sin²x + cos²x = 1)', 'Keltirish formulalari va qo\'shish formulalari', 'Trigonometrik tenglamalarni yechish usullari'] },
  { cat: 'Oliy Matematika & Ehtimollar', titles: ['Funksiyaning aniqlanish va qiymatlar sohasi', 'Funksiya hosilasi va uning geometrik ma\'nosi', 'Funksiyani hosila yordamida tekshirish (O\'sish, kamayish, ekstremum)', 'Boshlang\'ich funksiya va Aniqmas integral', 'Aniq integral va Nyuton-Leybnits formulasi', 'Egri chiziqli trapetsiya yuzini integral orqali hisoblash', 'Kombinatorika elementlari: O\'rinlashtirish, Guruhlash, O\'rin almashtirish', 'Ehtimollar nazariyasi klassik ta\'rifi (P = m / n)', 'Vektorlar ustida amallar (Skalyar ko\'paytma, uzunlik)', 'Matritsalar va Determinantlar (Kramer qoidasi)'] }
];

let mathCounter = 4;
for (let i = 0; mathCounter <= 120; i++) {
  const catObj = MATH_TOPICS[i % MATH_TOPICS.length];
  const topicTitle = catObj.titles[(mathCounter - 4) % catObj.titles.length] || `Matematik Mavzu ${mathCounter}`;
  
  let level = "Boshlang'ich (5-7 sinf)";
  if (mathCounter > 30 && mathCounter <= 70) level = "O'rta (8-9 sinf)";
  if (mathCounter > 70) level = "Yuqori & DTM/Olimpiada (10-11 sinf)";

  MATH_LESSONS.push({
    id: mathCounter,
    subject: 'math',
    title: `${mathCounter}-Dars: ${topicTitle}`,
    level,
    category: catObj.cat,
    summary: `${topicTitle} bo'yicha qoidalar, asosiy formulalar, namunaviy misollar va yechimlar.`,
    theory: `
      ### ${topicTitle} mavzusi bo'yicha nazariya:
      Ushbu darsda siz **${topicTitle}** tushunchasini to'liq o'zlashtirasiz. Formulalarni yod oling va namunaviy misollarning yechilish algoritmini diqqat bilan o'rganing.

      **Asosiy qoidalar:**
      1. Masalaning shartini to'g'ri tushunish va qanday kattaliklar berilganini aniqlash.
      2. Mos formulani tanlash va qiymatlarni o'rniga qo'yish.
      3. Amallarni bosqichma-bosqich xatosiz bajarish.
    `,
    mathFormulas: [
      {
        name: `${topicTitle} asosiy formulasi`,
        formula: 'F(x, y) = Matematik qoida va formula',
        description: 'Ushbu formula orqali mavzuga doir barcha standart va murakkab misollar yechiladi.',
        sampleProblem: `${topicTitle} mavzusiga oid namunaviy misol hisoblash.`,
        stepByStepSolution: [
          '1-qadam: Berilgan shartlarni yozib olamiz.',
          '2-qadam: Formulani qo\'llaymiz va tenglamani soddalashtiramiz.',
          '3-qadam: To\'g\'ri javobni hisoblab chiqaramiz.',
        ],
      },
    ],
    questions: [
      {
        id: `q_math_${mathCounter}_1`,
        question: `"${topicTitle}" mavzusidagi formulalar qanday xususiyatga ega?`,
        options: [
          'Faqat bitta son uchun amal qiladi',
          'Barcha mos matematik shartlarda qat\'iy o\'rinli bo\'ladi',
          'Faqat manfiy sonlarda ishlaydi',
          'Formulasi mavjud emas',
        ],
        correctAnswer: 1,
        explanation: 'Matematik qoidalar va teoremalar barcha aniqlanish sohasidagi qiymatlar uchun universaldir.',
      },
      {
        id: `q_math_${mathCounter}_2`,
        question: 'Tenglama va misollarni to\'g\'ri yechishda eng muhim omil nima?',
        options: [
          'Javobni taxmin qilish',
          'Amallar tartibi va qoidalarga qat\'iy rioya qilish',
          'Faqat kalkulyatordan foydalanish',
          'Shartlarni o\'qimaslik',
        ],
        correctAnswer: 1,
        explanation: 'Aniq va tartibli yechish algoritmi doimo to\'g\'ri natijaga olib keladi.',
      },
    ],
  });
  mathCounter++;
}
