import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import styles from '../styles/produtos.styles';

import { categorias, produtos } from '../data/produtos';

export default function Produtos() {
  const { categoria } = useLocalSearchParams<{ categoria?: string }>();

  const [categoriaSelecionada, setCategoriaSelecionada] = useState(
    categoria || "Todos"
  );

  const [busca, setBusca] = useState("");

  const produtosFiltrados = produtos.filter((produto) => {
    const correspondeCategoria =
      categoriaSelecionada === "Todos" ||
      produto.categorias.some(
        (cat) =>
          cat.toLowerCase() === categoriaSelecionada.toLowerCase()
      );

    const correspondeBusca = produto.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    return correspondeCategoria && correspondeBusca;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* CABEÇALHO */}
        <View style={styles.header}>

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color="#ffffff"
            />
          </TouchableOpacity>

          <View>
            <Text style={styles.logo}>
              FitZone
            </Text>

            <Text style={styles.subtitulo}>
              Produtos esportivos
            </Text>
          </View>

          <TouchableOpacity style={styles.iconeBotao}>
            <Ionicons
              name="bag-outline"
              size={25}
              color="#ffffff"
            />
          </TouchableOpacity>

        </View>

        {/* PESQUISA */}
        <View style={styles.pesquisaContainer}>

          <Ionicons
            name="search-outline"
            size={21}
            color="#777777"
          />

          <TextInput
            placeholder="Buscar produtos..."
            placeholderTextColor="#888888"
            style={styles.pesquisa}
            value={busca}
            onChangeText={setBusca}
          />

          {busca.length > 0 && (
            <TouchableOpacity onPress={() => setBusca("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color="#999999"
              />
            </TouchableOpacity>
          )}

        </View>

        {/* TÍTULO */}
        <View style={styles.tituloLinha}>

          <View>
            <Text style={styles.titulo}>
              Todos os produtos
            </Text>

            <Text style={styles.quantidade}>
              {produtosFiltrados.length} produtos encontrados
            </Text>
          </View>

          <TouchableOpacity style={styles.filtroBotao}>
            <Ionicons
              name="options-outline"
              size={20}
              color="#e52323"
            />
          </TouchableOpacity>

        </View>

        {/* CATEGORIAS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categorias}
        >

          {categorias.map((categoria) => (
            <TouchableOpacity
              key={categoria}
              style={
                categoriaSelecionada === categoria
                  ? styles.categoriaAtiva
                  : styles.categoria
              }
              onPress={() => setCategoriaSelecionada(categoria)}
            >
              <Text
                style={
                  categoriaSelecionada === categoria
                    ? styles.textoCategoriaAtiva
                    : styles.textoCategoria
                }
              >
                {categoria}
              </Text>
            </TouchableOpacity>
          ))}

        </ScrollView>

        {/* PRODUTOS */}
        <View style={styles.gradeProdutos}>

          {produtosFiltrados.map((produto) => (

            <TouchableOpacity
              key={produto.id}
              style={styles.cardProduto}
              activeOpacity={0.85}
              onPress={() =>
                router.push(`/produto/${produto.id}`)
              }
            >

              <View style={styles.imagemContainer}>

                <Image
                  source={produto.imagem}
                  style={styles.imagemProduto}
                />

                <View style={styles.favorito}>
                  <Ionicons
                    name="heart-outline"
                    size={20}
                    color="#e52323"
                  />
                </View>

              </View>

              <View style={styles.informacoesProduto}>

                <View style={styles.tagCategoria}>
                  <Text style={styles.textoTag}>
                    {produto.categorias.join(" • ")}
                  </Text>
                </View>

                <Text
                  style={styles.nomeProduto}
                  numberOfLines={2}
                >
                  {produto.nome}
                </Text>

                <View style={styles.avaliacao}>

                  <Ionicons
                    name="star"
                    size={15}
                    color="#f4b400"
                  />

                  <Text style={styles.textoAvaliacao}>
                    {produto.avaliacao}
                  </Text>

                </View>

                <Text style={styles.precoProduto}>
                  {produto.preco}
                </Text>

              </View>

            </TouchableOpacity>

          ))}

        </View>

        {/* NENHUM PRODUTO */}
        {produtosFiltrados.length === 0 && (
          <View style={styles.semProdutos}>

            <Ionicons
              name="search-outline"
              size={55}
              color="#cccccc"
            />

            <Text style={styles.semProdutosTitulo}>
              Nenhum produto encontrado
            </Text>

            <Text style={styles.semProdutosTexto}>
              Tente buscar por outro nome ou categoria.
            </Text>

          </View>
        )}

        <View style={styles.espacamentoFinal} />

      </ScrollView>
    </SafeAreaView>
  );
}
