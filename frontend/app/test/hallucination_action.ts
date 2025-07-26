"use server";

import { openai } from "@ai-sdk/openai";
import { HallucinationMetric } from "@mastra/evals/llm";

const model = openai("gpt-4o-mini");

export async function evaluateHallucination(formData: FormData) {
    const context = formData.get("context")?.toString();
    const question = formData.get("question")?.toString();
    const answer = formData.get("answer")?.toString();

    if (!context || !question || !answer) {
        throw new Error("Missing required fields: context, question, and answer");
    }

    const metric = new HallucinationMetric(model, {
        context: [context],
    });

    const result = await metric.measure(question, answer);

    return {
        score: result.score,
        reason: result.info.reason,
    };
}