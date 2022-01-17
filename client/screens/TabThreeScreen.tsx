import React from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

const data = () => {
  const random = () => Math.random().toString(32).substring(2);
  const list = [];
  for (let i = 0; i <= 100; ++i) {
    list.push({ id: random(), name: random() });
  }
  return list;
};

const Item = ({ name }: { name: string }) => (
  <View style={styles.item}>
    <Text style={styles.itemName}>{name}</Text>
  </View>
);

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <FlatList data={data()} keyExtractor={(item) => item.id} renderItem={({ item }) => <Item name={item.name} />} />
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
    border: 'solid 1px #888',
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
