import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import { AppIcons, Responsive, Theme } from "../../libs";
import { useNavigation, useRoute } from "@react-navigation/native";
import SaveButton from "../../Components/Common/SaveButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { launchImageLibrary } from "react-native-image-picker";

export default function BusinessInfo() {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [imageUri, setImageUri] = useState("");

  const { getHeight, getWidth } = Responsive;
  const navigation = useNavigation();
  const route = useRoute();
  const businessId = route.params?.businessId;

  useEffect(() => {
    if (businessId) {
      fetchBusinessInfo();
    }
  }, [businessId]);

  //fetch and set single business info

  const fetchBusinessInfo = async () => {
    try {
      console.log("busines id", businessId);
      const token = await AsyncStorage.getItem("userToken");
      const apiUrl = `https://invoice-maker-app-wsshi.ondigitalocean.app/api/business/${businessId}`;

      console.log("Fetching Business:", apiUrl, "Token:", token);

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response Data:", response.data);

      if (response.status === 200) {
        // check if your data is inside response.data.data
        const data = response.data.data ? response.data.data : response.data;

        setBusinessName(data.businessName || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setAddress(data.address || "");
        setWebsite(data.website || "");
        if (data.logo) setImageUri(data.logo);
      }
    } catch (error) {
      console.error(
        "❌ Fetch Business Error:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Failed to load business information.");
    }
  };

  //api post request

  // const saveBusinessInfo = async () => {
  //   if (!businessName || !address || !email || !phone || !website) {
  //     Alert.alert("Validation Error", "All fields are required.");
  //     return;
  //   }

  //   try {
  //     const token = await AsyncStorage.getItem("userToken");
  //     const apiUrl = businessId
  //       ? `https://invoice-maker-app-wsshi.ondigitalocean.app/api/business/${businessId}`
  //       : "https://invoice-maker-app-wsshi.ondigitalocean.app/api/business/";

  //     const businessData = {
  //       businessName,
  //       address,
  //       email,
  //       phone,
  //       website,
  //     };

  //     const response = businessId
  //       ? await axios.put(apiUrl, businessData, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         })
  //       : await axios.post(apiUrl, businessData, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         });

  //     if (response.status === 200 || response.status === 201) {
  //       Alert.alert("Success", "Business information saved successfully!");
  //       navigation.navigate("AllBusinessList");
  //     }
  //   } catch (error) {
  //     console.error("Save Business Info Error:", error);
  //     Alert.alert(
  //       "Error",
  //       "Failed to save business information. Please try again."
  //     );
  //   }
  // };

  const saveBusinessInfo = async () => {
    if (!businessName || !address || !email || !phone || !website) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }
  
    try {
      const token = await AsyncStorage.getItem("userToken");
      const apiUrl = businessId
        ? `https://invoice-maker-app-wsshi.ondigitalocean.app/api/business/${businessId}`
        : "https://invoice-maker-app-wsshi.ondigitalocean.app/api/business/";
  
      const formData = new FormData();
      formData.append("businessName", businessName);
      formData.append("address", address);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("website", website);
  
      if (imageUri && !imageUri.startsWith("http")) {
        formData.append("logo", {
          uri: imageUri,
          type: "image/jpeg", // or image/png
          name: "logo.jpg",
        });
      }
  
      const response = businessId
        ? await axios.put(apiUrl, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          })
        : await axios.post(apiUrl, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
  
      if (response.status === 200 || response.status === 201) {
        Alert.alert("Success", "Business information saved successfully!");
        navigation.navigate("AllBusinessList");
      }
    } catch (error) {
      console.error("Save Business Info Error:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to save business information. Please try again.");
    }
  };
  

  const openGallery = () => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={"transparent"} />
      <View style={styles.header}>
        <View style={styles.headerArrowAndText}>
          <AppIcons.backArrow
            onPress={() => navigation.goBack()}
            size={27}
            color={Theme.colors.white}
          />
          <Text style={styles.headingText}>
            {businessId ? "Edit Business" : "Business Info"}
          </Text>
        </View>

        {/* <AppIcons.DoneIcon
          onPress={() =>
            navigation.navigate("PdfScreen", { businessName: businessName })
          }
          size={27}
          color={Theme.colors.white}
        /> */}
      </View>
      <ScrollView>
        <View style={styles.dataBox}>
          <TouchableOpacity onPress={openGallery} style={styles.plusIconWrap}>
            {imageUri ? (
              <Image style={styles.businessLogo} source={{ uri: imageUri }} />
            ) : (
              <AppIcons.PlusIcon disabled={true} size={36} color={Theme.colors.black} />
            )}
          </TouchableOpacity>

          <Text style={styles.inputHeading}>Business Info*</Text>
          <TextInput
            placeholder="Enter Your Business Name"
            placeholderTextColor={Theme.colors.black}
            value={businessName}
            onChangeText={(text) => setBusinessName(text)}
            style={styles.inputStyle}
            maxLength={40}
            allowFontScaling={false}
            returnKeyType="next"
          />

          <Text style={[styles.inputHeading, { marginTop: getHeight(2.5) }]}>
            Email Address
          </Text>
          <TextInput
            placeholder="Enter Business Email"
            placeholderTextColor={Theme.colors.black}
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.inputStyle}
            maxLength={40}
            keyboardType="email-address"
            allowFontScaling={false}
            returnKeyType="next"
          />

          <Text style={[styles.inputHeading, { marginTop: getHeight(2.5) }]}>
            Phone Number
          </Text>
          <TextInput
            placeholder="Enter Business Phone Number"
            placeholderTextColor={Theme.colors.black}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            style={styles.inputStyle}
            maxLength={40}
            keyboardType="phone-pad"
            allowFontScaling={false}
            returnKeyType="next"
          />

          <Text style={[styles.inputHeading, { marginTop: getHeight(2.5) }]}>
            Business Address
          </Text>
          <TextInput
            placeholder="Enter Business Address"
            placeholderTextColor={Theme.colors.black}
            value={address}
            onChangeText={(text) => setAddress(text)}
            style={styles.inputStyle}
            maxLength={40}
            allowFontScaling={false}
            returnKeyType="next"
          />

          <Text style={[styles.inputHeading, { marginTop: getHeight(2.5) }]}>
            Business Website
          </Text>
          <TextInput
            placeholder="Enter Business Website Link"
            placeholderTextColor={Theme.colors.black}
            value={website}
            onChangeText={(text) => setWebsite(text)}
            style={styles.inputStyle}
            maxLength={40}
            cursorColor={Theme.colors.primary}
            allowFontScaling={false}
            returnKeyType="send"
          />
          <SaveButton
            title={businessId ? "Update" : "Save"}
            onPress={() => {
              saveBusinessInfo(), navigation.goBack();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
