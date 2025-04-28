import { Work_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import ZipCodeUpdater from "@/components/ZipCodeUpdater";

const workSans = Work_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	display: "swap",
});

export const metadata = {
	title: "Modern E-commerce Store",
	description: "A beautiful e-commerce experience",
};

const mockFooterData = {
	layoutStyle: 1,
	brandLogo: {
		url: "https://datocms-snacks-app.vercel.app/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F152438%2F1740465653-snacks-logo.webp&w=256&q=75",
	},
	companyDescription:
		"We're a modern snacks platform dedicated to providing exceptional products and services. Our mission is to make online shopping simple, enjoyable, and accessible to everyone.",
	footerLinks: [
		{
			title: "Products",
			links: [
				{ text: "New Arrivals" },
				{ text: "Best Sellers" },
				{ text: "Discounts" },
				{ text: "Collections" },
			],
		},
		{
			title: "Company",
			links: [
				{ text: "About Us" },
				{ text: "Careers" },
				{ text: "Press" },
				{ text: "Contact" },
			],
		},
		{
			title: "Support",
			links: [
				{ text: "Help Center" },
				{ text: "Shipping" },
				{ text: "Returns" },
				{ text: "FAQ" },
			],
		},
		{
			title: "Legal",
			links: [{ text: "Terms" }, { text: "Privacy" }, { text: "Cookies" }],
		},
	],
	socialLinks: {
		facebook: "https://facebook.com",
		twitter: "https://twitter.com",
		instagram: "https://instagram.com",
		linkedin: "https://linkedin.com",
	},
	copyrightText: "© 2025 Modern E-commerce. All rights reserved.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={workSans.className}>
				<main>{children}</main>

				<ZipCodeUpdater />
				<Footer data={mockFooterData} />
			</body>
		</html>
	);
}
