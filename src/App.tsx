import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Spinner from './components/Spinner';
import AppDrawer from './components/Drawer';
import Navigation from './components/Navigation';
import {StyleSheet} from 'react-native';
import {getDeviceHeight, getDeviceWidth} from './helpers/scaler';
import {RootState} from './redux/types';
import routes from './configuration/routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

interface propType {}

const App: React.FC<propType> = React.memo(() => {
  const styles = useStyles();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={styles.app}>
      <AppDrawer>
        <Navigation initialRouteName="Dashboard" routes={routes} />
      </AppDrawer>
      <Spinner />
    </SafeAreaView>
  );
});

const useStyles = () => {
  const theme = useSelector((store: RootState) => store.theme);
  return StyleSheet.create({
    app: {
      height: getDeviceHeight(),
      width: getDeviceWidth(),
      backgroundColor: theme.colors.appBackground,
    },
  });
};

export default App;
