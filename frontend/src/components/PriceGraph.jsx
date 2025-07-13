import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { formatDate, formatPrice } from '../utils/helper';

const PriceGraph = ({ data }) => {
    const chartData = data.reverse().map((item) => ({
        date: formatDate(item.date),
        profit: parseFloat(item.sellingPrice) - parseFloat(item.costPrice),
        profitMargin: ((parseFloat(item.sellingPrice) - parseFloat(item.costPrice)) / parseFloat(item.costPrice)) * 100
    }))

    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dy={12} dataKey="date" />
                    <YAxis tickFormatter={(val) => `₹${val}`} />
                    <Tooltip formatter={(value, name, props) => `₹${formatPrice(value)}(${props.payload.profitMargin.toFixed(1)}%)`} />
                    <Legend />
                    <Line type="monotone" dataKey="profit" stroke="#3b82f6" name="Profit" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PriceGraph
