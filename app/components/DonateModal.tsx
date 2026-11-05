'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, QrCode, Copy, Check } from 'lucide-react';

interface DonateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DonateModal({ isOpen, onClose }: DonateModalProps) {
    const [copied, setCopied] = React.useState(false);
    const qrisNms = "ID1020304050607";

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(qrisNms);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            {/* Backdrop overlay */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Card */}
            <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
                {/* Header Modal */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <QrCode className="w-5 h-5 text-neutral-900" />
                        <h3 className="text-base font-bold text-slate-900">Donasi via QRIS</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                        aria-label="Tutup modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-5 text-center">
                    <p className="text-xs text-slate-600 leading-relaxed">
                        Dukung web ini melalui donasi ke QRIS ini. (kopi buat admin 😉)
                    </p>

                    {/* Wrapper Gambar QRIS */}
                    <div className="relative inline-block p-1 bg-white border border-slate-200 rounded-2xl shadow-2xs">
                        <img
                            src="/images/qris.webp" // 👈 Ganti path gambar QRIS kamu di sini
                            alt="QRIS Donasi"
                            width={260}
                            height={320}
                            className=" object-contain rounded-lg mx-auto"
                            loading='eager'
                        />
                    </div>

                    {/* ID QRIS / NMS & Copy Button */}
                    <div className="pt-1" hidden>
                        <div className="inline-flex items-center justify-between gap-3 px-3.5 py-2 bg-slate-50 border border-slate-200/80 rounded-xl w-full">
                            <div className="text-left">
                                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">ID / NMS QRIS</p>
                                <p className="text-xs font-mono font-bold text-slate-800">{qrisNms}</p>
                            </div>
                            <button
                                onClick={handleCopy}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-all cursor-pointer active:scale-95"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                                        <span className="text-emerald-600">Tersalin</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                                        <span>Salin</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 text-center">
                    <p className="text-[11px] text-slate-500">
                        Terima kasih banyak atas dukunganmu untuk pengembangan platform ini! 🙌
                    </p>
                </div>
            </div>
        </div>
    );
}