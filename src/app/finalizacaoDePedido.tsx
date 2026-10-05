import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import styles from '../styles/finalizacaoDePedido.styles';

export default function CheckoutScreen() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [pagamento, setPagamento] = useState('PIX');
  const [pedidoRealizado, setPedidoRealizado] = useState(false);

  const finalizarPedido = () => {
    if (!nome || !telefone || !cep || !endereco || !numero) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios antes de finalizar a compra.');
      return;
    }

    setPedidoRealizado(true);

    setTimeout(() => {
      router.replace('/');
    }, 1800);
  };

  const fecharModal = () => {
    setPedidoRealizado(false);
    router.replace('/');
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Finalizar Compra</Text>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="(21) 99999-9999"
        value={telefone}
        onChangeText={setTelefone}
      />

      <Text style={styles.label}>CEP</Text>
      <TextInput
        style={styles.input}
        placeholder="00000-000"
        value={cep}
        onChangeText={setCep}
      />

      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.input}
        placeholder="Rua, Avenida..."
        value={endereco}
        onChangeText={setEndereco}
      />

      <Text style={styles.label}>Número</Text>
      <TextInput
        style={styles.input}
        placeholder="123"
        value={numero}
        onChangeText={setNumero}
      />

      <Text style={styles.label}>Complemento</Text>
      <TextInput
        style={styles.input}
        placeholder="Apartamento, bloco..."
        value={complemento}
        onChangeText={setComplemento}
      />

      <Text style={styles.sectionTitle}>
        Forma de Pagamento
      </Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => setPagamento('PIX')}
      >
        <Ionicons
          name={
            pagamento === 'PIX'
              ? 'radio-button-on'
              : 'radio-button-off'
          }
          size={22}
          color="#E52323"
        />

        <Text style={styles.optionText}>PIX</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => setPagamento('Cartão')}
      >
        <Ionicons
          name={
            pagamento === 'Cartão'
              ? 'radio-button-on'
              : 'radio-button-off'
          }
          size={22}
          color="#E52323"
        />

        <Text style={styles.optionText}>
          Cartão de Crédito
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => setPagamento('Boleto')}
      >
        <Ionicons
          name={
            pagamento === 'Boleto'
              ? 'radio-button-on'
              : 'radio-button-off'
          }
          size={22}
          color="#E52323"
        />

        <Text style={styles.optionText}>Boleto</Text>
      </TouchableOpacity>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>
          Resumo do Pedido
        </Text>

        <Text style={styles.summaryText}>
          Plano Premium FitZone
        </Text>

        <Text style={styles.summaryText}>
          Quantidade: 1
        </Text>

        <Text style={styles.total}>
          Total: R$ 99,90
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={finalizarPedido}
      >
        <Text style={styles.buttonText}>
          Finalizar Compra
        </Text>
      </TouchableOpacity>
      </ScrollView>

      <Modal
        transparent
        visible={pedidoRealizado}
        animationType="fade"
      >
        <View style={styles.overlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity style={styles.closeButton} onPress={fecharModal}>
              <Ionicons name="close" size={20} color="#333" />
            </TouchableOpacity>
            <Ionicons name="checkmark-circle" size={42} color="#22c55e" />
            <Text style={styles.modalTitle}>Pedido realizado</Text>
            <Text style={styles.modalText}>Pedido realizado com sucesso!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}