import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./Styles";
import { AppIcons, Responsive, Theme } from "../../libs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAppContext } from "../../Context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NativeModal from "../../Components/Common/NativeModal";

export default function AllItemsList() {
  const { getHeight, getWidth } = Responsive;
  const [signaturesList, setSignaturesList] = useState([]);
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
const [deleteItemId, setDeleteItemId] = useState(null);


  const { setCapturedSignature } = useAppContext();

  const getSignatureList = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.get(
        "https://invoice-maker-app-wsshi.ondigitalocean.app/api/signature/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const signatureArray = response.data;
      console.log("✅ Item List:", signatureArray);

      setSignaturesList(signatureArray);
    } catch (err) {
      console.error(
        "❌ Error fetching items:",
        err.response?.data || err.message
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      getSignatureList();

      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  const handleItemSelect = (item) => {
    if (selectedItem && selectedItem._id === item._id) {
      // deselect if clicking the same one again
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };
  const handleSave = () => {
    if (selectedItem) {
      setCapturedSignature(selectedItem.signature);
      navigation.goBack();
    } else {
      Alert.alert("Select a signature", "Please select a signature before saving.");
    }
  };
  



  const deleteSignature = async (signatureId) => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      await axios.delete(
        `https://invoice-maker-app-wsshi.ondigitalocean.app/api/signature/${signatureId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove deleted item from local state
      setSignaturesList((prevList) =>
        prevList.filter((signature) => signature._id !== signatureId)
      );

      Alert.alert("Success", "Signature deleted successfully!");
    } catch (err) {
      console.error(
        "❌ Error deleting Signature:",
        err.response?.data || err.message
      );
      Alert.alert("Error", "Failed to delete Signature. Try again.");
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
          <Text onPress={getSignatureList} style={styles.headingText}>
            Add Signature
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
          onPress={() => navigation.navigate("SignatureScreen")}
          style={styles.dataBox}
        >
          <View>
            <AppIcons.PlusIcon size={26} />
          </View>
          <View>
            <Text style={styles.headingTextAddClient}>Add New Signature</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.headingTextAllClient}>Your Signature List</Text>

        <FlatList
          inverted
          data={signaturesList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleItemSelect(item)}
              style={styles.dataBox}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                <AppIcons.CheckCircle
  size={24}
  color={selectedItem?._id === item._id ? "green" : "gray"}
/>

                </View>
                <View style={styles.previewContainer}>
                  <Image
                    source={{ uri: `${item.signature}` }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <AppIcons.editIcon
                  onPress={() =>
                    navigation.navigate("SignatureScreen", {
                      signatureId: item._id,
                    })
                  }
                  color={Theme.colors.facebookBlue}
                  size={20}
                />
              <AppIcons.DeleteIcon
  onPress={() => {
    setDeleteItemId(item._id);
    setDeleteModalVisible(true);
  }}
  color={Theme.colors.Red}
  size={20}
/>

              </View>

            
            </TouchableOpacity>
          )}
        />
        <NativeModal
  visible={deleteModalVisible}
  modalTitle={"Are You Sure to Delete this Signature?"}
  children={
    <View style={{ height: getHeight(7) }}>
      <View
        style={[
          styles.saveCancelButton,
          { marginTop: getHeight(1) },
        ]}
      >
        <TouchableOpacity
          onPress={() => setDeleteModalVisible(false)}
          style={[
            styles.saveButtonWrap,
            { backgroundColor: Theme.colors.Red },
          ]}
        >
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (deleteItemId) {
              deleteSignature(deleteItemId);
            }
            setDeleteModalVisible(false);
          }}
          style={styles.saveButtonWrap}
        >
          <Text style={styles.btnText}>Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  }
/>

      </ScrollView>
    </View>
  );
}
