import { useState } from 'react';
import { ColorSchemeName } from 'react-native';
import { StyleSheet, TextInput, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import Alert from '../components/Alert';

export default function LoginScreen({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const login = () => {
    setIsOpenAlert(true);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Login</Text>
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
