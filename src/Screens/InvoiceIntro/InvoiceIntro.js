import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import { AppIcons, Responsive, Theme } from "../../libs";
import { useNavigation, useRoute } from "@react-navigation/native";

import DatePicker from "react-native-date-picker";
import dayjs from "dayjs";
import { useAppContext } from "../../Context/AppContext";
import NativeModal from "../../Components/Common/NativeModal";

const StatusData = [
  { id: 1, status: "UNPAID" },
  { id: 2, status: "PAID" },
];

export default function InvoiceIntro() {
  const [invoiceNum, setInvoiceNum] = useState("");
  const [invoiceTit, setInvoiceTit] = useState("INVOICE");

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openDateEndPicker, setOpenDateEndPicker] = useState(false);
  const {
    setInvoiceTitle,
    setInvoiceNumber,
    setStartDate,
    setEndDate,
    setNewInvoiveStatus,
  } = useAppContext();
  // const [invoiceStatus, setInvoiceStatus] = useState("UNPAID");
  const [invoiceStatus, setInvoiceStatus] = useState("UNPAID");
  const [openStatusModal, setOpenStatusModal] = useState(false);


  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const date1 = new Date(selectedDate);
  const date2 = new Date(selectedEndDate);

  // Calculate the difference in milliseconds
  const diffInMilliseconds = date2 - date1;

  // Convert milliseconds to days
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const diffInDays =
    date1 && date2 ? Math.round(diffInMilliseconds / millisecondsPerDay) : 0;

  const { getHeight, getWidth } = Responsive;
  const navigation = useNavigation();

  const user_id = "rr5653399io88x908talal";

  console.log("❌", new Date(selectedDate));

  const generateInvoiceNumber = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Random 4 digit
  };
  const route=useRoute();
  const upInvoiceNumber = route.params?.upInvoiceNumber;
  const upInvoiceTitle = route.params?.upInvoiceTitle;

  const upInvoiceStatus = route.params?.upInvoiceStatus;
  const upDueDate = route.params?.upDueDate;
  const upStartDate = route.params?.upStartDate;
  // 👉 Run once when component mounts
  
  useEffect(() => {
    if (upInvoiceNumber) setInvoiceNum(upInvoiceNumber);
    if (upInvoiceTitle) setInvoiceTit(upInvoiceTitle);

    if (upInvoiceStatus) setInvoiceStatus(upInvoiceStatus);
  
    if (upStartDate) {
      setStartDate(upStartDate);
      setSelectedDate(upStartDate); // 👈 update local state for UI
    }
  
    if (upDueDate) {
      setEndDate(upDueDate);
      setSelectedEndDate(upDueDate); // 👈 update local state for UI
    }
  }, [upInvoiceNumber, upInvoiceStatus, upStartDate, upDueDate]);
  

 



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
          <Text style={styles.headingText}>{upInvoiceNumber ? "Update Info":"Invoice Info"}</Text>
        </View>

        <AppIcons.DoneIcon
          onPress={() => {
            setInvoiceTitle(invoiceTit);
            setInvoiceNumber(invoiceNum);
            setStartDate(selectedDate);
            setEndDate(selectedEndDate);
            setNewInvoiveStatus(invoiceStatus);
            navigation.goBack();
          }}
          size={27}
          color={Theme.colors.white}
        />
      </View>
      <ScrollView>
        <View style={styles.dataBox}>
        <Text style={styles.inputHeading}>Invoice Title</Text>
          <TextInput
            placeholder="INVOICE"
            placeholderTextColor={Theme.colors.black}
            value={invoiceTit}
            onChangeText={(text) => setInvoiceTit(text)}
            style={styles.inputStyle}
            maxLength={14}
            allowFontScaling={false}
            returnKeyType="next"
          />
          <Text style={styles.inputHeading}>Invoice#</Text>
          <TextInput
            placeholder="INV0001"
            placeholderTextColor={Theme.colors.black}
            value={invoiceNum}
            onChangeText={(text) => setInvoiceNum(text)}
            style={styles.inputStyle}
            maxLength={40}
            allowFontScaling={false}
            returnKeyType="next"
          />

          <Text style={styles.inputHeading}>Invoice Status</Text>

          <TouchableOpacity
            onPress={() => {
              setOpenStatusModal(true);
            }}
            style={styles.datePickerBox}
          >
            <Text style={styles.dateText}>{invoiceStatus}</Text>
          </TouchableOpacity>

          {/* status modal */}

          <NativeModal
            visible={openStatusModal}
            modalTitle={"Select Invoice Language"}
            children={
              <View style={{ height: getHeight(15) }}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={StatusData}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setInvoiceStatus(item.status),
                          setOpenStatusModal(false);
                      }}
                      style={styles.LanguageDataMainWrap}
                    >
                      <Text style={styles.currencyName}>{item.status}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  onPress={() => setOpenStatusModal(false)}
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

          {/* status modal */}

          <Text style={styles.inputHeading}>Create Date</Text>

          <TouchableOpacity
            onPress={() => {
              setOpenDatePicker(true);
              setOpenDateEndPicker(false);
            }}
            style={styles.datePickerBox}
          >
            <Text style={styles.dateText}>{selectedDate}</Text>
          </TouchableOpacity>

          {invoiceStatus === "UNPAID" && (
            <View>
              <Text style={styles.inputHeading}>Due Date</Text>

              <TouchableOpacity
                onPress={() => {
                  setOpenDateEndPicker(true);
                  setOpenDatePicker(false);
                }}
                style={styles.datePickerBox}
              >
                <Text style={styles.dateText}>{selectedEndDate}</Text>
              </TouchableOpacity>

              <Text style={styles.dateTextExpire}>
                Invoice will due in {diffInDays} days
              </Text>
            </View>
          )}

          <DatePicker
            modal
            open={openDatePicker}
            date={new Date(selectedDate)}
            title="Select Create Date"
            mode="date"
            onConfirm={(date) =>{
              setSelectedDate(dayjs(date).format("YYYY-MM-DD"));
              setOpenDatePicker(false);
            }}
            onCancel={() => setOpenDatePicker(false)}
          />

          <DatePicker
            modal
            open={openDateEndPicker}
            date={new Date(selectedEndDate)}
            title="Select Due Date"
            mode="date"
            onConfirm={(date) =>{
              setSelectedEndDate(dayjs(date).format("YYYY-MM-DD"));
              setOpenDateEndPicker(false)
            }}
            onCancel={() => setOpenDateEndPicker(false)}
          />
        </View>
      </ScrollView>
    </View>
  );
}
