"use client";

import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell
} from 'recharts';

interface MetricData {
    completeness: { score: number };
    answerRelevancy: { score: number };
    bias: { score: number };
}

interface ChartProps {
    metrics: MetricData;
}

export function Chart({ metrics }: ChartProps) {
    const radarData = [
        {
            metric: 'Completeness',
            score: metrics.completeness.score,
            fullMark: 1
        },
        {
            metric: 'Relevancy',
            score: metrics.answerRelevancy.score,
            fullMark: 1
        },
        {
            metric: 'Bias Control',
            score: 1 - metrics.bias.score, // Invert bias score (lower bias = better)
            fullMark: 1
        }
    ];

    const barData = [
        {
            name: 'Completeness',
            score: metrics.completeness.score,
            color: '#fb923c'
        },
        {
            name: 'Relevancy',
            score: metrics.answerRelevancy.score,
            color: '#f97316'
        },
        {
            name: 'Bias Control',
            score: 1 - metrics.bias.score,
            color: '#ea580c'
        }
    ];

    const getScoreColor = (score: number) => {
        if (score >= 0.8) return '#10b981'; // Green
        if (score >= 0.6) return '#f59e0b'; // Yellow
        return '#ef4444'; // Red
    };

    const averageScore = radarData.reduce((sum, item) => sum + item.score, 0) / radarData.length;

    return (
        <div className="bg-white border border-orange-200 rounded-2xl shadow-md p-6 w-full max-w-4xl">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-orange-600 mb-2">
                    LLM Performance Evaluation
                </h2>
                <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg text-gray-600">Overall Score:</span>
                    <span 
                        className="text-2xl font-bold px-3 py-1 rounded-lg text-white"
                        style={{ backgroundColor: getScoreColor(averageScore) }}
                    >
                        {(averageScore * 100).toFixed(1)}%
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Radar Chart */}
                <div className="bg-orange-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-orange-700 text-center mb-4">
                        Performance Overview
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke="#fed7aa" />
                            <PolarAngleAxis 
                                dataKey="metric" 
                                tick={{ fontSize: 12, fill: '#c2410c' }}
                            />
                            <PolarRadiusAxis 
                                angle={90} 
                                domain={[0, 1]} 
                                tick={{ fontSize: 10, fill: '#9a3412' }}
                            />
                            <Radar
                                name="Score"
                                dataKey="score"
                                stroke="#ea580c"
                                fill="#fb923c"
                                fillOpacity={0.3}
                                strokeWidth={3}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="bg-orange-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-orange-700 text-center mb-4">
                        Individual Metrics
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                            <XAxis 
                                dataKey="name" 
                                tick={{ fontSize: 12, fill: '#c2410c' }}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                            />
                            <YAxis 
                                domain={[0, 1]} 
                                tick={{ fontSize: 12, fill: '#9a3412' }}
                            />
                            <Tooltip 
                                formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Score']}
                                labelStyle={{ color: '#9a3412' }}
                                contentStyle={{ 
                                    backgroundColor: '#fff7ed', 
                                    border: '1px solid #fed7aa',
                                    borderRadius: '8px'
                                }}
                            />
                            <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Detailed Scores */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-4 text-center">
                    <h4 className="font-semibold text-orange-800 mb-2">Completeness</h4>
                    <div className="text-2xl font-bold text-orange-700">
                        {(metrics.completeness.score * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-orange-600 mt-1">
                        Response coverage
                    </div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-4 text-center">
                    <h4 className="font-semibold text-orange-800 mb-2">Relevancy</h4>
                    <div className="text-2xl font-bold text-orange-700">
                        {(metrics.answerRelevancy.score * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-orange-600 mt-1">
                        Answer relevance
                    </div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-4 text-center">
                    <h4 className="font-semibold text-orange-800 mb-2">Bias Control</h4>
                    <div className="text-2xl font-bold text-orange-700">
                        {((1 - metrics.bias.score) * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-orange-600 mt-1">
                        Unbiased response
                    </div>
                </div>
            </div>
        </div>
    );
}