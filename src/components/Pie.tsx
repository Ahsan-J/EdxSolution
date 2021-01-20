import React from 'react';
import {StyleSheet, View, processColor} from 'react-native';
import {
  PieChart,
  ChartLegend,
  PieData,
  ChartSelectEvent,
  PieValue,
} from 'react-native-charts-wrapper';
import {RootState} from '../redux/types';
import {useSelector} from 'react-redux';
import {scale} from '../helpers/scaler';
import _ from 'lodash';
import {getColorGroup} from '../helpers/utility';

interface propTypes {
  style?: any;
  showLegend?: boolean;
  data: {[label: string]: number};
  rotationEnabled?: boolean;
  generateColor?: (val: string) => string;
}

// eslint-disable-next-line prettier/prettier
const Pie: React.FC<propTypes> = React.memo((props: React.PropsWithChildren<propTypes>) => {
    const theme = useSelector((store: RootState) => store.theme);
    const styles = useStyles();

    const legend: ChartLegend = {
      enabled: props.showLegend,
      textSize: scale(12),
      form: 'SQUARE',
      horizontalAlignment: 'LEFT',
      verticalAlignment: 'BOTTOM',
      orientation: 'HORIZONTAL',
      wordWrapEnabled: true,
    };

    const data = {
      dataSets: [
        {
          values: _.map(
            props.data,
            (v, k) =>
              ({
                value: v,
                label: k,
              } as PieValue),
          ),
          label: '',
          config: {
            // eslint-disable-next-line prettier/prettier
            colors: _.map(Object.keys(props.data), (v) => processColor(props.generateColor ? props.generateColor(v) : theme.colors[getColorGroup(v)]),
            ),
            valueTextSize: 0,
            sliceSpace: 0,
            drawValues: false,
            selectionShift: 0,
            valueLinePart1Length: 0.5,
          },
        },
      ],
    } as PieData;

    const handleSelect = (event: ChartSelectEvent) => event;

    if (!props.data) {
      return null;
    }

    return (
      <View style={[styles.container, props.style]}>
        <View style={styles.innerContainer}>
          <View style={styles.chartWrapper}>
            <PieChart
              style={styles.chart}
              chartBackgroundColor={processColor(
                props.style?.backgroundColor ||
                  styles.container.backgroundColor,
              )}
              chartDescription={{text: ''}}
              data={data}
              legend={legend}
              drawEntryLabels={false}
              rotationEnabled={props.rotationEnabled}
              rotationAngle={160}
              usePercentValues={false}
              holeRadius={80}
              holeColor={processColor(
                props.style?.backgroundColor ||
                  styles.container.backgroundColor,
              )}
              maxAngle={360}
              onSelect={handleSelect}
              onChange={(event) => console.log(event.nativeEvent)}
            />
          </View>
        </View>
        {props.children}
      </View>
    );
  },
);

const useStyles = () => {
  const theme = useSelector((store: RootState) => store.theme);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    chart: {
      flex: 1,
    },
    chartWrapper: {
      flex: 0.8,
    },
  });
};

Pie.defaultProps = {
  showLegend: true,
  rotationEnabled: false,
};

export default Pie;
