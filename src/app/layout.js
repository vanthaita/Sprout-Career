import { Nunito } from "next/font/google";
import { PT_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/section/navbar";
import Footer from "@/components/section/footer";
import JobProvider from "@/provider/job.provider";

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

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${ptSans.variable} antialiased relative scroll-custom`}
      >
        <div className="texture " />
          <Navbar/>
          <JobProvider>
            {children}
          </JobProvider>
        <Footer />
      </body>
    </html>
  );
}