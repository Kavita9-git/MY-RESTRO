import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { loginAdmin } from "../api/adminApi";


export default function AdminLogin({ navigation }) {
  const [cred, setCred] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    const { username, password } = cred;

    if (!username || !password) {
      Alert.alert("Missing Info", "Please enter username and password");
      return;
    }

    setLoading(true);

    // ✅ Simple local validation (can be connected to backend later)
    setTimeout(() => {
      setLoading(false);
      if (username === "admin" && password === "1234") {
        Alert.alert("Login Success", "Welcome back, Admin!", [
          { text: "Continue", onPress: () => navigation.replace("AdminPanel") },
        ]);
      } else {
        Alert.alert("Login Failed", "Invalid credentials");
      }
    }, 800);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#999"
        value={cred.username}
        onChangeText={(t) => setCred({ ...cred, username: t })}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        value={cred.password}
        secureTextEntry
        onChangeText={(t) => setCred({ ...cred, password: t })}
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading}>
        <Text style={styles.btnText}>{loading ? "Logging in..." : "Login"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#E65100",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fafafa",
  },
  btn: {
    backgroundColor: "#E65100",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
