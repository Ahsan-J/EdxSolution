'use strict';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {scale, getDeviceWidth, getDeviceHeight} from '../helpers/scaler';
import {RootState} from '../redux/types';
import {IColorBaseType, IColorsType} from '../helpers/theme';
import Pie from './Pie';
import CustomLegend from './CustomLegend';

interface propTypes {
  style?: any;
  color: keyof IColorBaseType;
  count: string | number;
  typeLabel: string;
  pieData: any;
}

// eslint-disable-next-line prettier/prettier
const TypeListItem: React.SFC<propTypes> = React.memo((props: React.PropsWithChildren<propTypes>) => {
    const styles = useStyles({color: props.color});
    const theme = useSelector((store: RootState) => store.theme);

    const pieData = {
      Addressed: 3,
      Pending: 7,
    };
    const generateColorForData = (val: string) => {
      if (val === 'Addressed') {
        return theme.colors[props.color];
      } else {
        return theme.colors.grey;
      }
    };

    return (
      <View style={[styles.container, props.style]}>
        <Pie
          showLegend={false}
          data={pieData}
          style={styles.pie}
          generateColor={generateColorForData}
        />
        <CustomLegend data={pieData} generateColor={generateColorForData} />
        <Text style={styles.typeText}>{props.typeLabel}</Text>
      </View>
    );
  },
);

type styleProp = {
  color: keyof IColorsType;
};

const useStyles = (state: styleProp) => {
  const theme = useSelector((store: RootState) => store.theme);

  return StyleSheet.create({
    container: {
      height: getDeviceHeight() * 0.3,
      width: getDeviceWidth() * 0.5 - scale(3) * 2,
      borderRadius: scale(6),
      marginLeft: scale(3),
      marginRight: scale(3),
      marginTop: scale(5),
      marginBottom: scale(5),
      padding: scale(2),
      backgroundColor: theme.colors.white,
    },
    pie: {
      flex: 1,
      padding: scale(15),
    },
    typeText: {
      textAlign: 'center',
      color: theme.colors.white,
      backgroundColor: theme.colors[state.color],
      fontSize: scale(12),
      padding: scale(2),
    },
  });
};

export default TypeListItem;
