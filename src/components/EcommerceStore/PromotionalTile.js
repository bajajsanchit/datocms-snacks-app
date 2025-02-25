import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const PromotionalTile = ({ promo, singlePromo = false }) => (
	<Paper
		sx={{
			height: "100%",
			color: "common.black",
			bgcolor: promo.backgroundColor.hex,
			overflow: "hidden",
			display: "flex",
			flexDirection: singlePromo ? "row" : "column",
			borderRadius: "20px",
		}}
	>
		{promo.image && (
			<Box
				component="img"
				src={promo.image}
				alt={promo.title}
				sx={{
					width: singlePromo ? "50%" : "100%",
					height: singlePromo ? "100%" : "300px",
					objectFit: "cover",
					order: singlePromo ? 2 : 0,
				}}
			/>
		)}
		<Box
			sx={{
				p: 4,
				flex: 1,
				background: promo.backgroundColor,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
			}}
		>
			<Typography
				variant="h4"
				component="h3"
				gutterBottom
				sx={{
					textTransform: "uppercase",
					fontWeight: 700,
					mb: 2,
					color: "black",
					lineHeight: 1.2,
				}}
			>
				{promo.title}
			</Typography>

			<Typography
				variant="h6"
				gutterBottom
				sx={{
					fontWeight: 500,
					mb: 3,
					opacity: 0.9,
				}}
			>
				{promo.description}
			</Typography>

			<Typography
				variant="body1"
				sx={{
					mt: 3,
					display: "flex",
					alignItems: "center",
					gap: 1,
				}}
			>
				Use code:
				<Box
					component="strong"
					sx={{
						backgroundColor: "rgba(0,0,0,0.08)",
						px: 2,
						py: 1,
						borderRadius: 1,
						fontFamily: "monospace",
						fontSize: "1.1em",
					}}
				>
					{promo.promotionCode}
				</Box>
			</Typography>

			<Typography
				variant="body2"
				sx={{
					mt: 2,
					opacity: 0.8,
					fontStyle: "italic",
				}}
			>
				Valid until: {promo.validUntil}
			</Typography>
		</Box>
	</Paper>
);

export default PromotionalTile;
