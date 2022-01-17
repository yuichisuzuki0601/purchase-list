import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions, DefaultTheme, DarkTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { ColorSchemeName, TouchableOpacity } from 'react-native';

import Alert from '../components/Alert';
import AuthTokenContext from '../context/AuthTokenContext';
import AccountScreen from '../screens/AccountScreen';
import HomeScreen from '../screens/HomeScreen';
import NfcScreen from '../screens/NfcScreen';

export type DrawerNavigationParamList = {
  Account: undefined;
  Home: undefined;
  Nfc: undefined;
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
      <FontAwesome size={15} style={{ margin: 15 }} name="bars" color="#fff" />
    </TouchableOpacity>
  );
};

const DrawerIcon = (props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) => {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
};

const Drawer = createDrawerNavigator<DrawerNavigationParamList>();

export default function DrawerNavigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const { setAuthToken } = useContext(AuthTokenContext);

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DrawerDarkTheme : DrawerDefaultTheme}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="ログアウト"
              icon={({ color }) => <DrawerIcon name="sign-out" color={color} />}
              onPress={() => setIsOpenAlert(true)}
            />
            <Alert
              isOpen={isOpenAlert}
              title="ログアウト"
              message="ログアウトしますね"
              onClose={async () => {
                setIsOpenAlert(false);
                await AsyncStorage.removeItem('authToken');
                setAuthToken('');
              }}
            />
          </DrawerContentScrollView>
        )}
      >
        <Drawer.Screen
          name="Account"
          component={AccountScreen}
          options={({ navigation }) => ({
            drawerIcon: ({ color }) => <DrawerIcon name="user" color={color} />,
            drawerLabel: 'アカウント',
            headerLeft: () => <DrawerOpenButton navigation={navigation} />,
            headerTitle: 'アカウント'
          })}
        />
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            drawerIcon: ({ color }) => <DrawerIcon name="home" color={color} />,
            drawerLabel: 'ホーム',
            headerLeft: () => <DrawerOpenButton navigation={navigation} />,
            headerTitle: 'ホーム'
          })}
        />
        <Drawer.Screen
          name="Nfc"
          component={NfcScreen}
          options={({ navigation }) => ({
            drawerIcon: ({ color }) => <DrawerIcon name="rss" color={color} />,
            drawerLabel: 'NFC管理',
            headerLeft: () => <DrawerOpenButton navigation={navigation} />,
            headerTitle: 'NFC管理'
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
