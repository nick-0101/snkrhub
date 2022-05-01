import React from 'react';
import { Dimensions, Appearance } from 'react-native';
import { VictoryArea, VictoryChart, VictoryClipContainer, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryLabel, VictoryBar, VictoryTheme } from "victory-native";
import { FormattedAnalyticsData } from '../../screens/AppScreens/types';

// Components

// Types
type Props = {
  analyticsRangeDataTest: FormattedAnalyticsData[] | undefined
}

const AnalyticsChart = (props: Props) => {
  console.log(props)
  return (
    <>
    {props.analyticsRangeDataTest &&
      <VictoryChart 
        width={Dimensions.get("window").width}
        containerComponent={
          <VictoryVoronoiContainer voronoiDimension="x"
            labels={({ datum }) => `USD$${datum.y}`}
            labelComponent={
              <VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "white"}}/>
            }
          />
        }
        padding={{ top: 10, bottom: 100, left: 40, right: 50 }}
      >
        <VictoryArea 
          data={props.analyticsRangeDataTest} 
          y="inventoryvalue" 
          interpolation="natural"
          groupComponent={
            <VictoryClipContainer 
              clipPadding={{ top: 5, right: 0 }}
            />
          }
          animate={{
            duration: 1000,
            onLoad: { duration: 1000 }
          }}
          style={{ 
            data: { 
              stroke: "#2563eb", 
              strokeWidth: 3.5, 
              strokeLinecap: "round" ,
              fill: 'rgba(37, 99, 235, 0.20)',

            } 
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(y) => y}
          style={{
            tickLabels: {
              fill: '#71717a',
              fontSize: 12
            }, 
            grid: {
              stroke: 'rgb(143, 155, 179, 0.40)',
              strokeDasharray: '7',
            }
          }}
        />
      </VictoryChart>
      }
    </>
  )
}

export default AnalyticsChart