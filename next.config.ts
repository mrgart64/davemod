import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true
	},
	output: "export",
	images: {
		unoptimized: true // Wajib true untuk static export jika pakai next/image
	}
};

export default nextConfig;
