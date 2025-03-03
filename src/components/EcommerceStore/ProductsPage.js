"use client";
import React from "react";
import { Container, Grid, Typography, Box, Paper } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductsPage = ({ data }) => {
	const products = data?.products || [];

	return (
		<Container maxWidth="xl" sx={{ py: 6 }}>
			<Paper
				elevation={0}
				sx={{ p: 4, mb: 4, borderRadius: 2, bgcolor: "background.paper" }}
			>
				<Typography
					variant="h3"
					component="h1"
					gutterBottom
					fontWeight="bold"
					textAlign="center"
					sx={{ mb: 4 }}
				>
					{data.title}
				</Typography>
			</Paper>

			<Box sx={{ mb: 2 }}>
				<Typography variant="subtitle1" fontWeight="medium">
					Showing {products.length} products
				</Typography>
			</Box>

			<Grid container spacing={3}>
				{products.length > 0 ? (
					products.map((product, idx) => (
						<Grid
							marginBottom={"20px"}
							item
							xs={12}
							sm={6}
							md={4}
							lg={3}
							key={idx}
						>
							<ProductCard product={product} />
						</Grid>
					))
				) : (
					<Grid item xs={12}>
						<Paper sx={{ textAlign: "center", py: 8, borderRadius: 2 }}>
							<Typography variant="h6">No products found.</Typography>
						</Paper>
					</Grid>
				)}
			</Grid>
		</Container>
	);
};

export default ProductsPage;
