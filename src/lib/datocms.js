import { GraphQLClient } from "graphql-request";

export function request({ query, variables = {}, includeDrafts = false }) {
	const headers = {
		authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
	};

	if (includeDrafts) {
		headers["X-Include-Drafts"] = "true";
	}

	const client = new GraphQLClient("https://graphql.datocms.com", { headers });
	return client.request(query, variables);
}

export function responsiveImageFragment() {
	return `
    fragment responsiveImageFragment on ResponsiveImage {
      srcSet
      webpSrcSet
      sizes
      src
      width
      height
      aspectRatio
      alt
      title
      base64
    }
  `;
}
