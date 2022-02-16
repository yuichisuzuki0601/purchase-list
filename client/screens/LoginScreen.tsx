import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react';
import { Button, ColorSchemeName, StyleSheet, TextInput } from 'react-native';

import { apiPost } from '../ApiClient';
import Alert from '../components/Alert';
import { MonoText } from '../components/StyledText';
import { View } from '../components/Themed';
import AuthTokenContext from '../context/AuthTokenContext';

export default function LoginScreen({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { setAuthToken } = useContext(AuthTokenContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const login = async () => {
    const formData = new FormData();
    formData.append('loginId', email);
    formData.append('password', password);
    try {
      const token = await apiPost('login', formData);
      await AsyncStorage.setItem('Authorization', token);
      setAuthToken(token);
    } catch (e) {
      setIsOpenAlert(true);
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <MonoText style={styles.title}>Login</MonoText>
      </View>
      <View>
        <TextInput style={styles.input} placeholder="email" value={email} onChangeText={onChangeEmail} />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="password"
          value={password}
          onChangeText={onChangePassword}
        />
      </View>
      <Button title="Login" onPress={login} />
      <Alert isOpen={isOpenAlert} title="タイトル" message="メッセージ" onClose={() => setIsOpenAlert(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10
  }
});
