import React from 'react';
import { Dimensions, Appearance } from 'react-native';
import { VictoryArea, VictoryChart, VictoryClipContainer, VictoryAxis } from "victory-native";
import { FormattedAnalyticsData } from '../../screens/AppScreens/types';

// Components

// Types
type Props = {
  analyticsRangeData: FormattedAnalyticsData[] | undefined
}

const AnalyticsChart = (props: Props) => {
  return (
    <>
    {props.analyticsRangeData &&
      <VictoryChart 
        width={Dimensions.get("window").width}
        // containerComponent={
        //   <VictoryVoronoiContainer voronoiDimension="x"
        //     labels={({ datum }) => `USD$${datum.inventoryvalue}`}
        //     labelComponent={
        //       <VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "#71717a"}}/>
        //     }
        //   />
        // }
        padding={{ top: 10, bottom: 80, left: 40, right: 50 }}
      >
        <VictoryArea 
          data={props.analyticsRangeData} 
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