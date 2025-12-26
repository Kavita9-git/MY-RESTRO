import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HappinessCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Happiness Card</Text>
      <Text style={styles.text}>Buy a Barbeque Nation Happiness Card and gift a joyful dining experience to your loved ones!</Text>
      <Text style={styles.text}>Available at all branches and online soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", color: "#E65100", marginBottom: 10 },
  text: { fontSize: 16, textAlign: "center", color: "#444" },
});
