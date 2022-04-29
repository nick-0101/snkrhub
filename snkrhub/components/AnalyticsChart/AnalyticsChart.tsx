import {
  Chart,
  Line,
  Area,
  VerticalAxis,
  Tooltip,
  HorizontalAxis,
} from 'react-native-responsive-linechart';
import { FormattedAnalyticsData } from '../../screens/AppScreens/types';

// Components
import AnalyticsChartTooltip  from './AnalyticsChartTooltip';

// Types
type Props = {
  changeInventoryValue: (amount: number) => void
  changeInventoryValueToDefault: (shouldChange: boolean) => void

  analyticsRangeData: FormattedAnalyticsData[] | undefined
  maxYValue: number
}

const AnalyticsChart = (props: Props) => {
    return (
        <>
           <Chart
                style={{ height: 200, width: '100%', }}
                data={
                  // props.analyticsRangeData
                [
                  { x: 0, y: 15 },
                  { x: 1, y: 10 },
                  { x: 2, y: 12 },
                  { x: 3, y: 7 },
                  { x: 4, y: 6 },
                ]
                }
                padding={{ left: 24, bottom: 20, top: 20 }}

                // xDomain={{ min: 0, max: props.analyticsRangeData?.length ? props.analyticsRangeData.length : 0 }}
                // yDomain={{ min: 0, max: props.maxYValue }}

                xDomain={{ min: 0, max: 4 }}
                yDomain={{ min: 5, max: 17 }}
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