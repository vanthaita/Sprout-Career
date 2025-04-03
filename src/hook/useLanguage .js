'use client'
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export const useLanguage = (namespace) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations(namespace);

  const language = useMemo(() => {
    const langSegment = pathname.split('/')[1] || 'en';
    return ['en', 'jp'].includes(langSegment) ? langSegment : 'en';
  }, [pathname]);

  const handleLanguageChange = (newLang) => {
    const newPath = pathname.replace(/^\/[^/]+/, `${newLang.toLowerCase()}`);
    console.log("NewLan",newLang);
    console.log("NewLan",newPath);
    console.log("Language: ",language)
    router.push(newPath);
  };

  return {
    t, 
    language,
    handleLanguageChange,
  };
};