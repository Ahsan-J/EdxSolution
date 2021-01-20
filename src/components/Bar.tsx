import React from 'react';
import {StyleSheet, View, processColor} from 'react-native';
import {
  BarChart,
  ChartSelectEvent,
  ChartLegend,
  xAxis as IxAxis,
  yAxis as IyAxis,
  BarData,
  BarDataset,
} from 'react-native-charts-wrapper';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/types';
import {moderateScale} from '../helpers/scaler';
import {getColorGroup} from '../helpers/utility';
import _ from 'lodash';

interface propTypes {
  style?: any;
  data?: {[label: string]: Array<number>};
  showLegend?: boolean;
  xAxis?: Array<string>;
  generateColor?: (val: string) => string;
}

// eslint-disable-next-line prettier/prettier
const Bar: React.FC<propTypes> = React.memo((props: React.PropsWithChildren<propTypes>) => {
    const theme = useSelector((store: RootState) => store.theme);
    const data: BarData = {
      dataSets: _.map(
        props.data,
        (v, k) =>
          ({
            values: v,
            label: k,
            config: {
              drawValues: false,
              colors: [
                processColor(
                  props.generateColor
                    ? props.generateColor(k)
                    : theme.colors[getColorGroup(k)],
                ),
              ],
            },
          } as BarDataset),
      ),
      config: {
        barWidth: 0.3,
        group: {
          fromX: 0,
          groupSpace: 1 / 4 + 0.1, // divide by total axis in x and add the extra padding
          barSpace: 0.01,
        },
      },
    };

    const xAxis = {
      valueFormatter: props.xAxis || [],
      drawAxisLines: true,
      axisLineWidth: 1,
      position: 'BOTTOM',
      granularityEnabled: true,
      granularity: 1,
      axisMaximum: 4,
      axisMinimum: 0,
      drawLimitLinesBehindData: false,
      centerAxisLabels: true,
      drawGridLines: false,
    } as IxAxis;

    const yAxis = {
      left: {
        centerAxisLabels: false,
        drawLimitLinesBehindData: false,
        axisLineWidth: 1,
        granularityEnabled: true,
        granularity: 1,
        spaceBottom: 0,
      } as IyAxis,
      right: {
        granularityEnabled: true,
        granularity: 1,
        centerAxisLabels: false,
        drawLimitLinesBehindData: false,
        axisLineWidth: 0,
        spaceBottom: 0,
      } as IyAxis,
    };

    const styles = useStyles();

    const handleSelect = (event: ChartSelectEvent) => event;

    const legend: ChartLegend = {
      enabled: true,
      textSize: moderateScale(14),
      form: 'SQUARE',
      formSize: moderateScale(14),
      formToTextSpace: moderateScale(8),
      xEntrySpace: moderateScale(15),
      yEntrySpace: moderateScale(30),
      wordWrapEnabled: true,
      horizontalAlignment: 'CENTER',
      verticalAlignment: 'TOP',
    };

    if (!props.data) {
      return null;
    }

    return (
      <View style={[styles.container, props.style]}>
        <BarChart
          // scaleEnabled={true}
          // autoScaleMinMaxEnabled={true}
          dragEnabled={true}
          doubleTapToZoomEnabled={false}
          pinchZoom={true}
          style={styles.chart}
          xAxis={xAxis}
          yAxis={yAxis}
          data={data}
          legend={legend}
          chartDescription={{text: ''}}
          drawValueAboveBar={false}
          onSelect={handleSelect}
          // visibleRange={visibleRange}
        />
      </View>
    );
  },
);

const useStyles = () => {
  const theme = useSelector((store: RootState) => store.theme);
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: theme.colors.white,
    },
    chart: {
      flex: 1,
      borderWidth: 0,
    },
  });
};

Bar.defaultProps = {
  showLegend: true,
};

export default Bar;
