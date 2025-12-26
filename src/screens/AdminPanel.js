import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import api from "../api/api";

export default function AdminPanel({ navigation }) {
  const [stats, setStats] = useState({ menu: 0, bookings: 0, catering: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [menuRes, bookingRes, cateringRes] = await Promise.all([
          api.get("/menu"),
          api.get("/tables"),
          api.get("/catering"),
        ]);
        setStats({
          menu: menuRes.data.length,
          bookings: bookingRes.data.length,
          catering: cateringRes.data.length,
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
        Alert.alert("Error", "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

 const adminOptions = [
  { label: "📜 View Menu Items", route: "MenuScreen" },
  { label: "📅 View Table Bookings", route: "ReserveTable" },
  { label: "🍽️ View Catering Requests", route: "Catering" },
  { label: "📂 Manage Categories", route: "CategoryScreen" },  // <-- NEW
];


  const handleLogout = () =>
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel" },
      { text: "Logout", onPress: () => navigation.replace("AdminLogin") },
    ]);

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E65100" />
        <Text style={{ marginTop: 10, fontSize: 16, color: "#555" }}>Loading dashboard...</Text>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: "#FFECB3" }]}>
          <Text style={styles.statNumber}>{stats.menu}</Text>
          <Text style={styles.statLabel}>Menu Items</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: "#FFE0B2" }]}>
          <Text style={styles.statNumber}>{stats.bookings}</Text>
          <Text style={styles.statLabel}>Bookings</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: "#FFCCBC" }]}>
          <Text style={styles.statNumber}>{stats.catering}</Text>
          <Text style={styles.statLabel}>Catering</Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        {adminOptions.map((item, i) => (
          <TouchableOpacity key={i} style={styles.card} onPress={() => navigation.navigate(item.route)}>
            <Text style={styles.cardText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={[styles.card, styles.logout]} onPress={handleLogout}>
          <Text style={[styles.cardText, { color: "#fff" }]}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", minHeight: "100%" },
  title: { fontSize: 26, fontWeight: "700", color: "#E65100", marginBottom: 20, textAlign: "center" },
  statsRow: { flexDirection: "row", justifyContent: "space-between" },
  statCard: { flex: 1, marginHorizontal: 5, padding: 15, borderRadius: 12, alignItems: "center", elevation: 2 },
  statNumber: { fontSize: 24, fontWeight: "700", color: "#E65100" },
  statLabel: { fontSize: 14, color: "#555", marginTop: 5 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
    paddingVertical: 18,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  cardText: { fontSize: 18, color: "#333", fontWeight: "600", textAlign: "center" },
  logout: { backgroundColor: "#E65100", borderColor: "#E65100" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
});
