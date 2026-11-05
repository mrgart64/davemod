"use client"

import Abilities from "./components/Abilities";
import Contact from "./components/Contact";
import DonateModal from "./components/DonateModal";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Logo from "./components/Logo";
import MessageDetector from "./components/MessageDetector";
import Navbar from "./components/Navbar";
import StarField from "./components/StarField";
import useModal from "./state/useModal";

const links = [
  {
    href: "https://github.com/cloudflare/vinext",
    label: "vinext",
  },
  {
    href: "https://developers.cloudflare.com/workers/",
    label: "Workers",
  },
];

// export const revalidate = 300;



export default function Home() {
  const modal = useModal()

  return (
    <>
      <DonateModal isOpen={modal.isOpen} onClose={() => modal.onClose()} />

      <main className="min-h-screen bg-white relative isolate overflow-x-hidden">

        {/* 1. Background StarField (Fixed di belakang dengan z-0) */}
        <StarField />

        {/* 2. Seluruh Konten Utama dibungkus dengan z-10 agar posisinya di atas StarField */}
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <div className="py-16 w-full font-mono scroll-mt-24 z-50 bg-white border-t border-neutral-300">
            <MessageDetector />
          </div>
          <div className="py-16 w-full font-mono scroll-mt-24 z-50 bg-neutral-50 border-t border-neutral-300">
            <Abilities />
          </div>
          <div className="pt-16 w-full font-mono scroll-mt-24 z-50 bg-white border-t border-neutral-300">
            <Contact />
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}