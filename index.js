/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {createReduxStore} from './src/redux/store';

const AppWrapper = React.memo(props => {
  const store = createReduxStore();
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
});

AppRegistry.registerComponent(appName, () => AppWrapper);
