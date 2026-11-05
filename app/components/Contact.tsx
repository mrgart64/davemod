import React from 'react';
import { Mail, Globe, Cable as Github, MapPin, ShieldAlert, Camera, PhoneCall, Phone } from 'lucide-react';
import DonateSection from './DonateSection';
import useModal from '@/state/useModal';

export const Contact: React.FC = () => {
    const modal = useModal()
    return (
        <section id="kontak-developer" className="py-12 sm:py-16 max-w-7xl mx-auto font-mono px-3 sm:px-4">
            <div>
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-400 text-neutral-900 text-xs font-medium mb-3">
                        <span>DEVELOPER &amp; PLATFORM</span>
                    </div>
                    <h2 className="text-xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                        Tentang Pembuat &amp; Kontak
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-700 font-mono mt-2 max-w-xl mx-auto">
                        Informasi pengembang di balik sistem deteksi penipuan DaveMod.
                    </p>
                </div>

                {/* CONTAINER UTAMA (Card Tunggal / Profile Box) */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 transition-all border border-neutral-200 shadow-sm">

                    {/* FOTO PROFIL DEVELOPER */}
                    <div className="flex flex-col items-center shrink-0">
                        <div className="relative w-28 h-28 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-neutral-300 bg-neutral-100 shadow-sm group">
                            {/* Ganti src dengan path foto profil Anda */}
                            <img
                                src="/images/profile.webp"
                                alt="Gabriel Ado Ramos Tukan"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                        </div>
                        <div className="mt-3 text-center">
                            <span className="text-[10px] bg-neutral-100 border border-neutral-300 text-neutral-800 px-2.5 py-0.5 rounded-full font-semibold">
                                Full-Stack Dev
                            </span>
                        </div>
                    </div>

                    {/* INFORMASI KONTAK & BRANDING APLIKASI */}
                    <div className="flex-1 flex flex-col justify-between text-center sm:text-left w-full">
                        <div>
                            {/* Nama & Bio Singkat */}
                            <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-1">
                                Gabriel Ado Ramos Tukan
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed">
                                Mahasiswa S1 Informatika Universitas Mulawarman &amp; Independent Software Engineer yang berfokus pada teknologi web, cloud edge, dan sistem keamanan AI ringan.
                            </p>
                        </div>

                        {/* DAFTAR KONTAK */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                            <a
                                href="mailto:official@basis64.com"
                                className="flex items-center justify-center sm:justify-start gap-2.5 p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-800 transition-colors"
                            >
                                <Mail className="w-4 h-4 text-neutral-600 shrink-0" />
                                <span className="truncate">official@basis64.com</span>
                            </a>

                            <a
                                href="https://gart.basis64.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center sm:justify-start gap-2.5 p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-800 transition-colors"
                            >
                                <Globe className="w-4 h-4 text-neutral-600 shrink-0" />
                                <span className="truncate">gart.basis64.com</span>
                            </a>

                            <a
                                href="https://github.com/mrgart64"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center sm:justify-start gap-2.5 p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-800 transition-colors"
                            >
                                <Github className="w-4 h-4 text-neutral-600 shrink-0" />
                                <span className="truncate">GitHub Profile (mrgart64)</span>
                            </a>

                            <div className="flex items-center justify-center sm:justify-start gap-2.5 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-700">
                                <MapPin className="w-4 h-4 text-neutral-600 shrink-0" />
                                <span className="truncate">Samarinda, East Kalimantan</span>
                            </div>

                            <a
                                href="https://instagram.com/mrgart64"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center sm:justify-start gap-2.5 p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-800 transition-colors"
                            >
                                <Camera className="w-4 h-4 text-neutral-600 shrink-0" />
                                <span className="truncate">Instagram (mrgart64)</span>
                            </a>

                            <a
                                href="https://wa.me/6285751012964"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center sm:justify-start gap-2.5 p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-800 transition-colors"
                            >
                                <Phone className="w-4 h-4 text-neutral-600 shrink-0" />
                                <span className="truncate">WhatsApp (+6285751012964)</span>
                            </a>
                        </div>

                        {/* Logo Aplikasi & By BASIS-64 */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-neutral-200">
                            <div className="flex flex-wrap items-center gap-2">
                                {/* DaveMod Logo & Brand */}
                                <div className="flex items-center gap-2 tracking-tight">
                                    <img
                                        src="/images/dave-dark.webp"
                                        alt="Logo DaveMod"
                                        width={128}
                                        height={128}
                                        className="w-10 h-10 object-contain drop-shadow-md"
                                        loading="eager"
                                    />
                                    <span className="font-extrabold italic text-xl sm:text-2xl text-slate-900 drop-shadow-sm">
                                        DaveMod
                                    </span>
                                </div>

                                {/* Separator / 'by' text */}
                                <span className="text-sm font-medium text-neutral-500 mx-1">
                                    by
                                </span>

                                {/* BASIS-64 Logo & Brand */}
                                <div className="flex items-center gap-2 tracking-tight">
                                    <img
                                        src="/images/bs64.webp"
                                        alt="Logo BASIS-64"
                                        width={128}
                                        height={128}
                                        className="w-10 h-10 object-contain"
                                        loading="eager"
                                    />
                                    <span className="font-extrabold text-xl sm:text-2xl text-slate-900 drop-shadow-sm">
                                        BASIS-64
                                    </span>
                                </div>
                            </div>

                            {/* Badge Informasi/Versi */}
                            <span className="text-[11px] text-neutral-500 font-mono tracking-wider bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-200">
                                v1.0.0
                            </span>
                        </div>

                    </div>

                </div>
            </div>
            <DonateSection onOpenModal={() => modal.onOpen()} />
        </section>
    );
};

export default Contact;