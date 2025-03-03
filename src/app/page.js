import { request } from "../lib/datocms";
import EcommerceStore from "../components/EcommerceStore";
import Navbar from "../components/Navbar";

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
          isFeatured
          image {
            url
          }
          description
          category
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

export default async function Home() {
	const data = await request({
		query: HOMEPAGE_QUERY,
	});

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
							category: product.category,
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
