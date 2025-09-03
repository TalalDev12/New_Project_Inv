import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import { AppIcons, Responsive, Theme } from "../../libs";
import { useNavigation, useRoute } from "@react-navigation/native";
import SaveButton from "../../Components/Common/SaveButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";

export default function PaymentInfo() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDesc, setPaymentDesc] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [showQR, setShowQR] = useState(false);

  const { getHeight, getWidth } = Responsive;
  const navigation = useNavigation();
  const route = useRoute();
  const paymentId = route.params?.paymentId;

  const savePaymentInfo = async () => {
    if (!paymentMethod || !paymentDesc || !paymentLink) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }
  
    try {
      const token = await AsyncStorage.getItem("userToken");
      const apiUrl = "https://invoice-maker-app-wsshi.ondigitalocean.app/api/payment/";
  
      const paymentData = {
        paymentMethod,
        paymentDesc,
        paymentLink,
      };
  
      let response;
      if (paymentId) {
        // Update existing payment
        response = await axios.put(`${apiUrl}${paymentId}`, paymentData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else {
        // Create new payment
        response = await axios.post(apiUrl, paymentData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
  
      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          "Success",
          paymentId
            ? "Payment information updated successfully!"
            : "Payment information saved successfully!"
        );
        navigation.navigate("AllPaymentsList");
      }
    } catch (error) {
      console.error("Save/Update Payment Info Error:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        `Failed to ${paymentId ? "update" : "save"} payment information. Please try again.`
      );
    }
  };
  
  useEffect(() => {
    if (paymentId) {
      fetchPaymentInfo();
    }
  }, [paymentId]);

  //fetch and set single business info

  const fetchPaymentInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const apiUrl = `https://invoice-maker-app-wsshi.ondigitalocean.app/api/payment/${paymentId}`;

      console.log("Fetching payment:", apiUrl, "Token:", token);

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









        setPaymentMethod(data.paymentMethod || "");
        setPaymentDesc(data.paymentDesc || "");
        setPaymentLink(data.paymentLink || "");
       
      }
    } catch (error) {
      console.error(
        "❌ Fetch payment Error:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Failed to load payment information.");
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
          <Text style={styles.headingText}>{paymentId ? "Update Payment Method":"New Payment Method"}</Text>
        </View>

        <AppIcons.DoneIcon
          onPress={() =>
            navigation.navigate("PdfScreen", { businessName: businessName })
          }
          size={27}
          color={Theme.colors.white}
        />
      </View>
      <ScrollView>
        <View style={styles.dataBox}>
          <Text style={styles.inputHeading}>Add Payment Method</Text>
          <TextInput
            placeholder="Payment Method"
            placeholderTextColor={Theme.colors.black}
            value={paymentMethod}
            onChangeText={(text) => setPaymentMethod(text)}
            style={styles.inputStyle}
            maxLength={40}
            allowFontScaling={false}
            returnKeyType="next"
          />
          <Text style={styles.inputHeading}>Add Payment Details</Text>
          <TextInput
            placeholder="Payment Details"
            placeholderTextColor={Theme.colors.black}
            value={paymentDesc}
            onChangeText={(text) => setPaymentDesc(text)}
            style={styles.inputStyle}
            maxLength={40}
            allowFontScaling={false}
            returnKeyType="next"
          />
          <Text style={styles.inputHeading}>Payment QR Code</Text>
          <TextInput
            placeholder="Enter Payment Link"
            placeholderTextColor={Theme.colors.black}
            value={paymentLink}
            onChangeText={(text) => setPaymentLink(text)}
            style={styles.inputStyle}
            maxLength={40}
            allowFontScaling={false}
            returnKeyType="next"
          />

{paymentLink.length >= 1 && (
            <View style={{ marginTop: 20,alignSelf:'center' }}>
            <TouchableOpacity
      style={{
        marginTop: 20,
       
      }}
      onPress={() => {
        if (paymentLink.startsWith("http") || paymentLink.startsWith("https")) {
          Linking.openURL(paymentLink);
        } else {
          Alert.alert('QR Code Not Work',"Invalid link. Please enter a valid URL start with (http or https). If you want to go with this then you can")
        }
      }}
    >
        
            <View style={{ marginTop: 20,alignSelf:'center' }}>
              <QRCode value={paymentLink} size={120} />

            </View>
            
       
        <Text style={[styles.inputHeading,{alignSelf:'center'}]}>Click on QR Code to Test</Text>

    </TouchableOpacity>

            </View>
            
          )}

        




          <SaveButton
            title={paymentId ? "Update":"Save"}
            onPress={() => {
              savePaymentInfo();
              navigation.goBack();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
