"use server";

import { revalidatePath } from "next/cache";

import { isAdmin } from "@/lib/admin-auth";
import { db } from "@/lib/db";

export type FormState = { error: string; saved?: boolean };

const validPath = (s: string) => s.startsWith("/") && !s.startsWith("//");

export async function saveAbout(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!(await isAdmin())) return { error: "دسترسی ندارید." };

  const title = String(formData.get("title") ?? "").trim().slice(0, 120);
  const intro = String(formData.get("intro") ?? "").trim().slice(0, 500);
  const story = String(formData.get("story") ?? "").trim().slice(0, 6000);
  const photos = formData.getAll("photos").map(String).filter(validPath).slice(0, 8);

  const sv = formData.getAll("stats_value").map((s) => String(s).trim());
  const sl = formData.getAll("stats_label").map((s) => String(s).trim());
  const stats = sv
    .map((value, i) => ({ value: value.slice(0, 16), label: (sl[i] ?? "").slice(0, 40) }))
    .filter((s) => s.value && s.label)
    .slice(0, 4);

  const pt = formData.getAll("principles_title").map((s) => String(s).trim());
  const px = formData.getAll("principles_text").map((s) => String(s).trim());
  const principles = pt
    .map((t, i) => ({ title: t.slice(0, 60), text: (px[i] ?? "").slice(0, 200) }))
    .filter((p) => p.title)
    .slice(0, 6);

  if (title.length < 2) return { error: "عنوان صفحه را وارد کنید." };

  const data = {
    title,
    intro,
    story,
    photos: JSON.stringify(photos),
    stats: JSON.stringify(stats),
    principles: JSON.stringify(principles),
  };

  await db.aboutPage.upsert({ where: { id: 1 }, update: data, create: { id: 1, ...data } });

  revalidatePath("/", "layout");
  return { error: "", saved: true };
}