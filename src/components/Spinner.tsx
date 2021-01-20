'use strict';
import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {useSelector} from 'react-redux';
import {moderateScale} from '../helpers/scaler';
import {RootState} from '../redux/types';

interface propTypes {}

export default React.memo(() => {
  const styles = useStyles();

  const theme = useSelector((store: RootState) => store.theme);
  // eslint-disable-next-line prettier/prettier
  const overlaySpinner = useSelector((store: RootState) => store.app.overlaySpinner);

  if (!overlaySpinner) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={moderateScale(60)} color={theme.colors.white} />
    </View>
  );
}) as React.FC<propTypes>;

const useStyles = () => {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.4)',
      top: 0,
      bottom: 0,
      left: 0,
      flex: 1,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
