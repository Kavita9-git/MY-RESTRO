import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MenuCard from "../components/MenuCard";
import CategoryList from "../components/CategoryList";
import { fetchMenu } from "../redux/slices/menuSlice";

export default function MenuScreen({ route }) {
  const dispatch = useDispatch();

  // If user clicked a Menu Item from HomeScreen, this value will come
  const selectedCategoryFromHome = route?.params?.selectedCategory || "All";

  const { items: menu = [], loading = false, error = null } = useSelector(
    (s) => s.menu || {}
  );

  const [category, setCategory] = useState(selectedCategoryFromHome);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  // Generate category list dynamically
  const categories = ["All", ...new Set(menu.map((m) => m.category || "Other"))];

  // Filter menu by selected category
  const filtered =
    category === "All" ? menu : menu.filter((m) => m.category === category);

  return (
    <View style={styles.container}>
      {/* Error */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Category selector */}
      <CategoryList
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      {/* Loader / Data */}
      {loading ? (
        <ActivityIndicator size="large" color="#E65100" style={{ marginTop: 30 }} />
      ) : filtered.length === 0 ? (
        <Text style={styles.emptyText}>No items found in this category.</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item._id || item.id}
          renderItem={({ item }) => <MenuCard item={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fafafa" },
  errorText: { color: "red", textAlign: "center", marginVertical: 10 },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 30,
    fontSize: 15,
  },
});
