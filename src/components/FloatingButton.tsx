'use strict';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {scale, verticalScale} from '../helpers/scaler';
import {RootState} from '../redux/types';
import {IColorsType} from 'src/helpers/theme';
import Icon from 'react-native-vector-icons/AntDesign';

interface propTypes {
  style?: any;
  size?: number;
  color?: keyof IColorsType;
}

// eslint-disable-next-line prettier/prettier
const FloatingButton: React.FC<propTypes> = React.memo((props: React.PropsWithChildren<propTypes>) => {
    const styles = useStyles({size: props.size, color: props.color});
    // eslint-disable-next-line prettier/prettier
    const touchOpacity = useSelector((store: RootState) => store.theme.touchOpacity);

    return (
      <TouchableOpacity
        activeOpacity={touchOpacity}
        style={[styles.container, props.style]}>
        <Icon name="plus" style={styles.icon} />
      </TouchableOpacity>
    );
  },
);

type styleProp = {
  size?: number;
  color?: keyof IColorsType;
};

const useStyles = (state: styleProp) => {
  const theme = useSelector((store: RootState) => store.theme);
  const size = state.size || 0;
  return StyleSheet.create({
    container: {
      position: 'absolute',
      // top: 0,
      // left: 0,
      bottom: verticalScale(100),
      right: scale(15),
      height: scale(size),
      width: scale(size),
      borderRadius: scale(size),
      backgroundColor: theme.colors[state.color || 'primary'],
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      color: theme.colors.white,
      fontSize: scale(size) / 2,
    },
  });
};

FloatingButton.defaultProps = {
  size: 50,
  color: 'primary',
};

export default FloatingButton;
