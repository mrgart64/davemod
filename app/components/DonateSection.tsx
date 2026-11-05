'use client';

import React from 'react';
import { Heart } from 'lucide-react';

interface DonateSectionProps {
    onOpenModal: () => void;
}

export default function DonateSection({ onOpenModal }: DonateSectionProps) {
    return (
        <section className="w-full max-w-7xl mx-auto px-4" id='donasi'>
            <div className="bg-white border border-neutral-300 rounded-2xl p-6 sm:p-8 shadow-sm transition-all hover:border-neutral-400 z-50">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    {/* Informasi Teks */}
                    <div className="space-y-1.5 max-w-2xl">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-neutral-900"></span>
                            <h2 className="text-base font-bold text-slate-900 tracking-tight">
                                Dukung Platform Ini
                            </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Jika jadwal ini membantu aktivitas perkuliahanmu, kamu bisa memberikan donasi sukarela agar website ini tetap gratis dan tanpa iklan.
                        </p>
                    </div>

                    {/* Tombol CTA */}
                    <div className="shrink-0 w-full md:w-auto">
                        <button
                            onClick={onOpenModal}
                            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-900 border border-neutral-900 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer active:scale-95"
                        >
                            <Heart className="w-4 h-4 fill-white/20 text-white" />
                            <span>Kirim Donasi</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}