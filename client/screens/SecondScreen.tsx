import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Button } from 'react-native';

import { View, Text } from '../components/Themed';
import { DrawerNavigationParamList } from '../navigation/DrawerNavigation';

type SecondScreenNavigationProp = DrawerNavigationProp<DrawerNavigationParamList, 'Second'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default function SecondScreen({ navigation }: { navigation: SecondScreenNavigationProp }) {
  return (
    <View style={styles.container}>
      <Text>this is second screen.</Text>
      <br />
      <Button onPress={() => navigation.goBack()} title="Go back Home" />
    </View>
  );
}
