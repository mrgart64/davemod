import React from 'react';
import {
    ShieldCheck,
    Zap,
    Target,
    Cpu,
    BarChart3,
    LifeBuoy,
    AlertTriangle,
    Layers,
    CheckCircle2,
    XCircle,
    HelpCircle
} from 'lucide-react';

// Interface untuk data keunggulan/kemampuan AI
interface AbilityItem {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    badgeLabel: string;
    badgeValue: string;
}

// Interface untuk 10 kategori output
interface CategoryItem {
    code: string;
    name: string;
    type: 'fraud' | 'legit' | 'neutral';
    description: string;
}

// Data point-point keunggulan DaveMod AI menggunakan Lucide icons
const ABILITIES_DATA: AbilityItem[] = [
    {
        id: 'client-side',
        icon: <ShieldCheck className="w-5 h-5 text-neutral-800" />,
        title: '100% Client-Side Processing',
        description:
            'Model AI berjalan langsung di dalam browser menggunakan ONNX Runtime Web. Teks pesan Anda tidak pernah dikirim atau disimpan ke server eksternal, menjamin privasi data 100% aman.',
        badgeLabel: 'STATUS:',
        badgeValue: 'Zero Data Leak',
    },
    {
        id: 'realtime-speed',
        icon: <Zap className="w-5 h-5 text-neutral-800" />,
        title: 'Analisis Real-Time Instan',
        description:
            'Mampu memproses kalimat, pola bahasa gaul (slang), maupun struktur pesan penipuan modern dalam hitungan milidetik saat tombol analisis ditekan atau fitur auto-deteksi aktif.',
        badgeLabel: 'LATENCY:',
        badgeValue: '< 50ms',
    },
    {
        id: 'context-aware',
        icon: <Target className="w-5 h-5 text-neutral-800" />,
        title: 'Deteksi Berbasis Konteks',
        description:
            'Dilatih secara spesifik untuk mengenali pola manipulatif seperti tawaran kerja palsu, tautan phishing, giveaway palsu, promosi judi online, pinjol, hingga investasi bodong.',
        badgeLabel: 'ACCURACY:',
        badgeValue: 'High Precision',
    },
    {
        id: 'lightweight-model',
        icon: <Cpu className="w-5 h-5 text-neutral-800" />,
        title: 'Model Efisien & Ringan',
        description:
            'Model AI DaveMod memiliki ukuran file sangat kecil (hanya 170-250 KB), memungkinkan pemuatan cepat bahkan di koneksi internet seluler yang lambat.',
        badgeLabel: 'FOOTPRINT:',
        badgeValue: 'Ultra Lightweight',
    },
    {
        id: 'explainable-ai',
        icon: <BarChart3 className="w-5 h-5 text-neutral-800" />,
        title: 'Transparansi Probabilitas',
        description:
            'Tidak sekadar memberikan hasil "Penipuan" atau "Netral", AI juga menyajikan distribusi probabilitas visual dan persentase tingkat keyakinan (confidence score) dari 5 kategori terbesar secara jelas dan AI ini memiliki 10 kategori berbeda.',
        badgeLabel: 'OUTPUT:',
        badgeValue: 'Visual Distribution',
    },
    {
        id: 'learn-act-guidance',
        icon: <LifeBuoy className="w-5 h-5 text-neutral-800" />,
        title: 'Panduan Edukatif (Learn & Act)',
        description:
            'Memberikan rekomendasi langkah konkret secara kontekstual untuk mengedukasi pengguna (Learn) sekaligus panduan tindakan pertolongan pertama (Act) saat mendeteksi bahaya.',
        badgeLabel: 'FEATURE:',
        badgeValue: 'Actionable Advice',
    },
];

// Data 10 Kategori Output Model AI
const OUTPUT_CATEGORIES: CategoryItem[] = [
    {
        code: 'judol',
        name: 'Judi Online',
        type: 'fraud',
        description: 'Promosi, ajakan, atau tautan yang mengarah ke situs perjudian daring / slot online.'
    },
    {
        code: 'tawaran_kerja_palsu',
        name: 'Tawaran Kerja Palsu',
        type: 'fraud',
        description: 'Modus rekrutmen mencurigakan, tugas klik video berbayar, atau scam kerja paruh waktu.'
    },
    {
        code: 'tawaran_kerja_asli',
        name: 'Tawaran Kerja Asli',
        type: 'legit',
        description: 'Informasi lowongan pekerjaan atau panggilan interview dari perusahaan resmi yang sah.'
    },
    {
        code: 'giveaway_palsu',
        name: 'Giveaway Palsu',
        type: 'fraud',
        description: 'Pengumuman hadiah/undian mengatasnamakan brand terkenal yang meminta transfer biaya awal.'
    },
    {
        code: 'pinjol',
        name: 'Pinjaman Online Ilegal',
        type: 'fraud',
        description: 'Penawaran pinjaman dana cepat tanpa verifikasi OJK yang berisiko teror dan bunga tinggi.'
    },
    {
        code: 'investasi_bodong',
        name: 'Investasi Bodong',
        type: 'fraud',
        description: 'Skema investasi fiktif yang menjanjikan keuntungan instan tidak masuk akal dalam waktu singkat.'
    },
    {
        code: 'investasi_asli',
        name: 'Investasi Asli',
        type: 'legit',
        description: 'Instrumen atau edukasi keuangan dari lembaga resmi yang terdaftar dan diawasi regulator.'
    },
    {
        code: 'phising',
        name: 'Phishing / Tautan Berbahaya',
        type: 'fraud',
        description: 'Pesan berisi tautan palsu untuk mencuri kredensial akun, OTP, atau data pribadi.'
    },
    {
        code: 'penting',
        name: 'Pesan Penting (Sah)',
        type: 'legit',
        description: 'Informasi mendesak yang sah dari kerabat, instansi resmi, atau notifikasi penting non-penipuan.'
    },
    {
        code: 'netral',
        name: 'Netral / Umum',
        type: 'neutral',
        description: 'Pesan percakapan biasa sehari-hari, obrolan santai, atau teks umum tanpa indikasi ancaman.'
    },
];

