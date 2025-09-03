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

export default function AllClientList() {
  const { getHeight, getWidth } = Responsive;
  const [clientsList, setClientsList] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [opneDeleteModal, setOpenDeleteModal] = useState(false);


  const navigation = useNavigation();
  const { setSelectedClient } = useAppContext();

  const user_id = "rr5653399io88x908talal";

  const getClientsList = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.get(
        "https://invoice-maker-app-wsshi.ondigitalocean.app/api/client/", // Your Node.js endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        }
      );

      // Node.js API will send array directly
      const clientsArray = response.data;
      console.log("✅ Business List:", clientsArray);

      setClientsList(clientsArray);
    } catch (err) {
      console.error(
        "❌ Error fetching businesses:",
        err.response?.data || err.message
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      getClientsList();

      // Optional cleanup (if needed)
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setSelectedClientId(client._id);

    // navigation.navigate("CreateInvoice");
  };

  const deleteClient = async (clientId) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
  
      await axios.delete(
        `https://invoice-maker-app-wsshi.ondigitalocean.app/api/client/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Remove deleted item from local state
      setClientsList((prevList) =>
        prevList.filter((client) => client._id !== clientId)
      );
  
      Alert.alert("Success", "Client deleted successfully!");
    } catch (err) {
      console.error("❌ Error deleting Client:", err.response?.data || err.message);
      Alert.alert("Error", "Failed to delete Client. Try again.");
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
          <Text onPress={getClientsList} style={styles.headingText}>
            Add Client
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
          onPress={() => navigation.navigate("ClientInfo")}
          style={styles.dataBox}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <AppIcons.PlusIcon size={26} />
            </View>
            <View>
              <Text style={styles.headingTextAddClient}>New Client</Text>
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.headingTextAllClient}>Your Clients List</Text>

        <FlatList
          data={clientsList}
          inverted
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleClientSelect(item)}
              style={styles.dataBox}
            >
              <View style={{ flexDirection: "row" }}>
                <View>
                  <AppIcons.CheckCircle
                    color={
                      selectedClientId === item._id
                        ? Theme.colors.Green
                        : Theme.colors.black
                    }
                    size={24}
                  />
                </View>
                <View>
                  <Text style={styles.headingTextAddClient}>
                    {item.clientName}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <AppIcons.editIcon
                  onPress={() =>
                    navigation.navigate("ClientInfo", { clientId: item._id })
                  }

                  
                  size={25}
                  color={Theme.colors.facebookBlue}
                />
                <AppIcons.DeleteIcon onPress={()=>setOpenDeleteModal(true)} size={25} color={Theme.colors.Red} />
              </View>


              <NativeModal
          visible={opneDeleteModal}
          modalTitle={"Are You Sure to Delete this Client?"}
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
                <TouchableOpacity onPress={() => {deleteClient(item._id);setOpenDeleteModal(false)}}
                  
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
