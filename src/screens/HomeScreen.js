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

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const {
    list: banners = [],
    loading: bannersLoading = false,
    error: bannersError,
  } = useSelector((state) => state.banner || {});

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


  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      {/* Banner Carousel */}
      {bannersError && <Text style={styles.errorText}>{bannersError}</Text>}
      {bannersLoading ? (
        <ActivityIndicator
          size="large"
          color="#E65100"
          style={{ marginVertical: 20 }}
        />
      ) : (
        <BannerCarousel banners={banners} />
      )}

      {/* Our Menu Section */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Our Menu</Text>

        {menuLoading ? (
          <ActivityIndicator
            size="large"
            color="#E65100"
            style={{ marginVertical: 20 }}
          />
        ) : (
          <FlatList
            data={menu}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item._id?.toString() ?? item.id?.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#fafafa", flex: 1 },
  errorText: { color: "red", textAlign: "center", marginVertical: 10 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 10,
    marginBottom: 8,
    color: "#E65100",
  },
  menuSection: { marginBottom: 20 },
  menuCard: {
    width: 120,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 12,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  menuName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
});
