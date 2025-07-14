"use client";

import { useLanguage, Language } from "@/contexts/LanguageContext";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm text-gray-600 dark:text-gray-400">
        Dil / Dil / Idioma:
      </span>
      <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
        <button
          onClick={() => setLanguage("tr")}
          className={`px-3 py-1 text-sm font-medium transition-colors ${
            language === "tr"
              ? "bg-blue-500 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          Türkçe
        </button>
        <button
          onClick={() => setLanguage("az")}
          className={`px-3 py-1 text-sm font-medium transition-colors ${
            language === "az"
              ? "bg-blue-500 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          Azəricə
        </button>
        <button
          onClick={() => setLanguage("es")}
          className={`px-3 py-1 text-sm font-medium transition-colors ${
            language === "es"
              ? "bg-blue-500 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          Español
        </button>
      </div>
    </div>
  );
}
