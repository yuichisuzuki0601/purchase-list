import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Button } from 'react-native';

import { View, Text } from '../components/Themed';
import { DrawerNavigationParamList } from '../navigation/DrawerNavigation';

type NfcScreenNavigationProp = DrawerNavigationProp<DrawerNavigationParamList, 'Nfc'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  area: {
    padding: 10
  }
});

export default function NfcScreen({ navigation }: { navigation: NfcScreenNavigationProp }) {
  return (
    <View style={styles.container}>
      <View style={styles.area}>
        <Text>this is NFC screen.</Text>
      </View>
      <View style={styles.area}>
        <Button onPress={() => navigation.goBack()} title="Go back Home" />
      </View>
    </View>
  );
}
