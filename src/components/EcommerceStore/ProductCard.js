import React from "react";
import {
	Button,
	Card,
	CardContent,
	CardMedia,
	Typography,
	Box,
} from "@mui/material";

const ProductCard = ({ product }) => (
	<Card
		sx={{
			height: "100%",
			display: "flex",
			flexDirection: "column",
			position: "relative",
			padding: "18px",
			transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
			"&:hover": {
				transform: "translateY(-4px)",
				boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
			},
		}}
	>
		<Box
			sx={{
				position: "relative",
				pt: "100%",
				overflow: "hidden",
			}}
		>
			<CardMedia
				component="img"
				image={product.image}
				alt={product.name}
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					objectFit: "contain",
				}}
			/>
		</Box>
		<CardContent
			sx={{
				flexGrow: 1,
				display: "flex",
				flexDirection: "column",
				gap: 1,
				p: 2,
			}}
		>
			<Typography
				fontSize={"16px"}
				textTransform={"capitalize"}
				variant="h6"
				lineHeight={"1.5"}
				component="h3"
				sx={{
					overflow: "hidden",
					textOverflow: "ellipsis",
					display: "-webkit-box",
					WebkitLineClamp: 2,
					WebkitBoxOrient: "vertical",
					height: "48px",
				}}
			>
				{product.name}
			</Typography>
			<Typography
				variant="body2"
				color="text.secondary"
				sx={{
					bgcolor: "#ED550E30",
					display: "inline-block",
					padding: "4px 12px",
					borderRadius: "20px",
					textTransform: "uppercase",
					fontSize: "11px",
					fontWeight: "600",
					alignSelf: "flex-start",
				}}
			>
				{product.category}
			</Typography>
			<Typography
				variant="h6"
				component="div"
				sx={{
					mt: "auto",
					fontWeight: "600",
					fontSize: "18px",
					color: "primary.main",
				}}
			>
				${product.price.toFixed(2)}
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
				transition: "background-color 0.2s ease-in-out",
				"&:hover": {
					background: "#333",
				},
			}}
		>
			Add to Cart
		</Button>
	</Card>
);

export default ProductCard;
