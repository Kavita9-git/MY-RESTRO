import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function MenuCard({ item, onPress = () => {} }) {
  const [qty, setQty] = useState(0);

  const increase = () => setQty(qty + 1);
  const decrease = () => {
    if (qty > 0) setQty(qty - 1);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]} />
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {item.description || ""}
        </Text>

        <View style={styles.row}>
          <Text style={styles.price}>₹{item.price}</Text>

          {/* --- Quantity Box --- */}
          {qty === 0 ? (
            <TouchableOpacity style={styles.addBtn} onPress={increase}>
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.qtyBox}>
              <TouchableOpacity style={styles.qtyBtn} onPress={decrease}>
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.qtyNumber}>{qty}</Text>

              <TouchableOpacity style={styles.qtyBtn} onPress={increase}>
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 8,
    elevation: 2,
  },
  image: { width: 110, height: 110 },
  placeholder: { backgroundColor: "#f0f0f0" },
  info: { flex: 1, padding: 10, justifyContent: "space-between" },
  name: { fontSize: 16, fontWeight: "600", color: "#222" },
  desc: { fontSize: 13, color: "#666", marginTop: 4 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  price: { fontWeight: "700", color: "#E65100" },

  // Add Button Styles
  addBtn: {
    backgroundColor: "#E65100",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addBtnText: { color: "#fff", fontWeight: "600" },

  // Quantity Box Styles
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E65100",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  qtyBtn: {
    paddingHorizontal: 8,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#E65100",
  },
  qtyNumber: {
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 8,
    color: "#222",
  },
});
