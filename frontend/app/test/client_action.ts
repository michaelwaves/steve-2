"use server";

import { MastraClient } from "@mastra/client-js";
import { CompletenessMetric } from "@mastra/evals/nlp";
import { openai } from "@ai-sdk/openai";
import { AnswerRelevancyMetric, BiasMetric } from "@mastra/evals/llm";
const client = new MastraClient({
    baseUrl: "http://localhost:4111",
})
export async function getStockInfo(formData: FormData) {
    const ticker1 = formData.get("ticker1")?.toString();
    const ticker2 = formData.get("ticker2")?.toString();
    const email = formData.get("email")?.toString();
    const agent = client.getAgent("stockAgent");

    const prompt = `Which stock should I buy? ${ticker1} or ${ticker2}? Send a side by side report and analysis in beautifully formatted html with a modern, minimalist orange color theme to ${email}. Make sure to cite sources`

    const prompt2 = "just respond with hello and nothing else"

    const result = await agent.generate({
        messages:
            [{ role: "user", content: prompt }],
    });

    const response = result.response.body.choices[0].message.content

    console.log(response)

    //completeness
    const metric = new CompletenessMetric();
    const completeness = await metric.measure(
        prompt, response
    );

    console.log(completeness.score); // Coverage score from 0-1
    console.log(completeness.info)

    //relevancy
    // Configure the model for evaluation
    const model = openai("gpt-4o-mini");

    const answerRelevancyMetric = new AnswerRelevancyMetric(model, {
        uncertaintyWeight: 0.3,
        scale: 1,
    });

    const answerRelevancy = await answerRelevancyMetric.measure(
        prompt,
        response
    );

    console.log(answerRelevancy.score); // Score from 0-1
    console.log(answerRelevancy.info.reason); // Explanation of the score


    //bias
    const biasMetric = new BiasMetric(model, {
        scale: 1,
    });

    const bias = await biasMetric.measure(
        prompt,
        response,
    );

    console.log(bias.score);
    return {
        response,
        metrics: {
            completeness,
            answerRelevancy,
            bias
        }
    };
}




