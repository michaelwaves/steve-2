"use server";

import { MastraClient } from "@mastra/client-js";

const client = new MastraClient({
    baseUrl: "http://localhost:4111",
})
export async function getStockInfo(formData: FormData) {
    const ticker1 = formData.get("ticker1")?.toString();
    const ticker2 = formData.get("ticker2")?.toString();
    const email = formData.get("email")?.toString();
    const agent = client.getAgent("stockAgent");

    const prompt = `Which stock should I buy? ${ticker1} or ${ticker2}? Send a side by side report and analysis in beautifully formatted html with a modern, minimalist orange color theme to ${email}. Make sure to cite sources`

    const result = await agent.generate({
        messages:
            [{ role: "user", content: prompt }],
    });

    const response = result.response


    return result;
}