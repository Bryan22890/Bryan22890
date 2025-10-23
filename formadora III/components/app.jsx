import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [usuarios, setUsuarios] = useState([]);

  const adicionarUsuario = (usuario) => {
    // Verifica se email já existe
    const existe = usuarios.some(u => u.email === usuario.email);
    if (existe) {
      Alert.alert('Erro', 'Email já cadastrado.');
      return false;
    }
    setUsuarios([...usuarios, usuario]);
    return true;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} usuarios={usuarios} />}
        </Stack.Screen>
        <Stack.Screen name="Cadastro">
          {props => <CadastroScreen {...props} adicionarUsuario={adicionarUsuario} />}
        </Stack.Screen>
        <Stack.Screen name="ListaUsuarios">
          {props => <ListaUsuariosScreen {...props} usuarios={usuarios} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// =====================
// Tela de Login
// =====================
function LoginScreen({ navigation, usuarios }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (usuario) {
      navigation.navigate('ListaUsuarios');
    } else {
      Alert.alert('Erro', 'Email ou senha inválidos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo(a) de volta!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Button title="Entrar" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

// =====================
// Tela de Cadastro
// =====================
function CadastroScreen({ navigation, adicionarUsuario }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    const sucesso = adicionarUsuario({ id: Date.now(), nome, email, senha });
    if (sucesso) {
      Alert.alert('Sucesso', 'Cadastro realizado!');
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crie sua Conta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
}

// =====================
// Tela de Lista de Usuários
// =====================
function ListaUsuariosScreen({ navigation, usuarios }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Usuários Cadastrados</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.usuario}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
      />
      <Button title="Sair" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

// =====================
// Estilos
// =====================
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  titulo: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 10, borderRadius: 5 },
  link: { marginTop: 15, color: 'blue', textAlign: 'center' },
  usuario: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  nome: { fontWeight: 'bold', fontSize: 16 },
  email: { fontSize: 14, color: '#555' },
});
