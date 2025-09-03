import {
    View,
    Text,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    FlatList,
  } from "react-native";
  import React, { useCallback, useEffect, useState } from "react";
  import styles from "./Styles";
  import { AppIcons, Responsive, Theme } from "../../libs";
  import { useFocusEffect, useNavigation } from "@react-navigation/native";
  import axios from "axios";
  import { useAppContext } from "../../Context/AppContext";
  import AsyncStorage from "@react-native-async-storage/async-storage";

  
  export default function AllTaxList() {
    const { getHeight, getWidth } = Responsive;
    const [taxList, setTaxList] = useState([]);
    const navigation = useNavigation();
     const { setSelectedTaxItem, setSelectedItemEdit } = useAppContext();

    const [selectedTaxItems, setSelectedTaxItems] = useState([]);

    
  
  

    const getTaxesList = async () => {
      try {
  
       
      const token = await AsyncStorage.getItem("userToken");

    
        const response = await axios.get(
          "https://invoice-maker-app-wsshi.ondigitalocean.app/api/tax/", // Your Node.js endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token for authentication
            },
          }
        );
    
        // Node.js API will send array directly
        const taxesArray = response.data;
        console.log("✅ Item List:",taxesArray);
    
        setTaxList(taxesArray);
      } catch (err) {
        console.error("❌ Error fetching taxes:", err.response?.data || err.message);
      }
    };
  
 
    useFocusEffect(
      useCallback(() => {
        getTaxesList();
    
        // Optional cleanup (if needed)
        return () => {
          console.log('Screen unfocused');
        };
      }, [])
    );
  
    const handleItemSelect = (item) => {
        setSelectedTaxItems((prevSelectedItems) => {
          if (
            prevSelectedItems.some((selectedItem) => selectedItem._id === item._id)
          ) {
            return prevSelectedItems.filter(
              (selectedItem) => selectedItem._id !== item._id
            );
          } else {
            return [...prevSelectedItems, item];
          }
        });
      };
    
      const handleSave = () => {
        setSelectedTaxItem(selectedTaxItems);
        // Alert.alert('taxes save to app storage')
        navigation.goBack();
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
            <Text  style={styles.headingText}>
              All Taxes
            </Text>
          </View>
  
          <AppIcons.DoneIcon
            onPress={handleSave}
            size={27}
            color={Theme.colors.white}
          />
        </View>
        <ScrollView>
          <TouchableOpacity
            onPress={() => navigation.navigate("TaxInfo")}
            style={styles.dataBox}
          >
            <View>
              <AppIcons.PlusIcon size={26} />
            </View>
            <View>
              <Text style={styles.headingTextAddClient}>New Tax </Text>
            </View>
          </TouchableOpacity>
  
          <Text style={styles.headingTextAllClient}>Your Taxes List</Text>
  
          <FlatList
            data={taxList}
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress={() => handleItemSelect(item)}
                style={styles.dataBox}
              >
                <View>
                <AppIcons.CheckCircle
  size={24}
  color={
    selectedTaxItems.some((selectedItem) => selectedItem._id === item._id)
      ? Theme.colors.Green
      : Theme.colors.black
  }
/>

                </View>
                <View>
                  <Text style={styles.headingTextAddClient}>
                    {item.taxName}
                  </Text>
                  <Text style={styles.descTextAddClient}>
                    {item.taxRate}%
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
    );
  }
  