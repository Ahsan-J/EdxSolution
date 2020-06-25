import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/types';
import Bar from '../components/Bar';
import Pie from '../components/Pie';
import {getDeviceHeight, verticalScale} from '../helpers/scaler';
import {MeterPieColor, MeterBarColor} from '../configuration/enum';
import {IColorsType} from '../helpers/theme';
import database from '@react-native-firebase/database';
import {setOverlaySpinner} from '../redux/actions/app';

interface propType {
  style?: any;
}

// eslint-disable-next-line prettier/prettier
const Meter: React.SFC<propType> = React.memo((props: React.PropsWithChildren<propType>) => {
    const styles = useStyles();
    const theme = useSelector((store: RootState) => store.theme);
    const dispatch = useDispatch();
    const [barData, setData] = useState<{[label: string]: number[]}>();
    const [pieData, setPieData] = useState<any>({});
    const [xAxis, setAxisValue] = useState<Array<string>>();

    const generatePieColor = (val: string) => {
      return theme.colors[
        MeterPieColor[val.toUpperCase()] as keyof IColorsType
      ];
    };
    const generateBarColor = (val: string) => {
      return theme.colors[
        MeterBarColor[val.toUpperCase()] as keyof IColorsType
      ];
    };

    useEffect(() => {
      dispatch(setOverlaySpinner(true));
      const subscriber = database()
        .ref('/byMeter')
        .on('value', (snapshot: any) => {
          const val = snapshot.val();
          setPieData({
            Pending: val.Pending[val.Pending.length - 1],
            Addressed: val.Addressed[val.Addressed.length - 1],
          });
          setAxisValue(val.xAxis);
          delete val.xAxis;
          setData(val);
          dispatch(setOverlaySpinner(false));
        });

      // Stop listening for updates when no longer required
      return () => subscriber();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <ScrollView style={[styles.container, props.style]}>
        <Pie
          data={pieData}
          style={styles.pie}
          generateColor={generatePieColor}
        />
        <Bar
          style={styles.bar}
          data={barData}
          xAxis={xAxis}
          generateColor={generateBarColor}
        />
      </ScrollView>
    );
  },
);

const useStyles = () => {
  const theme = useSelector((store: RootState) => store.theme);
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    pie: {
      height: getDeviceHeight() * 0.4,
      paddingTop: verticalScale(20),
    },
    bar: {
      height: getDeviceHeight() * 0.4,
      backgroundColor: theme.colors.white,
    },
  });
};

export default Meter;
