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
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
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
	<Card>
		<CardMedia
			component="img"
			height="200"
			image={product.image}
			alt={product.name}
		/>
		<CardContent>
			<Typography gutterBottom variant="h6" component="h3">
				{product.name}
			</Typography>
			<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
				{product.category}
			</Typography>
			<Typography variant="body2" color="text.secondary">
				{product.description}
			</Typography>
		</CardContent>
		<CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
			<Typography variant="h6" component="span">
				${product.price}
			</Typography>
			<IconButton
				color="primary"
				sx={{
					bgcolor: "primary.main",
					color: "common.white",
					"&:hover": {
						bgcolor: "primary.dark",
					},
				}}
			>
				<ShoppingCart />
			</IconButton>
		</CardActions>
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
						Popular Snacks
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
