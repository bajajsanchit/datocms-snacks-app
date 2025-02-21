import { request } from "../lib/datocms";
import EcommerceStore from "../components/EcommerceStore";

const HOMEPAGE_QUERY = `
	{
  themeSetting {
    primaryColor {
      hex
    }
    secondaryColor {
      hex
    }
  }
  allProducts {
    id
    name
    description
    price
    image {
      id
      url
    }
  }
  allPromotions {
    id
    promotionCode
    description
    title
    backgroundColor {
      hex
    }
    validUntil
  }
  homepage {
    id
    _status
    _isValid
    _seoMetaTags {
      attributes
      content
    }
    homepageLayout {
      ... on HeroSectionRecord {
        id
		title
        description
        buttonText
        backgroundImage {
          alt
          url
        }
      }
    }
  }
}
`;

export default async function Home() {
	const data = await request({
		query: HOMEPAGE_QUERY,
		variables: { limit: 10 },
	});

	const transformedData = {
		hero: {
			title: data.homepage.homepageLayout[0].title,
			description: data.homepage.homepageLayout[0].description,
			ctaText: data.homepage.homepageLayout[0].buttonText,
			backgroundImage: data.homepage.homepageLayout[0].backgroundImage.url,
		},
		products: data.allProducts.map((product) => ({
			id: product.id,
			name: product.name,
			description: product.description,
			price: product.price,
			image: product.image.url,
			category: "Snacks",
		})),
		promotions: data.allPromotions.map((promo) => ({
			title: promo.title,
			description: promo.description,
			backgroundColor: promo.backgroundColor.hex,
			promotionCode: promo.promotionCode,
			validUntil: promo.validUntil,
		})),
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<EcommerceStore initialData={transformedData} />
		</main>
	);
}
