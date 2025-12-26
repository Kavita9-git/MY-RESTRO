// screens/CategoryScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import api from "../api/api";

export default function CategoryScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/categories");  // API from AdminJS backend
        setCategories(res.data);
      } catch (err) {
        console.log("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#E65100" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("SubCategoryScreen", { category: item })}
          >
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 26, fontWeight: "700", marginBottom: 20, color: "#E65100" },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 3,
  },
  cardText: { fontSize: 18, fontWeight: "600", color: "#333" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});
