// src/screens/HomeScreen.js
import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import BannerCarousel from "../components/BannerCarousel";
import { fetchBanners } from "../redux/slices/bannerSlice";
import { fetchMenu } from "../redux/slices/menuSlice";

// ✅ Static Images
import butterChicken from "../assets/food/ChickenBanner.png";
import dish1 from "../assets/food/PopularDishes1.png";
import dish2 from "../assets/food/PopularDishes2.png";
import dish3 from "../assets/food/PopularDishes3.png";
import dish4 from "../assets/food/PopularDishes4.png";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const { list: banners = [], loading: bannersLoading, error } = useSelector(
    (state) => state.banner
  );

  const { items: menu = [], loading: menuLoading } = useSelector(
    (state) => state.menu
  );

  const loading = bannersLoading || menuLoading;

  useEffect(() => {
    dispatch(fetchBanners());
    dispatch(fetchMenu());
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(fetchBanners());
    dispatch(fetchMenu());
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuCard}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("MenuScreen", {
          selectedCategory: item.category,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.menuImage} />
      <Text style={styles.menuName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const popularDishes = [
    { id: 1, name: "Paneer Tikka", image: dish1 },
    { id: 2, name: "Chicken Biryani", image: dish2 },
    { id: 3, name: "Grilled Chicken", image: dish3 },
    { id: 4, name: "Chicken Wings", image: dish4 },
  ];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      {/* Banner */}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {bannersLoading ? (
        <ActivityIndicator size="large" color="#E65100" />
      ) : (
        <BannerCarousel banners={banners} />
      )}

      {/* Our Menu */}
      <Text style={styles.sectionTitle}>Our Menu</Text>
      <FlatList
        horizontal
        data={menu}
        renderItem={renderMenuItem}
        keyExtractor={(item) =>
          item._id?.toString() || item.id?.toString()
        }
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        removeClippedSubviews
      />

      {/* Chef's Special */}
      <View style={styles.specialCard}>
        <Image source={butterChicken} style={styles.specialImage} />
        <View style={styles.specialInfo}>
          <Text style={styles.specialTitle}>Chef’s Special</Text>
          <Text style={styles.specialName}>Roasted Chicken Combo</Text>
          <TouchableOpacity style={styles.orderBtn}>
            <Text style={styles.orderText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Popular Dishes */}
      <Text style={styles.sectionTitle}>Popular Dishes</Text>
      <FlatList
        horizontal
        data={popularDishes}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        removeClippedSubviews
        renderItem={({ item }) => (
          <View style={styles.popularCard}>
            <Image source={item.image} style={styles.popularImage} />
            <Text style={styles.popularName}>{item.name}</Text>
          </View>
        )}
      />

      {/* Offer */}
      <View style={styles.offerCard}>
        <Text style={styles.offerText}>🔥 Flat 30% OFF</Text>
        <Text>On orders above ₹499</Text>
      </View>

      {/* Explore by Mood */}
      <Text style={styles.sectionTitle}>Explore by Mood</Text>
      <View style={styles.moodGrid}>
        {["Family", "Party", "Date", "Office"].map((mood) => (
          <View key={mood} style={styles.moodCard}>
            <Text style={styles.moodText}>{mood}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },
  errorText: { color: "red", textAlign: "center" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    margin: 10,
    color: "#E65100",
  },

  menuCard: {
    width: 120,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 12,
    padding: 10,
    alignItems: "center",
    elevation: 3,
  },
  menuImage: { width: 100, height: 100, borderRadius: 10 },
  menuName: { marginTop: 6, fontWeight: "600" },

  specialCard: {
    margin: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
  },
  specialImage: { width: "100%", height: 250 },
  specialInfo: { padding: 12 },
  specialTitle: { color: "#E65100", fontWeight: "700" },
  specialName: { fontSize: 16, fontWeight: "600", marginVertical: 4 },
  orderBtn: {
    backgroundColor: "#E65100",
    padding: 10,
    borderRadius: 8,
    marginTop: 6,
    alignItems: "center",
  },
  orderText: { color: "#fff", fontWeight: "700" },

  popularCard: {
    width: 350,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 12,
    elevation: 3,
  },
  popularImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  popularName: {
    padding: 8,
    fontWeight: "600",
    textAlign: "center",
  },

  offerCard: {
    margin: 12,
    padding: 16,
    backgroundColor: "#FFE0B2",
    borderRadius: 12,
    alignItems: "center",
  },
  offerText: { fontSize: 18, fontWeight: "800", color: "#E65100" },

  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  moodCard: {
    width: "45%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    elevation: 3,
  },
  moodText: { fontWeight: "600" },
});
