import { connection } from "next/server";

import { db } from "./db";
import { parseList } from "./json-list";

export type AboutStat = { value: string; label: string };
export type AboutPrinciple = { title: string; text: string };

export type About = {
  title: string;
  intro: string;
  story: string;
  photos: string[]; // عکس اول، عکس بزرگ بالای صفحه است
  stats: AboutStat[];
  principles: AboutPrinciple[];
};

// تا وقتی مدیر از پنل چیزی ننوشته، این متن‌های خنثی نشان داده می‌شود
export const ABOUT_DEFAULTS: About = {
  title: "درباره MDF Factory",
  intro: "طراحی، ساخت و نصب کمد، سرویس نوزاد و دکوراسیون داخلی با MDF، مستقیم از کارخانه.",
  story:
    "ما در MDF Factory محصولات MDF را از طراحی تا نصب در یک مجموعه انجام می‌دهیم. هر سفارش مطابق اندازهٔ فضای شما برش می‌خورد، روکش می‌شود و توسط تیم خودمان نصب می‌شود.\n\nاگر محصول موردنظرتان را در سایت پیدا نکردید، می‌توانید درخواست مشاوره بدهید تا طرح اختصاصی برایتان آماده کنیم.",
  photos: [],
  stats: [],
  principles: [
    { title: "ساخت سفارشی", text: "ابعاد، رنگ و جزئیات هر محصول را مطابق نیاز شما می‌سازیم." },
    { title: "تولید و نصب در یک جا", text: "از برش تا نصب را تیم خودمان انجام می‌دهد." },
    { title: "قیمت شفاف", text: "چون تولید و فروش یک جاست، قیمت‌ها شفاف و بدون واسطه است." },
  ],
};

function objects(value: string): Record<string, unknown>[] {
  try {
    const data = JSON.parse(value);
    return Array.isArray(data) ? data.filter((x) => x && typeof x === "object") : [];
  } catch {
    return [];
  }
}

const str = (v: unknown) => (typeof v === "string" ? v : "");

export const parseStats = (value: string): AboutStat[] =>
  objects(value)
    .map((o) => ({ value: str(o.value), label: str(o.label) }))
    .filter((s) => s.value && s.label);

export const parsePrinciples = (value: string): AboutPrinciple[] =>
  objects(value)
    .map((o) => ({ title: str(o.title), text: str(o.text) }))
    .filter((p) => p.title);

export async function getAbout(): Promise<About> {
  await connection();
  const row = await db.aboutPage.findUnique({ where: { id: 1 } });
  if (!row) return ABOUT_DEFAULTS;

  return {
    title: row.title || ABOUT_DEFAULTS.title,
    intro: row.intro || ABOUT_DEFAULTS.intro,
    story: row.story || ABOUT_DEFAULTS.story,
    photos: parseList(row.photos),
    stats: parseStats(row.stats),
    principles: parsePrinciples(row.principles),
  };
}