import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';
import styles from '../styles/index.styles';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* CABEÇALHO */}
        <View style={styles.header}>

          <TouchableOpacity>
            <Octicons
              name="three-bars"
              size={24}
              color="black"
            />
          </TouchableOpacity>

          <Text style={styles.logo}>
            Fit<Text style={styles.logoRed}>Zone</Text>
          </Text>

          <View style={styles.headerIcons}>

  <TouchableOpacity onPress={() => router.push("/login")}>
    <Feather name="user" size={24} color="black" />
  </TouchableOpacity>

    <TouchableOpacity onPress={() => router.push("/carrinho")}>
       <Feather name="shopping-cart" size={24} color="black" />
    </TouchableOpacity> 

          </View>

        </View>

        {/* PESQUISA */}
        <View style={styles.searchContainer}>

          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color="black"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar produtos..."
            placeholderTextColor="#8b95a5"
          />

        </View>

        {/* BANNER */}
        <View style={styles.banner}>

          <Text style={styles.bannerTitle}>
            MOVIMENTO
          </Text>

          <Text style={styles.bannerTitle}>
            PERFORMANCE
          </Text>

          <Text style={styles.bannerRed}>
            EVOLUÇÃO
          </Text>

          <Text style={styles.bannerDescription}>
            Mais que esportes,{'\n'}
            um estilo de vida.
          </Text>

          <TouchableOpacity
            style={styles.bannerButton}
            onPress={() => router.push('/produtos')}
          >
            <Text style={styles.bannerButtonText}>
              Explorar produtos →
            </Text>
          </TouchableOpacity>

        </View>

        {/* BENEFÍCIOS */}
        <View style={styles.benefits}>

          {/* BENEFÍCIO 1 */}
          <View style={styles.benefit}>

            <AntDesign
              style={styles.benefitIcon}
              name="car"
              size={24}
              color="#e52323"
            />

            <Text style={styles.benefitText}>
              Frete rápido para{'\n'}
              todo o Brasil
            </Text>

          </View>

          {/* BENEFÍCIO 2 */}
          <View style={styles.benefit}>

            <MaterialCommunityIcons
              style={styles.benefitIcon}
              name="security"
              size={24}
              color="#e52323"
            />

            <Text style={styles.benefitText}>
              Compra segura{'\n'}
              e protegida
            </Text>

          </View>

          {/* BENEFÍCIO 3 */}
          <View style={styles.benefit}>

            <Text style={styles.benefitIcon}>
              ☆
            </Text>

            <Text style={styles.benefitText}>
              Qualidade e{'\n'}
              excelência
            </Text>

          </View>

        </View>

        {/* DESTAQUES */}
        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Destaques
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/produtos')}
          >
            <Text style={styles.seeAll}>
              Ver todos →
            </Text>
          </TouchableOpacity>

        </View>

        {/* PRODUTOS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.products}
        >

          {/* PRODUTO 1 */}
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => router.push('/produto/1')}
          >

            <Image
              source={require('../../assets/images/produtos/tenis1.png')}
              style={styles.productImage}
              resizeMode="contain"
            />

            <Text style={styles.productName}>
              Tênis de Corrida Performance
            </Text>

            <Text style={styles.productPrice}>
              R$ 299,90
            </Text>

            <Text style={styles.rating}>
              ★ 4.8 (120)
            </Text>

          </TouchableOpacity>

          {/* PRODUTO 2 */}
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => router.push('/produto/2')}
          >

            <Image
              source={require('../../assets/images/produtos/camisa1.png')}
              style={styles.productImage}
              resizeMode="contain"
            />

            <Text style={styles.productName}>
              Camiseta Esportiva Dry Fit
            </Text>

            <Text style={styles.productPrice}>
              R$ 129,90
            </Text>

            <Text style={styles.rating}>
              ★ 4.7 (89)
            </Text>

          </TouchableOpacity>

          {/* PRODUTO 3 */}
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => router.push('/produto/3')}
          >

            <Image
              source={require('../../assets/images/produtos/calcalegging.png')}
              style={styles.productImage}
              resizeMode="contain"
            />

            <Text style={styles.productName}>
              Calça Legging Feminina
            </Text>

            <Text style={styles.productPrice}>
              R$ 159,90
            </Text>

            <Text style={styles.rating}>
              ★ 4.6 (64)
            </Text>

          </TouchableOpacity>

        </ScrollView>

      </ScrollView>

    </View>
  );
}
