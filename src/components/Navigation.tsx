import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {IRouteType} from '../configuration/routes';
import {navigationRef, getActiveRouteName} from '../core-features/navigator';
import {setActiveRouteName, setActiveTab} from '../redux/actions/app';
import _ from 'lodash';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();

interface propType {
  initialRouteName: string;
  routes: Array<IRouteType>;
}

// eslint-disable-next-line prettier/prettier
const Navigation: React.SFC<propType> = React.memo((props: React.PropsWithChildren<propType>) => {
    const dispatch = useDispatch();
    return (
      <NavigationContainer
        ref={navigationRef}
        onStateChange={(state) => {
          dispatch(setActiveRouteName(getActiveRouteName(state, 'stack')));
          dispatch(setActiveTab(getActiveRouteName(state, 'tab')));
        }}>
        <Stack.Navigator
          initialRouteName={props.initialRouteName}
          headerMode="none">
          {_.map(props.routes, (route) => (
            <Stack.Screen
              key={route.name}
              name={route.name}
              component={route.component}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    );
  },
);

export default Navigation;
