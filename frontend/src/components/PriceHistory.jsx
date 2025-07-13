import React from 'react'
import { formatDateTime, formatPrice } from '../utils/helper';
import PriceGraph from './PriceGraph';

const PriceHistory = ({ sortedPriceHistory }) => {
    return (
        <div className="bg-gray-50 rounded-md p-4">
            {sortedPriceHistory.length > 0 ? (
                  <>
                    {sortedPriceHistory.length > 1 && <>
                        <h3 className="text-base font-semibold text-gray-700 mb-4">Price Trend</h3>
                        <PriceGraph data={sortedPriceHistory.reverse()} />
                    </>}
                    <div className={`space-y-3 ${sortedPriceHistory.length > 1 ? 'mt-10' : ''}`}>
                        {sortedPriceHistory.map((history, index) => {
                            const profit = parseFloat(history.sellingPrice) - parseFloat(history.costPrice);
                            const profitMargin = ((profit / parseFloat(history.costPrice)) * 100).toFixed(1);

                            return (
                                <div key={index} className="bg-white p-3 rounded border border-gray-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs text-gray-500">{formatDateTime(history.date)}</span>
                                        {index === 0 && (
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Current</span>
                                        )}
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Cost Price:</span>
                                            <span className="font-medium">₹{formatPrice(history.costPrice)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Selling Price:</span>
                                            <span className="font-medium text-green-600">₹{formatPrice(history.sellingPrice)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Profit:</span>
                                            <span className={`font-medium ${ profit >= 0 ? "text-green-600" : "text-red-600"}`} >₹{formatPrice(profit)} ({profitMargin}%)</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
                ) : (
                <div className="text-center py-6 text-gray-500">
                    No price history available
                </div>
                )
            }
        </div>
    )
}

export default PriceHistory