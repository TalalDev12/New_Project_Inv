import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import axios from "axios";

const DetailScreen = ({ route }) => {
  const { invoiceId } = route.params; // Get the passed invoice ID
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // const getInvoiceDetails = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://easyinvoicemaker-8ae9b-default-rtdb.firebaseio.com/users/rr5653399io88x908talal/invoice_info/${invoiceId}.json`
  //     );
  //     setInvoiceDetails(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    getInvoiceDetails();
  }, [invoiceId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Calculate total amount of items
  const totalAmount = invoiceDetails?.Items?.reduce(
    (sum, item) => sum + parseFloat(item.amount || 0),
    0
  );

  return (
    <View style={{ padding: "10%" }}>
      {invoiceDetails ? (
        <>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Invoice Details
          </Text>
          <Text>Client Name: {invoiceDetails.clientName}</Text>
          <Text>Client Email: {invoiceDetails.clientEmail}</Text>
          <Text>Client Phone: {invoiceDetails.clientPhone}</Text>


          <Text>Business Name: {invoiceDetails.businessName}</Text>
          <Text>Buisness Email: {invoiceDetails.businessEmail}</Text>
          <Text>Business Phone: {invoiceDetails.businessPhone}</Text>


          <Text>Amount: {invoiceDetails.amount}</Text>
          <Text>Due In: {invoiceDetails.DueIn}</Text>
          <Text>Status: {invoiceDetails.Status}</Text>

          {/* Display Items array */}
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>Items:</Text>
          {invoiceDetails.Items && invoiceDetails.Items.length > 0 ? (
            <FlatList
              data={invoiceDetails.Items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={{ marginVertical: 5 }}>
                  <Text>
                    - {item.itemName}: Rs. {item.amount}
                  </Text>
                </View>
              )}
            />
          ) : (
            <Text>No items available</Text>
          )}

          {/* Display total amount */}
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>
            Total Amount: Rs. {totalAmount.toFixed(2)}
          </Text>
        </>
      ) : (
        <Text>No details available</Text>
      )}
    </View>
  );
};

export default DetailScreen;
