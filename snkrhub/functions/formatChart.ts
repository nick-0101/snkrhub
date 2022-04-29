// Types
interface AnalyticsRangeData {
  inventoryvalue: number;
  createdAt: string;
}

export const formatChart = (chartData: AnalyticsRangeData[]) => {
    let chartFormattedData = []
    let chartYMax = 0

    for (const item in chartData) {
        const inventoryvalue = chartData[item].inventoryvalue
        chartFormattedData.push({ x: Number(item), y: inventoryvalue})

        // For the charts y value, we need to set the max y value that the chart
        // will display. To do this, for each item we will check if the inventory
        // value is greater than the previous price. We then return the greatest price.
        if(inventoryvalue > chartYMax) {
            chartYMax = inventoryvalue
        }
    }

    return { chartFormattedData, chartYMax }
}