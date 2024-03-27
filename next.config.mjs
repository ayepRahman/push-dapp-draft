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
			{
				protocol: "https",
				hostname: "epns-testing.infura-ipfs.io",
			},
			{
				protocol: "https",
				hostname: "i0.wp.com",
			},
		],
	},
};

export default nextConfig;
