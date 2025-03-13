"use client";
import React from "react";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	Grid,
	IconButton,
	Paper,
	ThemeProvider,
	Typography,
	createTheme,
} from "@mui/material";
import { ShoppingCart, ArrowRight } from "lucide-react";
import HeroBanner from "./HeroBanner";
import ProductCard from "./ProductCard";
import PromotionalTile from "./PromotionalTile";
import LTOBanner from "./LTOBanner";
import NewsletterSignup from "./NewsletterSignup";

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
		h4: {
			fontFamily: "'Work Sans', sans-serif",
			fontWeight: 700,
		},
		h5: {
			fontFamily: "'Work Sans', sans-serif",
			fontWeight: 600,
		},
		h6: {
			fontFamily: "'Work Sans', sans-serif",
			fontWeight: 600,
		},
		body1: {
			fontFamily: "'Work Sans', sans-serif",
		},
		body2: {
			fontFamily: "'Work Sans', sans-serif",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					fontFamily: "'Work Sans', sans-serif",
				},
			},
		},
	},
};

const theme = createTheme(cmsTheme);

const HomePage = ({ initialData }) => {
	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					bgcolor: "background.default",
					minHeight: "100vh",
					padding: "10px 10px",
				}}
			>
				<LTOBanner />

				{initialData.components.map((component, index) => {
					switch (component.type) {
						case "lto":
							return <LTOBanner key={index} data={component.data} />;

						case "hero":
							return <HeroBanner key={index} data={component.data.content} />;

						case "productsGrid":
							return (
								<Container key={index} maxWidth="lg" sx={{ py: 8 }}>
									<Typography
										variant="h3"
										component="h2"
										textAlign="center"
										gutterBottom
										sx={{ mb: 6 }}
									>
										{component.data.title}
									</Typography>
									<Grid container spacing={4}>
										{component.data.products.map((product) => (
											<Grid item key={product.id} xs={12} sm={6} md={3}>
												<ProductCard product={product} />
											</Grid>
										))}
									</Grid>
								</Container>
							);

						case "promotionsGrid":
							return (
								<Container key={index} maxWidth="lg" sx={{ py: 8 }}>
									<Typography
										variant="h3"
										component="h2"
										textAlign="center"
										gutterBottom
										sx={{ mb: 6 }}
									>
										{component.data.title}
									</Typography>
									<Grid container mb={4} spacing={4}>
										{component.data.promotions.map((promo, promoIndex) => (
											<Grid
												item
												key={promoIndex}
												xs={12}
												md={
													component.data.promotions.length === 1
														? 12
														: component.data.promotions.length === 2
														? 6
														: 4
												}
											>
												<PromotionalTile
													promo={promo}
													singlePromo={component.data.promotions.length === 1}
												/>
											</Grid>
										))}
									</Grid>
								</Container>
							);

						case "navigation":
							return null;

						default:
							return null;
					}
				})}
			</Box>
		</ThemeProvider>
	);
};

export default HomePage;
