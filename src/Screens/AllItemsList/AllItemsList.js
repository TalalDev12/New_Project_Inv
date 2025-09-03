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

export default function AllItemsList() {
  const { getHeight, getWidth } = Responsive;
  const [itemsList, setItemsList] = useState([]);
  const navigation = useNavigation();
  const { setSelectedItem, setSelectedItemEdit } = useAppContext();
  const [selectedItems, setSelectedItems] = useState([]);
  const [opneDeleteModal, setOpenDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const getItemsList = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.get(
        "https://invoice-maker-app-wsshi.ondigitalocean.app/api/item/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const itemsArray = response.data;
      console.log("✅ Item List:", itemsArray);

      setItemsList(itemsArray);
    } catch (err) {
      console.error(
        "❌ Error fetching items:",
        err.response?.data || err.message
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      getItemsList();

      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  const handleItemSelect = (item) => {
    setSelectedItems((prevSelectedItems) => {
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
    setSelectedItem(selectedItems);
    navigation.goBack();
  };

  const deleteItem = async (itemId) => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      await axios.delete(
        `https://invoice-maker-app-wsshi.ondigitalocean.app/api/item/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove deleted item from local state
      setItemsList((prevList) =>
        prevList.filter((item) => item._id !== itemId)
      );

      Alert.alert("Success", "Item deleted successfully!");
    } catch (err) {
      console.error(
        "❌ Error deleting Item:",
        err.response?.data || err.message
      );
      Alert.alert("Error", "Failed to delete Item. Try again.");
    }
  };

  const confirmDelete = (itemId) => {
    setItemToDelete(itemId);
    setOpenDeleteModal(true);
  };
  
  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete);
      setItemToDelete(null);
      setOpenDeleteModal(false);
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
          <Text onPress={getItemsList} style={styles.headingText}>
            Add Item
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
          onPress={() => navigation.navigate("AddNewItem")}
          style={styles.dataBox}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <AppIcons.PlusIcon size={26} />
            </View>
            <View>
              <Text style={styles.headingTextAddClient}>New Item</Text>
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.headingTextAllClient}>Your Items List</Text>

        <FlatList
          inverted
          data={itemsList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleItemSelect(item)}
              style={styles.dataBox}
            >
              <View style={{ flexDirection: "row" }}>
                <View>
                  <AppIcons.CheckCircle
                    size={24}
                    color={
                      selectedItems.some(
                        (selectedItem) => selectedItem._id === item._id
                      )
                        ? "green"
                        : "gray"
                    }
                  />
                </View>
                <View>
                  <Text style={styles.headingTextAddClient}>
                    {item.itemName}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <AppIcons.editIcon
                  onPress={() =>
                    navigation.navigate("AddNewItem", { itemId: item._id })
                  }
                  size={25}
                  color={Theme.colors.facebookBlue}
                />
               <AppIcons.DeleteIcon
  onPress={() => confirmDelete(item._id)}
  size={25}
  color={Theme.colors.Red}
/>
              </View>

              <NativeModal
                visible={opneDeleteModal}
                modalTitle={"Are You Sure to Delete this Item?"}
                children={
                  <View style={{ height: getHeight(7) }}>
                    <View
                      style={[
                        styles.saveCancelButton,
                        { marginTop: getHeight(1) },
                      ]}
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
                      onPress={handleDeleteConfirm}
                        style={styles.saveButtonWrap}
                      >
                        <Text style={styles.btnText}>Yes</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                }
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
}
