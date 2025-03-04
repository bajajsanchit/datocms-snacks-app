"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
	AppBar,
	Toolbar,
	Button,
	Box,
	Container,
	Typography,
	useTheme,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ data }) => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const {
		layoutStyle,
		brandLogo,
		navigationLinkOne,
		navigationLinkTwo,
		navigationLinkThree,
		primaryCta,
		secondaryCta,
	} = data;

	const getPathFromNavText = (text) => {
		if (!text) return "#";
		return `/${text.toLowerCase().replace(/\s+/g, "-")}`;
	};

	const commonButtonStyles = {
		textTransform: "none",
		fontFamily: "'Work Sans', sans-serif",
	};

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const mobileDrawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Box sx={{ my: 2 }}>
				<Image src={brandLogo.url} alt="Brand Logo" width={100} height={35} />
			</Box>
			<List>
				{navigationLinkOne && (
					<ListItem disablePadding>
						<ListItemButton
							component={Link}
							href={getPathFromNavText(navigationLinkOne)}
							sx={{ textAlign: "center" }}
						>
							<ListItemText primary={navigationLinkOne} />
						</ListItemButton>
					</ListItem>
				)}
				{navigationLinkTwo && (
					<ListItem disablePadding>
						<ListItemButton
							component={Link}
							href={getPathFromNavText(navigationLinkTwo)}
							sx={{ textAlign: "center" }}
						>
							<ListItemText primary={navigationLinkTwo} />
						</ListItemButton>
					</ListItem>
				)}
				{navigationLinkThree && (
					<ListItem disablePadding>
						<ListItemButton
							component={Link}
							href={getPathFromNavText(navigationLinkThree)}
							sx={{ textAlign: "center" }}
						>
							<ListItemText primary={navigationLinkThree} />
						</ListItemButton>
					</ListItem>
				)}
				{secondaryCta && (
					<ListItem disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText primary={secondaryCta} />
						</ListItemButton>
					</ListItem>
				)}
				{primaryCta && (
					<ListItem disablePadding>
						<ListItemButton
							sx={{
								textAlign: "center",
								bgcolor: theme.palette.primary.main,
								color: theme.palette.primary.contrastText,
								"&:hover": {
									bgcolor: theme.palette.primary.dark,
								},
								my: 1,
								mx: 2,
								borderRadius: 1,
							}}
						>
							<ListItemText primary={primaryCta} />
						</ListItemButton>
					</ListItem>
				)}
			</List>
		</Box>
	);

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

					{isMobile ? (
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="end"
							onClick={handleDrawerToggle}
						>
							<MenuIcon />
						</IconButton>
					) : (
						<>
							<Box sx={{ display: "flex", gap: 3 }}>
								<Button
									component={Link}
									href={getPathFromNavText(navigationLinkOne)}
									color="inherit"
									sx={{ textTransform: "none" }}
								>
									{navigationLinkOne}
								</Button>
								<Button
									component={Link}
									href={getPathFromNavText(navigationLinkTwo)}
									color="inherit"
									sx={{ textTransform: "none" }}
								>
									{navigationLinkTwo}
								</Button>
								<Button
									component={Link}
									href={getPathFromNavText(navigationLinkThree)}
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
						</>
					)}
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

					{isMobile ? (
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="end"
							onClick={handleDrawerToggle}
						>
							<MenuIcon />
						</IconButton>
					) : (
						<Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
							<Button
								component={Link}
								href={getPathFromNavText(navigationLinkOne)}
								color="inherit"
								sx={{ textTransform: "none" }}
							>
								{navigationLinkOne}
							</Button>
							<Button
								component={Link}
								href={getPathFromNavText(navigationLinkTwo)}
								color="inherit"
								sx={{ textTransform: "none" }}
							>
								{navigationLinkTwo}
							</Button>
							<Button
								component={Link}
								href={getPathFromNavText(navigationLinkThree)}
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
					)}
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

					{isMobile ? (
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="end"
							onClick={handleDrawerToggle}
						>
							<MenuIcon />
						</IconButton>
					) : (
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
					)}
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
						position: "relative",
						minHeight: "80px",
					}}
				>
					{isMobile ? (
						<>
							<Box sx={{ flexShrink: 0 }}>
								<Image
									src={brandLogo.url}
									alt="Brand Logo"
									width={100}
									height={35}
								/>
							</Box>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								edge="end"
								onClick={handleDrawerToggle}
							>
								<MenuIcon />
							</IconButton>
						</>
					) : (
						<>
							{/* Left side - Navigation Links */}
							<Box sx={{ display: "flex", gap: 3, flex: 1 }}>
								<Button
									component={Link}
									href={getPathFromNavText(navigationLinkOne)}
									color="inherit"
									sx={{ textTransform: "none" }}
								>
									{navigationLinkOne}
								</Button>
								<Button
									component={Link}
									href={getPathFromNavText(navigationLinkTwo)}
									color="inherit"
									sx={{ textTransform: "none" }}
								>
									{navigationLinkTwo}
								</Button>
								<Button
									component={Link}
									href={getPathFromNavText(navigationLinkThree)}
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
						</>
					)}
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
	return (
		<>
			<SelectedLayout />
			<Drawer
				anchor="right"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true, // Better mobile performance
				}}
				sx={{
					display: { xs: "block", md: "none" },
					"& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
				}}
			>
				{mobileDrawer}
			</Drawer>
		</>
	);
};

export default Navbar;
