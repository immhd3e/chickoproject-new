import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { getAbout } from "@/lib/about";

export const instant = false;
export const metadata: Metadata = { title: "درباره ما" };

const PLACEHOLDER = "/images/categories/wardrobe.jpg";

export default async function AboutPage() {
  const about = await getAbout();
  const [main, ...gallery] = about.photos;
  const paragraphs = about.story.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);

  return (
    <>
      {/* معرفی + عکس اصلی */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-3xl font-bold leading-[1.5] text-stone-950 sm:text-4xl lg:text-5xl">{about.title}</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-stone-600 sm:text-lg">{about.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="rounded-xl bg-stone-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-700">
              مشاهده محصولات
            </Link>
            <Link href="/contact" className="rounded-xl border border-stone-300 px-6 py-3.5 text-sm font-semibold text-stone-800 transition hover:border-amber-600 hover:text-amber-700">
              درخواست مشاوره
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-stone-200 bg-stone-100">
          <Image
            src={main ?? PLACEHOLDER}
            alt={about.title}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* داستان ما */}
      {paragraphs.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl font-bold text-stone-950 sm:text-3xl">داستان ما</h2>
            <div className="mt-6 space-y-5">
              {paragraphs.map((p, i) => (
                <p key={i} className="whitespace-pre-line leading-9 text-stone-600">{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* آمار (فقط وقتی مدیر وارد کرده باشد) */}
      {about.stats.length > 0 && (
        <section className="bg-stone-950 py-14 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 text-center sm:grid-cols-2 lg:grid-cols-4">
            {about.stats.map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-bold text-amber-400 sm:text-5xl">{s.value}</p>
                <p className="mt-2 text-sm text-stone-300">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* اصول کاری */}
      {about.principles.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <h2 className="text-2xl font-bold text-stone-950 sm:text-3xl">چرا ما؟</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {about.principles.map((p) => (
              <div key={p.title} className="rounded-2xl border border-stone-200 bg-white p-7">
                <h3 className="font-bold text-stone-950">{p.title}</h3>
                {p.text && <p className="mt-2 text-sm leading-7 text-stone-500">{p.text}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* گالری */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-16 sm:pb-20">
          <h2 className="text-2xl font-bold text-stone-950 sm:text-3xl">گوشه‌ای از کار ما</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
                <Image src={src} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* دعوت به تماس */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl bg-amber-600 px-6 py-12 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">برای ساخت محصول موردنظرتان با ما تماس بگیرید</h2>
          <p className="mx-auto mt-3 max-w-md text-amber-50">اندازه یا عکس فضایتان را بفرستید تا قیمت تقریبی را همان روز بگیرید.</p>
          <Link href="/contact" className="mt-7 inline-block rounded-full bg-stone-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-stone-800">
            درخواست مشاوره
          </Link>
        </div>
      </section>
    </>
  );
}