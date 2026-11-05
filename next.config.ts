import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true
	},
	output: "export",
	images: {
		unoptimized: true // Wajib true untuk static export jika pakai next/image
	},
	webpack: (config, { isServer }) => {
		// 1. Aktifkan eksperimen async WebAssembly agar Webpack tidak error
		config.experiments = {
			...config.experiments,
			asyncWebAssembly: true
		};

		// 2. Tangani file .wasm agar diperlakukan sebagai aset mandiri (resource)
		config.module.rules.push({
			test: /\.wasm$/,
			type: "asset/resource",
			generator: {
				filename: "static/chunks/[path][name][ext]"
			}
		});

		return config;
	}
};

export default nextConfig;
