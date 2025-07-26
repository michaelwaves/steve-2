"use client";

import { useState } from "react";
import { getStockInfo } from "./client_action"; // Make sure this exports your getStockInfo function

export function StockForm() {
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const res = await getStockInfo(formData);
        setResult(res.response);
        console.log(res.response)
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
                action={handleSubmit}
                className="bg-white border border-orange-200 rounded-2xl shadow-md p-6 w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-semibold text-orange-600 text-center">
                    Stock Comparison Tool
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
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
                >
                    {loading ? <p className="animate-spin">💸</p> : "Compare Stocks"}
                </button>
            </form>

            {/*  {result && (
                <div
                    className="mt-8 max-w-3xl w-full bg-white border border-orange-100 rounded-xl p-6 shadow-inner"
                    dangerouslySetInnerHTML={{ __html: result }}
                />
            )*/}

            {result && JSON.stringify(result)}
        </div>
    );
}
