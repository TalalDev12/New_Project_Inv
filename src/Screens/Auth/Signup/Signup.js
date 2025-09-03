import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import styles from "./Styles";
import { AppIcons, Theme } from "../../../libs";
import { useNavigation } from "@react-navigation/native";
import SaveButton from "../../../Components/Common/SaveButton";
import axios from "axios"; // ✅ Import axios

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigation = useNavigation();

  // ✅ Signup function calling Node.js API
  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
  
    try {
      const res = await axios.post(
        "https://invoice-maker-app-wsshi.ondigitalocean.app/api/auth/signup",
        { name, email, password }
      );
  
      
  
      // Save token to AsyncStorage
  
      Alert.alert("Success", res.data.msg || "Account created successfully!");
  
      // Navigate to Home
      navigation.navigate("Login");
  
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.msg || "Something went wrong"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Create Account</Text>

      {/* Name */}
      <Text style={styles.emailText}>Name</Text>
      <View style={styles.InputWrap}>
        <TextInput
          style={styles.inputTextStyle}
          placeholder="Enter Name"
          placeholderTextColor={Theme.colors.grey}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>

      {/* Email */}
      <Text style={styles.emailText}>Email</Text>
      <View
        style={[
          styles.InputWrap,
          {
            borderColor: isEmailFocused
              ? Theme.colors.primary
              : Theme.colors.DarkGray,
            borderWidth: isEmailFocused ? 1.3 : 0.3,
          },
        ]}
      >
        <TextInput
          style={styles.inputTextStyle}
          placeholder="Enter Email"
          placeholderTextColor={Theme.colors.grey}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />
      </View>

      {/* Password */}
      <Text style={styles.emailText}>Password</Text>
      <View
        style={[
          styles.InputWrapPassword,
          {
            borderColor: isPasswordFocused
              ? Theme.colors.primary
              : Theme.colors.DarkGray,
            borderWidth: isPasswordFocused ? 1.3 : 0.3,
          },
        ]}
      >
        <TextInput
          style={styles.inputTextStyle}
          placeholder="Enter Password"
          placeholderTextColor={Theme.colors.grey}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={securePassword}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
        <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
          {securePassword ? (
            <AppIcons.EyeIcon size={23} color={Theme.colors.black} />
          ) : (
            <AppIcons.EyeOffIcon size={23} color={Theme.colors.black} />
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.forgotPasswordText}>
        Already have an Account?{" "}
        <Text
          onPress={() => navigation.navigate("Login")}
          style={styles.forgotPasswordTextLogin}
        >
          Login
        </Text>
      </Text>

      {/* Signup Button */}
      <View style={styles.Button}>
        <SaveButton onPress={handleSignUp} title={"Signup"} />
      </View>
    </View>
  );
}
