import { Nunito } from "next/font/google";
import { PT_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/section/navbar";
import Footer from "@/components/section/footer";
import JobProvider from "@/provider/job.provider";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Sprout",
  description: "Cultivate Your Tech Career in Japan",
};

export default async function RootLayout({
  children,
  params
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${ptSans.variable} antialiased relative scroll-custom`} suppressHydrationWarning
      >
        <NextIntlClientProvider>
          <div className="texture " />
            <Navbar/>
            <JobProvider>
              {children}
            </JobProvider>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}