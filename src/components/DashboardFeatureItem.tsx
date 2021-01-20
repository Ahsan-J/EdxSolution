'use strict';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {getDeviceWidth, getDeviceHeight, scale} from '../helpers/scaler';
import {RootState} from '../redux/types';
import {IColorsType} from '../helpers/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getColorShade} from '../helpers/utility';

interface propTypes {
  style?: any;
  count: number;
  color: keyof IColorsType;
  iconName: string;
  iconSize?: number;
  category: string;
}

// eslint-disable-next-line prettier/prettier
const DashboardFeatureItem: React.FC<propTypes> = React.memo(
  (props: React.PropsWithChildren<propTypes>) => {
    const styles = useStyles({
      color: props.color,
      iconSize: props.iconSize || 52,
    });

    return (
      <View style={[styles.container, props.style]}>
        <View style={styles.leftSection}>
          <View style={styles.iconWrapper}>
            <Icon
              name={props.iconName}
              style={[styles.commonFontSpec, styles.icon]}
            />
          </View>
        </View>
        <View style={styles.rightSection}>
          <Text style={[styles.commonFontSpec]}>{props.count}</Text>
          <Text style={[styles.commonFontSpec, styles.categoryText]}>
            {props.category}
          </Text>
        </View>
      </View>
    );
  },
);

type styleProp = {
  color: keyof IColorsType;
  iconSize: number;
};
const useStyles = (state: styleProp) => {
  const theme = useSelector((store: RootState) => store.theme);

  return StyleSheet.create({
    container: {
      height: getDeviceHeight() * 0.12 - scale(2) * 2,
      width: getDeviceWidth() * 0.5 - scale(4) * 4,
      borderRadius: scale(6),
      margin: scale(3),
      marginTop: scale(4),
      marginBottom: scale(4),
      padding: scale(4),
      backgroundColor: theme.colors[state.color],
      flexDirection: 'row',
    },
    leftSection: {
      flex: 0.4,
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: 0,
      //   backgroundColor: 'blue',
    },
    commonFontSpec: {
      color: theme.colors.white,
      fontSize: scale(16),
    },
    iconWrapper: {
      borderRadius: scale(50),
      backgroundColor: theme.colors[getColorShade(state.color)],
    },
    icon: {
      fontSize: scale(state.iconSize),
      padding: 0,
      margin: scale(1),
      color: theme.colors.white,
    },
    rightSection: {
      flex: 0.6,
      justifyContent: 'center',
      //   backgroundColor: 'blue',
    },
    categoryText: {
      fontWeight: '700',
    },
  });
};

DashboardFeatureItem.defaultProps = {
  iconSize: 52,
};

export default DashboardFeatureItem;
