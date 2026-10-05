import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import {
  Feather,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { getAppStore, saveUser } from "../services/storage";
import { router } from "expo-router";
import styles from '../styles/perfil.styles';

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  useEffect(() => {
    const store = getAppStore();
    if (store.user) {
      setNome(store.user.nome || "");
      setEmail(store.user.email || "");
      setDataNascimento(store.user.dataNascimento || "");
      setSenha(store.user.senha || "");
      setConfirmarSenha(store.user.senha || "");
    }
  }, []);

  function cadastrar() {
    if (
      !nome ||
      !email ||
      !senha ||
      !confirmarSenha ||
      !dataNascimento
    ) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    saveUser({ nome, email, senha, dataNascimento });
    Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
    router.push('/login');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>

        <Text style={styles.titulo}>Seja FitZone</Text>

        {/* Nome */}
        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color="#333333" />

          <TextInput
            placeholder="Nome do usuário"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color="#333333" />

          <TextInput
            placeholder="Digite seu email"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Senha */}
        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#333333" />

          <TextInput
            placeholder="Digite sua senha"
            secureTextEntry
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        {/* Confirmar senha */}
        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#333333" />

          <TextInput
            placeholder="Confirme sua senha"
            secureTextEntry
            style={styles.input}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
        </View>

        {/* Data de nascimento */}
        <View style={styles.inputContainer}>
          <FontAwesome5
            name="calendar-alt"
            size={18}
            color="#333333"
          />

          <TextInput
            placeholder="DD/MM/AAAA"
            style={styles.input}
            value={dataNascimento}
            onChangeText={setDataNascimento}
            keyboardType="numeric"
          />
        </View>

        {/* Botão */}
        <TouchableOpacity
          style={styles.botao}
          onPress={cadastrar}
        >
          <Text style={styles.textoBotao}>
            Cadastrar
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}
