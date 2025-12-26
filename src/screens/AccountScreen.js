import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>
      <Text style={styles.text}>Coming soon — view your bookings, catering requests, and more!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "700", color: "#E65100" },
  text: { fontSize: 16, textAlign: "center", marginTop: 10, color: "#444" },
});
