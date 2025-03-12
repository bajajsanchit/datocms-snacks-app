import React, { useState } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	Container,
	Paper,
	Snackbar,
	Alert,
	Checkbox,
	FormControlLabel,
	styled,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const NewsletterContainer = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(4),
	backgroundColor: theme.palette.primary.light,
	color: theme.palette.primary.contrastText,
	borderRadius: theme.shape.borderRadius,
	position: "relative",
	overflow: "hidden",
}));

const BackgroundPattern = styled(Box)(({ theme }) => ({
	position: "absolute",
	top: 0,
	right: 0,
	bottom: 0,
	width: "40%",
	opacity: 0.1,
	backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
	[theme.breakpoints.down("md")]: {
		display: "none",
	},
}));

const FormContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(2),
	position: "relative",
	zIndex: 1,
	[theme.breakpoints.up("sm")]: {
		flexDirection: "row",
		alignItems: "flex-start",
	},
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	borderRadius: theme.shape.borderRadius,
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "transparent",
		},
		"&:hover fieldset": {
			borderColor: "transparent",
		},
		"&.Mui-focused fieldset": {
			borderColor: theme.palette.primary.main,
		},
	},
}));

const SubmitButton = styled(Button)(({ theme }) => ({
	height: "56px",
	[theme.breakpoints.down("sm")]: {
		width: "100%",
	},
}));

const NewsletterSignup = ({ data }) => {
	const [email, setEmail] = useState("");
	const [consent, setConsent] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	// Sample data
	const defaultData = {
		title: "Subscribe to Our Newsletter",
		subtitle:
			"Get exclusive offers, new product announcements, and style tips delivered to your inbox.",
		buttonText: "Subscribe",
		consentText:
			"I agree to receive marketing emails and accept the privacy policy",
		successMessage:
			"Thank you for subscribing! Check your email for a special welcome offer.",
	};

	const { title, subtitle, buttonText, consentText, successMessage } =
		data || defaultData;

	const handleSubmit = (e) => {
		e.preventDefault();

		// Basic validation
		if (!email) {
			setError("Please enter your email address");
			return;
		}

		if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			setError("Please enter a valid email address");
			return;
		}

		if (!consent) {
			setError("Please agree to the terms");
			return;
		}

		// Here you would typically send the data to your API
		console.log("Submitting email:", email);

		// Show success message
		setSuccess(true);
		setEmail("");
		setConsent(false);
		setError("");
	};

	const handleCloseSnackbar = () => {
		setSuccess(false);
	};

	return (
		<Container maxWidth="md" sx={{ py: 6 }}>
			<NewsletterContainer elevation={3}>
				<BackgroundPattern />

				<Box sx={{ position: "relative", zIndex: 1 }}>
					<Typography variant="h4" gutterBottom>
						{title}
					</Typography>

					<Typography variant="subtitle1" sx={{ mb: 4, maxWidth: "80%" }}>
						{subtitle}
					</Typography>

					<form onSubmit={handleSubmit}>
						<FormContainer>
							<StyledTextField
								fullWidth
								variant="outlined"
								placeholder="Your email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								error={!!error}
								helperText={error}
								InputProps={{
									startAdornment: (
										<MailOutlineIcon color="action" sx={{ mr: 1 }} />
									),
								}}
							/>

							<SubmitButton
								type="submit"
								variant="contained"
								color="secondary"
								size="large"
							>
								{buttonText}
							</SubmitButton>
						</FormContainer>

						<FormControlLabel
							control={
								<Checkbox
									checked={consent}
									onChange={(e) => setConsent(e.target.checked)}
									color="secondary"
								/>
							}
							label={consentText}
							sx={{ mt: 2, color: "text.secondary" }}
						/>
					</form>
				</Box>
			</NewsletterContainer>

			<Snackbar
				open={success}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity="success"
					sx={{ width: "100%" }}
				>
					{successMessage}
				</Alert>
			</Snackbar>
		</Container>
	);
};

export default NewsletterSignup;
