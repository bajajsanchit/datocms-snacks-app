/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.datocms-assets.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "datocms-snacks-app.vercel.app",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
