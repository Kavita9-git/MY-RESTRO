import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import api from "../api/api";

export default function Catering() {
  const [data, setData] = useState({ name: "", phone: "", eventType: "", guests: "", message: "" });

  const handleSubmit = async () => {
    if (!data.name || !data.phone) return Alert.alert("Validation", "Please fill all required fields");
    try {
      await api.post("/catering", data);
      Alert.alert("Success", "Catering request sent!");
      setData({ name: "", phone: "", eventType: "", guests: "", message: "" });
    } catch {
      Alert.alert("Error", "Failed to submit request");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Catering Request</Text>
      {["name", "phone", "eventType", "guests", "message"].map((f) => (
        <TextInput
          key={f}
          style={styles.input}
          placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
          value={data[f]}
          onChangeText={(t) => setData((s) => ({ ...s, [f]: t }))}
          multiline={f === "message"}
        />
      ))}
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Submit Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "700", color: "#E65100", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#eee", padding: 10, borderRadius: 8, marginVertical: 6 },
  btn: { backgroundColor: "#E65100", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 8 },
  btnText: { color: "#fff", fontWeight: "700" },
});
