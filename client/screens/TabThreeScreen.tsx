import React, { useContext } from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import AuthTokenContext from '../context/AuthTokenContext';

const data = () => {
  const random = () => Math.random().toString(32).substring(2);
  const list = [];
  for (let i = 1; i <= 100; ++i) {
    list.push({ id: random(), number: i, name: random() });
  }
  return list;
};

const Item = ({ number, name }: { number: number; name: string }) => (
  <View style={styles.item}>
    <Text style={styles.itemName}>{`${number}: ${name}`}</Text>
  </View>
);

export default function TabThreeScreen() {
  const { authToken } = useContext(AuthTokenContext);
  return (
    <View style={styles.container}>
      <FlatList
        data={data()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item number={item.number} name={`${item.name}: ${authToken}`} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 10,
    marginVertical: 1,
    padding: 20,
    width: Dimensions.get('screen').width
  },
  itemName: {
    color: '#444',
    fontSize: 20
  }
});
