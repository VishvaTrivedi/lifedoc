import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/ReduxProvider";
<<<<<<< HEAD
import VoiceAssistant from "@/components/VoiceAssistant";

const inter = Inter({ subsets: ["latin"] });
=======
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SpeechInput from "@/app/Components/SpeechInput";
>>>>>>> ishita

export const metadata: Metadata = {
  title: "LifeDoc - Your Health Documentation",
  description: "Create, organize, and share your medical records",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body className={inter.className}>
=======
      <body className="antialiased">
>>>>>>> ishita
        <ReduxProvider>
          {children}
          <VoiceAssistant />
        </ReduxProvider>
        <LanguageSwitcher />
        <SpeechInput />
      </body>
    </html>
  );
}
