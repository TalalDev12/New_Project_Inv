import {
    View,
    Text,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Button,
    FlatList,
    Image,
    TextInput,
    Alert,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import styles from "./Styles";
  import { AppIcons, Responsive, Theme } from "../../libs";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { useAppContext } from "../../Context/AppContext";
  import NativeModal from "../../Components/Common/NativeModal";
  import { CurrencyData } from "../../Data/CurrencyData";
  import axios from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import QRCode from "react-native-qrcode-svg";
  
  import { LanguageData } from "../../Data/LanguageData";
  import { AppFonts } from "../../utils/AppConstants";
  
  export default function UpdateInvoice() {
    const { getHeight, getWidth, AppFonts } = Responsive;
    const navigation = useNavigation();
    const {
        selectedClient,
        setSelectedClient,
        selectedBusiness,
        setSelectedBusiness,
        selectedItem,
        setSelectedItem,
        selectedTaxItem,
        setSelectedTaxItem,
        resetSelection,
        CapturedSignature,
        setCapturedSignature,
        selectedLanguage,
        setSelectedLanguage,
        selectedCurrency,
        setSelectedCurrency,
        setShippingCharges,
        shippingCharges,
        setDiscountNumber,
        discountNumber,
        selectedTerms,
        setSelectedTerms,
        selectedPayments,
        setSelectedPayments,
        invoiceNumber,
        setInvoiceNumber,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        newInvoiveStatus,
        setNewInvoiveStatus,
        setAllItemsTotal,
        setGrandTotal,
      } = useAppContext();
  
    const [openCurrencyModal, setOpenCurrencyModal] = useState(false);
    const [openLanguageModal, setOpenLanguageModal] = useState(false);
    const [openShippingModal, setOpenShippingModal] = useState(false);
    const [openDiscountModal, setOpenDiscountModal] = useState(false);
  
    const [inputShippingCharges, setInputShippingCharges] = useState(null);
    const [inputDiscountNumber, setInputDiscountNumber] = useState(null);
    const [currentUserId,setCurrentUserId] = useState(null);
  
    
   
  const route = useRoute();
  const invoiceId = route.params?.invoiceId;
    
  
  
  
  
    // 1. Items Total (only items)
  const itemsTotal = selectedItem.reduce((sum, item) => {
    return sum + (parseFloat(item.totalAmount) || 0);
  }, 0);
  
  // 2. Discount (on items total)
  const discountAmount = discountNumber
    ? (itemsTotal * discountNumber) / 100
    : 0;
  
  // 3. Taxes (sum of all selected taxes)
  const taxesAmount = selectedTaxItem.reduce((sum, item) => {
    // assume item.taxRate is percentage, apply on itemsTotal - discount
    const taxRate = parseFloat(item.taxRate) || 0;
    return sum + ((itemsTotal - discountAmount) * taxRate) / 100;
  }, 0);
  
  // 4. Shipping
  const shippingAmount = shippingCharges || 0;
  
  // 5. Final Total
  const finalTotal = itemsTotal - discountAmount + taxesAmount + shippingAmount;
  
  
  
  
  
    // ---------- FETCH EXISTING INVOICE ----------
  useEffect(() => {
    const fetchInvoice = async () => {
      if (!invoiceId) return;

      try {
       
        const token = await AsyncStorage.getItem("userToken");
        const url = `https://invoice-maker-app-wsshi.ondigitalocean.app/api/invoice/${invoiceId}`;

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const invoice = response.data;

          // ✅ Set API data into Context
          setSelectedClient({
            clientName: invoice.clientName,
            email: invoice.clientEmail,
            phone: invoice.clientPhone,
          });

          setSelectedBusiness({
            businessName: invoice.businessName,
            email: invoice.businessEmail,
            phone: invoice.businessPhone,
          });

          setCurrentUserId(invoice.userId)

          setSelectedItem(invoice.items || []);
          setSelectedTaxItem(invoice.taxes || []);
          setCapturedSignature(invoice.CapturedSignature || null);
          setSelectedLanguage(invoice.invoiceLanguage || "");
          setSelectedCurrency({ currencyCode: invoice.currency });
          setShippingCharges(invoice.shipping || 0);
          setDiscountNumber(invoice.discount || 0);
          setSelectedTerms({
            termsDesc: invoice.termsConditions || "",
          });
          setSelectedPayments({
            paymentMethod: invoice.paymentMethod || "",
            paymentDesc: invoice.paymentDesc || "",
            paymentLink: invoice.paymentLink || "",
          });
          setInvoiceNumber(invoice.invoiceNumber || "");
          setStartDate(invoice.dateCreated);
          setEndDate(invoice.DueIn);
          setNewInvoiveStatus(invoice.Status);
          setAllItemsTotal(invoice.itemsTotal);
          setGrandTotal(invoice.amount);
        }
      } catch (error) {
        console.log(
          "❌ Error fetching invoice:",
          error.response?.data || error.message
        );
      }
    };

    fetchInvoice();
  }, [invoiceId]);


 // ---------- UPDATE INVOICE ----------
const updateInvoice = async () => {
    const data = {
      userId: currentUserId,
      clientName: selectedClient?.clientName,
      clientEmail: selectedClient?.email,
      clientPhone: selectedClient?.phone,
      businessName: selectedBusiness?.businessName,
      businessEmail: selectedBusiness?.email,
      businessPhone: selectedBusiness?.phone,
      CapturedSignature: CapturedSignature,
      invoiceLanguage: selectedLanguage,
  
      shipping: Number(shippingCharges) || 0,
      discount: Number(discountNumber) || 0,
      itemsTotal: Number(itemsTotal) || 0,
  
      currency: selectedCurrency?.currencyCode,
      termsConditions: selectedTerms?.termsDesc,
      paymentMethod: selectedPayments?.paymentMethod,
      paymentDesc: selectedPayments?.paymentDesc,
      paymentLink: selectedPayments?.paymentLink,
  
      invoiceNumber: String(invoiceNumber),
      dateCreated: new Date(startDate),
      amount: Number(parseFloat(finalTotal || 0).toFixed(2)),
  
      DueIn: new Date(endDate),
      Status: String(newInvoiveStatus),
  
      // ✅ Properly send items & taxes
      items:
        selectedItem?.map(item =>
          typeof item === "string" ? { _id: item } : item
        ) || [],
  
      taxes:
        selectedTaxItem?.map(tax =>
          typeof tax === "string" ? { _id: tax } : tax
        ) || [],
    };
  
    try {
      const token = await AsyncStorage.getItem("userToken");
      const baseUrl =
        "https://invoice-maker-app-wsshi.ondigitalocean.app/api/invoice";
  
      // 🟢 Console everything before making request
      console.log("📌 Invoice ID:", invoiceId);
      console.log("📌 Token:", token);
      console.log("📌 Data being sent:", JSON.stringify(data, null, 2));
  
      const response = await axios.put(`${baseUrl}/${invoiceId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if ([200, 201, 204].includes(response.status)) {
        console.log("✅ Invoice updated:", response.data);
        navigation.navigate("Home");
        resetSelection();
      }
    } catch (error) {
      console.log(
        "❌ Error updating invoice:",
        error.response?.data || error.message
      );
      Alert.alert("Error", error.response?.data?.msg || error.message);
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
            <Text style={styles.headingText}>Update Invoice</Text>

  
          </View>
  
          {/* <AppIcons.SearchIcon size={33} color={Theme.colors.white} /> */}
        </View>
        <ScrollView>
          <TouchableOpacity
            onPress={() => navigation.navigate("InvoiceIntro")}
            style={styles.dataBox}
          >
            <View>
              <Text style={styles.boxHeading}>{invoiceNumber || "INV0001"}</Text>
              <Text style={styles.boxAmount}>Created on {startDate}</Text>
              {newInvoiveStatus === "UNPAID" && (
                <Text style={styles.boxAmount}>Due on {endDate}</Text>
              )}
              {newInvoiveStatus === "PAID" && (
                <Text style={styles.boxAmount}>{newInvoiveStatus}</Text>
              )}
            </View>
            <View>
              <AppIcons.ArrowForward color={Theme.colors.black} size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOpenLanguageModal(true)}
            style={styles.dataBoxSec}
          >
            <View style={styles.doubleTextHeading}>
              <View>
                <AppIcons.World size={25} />
              </View>
              <View>
                <Text style={styles.boxHeadingSingle}>Invoice Language</Text>
  
                <Text style={styles.boxDesc}>
                  {selectedLanguage || "Select Language"}
                </Text>
              </View>
            </View>
  
            <View>
              <AppIcons.ArrowForward color={Theme.colors.black} size={20} />
            </View>
          </TouchableOpacity>
  
          {/* language modal */}
  
          <NativeModal
            visible={openLanguageModal}
            modalTitle={"Select Invoice Language"}
            children={
              <View style={{ height: getHeight(21) }}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={LanguageData}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedLanguage(item.Lang),
                          setOpenLanguageModal(false);
                      }}
                      style={styles.LanguageDataMainWrap}
                    >
                      <Text style={styles.currencyName}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  onPress={() => setOpenLanguageModal(false)}
                  style={[
                    styles.saveButtonWrapLanguage,
                    { backgroundColor: Theme.colors.Red },
                  ]}
                >
                  <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            }
          />
  
          {/* language model */}
  
          <TouchableOpacity
            onPress={() => navigation.navigate("AllBusinessList")}
            style={styles.dataBoxSec}
          >
            <View style={styles.doubleTextHeading}>
              <View>
                <AppIcons.InfoIcon size={25} />
              </View>
              <View>
                <Text style={styles.boxHeadingSingle}>Business Info</Text>
                <Text style={styles.boxDesc}>
                  {selectedBusiness
                    ? selectedBusiness.businessName
                    : "Add your business informationn"}
                </Text>
              </View>
            </View>
  
            <View>
              <AppIcons.ArrowForward color={Theme.colors.black} size={20} />
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={() => navigation.navigate("AllClientList")}
            style={styles.dataBoxSec}
          >
            <View style={styles.doubleTextHeading}>
              <View>
                <AppIcons.InfoIcon size={25} />
              </View>
              <View>
                <Text style={styles.boxHeadingSingle}>Client Info</Text>
  
                <Text style={styles.boxDesc}>
                  {selectedClient
                    ? selectedClient.clientName
                    : "Add your client informationn"}
                </Text>
              </View>
            </View>
  
            <View>
              <AppIcons.ArrowForward color={Theme.colors.black} size={20} />
            </View>
          </TouchableOpacity>
  
          <View style={styles.dataBoxSec}>
            <View style={styles.doubleTextHeading}>
              <View>
                <AppIcons.ShoppingCart size={25} />
              </View>
              <View>
                <Text style={styles.boxHeadingSingle}>{selectedItem?.length} Items </Text>
                <Text style={styles.boxDesc}>Add your invoice items</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("AllItemsList")}
                  style={[
                    styles.dataBoxSec,
                    {
                      width: getWidth(73),
                      height: getHeight(5),
                      backgroundColor: Theme.colors.lightBlueButton,
                    },
                  ]}
                >
                  <View style={styles.doubleTextHeading}>
                    <View>
                      <AppIcons.ShoppingCart
                        size={19}
                        color={Theme.colors.black}
                      />
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.boxHeadingSingle,
                          { fontSize: AppFonts.t3 },
                        ]}
                      >
                        Add Items
                      </Text>
                    </View>
                  </View>
  
                  <View>
                    <AppIcons.ArrowForward color={Theme.colors.black} size={16} />
                  </View>
                </TouchableOpacity>
  
                <FlatList
                  data={selectedItem}
                  renderItem={({ item }) => (
                    <View style={styles.singleItemWrap}>
                      <View style={styles.innerItemWrap}>
                        <Text style={styles.itemName}>{item.itemName}</Text>
                      </View>
                      <View>
                        <View style={styles.innerItemWrapPQ}>
                          <Text style={styles.itemPQ}>
                            {item.itemQuantity} {item.unit} ✕
                          </Text>
  
                          <Text style={styles.itemPQ}> {(parseFloat(item.itemPrice) || 0).toFixed(2)}</Text>
                        </View>
  
  
  
  
                       <View>
                          {item.discount >=1 &&(
                            <Text style={styles.itemTotalPrice}>
                            Discount: {item.discount}%
                          </Text>
                          ) }
                           {item.tax >=1 &&(
                           <Text style={styles.itemTotalPrice}>
                           Tax: {item.tax}% 
                         </Text>
                          ) }
  
  
  
                          <Text style={styles.itemTotalPrice}>
                            Total {selectedCurrency?.currencyCode} {item.totalAmount}
                          </Text>
                        </View> 
  
  
  
  
  
  
                      </View>
                    </View>
                  )}
                />
  
                {selectedItem.length >=1 &&(
                              
  <TouchableOpacity
                  onPress={() => setOpenDiscountModal(true)}
                  style={[
                    styles.dataBoxSec,
                    {
                      width: getWidth(73),
                      height: getHeight(5),
                      backgroundColor: Theme.colors.Yellow,
                    },
                  ]}
                >
                  <View style={styles.doubleTextHeading}>
                    <View>
                      <AppIcons.ShoppingCart
                        size={19}
                        color={Theme.colors.black}
                      />
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.boxHeadingSingle,
                          { fontSize: AppFonts.t3 },
                        ]}
                      >
                        Add Overall Discount %
                      </Text>
                    </View>
                  </View>
  
                  <View>
                    <AppIcons.ArrowForward color={Theme.colors.black} size={16} />
                  </View>
                </TouchableOpacity>
                )}
  
  
  
  
  
  
                {discountNumber ? (
                  <View
                    style={[
                      styles.singleItemWrap,
                      {
                        height: getHeight(4),
                        width: getWidth(70),
                        alignSelf: "flex-start",
                        paddingHorizontal: getWidth(2),
                      },
                    ]}
                  >
                    <View style={styles.innerItemWrap}>
                      <Text style={styles.itemName}>
                        Discount {discountNumber}%
                      </Text>
                    </View>
                    <View>
                      <View>
                        <Text style={styles.itemTotalPrice}>
                          <Text style={styles.itemName}>{selectedCurrency?.currencyCode} -{discountAmount.toFixed(2)}</Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : null}
  
  
               {selectedItem.length >=1 && (
                 <TouchableOpacity
                 onPress={() => navigation.navigate("AllTaxList")}
                 style={[
                   styles.dataBoxSec,
                   {
                     width: getWidth(73),
                     height: getHeight(5),
                     backgroundColor: Theme.colors.Yellow,
                   },
                 ]}
               >
                 <View style={styles.doubleTextHeading}>
                   <View>
                     <AppIcons.ShoppingCart
                       size={19}
                       color={Theme.colors.black}
                     />
                   </View>
                   <View>
                     <Text
                       style={[
                         styles.boxHeadingSingle,
                         { fontSize: AppFonts.t3 },
                       ]}
                     >
                       Add Overall Taxes %
                     </Text>
                   </View>
                 </View>
  
                 <View>
                   <AppIcons.ArrowForward color={Theme.colors.black} size={16} />
                 </View>
               </TouchableOpacity>
               )}
  
                {/* <FlatList
                  data={selectedTaxItem}
                  renderItem={({ item }) => (
                    <View
                      style={[
                        styles.singleItemWrap,
                        {
                          height: getHeight(4),
                          width: getWidth(70),
                          alignSelf: "flex-start",
                          paddingHorizontal: getWidth(5),
                        },
                      ]}
                    >
                      <View style={styles.innerItemWrap}>
                        <Text style={styles.itemName}>{item.taxName} {item.taxRate}%</Text>
                      </View>
                      <View>
                        <View>
                          <Text style={styles.itemTotalPrice}>
                            <Text style={styles.itemName}>{selectedCurrency} {itemsTotal-discountAmount*item.taxRate/100}</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                /> */}
  
  
  
  
  
  
  <FlatList
    data={selectedTaxItem}
    renderItem={({ item }) => {
      const taxRate = parseFloat(item.taxRate) || 0;
      const taxAmount = ((itemsTotal - discountAmount) * taxRate) / 100;
  
      return (
        <View
          style={[
            styles.singleItemWrap,
            {
              height: getHeight(4),
              width: getWidth(70),
              alignSelf: "flex-start",
              paddingHorizontal: getWidth(5),
            },
          ]}
        >
          <View style={styles.innerItemWrap}>
            <Text style={styles.itemName}>
              {item.taxName} {taxRate}%
            </Text>
          </View>
          <View>
            <Text style={styles.itemTotalPrice}>
              <Text style={styles.itemName}>
                {selectedCurrency?.currencyCode} +{taxAmount.toFixed(2)}
              </Text>
            </Text>
          </View>
        </View>
      );
    }}
  />
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
             {selectedItem.length >=1 &&(
                 <TouchableOpacity
                 onPress={() => setOpenShippingModal(true)}
                 style={[
                   styles.dataBoxSec,
                   {
                     width: getWidth(73),
                     height: getHeight(5),
                     backgroundColor: Theme.colors.Yellow,
                   },
                 ]}
               >
                 <View style={styles.doubleTextHeading}>
                   <View>
                     <AppIcons.ShoppingCart
                       size={19}
                       color={Theme.colors.black}
                     />
                   </View>
                   <View>
                     <Text
                       style={[
                         styles.boxHeadingSingle,
                         { fontSize: AppFonts.t3 },
                       ]}
                     >
                       Add Shipping
                     </Text>
                    
                   </View>
                 </View>
  
                 <View>
                   <AppIcons.ArrowForward color={Theme.colors.black} size={16} />
                 </View>
               </TouchableOpacity>
             )}
                {shippingCharges ? (
                  <View
                    style={[
                      styles.singleItemWrap,
                      {
                        height: getHeight(4),
                        width: getWidth(70),
                        alignSelf: "flex-start",
                        paddingHorizontal: getWidth(5),
                      },
                    ]}
                  >
                    <View style={styles.innerItemWrap}>
                      <Text style={styles.itemName}>Shipping</Text>
                    </View>
                    <View>
                      <View>
                        <Text style={styles.itemTotalPrice}>
                          <Text style={styles.itemName}>
                            {selectedCurrency?.currencyCode} {shippingCharges.toFixed(2)}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : null}
  
              {selectedItem.length >=1 && (
                  <View style={styles.totalEstimatedWrap}>
                  <Text style={styles.totalEstimatedText}>Total</Text>
                  <Text style={styles.totalEstimatedText}>
                    {selectedCurrency?.currencyCode} 
                    {finalTotal.toFixed(2)}
                  </Text>
                </View>
              )}
              </View>
            </View>
  
            <View>
              <AppIcons.ArrowForward color={Theme.colors.black} size={20} />
            </View>
          </View>
  
          {/* shipping modal */}
  
          <NativeModal
            visible={openShippingModal}
            modalTitle={"Shipping Charges"}
            children={
              <View style={{ height: getHeight(14) }}>
                <TextInput
                  // placeholder={shippingCharges ? String(shippingCharges) : 0}
                  placeholderTextColor={Theme.colors.black}
                  value={inputShippingCharges}
                  onChangeText={(text) => setInputShippingCharges(text)}
                  style={styles.inputStyle}
                  maxLength={40}
                  keyboardType="number-pad"
                  allowFontScaling={false}
                  returnKeyType="next"
                />
  
                <View
                  style={[styles.saveCancelButton, { marginTop: getHeight(1) }]}
                >
                  <TouchableOpacity
                    onPress={() => setOpenShippingModal(false)}
                    style={[
                      styles.saveButtonWrap,
                      { backgroundColor: Theme.colors.Red },
                    ]}
                  >
                    <Text style={styles.btnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      const numericShippingCharges =
                        parseFloat(inputShippingCharges) || 0;
                      setShippingCharges(numericShippingCharges ?? 0);
                      setOpenShippingModal(false);
                    }}
                    style={styles.saveButtonWrap}
                  >
                    <Text style={styles.btnText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
          />
  
          {/* shipping modal */}
  
          {/* discount modal */}
  
          <NativeModal
            visible={openDiscountModal}
            modalTitle={"Overall Discount"}
            children={
              <View style={{ height: getHeight(14) }}>
                <TextInput
                  // placeholder={shippingCharges ? String(shippingCharges) : 0}
                  placeholderTextColor={Theme.colors.black}
                  value={inputDiscountNumber}
                  onChangeText={(text) => setInputDiscountNumber(text)}
                  style={styles.inputStyle}
                  maxLength={40}
                  keyboardType="number-pad"
                  allowFontScaling={false}
                  returnKeyType="next"
                />
  
                <View
                  style={[styles.saveCancelButton, { marginTop: getHeight(1) }]}
                >
                  <TouchableOpacity
                    onPress={() => setOpenDiscountModal(false)}
                    style={[
                      styles.saveButtonWrap,
                      { backgroundColor: Theme.colors.Red },
                    ]}
                  >
                    <Text style={styles.btnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      const numericDiscountNumber =
                        parseFloat(inputDiscountNumber) || 0;
                      setDiscountNumber(numericDiscountNumber);
                      setOpenDiscountModal(false);
                    }}
                    style={styles.saveButtonWrap}
                  >
                    <Text style={styles.btnText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
          />
  
          {/* discounnt modal */}
  
          <TouchableOpacity
            onPress={() => setOpenCurrencyModal(true)}
            style={styles.dataBoxSec}
          >
            <View style={styles.doubleTextHeading}>
              <View>
                <AppIcons.DollarIcon size={25} />
              </View>
              <View>
                <Text style={styles.boxHeadingSingle}>Currency</Text>
                {selectedCurrency ? (
                  <Text style={styles.boxDesc}>{selectedCurrency?.country} {selectedCurrency?.currencyCode}</Text>
                ) : null}
              </View>
            </View>
  
            <View>
              <AppIcons.ArrowForward color={Theme.colors.black} size={20} />
            </View>
          </TouchableOpacity>
          <NativeModal
            visible={openCurrencyModal}
            modalTitle={"Select Currency"}
            children={
              <View style={{ height: getHeight(70) }}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={CurrencyData}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedCurrency(item);
                        setOpenCurrencyModal(false);
                      }}
                      style={styles.currencyDataMainWrap}
                    >
                      <View>
                        <Text style={styles.currencyName}>{item.country}</Text>
                      </View>
                      <View style={styles.currecySymbolsWrap}>
                        <Text style={styles.currencyNameFirst}>
                          {item.currencyCode}
                        </Text>
  
                        <Text style={styles.currencyNameLast}>
                          {item.currencyCode}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  onPress={() => setOpenCurrencyModal(false)}
                  style={[
                    styles.saveButtonWrapLanguage,
                    { backgroundColor: Theme.colors.Red },
                  ]}
                >
                  <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            }
          />
  
          <TouchableOpacity
            onPress={() => navigation.navigate("AllSignatureList")}
            style={styles.dataBoxSec}
          >
            <View style={styles.doubleTextHeading}>
              <View>
                <AppIcons.pause size={25} />
              </View>
              <View>
                <Text style={styles.boxHeadingSingle}>Signature</Text>
                <Text style={styles.boxDesc}>Add your signature</Text>
                {CapturedSignature ? (
                  <Image
                    style={{
                      height: getHeight(15),
                      width: getWidth(50),
                      resizeMode: "contain",
                      alignSelf: "center",
                    }}
                    source={{ uri: CapturedSignature }}
                  />
                ) : null}
              </View>
            </View>
  
            <View>
              <AppIcons.ArrowForward color={Theme.colors.black} size={20} />
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={() => navigation.navigate("AllTermsList")}
            style={styles.dataBoxSec}
          >
            <View style={styles.doubleTextHeading}>
              <View>
                <AppIcons.pause size={25} />
              </View>
              <View>
                <Text style={styles.boxHeadingSingle}>Terms & Conditions</Text>
  
                {selectedTerms ? (
                  <Text style={styles.boxDesc}>{selectedTerms.termsDesc}</Text>
                ) : null}
              </View>
            </View>
  
            <View>
              <AppIcons.ArrowForward color={Theme.colors.black} size={20} />
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={() => navigation.navigate("AllPaymentsList")}
            style={[styles.dataBoxSec, { marginBottom: getHeight(3) }]}
          >
            <View style={styles.doubleTextHeading}>
              <View>
                <AppIcons.pause size={25} />
              </View>
              <View>
  
  
              
  
  
  
  
                <Text style={styles.boxHeadingSingle}>Payment Method</Text>
                {selectedPayments ? (
                 <View>
                   <Text style={styles.boxDesc}>
                    {selectedPayments.paymentMethod}
                    <Text> | {selectedPayments.paymentDesc}</Text>
                  </Text>
  
                 {selectedPayments.paymentLink && (
                   <View style={{ marginTop: getHeight(0.5),marginLeft:getWidth(2.5),alignSelf:'center' }}>
                   <QRCode value={selectedPayments.paymentLink} size={50} />
     
                 </View>
                 )}
                 </View>
                  
                ) : null}
              </View>
            </View>
  
            <View>
              <AppIcons.ArrowForward color={Theme.colors.black} size={20} />
            </View>
          </TouchableOpacity>
  
          <Button
            title="Preview"
            onPress={() => {
              setAllItemsTotal(itemsTotal ?? 0);
              setGrandTotal(finalTotal ?? 0);
              navigation.navigate("PreviewScreen");
            }}
            
          />
        <Button
    title="Update"
    onPress={() => {
      
      updateInvoice();
    }}
  />
  
        </ScrollView>
      </View>
    );
  }
  