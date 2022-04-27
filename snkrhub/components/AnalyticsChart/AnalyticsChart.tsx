import {
  Chart,
  Line,
  Area,
  VerticalAxis,
  Tooltip,
  HorizontalAxis,
} from 'react-native-responsive-linechart';

// Components
import AnalyticsChartTooltip  from './AnalyticsChartTooltip';

// Types


const AnalyticsChart = () => {
    return (
        <>
           <Chart
                style={{ height: 200, width: '100%', }}
                data={[
                    { x: -2, y: 15 },
                    { x: -1, y: 10 },
                    { x: 0, y: 12 },
                    { x: 5, y: 8 },
                    { x: 6, y: 12 },
                    { x: 7, y: 14 },
                    { x: 8, y: 12 },
                    { x: 9, y: 13.5 },
                    { x: 10, y: 18 },
                ]}
                xDomain={{ min: -2, max: 10 }}
                yDomain={{ min: -4, max: 20 }}
            >
                <VerticalAxis
                    tickCount={5}
                    includeOriginTick
                    theme={{
                      grid: {
                        visible: true,
                        stroke: {
                          color: 'rgb(143, 155, 179, 0.40)',
                          width: 1,
                          opacity: 0.3,
                        },
                      },
                      labels: {
                        visible: true,
                        label: {
                          fontSize: 12,
                          dx: -12,
                          color: 'rgb(143, 155, 179)',
                        },
                        formatter: (v) => v.toFixed(0),
                      },
                      ticks: { visible: false },
                      axis: { visible: false },
                    }}
                />
                <Area
                    theme={{
                      gradient: {
                        from: { color: 'rgba(51, 102, 255)', opacity: 0.31 },
                        to: { color: 'rgba(51, 102, 255)', opacity: 0.31 },
                      },
                    }}
                  />
                <Line
                    smoothing='cubic-spline'
                    hideTooltipOnDragEnd
                    tooltipComponent={<AnalyticsChartTooltip />}
                    theme={{
                      stroke: { color: 'rgb(51, 102, 255)', width: 3 },
                    }}
                />
            </Chart>
        </>
    )
}

export default AnalyticsChart