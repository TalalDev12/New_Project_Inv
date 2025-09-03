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

export default function AllTermsList() {
  const { getHeight, getWidth } = Responsive;
  const [termsList, setTermsList] = useState([]);
  const navigation = useNavigation();
  const { setSelectedTerms } = useAppContext();
  const [selectedTermsId, setSelectedTermsId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [termToDelete, setTermToDelete] = useState(null);

  const getTermsList = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.get(
        "https://invoice-maker-app-wsshi.ondigitalocean.app/api/term/", // Your Node.js endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        }
      );

      // Node.js API will send array directly
      const termsArray = response.data;
      console.log("✅ terms:", termsArray);

      setTermsList(termsArray);
    } catch (err) {
      console.error(
        "❌ Error fetching businesses:",
        err.response?.data || err.message
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTermsList();

      // Optional cleanup (if needed)
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  const handleTermsSelect = (terms) => {
    setSelectedTerms(terms);
    setSelectedTermsId(terms._id);
  };

  const confirmDelete = (id) => {
    setTermToDelete(id);
    setOpenDeleteModal(true);
  };

  const deleteTerm = async () => {
    if (!termToDelete) return;

    try {
      const token = await AsyncStorage.getItem("userToken");

      await axios.delete(
        `https://invoice-maker-app-wsshi.ondigitalocean.app/api/term/${termToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove deleted item from local state
      setTermsList((prevList) =>
        prevList.filter((term) => term._id !== termToDelete)
      );

      setOpenDeleteModal(false);
      setTermToDelete(null);
      Alert.alert("Success", "Terms deleted successfully!");
    } catch (err) {
      console.error(
        "❌ Error deleting terms:",
        err.response?.data || err.message
      );
      Alert.alert("Error", "Failed to delete terms. Try again.");
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
          <Text onPress={getTermsList} style={styles.headingText}>
            Terms and Conditions
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
          onPress={() => navigation.navigate("TermsInfo")}
          style={styles.dataBox}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View>
              <AppIcons.PlusIcon size={26} />
            </View>
            <View>
              <Text style={styles.headingTextAddClient}>
                New Temrs & Conditions
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.headingTextAllClient}>
          Your Terms & Conditions List
        </Text>

        <FlatList
          data={termsList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleTermsSelect(item)}
              style={styles.dataBox}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <AppIcons.CheckCircle
                    disabled={true}
                    size={24}
                    color={
                      selectedTermsId === item._id
                        ? Theme.colors.Green
                        : Theme.colors.black
                    }
                  />
                </View>
                <View>
                  <Text style={styles.headingTextAddClient}>
                    {item.termsDesc}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <AppIcons.editIcon
                  onPress={() =>
                    navigation.navigate("TermsInfo", { termId: item._id })
                  }
                  size={20}
                  color={Theme.colors.facebookBlue}
                />
                <AppIcons.DeleteIcon
                  onPress={() => confirmDelete(item._id)}
                  size={20}
                  color={Theme.colors.Red}
                />
              </View>
            </TouchableOpacity>
            
          )}
        />
        <NativeModal
          visible={openDeleteModal}
          modalTitle={"Are you sure to delete this terms?"}
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
                  onPress={deleteTerm}
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
