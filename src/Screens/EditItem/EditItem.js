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

export default function EditItem({ route }) {
  const [itemDetails, setItemDetails] = useState("");
  const [itemName, setitemName] = useState("");
  const [itemprice, setItemPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [discount, setDiscount] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const { itemId } = route.params; // Get the passed invoice ID

  const { getHeight, getWidth } = Responsive;
  const navigation = useNavigation();
  const { selectedItemEdit } = useAppContext();

  const user_id = "rr5653399io88x908talal";

  const getItem = async () => {
    try {
      const response = await axios.get(
        `https://easyinvoicemaker-8ae9b-default-rtdb.firebaseio.com/users/rr5653399io88x908talal/item_info/${itemId}.json`
      );
      setItemDetails(response.data);

      setitemName(response.data?.itemName || "");
      setItemPrice(response.data?.itemprice || "");
      setQuantity(response.data?.quantity || "");
      setUnit(response.data?.unit || "");
      setDiscount(response.data?.discount || "");
      setTaxRate(response.data?.taxRate || "");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  const saveItem = async () => {
    const data = {
      itemName,
      itemprice,
      quantity,
      unit,
      discount,
      taxRate,
      totalAmount,
    };

    try {
      const url = `https://easyinvoicemaker-8ae9b-default-rtdb.firebaseio.com/users/${user_id}/item_info/${itemId}.json`;

      const response = axios.put(url, data);
      if ((await response.status) === 200) {
        console.log("added");
        Alert.alert("updated");
      }
    } catch (error) {
      console.log("❌", error);

      Alert.alert("error", error);
    }
  };

  const calculateAmount = () => {
    const price = parseFloat(itemprice) || 0;
    const qty = parseInt(quantity) || 0;
    const disc = parseFloat(discount) || 0;
    const tax = parseFloat(taxRate) || 0;

    // Calculate the base amount
    let totalAmount = price * qty;

    // Apply discount
    if (disc > 0) {
      totalAmount -= (totalAmount * disc) / 100;
    }

    // Apply tax
    if (tax > 0) {
      totalAmount += (totalAmount * tax) / 100;
    }

    return totalAmount.toFixed(2); // Return with two decimal points
  };

  useEffect(() => {
    const amount = calculateAmount();
    setTotalAmount(amount);
  }, [itemprice, quantity, discount, taxRate]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={"transparent"} />
      <View style={styles.header}>
        <View style={styles.headerArrowAndText}>
          <AppIcons.backArrow
            onPress={() => navigation.navigate("AllClientList")}
            size={27}
            color={Theme.colors.white}
          />
          <Text style={styles.headingText}>Edit Item</Text>
        </View>

        <AppIcons.DoneIcon
          onPress={() => {
            saveItem();
            navigation.navigate("AllItemsList");
          }}
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
            value={itemprice}
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
            value={quantity}
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
            value={taxRate}
            onChangeText={(text) => setTaxRate(text)}
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
