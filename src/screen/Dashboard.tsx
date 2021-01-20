import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/types';
import Header from '../components/Header';
import Home from './Dashboard.Home';
import Severity from './Dashboard.Severity';
import Meter from './Dashboard.Meter';
import Type from './Dashboard.Type';
import TabNavigation from '../components/TabNavigation';
import {IRouteType} from '../configuration/routes';
import FloatingButton from '../components/FloatingButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale} from '../helpers/scaler';
import {SafeAreaView} from 'react-native-safe-area-context';

interface propType {}

const TabRoutes: Array<IRouteType> = [
  {
    name: 'Home',
    component: Home,
    label: 'Home',
  },
  {
    name: 'Severity',
    component: Severity,
    label: 'By Severity',
  },
  {
    name: 'Type',
    component: Type,
    label: 'By Type',
  },
  {
    name: 'Meter',
    component: Meter,
    label: 'By Meter',
  },
];

const Dashboard: React.FC<propType> = React.memo(() => {
  const styles = useStyles();
  const [subText, setText] = useState<string>('');
  const activeTab = useSelector((store: RootState) => store.app.activeTab);
  // eslint-disable-next-line prettier/prettier
  const touchOpacity = useSelector((store: RootState) => store.theme.touchOpacity);

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    setText(activeTab === 'Home' || !activeTab ? 'Home' : `Incident by ${activeTab}`);
  }, [activeTab]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Dashboard">
        <View style={styles.iconContainer}>
          <TouchableOpacity activeOpacity={touchOpacity}>
            <Icon name="bell" style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={touchOpacity}>
            <Icon name="magnify" style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={touchOpacity}>
            <Icon name="filter" style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </Header>
      <Text style={styles.subText}>{subText}</Text>
      <TabNavigation
        routes={TabRoutes}
        initialRouteName="Home"
        style={styles.tab}
      />
      <FloatingButton color="successLight" />
    </SafeAreaView>
  );
});

const useStyles = () => {
  const theme = useSelector((store: RootState) => store.theme);
  return StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
    },
    tab: {
      flex: 0.9,
    },
    subText: {
      backgroundColor: theme.colors.dark,
      textAlign: 'center',
      color: theme.colors.white,
    },
    iconContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-around',
    },
    headerIcon: {
      color: theme.colors.white,
      fontSize: scale(22),
    },
  });
};

export default Dashboard;
