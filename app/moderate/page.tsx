'use client';

import React, { useState, useEffect } from 'react';
import * as ort from 'onnxruntime-web';
import useModal from '@/state/useModal';
import DonateModal from '@/components/DonateModal';

export default function OnnxModeratorPage() {
    const [inputMessage, setInputMessage] = useState('');
    const [result, setResult] = useState<{ label: string; confidence: number } | null>(null);
    const [loading, setLoading] = useState(false);
    const [modelLoaded, setModelLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [meta, setMeta] = useState<any>(null);
    const [session, setSession] = useState<ort.InferenceSession | null>(null);

    // 1. Inisialisasi ONNX Runtime & Load Model
    useEffect(() => {
        async function initOnnx() {
            try {
                setLoading(true);

                // Configure WASM paths agar berjalan di semua browser/perangkat
                ort.env.wasm.numThreads = 1;
                ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@latest/dist/';

                // Fetch metadata JSON
                const metaRes = await fetch('/moderation_meta.json');
                if (!metaRes.ok) throw new Error('Gagal memuat moderation_meta.json dari public/.');
                const metaData = await metaRes.json();
                setMeta(metaData);

                // Load file .onnx dari folder public
                const onnxSession = await ort.InferenceSession.create('/text_moderator.onnx', {
                    executionProviders: ['wasm'], // Fallback aman untuk 100% perangkat (HP, Desktop, iOS, Android)
                });

                setSession(onnxSession);
                setModelLoaded(true);
            } catch (err: any) {
                console.error("Gagal inisialisasi ONNX:", err);
                setError(err.message || 'Gagal memuat model ONNX.');
            } finally {
                setLoading(false);
            }
        }

        initOnnx();
    }, []);

    // 2. Tokenizer & Padding (MAX_LEN = 40)
    // Tokenizer & Padding yang aman terhadap Out-Of-Vocabulary (OOV)
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

    // 3. Eksekusi Moderasi via ONNX
    const handleModerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim() || !session || !meta) return;

        try {
            setLoading(true);
            setError(null);

            // Preprocessing text
            const paddedSeq = tokenizeAndPad(inputMessage, meta.word_index, meta.max_len, meta.oov_token);

            // Buat ONNX Tensor (Secara otomatis kompatibel dengan batch shape [1, 40])
            const inputTensor = new ort.Tensor('float32', paddedSeq, [1, meta.max_len]);

            // Dapatkan nama input node dari model ONNX secara otomatis
            const inputName = session.inputNames[0];
            const feeds = { [inputName]: inputTensor };

            // Run Inference
            const outputMap = await session.run(feeds);

            // Dapatkan nama output node dan datanya
            const outputName = session.outputNames[0];
            const outputData = outputMap[outputName].data as Float32Array;

            console.log(outputData)

            // Cari probabilitas tertinggi
            let maxIdx = 0;
            let maxVal = outputData[0];
            for (let i = 1; i < outputData.length; i++) {
                if (outputData[i] > maxVal) {
                    maxVal = outputData[i];
                    maxIdx = i;
                }
            }

            const predictedLabel = meta.categories[maxIdx] || 'unknown';
            setResult({
                label: predictedLabel.toUpperCase(),
                confidence: maxVal * 100,
            });

        } catch (err: any) {
            console.error("Gagal inferensi ONNX:", err);
            setError(`Gagal memproses moderasi: ${err.message || err}`);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">AI Text Moderator (ONNX)</h1>
                <p className="text-sm text-gray-500 mb-6">
                    Menjalankan model <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700">text_moderator.onnx</code> via ONNX Runtime Web.
                </p>

                {!modelLoaded && !error && (
                    <div className="p-4 mb-4 text-blue-700 bg-blue-50 rounded-lg text-sm">
                        ⏳ Sedang memuat model ONNX & metadata...
                    </div>
                )}

                {error && (
                    <div className="p-4 mb-4 text-red-700 bg-red-50 rounded-lg text-sm">
                        ❌ {error}
                    </div>
                )}

                <form onSubmit={handleModerate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Masukkan Pesan / Komentar:
                        </label>
                        <textarea
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            placeholder="Tulis kalimat untuk diuji..."
                            disabled={!modelLoaded || loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!modelLoaded || loading || !inputMessage.trim()}
                        className="w-full py-2.5 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                        {loading ? 'Memproses Inferensi...' : 'Moderasi Pesan'}
                    </button>
                </form>

                {result && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Hasil Analisis</h3>
                        <div className="flex items-center justify-between">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${result.label === 'TOXIC' || result.label === 'SPAM' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                }`}>
                                {result.label}
                            </span>
                            <span className="text-sm font-semibold text-gray-700">
                                Confidence: {result.confidence.toFixed(2)}%
                                Result:
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}