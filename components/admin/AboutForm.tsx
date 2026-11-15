"use client";

import Link from "next/link";
import { useActionState } from "react";

import PhotoManager from "./PhotoManager";
import RowsEditor from "./RowsEditor";
import { saveAbout, type FormState } from "@/app/admin/(panel)/about/actions";
import type { About } from "@/lib/about";

const input =
  "h-12 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm text-stone-900 outline-none transition focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-100";
const area =
  "w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-7 outline-none transition focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-100";
const label = "mb-2 block text-sm font-medium text-stone-700";

export default function AboutForm({ about }: { about: About }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveAbout, { error: "" });

  return (
    <form action={action} className="space-y-6">
      <section className="space-y-5 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <div>
          <label htmlFor="title" className={label}>عنوان صفحه</label>
          <input id="title" name="title" defaultValue={about.title} className={input} />
        </div>

        <div>
          <label htmlFor="intro" className={label}>معرفی کوتاه</label>
          <textarea id="intro" name="intro" rows={3} maxLength={500} defaultValue={about.intro} className={area} />
        </div>

        <PhotoManager
          label="عکس‌ها"
          hint="چند عکس را یک‌جا انتخاب کن. عکس اول، عکس بزرگ بالای صفحه است و بقیه در گالری پایین صفحه نشان داده می‌شوند. با ستاره هر عکس را «اصلی» کن."
          initial={about.photos}
        />
      </section>

      <section className="space-y-5 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <div>
          <label htmlFor="story" className={label}>داستان ما (دربارهٔ کار و کارخانه)</label>
          <textarea id="story" name="story" rows={9} defaultValue={about.story} className={area} />
          <p className="mt-1.5 text-xs leading-6 text-stone-500">هر پاراگراف را با یک خط خالی از بعدی جدا کن.</p>
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <h2 className="font-bold text-stone-900">آمار <span className="text-sm font-normal text-stone-500">(اختیاری، تا ۴ مورد)</span></h2>
        <p className="mb-4 mt-1 text-xs leading-6 text-stone-500">مثلاً «۱۵+» با «سال تجربه». تا وقتی چیزی ننویسی، این بخش در سایت نشان داده نمی‌شود.</p>
        <RowsEditor
          name="stats"
          addLabel="افزودن آمار"
          emptyRow={{ value: "", label: "" }}
          initial={about.stats}
          fields={[
            { key: "value", placeholder: "عدد (مثلاً ۳۰۰+)", className: "w-36" },
            { key: "label", placeholder: "عنوان (مثلاً پروژهٔ انجام‌شده)", className: "flex-1" },
          ]}
        />
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <h2 className="font-bold text-stone-900">چرا ما؟ <span className="text-sm font-normal text-stone-500">(تا ۶ مورد)</span></h2>
        <p className="mb-4 mt-1 text-xs leading-6 text-stone-500">هر مورد یک عنوان کوتاه و یک توضیح یک‌خطی دارد.</p>
        <RowsEditor
          name="principles"
          addLabel="افزودن مورد"
          emptyRow={{ title: "", text: "" }}
          initial={about.principles}
          fields={[
            { key: "title", placeholder: "عنوان", className: "w-44" },
            { key: "text", placeholder: "توضیح کوتاه", className: "flex-1" },
          ]}
        />
      </section>

      <p role="alert" className="min-h-6 text-sm text-red-600">{state.error}</p>
      {state.saved && (
        <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">
          ذخیره شد. <Link href="/about" target="_blank" className="font-semibold underline">مشاهدهٔ صفحه در سایت</Link>
        </p>
      )}

      <button type="submit" disabled={pending} className="h-12 rounded-xl bg-amber-600 px-8 text-sm font-semibold text-white transition hover:bg-amber-500 disabled:opacity-60">
        {pending ? "در حال ذخیره..." : "ذخیره"}
      </button>
    </form>
  );
}