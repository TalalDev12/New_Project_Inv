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
import NativeModal from "../../Components/Common/NativeModal";

export default function AllBusinessList() {
  const { getHeight, getWidth } = Responsive;
  const [businessList, setBusinessList] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [businessToDelete, setBusinessToDelete] = useState(null);

  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const navigation = useNavigation();
  const { setSelectedBusiness } = useAppContext();

  const getBusinessList = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.get(
        "https://invoice-maker-app-wsshi.ondigitalocean.app/api/business/", // Your Node.js endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        }
      );

      // Node.js API will send array directly
      const businessArray = response.data;
      console.log("✅ Business List:", businessArray);

      setBusinessList(businessArray);
    } catch (err) {
      console.error(
        "❌ Error fetching businesses:",
        err.response?.data || err.message
      );
    }
  };

  console.log("business lenght", businessList.length);

  useFocusEffect(
    useCallback(() => {
      getBusinessList();

      // Optional cleanup (if needed)
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  const handleBusinessSelect = (business) => {
    setSelectedBusinessId(business._id);
    setSelectedBusiness(business);

    // navigation.navigate("CreateInvoice");
  };

  const confirmDelete = (id) => {
    setBusinessToDelete(id);
    setOpenDeleteModal(true);
  };

  const deleteBusiness = async () => {
    if (!businessToDelete) return;

    try {
      const token = await AsyncStorage.getItem("userToken");

      await axios.delete(
        `https://invoice-maker-app-wsshi.ondigitalocean.app/api/business/${businessToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBusinessList((prevList) =>
        prevList.filter((business) => business._id !== businessToDelete)
      );

      setOpenDeleteModal(false);
      setBusinessToDelete(null);

      Alert.alert("Success", "Business deleted successfully!");
    } catch (err) {
      console.error(
        "❌ Error deleting business:",
        err.response?.data || err.message
      );
      Alert.alert("Error", "Failed to delete business. Try again.");
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
          <Text onPress={getBusinessList} style={styles.headingText}>
            Your Business
          </Text>
        </View>

        <AppIcons.DoneIcon
          onPress={() => navigation.goBack()}
          size={27}
          color={Theme.colors.white}
        />
      </View>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("BusinessInfo")}
          style={styles.dataBox}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <AppIcons.PlusIcon size={26} />
            </View>
            <View>
              <Text style={styles.headingTextAddClient}>New Business</Text>
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.headingTextAllClient}>Your Businesses List</Text>

        <View>
          <FlatList
            data={businessList}
            inverted
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleBusinessSelect(item)}
                style={styles.dataBox}
              >
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <AppIcons.CheckCircle
                      color={
                        selectedBusinessId === item._id
                          ? Theme.colors.Green
                          : Theme.colors.black
                      }
                      size={24}
                    />
                  </View>
                  <View>
                    <Text style={styles.headingTextAddClient}>
                      {item.businessName}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <AppIcons.editIcon
                    onPress={() =>
                      navigation.navigate("BusinessInfo", {
                        businessId: item._id,
                      })
                    }
                    size={20}
                    color={Theme.colors.facebookBlue}
                  />
                  <AppIcons.DeleteIcon
                    onPress={() => confirmDelete(item._id)}
                    size={25}
                    color={Theme.colors.Red}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
          <NativeModal
            visible={openDeleteModal}
            modalTitle={"Are You Sure to Delete this Business?"}
            children={
              <View style={{ height: getHeight(7) }}>
                <View
                  style={[styles.saveCancelButton, { marginTop: getHeight(1) }]}
                >
                  <TouchableOpacity
                    onPress={() => setOpenDeleteModal(false)}
                    style={[
                      styles.saveButtonWrap,
                      { backgroundColor: Theme.colors.Red },
                    ]}
                  >
                    <Text style={styles.btnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={deleteBusiness}
                    style={styles.saveButtonWrap}
                  >
                    <Text style={styles.btnText}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}
