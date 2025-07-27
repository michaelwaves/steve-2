"use client";

import { useState } from "react";
import { getStockInfo } from "./client_action"; // Make sure this exports your getStockInfo function
import { Chart } from "./Chart";

export function StockForm() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const res = await getStockInfo(formData);
        setResult(res);
        console.log(res)
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-6">
            <div className="text-center">
                <pre className="text-orange-600 font-mono text-xs sm:text-sm leading-tight mb-8">
                    {`
    ███████╗████████╗███████╗██╗   ██╗███████╗
    ██╔════╝╚══██╔══╝██╔════╝██║   ██║██╔════╝
    ███████╗   ██║   █████╗  ██║   ██║█████╗  
    ╚════██║   ██║   ██╔══╝  ╚██╗ ██╔╝██╔══╝  
    ███████║   ██║   ███████╗ ╚████╔╝ ███████╗
    ╚══════╝   ╚═╝   ╚══════╝  ╚═══╝  ╚══════╝
`}
                </pre>
                <h1 className="text-2xl sm:text-3xl font-light text-orange-800 mb-4">
                    Stock Trading Expected Value Evals
                </h1>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleSubmit(formData);
                }}
                className="bg-white border border-orange-200 rounded-2xl shadow-md p-6 w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-semibold text-orange-600 text-center">
                    How good is AI at picking stocks?
                </h2>
                <p>Whenever we deploy an AI, we need to make sure the expected value is greater than the risk. We use a monitor AI to evaluate the performance of a realistic multi tool agentic mcp system that searches the web for stock data, drafts a analyst report, and mails it to you. We evaluate three metrics: Bias, Completeness, and Relevancy to the prompt. Built with Mastra (and Mastra evals), Brightdata, and Google AI</p>
                <h2 className="text-2xl font-semibold text-orange-600 text-center">
                    The Task: Compare two stocks and send a comparison report to an email address
                </h2>
                <input
                    name="ticker1"
                    placeholder="Ticker Symbol 1 (e.g. AAPL)"
                    required
                    className="w-full border border-orange-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input
                    name="ticker2"
                    placeholder="Ticker Symbol 2 (e.g. MSFT)"
                    required
                    className="w-full border border-orange-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input
                    name="email"
                    placeholder="Your email"
                    type="email"
                    required
                    className="w-full border border-orange-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Analyzing...</span>
                        </>
                    ) : (
                        <>
                            <span>📊</span>
                            <span>Compare Stocks</span>
                        </>
                    )}
                </button>
            </form>

            {/* Loading placeholder to prevent layout shift */}
            {loading && (
                <div className="mt-8 w-full max-w-4xl">
                    <div className="bg-white border border-orange-200 rounded-2xl shadow-md p-6 animate-pulse">
                        <div className="text-center mb-6">
                            <div className="h-8 bg-orange-200 rounded-lg w-64 mx-auto mb-2"></div>
                            <div className="h-6 bg-orange-100 rounded-lg w-32 mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-orange-50 rounded-xl p-4 h-80"></div>
                            <div className="bg-orange-50 rounded-xl p-4 h-80"></div>
                        </div>
                    </div>
                </div>
            )}

            {result && result.metrics && (
                <div className="mt-8 w-full flex flex-col items-center space-y-6">

                    {/* Clean LLM Response Display */}
                    <div className="w-full max-w-4xl bg-white border border-orange-200 rounded-2xl shadow-md overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                            <h3 className="text-xl font-semibold text-white flex items-center">
                                <span className="mr-2">🤖</span>
                                Stock Agent Response
                            </h3>
                        </div>
                        <div className="p-6">
                            <div
                                className="prose prose-orange max-w-none text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: result.response }}
                            />
                        </div>
                    </div>
                    <Chart metrics={result.metrics} />

                </div>
            )}

            {result && !result.metrics && (
                <div className="mt-8 max-w-3xl w-full bg-white border border-orange-100 rounded-xl p-6 shadow-inner">
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h4 className="text-orange-800 font-semibold mb-2">Debug Response:</h4>
                        <pre className="text-sm text-orange-700 whitespace-pre-wrap overflow-auto">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}
