// Types
interface AnalyticsRangeData {
  inventoryvalue: number;
  createdAt: string;
}

export const formatChart = (chartData: AnalyticsRangeData[]) => {
    const chartFormattedData = []

    for (const item in chartData) {
        const inventoryvalue = chartData[item]
        chartFormattedData.push({ x: inventoryvalue, y: inventoryvalue})
    }
}