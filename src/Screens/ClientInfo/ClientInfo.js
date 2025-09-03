import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import { AppIcons, Responsive, Theme } from "../../libs";
import { useNavigation, useRoute } from "@react-navigation/native";
import SaveButton from "../../Components/Common/SaveButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ClientInfo() {
  const [clientName, setclientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  const { getHeight, getWidth } = Responsive;
  const navigation = useNavigation();
  const route = useRoute();
  const clientId = route.params?.clientId;

  const saveClientInfo = async () => {
    if (!clientName || !address || !email || !phone) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }
  
    try {
      const token = await AsyncStorage.getItem("userToken");
      const apiUrl =
        "https://invoice-maker-app-wsshi.ondigitalocean.app/api/client/";
  
      const clientData = {
        clientName,
        address,
        email,
        phone,
        shippingAddress,
      };
  
      let response;
  
      if (clientId) {
        // 🔹 Update existing client
        response = await axios.put(`${apiUrl}${clientId}`, clientData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else {
        // 🔹 Create new client
        response = await axios.post(apiUrl, clientData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
  
      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          "Success",
          clientId
            ? "Client information updated successfully!"
            : "Client information saved successfully!"
        );
        navigation.navigate("AllClientList");
      }
    } catch (error) {
      console.error("Save/Update Client Info Error:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to save client information. Please try again.");
    }
  };
  

  useEffect(() => {
    if (clientId) {
      fetchClientInfo();
    }
  }, [clientId]);

  //fetch and set single business info

  const fetchClientInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const apiUrl = `https://invoice-maker-app-wsshi.ondigitalocean.app/api/client/${clientId}`;

      console.log("Fetching client:", apiUrl, "Token:", token);

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

        setclientName(data.clientName || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setAddress(data.address || "");
        setShippingAddress(data.shippingAddress || "");
        if (data.logo) setImageUri(data.logo);
      }
    } catch (error) {
      console.error(
        "❌ Fetch Client Error:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Failed to load client information.");
    }
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
            {clientId ? "Edit Client" : "Client Info"}
          </Text>
        </View>

        {/* <AppIcons.DoneIcon size={27} color={Theme.colors.white} /> */}
      </View>
      <ScrollView>
        <View style={styles.dataBox}>
          <Text style={styles.inputHeading}>Client Name*</Text>
          <TextInput
            placeholder="Enter Your Business Name"
            placeholderTextColor={Theme.colors.black}
            value={clientName}
            onChangeText={(text) => setclientName(text)}
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
            Billing Address
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

          <SaveButton
            title={clientId ? "Update" : "Save"}
            onPress={() => {
              saveClientInfo();
              navigation.goBack();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
