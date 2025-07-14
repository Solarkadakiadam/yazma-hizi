"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "tr" | "az" | "es";

export const translations = {
  tr: {
    // Header
    title: "Yazma Hızı Testi",
    subtitle:
      "Parmakların ne kadar hızlı? 1 dakikalık yazma testiyle hemen öğren! Her kelimeyi yazıp boşluk tuşuna bas. Süre sonunda DKHS ve DKS skorunu göreceksin. Bol şans!",
    lastScore: "Son skorun:",
    noTestYet: "Henüz test yapılmadı.",

    // Stats
    cpm: "DKHS",
    wpm: "DKS",
    timeLeft: "Kalan Süre",
    restart: "Yeniden Başlat",

    // Input
    placeholder: "Kelimeyi yazıp boşluk bırakın...",

    // Results
    testCompleted: "Test Tamamlandı!",
    correctWords: "Doğru Kelime",
    totalWords: "Toplam Kelime",
    shareResult: "Sonucu Paylaş",

    // Info sections
    whyThisTest: "Neden Bu Test?",
    whyThisTestContent:
      "Bu yazma hızı testi, özellikle Türkçe ana dili olanlar için hazırlandı. Kullanılan kelimeler, günlük hayatta en çok karşılaşılan ve kolayca yazılabilen kök Türkçe kelimelerden seçildi. Böylece, okuma zorluğu olmadan gerçek yazma hızınızı ölçebilirsiniz.",

    turkishSpecific: "Türkçe'ye Özel",
    turkishSpecificContent:
      "Birçok yazma testi İngilizce kelimelerle hazırlanıyor. Biz ise, Türkçe'nin yapısına uygun, sade ve anlaşılır bir deneyim sunmak istedik. Amacımız, herkesin kendi ana dilinde yazma hızını adil ve eğlenceli şekilde test edebilmesi.",

    ourGoal: "Hedefimiz",
    ourGoalContent:
      "Yazma hızınızı artırmak, klavye kullanımınızı geliştirmek ve Türkçe'yi daha hızlı yazabilmenize yardımcı olmak! Testi tekrar tekrar yaparak gelişiminizi takip edebilirsiniz. Sonuçlarda DKHS (Dakikada Harf Sayısı) ve DKS (Dakikada Kelime Sayısı) değerlerinizi görebilirsiniz.",

    feedback: "Geri Bildirim",
    feedbackContent:
      "Her türlü öneri ve görüşünüz bizim için değerli. Daha iyi bir deneyim için bize ulaşabilirsiniz.",

    footer: "(c) 2025 Yazma Hızı Testi — Türkçe için, herkes için.",
    author: "Hazırlayan: Ömer Avşar",

    // SEO
    seoTitle: "Yazma Hızı Testi - Türkçe",
    seoDescription:
      "Türkçe yazma hızınızı test edin ve geliştirin. Ücretsiz online yazma hızı testi uygulaması.",
    seoKeywords: "yazma hızı, typing speed, türkçe, test, klavye, hız testi",
  },
  az: {
    // Header
    title: "Yazma Sürəti Testi",
    subtitle:
      "Barmaqların nə qədər sürətli? 1 dəqiqəlik yazma testi ilə dərhal öyrən! Hər sözü yazıb boşluq düyməsinə bas. Vaxt bitəndə DSHS və DSS skorunu görəcəksən. Bol şans!",
    lastScore: "Son skorun:",
    noTestYet: "Hələ test edilməyib.",

    // Stats
    cpm: "DSHS",
    wpm: "DSS",
    timeLeft: "Qalan Vaxt",
    restart: "Yenidən Başlat",

    // Input
    placeholder: "Sözü yazıb boşluq buraxın...",

    // Results
    testCompleted: "Test Tamamlandı!",
    correctWords: "Düzgün Söz",
    totalWords: "Ümumi Söz",
    shareResult: "Nəticəni Paylaş",

    // Info sections
    whyThisTest: "Niyə Bu Test?",
    whyThisTestContent:
      "Bu yazma sürəti testi, xüsusilə Azərbaycan Türkcəsi ana dili olanlar üçün hazırlanıb. İstifadə olunan sözlər, gündəlik həyatda ən çox rastlaşılan və asanlıqla yazıla bilən kök Azərbaycan sözlərindən seçilib. Beləliklə, oxuma çətinliyi olmadan həqiqi yazma sürətinizi ölçə bilərsiniz.",

    turkishSpecific: "Azərbaycan Türkcəsinə Xüsusi",
    turkishSpecificContent:
      "Bir çox yazma testi ingilis sözləri ilə hazırlanır. Biz isə, Azərbaycan Türkcəsinin quruluşuna uyğun, sadə və başa düşülən təcrübə təqdim etmək istədik. Məqsədimiz, hər kəsin öz ana dilində yazma sürətini ədalətli və əyləncəli şəkildə test edə bilməsidir.",

    ourGoal: "Hədəfimiz",
    ourGoalContent:
      "Yazma sürətinizi artırmaq, klaviatura istifadənizi inkişaf etdirmək və Azərbaycan Türkcəsini daha sürətli yaza bilməyinizə kömək etmək! Testi dəfələrlə edərək inkişafınızı izləyə bilərsiniz. Nəticələrdə DSHS (Dəqiqədə Hərf Sayısı) və DSS (Dəqiqədə Söz Sayısı) dəyərlərinizi görə bilərsiniz.",

    feedback: "Geri Əlaqə",
    feedbackContent:
      "Hər cür təklif və fikirləriniz bizim üçün dəyərlidir. Daha yaxşı təcrübə üçün bizə müraciət edə bilərsiniz.",

    footer:
      "(c) 2025 Yazma Sürəti Testi — Azərbaycan Türkcəsi üçün, hamı üçün.",
    author: "Hazırlayan: Ömer Avşar",

    // SEO
    seoTitle: "Yazma Sürəti Testi - Azəricə",
    seoDescription:
      "Azərbaycan Türkcəsində yazma sürətinizi test edin və inkişaf etdirin. Pulsuz online yazma sürəti testi tətbiqi.",
    seoKeywords:
      "yazma sürəti, typing speed, azəricə, test, klaviatura, sürət testi",
  },
  es: {
    // Header
    title: "Test de Velocidad de Escritura",
    subtitle:
      "¿Qué tan rápidos son tus dedos? ¡Descúbrelo con nuestro test de escritura de 1 minuto! Escribe cada palabra y presiona espacio. Al final verás tu puntuación CPM y PPM. ¡Buena suerte!",
    lastScore: "Tu último resultado:",
    noTestYet: "Aún no has hecho ningún test.",

    // Stats
    cpm: "CPM",
    wpm: "PPM",
    timeLeft: "Tiempo Restante",
    restart: "Reiniciar",

    // Input
    placeholder: "Escribe la palabra y presiona espacio...",

    // Results
    testCompleted: "¡Test Completado!",
    correctWords: "Palabras Correctas",
    totalWords: "Palabras Totales",
    shareResult: "Compartir Resultado",

    // Info sections
    whyThisTest: "¿Por Qué Este Test?",
    whyThisTestContent:
      "Este test de velocidad de escritura está especialmente diseñado para hablantes nativos de español. Las palabras utilizadas son seleccionadas de vocabulario común y raíz española que encuentras en la vida diaria. Así puedes medir tu velocidad real de escritura sin dificultades de lectura.",

    turkishSpecific: "Específico para Español",
    turkishSpecificContent:
      "Muchos tests de escritura están preparados con palabras en inglés. Nosotros quisimos ofrecer una experiencia sencilla y comprensible, adecuada para la estructura del español. Nuestro objetivo es que cada persona pueda probar su velocidad de escritura en su lengua materna de forma justa y divertida.",

    ourGoal: "Nuestro Objetivo",
    ourGoalContent:
      "¡Ayudarte a aumentar tu velocidad de escritura, mejorar el uso del teclado y escribir español más rápido! Puedes seguir tu progreso haciendo el test repetidamente. En los resultados verás tus valores CPM (Caracteres Por Minuto) y PPM (Palabras Por Minuto).",

    feedback: "Comentarios",
    feedbackContent:
      "Todas tus sugerencias y opiniones son valiosas para nosotros. Puedes contactarnos para una mejor experiencia.",

    footer:
      "(c) 2025 Test de Velocidad de Escritura — Para español, para todos.",
    author: "Preparado por: Ömer Avşar",
    
    // SEO
    seoTitle: "Test de Velocidad de Escritura - Español",
    seoDescription: "Prueba y mejora tu velocidad de escritura en español. Aplicación gratuita de test de velocidad de escritura online.",
    seoKeywords: "velocidad de escritura, typing speed, español, test, teclado, prueba de velocidad",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.tr;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr");

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
