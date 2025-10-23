import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Image,
  ScrollView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'Exemplo User', email: 'user@example.com', senha: '123456' }
  ]);

  const adicionarUsuario = (usuario) => {
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
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {props => <LoginScreen {...props} usuarios={usuarios} />}
        </Stack.Screen>
        <Stack.Screen name="Cadastro" options={{ headerShown: false }}>
          {props => <CadastroScreen {...props} adicionarUsuario={adicionarUsuario} />}
        </Stack.Screen>
        <Stack.Screen name="ListaUsuarios" options={{ title: 'Usuários Cadastrados' }}>
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
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.logo}
      />

      <Text style={styles.titulo}>Bem-vindo(a)!</Text>
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
      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </ScrollView>
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
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.logo}
      />

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
      <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// =====================
// Tela de Lista de Usuários
// =====================
function ListaUsuariosScreen({ navigation, usuarios }) {
  return (
    <View style={styles.containerLista}>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.usuario}>
            <Image
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
              style={styles.usuarioLogo}
            />
            <View>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.botaoSair} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.botaoTexto}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

// =====================
// Estilos
// =====================
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#f2f2f2',
  },
  containerLista: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e6f7ff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    alignSelf: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  botao: {
    backgroundColor: '#0077b6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  botaoSair: {
    backgroundColor: '#d62828',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#0077b6',
    textAlign: 'center',
    fontSize: 14,
  },
  usuario: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  usuarioLogo: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
});
