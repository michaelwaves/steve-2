import { MCPClient } from "@mastra/mcp";
import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";

const mcp = new MCPClient({
    servers: {
        calculator: {
            url: new URL("http://localhost:8000/mcp")
        },
        email: {
            url: new URL("http://localhost:8001/mcp")
        },
        yahoo_finance: {
            url: new URL("http://127.0.0.1:8005/mcp")
        }
    }
})

export const stockAgent = new Agent({
    name: "Stock Agent",
    instructions: "You are a helpful stock picking assistant that picks stocks based on fundamental financials",
    model: openai('gpt-4o-mini'),
    tools: await mcp.getTools()
})