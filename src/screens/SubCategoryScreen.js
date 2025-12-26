// screens/SubCategoryScreen.js
import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function SubCategoryScreen({ route }) {
  const { category } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category?.name}</Text>

      <FlatList
        data={category?.subCategories || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.subText}>{item.name}</Text>

            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.image} />
            ) : null}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
  card: {
    padding: 18,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subText: { fontSize: 18, fontWeight: "600" },
  image: { width: 50, height: 50, borderRadius: 8 },
});
