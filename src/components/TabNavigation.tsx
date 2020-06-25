import React from 'react';
import {Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IRouteType} from '../configuration/routes';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/types';
import {TabDashboardIcon} from '../configuration/enum';
import {scale} from '../helpers/scaler';
import _ from 'lodash';

interface propTypes {
  style?: any;
  routes: Array<IRouteType>;
  initialRouteName: string;
}

const Tab = createMaterialTopTabNavigator();

// eslint-disable-next-line prettier/prettier
const TabNavigation: React.SFC<propTypes> = React.memo((props: React.PropsWithChildren<propTypes>) => {
    const theme = useSelector((store: RootState) => store.theme);
    return (
      <Tab.Navigator
        style={[props.style]}
        initialRouteName={props.initialRouteName}
        tabBarPosition="bottom"
        screenOptions={({route}) => ({
          tabBarIcon: ({color}) => {
            return (
              <Icon
                name={TabDashboardIcon[route.name.toUpperCase()]}
                style={{color, fontSize: scale(22)}}
              />
            );
          },
          tabBarLabel: ({color}) => {
            const keyedRoute = _.keyBy(props.routes, 'name');
            return (
              <Text style={{color}}>
                {keyedRoute[route.name].label || route.name}
              </Text>
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: theme.colors.primary,
          inactiveTintColor: theme.colors.grey,
          tabStyle: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          iconStyle: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          showIcon: true,
          renderIndicator: () => null,
        }}>
        {props.routes.map((route) => {
          return (
            <Tab.Screen
              options={() => ({
                title: route.label,
              })}
              key={route.name}
              name={route.name}
              component={route.component}
            />
          );
        })}
      </Tab.Navigator>
    );
  },
);

export default TabNavigation;
