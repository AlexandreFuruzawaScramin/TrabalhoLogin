import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ToDoStackParamList } from '../navigation/StackNavigator'; // Ajuste o caminho conforme necessário
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = NativeStackNavigationProp<ToDoStackParamList, 'TodoList'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const correctEmail = 'Teste';
      const correctPassword = 'Teste';

      if (email === correctEmail && password === correctPassword) {
        const credencials = { email, password };
        await AsyncStorage.setItem('credenciais', JSON.stringify(credencials));
        setEmail('');
        setPassword('');
        navigation.navigate('TodoList');
      } else {
        console.error('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao salvar credenciais:', error);
    }
  };

  return (
    <View>
      <SimpleSignInScreen handleLogin={handleLogin} setEmail={setEmail} setPassword={setPassword} email={email} password={password} />
    </View>
  );
};

interface SimpleSignInScreenProps {
  handleLogin: () => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  email: string;
  password: string;
}

function SimpleSignInScreen({ handleLogin, setEmail, setPassword, email, password }: SimpleSignInScreenProps) { // Recebe handleLogin, setEmail, setPassword, email e password como props
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginHorizontal: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: 400,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: 400,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default LoginScreen;
