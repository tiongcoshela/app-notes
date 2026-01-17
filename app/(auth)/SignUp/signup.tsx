import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/services/supabase";
import { Ionicons } from '@expo/vector-icons'; // Ensure this is imported

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Separate states for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) return Alert.alert("Error", "Please fill all fields");
    if (password !== confirmPassword) return Alert.alert("Error", "Passwords do not match");

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) Alert.alert("Sign Up Failed", error.message);
    else {
      Alert.alert("Success", "Account created! Please check your email.");
      router.replace("/(auth)/SignIn/signin");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"} 
              size={24} 
              color="#0077B6" 
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.iconContainer}>
            <Ionicons 
              name={showConfirmPassword ? "eye-off" : "eye"} 
              size={24} 
              color="#0077B6" 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Creating Account..." : "Sign Up"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEEB",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 30,
    elevation: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#0077B6",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 25,
    marginBottom: 16,
    paddingRight: 15, // Creates space for the icon inside the bar
  },
  input: {
    backgroundColor: "#f1f1f1",
    borderRadius: 25,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#000",
  },
  iconContainer: {
    padding: 5,
  },
  button: {
    backgroundColor: "#0077B6",
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});