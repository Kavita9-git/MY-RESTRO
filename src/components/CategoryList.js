import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

export default function CategoryList({ categories = [], selected, onSelect }) {
  return (
    <View style={{ marginVertical: 10 }}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i}
        renderItem={({ item }) => {
          const active = selected === item;
          return (
            <TouchableOpacity onPress={() => onSelect && onSelect(item)} style={[styles.chip, active ? styles.chipActive : null]}>
              <Text style={[styles.chipText, active ? styles.chipTextActive : null]}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: "#fff", marginRight: 8, borderWidth: 1, borderColor: "#eee" },
  chipActive: { backgroundColor: "#E65100", borderColor: "#E65100" },
  chipText: { color: "#333", fontWeight: "600" },
  chipTextActive: { color: "#fff" },
});
