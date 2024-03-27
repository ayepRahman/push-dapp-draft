/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/",
				destination: "/channels",
				permanent: true,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "push.org",
			},
			{
				protocol: "https",
				hostname: "google.com",
			},
			{
				protocol: "https",
				hostname: "gateway.ipfs.io",
			},
		],
	},
};

export default nextConfig;
