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
type Props = {
    changeInventoryValue: (amount: number) => void
    changeInventoryValueToDefault: (shouldChange: boolean) => void
}

const AnalyticsChart = (props: Props) => {
    return (
        <>
           <Chart
                style={{ height: 200, width: '100%', }}
                data={[
                    { x: -2, y: 15 },
                    { x: -1, y: 10 },
                    { x: 0, y: 12 },
                    { x: 1, y: 7 },
                    { x: 2, y: 6 },
                    { x: 3, y: 3 },
                    { x: 4, y: 5 },
                    { x: 5, y: 8 },
                    { x: 6, y: 12 },
                    { x: 7, y: 14 },
                    { x: 8, y: 12 },
                    { x: 9, y: 13.5 },
                    { x: 10, y: 18 },
                ]}
                padding={{ left: 24, bottom: 20, top: 20 }}
                xDomain={{ min: -2, max: 10 }}
                yDomain={{ min: -4, max: 20 }}
            >
                <VerticalAxis
                    tickCount={5}
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
                          fontSize: 11,
                          fontWeight: 600,
                          dx: -10,
                          color: '#71717a',
                        },
                      },
                      ticks: { visible: false },
                      axis: { visible: false },
                    }}
                />
                <Area
                    theme={{
                      gradient: {
                        from: { color: '#2563eb', opacity: 0.31 },
                        to: { color: '#2563eb', opacity: 0.31 },
                      },
                    }}
                  />
                <Line
                    smoothing='cubic-spline'
                    hideTooltipOnDragEnd
                    onTooltipSelectEnd={() => props.changeInventoryValueToDefault(true)}
                    tooltipComponent={
                      <AnalyticsChartTooltip 
                          changeInventoryValue={props.changeInventoryValue}
                      />
                    }
                    theme={{
                      stroke: { color: '#2563eb', width: 3 },
                    }}
                />
            </Chart>
        </>
    )
}

export default AnalyticsChart