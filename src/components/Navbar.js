"use client";
import Image from "next/image";
import Link from "next/link";
import {
	AppBar,
	Toolbar,
	Button,
	Box,
	Container,
	Typography,
	useTheme,
} from "@mui/material";

const Navbar = ({ data }) => {
	const {
		layoutStyle,
		brandLogo,
		navigationLinkOne,
		navigationLinkTwo,
		navigationLinkThree,
		primaryCta,
		secondaryCta,
	} = data;

	const commonButtonStyles = {
		textTransform: "none",
		fontFamily: "'Work Sans', sans-serif",
	};

	const renderLayout1 = () => (
		<AppBar position="static" color="default" elevation={1}>
			<Container maxWidth="lg">
				<Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
					<Box sx={{ flexShrink: 0 }}>
						<Image
							src={brandLogo.url}
							alt="Brand Logo"
							width={120}
							height={40}
						/>
					</Box>

					<Box sx={{ display: "flex", gap: 3 }}>
						<Button
							component={Link}
							href="#"
							color="inherit"
							sx={{ textTransform: "none" }}
						>
							{navigationLinkOne}
						</Button>
						<Button
							component={Link}
							href="#"
							color="inherit"
							sx={{ textTransform: "none" }}
						>
							{navigationLinkTwo}
						</Button>
						<Button
							component={Link}
							href="#"
							color="inherit"
							sx={{ textTransform: "none" }}
						>
							{navigationLinkThree}
						</Button>
					</Box>

					<Box sx={{ display: "flex", gap: 2 }}>
						<Button color="inherit" sx={{ textTransform: "none" }}>
							{secondaryCta}
						</Button>
						<Button
							variant="contained"
							color="primary"
							sx={{ textTransform: "none" }}
						>
							{primaryCta}
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);

	const renderLayout2 = () => (
		<AppBar position="static" color="default" elevation={1}>
			<Container maxWidth="lg">
				<Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
					<Box sx={{ flexShrink: 0 }}>
						<Image
							src={brandLogo.url}
							alt="Brand Logo"
							width={120}
							height={40}
						/>
					</Box>

					<Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
						<Button
							component={Link}
							href="#"
							color="inherit"
							sx={{ textTransform: "none" }}
						>
							{navigationLinkOne}
						</Button>
						<Button
							component={Link}
							href="#"
							color="inherit"
							sx={{ textTransform: "none" }}
						>
							{navigationLinkTwo}
						</Button>
						<Button
							component={Link}
							href="#"
							color="inherit"
							sx={{ textTransform: "none" }}
						>
							{navigationLinkThree}
						</Button>
						<Button color="inherit" sx={{ textTransform: "none" }}>
							{secondaryCta}
						</Button>
						<Button
							variant="contained"
							color="primary"
							sx={{ textTransform: "none" }}
						>
							{primaryCta}
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);

	const renderLayout3 = () => (
		<AppBar position="static" color="default" elevation={1}>
			<Container maxWidth="lg">
				<Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
					<Box sx={{ flexShrink: 0 }}>
						<Image
							src={brandLogo.url}
							alt="Brand Logo"
							width={120}
							height={40}
						/>
					</Box>

					<Box sx={{ display: "flex", gap: 2 }}>
						<Button color="inherit" sx={{ textTransform: "none" }}>
							{secondaryCta}
						</Button>
						<Button
							variant="contained"
							color="primary"
							sx={{ textTransform: "none" }}
						>
							{primaryCta}
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);

	const renderLayout4 = () => (
		<AppBar position="static" color="default" elevation={1}>
			<Container maxWidth="lg">
				<Toolbar
					disableGutters
					sx={{
						justifyContent: "space-between",
						position: "relative", // For absolute positioning of center logo
						minHeight: "80px", // Ensure consistent height
					}}
				>
					{/* Left side - Navigation Links */}
					<Box sx={{ display: "flex", gap: 3, flex: 1 }}>
						<Button
							component={Link}
							href="#"
							color="inherit"
							sx={{ textTransform: "none" }}
						>
							{navigationLinkOne}
						</Button>
						<Button
							component={Link}
							href="#"
							color="inherit"
							sx={{ textTransform: "none" }}
						>
							{navigationLinkTwo}
						</Button>
						<Button
							component={Link}
							href="#"
							color="inherit"
							sx={{ textTransform: "none" }}
						>
							{navigationLinkThree}
						</Button>
					</Box>

					{/* Center - Logo */}
					<Box
						sx={{
							position: "absolute",
							left: "50%",
							top: "50%",
							transform: "translate(-50%, -50%)",
							zIndex: 1,
						}}
					>
						<Image
							src={brandLogo.url}
							alt="Brand Logo"
							width={120}
							height={40}
						/>
					</Box>

					{/* Right side - CTAs */}
					<Box
						sx={{
							display: "flex",
							gap: 2,
							flex: 1,
							justifyContent: "flex-end",
						}}
					>
						<Button color="inherit" sx={{ textTransform: "none" }}>
							{secondaryCta}
						</Button>
						<Button
							variant="contained"
							color="primary"
							sx={{ textTransform: "none" }}
						>
							{primaryCta}
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);

	const layouts = {
		1: renderLayout1,
		2: renderLayout2,
		3: renderLayout3,
		4: renderLayout4,
	};

	const SelectedLayout = layouts[layoutStyle] || layouts["1"];
	return <SelectedLayout />;
};

export default Navbar;
