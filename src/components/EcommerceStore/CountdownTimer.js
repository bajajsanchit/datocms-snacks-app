import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, styled } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const TimerContainer = styled(Paper)(({ theme, bgcolor }) => ({
	padding: theme.spacing(3),
	backgroundColor: bgcolor || theme.palette.secondary.main,
	color: theme.palette.secondary.contrastText,
	textAlign: "center",
	borderRadius: theme.shape.borderRadius,
}));

const TimeUnit = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: theme.spacing(1, 2),
	backgroundColor: "rgba(0, 0, 0, 0.2)",
	borderRadius: theme.shape.borderRadius,
	minWidth: 70,
}));

const TimeValue = styled(Typography)(({ theme }) => ({
	fontWeight: "bold",
	fontSize: "1.8rem",
	lineHeight: 1,
}));

const TimeLabel = styled(Typography)(({ theme }) => ({
	fontSize: "0.8rem",
	textTransform: "uppercase",
	marginTop: theme.spacing(0.5),
}));

const CountdownTimer = ({ data }) => {
	const defaultData = {
		title: "Flash Sale Ends In",
		endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
		backgroundColor: null,
		expiredMessage: "Sale has ended!",
		onComplete: () => console.log("Countdown completed"),
	};

	const { title, endDate, backgroundColor, expiredMessage, onComplete } =
		data || defaultData;

	const calculateTimeLeft = () => {
		const difference = new Date(endDate) - new Date();

		if (difference <= 0) {
			return {};
		}

		return {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / 1000 / 60) % 60),
			seconds: Math.floor((difference / 1000) % 60),
		};
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		// Check if timer has expired
		if (Object.keys(timeLeft).length === 0) {
			if (onComplete) onComplete();
			return;
		}

		// Set up the timer
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		// Clean up the timer
		return () => clearTimeout(timer);
	}, [timeLeft, onComplete, endDate]);

	const formatTime = (value) => {
		return value < 10 ? `0${value}` : value;
	};

	return (
		<TimerContainer elevation={3} bgcolor={backgroundColor}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					mb: 2,
				}}
			>
				<AccessTimeIcon sx={{ mr: 1 }} />
				<Typography variant="h5" component="h2">
					{title}
				</Typography>
			</Box>

			{Object.keys(timeLeft).length === 0 ? (
				<Typography variant="h6">{expiredMessage}</Typography>
			) : (
				<Grid container spacing={2} justifyContent="center">
					<Grid item>
						<TimeUnit>
							<TimeValue variant="h4">{formatTime(timeLeft.days)}</TimeValue>
							<TimeLabel variant="caption">Days</TimeLabel>
						</TimeUnit>
					</Grid>
					<Grid item>
						<TimeUnit>
							<TimeValue variant="h4">{formatTime(timeLeft.hours)}</TimeValue>
							<TimeLabel variant="caption">Hours</TimeLabel>
						</TimeUnit>
					</Grid>
					<Grid item>
						<TimeUnit>
							<TimeValue variant="h4">{formatTime(timeLeft.minutes)}</TimeValue>
							<TimeLabel variant="caption">Minutes</TimeLabel>
						</TimeUnit>
					</Grid>
					<Grid item>
						<TimeUnit>
							<TimeValue variant="h4">{formatTime(timeLeft.seconds)}</TimeValue>
							<TimeLabel variant="caption">Seconds</TimeLabel>
						</TimeUnit>
					</Grid>
				</Grid>
			)}
		</TimerContainer>
	);
};

export default CountdownTimer;
