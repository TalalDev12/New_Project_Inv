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

  
  export default function TermsInfo() {
    const [termsDesc, setTermsDesc] = useState("");
  
  
    const { getHeight, getWidth } = Responsive;
    const navigation = useNavigation();
    const route = useRoute();
    const termId = route.params?.termId;
  
  
  

    const saveTermsInfo = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
    
        let apiUrl = "https://invoice-maker-app-wsshi.ondigitalocean.app/api/term/";
        let method = "post";
    
        // if updating existing term
        if (termId) {
          apiUrl = `${apiUrl}${termId}`;
          method = "put";
        }
    
        const clientData = {
          termsDesc,
        };
    
        const response = await axios({
          method,
          url: apiUrl,
          data: clientData,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
    
        if (response.status === 200 || response.status === 201) {
          Alert.alert(
            "Success",
            `Terms information ${termId ? "updated" : "saved"} successfully!`
          );
          navigation.navigate("AllTermsList");
        }
      } catch (error) {
        console.error("Save/Update Terms Info Error:", error.response?.data || error.message);
        Alert.alert(
          "Error",
          `Failed to ${termId ? "update" : "save"} terms information. Please try again.`
        );
      }
    };
    

    useEffect(() => {
      if (termId) {
        fetchTermInfo();
      }
    }, [termId]);
  
    //fetch and set single business info
  
    const fetchTermInfo = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const apiUrl = `https://invoice-maker-app-wsshi.ondigitalocean.app/api/term/${termId}`;
  
        console.log("Fetching term:", apiUrl, "Token:", token);
  
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
  
          setTermsDesc(data.termsDesc || "");
        
        }
      } catch (error) {
        console.error(
          "❌ Fetch Term Error:",
          error.response?.data || error.message
        );
        Alert.alert("Error", "Failed to load term information.");
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
            <Text style={styles.headingText}>{termId ? "Update Terms": "New Terms & Conditions"}</Text>

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
          
  
            <Text style={styles.inputHeading}>Add Terms Description</Text>
            <TextInput
              placeholder="Terms & Conditions"
              placeholderTextColor={Theme.colors.black}
              value={termsDesc}
              onChangeText={(text) => setTermsDesc(text)}
              style={styles.inputStyle}
              maxLength={40}
              allowFontScaling={false}
              returnKeyType="next"
            />
  
           
  
  
  
  
            <SaveButton
              title={termId ? "Update": "Save"}
              onPress={() => {
                saveTermsInfo(); navigation.goBack();
              }}
            />
           
          </View>
        </ScrollView>
      </View>
    );
  }
  