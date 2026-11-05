import * as ort from "onnxruntime-web";
import { NextResponse } from "next/server";
// Import metadata langsung secara statis (Vite support ini out-of-the-box)
import meta from "@/models/moderation_meta.json";

// Konfigurasi WASM path untuk ONNX Runtime di lingkungan Edge/Browser
ort.env.wasm.wasmPaths = "/ort/";

let session: ort.InferenceSession | null = null;

async function getSession() {
	if (!session) {
		// Di Cloudflare Workers/Vite, path model bisa di-fetch atau di-import.
		// Pastikan file .onnx ada di folder public/ atau di-import.
		const modelUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/models/text_moderator.onnx`;
		session = await ort.InferenceSession.create(modelUrl);
	}
	return session;
}

// Tokenizer mengacu langsung ke objek 'meta' yang di-import
function tokenizeAndPad(text: string): Float32Array {
	const { max_len, word_index, oov_token } = meta;
	const oovIndex = (word_index as Record<string, number>)[oov_token] || 1;

	const cleanedText = text.toLowerCase();
	const words = cleanedText.match(/\b\w+\b/g) || [];

	const sequence: number[] = words.map((word) => {
		return (word_index as Record<string, number>)[word] !== undefined
			? (word_index as Record<string, number>)[word]
			: oovIndex;
	});

	const paddedSequence = new Array(max_len).fill(0);
	for (let i = 0; i < Math.min(sequence.length, max_len); i++) {
		paddedSequence[i] = sequence[i];
	}

	return Float32Array.from(paddedSequence);
}

export async function POST(req: Request) {
	try {
		const { text } = await req.json();

		if (!text) {
			return NextResponse.json(
				{ error: "Teks tidak boleh kosong" },
				{ status: 400 }
			);
		}

		const inputVector = tokenizeAndPad(text);
		const tensorInput = new ort.Tensor("float32", inputVector, [
			1,
			meta.max_len
		]);

		const session = await getSession();
		const results = await session.run({
			[session.inputNames[0]]: tensorInput
		});
		const outputData = results[session.outputNames[0]].data as Float32Array;

		let maxIndex = 0;
		let maxVal = outputData[0];
		for (let i = 1; i < outputData.length; i++) {
			if (outputData[i] > maxVal) {
				maxVal = outputData[i];
				maxIndex = i;
			}
		}

		const predictedLabel = meta.categories[maxIndex] || "unknown";

		return NextResponse.json({
			success: true,
			text,
			prediction: {
				label: predictedLabel,
				confidence: Number((maxVal * 100).toFixed(2))
			}
		});
	} catch (error: any) {
		console.error("Vinext API Error:", error);
		return NextResponse.json(
			{ success: false, error: error.message },
			{ status: 500 }
		);
	}
}
