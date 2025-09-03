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
import QRCode from "react-native-qrcode-svg";
import NativeModal from "../../Components/Common/NativeModal";


  
  export default function AllPaymentsList() {
    const { getHeight, getWidth } = Responsive;
    const [paymentsList, setPaymentsList] = useState([]);
    const navigation = useNavigation();
    const {setSelectedPayments}= useAppContext();
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);

    
    const user_id = "rr5653399io88x908talal";
  
  

    const getPaymentsList = async () => {
      try {
  
       
      const token = await AsyncStorage.getItem("userToken");

    
        const response = await axios.get(
          "https://invoice-maker-app-wsshi.ondigitalocean.app/api/payment/", // Your Node.js endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token for authentication
            },
          }
        );
    
        // Node.js API will send array directly
        const paymentsArray = response.data;
        console.log("✅ Item List:",paymentsArray);
    
        setPaymentsList(paymentsArray);
      } catch (err) {
        console.error("❌ Error fetching payment method:", err.response?.data || err.message);
      }
    };
  
 
    useFocusEffect(
      useCallback(() => {
        getPaymentsList();
    
        // Optional cleanup (if needed)
        return () => {
          console.log('Screen unfocused');
        };
      }, [])
    );
  
    // const handlePaymentsSelect = (payments) => {
    //   setSelectedPayments(payments);
    //   navigation.navigate("CreateInvoice")
    // };

    const handlePaymentsSelect = (payments) => {
      setSelectedPayments(payments);
      setSelectedPaymentId(payments._id)
    };


    const confirmDelete = (id) => {
      setPaymentToDelete(id);
      setOpenDeleteModal(true);
    };


    const deletePayment = async () => {
      if (!paymentToDelete) return;
    
      try {
        const token = await AsyncStorage.getItem("userToken");
    
        await axios.delete(
          `https://invoice-maker-app-wsshi.ondigitalocean.app/api/payment/${paymentToDelete}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        // Remove deleted item from local state
        setPaymentsList((prevList) =>
          prevList.filter((payment) => payment._id !== paymentToDelete)
        );
    
        setOpenDeleteModal(false);
        setPaymentToDelete(null);
        Alert.alert("Success", "Payment Method deleted successfully!");
      } catch (err) {
        console.error("❌ Error deleting payment:", err.response?.data || err.message);
        Alert.alert("Error", "Failed to delete payment method. Try again.");
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
            <Text onPress={getPaymentsList} style={styles.headingText}>
              Payment Method
            </Text>
          </View>
  
          <AppIcons.DoneIcon
            onPress={() =>
              navigation.goBack()
            }
            size={27}
            color={Theme.colors.white}
          />
        </View>
        <ScrollView>
          <TouchableOpacity
            onPress={() => navigation.navigate("PaymentInfo")}
            style={styles.dataBox}
          >
           <View style={{flexDirection:'row',alignItems:'center'}}>
           <View>
              <AppIcons.PlusIcon size={26} />
            </View>
            <View>
              <Text style={[styles.headingTextAddClient,{ width:getWidth(90)}]}>New Payment Method</Text>
            </View>
           </View>
          </TouchableOpacity>
  
          <Text style={styles.headingTextAllClient}>Your Payment Methods List</Text>
  
          <FlatList
            data={paymentsList}
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress={() => handlePaymentsSelect(item)}
                style={styles.dataBox}
              >
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <View>
                  <AppIcons.CheckCircle disabled={true} size={24}  color={selectedPaymentId === item._id ? Theme.colors.Green:Theme.colors.black}  />
                </View>
                <View>
                  <Text style={styles.headingTextAddClient}>
                    {item.paymentMethod}
                  </Text>
                  <Text style={styles.descTextAddClient}>
                    {item.paymentDesc}
                  </Text>
                 
                </View>

                

               {item.paymentLink && (
                 <View style={{ marginTop: getHeight(0.5),marginLeft:getWidth(2.5) }}>
                 <QRCode value={item.paymentLink} size={50} />
   
               </View>
               )}
              </View>

              <View style={{flexDirection:'row'}}>
                <AppIcons.editIcon onPress={()=>navigation.navigate('PaymentInfo',{paymentId:item._id})} size={25} color={Theme.colors.facebookBlue}/>
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
  modalTitle={"Are you sure to delete this Payment Method?"}
  children={
    <View style={{ height: getHeight(7) }}>
      <View style={[styles.saveCancelButton, { marginTop: getHeight(1) }]}>
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
          onPress={deletePayment}
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
  