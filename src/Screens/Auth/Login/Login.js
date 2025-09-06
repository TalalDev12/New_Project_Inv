import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import { AppIcons, Theme } from "../../../libs";
import { useNavigation } from "@react-navigation/native";
import SaveButton from "../../../Components/Common/SaveButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import appleAuth, {
  AppleButton,
} from "@invertase/react-native-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function Login() {
  const [email, setEmail] = useState("t@gmail.com");
  const [password, setPassword] = useState("@Muhammad1");
  const [securePassword, setSecurePassword] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "865174620654-olordd82qa67gg8k16s8aaannr6savsg.apps.googleusercontent.com", // from step 2.6
      iosClientId:
        "865174620654-09sthsbf65vleao8a6vspri1o98pvfq7.apps.googleusercontent.com",
      offlineAccess: true,
    });
  }, []);

  async function testSignin() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info:", userInfo);
    } catch (err) {
      console.log("Sign-In Error:", err);
    }
  }

  const handleAppleLogin = async () => {
    try {
      const res = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      // 👀 Log everything you got back from Apple
      console.log("🍏 Apple Login Response:", JSON.stringify(res, null, 2));

      const authorizationCode = res.authorizationCode;
      const identityToken = res.identityToken;
      const email = res.email;
      const fullName = res.fullName;
      const user = res.user;

      console.log("🔑 Parsed Values:", {
        authorizationCode,
        identityToken,
        email,
        fullName,
        user,
      });

      if (!authorizationCode) {
        Alert.alert("Error", "No authorization code from Apple");
        return;
      }

      // Send code & identityToken to your backend
      const response = await axios.post(
        "https://invoice-maker-app-wsshi.ondigitalocean.app/api/auth/apple-login",
        {
          idToken: identityToken,
          fullName, // optional, only available first time
        }
      );

      const token = response.data && response.data.token;
      if (token) {
        await AsyncStorage.setItem("userToken", token);
      }

      Alert.alert("Success", `Welcome ${response.data.user.name || "User"}!`);
      navigation.navigate("BottomTabNavigation");
    } catch (err) {
      console.log("Apple login error:", err);
      Alert.alert("Apple login failed", err.message || "Unknown error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log("Google Sign-In Info:", JSON.stringify(userInfo, null, 2));

      const idToken = userInfo.data?.idToken;
      if (!idToken) {
        Alert.alert("Error", "No ID token received from Google");
        return;
      }

      const res = await axios.post(
        "https://invoice-maker-app-wsshi.ondigitalocean.app/api/auth/google-login",
        { idToken }
      );

      const token = res.data?.token;
      if (!token) {
        Alert.alert("Error", "No token received from server");
        return;
      }

      await AsyncStorage.setItem("userToken", token);
      Alert.alert("Success", `Welcome ${res.data.user.name}!`);
      navigation.navigate("BottomTabNavigation");
    } catch (err) {
      console.log("Google login error:", err);
      Alert.alert("Google login error", err.message || "Unknown error");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(
        "https://invoice-maker-app-wsshi.ondigitalocean.app/api/auth/login",
        { email, password }
      );

      console.log("📦 Full API Response:", JSON.stringify(res.data, null, 2));

      const token = res.data?.token;
      console.log("🔑 Token:", token);

      if (!token) {
        Alert.alert("Error", "No token received from server");
        return;
      }

      // Save token in AsyncStorage
      await AsyncStorage.setItem("userToken", token);

      Alert.alert("Success", res.data.msg || "Login successful!");
      navigation.navigate("BottomTabNavigation");
    } catch (err) {
      // Log the entire error object for debugging
      console.log("Error Login error (raw):", err);
      console.log("Login error (stringified):", JSON.stringify(err, null, 2));

      // Show both code + message in the alert
      Alert.alert("Login Error", "Please check login credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.loginText}>
        Login
      </Text>

      <View>
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
            cursorColor={Theme.colors.black}
            value={email}
            onChangeText={setEmail}
            maxLength={40}
            keyboardType="email-address"
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
          />
        </View>
      </View>

      <View>
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
            cursorColor={Theme.colors.black}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={securePassword}
            maxLength={40}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
          <View style={styles.eyeWrapper}>
            <TouchableOpacity
              onPress={() => setSecurePassword(!securePassword)}
            >
              {securePassword ? (
                <AppIcons.EyeIcon color={Theme.colors.black} size={23} />
              ) : (
                <AppIcons.EyeOffIcon color={Theme.colors.black} size={23} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.forgotPasswordText}>
          Don't have an Account?
          <Text
            onPress={() => navigation.navigate("Signup")}
            style={styles.forgotPasswordTextSignup}
          >
            {" "}
            Signup
          </Text>
        </Text>
      </View>
      <View style={styles.Button}>
        <SaveButton onPress={handleLogin} title={"Login"} />
      </View>

    {Platform.OS === 'ios' ? (
        <TouchableOpacity
        onPress={handleAppleLogin}
        style={{ alignSelf: "center", marginTop: 12 }}
      >
        <AppleButton
          buttonType={AppleButton.Type.SIGN_IN}
          buttonStyle={AppleButton.Style.BLACK}
          cornerRadius={8}
          style={{ width: 290, height: 40 }}
          onPress={handleAppleLogin}
        />
      </TouchableOpacity>
    ):null}

      <TouchableOpacity
        onPress={handleGoogleLogin}
        style={{
          alignSelf: "center",
          height: 39,
          width: "67%",
          backgroundColor: "black",
          marginTop: 12,
          borderRadius: Theme.borders.normalRadius,
          alignItems:'center',
          justifyContent:'center'
        }}
      >
        <Text style={{color:Theme.colors.white}}>Sign in with Google</Text>
      </TouchableOpacity>

      
    </View>
  );
}
