import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Button, Image, Text, TouchableOpacity, Alert, StatusBar } from "react-native";
import Signature from "react-native-signature-canvas";
import { useAppContext } from "../../Context/AppContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./Styles";
import axios from "axios";
import { AppIcons, Theme } from "../../libs";

const SignatureScreen = () => {
  const signatureRef = useRef(null);
  const [signature, setSignature] = useState(null);
  const { setCapturedSignature } = useAppContext();
  const navigation = useNavigation();
  const { getHeight, getWidth } = useState();
  const route = useRoute();
  const signatureId = route.params?.signatureId;

 
  const handleClear = () => {
    signatureRef.current.clearSignature();
    setSignature(null);
  };


  

  const handleSignature = (sig) => {
    setCapturedSignature(sig);
    setSignature(sig);
    console.log("Signature captured:", sig);
  
    // ✅ Now save to API immediately after capture
    saveSignatureInfo(sig);
  };
  
  const handleSave = () => {
    signatureRef.current.readSignature(); // triggers handleSignature
  };
  
  const saveSignatureInfo = async (sig) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      let apiUrl = "https://invoice-maker-app-wsshi.ondigitalocean.app/api/signature/";
      let method = "post";
  
      // if updating existing signature
      if (signatureId) {
        apiUrl = `${apiUrl}${signatureId}`;
        method = "put";
      }
  
      const signatureData = { signature: sig };
  
      const response = await axios({
        method,
        url: apiUrl,
        data: signatureData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        Alert.alert("Success", `Signature ${signatureId ? "updated" : "saved"} successfully!`);
        navigation.goBack();
      }
    } catch (error) {
      console.error("Save/Update Signature Error:", error.response?.data || error.message);
      Alert.alert("Error", `Failed to ${signatureId ? "update" : "save"} signature. Please try again.`);
    }
  };
  
  

  useEffect(() => {
    if (signatureId) {
      fetchSignatureInfo();
    }
  }, [signatureId]);

  //fetch and set single business info

  const fetchSignatureInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const apiUrl = `https://invoice-maker-app-wsshi.ondigitalocean.app/api/signature/${signatureId}`;

      console.log("Fetching signature:", apiUrl, "Token:", token);

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

        setSignature(data.signature || "");
      
      }
    } catch (error) {
      console.error(
        "❌ Fetch Signnature Error:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Failed to load signature information.");
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
          <Text style={styles.headingText}>{signatureId ? "Update Signature": "Add New Signature"}</Text>
        </View>

       
      </View>
      <Text style={styles.title}>{'Sign Here'}</Text>

      <View style={styles.signatureContainer}>
        <Signature
          ref={signatureRef}
          onOK={handleSignature} // Triggered when `readSignature` is called
          onEmpty={() => console.log("Empty signature")}
          descriptionText="Sign Here"
          clearText="Clear"
          confirmText="Save"
          webStyle={styles.signaturePadStyle}
        />
      </View>
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity onPress={handleClear} style={styles.button}>
          <Text style={styles.buttonTitle}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={styles.button}>
  <Text style={styles.buttonTitle}>{signatureId ? "Update":"Save"}</Text>
</TouchableOpacity>

      </View>
      {signature && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Your Signature:</Text>
          <Image
            source={{ uri: `${signature}` }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
};



export default SignatureScreen;
