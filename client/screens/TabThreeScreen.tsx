import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';

import { apiGet } from '../ApiClient';
import { Text, View } from '../components/Themed';

const data = () => {
  const random = () => Math.random().toString(32).substring(2);
  const list = [];
  for (let i = 1; i <= 100; ++i) {
    list.push({ id: i, name: random() });
  }
  return list;
};

const Item = ({ number, name }: { number: number; name: string }) => (
  <View style={styles.item}>
    <Text style={styles.itemName}>{`${number}: ${name}`}</Text>
  </View>
);

export default function TabThreeScreen() {
  const [list, setList] = useState(data());

  useEffect(() => {
    (async () => {
      try {
        setList(await apiGet('hello'));
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Item number={item.id} name={item.name} />}
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
    //useWindowDimensionsが推奨らしい
    width: Dimensions.get('screen').width
  },
  itemName: {
    color: '#444',
    fontSize: 20
  }
});
