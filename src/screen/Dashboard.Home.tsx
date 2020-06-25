import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/types';
import {verticalScale, scale, getDeviceWidth} from '../helpers/scaler';
import DashboardFeatureItem from '../components/DashboardFeatureItem';
import Pie from '../components/Pie';
import {
  HomeCategoryIcon,
  HomeCategoryColor,
  HomePieColor,
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
const Home: React.SFC<propType> = React.memo((props: React.PropsWithChildren<propType>) => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const theme = useSelector((store: RootState) => store.theme);

    const [isRefreshing, setRefreshState] = useState<boolean>(false);
    const [data, setData] = useState<Array<any>>([]);
    const [pieData, setPieData] = useState({});
    const [updatingTime, setUpdateTime] = useState<Moment>(moment());

    const getData = () => {
      database()
        .ref('/generalOverview')
        .once('value', (snapshot: any) => {
          const val = snapshot.val();
          const keyedValues = _.keyBy(val, 'category');
          setData(val);
          setPieData({
            Open: keyedValues.Open.count,
            Monitoring: keyedValues.Monitoring.count,
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

    const generateColor = (val: string) => {
      return theme.colors[HomePieColor[val.toUpperCase()] as keyof IColorsType];
    };

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
              color={
                HomeCategoryColor[
                  item.category.toUpperCase()
                ] as keyof IColorsType
              }
              iconName={HomeCategoryIcon[item.category.toUpperCase()]}
              category={item.category}
            />
          )}
          ListHeaderComponent={() => (
            <TouchableOpacity activeOpacity={theme.touchOpacity}>
              <Text style={styles.notificationAlertText}>
                631 Incidents required your feedback
              </Text>
            </TouchableOpacity>
          )}
          ListHeaderComponentStyle={styles.listHeaderComponentStyle}
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
    listHeaderComponentStyle: {
      justifyContent: 'center',
      alignItems: 'center',
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

export default Home;