export const Abilities: React.FC = () => {
    return (
        <section id="kemampuan-ai" className="py-12 sm:py-16 max-w-7xl mx-auto font-mono px-3 sm:px-4">
            <div>
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-400 text-neutral-900 text-xs font-medium mb-3">
                        <span>// MODEL ARCHITECTURE &amp; ADVANTAGES</span>
                    </div>
                    <h2 className="text-xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                        Mengapa DaveMod Lebih Unggul?
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-700 font-mono mt-2 max-w-xl mx-auto">
                        Dirancang khusus dengan kapabilitas tinggi untuk mendeteksi potensi penipuan digital secara instan, transparan, dan aman di browser Anda.
                    </p>
                </div>

                {/* GRID CONTAINER */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch mb-8">
                    {ABILITIES_DATA.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border border-neutral-400/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-neutral-900 group"
                        >
                            <div>
                                {/* Icon Container with Lucide */}
                                <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-300 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                    {item.icon}
                                </div>

                                {/* Judul Point */}
                                <h3 className="text-sm sm:text-base font-bold text-neutral-900 mb-2">
                                    {item.title}
                                </h3>

                                {/* Deskripsi */}
                                <p className="text-xs sm:text-sm text-neutral-700 font-mono leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            {/* Footer Badge/Info */}
                            <div className="mt-6 pt-4 border-t border-neutral-200 text-[11px] text-neutral-500 flex items-center justify-between font-mono">
                                <span>{item.badgeLabel}</span>
                                <span className="text-neutral-900 font-semibold">{item.badgeValue}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* DISCLAIMER BOX: FALSE POSITIVE */}
                <div className="bg-white border border-neutral-400 rounded-2xl p-5 sm:p-6 text-xs sm:text-sm font-mono text-neutral-700 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-none sm:shadow-sm mb-8">
                    <div className="w-10 h-10 rounded-xl bg-neutral-200/60 border border-neutral-300 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-5 h-5 text-neutral-800" />
                    </div>

                    <div className="flex-1 space-y-1">
                        <div className="font-bold text-neutral-900 flex items-center gap-2">
                            <span>DISCLAIMER: KEMUNGKINAN FALSE POSITIVE</span>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                            Model machine learning ini beroperasi berdasarkan probabilitas statistik dan tidak dijamin 100% sempurna. Pesan sah (normal) terkadang dapat terdeteksi sebagai ancaman (<span className="text-neutral-900 font-semibold">False Positive</span>). Selalu gunakan pertimbangan mandiri sebelum mengambil tindakan atau mengabaikan sebuah pesan.
                        </p>
                    </div>
                </div>

                {/* PENJELASAN 10 KATEGORI OUTPUT AI */}
                <div className="bg-white border border-neutral-400 rounded-2xl p-5 sm:p-8 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-300 flex items-center justify-center shrink-0">
                                <Layers className="w-5 h-5 text-neutral-800" />
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                                    Referensi 10 Kategori Output AI
                                </h3>
                                <p className="text-xs text-neutral-600">
                                    Klasifikasi detail yang dideteksi oleh model klasifikasi teks DaveMod.
                                </p>
                            </div>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-800 text-xs font-semibold self-start sm:self-auto">
                            <span>Total Kelas: 10 Kategori</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {OUTPUT_CATEGORIES.map((cat) => {
                            // Menentukan warna badge jenis kategori
                            let badgeStyle = "bg-neutral-100 text-neutral-800 border-neutral-300";
                            let iconType = <HelpCircle className="w-3.5 h-3.5" />;
                            let typeLabel = "Netral";

                            if (cat.type === 'fraud') {
                                badgeStyle = "bg-red-50 text-red-700 border-red-200";
                                iconType = <XCircle className="w-3.5 h-3.5 text-red-600" />;
                                typeLabel = "Ancaman / Penipuan";
                            } else if (cat.type === 'legit') {
                                badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200";
                                iconType = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
                                typeLabel = "Aman / Sah";
                            }

                            return (
                                <div
                                    key={cat.code}
                                    className="border border-neutral-200 rounded-xl p-4 flex flex-col justify-between hover:border-neutral-400 transition-colors bg-neutral-50/50"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200/70 text-neutral-700 tracking-wider">
                                                {cat.code}
                                            </span>
                                            <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${badgeStyle} font-medium`}>
                                                {iconType}
                                                <span>{typeLabel}</span>
                                            </span>
                                        </div>
                                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 mb-1">
                                            {cat.name}
                                        </h4>
                                        <p className="text-xs text-neutral-600 leading-relaxed">
                                            {cat.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Abilities;