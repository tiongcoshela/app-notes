import { supabase } from "@/services/supabase";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace("/(notes)/task");
      }
    };
    checkSession();
  }, []);

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.glassCard}>
          <Text style={styles.logoText}>App Notes</Text>
          <Text style={styles.subtitle}>
            Please sign in or sign up to continue
          </Text>

          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={styles.signInButton} 
              onPress={() => router.push("/(auth)/SignIn/signin")}
            >
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.signUpButton} 
              onPress={() => router.push("/(auth)/SignUp/signup")}
            >
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#87CEEB", // Solid Sky Blue
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  glassCard: {
    backgroundColor: "white",
    padding: 40,
    borderRadius: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  logoText: {
    fontSize: 42,
    fontWeight: "900",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#0077B6",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonGroup: {
    width: "100%",
    gap: 15,
  },
  signInButton: {
    backgroundColor: "#FFBF00", // Yellow button
    padding: 18,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  signInText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0077B6",
  },
  signUpText: {
    color: "#0077B6",
    fontSize: 18,
    fontWeight: "bold",
  },
});