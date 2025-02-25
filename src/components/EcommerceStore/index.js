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

const cmsTheme = {
	palette: {
		primary: {
			main: "#FF6B6B",
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
	console.log("intiial data", initialData);
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
				<HeroBanner data={initialData.hero} />

				<Container maxWidth="lg" sx={{ py: 8 }}>
					<Typography
						variant="h3"
						component="h2"
						textAlign="center"
						gutterBottom
						sx={{ mb: 6 }}
					>
						{initialData.title_one}
					</Typography>
					<Grid container spacing={4}>
						{initialData.homeSelectedProducts.map((product) => (
							<Grid item key={product.id} xs={12} sm={6} md={3}>
								<ProductCard product={product} />
							</Grid>
						))}
					</Grid>
				</Container>

				<Container maxWidth="lg" sx={{ py: 8 }}>
					<Typography
						variant="h3"
						component="h2"
						textAlign="center"
						gutterBottom
						sx={{ mb: 6 }}
					>
						{initialData.title_two}
					</Typography>
					<Grid container spacing={4}>
						{initialData.promotions.map((promo, index) => (
							<Grid
								item
								key={promo.id || index}
								xs={12}
								md={
									initialData.promotions.length === 1
										? 12
										: initialData.promotions.length === 2
										? 6
										: 4
								}
							>
								<PromotionalTile
									promo={promo}
									singlePromo={initialData.promotions.length === 1}
								/>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>
		</ThemeProvider>
	);
};

export default HomePage;
