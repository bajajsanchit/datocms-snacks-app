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

const HeroBanner = ({ data }) => (
	<Paper
		sx={{
			position: "relative",
			height: "600px",
			color: "common.white",
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${data.backgroundImage})`,
			display: "flex",
			alignItems: "center",
		}}
	>
		<Container maxWidth="lg">
			<Box sx={{ maxWidth: "lg", mx: "auto", py: 8 }}>
				<Typography variant="h2" component="h1" sx={{ mb: 4 }}>
					{data.title}
				</Typography>
				<Typography variant="h5" sx={{ mb: 6, maxWidth: 600 }}>
					{data.description}
				</Typography>
				<Button
					variant="contained"
					size="large"
					endIcon={<ArrowRight />}
					sx={{ px: 4, py: 2 }}
				>
					{data.ctaText}
				</Button>
			</Box>
		</Container>
	</Paper>
);

const ProductCard = ({ product }) => (
	<Card sx={{ margin: "12px" }}>
		<CardMedia
			component="img"
			height="200"
			image={product.image}
			alt={product.name}
			sx={{ objectFit: "contain", margin: "15px" }}
		/>
		<CardContent>
			<Typography
				fontSize={"16px"}
				textTransform={"capitalize"}
				variant="h6"
				lineHeight={"1.5"}
				component="h3"
				marginBottom={"8px"}
			>
				{product.name}
			</Typography>
			<Typography
				variant="body2"
				color="text.secondary"
				sx={{
					mb: 1,
					bgcolor: "#ED550E30",
					display: "inline-block",
					padding: "5px 10px",
					borderRadius: "20px",
					textTransform: "uppercase",
					fontSize: "12px",
					fontWeight: "700",
				}}
			>
				{product.category}
			</Typography>
			{/* <Typography variant="body2" color="text.secondary">
				{product.description}
			</Typography> */}
			<Typography display={"flex"} variant="h6" component="div">
				${product.price}
			</Typography>
		</CardContent>
		<Button
			sx={{
				background: "black",
				cursor: "pointer",
				fontWeight: "700",
				textAlign: "center",
				textTransform: "uppercase",
				color: "white",
				width: "100%",
				borderRadius: 0,
				padding: "12px 0",
			}}
		>
			Add to Cart
		</Button>
	</Card>
);

const PromotionalTile = ({ promo }) => (
	<Paper
		sx={{
			p: 4,
			height: "100%",
			color:
				promo.backgroundColor === "#E5D1D1" ? "common.black" : "common.white",
			bgcolor: promo.backgroundColor,
		}}
	>
		<Typography variant="h4" component="h3" gutterBottom>
			{promo.title}
		</Typography>
		<Typography variant="h6" gutterBottom>
			{promo.description}
		</Typography>
		<Typography variant="body1" sx={{ mt: 2 }}>
			Use code: <strong>{promo.promotionCode}</strong>
		</Typography>
		<Typography variant="body2" sx={{ mt: 1 }}>
			Valid until: {promo.validUntil}
		</Typography>
	</Paper>
);

const HomePage = ({ initialData }) => {
	// console.log("initial data", initialData);
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
						{initialData.products.map((product) => (
							<Grid item key={product.id} xs={12} sm={6} md={4}>
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
						{initialData.homeSelectedProducts.map((product) => (
							<Grid item key={product.id} xs={12} sm={6} md={4}>
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
						Special Offers
					</Typography>
					<Grid container spacing={4}>
						{initialData.promotions.map((promo, index) => (
							<Grid item key={promo.id || index} xs={12} md={4}>
								<PromotionalTile promo={promo} />
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>
		</ThemeProvider>
	);
};

export default HomePage;
