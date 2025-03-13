import React from "react";
import { Box, styled } from "@mui/material";
import { keyframes } from "@mui/system";

const marqueeAnimation = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const BannerContainer = styled(Box)(({ theme, backgroundColor }) => ({
	position: "relative",
	width: "100%",
	backgroundColor: backgroundColor || "#ff5722",
	overflow: "hidden",
	padding: theme.spacing(1, 0),
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

const MarqueeWrapper = styled(Box)({
	position: "relative",
	width: "100%",
	overflow: "hidden",
	display: "flex",
});

const MarqueeContent = styled(Box)(({ theme, textColor }) => ({
	whiteSpace: "nowrap",
	display: "inline-block",
	animation: `${marqueeAnimation} 15s linear infinite`,
	color: textColor || "white",
	fontWeight: "bold",
	fontSize: "1.25rem",
	textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
	zIndex: 2,
	position: "relative",
	padding: theme.spacing(1, 0),
	[theme.breakpoints.down("sm")]: {
		fontSize: "1rem",
	},
	[theme.breakpoints.up("md")]: {
		fontSize: "1.25rem",
	},
}));

const MessageItem = styled("span")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	display: "inline-block",
}));

const Separator = styled("span")(({ theme }) => ({
	padding: theme.spacing(0, 1),
	display: "inline-block",
}));

const LTOBanner = ({ data = {} }) => {
	const messages = [data.messageOne, data.messageTwo, data.messageThree].filter(
		Boolean
	);

	if (messages.length === 0) return null;

	const createMarqueeContent = () => {
		return (
			<>
				{messages.map((message, index) => (
					<React.Fragment key={index}>
						<MessageItem>{message}</MessageItem>
						{index < messages.length - 1 && <Separator>•</Separator>}
					</React.Fragment>
				))}
			</>
		);
	};

	return (
		<BannerContainer backgroundColor={data.backgroundColor || "#ff5722"}>
			<MarqueeWrapper>
				<MarqueeContent textColor={data.textColor?.hex || "#FFFFFF"}>
					{createMarqueeContent()}
					<Separator>•</Separator>
					{createMarqueeContent()}
				</MarqueeContent>
			</MarqueeWrapper>
		</BannerContainer>
	);
};

export default LTOBanner;
