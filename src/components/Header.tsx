'use strict';
import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {openDrawer} from '../core-features/drawer';
import {goBack} from '../core-features/navigator';
import {getDeviceWidth, scale} from '../helpers/scaler';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootState} from '../redux/types';

interface propTypes {
  style?: any;
  showBack?: boolean;
  title: string;
}

// eslint-disable-next-line prettier/prettier
const Header: React.FC<propTypes> = React.memo((props: React.PropsWithChildren<propTypes>) => {
    const styles = useStyles();
    // eslint-disable-next-line prettier/prettier
    const touchOpacity = useSelector((store: RootState) => store.theme.touchOpacity);

    const getLeftIcon = () => {
      if (props.showBack) {
        return (
          <TouchableOpacity
            activeOpacity={touchOpacity}
            style={styles.touchableButton}
            onPress={goBack}>
            <Icon name="arrow-left" style={styles.icon} />
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity
          activeOpacity={touchOpacity}
          style={styles.touchableButton}
          onPress={openDrawer}>
          <Icon name="bars" style={styles.icon} />
        </TouchableOpacity>
      );
    };

    return (
      <View style={[styles.header, props.style]}>
        <View style={styles.innerContainer}>
          {/* Left Section */}
          <View style={styles.leftBlocks}>{getLeftIcon()}</View>
          {/* Title Section */}
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{props.title}</Text>
          </View>
          {/* Right Section */}
          <View style={styles.rightBlocks}>{props.children}</View>
        </View>
      </View>
    );
  },
);

const useStyles = () => {
  const theme = useSelector((store: RootState) => store.theme);
  return StyleSheet.create({
    header: {
      width: getDeviceWidth(),
      flex: 0.1,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
    },
    innerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    leftBlocks: {
      flex: 0.15,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: scale(10),
    },
    rightBlocks: {
      flex: 0.3,
      marginRight: scale(10),
    },
    touchableButton: {
      paddingLeft: scale(10),
      paddingRight: scale(10),
    },
    titleView: {
      flex: 0.55,
      alignItems: 'flex-start',
    },
    titleText: {
      fontSize: scale(18),
      textAlign: 'center',
      flex: 1,
      color: theme.colors.white,
    },
    icon: {
      color: theme.colors.white,
      fontSize: scale(22),
    },
  });
};

Header.defaultProps = {
  title: 'Header',
};

export default Header;
