import { StyleSheet, View, Button } from 'react-native';
import { DrawerNavigationParamList } from '../navigation/DrawerNavigation';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type SecondScreenNavigationProp = DrawerNavigationProp<DrawerNavigationParamList, 'Second'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default function SecondScreen({ navigation }: { navigation: SecondScreenNavigationProp }) {
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()} title="Go back Home" />
    </View>
  );
}
