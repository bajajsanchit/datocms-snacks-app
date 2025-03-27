"use client";
import Image from "next/image";
import Link from "next/link";
import {
	Box,
	Container,
	Typography,
	Grid,
	Stack,
	IconButton,
	Divider,
	useTheme,
	TextField,
	Button,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useRef } from "react";
import { useZipcode } from "./ZipcodeContext";

const Footer = ({ data }) => {
	const {
		layoutStyle,
		brandLogo,
		companyDescription,
		footerLinks,
		socialLinks,
		copyrightText,
	} = data;

	const { setZipcode } = useZipcode();
	const zipcodeRef = useRef(null);

	const handleZipcodeUpdate = () => {
		const newZipcode = zipcodeRef.current.value;
		console.log("Updated zipcode:", newZipcode);
		setZipcode(newZipcode);
	};

	const getPathFromLinkText = (text) => {
		if (!text) return "#";
		return `/${text.toLowerCase().replace(/\s+/g, "-")}`;
	};

	const renderZipcodeForm = () => (
		<Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
			<TextField
				size="small"
				label="Zipcode"
				variant="outlined"
				inputRef={zipcodeRef}
				sx={{ maxWidth: 120 }}
			/>
			<Button variant="contained" size="small" onClick={handleZipcodeUpdate}>
				Update
			</Button>
		</Box>
	);

	const renderSocialIcons = () => (
		<Stack direction="row" spacing={1}>
			{socialLinks.facebook && (
				<IconButton
					aria-label="Facebook"
					component="a"
					href={socialLinks.facebook}
				>
					<FacebookIcon />
				</IconButton>
			)}
			{socialLinks.twitter && (
				<IconButton
					aria-label="Twitter"
					component="a"
					href={socialLinks.twitter}
				>
					<TwitterIcon />
				</IconButton>
			)}
			{socialLinks.instagram && (
				<IconButton
					aria-label="Instagram"
					component="a"
					href={socialLinks.instagram}
				>
					<InstagramIcon />
				</IconButton>
			)}
			{socialLinks.linkedin && (
				<IconButton
					aria-label="LinkedIn"
					component="a"
					href={socialLinks.linkedin}
				>
					<LinkedInIcon />
				</IconButton>
			)}
		</Stack>
	);

	const renderLayout1 = () => (
		<Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
			<Container maxWidth="lg">
				<Grid container spacing={4}>
					<Grid item xs={12} md={4}>
						<Box sx={{ mb: 2 }}>
							<Image
								src={brandLogo.url}
								alt="Brand Logo"
								width={120}
								height={40}
							/>
						</Box>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
							{companyDescription}
						</Typography>
						{renderSocialIcons()}
						{renderZipcodeForm()}
					</Grid>

					{/* Footer links columns */}
					{footerLinks.map((column, index) => (
						<Grid item xs={6} md={2} key={index}>
							<Typography variant="subtitle1" color="text.primary" gutterBottom>
								{column.title}
							</Typography>
							<Stack spacing={1}>
								{column.links.map((link, linkIndex) => (
									<Typography
										key={linkIndex}
										variant="body2"
										component={Link}
										href={getPathFromLinkText(link.text)}
										sx={{
											color: "text.secondary",
											textDecoration: "none",
											"&:hover": { color: "primary.main" },
										}}
									>
										{link.text}
									</Typography>
								))}
							</Stack>
						</Grid>
					))}
				</Grid>

				<Divider sx={{ my: 4 }} />

				<Typography variant="body2" color="text.secondary" align="center">
					{copyrightText}
				</Typography>
			</Container>
		</Box>
	);

	const renderLayout2 = () => (
		<Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
			<Container maxWidth="lg">
				{/* Top section with logo and social icons */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mb: 4,
					}}
				>
					<Image src={brandLogo.url} alt="Brand Logo" width={120} height={40} />
					<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
						{renderZipcodeForm()}
						{renderSocialIcons()}
					</Box>
				</Box>

				<Divider sx={{ mb: 4 }} />

				{/* Links in a single row */}
				<Grid container spacing={2} sx={{ mb: 4 }}>
					{footerLinks.flatMap((column) =>
						column.links.map((link, linkIndex) => (
							<Grid item key={linkIndex}>
								<Typography
									variant="body2"
									component={Link}
									href={getPathFromLinkText(link.text)}
									sx={{
										color: "text.secondary",
										textDecoration: "none",
										"&:hover": { color: "primary.main" },
									}}
								>
									{link.text}
								</Typography>
							</Grid>
						))
					)}
				</Grid>

				{/* Bottom section with description and copyright */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						flexWrap: "wrap",
					}}
				>
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{ maxWidth: "60%", mb: { xs: 2, md: 0 } }}
					>
						{companyDescription}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{copyrightText}
					</Typography>
				</Box>
			</Container>
		</Box>
	);

	const layouts = {
		1: renderLayout1,
		2: renderLayout2,
	};

	const SelectedLayout = layouts[layoutStyle] || layouts["1"];
	return <SelectedLayout />;
};

export default Footer;
