import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/types';
import TypeListItem from '../components/TypeListItem';
import {getColorGroup} from '../helpers/utility';
import moment, {Moment} from 'moment';
import database from '@react-native-firebase/database';
import {setOverlaySpinner} from '../redux/actions/app';

interface propType {
  style?: any;
}

// eslint-disable-next-line prettier/prettier
const Type: React.SFC<propType> = React.memo((props: React.PropsWithChildren<propType>) => {
    const styles = useStyles();
    const [isRefreshing, setRefreshState] = useState<boolean>(false);
    const [updatingTime, setUpdateTime] = useState<Moment>(moment());
    const dispatch = useDispatch();
    const [data, setData] = useState<Array<any>>([]);

    const getData = () => {
      database()
        .ref('/byType')
        .once('value', (snapshot: any) => {
          setData(snapshot.val());
          setRefreshState(false);
          setUpdateTime(moment());
          dispatch(setOverlaySpinner(false));
        });
    };

    useEffect(() => {
      dispatch(setOverlaySpinner(true));
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <View style={[styles.container, props.style]}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.type}
          horizontal={false}
          numColumns={2}
          refreshing={isRefreshing}
          onRefresh={() => {
            setRefreshState(true);
            getData();
          }}
          renderItem={({item, index}) => {
            return (
              <TypeListItem
                color={getColorGroup(index)}
                count={item.count}
                typeLabel={item.type}
                pieData={item.values}
              />
            );
          }}
          ListFooterComponent={() => (
            <Text style={styles.footerText}>
              Last Updated at {updatingTime.format('DD/MM/YYYY hh:mm A')}
            </Text>
          )}
        />
      </View>
    );
  },
);

const useStyles = () => {
  const theme = useSelector((store: RootState) => store.theme);
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    footerText: {
      textAlign: 'center',
      color: theme.colors.grey,
    },
  });
};

export default Type;
