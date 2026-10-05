import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import styles from '../styles/carrinho.styles';

import { produtoInicial } from '../data/carrinho';

export default function Carrinho() {
  const [selecionado, setSelecionado] = useState(true);
  const [quantidade, setQuantidade] = useState(1);

  const subtotal = produtoInicial.preco * quantidade;

  const total = useMemo(() => {
    if (!selecionado) return 0;
    return subtotal;
  }, [selecionado, subtotal]);

  const alternarSelecao = () => setSelecionado((valor) => !valor);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
        <Text style={styles.botaoVoltarTexto}>Voltar</Text>
      </TouchableOpacity>

      <ScrollView>
        <Text style={styles.titulo}>Meu Carrinho</Text>

        <View style={styles.produto}>
          <TouchableOpacity style={styles.checkboxArea} onPress={alternarSelecao}>
            <View style={[styles.checkbox, selecionado && styles.checkboxChecked]}>
              {selecionado && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </TouchableOpacity>

          <Image
            source={produtoInicial.imagem}
            style={styles.imagem}
            resizeMode="contain"
          />

          <View style={styles.informacoes}>
            <Text style={styles.nome}>{produtoInicial.nome}</Text>
            <Text style={styles.preco}>R$ {produtoInicial.preco.toFixed(2).replace('.', ',')}</Text>

            <View style={styles.quantidadeContainer}>
              <TouchableOpacity
                style={styles.botaoQuantidade}
                onPress={() => quantidade > 1 && setQuantidade((valor) => valor - 1)}
              >
                <Text style={styles.botaoTexto}>−</Text>
              </TouchableOpacity>

              <Text style={styles.quantidade}>{quantidade}</Text>

              <TouchableOpacity
                style={styles.botaoQuantidade}
                onPress={() => setQuantidade((valor) => valor + 1)}
              >
                <Text style={styles.botaoTexto}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.resumo}>
          <Text style={styles.resumoTitulo}>Resumo da compra</Text>

          <View style={styles.linha}>
            <Text>Subtotal</Text>
            <Text>R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
          </View>

          <View style={styles.linha}>
            <Text>Frete</Text>
            <Text>Grátis</Text>
          </View>

          <View style={styles.linhaTotal}>
            <Text style={styles.totalTexto}>Total</Text>
            <Text style={styles.totalValor}>R$ {total.toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.finalizar}
          onPress={() => router.push('/finalizacaoDePedido')}
        >
          <Text style={styles.finalizarTexto}>Finalizar compra</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
