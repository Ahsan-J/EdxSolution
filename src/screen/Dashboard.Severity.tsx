import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/types';
import {getDeviceWidth, scale, verticalScale} from '../helpers/scaler';
import DashboardFeatureItem from '../components/DashboardFeatureItem';
import Pie from '../components/Pie';
import {
  SeverityCategoryColor,
  SeverityCategoryIcon,
  SeverityPieColor,
} from '../configuration/enum';
import {IColorsType} from '../helpers/theme';
import database from '@react-native-firebase/database';
import _ from 'lodash';
import moment, {Moment} from 'moment';
import {setOverlaySpinner} from '../redux/actions/app';

interface propType {
  style?: any;
}

// eslint-disable-next-line prettier/prettier
const Severity: React.FC<propType> = React.memo((props: React.PropsWithChildren<propType>) => {
    const styles = useStyles();
    const theme = useSelector((store: RootState) => store.theme);
    const [isRefreshing, setRefreshState] = useState<boolean>(false);
    const [data, setData] = useState<Array<any>>([]);
    const [pieData, setPieData] = useState({});
    const [updatingTime, setUpdateTime] = useState<Moment>(moment());
    const dispatch = useDispatch();

    const generateColor = (val: string) => {
      return theme.colors[
        SeverityPieColor[val.toUpperCase()] as keyof IColorsType
      ];
    };

    const getData = () => {
      database()
        .ref('/bySeverity')
        .once('value', (snapshot: any) => {
          const val = snapshot.val();
          const keyedValues = _.keyBy(val, 'category');
          setData(val);
          setPieData({
            High: keyedValues.High.count,
            FYI: keyedValues.FYI.count,
          });
          setRefreshState(false);
          setUpdateTime(moment());
          dispatch(setOverlaySpinner(false));
        });
    };

    useEffect(() => {
      dispatch(setOverlaySpinner(true));
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <View style={[styles.container, props.style]}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.category}
          horizontal={false}
          numColumns={2}
          refreshing={isRefreshing}
          onRefresh={() => {
            setRefreshState(true);
            getData();
          }}
          columnWrapperStyle={styles.columnWrapperStyle}
          renderItem={({item}) => (
            <DashboardFeatureItem
              count={item.count}
              iconSize={38}
              color={
                SeverityCategoryColor[
                  item.category.toUpperCase()
                ] as keyof IColorsType
              }
              iconName={SeverityCategoryIcon[item.category.toUpperCase()]}
              category={item.category}
            />
          )}
          ListFooterComponent={() => (
            <React.Fragment>
              <Pie
                data={pieData}
                style={styles.pie}
                generateColor={generateColor}
              />
              <Text style={styles.footerText}>
                Last Updated at {updatingTime.format('DD/MM/YYYY hh:mm A')}
              </Text>
            </React.Fragment>
          )}
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
      backgroundColor: theme.colors.appBackground,
    },
    columnWrapperStyle: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    notificationAlertText: {
      width: getDeviceWidth() * 0.96,
      backgroundColor: theme.colors.warningLight,
      textAlign: 'center',
      fontSize: scale(12),
      padding: scale(6),
      marginTop: verticalScale(6),
      marginBottom: verticalScale(6),
    },
    pie: {
      height: verticalScale(250),
      padding: scale(20),
    },
    footerText: {
      textAlign: 'center',
      color: theme.colors.grey,
    },
  });
};

export default Severity;
