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

	return (
		<Paper
			sx={{
				position: "relative",
				height: "600px",
				color: "common.white",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${currentData.backgroundImage})`,
				display: "flex",
				alignItems: "center",
				transition: "background-image 0.5s ease-in-out",
			}}
		>
			<Container maxWidth="lg">
				<Box sx={{ maxWidth: "lg", mx: "auto", py: 8 }}>
					<Typography variant="h2" component="h1" sx={{ mb: 4 }}>
						{currentData.title}
					</Typography>
					<Typography variant="h5" sx={{ mb: 6, maxWidth: 600 }}>
						{currentData.description}
					</Typography>
					<Button
						variant="contained"
						size="large"
						endIcon={<ArrowRight />}
						sx={{ px: 4, py: 2 }}
					>
						{currentData.ctaText}
					</Button>
				</Box>
			</Container>

			{isCarousel && (
				<>
					<Box
						sx={{
							position: "absolute",
							bottom: 20,
							left: "50%",
							transform: "translateX(-50%)",
							display: "flex",
							gap: 1,
						}}
					>
						{data.map((_, index) => (
							<Box
								key={index}
								sx={{
									width: 10,
									height: 10,
									borderRadius: "50%",
									backgroundColor:
										index === currentSlide ? "white" : "rgba(255,255,255,0.5)",
									cursor: "pointer",
								}}
								onClick={() => setCurrentSlide(index)}
							/>
						))}
					</Box>
					<Button
						onClick={handlePrevSlide}
						sx={{
							position: "absolute",
							left: 20,
							top: "50%",
							transform: "translateY(-50%)",
							color: "white",
							backgroundColor: "rgba(0,0,0,0.3)",
							"&:hover": {
								backgroundColor: "rgba(0,0,0,0.5)",
							},
						}}
					>
						<ChevronLeft />
					</Button>
					<Button
						onClick={handleNextSlide}
						sx={{
							position: "absolute",
							right: 20,
							top: "50%",
							transform: "translateY(-50%)",
							color: "white",
							backgroundColor: "rgba(0,0,0,0.3)",
							"&:hover": {
								backgroundColor: "rgba(0,0,0,0.5)",
							},
						}}
					>
						<ChevronRight />
					</Button>
				</>
			)}
		</Paper>
	);
};

export default HeroBanner;
