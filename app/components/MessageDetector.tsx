'use client';

import { useState, useEffect } from 'react';
// import type * as ort from 'onnxruntime-web';
import * as ort from 'onnxruntime-web';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { descriptions } from '@/data/descriptions';
import { samples } from '@/data/samples';

// Registrasi komponen Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



export default function MessageDetector() {
    const [inputText, setInputText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [modelLoaded, setModelLoaded] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    // State Menyimpan Session ONNX & Metadata
    const [session, setSession] = useState<ort.InferenceSession | null>(null);
    const [meta, setMeta] = useState<{
        word_index: Record<string, number>;
        categories: string[];
        max_len: number;
        oov_token: string;
    } | null>(null);

    // State menyimpan hasil prediksi utama & data lengkap untuk chart (Top 5 + Lainnya)
    const [result, setResult] = useState<{
        prediction: string;
        secondaryPrediction: string;
        confidence: number;
        secondaryConfidence: number;
        chartDataLabels: string[];
        chartDataValues: number[];
    } | null>(null);

    // Load Model ONNX & Metadata saat komponen pertama kali dirender
    useEffect(() => {
        async function initModelAndMeta() {
            try {
                // 1. Konfigurasi jalur WASM ONNX Runtime
                // ort.env.wasm.numThreads = 1;
                // ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@latest/dist/';

                // const ort = await import('onnxruntime-web');
                // 1. Konfigurasi jalur WASM ONNX Runtime (Menggunakan CDN publik untuk menghindari batasan ukuran file di deployment)
                if (typeof window !== 'undefined') {
                    ort.env.wasm.numThreads = 1;
                    ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.31.1/dist/';
                }

                // 2. Fetch metadata dari public/moderation_meta.json
                const metaRes = await fetch('/model/moderation_meta.json');
                if (!metaRes.ok) throw new Error('Gagal memuat moderation_meta.json');
                const metaData = await metaRes.json();
                setMeta(metaData);

                // 3. Load Session ONNX dari public/text_moderator.onnx
                const onnxSession = await ort.InferenceSession.create('/model/text_moderator.onnx', {
                    executionProviders: ['wasm'],
                });
                setSession(onnxSession);
                setModelLoaded(true);
            } catch (err: any) {
                console.error("Gagal memuat model/metadata ONNX:", err);
                setLoadError(err.message || 'Gagal menginisialisasi model.');
            }
        }

        initModelAndMeta();
    }, []);

    // Contoh sampel pesan untuk tombol instan
    const sampleMessages = [
        {
            label: "#Judol (Obfuscation)",
            text: "Baru nemu situs 𝗗𝗘𝗪𝗔𝗔SEP𝟴𝟴 yang beneran bayar lunas tanpa ribet. WD ratusan juta langsung masuk rekening semenit. Cek bio!"
        },
        {
            label: "#Giveaway",
            text: "Selamat! Akun Anda terpilih sebagai pemenang utama Giveaway ROG Phone 8 senilai 15 juta dari Windah Basudara. Klaim hadiah segera di link bio kami!"
        },
        {
            label: "#LokerPalsu",
            text: "PENGUMUMAN SELEKSI PT EMIRATES DIGITAL: Anda dinyatakan lolos tahap interview posisi Customer Service di Dubai. Harap transfer biaya akomodasi transit via agen."
        }
    ];

    // Fungsi Tokenizer & Padding persis seperti parameter train.py Anda
    const tokenizeAndPad = (text: string, wordIndex: Record<string, number>, maxLen: number, oovToken: string) => {
        const lowerText = text.toLowerCase();
        // Ambil kata-kata menggunakan regex
        const words = lowerText.match(/\w+/g) || [];

        // Ambil indeks untuk token OOV (biasanya berindeks 1 atau 2, fallback ke 1)
        const oovIndex = wordIndex[oovToken] !== undefined ? wordIndex[wordIndex[oovToken]] : (wordIndex['<OOV>'] || 1);

        // Batas maksimum indeks yang diizinkan oleh VOCAB_SIZE (misal 2500, maka max index 2499)
        const maxValidIndex = Object.keys(wordIndex).length > 0 ? 2500 : 2500;

        const seq = words.map(word => {
            const idx = wordIndex[word];
            // Jika kata ada di word_index DAN masih dalam batas aman (< 2500), gunakan indeksnya. 
            // Jika tidak, arahkan ke oovIndex agar tidak out of bounds!
            if (idx !== undefined && idx < maxValidIndex) {
                return idx;
            }
            return oovIndex;
        });

        // Lakukan padding hingga maxLen (40)
        let paddedSeq = new Array(maxLen).fill(0);
        for (let i = 0; i < Math.min(seq.length, maxLen); i++) {
            paddedSeq[i] = seq[i];
        }

        return new Float32Array(paddedSeq);
    };

    const getDescription = () => {
        // Pastikan mengambil string key label (misal: 'judol', 'phising', dll)
        // Sesuaikan properti result dengan struktur data yang dikembalikan backend/model kamu
        const primary = result?.prediction || 'netral';
        const secondary = result?.secondaryPrediction || primary;
        const secondaryConf = result?.secondaryConfidence || 0; // Confidence untuk label sekunder

        // Ambil batas minimum dari kamus kombinasi primer & sekunder
        const comboData = descriptions[primary]?.[secondary] || descriptions[primary]?.[primary];
        const selfData = descriptions[primary]?.[primary];

        // Logika pemilihan deskripsi berdasarkan confidence sekunder
        if (comboData && secondaryConf >= comboData.min) {
            return comboData.desc; // Mengembalikan string deskripsi
        } else if (selfData) {
            return selfData.desc; // Mengembalikan string deskripsi utama
        }

        return "Analisis teks berhasil diproses oleh model CNN.";
    };

    const getLearn = () => {
        // Pastikan mengambil string key label (misal: 'judol', 'phising', dll)
        // Sesuaikan properti result dengan struktur data yang dikembalikan backend/model kamu
        const primary = result?.prediction || 'netral';
        const secondary = result?.secondaryPrediction || primary;
        const secondaryConf = result?.secondaryConfidence || 0; // Confidence untuk label sekunder

        // Ambil batas minimum dari kamus kombinasi primer & sekunder
        const comboData = descriptions[primary]?.[secondary] || descriptions[primary]?.[primary];
        const selfData = descriptions[primary]?.[primary];

        // Logika pemilihan deskripsi berdasarkan confidence sekunder
        if (comboData && secondaryConf >= comboData.min) {
            return comboData.learn; // Mengembalikan string deskripsi
        } else if (selfData) {
            return selfData.learn; // Mengembalikan string deskripsi utama
        }

        return "Analisis teks berhasil diproses oleh model CNN.";
    };

    const getAct = () => {
        // Pastikan mengambil string key label (misal: 'judol', 'phising', dll)
        // Sesuaikan properti result dengan struktur data yang dikembalikan backend/model kamu
        const primary = result?.prediction || 'netral';
        const secondary = result?.secondaryPrediction || primary;
        const secondaryConf = result?.secondaryConfidence || 0; // Confidence untuk label sekunder

        // Ambil batas minimum dari kamus kombinasi primer & sekunder
        const comboData = descriptions[primary]?.[secondary] || descriptions[primary]?.[primary];
        const selfData = descriptions[primary]?.[primary];

        // Logika pemilihan deskripsi berdasarkan confidence sekunder
        if (comboData && secondaryConf >= comboData.min) {
            return comboData.act; // Mengembalikan string deskripsi
        } else if (selfData) {
            return selfData.act; // Mengembalikan string deskripsi utama
        }

        return "Analisis teks berhasil diproses oleh model CNN.";
    };

    const handleAnalyze = async () => {
        if (!inputText.trim() || !session || !meta) return;
        setIsAnalyzing(true);
        setResult(null);

        try {
            // 1. Preprocessing teks input menjadi sequence angka bernilai Float32
            const paddedSeq = tokenizeAndPad(inputText, meta.word_index, meta.max_len, meta.oov_token);

            // 2. Buat ONNX Tensor dengan bentuk [1, max_len]
            const inputTensor = new ort.Tensor('float32', paddedSeq, [1, meta.max_len]);

            // 3. Eksekusi Inferensi Model ONNX
            const inputName = session.inputNames[0];
            const outputMap = await session.run({ [inputName]: inputTensor });

            // 4. Ambil array probabilitas output dari model
            const outputName = session.outputNames[0];
            const probabilities = outputMap[outputName].data as Float32Array;

            // 5. Petungkan skor probabilitas untuk setiap kategori
            const categoryScores = Array.from(probabilities).map((score, index) => ({
                category: meta.categories[index] || `Kategori ${index}`,
                score: Number((score * 100).toFixed(2)) // Ubah ke persentase
            }));

            // Urutkan dari skor tertinggi ke terendah
            categoryScores.sort((a, b) => b.score - a.score);

            let topPrediction = categoryScores[0];
            let secondaryPrediction = categoryScores[1];

            // Regex sederhana untuk mendeteksi email gratisan
            const freeEmailRegex = /@(gmail|yahoo|hotmail|outlook)\.com/i;
            // Regex sederhana untuk mendeteksi nomor HP Indonesia (08xx atau +62)
            const phoneRegex = /(\+62|62|0)[\s\-.]?8[1-9][\s\-.]?[0-9]{2,4}[\s\-.]?[0-9]{2,4}[\s\-.]?[0-9]{2,4}/;
            const hasFreeEmail = freeEmailRegex.test(inputText);
            const hasPersonalPhone = phoneRegex.test(inputText);

            // Algoritma rule-based untuk guardrail dan mengurangi kemungkinan false positive

            if ((hasFreeEmail || hasPersonalPhone) && (topPrediction.category == 'tawaran_kerja_asli'
                && (secondaryPrediction.category == 'tawaran_kerja_palsu'
                    || secondaryPrediction.category == 'phising'
                    || secondaryPrediction.category == 'investasi_bodong'
                    || secondaryPrediction.category == 'giveaway_palsu'
                    || secondaryPrediction.category == 'judol'
                    || secondaryPrediction.category == 'pinjol'
                ))) {
                const primarySecondaryScore = topPrediction.score + secondaryPrediction.score;
                const newPrimaryScore = primarySecondaryScore * 0.4;
                const newSecondaryScore = primarySecondaryScore * 0.6;
                categoryScores[0].score = newPrimaryScore;
                categoryScores[1].score = newSecondaryScore;
                topPrediction = categoryScores[1];
                secondaryPrediction = categoryScores[0];
            }

            // Urutkan dari skor tertinggi ke terendah
            categoryScores.sort((a, b) => b.score - a.score);

            // Format data untuk Chart.js (Top 5 + Bar "Lainnya" jika kategori > 5)
            let finalLabels: string[] = [];
            let finalValues: number[] = [];

            if (categoryScores.length <= 5) {
                finalLabels = categoryScores.map(item => item.category);
                finalValues = categoryScores.map(item => item.score);
            } else {
                const top5 = categoryScores.slice(0, 5);
                finalLabels = top5.map(item => item.category);
                finalValues = top5.map(item => item.score);

                // Hitung sisa persentase untuk bar "Lainnya"
                const othersSum = Number((100 - finalValues.reduce((a, b) => a + b, 0)).toFixed(2));
                finalLabels.push("Lainnya");
                finalValues.push(othersSum > 0 ? othersSum : 0.01);
            }

            setResult({
                prediction: topPrediction.category,
                confidence: topPrediction.score,
                secondaryPrediction: secondaryPrediction.category,
                secondaryConfidence: secondaryPrediction.score,
                chartDataLabels: finalLabels,
                chartDataValues: finalValues,
            });
        } catch (err) {
            console.error("Gagal melakukan inferensi ONNX:", err);
            alert("Terjadi kesalahan saat memindai teks.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    // Konfigurasi Data untuk Chart.js
    const chartData = {
        labels: result?.chartDataLabels || [],
        datasets: [
            {
                label: 'Tingkat Keyakinan (%)',
                data: result?.chartDataValues || [],
                backgroundColor: [
                    'rgba(23, 23, 23, 0.85)',  // Bar 1 (Tertinggi)
                    'rgba(82, 82, 82, 0.7)',   // Bar 2
                    'rgba(115, 115, 115, 0.6)', // Bar 3
                    'rgba(163, 163, 163, 0.5)', // Bar 4
                    'rgba(212, 212, 212, 0.5)', // Bar 5
                    'rgba(229, 229, 229, 0.8)', // Bar Lainnya
                ],
                borderColor: 'rgba(23, 23, 23, 1)',
                borderWidth: 1,
                borderRadius: 6,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return ` Kemungkinan: ${context.raw.toFixed(2)}%`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function (value: any) {
                        return value + '%';
                    },
                    font: {
                        family: 'monospace',
                        size: 11,
                    },
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
            },
            x: {
                ticks: {
                    font: {
                        family: 'monospace',
                        size: 10,
                    },
                },
                grid: {
                    display: false,
                },
            },
        },
    };

    const isRedFlag = () => {
        const redFlags = ['judol', 'tawaran_kerja_palsu', 'giveaway_palsu', 'pinjol', 'investasi_bodong', 'phising'];
        return redFlags.includes(result?.prediction || 'neutral')
    }

    const [animatedConfidence, setAnimatedConfidence] = useState(0);

    // Efek untuk menganimasikan angka dan lingkaran dari nilai saat ini ke nilai baru
    useEffect(() => {
        if (result && result.confidence !== undefined) {
            const end = result.confidence;
            const duration = 400; // Durasi animasi dalam milidetik (bisa diatur, misal 400ms agar lebih smooth)
            const incrementTime = 20;
            const steps = duration / incrementTime;

            // Ambil nilai awal dari state saat ini (sehingga bisa bergerak maju/mundur tanpa dari 0)
            let currentVal = animatedConfidence;
            const increment = (end - currentVal) / steps;

            const timer = setInterval(() => {
                currentVal += increment;

                // Cek apakah sudah mencapai nilai tujuan (berdasarkan arah maju atau mundur)
                const isReached = increment >= 0 ? currentVal >= end : currentVal <= end;

                if (isReached) {
                    setAnimatedConfidence(end);
                    clearInterval(timer);
                } else {
                    setAnimatedConfidence(Math.round(currentVal));
                }
            }, incrementTime);

            return () => clearInterval(timer);
        } else {
            setAnimatedConfidence(0);
        }
    }, [result?.confidence]); // Trigger hanya ketika nilai confidence berubah

    // (Di dalam komponen utama Anda, pastikan state autoDetect aktif)
    const [isAutoDetect, setIsAutoDetect] = useState(true);

    // Efek Auto-Deteksi dengan Debounce (500ms)
    useEffect(() => {
        // Jika auto-deteksi mati, teks kosong, sedang menganalisis, atau model belum siap, jangan lakukan apa-apa
        if (!isAutoDetect || !inputText.trim() || isAnalyzing || !modelLoaded) {
            return;
        }

        // Timer jeda agar tidak langsung mendeteksi setiap huruf diketik secara instan (menghemat performa)
        const timer = setTimeout(() => {
            handleAnalyze();
        }, 500);

        return () => clearTimeout(timer);
    }, [inputText, isAutoDetect]);

    const getRandomMessage = (textArray: string[]) => {
        const randomIndex = Math.floor(Math.random() * textArray.length);
        return textArray[randomIndex];
    };

    return (
        <section id="analisis-pesan" className="py-6 sm:py-12 max-w-7xl mx-auto font-mono sm:px-4">
            <div>
                {/* Header Section */}
                <div className="text-center mb-6 sm:mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-400 text-neutral-900 text-xs font-medium mb-6">
                        <span className="w-2 h-2 rounded-full bg-neutral-800 animate-pulse"></span>
                        <span>MESSAGE RECOGNITION</span>
                    </div>
                    <h2 className="text-xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight px-4">
                        Uji &amp; Analisis Pesan Mencurigakan
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-700 font-mono mt-2 max-w-xl mx-auto px-4">
                        Tempelkan teks SMS, pesan WhatsApp, atau caption media sosial di bawah ini untuk mendeteksi potensi penipuan dengan DaveMod.
                    </p>

                    {!modelLoaded && !loadError && (
                        <p className="text-xs text-blue-600 mt-2">⏳ Memuat model ONNX &amp; metadata ke browser...</p>
                    )}
                    {loadError && (
                        <p className="text-xs text-red-600 mt-2">❌ Gagal memuat model: {loadError}</p>
                    )}
                </div>

                {/* GRID CONTAINER utama: 1 kolom di mobile, 2 kolom di tablet/desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">

                    {/* ==================== KIRI: KOTAK INPUT ==================== */}
                    <div className="bg-white border-0 sm:border sm:border-neutral-400/80 rounded-2xl p-4 sm:p-6 shadow-none sm:shadow-sm h-full flex flex-col justify-between">
                        <div className="flex-1 flex flex-col">
                            {/* Header Label & Opsi Checklist */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                                <label className="block text-xs font-semibold text-neutral-800">
                                    MASUKKAN TEKS PESAN:
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-mono text-neutral-700 hover:text-neutral-900 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={isAutoDetect}
                                        onChange={(e) => setIsAutoDetect(e.target.checked)}
                                        className="w-4 h-4 rounded border-neutral-300 text-neutral-800 focus:ring-neutral-800 accent-neutral-800 cursor-pointer"
                                    />
                                    <span>Auto-Deteksi Otomatis</span>
                                </label>
                            </div>

                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Contoh: 'Baru nemu situs DEWAASEP88 yang beneran bayar lunas...'"
                                rows={12}
                                disabled={!modelLoaded}
                                className="w-full flex-1 min-h-[180px] bg-neutral-50 text-neutral-900 border border-neutral-300 rounded-xl p-3 sm:p-4 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-neutral-800 resize-none transition-all disabled:opacity-50"
                            />
                        </div>

                        {/* Tombol Sampel & Action */}
                        <div className="flex flex-col gap-3 sm:gap-4 mt-4 pt-4 border-t border-neutral-200">
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                <span className="text-xs text-neutral-800 font-mono w-full sm:w-auto">Coba sampel:</span>
                                {samples.map((item, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setInputText(getRandomMessage(item.text))}
                                        className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300 px-2.5 py-1 rounded-lg transition-all font-mono cursor-pointer"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleAnalyze}
                                disabled={!inputText.trim() || isAutoDetect || isAnalyzing || !modelLoaded}
                                className="w-full py-3 bg-neutral-800 hover:bg-neutral-900 disabled:opacity-50 text-neutral-50 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:cursor-not-allowed"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <span className="w-3 h-3 border-2 border-neutral-400 border-t-neutral-50 rounded-full animate-spin"></span>
                                        <span>Memindai...</span>
                                    </>
                                ) : isAutoDetect ? (
                                    <span>Auto Deteksi Aktif</span>
                                ) : (
                                    <span>Analisis Sekarang</span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* ==================== KANAN: HASIL PREDIKSI & CHART ==================== */}
                    <div className="h-full">
                        {result ? (
                            <div className="bg-white text-neutral-900 border-0 sm:border sm:border-neutral-400/80 rounded-2xl p-4 sm:p-6 shadow-none sm:shadow-sm font-mono h-full flex flex-col justify-between transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-4">
                                <div>
                                    {/* Header Result */}
                                    <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-neutral-300 flex justify-between items-center gap-3 text-sm sm:text-base text-neutral-600">
                                        <strong className="text-neutral-900 flex items-center gap-2 sm:gap-3 text-xs sm:text-base">
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-neutral-700"></span>
                                            </span>
                                            Hasil Deteksi (Recognize)
                                        </strong>
                                        <button
                                            onClick={() => setResult(null)}
                                            className="text-neutral-600 hover:text-red-600 transition-all duration-200 whitespace-nowrap cursor-pointer font-bold text-xs sm:text-sm"
                                        >
                                            [X] Tutup
                                        </button>
                                    </div>

                                    {/* Teks & Deskripsi Utama */}
                                    <div className="mb-4 sm:mb-6 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="text-xs text-neutral-800">JENIS PESAN:</div>
                                            <div className={`text-xs sm:text-base font-bold tracking-wide ${isRedFlag() ? 'text-red-500' : 'text-green-500'} inline-block px-2 py-0.5`}>
                                                [{result.prediction.toUpperCase()}]
                                            </div>
                                        </div>
                                        <p className="text-xs sm:text-sm text-neutral-700 font-mono leading-relaxed">
                                            {getDescription()}
                                        </p>
                                    </div>

                                    {/* Circle & Chart Container */}
                                    <div className="space-y-4">

                                        {/* Circle Progress Bar */}
                                        <div className="bg-neutral-50 sm:bg-white border border-neutral-200 sm:border-neutral-300 rounded-xl p-4 flex items-center justify-center">
                                            <div className="flex flex-col items-center justify-center text-center">
                                                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-2 group">
                                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                                        <path
                                                            className="text-neutral-200"
                                                            strokeWidth="3.5"
                                                            stroke="currentColor"
                                                            fill="none"
                                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                        <path
                                                            className={`${isRedFlag() ? 'text-red-500' : 'text-green-500'} transition-all duration-300 ease-out`}
                                                            strokeDasharray={`${animatedConfidence}, 100`}
                                                            strokeWidth="3.5"
                                                            strokeLinecap="round"
                                                            stroke="currentColor"
                                                            fill="none"
                                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                    </svg>

                                                    <div className={`absolute inset-0 flex items-center justify-center text-base sm:text-lg font-bold transition-transform duration-300 group-hover:scale-110 ${isRedFlag() ? 'text-red-500' : 'text-green-500'}`}>
                                                        {animatedConfidence}%
                                                    </div>
                                                </div>

                                                <div className="text-[10px] sm:text-xs text-neutral-800">KLASIFIKASI:</div>
                                                <div className="text-xs sm:text-sm font-bold text-neutral-900">
                                                    [{result.prediction.toUpperCase()}]
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bar Chart */}
                                        <div className="bg-neutral-50 sm:bg-white p-3 sm:p-4 rounded-xl border border-neutral-200 sm:border-neutral-300 flex flex-col justify-between">
                                            <div className="text-[10px] sm:text-xs text-neutral-800 mb-2">// DISTRIBUSI KEMUNGKINAN</div>
                                            <div className="w-full h-40 sm:h-44 relative flex-1">
                                                <Bar data={chartData} options={{ ...chartOptions, maintainAspectRatio: false }} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Placeholder Kanan saat Belum Ada Hasil */
                            <div className="bg-neutral-50 border border-dashed border-neutral-300 rounded-2xl p-6 sm:p-8 h-full flex flex-col items-center justify-center text-center min-h-[250px] sm:min-h-[300px]">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-200/60 flex items-center justify-center mb-3 text-neutral-500">
                                    📊
                                </div>
                                <h3 className="text-xs sm:text-sm font-bold text-neutral-700 mb-1">Belum Ada Hasil</h3>
                                <p className="text-xs text-neutral-500 max-w-xs">
                                    Masukkan pesan di sebelah kiri dan klik "Analisis Sekarang" untuk melihat prediksi deteksi.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ==================== CARD FULL WIDTH: SARAN & REKOMENDASI ==================== */}
                    {result && (
                        <div className="col-span-1 md:col-span-2">
                            <div className="bg-white text-neutral-900 border-0 sm:border sm:border-neutral-400/80 rounded-2xl p-4 sm:p-6 shadow-none sm:shadow-sm font-mono transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-4">

                                <div className="mb-4 pb-3 border-b border-neutral-300 text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-neutral-800"></span>
                                    <span>PANDUAN &amp; REKOMENDASI (Learn &amp; Act)</span>
                                </div>

                                {/* Tanpa Card / Sub-box tambahan di dalam */}
                                <div className="space-y-4 pt-2">
                                    {/* LEARN */}
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm font-bold text-neutral-900">
                                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                                            <span>LEARN (WAWASAN)</span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed pl-4 font-mono">
                                            {getLearn()}
                                        </p>
                                    </div>

                                    {/* ACT */}
                                    <div className="flex flex-col pt-2">
                                        <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm font-bold text-neutral-900">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                                            <span>ACT (TINDAKAN)</span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed pl-4 font-mono">
                                            {getAct()}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                </div>

                <p className="text-xs sm:text-sm text-neutral-700 font-mono mt-4 max-w-7xl mx-4 sm:mx-auto">
                    DESCLAIMER: Platform ini sama sekali tidak mendukung aktivitas perjudian online ataupun penipuan, nama ataupun yang digunakan pada sample hanyalah dummy data.
                </p>
            </div>
        </section>
    );
}