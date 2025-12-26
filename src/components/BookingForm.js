import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

export default function BookingForm({ initial = {}, onSubmit }) {
  const [form, setForm] = useState({
    name: initial.name || "",
    phone: initial.phone || "",
    date: initial.date || "",
    time: initial.time || "",
    people: initial.people ? String(initial.people) : "2",
    branch: initial.branch || "",
    notes: initial.notes || "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleChange = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const showSuccessMessage = (message) => {
    setSuccessMsg(message);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => setSuccessMsg(""));
      }, 2500);
    });
  };

  const submit = async () => {
    if (!form.name || !form.phone || !form.date || !form.time) {
      showSuccessMessage("⚠️ Please fill name, phone, date and time.");
      return;
    }

    const payload = { ...form, people: Number(form.people) };

    try {
      await onSubmit?.(payload);
      showSuccessMessage("✅ Your table has been reserved successfully!");

      // Clear all fields after success
      setForm({
        name: "",
        phone: "",
        date: "",
        time: "",
        people: "2",
        branch: "",
        notes: "",
      });
    } catch (error) {
      showSuccessMessage("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {successMsg ? (
        <Animated.View style={[styles.successBox, { opacity: fadeAnim }]}>
          <Text style={styles.successText}>{successMsg}</Text>
        </Animated.View>
      ) : null}

      <TextInput
        placeholder="Name"
        value={form.name}
        onChangeText={(t) => handleChange("name", t)}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone"
        value={form.phone}
        onChangeText={(t) => handleChange("phone", t)}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Date (YYYY-MM-DD)"
        value={form.date}
        onChangeText={(t) => handleChange("date", t)}
        style={styles.input}
      />
      <TextInput
        placeholder="Time (HH:MM)"
        value={form.time}
        onChangeText={(t) => handleChange("time", t)}
        style={styles.input}
      />
      <TextInput
        placeholder="People"
        value={form.people}
        onChangeText={(t) => handleChange("people", t)}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Branch"
        value={form.branch}
        onChangeText={(t) => handleChange("branch", t)}
        style={styles.input}
      />
      <TextInput
        placeholder="Notes (optional)"
        value={form.notes}
        onChangeText={(t) => handleChange("notes", t)}
        style={[styles.input, { height: 80 }]}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Reserve Table</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    backgroundColor: "#fafafa",
  },
  button: {
    backgroundColor: "#E65100",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  successBox: {
    backgroundColor: "#E8F5E9",
    borderLeftWidth: 5,
    borderLeftColor: "#2E7D32",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  successText: {
    color: "#2E7D32",
    fontWeight: "600",
    textAlign: "center",
  },
});
