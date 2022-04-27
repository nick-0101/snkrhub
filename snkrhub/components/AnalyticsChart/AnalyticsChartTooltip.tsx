import Svg, { Line, G, Text as TextSvg, Rect } from 'react-native-svg';

type Props = {
    position: { x: number, y: number},
    value: { x: number, y: number}
}

const AnalyticsChartTooltip = (props: Props) => {
    const { x, y } = props.position;
    const { x: xValue, y: yValue } = props.value;

    return (
        <>
            <G>
                {/* Tooltip */}
                <G x={x - 63 / 2} y={-30}>
                    <Rect height={27} width={63} fill={'rgb(34, 43, 69)'} rx={4} />
                    <TextSvg x={63 / 2} dy={18} textAnchor={'middle'} stroke={'white'}>
                    {`${yValue}`}
                    </TextSvg>
                </G>

                {/* Ball */}
                <G x={x - 4} y={y - 5}>
                    <Rect
                    height={10}
                    width={10}
                    fill={'rgb(51, 102, 255)'}
                    stroke={'#151a30'}
                    rx={100}
                    />
                </G>

                {/* Graph Line */}
                <Line
                    key={'zero-axis'}
                    x1={x + 2}
                    x2={x}
                    y1={0}
                    y2={240 - 55}
                    stroke={'rgb(143, 155, 179, 0.40)'}
                    // style={{ opacity: 0.3 }}
                    strokeWidth={1.5}
                />
            </G>
        </>
    )
}

export default AnalyticsChartTooltip