"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const list = images.filter(Boolean);
  if (list.length === 0) return null;

  const go = (dir: -1 | 1) => setActive((i) => (i + dir + list.length) % list.length);
  const arrow =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-800 shadow-md transition hover:bg-amber-600 hover:text-white";

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-stone-200 bg-stone-100 sm:aspect-[16/9] lg:max-h-[640px]">
        <Image
          key={list[active]}
          src={list[active]}
          alt={title}
          fill
          priority
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-contain"
        />

        {list.length > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="عکس قبلی" className={`${arrow} right-3 sm:right-5`}>
              <ChevronRight size={20} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="عکس بعدی" className={`${arrow} left-3 sm:left-5`}>
              <ChevronLeft size={20} />
            </button>
          </>
        )}
      </div>

      {list.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {list.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`عکس ${i + 1}`}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 bg-stone-100 transition ${
                i === active ? "border-amber-600" : "border-stone-200 opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}