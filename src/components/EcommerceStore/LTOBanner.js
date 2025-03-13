import React, { useState, useEffect } from "react";
import { Box, Typography, styled } from "@mui/material";
import { keyframes } from "@mui/system";

const fadeInOut = keyframes`
  0% { opacity: 0; transform: scale(0.9); }
  10% { opacity: 1; transform: scale(1); }
  90% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.9); }
`;

const BannerContainer = styled(Box)(({ theme, backgroundColor }) => ({
	position: "relative",
	width: "100%",
	height: 120,
	backgroundColor: backgroundColor || "#ff5722",
	overflow: "hidden",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	"&::before": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.1)",
		zIndex: 1,
	},
}));

const FlashingText = styled(Typography)(({ theme, duration, textColor }) => ({
	color: textColor || "white",
	fontWeight: "bold",
	textAlign: "center",
	zIndex: 2,
	animation: `${fadeInOut} ${duration}ms ease-in-out infinite`,
	textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
	padding: theme.spacing(2),
	[theme.breakpoints.down("sm")]: {
		fontSize: "1.5rem",
	},
	[theme.breakpoints.up("sm")]: {
		fontSize: "2rem",
	},
	[theme.breakpoints.up("md")]: {
		fontSize: "2.5rem",
	},
}));

const LTOBanner = ({ data = {} }) => {
	const messages = [data.messageOne, data.messageTwo, data.messageThree].filter(
		Boolean
	);

	const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
	const flashInterval = 2000;

	useEffect(() => {
		if (messages.length <= 1) return;

		const intervalId = setInterval(() => {
			setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
		}, flashInterval);

		return () => clearInterval(intervalId);
	}, [messages.length]);

	if (messages.length === 0) return null;

	return (
		<BannerContainer backgroundColor={data.backgroundColor?.hex || "#ff5722"}>
			<FlashingText
				variant="h3"
				duration={flashInterval}
				textColor={data.textColor?.hex || "#FFFFFF"}
			>
				{messages[currentMessageIndex]}
			</FlashingText>
		</BannerContainer>
	);
};

export default LTOBanner;
