import * as React from 'react';
import { ColorSchemeName, TouchableOpacity } from 'react-native';
import { NavigationContainer, DrawerActions, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import SecondScreen from '../screens/SecondScreen';

export type DrawerNavigationParamList = {
  Home: undefined;
  Second: undefined;
};

const DrawerDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
    //background: '#000',
    card: '#007ab7',
    text: '#fff',
    border: '#007ab7'
    //notification: '#000'
  }
};

let DrawerDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors
    //primary: '#000',
    //background: '#000',
    //card: '#000'
    //text: '#000',
    //border: '#000',
    //notification: '#000'
  }
};
DrawerDarkTheme = DrawerDefaultTheme;

const DrawerOpenButton = ({ navigation }: { navigation: any }) => {
  return (
    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <FontAwesome size={30} style={{ margin: 15 }} name="bars" color="#fff" />
    </TouchableOpacity>
  );
};

const DrawerIcon = (props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) => {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
};

const Drawer = createDrawerNavigator<DrawerNavigationParamList>();

export default function DrawerNavigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DrawerDarkTheme : DrawerDefaultTheme}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            drawerIcon: ({ color }) => <DrawerIcon name="home" color={color} />,
            headerLeft: () => <DrawerOpenButton navigation={navigation} />
          })}
        />
        <Drawer.Screen
          name="Second"
          component={SecondScreen}
          options={({ navigation }) => ({
            drawerIcon: ({ color }) => <DrawerIcon name="address-book" color={color} />,
            headerLeft: () => <DrawerOpenButton navigation={navigation} />
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
