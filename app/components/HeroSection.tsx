'use client';

import StarFall from "./StarFall";
import StarField from "./StarField";

export default function HeroSection() {
    const scrollToDetector = () => {
        const targetElement = document.getElementById('analisis-pesan');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* <StarField /> */}
            <section className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto font-mono" id="home">
                {/* Container Grid 2 Kolom */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* KOLOM KIRI: Headline, Description & CTA */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left">
                        {/* Badge Indicator Monokrom */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-400 text-neutral-900 text-xs font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-neutral-800 animate-pulse"></span>
                            <span>Guardians of the Digital Space // MIT-WEEK 2026</span>
                        </div>

                        {/* Headline Utama */}
                        <h1 className="text-2xl sm:text-2xl lg:text-4xl text-neutral-900 tracking-tight mb-6 leading-[1.12]">
                            Deteksi Pesan Penipuan <br />
                            <span className="text-neutral-900 font-normal">
                                dengan <span className="font-bold italic">DaveMod</span>.
                            </span>
                        </h1>

                        {/* Subtitle Deskripsi */}
                        <p className="text-sm sm:text-base text-neutral-800 max-w-xl mb-8 leading-relaxed">
                            DaveMod adalah AI moderasi pesan berbasis neural network yang dilatih dengan dataset dari berbagai jenis pesan, dilengkapi dengan visualisasi diagram yang menampilkan beberapa kemungkinan pesan dan juga memberikan saran tentang apa yang harus dilakukan. DaveMod sangat responsif dan ringan karena tidak menggunakan API AI eksternal.
                            {/* Platform pelindung interaktif untuk memberdayakan anak muda Indonesia agar mampu mengenali jebakan di dunia digital—mulai dari lowongan kerja palsu, <i>giveaway</i>, akun menyamar, hingga informasi menyesatkan—serta tahu persis apa yang harus dilakukan. */}
                        </p>

                        {/* Tombol CTA */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <button
                                onClick={scrollToDetector}
                                className="w-full sm:w-auto px-7 py-3.5 bg-neutral-800 hover:bg-neutral-900 text-neutral-50 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm group"
                            >
                                <span>Coba Sekarang!</span>
                                <svg
                                    className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </button>

                            <a
                                href="#tentang"
                                className="w-full sm:w-auto px-7 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-400/80 rounded-xl text-sm font-semibold transition-all text-center"
                            >
                                Install DaveMod
                            </a>
                        </div>
                    </div>

                    {/* KOLOM KANAN: Cara Kerja / Pillar Cards (Recognize, Learn, Act) */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1">
                            // Pilar Pengembangan Solusi
                        </div>

                        {/* Card 01 - Recognize */}
                        <div className="p-5 rounded-2xl bg-white border border-neutral-400/80 shadow-sm hover:border-neutral-400 transition-all">
                            <div className="font-mono text-xs text-neutral-500 mb-1">01 / RECOGNIZE</div>
                            <h3 className="font-bold text-sm text-neutral-900 mb-1 font-mono">Mengenali (Recognize)</h3>
                            <p className="text-xs text-neutral-700 leading-relaxed">
                                Membantu pengguna menilai pesan, tautan, tawaran, atau profil mencurigakan dengan menunjukkan tanda bahaya dan alasannya.
                            </p>
                        </div>

                        {/* Card 02 - Learn */}
                        <div className="p-5 rounded-2xl bg-white border border-neutral-400/80 shadow-sm hover:border-neutral-400 transition-all">
                            <div className="font-mono text-xs text-neutral-500 mb-1">02 / LEARN</div>
                            <h3 className="font-bold text-sm text-neutral-900 mb-1 font-mono">Belajar (Learn)</h3>
                            <p className="text-xs text-neutral-700 leading-relaxed">
                                Melatih kemampuan mental pengguna melalui skenario realistis, simulasi interaktif, latihan pengambilan keputusan, dan umpan balik.
                            </p>
                        </div>

                        {/* Card 03 - Act */}
                        <div className="p-5 rounded-2xl bg-white border border-neutral-400/80 shadow-sm hover:border-neutral-400 transition-all">
                            <div className="font-mono text-xs text-neutral-500 mb-1">03 / ACT</div>
                            <h3 className="font-bold text-sm text-neutral-900 mb-1 font-mono">Bertindak (Act)</h3>
                            <p className="text-xs text-neutral-700 leading-relaxed">
                                Memandu pengguna menentukan langkah selanjutnya, seperti daftar periksa keamanan, pengamanan akun, panduan pelaporan, dan cara memperingatkan orang lain.
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}