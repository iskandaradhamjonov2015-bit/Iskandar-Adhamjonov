import { MathSolverResult } from '../types';

export function solveMathProblem(query: string): MathSolverResult {
  const clean = query.trim();

  // 1. Quadratic equation: ax^2 + bx + c = 0 or 2x^2 - 4x - 6 = 0
  const quadMatch = clean.replace(/\s+/g, '').match(/^([+-]?\d*)x\^?2([+-]?\d*)x([+-]?\d*)=0$/i);
  if (quadMatch) {
    let aStr = quadMatch[1];
    let bStr = quadMatch[2];
    let cStr = quadMatch[3];

    let a = aStr === '' || aStr === '+' ? 1 : aStr === '-' ? -1 : parseFloat(aStr);
    let b = bStr === '' || bStr === '+' ? 1 : bStr === '-' ? -1 : bStr ? parseFloat(bStr) : 0;
    let c = cStr ? parseFloat(cStr) : 0;

    const D = b * b - 4 * a * c;
    const steps: string[] = [
      `1-qadam: Koeffitsiyentlarni aniqlaymiz: a = ${a}, b = ${b}, c = ${c}`,
      `2-qadam: Diskriminant formulasini qo'llaymiz: D = b² - 4ac`,
      `   D = (${b})² - 4 · (${a}) · (${c}) = ${b * b} - (${4 * a * c}) = ${D}`,
    ];

    if (D < 0) {
      steps.push(`3-qadam: D = ${D} < 0 bo'lgani uchun tenglama haqiqiy sonlar to'plamida ildizlarga ega emas (bo'sh to'plam ∅).`);
      return {
        problemType: 'Kvadrat tenglama',
        expression: query,
        result: 'Haqiqiy ildizlar yo\'q (D < 0)',
        steps,
        formulaUsed: 'D = b² - 4ac; x = (-b ± √D) / (2a)',
      };
    } else if (D === 0) {
      const x = -b / (2 * a);
      steps.push(`3-qadam: D = 0 bo'lgani uchun tenglama bitta yagona (karrali) ildizga ega:`);
      steps.push(`   x = -b / (2a) = -(${b}) / (2 · ${a}) = ${x.toFixed(3).replace(/\.?0+$/, '')}`);
      return {
        problemType: 'Kvadrat tenglama',
        expression: query,
        result: `x = ${x.toFixed(3).replace(/\.?0+$/, '')}`,
        steps,
        formulaUsed: 'D = b² - 4ac; x = -b / (2a)',
      };
    } else {
      const sqrtD = Math.sqrt(D);
      const x1 = (-b + sqrtD) / (2 * a);
      const x2 = (-b - sqrtD) / (2 * a);
      steps.push(`3-qadam: D > 0 bo'lgani uchun tenglama ikkita turli haqiqiy ildizga ega:`);
      steps.push(`   x₁ = (-b + √D) / (2a) = (-(${b}) + √${D}) / (2 · ${a}) = ${x1.toFixed(3).replace(/\.?0+$/, '')}`);
      steps.push(`   x₂ = (-b - √D) / (2a) = (-(${b}) - √${D}) / (2 · ${a}) = ${x2.toFixed(3).replace(/\.?0+$/, '')}`);
      return {
        problemType: 'Kvadrat tenglama',
        expression: query,
        result: `x₁ = ${x1.toFixed(3).replace(/\.?0+$/, '')},  x₂ = ${x2.toFixed(3).replace(/\.?0+$/, '')}`,
        steps,
        formulaUsed: 'x = (-b ± √D) / (2a)',
      };
    }
  }

  // 2. Linear equation: ax + b = c
  const linMatch = clean.replace(/\s+/g, '').match(/^([+-]?\d*)x([+-]\d+)=([+-]?\d+)$/i);
  if (linMatch) {
    let aStr = linMatch[1];
    let b = parseFloat(linMatch[2]);
    let c = parseFloat(linMatch[3]);
    let a = aStr === '' || aStr === '+' ? 1 : aStr === '-' ? -1 : parseFloat(aStr);

    const steps = [
      `1-qadam: Tenglamaning ozod hadini (${b}) o'ng tarafga qarama-qarshi ishora bilan o'tkazamiz:`,
      `   ${a}x = ${c} - (${b}) => ${a}x = ${c - b}`,
      `2-qadam: Ikkala tomonni x oldidagi koeffitsiyentga (${a}) bo'lamiz:`,
      `   x = ${c - b} / ${a} = ${((c - b) / a).toFixed(3).replace(/\.?0+$/, '')}`,
    ];

    const result = ((c - b) / a).toFixed(3).replace(/\.?0+$/, '');
    return {
      problemType: 'Chiziqli tenglama',
      expression: query,
      result: `x = ${result}`,
      steps,
      formulaUsed: 'ax + b = c => x = (c - b) / a',
    };
  }

  // 3. Percentage solver: e.g. "20% of 150" or "150 ning 20%"
  const percentMatch1 = clean.match(/(\d+(?:\.\d+)?)\s*%\s*(?:of|ning|dan)?\s*(\d+(?:\.\d+)?)/i);
  const percentMatch2 = clean.match(/(\d+(?:\.\d+)?)\s*(?:ning|dan)?\s*(\d+(?:\.\d+)?)\s*%/i);
  if (percentMatch1 || percentMatch2) {
    const p = parseFloat(percentMatch1 ? percentMatch1[1] : percentMatch2![2]);
    const num = parseFloat(percentMatch1 ? percentMatch1[2] : percentMatch2![1]);
    const ans = (p * num) / 100;
    return {
      problemType: 'Foiz hisoblash',
      expression: `${num} ning ${p}% qismi`,
      result: `${ans}`,
      steps: [
        `1-qadam: Foizni kasr yoki o'nli ko'rinishga keltiramiz: ${p}% = ${p}/100 = ${(p / 100).toFixed(4).replace(/\.?0+$/, '')}`,
        `2-qadam: Berilgan sonni ko'paytiramiz: ${num} · ${p / 100} = ${ans}`,
      ],
      formulaUsed: 'Qism = (Son · Foiz) / 100',
    };
  }

  // 4. Fractions: a/b + c/d, a/b - c/d, a/b * c/d, a/b / c/d
  const fracMatch = clean.match(/^(\d+)\/(\d+)\s*([+\-*\/])\s*(\d+)\/(\d+)$/);
  if (fracMatch) {
    const num1 = parseInt(fracMatch[1]);
    const den1 = parseInt(fracMatch[2]);
    const op = fracMatch[3];
    const num2 = parseInt(fracMatch[4]);
    const den2 = parseInt(fracMatch[5]);

    if (op === '+') {
      const commonDen = den1 * den2;
      const resNum = num1 * den2 + num2 * den1;
      const gcdVal = gcd(resNum, commonDen);
      const simpNum = resNum / gcdVal;
      const simpDen = commonDen / gcdVal;
      return {
        problemType: 'Kasrlarni qo\'shish',
        expression: `${num1}/${den1} + ${num2}/${den2}`,
        result: simpDen === 1 ? `${simpNum}` : `${simpNum}/${simpDen} (${(simpNum / simpDen).toFixed(3)})`,
        steps: [
          `1-qadam: Umumiy maxraj topamiz: ${den1} va ${den2} uchun maxraj = ${commonDen}`,
          `2-qadam: Suratlarni mos ravishda ko'paytirib qo'shamiz: (${num1} · ${den2} + ${num2} · ${den1}) / ${commonDen} = ${resNum} / ${commonDen}`,
          gcdVal > 1 ? `3-qadam: Kasrni ${gcdVal} ga qisqartiramiz: ${simpNum}/${simpDen}` : `3-qadam: Kasr qisqarmas shaklda: ${simpNum}/${simpDen}`,
        ],
        formulaUsed: 'a/b + c/d = (a·d + b·c) / (b·d)',
      };
    }
  }

  // 5. Trigonometric query: sin(30), cos(45), tg(60), ctg(45)
  const trigMatch = clean.toLowerCase().match(/^(sin|cos|tg|tan|ctg|cot)\((\d+(?:\.\d+)?)\)$/);
  if (trigMatch) {
    const fn = trigMatch[1];
    const deg = parseFloat(trigMatch[2]);
    const rad = (deg * Math.PI) / 180;
    let res = 0;
    let exact = '';

    if (fn === 'sin') {
      res = Math.sin(rad);
      if (deg === 30) exact = '1/2 = 0.5';
      else if (deg === 45) exact = '√2 / 2 ≈ 0.7071';
      else if (deg === 60) exact = '√3 / 2 ≈ 0.8660';
      else if (deg === 90) exact = '1';
      else if (deg === 0 || deg === 180) exact = '0';
    } else if (fn === 'cos') {
      res = Math.cos(rad);
      if (deg === 30) exact = '√3 / 2 ≈ 0.8660';
      else if (deg === 45) exact = '√2 / 2 ≈ 0.7071';
      else if (deg === 60) exact = '1/2 = 0.5';
      else if (deg === 90) exact = '0';
      else if (deg === 0) exact = '1';
    } else if (fn === 'tg' || fn === 'tan') {
      res = Math.tan(rad);
      if (deg === 45) exact = '1';
      else if (deg === 30) exact = '√3 / 3 ≈ 0.5774';
      else if (deg === 60) exact = '√3 ≈ 1.732';
      else if (deg === 90) exact = 'Mavjud emas (∞)';
    } else {
      res = 1 / Math.tan(rad);
      if (deg === 45) exact = '1';
      else if (deg === 30) exact = '√3 ≈ 1.732';
      else if (deg === 60) exact = '√3 / 3 ≈ 0.5774';
    }

    return {
      problemType: 'Trigonometrik hisoblash',
      expression: `${fn}(${deg}°)`,
      result: exact || res.toFixed(4),
      steps: [
        `1-qadam: Burchakni radianga o'giramiz: α = ${deg}° · π / 180° = ${(deg * Math.PI / 180).toFixed(4)} rad`,
        `2-qadam: Trigonometrik doira va jadval qiymatlaridan foydalanamiz:`,
        `   ${fn}(${deg}°) = ${exact || res.toFixed(4)}`,
      ],
      formulaUsed: `${fn}(α) trigonometrik funksiyasi`,
    };
  }

  // 6. General Math arithmetic evaluation (e.g. 2 * (3 + 5)^2 or 125 * 4 - 80 / 2)
  try {
    // Replace friendly operators
    const sanitized = clean
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/\^/g, '**')
      .replace(/sqrt\(([^)]+)\)/gi, 'Math.sqrt($1)')
      .replace(/pi/gi, 'Math.PI');

    if (/^[0-9+\-*/().\s*MathPIsqrt]+$/.test(sanitized)) {
      // Safe math evaluation
      const evaluated = Function(`"use strict"; return (${sanitized})`)();
      if (typeof evaluated === 'number' && !isNaN(evaluated)) {
        const rounded = Number.isInteger(evaluated) ? evaluated.toString() : evaluated.toFixed(4).replace(/\.?0+$/, '');
        return {
          problemType: 'Arifmetik ifodani hisoblash',
          expression: clean,
          result: rounded,
          steps: [
            `1-qadam: Amallar ketma-ketligini bajaramiz (Qavslar -> Darajalar -> Ko'paytirish/Bo'lish -> Qo'shish/Ayirish)`,
            `2-qadam: Berilgan ifoda: ${clean}`,
            `3-qadam: Yakuniy natija: ${rounded}`,
          ],
          formulaUsed: 'Arifmetika qoidalari (PEMDAS)',
        };
      }
    }
  } catch (e) {
    // continue to fallback
  }

  // Fallback default message
  return {
    problemType: 'Matematik yechim',
    expression: clean,
    result: 'Qoidalar bo\'yicha yechim',
    steps: [
      `Misol: ${clean}`,
      `Bu misolni yechish uchun algebraik formulalar va bosqichma-bosqich qoidalardan foydalaniladi.`,
      `Masalan: Kvadrat tenglama uchun "ax^2 + bx + c = 0", foiz uchun "20% of 100", trigonometriya uchun "sin(30)" ko'rinishida yozing.`,
    ],
  };
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}
