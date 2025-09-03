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
import { useAppContext } from "../../Context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

  
  export default function AddNewItem() {
    const [itemName, setitemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemQuantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("")
    const [discount, setDiscount] = useState("");
    const [tax, setTax] = useState("");
    const [totalAmount,setTotalAmount] = useState("")

  
    const { getHeight, getWidth } = Responsive;
    const navigation = useNavigation();
    const route = useRoute();
    const itemId = route.params?.itemId;



    useEffect(() => {
      if (itemId) {
        fetchItemInfo();
      }
    }, [itemId]);
  
    //fetch and set single business info
    
    const fetchItemInfo = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const apiUrl = `https://invoice-maker-app-wsshi.ondigitalocean.app/api/item/${itemId}`;
    
        console.log("Fetching Item:", apiUrl, "Token:", token);
    
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



          



    
          setitemName(data.itemName || "");
          setItemPrice(data.itemPrice || "");
          setQuantity(data.itemQuantity || "");
          setUnit(data.unit || "");
          setDiscount(data.discount || "");
          setTax(data.tax || "");
          setTotalAmount(data.totalAmount || "");


         
        }
      } catch (error) {
        console.error("❌ Fetch Item Error:", error.response?.data || error.message);
        Alert.alert("Error", "Failed to load Item information.");
      }
    };
    




  
  
   

    const saveItem = async () => {
      if (!itemName || !itemPrice || !itemQuantity || !unit) {
        Alert.alert("Validation Error", "All fields are required.");
        return;
      }
    
      try {
        const token = await AsyncStorage.getItem("userToken");
    
        const itemData = {
          itemName,
          itemPrice,
          itemQuantity,
          unit,
          discount,
          tax,
          totalAmount,
        };
    
        // 👇 check if editing or saving new
        const isEdit = !!itemId; // itemId should come from props, params, or state
    
        const apiUrl = isEdit
          ? `https://invoice-maker-app-wsshi.ondigitalocean.app/api/item/${itemId}`
          : `https://invoice-maker-app-wsshi.ondigitalocean.app/api/item/`;
    
        const response = await axios({
          method: isEdit ? "put" : "post",
          url: apiUrl,
          data: itemData,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
    
        if (response.status === 200 || response.status === 201) {
          Alert.alert(
            "Success",
            isEdit
              ? "Item information updated successfully!"
              : "Item information saved successfully!"
          );
          navigation.navigate("AllItemsList");
        }
      } catch (error) {
        console.error("Save/Update Item Error:", error);
        Alert.alert(
          "Error",
          "Failed to save/update Item information. Please try again."
        );
      }
    };
    
    



   
    
    const calculateAmount = () => {
      const price = parseFloat(itemPrice) || 0;
      const qty = parseInt(itemQuantity) || 0;
      const disc = parseFloat(discount) || 0;
      const taxRate = parseFloat(tax) || 0; // use state tax correctly
    
      // Calculate the base amount
      let totalAmount = price * qty;
    
      // Apply discount
      if (disc > 0) {
        totalAmount -= (totalAmount * disc) / 100;
      }
    
      // Apply tax
      if (taxRate > 0) {
        totalAmount += (totalAmount * taxRate) / 100;
      }
    
      return totalAmount.toFixed(2);
    };
    
    useEffect(() => {
      const amount = calculateAmount();
      setTotalAmount(amount);
    }, [itemPrice,itemQuantity, discount, tax]); 


   
    
  
  
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
            <Text style={styles.headingText}>{itemId ? "Update Item":"Add New Item"}</Text>

            


          </View>
  
          <AppIcons.DoneIcon onPress={()=>{saveItem();navigation.goBack()}}
           
            
            size={27}
            color={Theme.colors.white}
          />
        </View>
        <ScrollView>
          <View style={styles.dataBox}>
          
  
            <Text style={styles.inputHeading}>Item Name*</Text>

            <TextInput
              placeholder="Enter Item Name"
              placeholderTextColor={Theme.colors.black}
              value={itemName}
              onChangeText={(text) => setitemName(text)}
              style={styles.inputStyle}
              maxLength={40}
              allowFontScaling={false}
              returnKeyType="next"
            />
  
            <Text style={[styles.inputHeading, { marginTop: getHeight(2.5) }]}>
              Item Price
            </Text>
            <TextInput
              placeholder="Price"
              placeholderTextColor={Theme.colors.black}
              value={itemPrice}
              onChangeText={(text) => setItemPrice(text)}
              style={styles.inputStyle}
              maxLength={40}
              keyboardType="email-address"
              allowFontScaling={false}
              returnKeyType="next"
            />
  
            <Text style={[styles.inputHeading, { marginTop: getHeight(2.5) }]}>
              Item Quantity
            </Text>
            <TextInput
              placeholder="Quantity"
              placeholderTextColor={Theme.colors.black}
              value={itemQuantity}
              onChangeText={(text) => setQuantity(text)}
              style={styles.inputStyle}
              maxLength={40}
              keyboardType="phone-pad"
              allowFontScaling={false}
              returnKeyType="next"
            />
  
            <Text style={[styles.inputHeading, { marginTop: getHeight(2.5) }]}>
              Measure Unit
            </Text>
            <TextInput
              placeholder="Unit"
              placeholderTextColor={Theme.colors.black}
              value={unit}
              onChangeText={(text) => setUnit(text)}
              style={styles.inputStyle}
              maxLength={40}
              allowFontScaling={false}
              returnKeyType="next"
            />
  
            <Text style={[styles.inputHeading, { marginTop: getHeight(2.5) }]}>
              Discount
            </Text>
            <TextInput
              placeholder="0%"
              placeholderTextColor={Theme.colors.black}
              value={discount}
              onChangeText={(text) => setDiscount(text)}
              style={styles.inputStyle}
              maxLength={40}
              allowFontScaling={false}
              returnKeyType="next"
            />
  
  <Text style={[styles.inputHeading, { marginTop: getHeight(2.5) }]}>
              Tax Rate
            </Text>
            <TextInput
              placeholder="0%"
              placeholderTextColor={Theme.colors.black}
              value={tax}
              onChangeText={(text) => setTax(text)}
              style={styles.inputStyle}
              maxLength={40}
              allowFontScaling={false}
              returnKeyType="next"
            />

            <View style={styles.totalAmountWrap}>
<Text style={styles.amountText}>Amount</Text>
<Text style={styles.amountText}>Rs. {calculateAmount()}</Text>
            </View>


            {/* <SaveButton
              title="Save"
              onPress={() => {
                saveBusinessInfo(); navigation.navigate("AllClientList");
              }}
            /> */}
           
          </View>
        </ScrollView>
      </View>
    );
  }
  