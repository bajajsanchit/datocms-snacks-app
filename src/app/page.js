import { request } from "../lib/datocms";
import EcommerceStore from "../components/EcommerceStore";
import Navbar from "../components/Navbar";
import { Box, Paper, Typography, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LaunchIcon from "@mui/icons-material/Launch";

export const revalidate = 0;

// const HOMEPAGE_QUERY = `
// 	{
//   themeSetting {
//     primaryColor {
//       hex
//     }
//     secondaryColor {
//       hex
//     }
//   }
//   allProducts {
//     id
//     name
//     description
//     price
//     category
//     image {
//       id
//       url
//     }
//   }
//   allPromotions {
//     id
//     promotionCode
//     description
//     title
//     backgroundColor {
//       hex
//     }
//     validUntil
//   }
//   homepage {
//     id
//     _status
//     _isValid
//     _seoMetaTags {
//       attributes
//       content
//     }
//     homepageLayout {
//       ... on ProductsGridRecord {
//         products {
//           image {
//             id
//             url
//           }
//           id
//           description
//           category
//           price
//           name
//           isFeatured
//         }
//         sectionTitle
//       }

//       ... on PromotionsGridRecord {
//         id
//         sectionTitle
//         promotions {
//           backgroundColor {
//             hex
//           }
//           description
//           id
//           promotionCode
//           promotionImage {
//             url
//           }
//           validUntil
//           title
//         }
//       }

//       ... on HeroSectionRecord {
//         id
//         title
//         description
//         buttonText
//         backgroundImage {
//           alt
//           url
//         }
//       }
//     }
//   }
// }
// `;

const SEO_QUERY = `
  {
    homepage {
      _seoMetaTags {
        attributes
        content
        tag
      }
    }
  }
`;

const HOMEPAGE_QUERY = `
	{
  homepage(orderBy: position_ASC) {
    homepageLayout {
      ... on NavigationRecord {
        id
        secondaryCta
        primaryCta
        navigationLinkTwo
        navigationLinkThree
        navigationLinkOne
        layoutStyle
        brandLogo {
          url
        }
      }
      ... on HomePageHeroRecord {
        id
        homePageHeroContent {
          title
          id
          description
          buttonText
          backgroundImage {
            url
          }
          heroBannerLayout
        }
      }
      ... on ProductsGridRecord {
        id
        sectionTitle
        products {
          price
          name
          image {
            url
          }
          description
        }
      }

	  ... on LtoBannerRecord {
        id
        messageOne
        messageThree
        messageTwo
        backgroundColor {
          hex
        }
      }

      ... on PromotionsGridRecord {
        id
        sectionTitle
        promotions {
          validUntil
          title
          promotionImage {
            url
          }
          promotionCode
          description
          backgroundColor {
            hex
          }
        }
      }
    }
  }
}
`;

export async function generateMetadata() {
	const seoData = await request({
		query: SEO_QUERY,
	});

	if (!seoData?.homepage?._seoMetaTags) {
		return {
			title: "Modern E-commerce Store",
			description: "A beautiful e-commerce experience",
		};
	}

	const metaTags = seoData.homepage._seoMetaTags;

	const metadata = {
		metadataBase: new URL(
			process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
		),
		openGraph: {
			images: [],
		},
		twitter: {
			images: [],
		},
	};

	metaTags.forEach((tag) => {
		if (tag.tag === "title") {
			metadata.title = tag.content;
		} else if (tag.tag === "meta") {
			const attrs = tag.attributes || {};

			if (attrs.name === "description") {
				metadata.description = attrs.content;
			}

			if (attrs.property?.startsWith("og:")) {
				if (attrs.property === "og:title") {
					metadata.openGraph.title = attrs.content;
				} else if (attrs.property === "og:description") {
					metadata.openGraph.description = attrs.content;
				} else if (attrs.property === "og:image") {
					metadata.openGraph.images.push(attrs.content);
				} else if (attrs.property === "og:locale") {
					metadata.openGraph.locale = attrs.content;
				} else if (attrs.property === "og:type") {
					metadata.openGraph.type = attrs.content;
				} else if (attrs.property === "og:site_name") {
					metadata.openGraph.siteName = attrs.content;
				}
			}

			if (attrs.name?.startsWith("twitter:")) {
				if (attrs.name === "twitter:title") {
					metadata.twitter.title = attrs.content;
				} else if (attrs.name === "twitter:description") {
					metadata.twitter.description = attrs.content;
				} else if (attrs.name === "twitter:image") {
					metadata.twitter.images.push(attrs.content);
				} else if (attrs.name === "twitter:card") {
					metadata.twitter.card = attrs.content;
				} else if (attrs.name === "twitter:site") {
					metadata.twitter.site = attrs.content;
				}
			}
		}
	});

	return metadata;
}

export default async function Home() {
	const data = await request({
		query: HOMEPAGE_QUERY,
	});

	if (
		!data.homepage?.homepageLayout ||
		data.homepage.homepageLayout.length === 0
	) {
		return (
			<Box
				component="main"
				sx={{
					display: "flex",
					minHeight: "100vh",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					bgcolor: "background.default",
				}}
			>
				<Paper
					elevation={3}
					sx={{
						p: 5,
						maxWidth: 500,
						mx: "auto",
						textAlign: "center",
						borderRadius: 2,
					}}
				>
					<AddCircleOutlineIcon
						sx={{ fontSize: 80, color: "primary.main", mb: 3 }}
					/>
					<Typography
						variant="h4"
						component="h1"
						gutterBottom
						fontWeight="bold"
					>
						All Project is set up. Start adding content!
					</Typography>
					<Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
						Your page is ready, but needs content. Add components in your
						DatoCMS dashboard to see them appear here.
					</Typography>
					<Button
						variant="contained"
						color="primary"
						size="large"
						href="https://dashboard.datocms.com/"
						target="_blank"
						rel="noopener noreferrer"
						startIcon={<LaunchIcon />}
						sx={{
							px: 3,
							py: 1.5,
							borderRadius: 2,
							textTransform: "none",
							fontWeight: "medium",
						}}
					>
						Go to DatoCMS Dashboard
					</Button>
				</Paper>
			</Box>
		);
	}

	const layoutComponents = data.homepage.homepageLayout
		.map((component, index) => {
			if ("primaryCta" in component) {
				return {
					type: "navigation",
					order: index,
					data: component,
				};
			} else if ("homePageHeroContent" in component) {
				return {
					type: "hero",
					order: index,
					data: {
						content: component.homePageHeroContent.map((content) => ({
							title: content.title,
							description: content.description,
							ctaText: content.buttonText,
							backgroundImage: content.backgroundImage.url,
							heroBannerLayout: content?.heroBannerLayout,
						})),
					},
				};
			} else if ("products" in component) {
				return {
					type: "productsGrid",
					order: index,
					data: {
						title: component.sectionTitle,
						products: component.products.map((product) => ({
							id: Math.random().toString(),
							name: product.name,
							description: product.description,
							price: product.price,
							image: product.image.url,
							category: product.category || "No category",
						})),
					},
				};
			} else if ("promotions" in component) {
				return {
					type: "promotionsGrid",
					order: index,
					data: {
						title: component.sectionTitle,
						promotions: component.promotions.map((promo) => ({
							title: promo.title,
							description: promo.description,
							backgroundColor: promo.backgroundColor.hex,
							promotionCode: promo.promotionCode,
							validUntil: promo.validUntil,
							image: promo.promotionImage?.url,
						})),
					},
				};
			} else if ("messageOne" in component) {
				return {
					type: "lto",
					order: index,
					data: {
						messageOne: component.messageOne || "",
						messageTwo: component.messageTwo || "",
						messageThree: component.messageThree || "",
						backgroundColor: component.backgroundColor?.hex || "#000000",
						textColor: "#FFFFFF",
						endDate: new Date(
							Date.now() + 7 * 24 * 60 * 60 * 1000
						).toISOString(),
						isActive: true,
					},
				};
			}
			return null;
		})
		.filter(Boolean);

	const sortedComponents = layoutComponents.sort((a, b) => a.order - b.order);

	return (
		<main className="flex min-h-screen flex-col">
			{sortedComponents.map((component, index) => {
				if (component.type === "navigation") {
					return <Navbar key={index} data={component.data} />;
				}
				return null;
			})}
			<div className="flex-1">
				<EcommerceStore initialData={{ components: sortedComponents }} />
			</div>
		</main>
	);
}
