import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { getFavorites, toggleFavorite } from '../services/storage';
import { router } from 'expo-router';
import styles from '../styles/favoritos.styles';

import { produtosFavoritos } from '../data/favoritos';

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState<number[]>([]);

  const atualizarFavoritos = () => {
    setFavoritos(getFavorites());
  };

  useEffect(() => {
    atualizarFavoritos();
  }, []);

  const itens = favoritos
    .map((id) => produtosFavoritos[id as keyof typeof produtosFavoritos])
    .filter(Boolean);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>

      <ScrollView contentContainerStyle={styles.content}>
        {itens.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Você ainda não marcou nenhum favorito.</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/produtos')}>
              <Text style={styles.buttonText}>Explorar produtos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          itens.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={item.imagem} style={styles.image} resizeMode="contain" />
              <View style={styles.info}>
                <Text style={styles.productName}>{item.nome}</Text>
                <Text style={styles.price}>{item.preco}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => {
                  toggleFavorite(item.id);
                  atualizarFavoritos();
                }}
              >
                <Text style={styles.removeText}>Remover</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
