import React from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import BookingForm from "../components/BookingForm";
import api from "../api/api";

export default function ReserveTable() {
  const handleBooking = async (data) => {
    try {
      await api.post("/tables", data);
      Alert.alert("Success", "Your table has been reserved successfully!");
    } catch (e) {
      Alert.alert("Error", "Failed to reserve table");
    }
  };

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", color: "#E65100", marginBottom: 10 }}>Reserve a Table</Text>
      <BookingForm onSubmit={handleBooking} />
    </ScrollView>
  );
}
