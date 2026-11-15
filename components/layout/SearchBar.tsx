"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useState } from "react";

const suggestions = [
  { title: "کمد دیواری", href: "/products?category=wardrobes" },
  { title: "سرویس خواب", href: "/products?category=bedroom" },
  { title: "اتاق کودک", href: "/products?category=kids-room" },
  { title: "میز تحریر", href: "/products?category=tables-bookcases" },
];

// یکسان‌سازی «ي» و «ك» عربی با «ی» و «ک» فارسی
const normalize = (value: string) =>
  value.trim().replace(/\u064A/g, "\u06CC").replace(/\u0643/g, "\u06A9").toLowerCase();

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const q = normalize(query);
  const filteredSuggestions = suggestions.filter((s) => normalize(s.title).includes(q));
  const showSuggestions = isFocused && q.length > 0;

  return (
    <div className="relative w-full">
      {/* فرم باید بالاتر از لایهٔ بستن پیشنهادها باشد (z-50) */}
      <form
        action="/products"
        method="GET"
        className="relative z-50"
        onSubmit={() => setIsFocused(false)}
      >
        <Search
          size={19}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
        />

        <input
          type="text"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="جستجو در محصولات..."
          autoComplete="off"
          className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 px-12 pl-12 text-sm text-stone-900 outline-none transition-all placeholder:text-stone-400 focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-100"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute left-12 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-stone-400 hover:bg-stone-100"
            aria-label="پاک کردن جستجو"
          >
            <X size={16} />
          </button>
        )}

        <button
          type="submit"
          aria-label="جستجو"
          className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-stone-500 transition hover:bg-amber-100 hover:text-amber-700"
        >
          <Search size={17} />
        </button>
      </form>

      {showSuggestions && (
        <>
          <button
            type="button"
            aria-label="بستن پیشنهادها"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsFocused(false)}
          />

          <div className="absolute right-0 top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl">
            <div className="p-2">
              <Link
                href={`/products?q=${encodeURIComponent(query.trim())}`}
                onClick={() => setIsFocused(false)}
                className="flex items-center justify-between rounded-xl bg-amber-50 px-3 py-3 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
              >
                <span>جستجوی «{query.trim()}» در همهٔ محصولات</span>
                <Search size={16} />
              </Link>
            </div>

            {filteredSuggestions.length > 0 && (
              <div className="border-t border-stone-100 p-2">
                <p className="px-3 py-2 text-xs font-semibold text-stone-400">دسته‌بندی‌های پیشنهادی</p>
                {filteredSuggestions.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setIsFocused(false);
                      setQuery("");
                    }}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-stone-700 transition hover:bg-stone-50 hover:text-amber-700"
                  >
                    <span>{item.title}</span>
                    <Search size={16} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}