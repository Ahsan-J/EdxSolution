import React from 'react';
import {
  NavigationState,
  NavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

// eslint-disable-next-line prettier/prettier
export const getActiveRouteName = (navState?: NavigationState, type: string = 'stack'): string => {
  if (navigationRef.current) {
    const state = navState || navigationRef.current.getRootState();
    const route = state.routes[state.index];
    if (route.state && route.state.type === type) {
      return getActiveRouteName(route.state as NavigationState);
    }
    return route.name;
  }
  return '';
};

export const navigate = (name: string, params?: any) => {
  if (navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
};

export const goBack = () => {
  if (navigationRef.current) {
    navigationRef.current.goBack();
  }
};
