import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Delivery() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Online Delivery</Text>
      <Text style={styles.text}>Order your favorite dishes from Barbeque Nation and get them delivered hot & fresh!</Text>
      <Text style={styles.text}>We deliver within 5km of our branches.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", color: "#E65100", marginBottom: 10 },
  text: { fontSize: 16, textAlign: "center", color: "#444" },
});
