import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	display: "swap",
});

export const metadata = {
	title: "Modern E-commerce Store",
	description: "A beautiful e-commerce experience",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={workSans.className}>{children}</body>
		</html>
	);
}
