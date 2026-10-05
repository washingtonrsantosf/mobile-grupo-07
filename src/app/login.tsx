import React, { useEffect, useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { getAppStore, saveUser } from '../services/storage';
import styles from '../styles/login.styles';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrarSenha, setLembrarSenha] = useState(false);

  useEffect(() => {
    const store = getAppStore();
    if (store.user) {
      setUsuario(store.user.nome || '');
      setLembrarSenha(true);
    }
  }, []);

  function entrar() {
    if (!usuario || !senha) {
      Alert.alert('Atenção', 'Preencha o nome de usuário e a senha.');
      return;
    }

    const store = getAppStore();
    const user = store.user;

    if (!user || user.nome !== usuario) {
      Alert.alert('Atenção', 'Usuário não cadastrado. Cadastre-se antes de entrar.');
      return;
    }

    if (user.senha !== senha) {
      Alert.alert('Atenção', 'Senha incorreta.');
      return;
    }

    if (lembrarSenha) {
      saveUser(user);
    }

    router.replace('/');
  }

  function esqueciMinhaSenha() {
    Alert.alert('Recuperar senha', 'A recuperação de senha será adicionada em breve.');
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Login</Text>
        </View>

        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
            placeholderTextColor="#777"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#777"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.rememberContainer}
              activeOpacity={0.8}
              onPress={() => setLembrarSenha(!lembrarSenha)}
            >
              <View style={[styles.checkbox, lembrarSenha && styles.checkboxChecked]}>
                {lembrarSenha && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.optionText}>Lembrar senha</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={esqueciMinhaSenha}>
              <Text style={styles.link}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={entrar}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Não possui uma conta? </Text>
            <TouchableOpacity onPress={() => router.push('/perfil')}>
              <Text style={styles.link}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
