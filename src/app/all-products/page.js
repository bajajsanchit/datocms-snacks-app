import React from "react";
import { request } from "@/lib/datocms";
import Navbar from "@/components/Navbar";
import ProductsPage from "@/components/EcommerceStore/ProductsPage";
import { ThemeProvider, createTheme, Box } from "@mui/material";

const PRODUCTS_QUERY = `
	{
		allSnackProducts {
			productName
			productimage
			size
			snacktype
			productEnableFor
			price
			flavor
			brand
		}
	}
`;

const NAVIGATION_QUERY = `
	{
		homepage(orderBy: position_ASC) {
			homepageLayout {
				... on NavigationRecord {
					id
					secondaryCta
					primaryCta
					navigationLinkTwo
					navigationLinkThree
					navigationLinkOne
					layoutStyle
					brandLogo {
						url
					}
				}
			}
		}
	}
`;

// Theme configuration
const cmsTheme = {
	palette: {
		primary: {
			main: "#107cbd",
		},
		secondary: {
			main: "#4ECDC4",
		},
		background: {
			default: "#FFFAF0",
			paper: "#FFFFFF",
		},
	},
	typography: {
		fontFamily: "'Work Sans', sans-serif",
		h1: {
			fontFamily: "'Work Sans', sans-serif",
			fontWeight: 700,
		},
		h2: {
			fontFamily: "'Work Sans', sans-serif",
			fontWeight: 700,
		},
		h3: {
			fontFamily: "'Work Sans', sans-serif",
			fontWeight: 700,
		},
	},
};

export default async function AllProductsPage() {
	try {
		const productsData = await request({
			query: PRODUCTS_QUERY,
		});

		const navData = await request({
			query: NAVIGATION_QUERY,
		});

		const navigationComponent = navData.homepage.homepageLayout.find(
			(component) => "primaryCta" in component
		);

		const transformedProducts = productsData.allSnackProducts.map(
			(product) => ({
				id: Math.random().toString(),
				name: product.productName,
				image: product.productimage,
				category: product.snacktype || "Snack",
				price: parseFloat(product.price.replace("$", "")),
				brand: product.brand,
				size: product.size,
				flavor: product.flavor,
				productEnableFor: product.productEnableFor,
			})
		);

		const pageData = {
			title: "All Snack Products",
			products: transformedProducts,
		};

		const serializedTheme = {
			palette: cmsTheme.palette,
			typography: cmsTheme.typography,
		};

		return (
			<>
				<main className="flex min-h-screen flex-col">
					{navigationComponent && <Navbar data={navigationComponent} />}
					<Box
						sx={{
							bgcolor: "#FFFAF0", // Use direct color value instead of theme reference
							minHeight: "100vh",
							padding: "10px 10px",
						}}
					>
						<ProductsPage data={pageData} themeData={serializedTheme} />
					</Box>
				</main>
			</>
		);
	} catch (error) {
		console.error("Error fetching data:", error);
		return (
			<div className="flex min-h-screen flex-col items-center justify-center">
				<h1 className="text-2xl font-bold">Error loading products</h1>
				<p>
					Sorry, we couldn&apos;t load the products. Please try again later.
				</p>
			</div>
		);
	}
}
