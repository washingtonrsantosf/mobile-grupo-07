import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { addToCart, isFavorite, toggleFavorite } from "../../services/storage";
import styles from '../../styles/produtoDetalhe.styles';

import { produtos } from '../../data/produtoDetalhes';

export default function ProdutoDetalhes() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [favoritado, setFavoritado] = useState(false);

  const produto = produtos[String(id) as keyof typeof produtos];

  useEffect(() => {
    if (id) {
      setFavoritado(isFavorite(Number(id)));
    }
  }, [id]);

  const handleFavorito = () => {
    const productId = Number(id);
    toggleFavorite(productId);
    setFavoritado(!favoritado);
  };

  const handleAdicionarSacola = () => {
    const productId = Number(id);
    const precoNumerico = Number(
      produto.preco.replace('R$', '').replace('.', '').replace(',', '.').trim(),
    );

    addToCart({
      id: productId,
      nome: produto.nome,
      preco: precoNumerico,
    });

    router.push('/carrinho');
  };

  if (!produto) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.erro}>
          <Text style={styles.erroTexto}>Produto não encontrado.</Text>

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => router.back()}
          >
            <Text style={styles.textoBotaoVoltar}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topo}>
          <TouchableOpacity
            style={styles.botaoIcone}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#333333" />
          </TouchableOpacity>

          <Text style={styles.tituloTopo}>Detalhes do produto</Text>

          <TouchableOpacity style={styles.botaoIcone} onPress={handleFavorito}>
            <Ionicons
              name={favoritado ? 'heart' : 'heart-outline'}
              size={24}
              color="#e52323"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.imagemContainer}>
          <Image source={produto.imagem} style={styles.imagem} />
        </View>

        <View style={styles.conteudo}>
          <Text style={styles.categoria}>
  {produto.categorias.join(" • ")}
</Text>

          <Text style={styles.nome}>{produto.nome}</Text>

          <View style={styles.avaliacao}>
            <Ionicons name="star" size={18} color="#f4b400" />
            <Text style={styles.nota}>{produto.avaliacao}</Text>
            <Text style={styles.avaliacoes}>{produto.avaliacoes}</Text>
          </View>

          <Text style={styles.preco}>{produto.preco}</Text>

          <View style={styles.linha} />

          <Text style={styles.tituloSecao}>Descrição</Text>
          <Text style={styles.descricao}>{produto.descricao}</Text>

          <Text style={styles.tituloSecao}>Tamanho</Text>

          <View style={styles.opcoes}>
            {produto.tamanhos.map((tamanho) => (
              <TouchableOpacity key={tamanho} style={styles.opcao}>
                <Text style={styles.textoOpcao}>{tamanho}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.tituloSecao}>Cor</Text>

          <View style={styles.opcoes}>
            {produto.cores.map((cor) => (
              <TouchableOpacity key={cor} style={styles.opcao}>
                <Text style={styles.textoOpcao}>{cor}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.tituloSecao}>Características</Text>

          {produto.caracteristicas.map((caracteristica) => (
            <View key={caracteristica} style={styles.caracteristica}>
              <Ionicons
                name="checkmark-circle"
                size={19}
                color="#e52323"
              />
              <Text style={styles.textoCaracteristica}>
                {caracteristica}
              </Text>
            </View>
          ))}

          <TouchableOpacity style={styles.botaoSacola} onPress={handleAdicionarSacola}>
            <Ionicons name="bag-outline" size={21} color="#ffffff" />
            <Text style={styles.textoBotaoSacola}>
              Adicionar à sacola
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
