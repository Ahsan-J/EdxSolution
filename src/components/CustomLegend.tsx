'use strict';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {scale} from '../helpers/scaler';
import {RootState} from '../redux/types';
import _ from 'lodash';
import {getColorGroup} from '../helpers/utility';

interface propTypes {
  style?: any;
  generateColor?: (val: string) => string;
  data: {[label: string]: string | number};
}

// eslint-disable-next-line prettier/prettier
const CustomLegend: React.FC<propTypes> = React.memo((props: React.PropsWithChildren<propTypes>) => {
    const styles = useStyles();
    const theme = useSelector((store: RootState) => store.theme);

    return (
      <View style={[styles.container, props.style]}>
        {_.map(props.data, (v, k) => {
          return (
            <React.Fragment key={k}>
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor: props.generateColor
                      ? props.generateColor(k)
                      : theme.colors[getColorGroup(k)],
                  },
                ]}
              />
              <Text style={styles.textLabel}>{v}</Text>
            </React.Fragment>
          );
        })}
      </View>
    );
  },
);

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    circle: {
      borderRadius: scale(8),
      width: scale(8),
      height: scale(8),
    },
    textLabel: {
      fontSize: scale(14),
      margin: scale(2),
    },
  });
};

export default CustomLegend;
