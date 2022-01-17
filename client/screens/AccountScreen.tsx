import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet } from 'react-native';

import { View, Text } from '../components/Themed';
import { DrawerNavigationParamList } from '../navigation/DrawerNavigation';

type AccountScreenNavigationProp = DrawerNavigationProp<DrawerNavigationParamList, 'Account'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default function AccountScreen({ navigation }: { navigation: AccountScreenNavigationProp }) {
  return (
    <View style={styles.container}>
      <Text>this is Account screen.</Text>
    </View>
  );
}
