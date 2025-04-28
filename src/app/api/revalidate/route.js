import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function POST(request) {
	const headersList = headers();
	const authorization = headersList.get("Authorization");

	// Verify the webhook secret (you'll need to set this in your environment variables)
	if (authorization !== `Bearer ${process.env.DATOCMS_WEBHOOK_SECRET}`) {
		return new Response("Unauthorized", { status: 401 });
	}

	try {
		revalidatePath("/");

		return new Response("Revalidation successful", { status: 200 });
	} catch (err) {
		return new Response(err.message, { status: 500 });
	}
}
