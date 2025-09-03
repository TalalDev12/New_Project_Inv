import {
    View,
    Text,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import styles from "./Styles";
  import { AppIcons, Responsive, Theme } from "../../libs";
  import { useNavigation } from "@react-navigation/native";
  import SaveButton from "../../Components/Common/SaveButton";
  import axios from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
 
  
  export default function TaxInfo() {
    const [taxName, setTaxName] = useState("");
    const [taxRate, setTaxRate] = useState("");

  
  
    const { getHeight, getWidth } = Responsive;
    const navigation = useNavigation();
  
  
  


    const saveTaxInfo = async () => {
      // if (!businessName || !address || !email || !phone || !website) {
      //   Alert.alert(
      //     "Validation Error",
      //     "All fields are required."
      //   );
      //   return;
      // }
    
      try {
     
        const token = await AsyncStorage.getItem("userToken");
        const apiUrl = "https://invoice-maker-app-wsshi.ondigitalocean.app/api/tax/"; 
  
    
        const taxData = {
          taxName,
        taxRate
         
        };
    

    
        const response = await axios.post(apiUrl,taxData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
    
        if (response.status === 201) {
          Alert.alert("Success", "Tax information saved successfully!");
          navigation.navigate("AllTaxList");
        }
      } catch (error) {
        console.error("Save Tax Info Error:", error);
        Alert.alert(
          "Error",
          "Failed to save tax information. Please try again."
        );
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
            <Text style={styles.headingText}>Add New Tax</Text>
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
          
  
            <Text style={styles.inputHeading}>Add Tax Name</Text>
            <TextInput
              placeholder="Tax Name"
              placeholderTextColor={Theme.colors.black}
              value={taxName}
              onChangeText={(text) => setTaxName(text)}
              style={styles.inputStyle}
              maxLength={40}
              allowFontScaling={false}
              returnKeyType="next"
            />
              <Text style={styles.inputHeading}>Add Tax Rate</Text>
            <TextInput
              placeholder="Tax Rate"
              placeholderTextColor={Theme.colors.black}
              value={taxRate}
              onChangeText={(text) => setTaxRate(text)}
              style={styles.inputStyle}
              maxLength={40}
              allowFontScaling={false}
              returnKeyType="next"
              keyboardType='numeric'

            />
  
           
  
  
  
  
            <SaveButton
              title="Save"
              onPress={() => {
                saveTaxInfo(); navigation.goBack();
              }}
            />
           
          </View>
        </ScrollView>
      </View>
    );
  }
  