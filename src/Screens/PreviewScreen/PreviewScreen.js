import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Image,
  ImageBackground,
  Linking,
} from "react-native";
import styles from "./Styles";
import { AppIcons, Responsive, Theme } from "../../libs";
import { useAppContext } from "../../Context/AppContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";
import { ColorPicker, TriangleColorPicker } from "react-native-color-picker";

import { useTranslation } from "react-i18next";
import "../../Translations/i18n";
import { images } from "../../assets";
import NativeModal from "../../Components/Common/NativeModal";

export default function PreviewScreen({ route }) {
  const { t, i18n } = useTranslation();

  const { getHeight, getWidth } = Responsive;
  const {
    selectedClient,
    selectedBusiness,
    selectedItem,
    CapturedSignature,
    selectedLanguage,
    selectedCurrency,
    shippingCharges,
    selectedTerms,
    selectedPayments,
    invoiceNumber,
    invoiceTitle,
    startDate,
    endDate,
    newInvoiveStatus,
    allItemsTotal,
    discountNumber,
    grandTotal,
    selectedTaxItem,
  } = useAppContext();
  const navigation = useNavigation();

  const { invoiceId } = route.params || {}; // Get the passed invoice ID
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    } else if (invoiceDetails?.invoiceLanguage) {
      i18n.changeLanguage(invoiceDetails?.invoiceLanguage);
    }
  }, [selectedLanguage, invoiceDetails?.invoiceLanguage]);

  const getInvoiceDetails = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      setLoading(true);

      const url = `https://invoice-maker-app-wsshi.ondigitalocean.app/api/invoice/${invoiceId}`; // your GET endpoint

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // include token for auth
        },
      });

      if (response.status === 200) {
        console.log("✅ Invoices fetched:", response.data);
        // You can set this to state for FlatList
        // setInvoices(response.data);
        // setInvoiceDetails(response.data);
        setInvoiceDetails(response.data || { items: [] });
      }
    } catch (error) {
      console.log(
        "❌ Error fetching invoices:",
        error.response?.data || error.message
      );
      // Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInvoiceDetails();
  }, [invoiceId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={"transparent"} />
      <View style={styles.header}>
        <View style={styles.headerArrowAndText}>
          <AppIcons.backArrow size={27} color={Theme.colors.white} />
          <Text style={styles.headingText}>Preview</Text>
        </View>
        <AppIcons.DoneIcon size={27} color={Theme.colors.white} />
      </View>
      <ScrollView
        style={{ alignSelf: "center", marginBottom: getHeight(1) }}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={images.yellowTemplate}
          style={styles.blueTemplate}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Template1", { invoiceId: invoiceId })
            }
            style={styles.dataBox}
          >
            {(selectedBusiness?.logo || invoiceDetails?.businessLogo) && (
              <View style={styles.logoWrapper}>
                <Image
                  style={styles.businessLogo}
                  source={{
                    uri: selectedBusiness?.logo || invoiceDetails?.businessLogo,
                  }}
                />
              </View>
            )}

            <View
              style={[
                styles.dataBoxInner,
                !(selectedBusiness?.logo || invoiceDetails?.businessLogo) && {
                  marginTop: getHeight(5),
                },
              ]}
            >
              <View style={styles.invAndMeta}>
                <View>
                  <Text style={styles.invTitle}>
                    {invoiceTitle ? invoiceTitle : invoiceDetails?.invoiceTitle}
                  </Text>
                </View>

                <View style={styles.metaWrap}>
                  <View>
                    <Text style={styles.invTitleText}>{t("invoiceTitle")}</Text>
                    <Text style={styles.invTitleText}>{t("dateCreated")}</Text>

                    {invoiceDetails?.Status === "UNPAID" && (
                      <Text style={styles.invTitleText}>{t("dueDate")}</Text>
                    )}
                    {invoiceDetails?.Status === "PAID" && (
                      <Text style={styles.invTitleText}>INVOICE STATUS</Text>
                    )}
                    {newInvoiveStatus === "PAID" && (
                      <Text style={styles.invTitleText}>INVOICE STATUS</Text>
                    )}
                  </View>
                  <View>
                    <Text style={styles.invDescText}>
                      {invoiceNumber
                        ? invoiceNumber
                        : invoiceDetails?.invoiceNumber}
                    </Text>

                    <Text style={styles.invDescText}>
                      {
                        startDate
                          ? startDate
                          : invoiceDetails?.dateCreated
                          ? new Date(invoiceDetails.dateCreated)
                              .toISOString()
                              .split("T")[0]
                          : "" // fallback if no date
                      }
                    </Text>

                    {invoiceDetails?.Status === "UNPAID" && (
                      <Text style={styles.invDescText}>
                        {endDate
                          ? new Date(endDate).toISOString().split("T")[0]
                          : invoiceDetails?.DueIn
                          ? new Date(invoiceDetails.DueIn)
                              .toISOString()
                              .split("T")[0]
                          : ""}
                      </Text>
                    )}

                    {invoiceDetails?.Status === "PAID" && (
                      <Text style={styles.invDescText}>PAID</Text>
                    )}
                    {newInvoiveStatus === "PAID" && (
                      <Text style={styles.invDescText}>PAID</Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.border} />
            <View style={styles.fromandToWrap}>
              <View>
                <Text style={styles.fromTitle}>{t("from")}</Text>
                <Text style={styles.fromDesc}>
                  {selectedBusiness
                    ? selectedBusiness.businessName
                    : invoiceDetails?.businessName}
                </Text>
                <Text style={styles.fromDesc}>
                  {selectedBusiness
                    ? selectedBusiness.email
                    : invoiceDetails?.businessEmail}
                </Text>
                <Text style={styles.fromDesc}>
                  {selectedBusiness
                    ? selectedBusiness.phone
                    : invoiceDetails?.businessPhone}
                </Text>
              </View>
              <View>
                <Text style={styles.fromTitle}>{t("billTo")}</Text>
                <Text style={styles.fromDesc}>
                  {selectedClient
                    ? selectedClient.clientName
                    : invoiceDetails?.clientName}
                </Text>
                <Text style={styles.fromDesc}>
                  {selectedClient
                    ? selectedClient.email
                    : invoiceDetails?.clientEmail}
                </Text>
                <Text style={styles.fromDesc}>
                  {selectedClient
                    ? selectedClient.phone
                    : invoiceDetails?.clientPhone}
                </Text>
              </View>
            </View>

            {/* items headings */}
            <View
              style={[styles.headingMainWrap, { backgroundColor: "#f974aa" }]}
            >
              <View style={[styles.itemHeadWrap, { width: getWidth(31) }]}>
                <Text style={styles.headText}>{t("items")}</Text>
              </View>
              <View style={[styles.itemHeadWrap, { width: getWidth(13) }]}>
                <Text style={styles.headText}>{t("quantity")}</Text>
              </View>
              <View style={[styles.itemHeadWrap, { width: getWidth(14) }]}>
                <Text style={styles.headText}>
                  {t("price")} (
                  {selectedCurrency
                    ? selectedCurrency?.currencyCode
                    : invoiceDetails?.currency}
                  )
                </Text>
              </View>
              <View style={[styles.itemHeadWrap, { width: getWidth(11) }]}>
                <Text style={styles.headText}>{t("discount")}</Text>
              </View>

              <View style={[styles.itemHeadWrap, { width: getWidth(16) }]}>
                <Text style={styles.headText}>
                  {t("total")} (
                  {selectedCurrency
                    ? selectedCurrency?.currencyCode
                    : invoiceDetails?.currency}
                  )
                </Text>
              </View>
            </View>

            <View>
              <FlatList
                data={
                  invoiceDetails?.items && invoiceDetails?.items.length > 0
                    ? invoiceDetails.items
                    : selectedItem
                }
                renderItem={({ item }) => (
                  <View style={styles.itemsMainWrap}>
                    <View
                      style={[
                        styles.itemDataCell,
                        { width: getWidth(28.5), marginLeft: getWidth(2) },
                      ]}
                    >
                      <Text style={styles.itemName}>{item.itemName}</Text>
                    </View>
                    <View style={styles.itemsWrap}>
                      <View
                        style={[
                          styles.itemDataCell,
                          { width: getWidth(12), marginLeft: getWidth(1) },
                        ]}
                      >
                        <Text style={styles.perItemStyle}>
                          {item.itemQuantity} {item.unit} ✕
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.itemDataCell,
                          { width: getWidth(13.1), marginLeft: getWidth(1) },
                        ]}
                      >
                        <Text style={styles.perItemStyle}>
                          {item.itemPrice}{" "}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.itemDataCell,
                          { width: getWidth(10), marginLeft: getWidth(1) },
                        ]}
                      >
                        {item.discount >= 1 ? (
                          <Text style={styles.perItemStyle}>
                            {item.discount}%
                          </Text>
                        ) : (
                          <Text style={styles.perItemStyle}>--</Text>
                        )}
                      </View>

                      <View
                        style={[
                          styles.itemDataCell,
                          { width: getWidth(15), marginLeft: getWidth(1) },
                        ]}
                      >
                        <Text style={styles.perItemStyle}>
                          {item.totalAmount}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>

            <View style={styles.paymentAndgrandsMainWrap}>
              {/* payments start */}

              <View style={styles.paymentAndTermsWrap}>
                {selectedTerms?.termsDesc || invoiceDetails?.termsConditions ? (
                  <View style={styles.paymentAndTermsWrap}>
                    <Text style={styles.termsTitle}>Terms and Conditions</Text>
                    <Text style={styles.termsDesc}>
                      {selectedTerms?.termsDesc ||
                        invoiceDetails?.termsConditions}
                    </Text>
                  </View>
                ) : null}

                {selectedPayments?.paymentMethod ||
                selectedPayments?.paymentDesc ||
                invoiceDetails?.paymentMethod ||
                invoiceDetails?.paymentDesc ? (
                  <View style={styles.paymentAndTermsWrap}>
                    <Text style={styles.termsTitle}>Payment Method</Text>
                    <Text style={styles.termsDesc}>
                      {selectedPayments?.paymentMethod ||
                        invoiceDetails?.paymentMethod}
                    </Text>
                    <Text style={styles.termsDesc}>
                      {selectedPayments?.paymentDesc ||
                        invoiceDetails?.paymentDesc}
                    </Text>
                  </View>
                ) : null}

                {(selectedPayments?.paymentLink ||
                  invoiceDetails?.paymentLink) && (
                  <View style={styles.qrMainWrap}>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          selectedPayments?.paymentLink ||
                            invoiceDetails?.paymentLink
                        )
                      }
                      style={{
                        marginTop: getHeight(0.5),
                        marginLeft: getWidth(2.5),
                      }}
                    >
                      <QRCode
                        value={
                          selectedPayments?.paymentLink ||
                          invoiceDetails?.paymentLink
                        }
                        size={30}
                      />
                    </TouchableOpacity>
                    <Text style={styles.termsTitle}>Scan or Click & Pay</Text>
                  </View>
                )}
              </View>

              {/* payments end */}

              {/* total start */}
              <View style={styles.grandTotalWrap}>
                <View style={styles.singleGrandRow}>
                  <Text style={styles.grandTotalText}>Total</Text>
                  <Text style={styles.grandTotalText}>
                    {selectedCurrency
                      ? selectedCurrency.currencyCode
                      : invoiceDetails?.currency}{" "}
                    {(allItemsTotal ?? invoiceDetails.itemsTotal ?? 0).toFixed(
                      2
                    )}
                  </Text>
                </View>

                {shippingCharges >= 1 || invoiceDetails?.shipping >= 1 ? (
                  <View style={styles.singleGrandRow}>
                    <Text style={styles.grandTotalText}>Shipping</Text>
                    <Text style={styles.grandTotalText}>
                      {"              "}{" "}
                      {selectedCurrency
                        ? selectedCurrency.currencyCode
                        : invoiceDetails?.currency}{" "}
                      {(
                        shippingCharges ??
                        invoiceDetails?.shipping ??
                        0
                      ).toFixed(2)}
                    </Text>
                  </View>
                ) : null}

                {discountNumber >= 1 || invoiceDetails?.discount >= 1 ? (
                  <View style={styles.singleGrandRow}>
                    <Text style={styles.grandTotalText}>Discount</Text>
                    <Text style={styles.grandTotalText}>
                      {discountNumber ?? invoiceDetails.discount ?? 0}%
                    </Text>
                  </View>
                ) : null}

                <FlatList
                  data={
                    invoiceDetails?.taxes && invoiceDetails?.taxes.length > 0
                      ? invoiceDetails.taxes
                      : selectedTaxItem
                  }
                  renderItem={({ item }) => (
                    <View style={styles.singleGrandRow}>
                      <Text style={styles.grandTotalText}>{item.taxName}</Text>
                      <Text style={styles.grandTotalText}>{item.taxRate}%</Text>
                    </View>
                  )}
                />

                <View
                  style={[
                    styles.singleGrandRow,
                    {
                      backgroundColor: "#f974aa",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.grandTotalText,
                      { color: Theme.colors.white },
                    ]}
                  >
                    Sub Total{" "}
                  </Text>
                  <Text
                    style={[
                      styles.grandTotalText,
                      { color: Theme.colors.white },
                    ]}
                  >
                    {selectedCurrency
                      ? selectedCurrency.currencyCode
                      : invoiceDetails.currency}{" "}
                    {grandTotal
                      ? grandTotal.toFixed(2)
                      : invoiceDetails.amount.toFixed(2)}
                  </Text>
                </View>
              </View>

              {/* total end */}
            </View>

            {/* here was that code */}

            {newInvoiveStatus === "PAID" && (
              <View>
                <Image style={styles.paidIcon} source={images.paidIcon} />
              </View>
            )}

            {invoiceDetails?.Status === "PAID" && (
              <View>
                <Image style={styles.paidIcon} source={images.paidIcon} />
              </View>
            )}

            <View style={styles.paymentAndSignatureWrap}>
              <View style={styles.signatureWrap}>
                <Image
                  style={styles.signatureStyle}
                  source={{
                    uri: CapturedSignature
                      ? CapturedSignature
                      : invoiceDetails?.CapturedSignature,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </ImageBackground>

        {/* template 2 */}

<ImageBackground
          source={images.newBlueTemplate}
          style={styles.blueTemplate}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Template2", { invoiceId: invoiceId })
            }
            style={styles.dataBox}
          >
            {(selectedBusiness?.logo || invoiceDetails?.businessLogo) && (
              <View style={styles.logoWrapper}>
                <Image
                  style={styles.businessLogo}
                  source={{
                    uri: selectedBusiness?.logo || invoiceDetails?.businessLogo,
                  }}
                />
              </View>
            )}

            <View
              style={[
                styles.dataBoxInner,
                !(selectedBusiness?.logo || invoiceDetails?.businessLogo) && {
                  marginTop: getHeight(5),
                },
              ]}
            >
              <View style={styles.invAndMeta}>
                <View>
                  <Text style={[styles.invTitle,{color:Theme.colors.white}]}>
                    {invoiceTitle ? invoiceTitle : invoiceDetails?.invoiceTitle}
                  </Text>
                </View>

                <View style={styles.metaWrap}>
                  <View>
                    <Text style={[styles.invTitleText,{color:Theme.colors.white}]}>{t("invoiceTitle")}</Text>
                    <Text style={[styles.invTitleText,{color:Theme.colors.white}]}>{t("dateCreated")}</Text>

                    {invoiceDetails?.Status === "UNPAID" && (
                    <Text style={[styles.invTitleText,{color:Theme.colors.white}]}>{t("dueDate")}</Text>
                    )}
                    {invoiceDetails?.Status === "PAID" && (
                       <Text style={[styles.invTitleText,{color:Theme.colors.white}]}>INVOICE STATUS</Text>
                    )}
                    {newInvoiveStatus === "PAID" && (
                    <Text style={[styles.invTitleText,{color:Theme.colors.white}]}>INVOICE STATUS</Text>
                    )}
                  </View>
                  <View>
                    <Text style={[styles.invDescText,{color:Theme.colors.white}]}>
                      {invoiceNumber
                        ? invoiceNumber
                        : invoiceDetails?.invoiceNumber}
                    </Text>

                    <Text style={[styles.invDescText,{color:Theme.colors.white}]}>
                      {
                        startDate
                          ? startDate
                          : invoiceDetails?.dateCreated
                          ? new Date(invoiceDetails.dateCreated)
                              .toISOString()
                              .split("T")[0]
                          : "" // fallback if no date
                      }
                    </Text>

                    {invoiceDetails?.Status === "UNPAID" && (
                       <Text style={[styles.invDescText,{color:Theme.colors.white}]}>
                        {endDate
                          ? new Date(endDate).toISOString().split("T")[0]
                          : invoiceDetails?.DueIn
                          ? new Date(invoiceDetails.DueIn)
                              .toISOString()
                              .split("T")[0]
                          : ""}
                      </Text>
                    )}

                    {invoiceDetails?.Status === "PAID" && (
                    <Text style={[styles.invDescText,{color:Theme.colors.white}]}>PAID</Text>
                    )}
                    {newInvoiveStatus === "PAID" && (
                       <Text style={[styles.invDescText,{color:Theme.colors.white}]}>PAID</Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.border,{borderBlockColor:Theme.colors.white}]} />
            <View style={styles.fromandToWrap}>
              <View>
                <Text style={[styles.fromTitle,{color:Theme.colors.white}]}>{t("from")}</Text>
                <Text style={[styles.fromDesc,{color:Theme.colors.white}]}>
                  {selectedBusiness
                    ? selectedBusiness.businessName
                    : invoiceDetails?.businessName}
                </Text>
                <Text style={[styles.fromDesc,{color:Theme.colors.white}]}>
                  {selectedBusiness
                    ? selectedBusiness.email
                    : invoiceDetails?.businessEmail}
                </Text>
                <Text style={[styles.fromDesc,{color:Theme.colors.white}]}>
                  {selectedBusiness
                    ? selectedBusiness.phone
                    : invoiceDetails?.businessPhone}
                </Text>
              </View>
              <View>
                <Text style={[styles.fromTitle,{color:Theme.colors.white}]}>{t("billTo")}</Text>
                <Text style={[styles.fromDesc,{color:Theme.colors.white}]}>
                  {selectedClient
                    ? selectedClient.clientName
                    : invoiceDetails?.clientName}
                </Text>
                <Text style={[styles.fromDesc,{color:Theme.colors.white}]}>
                  {selectedClient
                    ? selectedClient.email
                    : invoiceDetails?.clientEmail}
                </Text>
                <Text style={[styles.fromDesc,{color:Theme.colors.white}]}>
                  {selectedClient
                    ? selectedClient.phone
                    : invoiceDetails?.clientPhone}
                </Text>
              </View>
            </View>

            {/* items headings */}
            <View
              style={[styles.headingMainWrap, { backgroundColor: Theme.colors.white }]}
            >
              <View style={[styles.itemHeadWrap, { width: getWidth(31) }]}>
                <Text style={[styles.headText,{color:Theme.colors.black}]}>{t("items")}</Text>
              </View>
              <View style={[styles.itemHeadWrap, { width: getWidth(13) }]}>
              <Text style={[styles.headText,{color:Theme.colors.black}]}>{t("quantity")}</Text>
              </View>
              <View style={[styles.itemHeadWrap, { width: getWidth(14) }]}>
              <Text style={[styles.headText,{color:Theme.colors.black}]}>
                  {t("price")} (
                  {selectedCurrency
                    ? selectedCurrency?.currencyCode
                    : invoiceDetails?.currency}
                  )
                </Text>
              </View>
              <View style={[styles.itemHeadWrap, { width: getWidth(11) }]}>
              <Text style={[styles.headText,{color:Theme.colors.black}]}>
                  {t("discount")}</Text>
              </View>

              <View style={[styles.itemHeadWrap, { width: getWidth(16) }]}>
              <Text style={[styles.headText,{color:Theme.colors.black}]}>
                  {t("total")} (
                  {selectedCurrency
                    ? selectedCurrency?.currencyCode
                    : invoiceDetails?.currency}
                  )
                </Text>
              </View>
            </View>

            <View>
              <FlatList
                data={
                  invoiceDetails?.items && invoiceDetails?.items.length > 0
                    ? invoiceDetails.items
                    : selectedItem
                }
                renderItem={({ item }) => (
                  <View style={[styles.itemsMainWrap,{borderBottomColor:Theme.colors.white}]}>
                    <View
                      style={[
                        styles.itemDataCell,
                        { width: getWidth(28.5), marginLeft: getWidth(2) },
                      ]}
                    >
                      <Text style={[styles.itemName,{color:Theme.colors.white}]}>{item.itemName}</Text>
                    </View>
                    <View style={styles.itemsWrap}>
                      <View
                        style={[
                          styles.itemDataCell,
                          { width: getWidth(12), marginLeft: getWidth(1) },
                        ]}
                      >
                        <Text style={[styles.perItemStyle,{color:Theme.colors.white}]}>
                          {item.itemQuantity} {item.unit} ✕
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.itemDataCell,
                          { width: getWidth(13.1), marginLeft: getWidth(1) },
                        ]}
                      >
                        <Text style={[styles.perItemStyle,{color:Theme.colors.white}]}>
                          {item.itemPrice}{" "}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.itemDataCell,
                          { width: getWidth(10), marginLeft: getWidth(1) },
                        ]}
                      >
                        {item.discount >= 1 ? (
                          <Text style={[styles.perItemStyle,{color:Theme.colors.white}]}>
                            {item.discount}%
                          </Text>
                        ) : (
                          <Text style={[styles.perItemStyle,{color:Theme.colors.white}]}>--</Text>
                        )}
                      </View>

                      <View
                        style={[
                          styles.itemDataCell,
                          { width: getWidth(15), marginLeft: getWidth(1) },
                        ]}
                      >
                        <Text style={[styles.perItemStyle,{color:Theme.colors.white}]}>
                          {item.totalAmount}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>

            <View style={styles.paymentAndgrandsMainWrap}>
              {/* payments start */}

              <View style={styles.paymentAndTermsWrap}>
                {selectedTerms?.termsDesc || invoiceDetails?.termsConditions ? (
                  <View style={styles.paymentAndTermsWrap}>
                    <Text style={[styles.termsTitle,{color:Theme.colors.white}]}>Terms and Conditions</Text>
                    <Text style={[styles.termsDesc,{color:Theme.colors.white}]}>
                      {selectedTerms?.termsDesc ||
                        invoiceDetails?.termsConditions}
                    </Text>
                  </View>
                ) : null}

                {selectedPayments?.paymentMethod ||
                selectedPayments?.paymentDesc ||
                invoiceDetails?.paymentMethod ||
                invoiceDetails?.paymentDesc ? (
                  <View style={styles.paymentAndTermsWrap}>
                    <Text style={[styles.termsTitle,{color:Theme.colors.white}]}>Payment Method</Text>
                    <Text style={[styles.termsDesc,{color:Theme.colors.white}]}>
                      {selectedPayments?.paymentMethod ||
                        invoiceDetails?.paymentMethod}
                    </Text>
                    <Text style={[styles.termsDesc,{color:Theme.colors.white}]}>
                      {selectedPayments?.paymentDesc ||
                        invoiceDetails?.paymentDesc}
                    </Text>
                  </View>
                ) : null}

                {(selectedPayments?.paymentLink ||
                  invoiceDetails?.paymentLink) && (
                  <View style={styles.qrMainWrap}>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          selectedPayments?.paymentLink ||
                            invoiceDetails?.paymentLink
                        )
                      }
                      style={{
                        marginTop: getHeight(0.5),
                        marginLeft: getWidth(2.5),
                      }}
                    >
                      <QRCode
                        value={
                          selectedPayments?.paymentLink ||
                          invoiceDetails?.paymentLink
                        }
                        size={30}
                      />
                    </TouchableOpacity>
                    <Text style={[styles.termsTitle,{color:Theme.colors.white}]}>Scan or Click & Pay</Text>
                  </View>
                )}
              </View>

              {/* payments end */}

              {/* total start */}
              <View style={styles.grandTotalWrap}>
                <View style={styles.singleGrandRow}>
                  <Text style={[styles.grandTotalText,{color:Theme.colors.white}]}>Total</Text>
                  <Text style={[styles.grandTotalText,{color:Theme.colors.white}]}>
                    {selectedCurrency
                      ? selectedCurrency.currencyCode
                      : invoiceDetails?.currency}{" "}
                    {(allItemsTotal ?? invoiceDetails.itemsTotal ?? 0).toFixed(
                      2
                    )}
                  </Text>
                </View>

                {shippingCharges >= 1 || invoiceDetails?.shipping >= 1 ? (
                  <View style={styles.singleGrandRow}>
                    <Text style={[styles.grandTotalText,{color:Theme.colors.white}]}>Shipping</Text>
                    <Text style={[styles.grandTotalText,{color:Theme.colors.white}]}>
                      {"              "}{" "}
                      {selectedCurrency
                        ? selectedCurrency.currencyCode
                        : invoiceDetails?.currency}{" "}
                      {(
                        shippingCharges ??
                        invoiceDetails?.shipping ??
                        0
                      ).toFixed(2)}
                    </Text>
                  </View>
                ) : null}

                {discountNumber >= 1 || invoiceDetails?.discount >= 1 ? (
                  <View style={styles.singleGrandRow}>
                    <Text style={[styles.grandTotalText,{color:Theme.colors.white}]}>
                      Discount</Text>
                      <Text style={[styles.grandTotalText,{color:Theme.colors.white}]}>
                      {discountNumber ?? invoiceDetails.discount ?? 0}%
                    </Text>
                  </View>
                ) : null}

                <FlatList
                  data={
                    invoiceDetails?.taxes && invoiceDetails?.taxes.length > 0
                      ? invoiceDetails.taxes
                      : selectedTaxItem
                  }
                  renderItem={({ item }) => (
                    <View style={styles.singleGrandRow}>
                         <Text style={[styles.grandTotalText,{color:Theme.colors.white}]}>
                        {item.taxName}</Text>
                        <Text style={[styles.grandTotalText,{color:Theme.colors.white}]}>
                        {item.taxRate}%</Text>
                    </View>
                  )}
                />

                <View
                  style={[
                    styles.singleGrandRow,
                    {
                      backgroundColor: Theme.colors.white,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.grandTotalText,
                      { color: Theme.colors.black },
                    ]}
                  >
                    Sub Total{" "}
                  </Text>
                  <Text
                    style={[
                      styles.grandTotalText,
                      { color: Theme.colors.black },
                    ]}
                  >
                    {selectedCurrency
                      ? selectedCurrency.currencyCode
                      : invoiceDetails.currency}{" "}
                    {grandTotal
                      ? grandTotal.toFixed(2)
                      : invoiceDetails.amount.toFixed(2)}
                  </Text>
                </View>
              </View>

              {/* total end */}
            </View>

            {/* here was that code */}

            {newInvoiveStatus === "PAID" && (
              <View>
                <Image style={styles.paidIcon} source={images.paidIcon} />
              </View>
            )}

            {invoiceDetails?.Status === "PAID" && (
              <View>
                <Image style={styles.paidIcon} source={images.paidIcon} />
              </View>
            )}

            <View style={styles.paymentAndSignatureWrap}>
              <View style={[styles.signatureWrap,{borderBottomColor:Theme.colors.white}]}>
                <Image
                  style={[styles.signatureStyle,{tintColor:Theme.colors.white}]}
                  source={{
                    uri: CapturedSignature
                      ? CapturedSignature
                      : invoiceDetails?.CapturedSignature,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </ImageBackground>


        {/* template 3 */}

        <ImageBackground
          source={images.redGreyTemplate}
          style={styles.blueTemplate}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Template3", { invoiceId: invoiceId })
            }
            style={styles.dataBox}
          >
            {(selectedBusiness?.logo || invoiceDetails?.businessLogo) && (
              <View style={styles.logoWrapper}>
                <Image
                  style={styles.businessLogo}
                  source={{
                    uri: selectedBusiness?.logo || invoiceDetails?.businessLogo,
                  }}
                />
              </View>
            )}

            <View
              style={[
                styles.dataBoxInner,
                !(selectedBusiness?.logo || invoiceDetails?.businessLogo) && {
                  marginTop: getHeight(5),
                },
              ]}
            >
              <View style={styles.invAndMeta}>
                <View>
                  <Text style={styles.invTitle}>
                    {invoiceTitle ? invoiceTitle : invoiceDetails?.invoiceTitle}
                  </Text>
                </View>

                <View style={styles.metaWrap}>
                  <View>
                    <Text style={styles.invTitleText}>{t("invoiceTitle")}</Text>
                    <Text style={styles.invTitleText}>{t("dateCreated")}</Text>

                    {invoiceDetails?.Status === "UNPAID" && (
                      <Text style={styles.invTitleText}>{t("dueDate")}</Text>
                    )}
                    {invoiceDetails?.Status === "PAID" && (
                      <Text style={styles.invTitleText}>INVOICE STATUS</Text>
                    )}
                    {newInvoiveStatus === "PAID" && (
                      <Text style={styles.invTitleText}>INVOICE STATUS</Text>
                    )}
                  </View>
                  <View>
                    <Text style={styles.invDescText}>
                      {invoiceNumber
                        ? invoiceNumber
                        : invoiceDetails?.invoiceNumber}
                    </Text>

                    <Text style={styles.invDescText}>
                      {
                        startDate
                          ? startDate
                          : invoiceDetails?.dateCreated
                          ? new Date(invoiceDetails.dateCreated)
                              .toISOString()
                              .split("T")[0]
                          : "" // fallback if no date
                      }
                    </Text>

                    {invoiceDetails?.Status === "UNPAID" && (
                      <Text style={styles.invDescText}>
                        {endDate
                          ? new Date(endDate).toISOString().split("T")[0]
                          : invoiceDetails?.DueIn
                          ? new Date(invoiceDetails.DueIn)
                              .toISOString()
                              .split("T")[0]
                          : ""}
                      </Text>
                    )}

                    {invoiceDetails?.Status === "PAID" && (
                      <Text style={styles.invDescText}>PAID</Text>
                    )}
                    {newInvoiveStatus === "PAID" && (
                      <Text style={styles.invDescText}>PAID</Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.border} />
            <View style={styles.fromandToWrap}>
              <View>
                <Text style={styles.fromTitle}>{t("from")}</Text>
                <Text style={styles.fromDesc}>
                  {selectedBusiness
                    ? selectedBusiness.businessName
                    : invoiceDetails?.businessName}
                </Text>
                <Text style={styles.fromDesc}>
                  {selectedBusiness
                    ? selectedBusiness.email
                    : invoiceDetails?.businessEmail}
                </Text>
                <Text style={styles.fromDesc}>
                  {selectedBusiness
                    ? selectedBusiness.phone
                    : invoiceDetails?.businessPhone}
                </Text>
              </View>
              <View>
                <Text style={styles.fromTitle}>{t("billTo")}</Text>
                <Text style={styles.fromDesc}>
                  {selectedClient
                    ? selectedClient.clientName
                    : invoiceDetails?.clientName}
                </Text>
                <Text style={styles.fromDesc}>
                  {selectedClient
                    ? selectedClient.email
                    : invoiceDetails?.clientEmail}
                </Text>
                <Text style={styles.fromDesc}>
                  {selectedClient
                    ? selectedClient.phone
                    : invoiceDetails?.clientPhone}
                </Text>
              </View>
            </View>

            {/* items headings */}
            <View
              style={[styles.headingMainWrap, { backgroundColor: "#b02728" }]}
            >
              <View style={[styles.itemHeadWrap, { width: getWidth(31) }]}>
                <Text style={styles.headText}>{t("items")}</Text>
              </View>
              <View style={[styles.itemHeadWrap, { width: getWidth(13) }]}>
                <Text style={styles.headText}>{t("quantity")}</Text>
              </View>
              <View style={[styles.itemHeadWrap, { width: getWidth(14) }]}>
                <Text style={styles.headText}>
                  {t("price")} (
                  {selectedCurrency
                    ? selectedCurrency?.currencyCode
                    : invoiceDetails?.currency}
                  )
                </Text>
              </View>
              <View style={[styles.itemHeadWrap, { width: getWidth(11) }]}>
                <Text style={styles.headText}>{t("discount")}</Text>
              </View>

              <View style={[styles.itemHeadWrap, { width: getWidth(16) }]}>
                <Text style={styles.headText}>
                  {t("total")} (
                  {selectedCurrency
                    ? selectedCurrency?.currencyCode
                    : invoiceDetails?.currency}
                  )
                </Text>
              </View>
            </View>

            <View>
              <FlatList
                data={
                  invoiceDetails?.items && invoiceDetails?.items.length > 0
                    ? invoiceDetails.items
                    : selectedItem
                }
                renderItem={({ item }) => (
                  <View style={styles.itemsMainWrap}>
                    <View
                      style={[
                        styles.itemDataCell,
                        { width: getWidth(28.5), marginLeft: getWidth(2) },
                      ]}
                    >
                      <Text style={styles.itemName}>{item.itemName}</Text>
                    </View>
                    <View style={styles.itemsWrap}>
                      <View
                        style={[
                          styles.itemDataCell,
                          { width: getWidth(12), marginLeft: getWidth(1) },
                        ]}
                      >
                        <Text style={styles.perItemStyle}>
                          {item.itemQuantity} {item.unit} ✕
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.itemDataCell,
                          { width: getWidth(13.1), marginLeft: getWidth(1) },
                        ]}
                      >
                        <Text style={styles.perItemStyle}>
                          {item.itemPrice}{" "}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.itemDataCell,
                          { width: getWidth(10), marginLeft: getWidth(1) },
                        ]}
                      >
                        {item.discount >= 1 ? (
                          <Text style={styles.perItemStyle}>
                            {item.discount}%
                          </Text>
                        ) : (
                          <Text style={styles.perItemStyle}>--</Text>
                        )}
                      </View>

                      <View
                        style={[
                          styles.itemDataCell,
                          { width: getWidth(15), marginLeft: getWidth(1) },
                        ]}
                      >
                        <Text style={styles.perItemStyle}>
                          {item.totalAmount}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>

            <View style={styles.paymentAndgrandsMainWrap}>
              {/* payments start */}

              <View style={styles.paymentAndTermsWrap}>
                {selectedTerms?.termsDesc || invoiceDetails?.termsConditions ? (
                  <View style={styles.paymentAndTermsWrap}>
                    <Text style={styles.termsTitle}>Terms and Conditions</Text>
                    <Text style={styles.termsDesc}>
                      {selectedTerms?.termsDesc ||
                        invoiceDetails?.termsConditions}
                    </Text>
                  </View>
                ) : null}

                {selectedPayments?.paymentMethod ||
                selectedPayments?.paymentDesc ||
                invoiceDetails?.paymentMethod ||
                invoiceDetails?.paymentDesc ? (
                  <View style={styles.paymentAndTermsWrap}>
                    <Text style={styles.termsTitle}>Payment Method</Text>
                    <Text style={styles.termsDesc}>
                      {selectedPayments?.paymentMethod ||
                        invoiceDetails?.paymentMethod}
                    </Text>
                    <Text style={styles.termsDesc}>
                      {selectedPayments?.paymentDesc ||
                        invoiceDetails?.paymentDesc}
                    </Text>
                  </View>
                ) : null}

                {(selectedPayments?.paymentLink ||
                  invoiceDetails?.paymentLink) && (
                  <View style={styles.qrMainWrap}>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          selectedPayments?.paymentLink ||
                            invoiceDetails?.paymentLink
                        )
                      }
                      style={{
                        marginTop: getHeight(0.5),
                        marginLeft: getWidth(2.5),
                      }}
                    >
                      <QRCode
                        value={
                          selectedPayments?.paymentLink ||
                          invoiceDetails?.paymentLink
                        }
                        size={30}
                      />
                    </TouchableOpacity>
                    <Text style={styles.termsTitle}>Scan or Click & Pay</Text>
                  </View>
                )}
              </View>

              {/* payments end */}

              {/* total start */}
              <View style={styles.grandTotalWrap}>
                <View style={styles.singleGrandRow}>
                  <Text style={styles.grandTotalText}>Total</Text>
                  <Text style={styles.grandTotalText}>
                    {selectedCurrency
                      ? selectedCurrency.currencyCode
                      : invoiceDetails?.currency}{" "}
                    {(allItemsTotal ?? invoiceDetails.itemsTotal ?? 0).toFixed(
                      2
                    )}
                  </Text>
                </View>

                {shippingCharges >= 1 || invoiceDetails?.shipping >= 1 ? (
                  <View style={styles.singleGrandRow}>
                    <Text style={styles.grandTotalText}>Shipping</Text>
                    <Text style={styles.grandTotalText}>
                      {"              "}{" "}
                      {selectedCurrency
                        ? selectedCurrency.currencyCode
                        : invoiceDetails?.currency}{" "}
                      {(
                        shippingCharges ??
                        invoiceDetails?.shipping ??
                        0
                      ).toFixed(2)}
                    </Text>
                  </View>
                ) : null}

                {discountNumber >= 1 || invoiceDetails?.discount >= 1 ? (
                  <View style={styles.singleGrandRow}>
                    <Text style={styles.grandTotalText}>Discount</Text>
                    <Text style={styles.grandTotalText}>
                      {discountNumber ?? invoiceDetails.discount ?? 0}%
                    </Text>
                  </View>
                ) : null}

                <FlatList
                  data={
                    invoiceDetails?.taxes && invoiceDetails?.taxes.length > 0
                      ? invoiceDetails.taxes
                      : selectedTaxItem
                  }
                  renderItem={({ item }) => (
                    <View style={styles.singleGrandRow}>
                      <Text style={styles.grandTotalText}>{item.taxName}</Text>
                      <Text style={styles.grandTotalText}>{item.taxRate}%</Text>
                    </View>
                  )}
                />

                <View
                  style={[
                    styles.singleGrandRow,
                    {
                      backgroundColor: "#b02728",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.grandTotalText,
                      { color: Theme.colors.white },
                    ]}
                  >
                    Sub Total{" "}
                  </Text>
                  <Text
                    style={[
                      styles.grandTotalText,
                      { color: Theme.colors.white },
                    ]}
                  >
                    {selectedCurrency
                      ? selectedCurrency.currencyCode
                      : invoiceDetails.currency}{" "}
                    {grandTotal
                      ? grandTotal.toFixed(2)
                      : invoiceDetails.amount.toFixed(2)}
                  </Text>
                </View>
              </View>

              {/* total end */}
            </View>

            {/* here was that code */}

            {newInvoiveStatus === "PAID" && (
              <View>
                <Image style={styles.paidIcon} source={images.paidIcon} />
              </View>
            )}

            {invoiceDetails?.Status === "PAID" && (
              <View>
                <Image style={styles.paidIcon} source={images.paidIcon} />
              </View>
            )}

            <View style={styles.paymentAndSignatureWrap}>
              <View style={styles.signatureWrap}>
                <Image
                  style={styles.signatureStyle}
                  source={{
                    uri: CapturedSignature
                      ? CapturedSignature
                      : invoiceDetails?.CapturedSignature,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </ImageBackground>





      </ScrollView>
    </View>
  );
}
