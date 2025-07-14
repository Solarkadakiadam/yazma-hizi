"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function useSEO() {
  const { t, language } = useLanguage();

  useEffect(() => {
    // Update document title
    document.title = t.seoTitle;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t.seoDescription);
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.name = "description";
      newMetaDescription.content = t.seoDescription;
      document.head.appendChild(newMetaDescription);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", t.seoKeywords);
    } else {
      const newMetaKeywords = document.createElement("meta");
      newMetaKeywords.name = "keywords";
      newMetaKeywords.content = t.seoKeywords;
      document.head.appendChild(newMetaKeywords);
    }

    // Update html lang attribute
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("lang", language);

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", t.seoTitle);
    } else {
      const newOgTitle = document.createElement("meta");
      newOgTitle.setAttribute("property", "og:title");
      newOgTitle.setAttribute("content", t.seoTitle);
      document.head.appendChild(newOgTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", t.seoDescription);
    } else {
      const newOgDescription = document.createElement("meta");
      newOgDescription.setAttribute("property", "og:description");
      newOgDescription.setAttribute("content", t.seoDescription);
      document.head.appendChild(newOgDescription);
    }

  }, [t, language]);
} 