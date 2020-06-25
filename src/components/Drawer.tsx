import React, {useEffect, useState} from 'react';
import routes, {IRouteType} from '../configuration/routes';
import _ from 'lodash';
import {navigate, getActiveRouteName} from '../core-features/navigator';
import {StyleSheet, TouchableOpacity, ScrollView, Text} from 'react-native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import {moderateScale} from '../helpers/scaler';
import {drawerRef, closeDrawer} from '../core-features/drawer';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/types';

interface propType {}

const CustomDrawerContent: React.SFC<propType> = React.memo(() => {
  const [activeRoute, setActive] = useState<string>();
  const styles = useStyles();
  // eslint-disable-next-line prettier/prettier
  const touchOpacity = useSelector((store: RootState) => store.theme.touchOpacity);

  useEffect(() => {
    setActive(getActiveRouteName());
  }, []);

  const onItemPress = (routeName: string) => {
    closeDrawer();
    navigate(routeName);
    setActive(getActiveRouteName());
  };

  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      {_.map(
        _.filter(routes, (r: IRouteType) => r.label),
        (v: IRouteType) => {
          const isActiveMenu = activeRoute === v.name;
          return (
            <TouchableOpacity
              activeOpacity={touchOpacity}
              key={v.name}
              style={[
                styles.menuTouchArea,
                isActiveMenu ? styles.menuTouchActive : {},
              ]}
              onPress={() => onItemPress(v.name)}>
              <Text
                style={[
                  styles.menuText,
                  isActiveMenu ? styles.menuTextActive : {},
                ]}>
                {v.label}
              </Text>
            </TouchableOpacity>
          );
        },
      )}
    </ScrollView>
  );
});

// eslint-disable-next-line prettier/prettier
const AppDrawer: React.SFC<propType> = React.memo((props: React.PropsWithChildren<propType>) => (
    <DrawerLayout
      ref={drawerRef}
      keyboardDismissMode="on-drag"
      drawerWidth={moderateScale(250)}
      drawerPosition={'left'}
      drawerType="front"
      drawerLockMode="unlocked"
      renderNavigationView={() => <CustomDrawerContent {...props} />}>
      {props.children}
    </DrawerLayout>
  ),
);

const useStyles = () => {
  const theme = useSelector((store: RootState) => store.theme);
  return StyleSheet.create({
    menu: {
      flex: 1,
      backgroundColor: theme.colors.white,
      paddingTop: moderateScale(10),
      paddingLeft: moderateScale(10),
      paddingRight: moderateScale(5),
    },
    menuTouchArea: {
      marginBottom: moderateScale(4),
      marginTop: moderateScale(4),
      padding: moderateScale(10),
      borderRadius: moderateScale(5),
    },
    menuTouchActive: {
      backgroundColor: theme.colors.primary,
    },
    menuText: {
      color: 'gray',
      fontSize: moderateScale(14),
    },
    menuTextActive: {
      color: theme.colors.white,
    },
  });
};

AppDrawer.defaultProps = {
  children: null,
};

export default AppDrawer;
