"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const HeroBanner = ({ data }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const isCarousel = Array.isArray(data) && data.length > 1;

	useEffect(() => {
		if (!isCarousel) return;

		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % data.length);
		}, 5000);

		return () => clearInterval(timer);
	}, [isCarousel, data.length]);

	const handlePrevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
	};

	const handleNextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % data.length);
	};

	const currentData = isCarousel ? data[currentSlide] : data[0];
	const layout = currentData?.heroBannerLayout || "1";

	console.log(currentData, "cd");

	return (
		<Paper
			elevation={0}
			sx={{
				position: "relative",
				height: {
					xs: "500px",
					sm: "550px",
					md: "600px",
					lg: "700px",
				},
				color: "common.white",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundImage: `
          linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.1) 100%
          ),
          url(${currentData?.backgroundImage})
        `,
				display: "flex",
				alignItems: "center",
				transition: "all 0.6s ease-in-out",
				maxWidth: { xs: "100%", lg: "1400px" },
				borderRadius: { xs: "0", sm: "16px", md: "24px" },
				margin: { xs: 0, sm: "16px auto", md: "24px auto" },
				overflow: "hidden",
			}}
		>
			<Container
				maxWidth="lg"
				sx={{
					height: "100%",
					display: "flex",
					alignItems: "center",
					position: "relative",
				}}
			>
				<Box
					sx={{
						width: "100%",
						py: { xs: 3, sm: 4, md: 6, lg: 8 },
						px: { xs: 2, sm: 3, md: 4 },
						textAlign: layout === "2" ? "center" : "left",
						display: "flex",
						flexDirection: "column",
						alignItems: layout === "2" ? "center" : "flex-start",
						gap: { xs: 2, sm: 3, md: 4 },
					}}
				>
					<Typography
						variant="h1"
						component="h1"
						sx={{
							maxWidth:
								layout === "2"
									? { xs: "100%", md: "800px" }
									: { xs: "100%", md: "600px" },
							textAlign: layout === "2" ? "center" : "left",
							fontSize: {
								xs: "2rem",
								sm: "2.5rem",
								md: "3.5rem",
								lg: "4rem",
							},
							fontWeight: 700,
							letterSpacing: "-0.02em",
							lineHeight: { xs: 1.3, md: 1.2 },
							textShadow: "0 2px 4px rgba(0,0,0,0.15)",
						}}
					>
						{currentData?.title}
					</Typography>
					<Typography
						variant="h5"
						sx={{
							maxWidth:
								layout === "2"
									? { xs: "100%", md: "800px" }
									: { xs: "100%", md: "600px" },
							textAlign: layout === "2" ? "center" : "left",
							fontSize: {
								xs: "1rem",
								sm: "1.1rem",
								md: "1.4rem",
								lg: "1.5rem",
							},
							fontWeight: 400,
							lineHeight: 1.6,
							opacity: 0.9,
							mb: { xs: 2, sm: 3, md: 4 },
						}}
					>
						{currentData?.description}
					</Typography>
					<Button
						variant="contained"
						size="large"
						endIcon={<ArrowRight />}
						sx={{
							px: { xs: 3, sm: 4, md: 6 },
							py: { xs: 1.25, sm: 1.5, md: 2 },
							fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
							fontWeight: 600,
							borderRadius: "50px",
							textTransform: "none",
							transition: "all 0.3s ease",
							backgroundColor: "primary.main",
							"&:hover": {
								transform: "translateY(-2px)",
								boxShadow: (theme) =>
									`0 6px 20px ${theme.palette.primary.main}40`,
								backgroundColor: "primary.dark",
							},
						}}
					>
						{currentData?.ctaText}
					</Button>
				</Box>
			</Container>

			{isCarousel && (
				<>
					<Box
						sx={{
							position: "absolute",
							bottom: { xs: 12, sm: 16, md: 24 },
							left: "50%",
							transform: "translateX(-50%)",
							display: "flex",
							gap: { xs: 1, sm: 1.5 },
							zIndex: 2,
						}}
					>
						{data.map((_, index) => (
							<Box
								key={index}
								sx={{
									width: { xs: 6, sm: 8, md: 12 },
									height: { xs: 6, sm: 8, md: 12 },
									borderRadius: "50%",
									backgroundColor:
										index === currentSlide ? "white" : "rgba(255,255,255,0.4)",
									transition: "all 0.3s ease",
									cursor: "pointer",
									"&:hover": {
										transform: "scale(1.2)",
										backgroundColor: "white",
									},
								}}
								onClick={() => setCurrentSlide(index)}
							/>
						))}
					</Box>

					{/* Navigation Buttons - Hidden on mobile for better UX */}
					<Box
						sx={{
							display: { xs: "none", sm: "block" },
						}}
					>
						<Button
							onClick={handlePrevSlide}
							sx={{
								position: "absolute",
								left: { sm: 12, md: 20, lg: 32 },
								top: "50%",
								transform: "translateY(-50%)",
								color: "white",
								backgroundColor: "rgba(0,0,0,0.3)",
								backdropFilter: "blur(4px)",
								borderRadius: "50%",
								minWidth: { sm: "44px", md: "48px" },
								width: { sm: "44px", md: "48px" },
								height: { sm: "44px", md: "48px" },
								"&:hover": {
									backgroundColor: "rgba(0,0,0,0.5)",
									transform: "translateY(-50%) scale(1.1)",
								},
								transition: "all 0.3s ease",
							}}
						>
							<ChevronLeft />
						</Button>
						<Button
							onClick={handleNextSlide}
							sx={{
								position: "absolute",
								right: { sm: 12, md: 20, lg: 32 },
								top: "50%",
								transform: "translateY(-50%)",
								color: "white",
								backgroundColor: "rgba(0,0,0,0.3)",
								backdropFilter: "blur(4px)",
								borderRadius: "50%",
								minWidth: { sm: "44px", md: "48px" },
								width: { sm: "44px", md: "48px" },
								height: { sm: "44px", md: "48px" },
								"&:hover": {
									backgroundColor: "rgba(0,0,0,0.5)",
									transform: "translateY(-50%) scale(1.1)",
								},
								transition: "all 0.3s ease",
							}}
						>
							<ChevronRight />
						</Button>
					</Box>
				</>
			)}
		</Paper>
	);
};

export default HeroBanner;
