import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./Styles";
import { AppIcons, Responsive, Theme } from "../../libs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import NativeModal from "../../Components/Common/NativeModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import DatePicker from "react-native-date-picker";
import dayjs from "dayjs";

// import notifee from '@notifee/react-native';
const StatusData = [
  { id: 1, status: "UNPAID" },
  { id: 2, status: "PAID" },
];

export default function Home() {
  // const user_id = "rr5653399io88x908talal";
  const { getHeight, getWidth } = Responsive;
  const [invoices, setInvoices] = useState([]);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [Status, setStatus] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openDateEndPicker, setOpenDateEndPicker] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  

  const requestNotificationPermission = async () => {
    if (Platform.OS === "android" && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: "Notification Permission",
            message:
              "We'd like to send you important travel updates and offers.",
            buttonPositive: "Allow",
            buttonNegative: "Deny",
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("✅ Notification permission granted");
        } else {
          console.log("❌ Notification permission denied");
        }
      } catch (err) {
        console.warn("Error requesting permission:", err);
      }
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // useEffect(() => {
  //   // test with hardcoded range
  //   const startDate = "2025-09-06";
  //   const endDate = "2025-09-07";

  //   getInvoicesList(startDate, endDate);
  // }, []);

  const filteredInvoices = invoices.filter((invoice) => {
    if (selectedFilter === "All") return true;
    return invoice.Status === selectedFilter;
  });

  const getTotalAmount = (status) => {
    return invoices
      .filter((invoice) => invoice.Status === status)
      .reduce((sum, invoice) => sum + parseFloat(invoice.amount || 0), 0)
      .toFixed(2);
  };

  const totalUnpaid = getTotalAmount("UNPAID");
  const totalPaid = getTotalAmount("PAID");

  const getInvoicesList = async (startDate, endDate) => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      let url =
        "https://invoice-maker-app-wsshi.ondigitalocean.app/api/invoice";

      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setInvoices(response.data);
      }
    } catch (error) {
      console.log(
        "❌ Error fetching invoices:",
        error.response?.data || error.message
      );
      Alert.alert("Error", error.message);
    }
  };

  // const getInvoicesList = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem("userToken");

  //     // hard-coded dates (YYYY-MM-DD format)
  //     const startDate = "2025-09-01";
  //     const endDate = "2025-09-06";

  //     let url = "https://invoice-maker-app-wsshi.ondigitalocean.app/api/invoice";
  //     url += `?startDate=${startDate}&endDate=${endDate}`;

  //     const response = await axios.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status === 200) {
  //       setInvoices(response.data);
  //     }
  //   } catch (error) {
  //     console.log("❌ Error fetching invoices:", error.response?.data || error.message);
  //     Alert.alert("Error", error.message);
  //   }
  // };

  const updateInvoice = async (invoiceId, status) => {
    const data = {
      Status: status,
    };

    try {
      const token = await AsyncStorage.getItem("userToken");
      const url = `https://invoice-maker-app-wsshi.ondigitalocean.app/api/invoice/${selectedInvoice}`;

      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        console.log("✅ Invoice updated:", response.data);
        getInvoicesList(); // refresh invoices
      }
    } catch (error) {
      console.log(
        "❌ Error updating invoice:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Failed to update invoice status");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getInvoicesList();
    }, [openStatusModal])
  );

  const [timeDiffs, setTimeDiffs] = useState([]);

  const calculateTimeDifference = (endDate) => {
    const start = new Date();
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    let timeDifference = end - start;

    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeDifference / (1000 * 3600 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 3600 * 24)) / (1000 * 3600)
    );
    const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const initialTimeDiffs = invoices.map((item) => ({
      id: item.id,
      time: calculateTimeDifference(item.DueIn),
    }));
    setTimeDiffs(initialTimeDiffs);

    const interval = setInterval(() => {
      setTimeDiffs((prevState) =>
        prevState.map((item) => ({
          ...item,
          time: calculateTimeDifference(item.DueIn),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [invoices]);



  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  
  useEffect(() => {
    if (invoices.length > 0) {
      // group invoices by month
      const monthlyTotals = {};
  
      invoices.forEach((invoice) => {
        const month = dayjs(invoice.dateCreated).format("MMMM"); // "January", "February"
        if (!monthlyTotals[month]) {
          monthlyTotals[month] = 0;
        }
        monthlyTotals[month] += parseFloat(invoice.amount || 0);
      });
  
      // prepare chart labels and values
      const labels = Object.keys(monthlyTotals);
      const data = Object.values(monthlyTotals);
  
      setChartData({
        labels,
        datasets: [{ data }],
      });
    }
  }, [invoices]);

  
  
  

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={"transparent"} />
      <View style={styles.header}>
        <AppIcons.BurgerMenu size={23} color={Theme.colors.white} />
        <AppIcons.SearchIcon size={33} color={Theme.colors.white} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.dataBoxWrapper}>
          <View style={styles.dataBox}>
            <Text
              onPress={() => onDisplayNotification()}
              style={styles.boxHeading}
            >
              Unpaid Invoices
            </Text>
            {/* <Text
              onPress={() => navigation.navigate("SubscriptionScreen")}
              style={styles.boxHeading}
            >
              Unpaid Invoices
            </Text> */}

            <Text style={[styles.boxAmount, { color: Theme.colors.Red }]}>
              ${totalUnpaid}
            </Text>
          </View>
          <View style={styles.dataBox}>
            <Text style={styles.boxHeading}>Paid Invoices</Text>
            <Text style={styles.boxAmount}>${totalPaid}</Text>
          </View>
        </View>

        {/* <View horizontal={true} style={styles.filterButtonWrapper}>
          <View style={styles.filterButton}>
            <Text style={styles.filterbuttonText}>All</Text>
          </View>
          <View style={styles.filterButton}>
            <Text style={styles.filterbuttonText}>Unpaid</Text>
          </View>
          <View style={styles.filterButton}>
            <Text style={styles.filterbuttonText}>Paid</Text>
          </View>
          <View style={styles.filterButton}>
            <Text style={styles.filterbuttonText}>OverDue</Text>
          </View>
        </View> */}
        <View horizontal={true} style={styles.filterButtonWrapper}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === "All" && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedFilter("All")}
          >
            <Text
              style={[
                styles.filterbuttonText,
                selectedFilter === "All" && styles.activefilterbuttonText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === "UNPAID" && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedFilter("UNPAID")}
          >
            <Text
              style={[
                styles.filterbuttonText,
                selectedFilter === "UNPAID" && styles.activefilterbuttonText,
              ]}
            >
              UNPAID
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === "PAID" && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedFilter("PAID")}
          >
            <Text
              style={[
                styles.filterbuttonText,
                selectedFilter === "PAID" && styles.activefilterbuttonText,
              ]}
            >
              PAID
            </Text>
          </TouchableOpacity>
        </View>

        

        
        <AppIcons.filterIcon onPress={() => setOpenDateModal(true)}  size={25} color={Theme.colors.black}/>

        {selectedDate && selectedEndDate &&(
          <Text>These are filtered Invoices
            From {selectedDate} to {selectedEndDate}

            <Text onPress={()=>{setSelectedDate(null),setSelectedEndDate(null);getInvoicesList()}}> Reset  </Text>

           
          </Text>
        )}

        {/* chart start */}




{/* 
        <View style={{alignSelf:'center'}}>
  <Text>Bezier Line Chart Currency Rs.</Text>
  <LineChart
    // data={{
    //   labels: ["January", "February", "March", "April", "May", "June"],
    //   datasets: [
    //     {
    //       data: [
    //         // Math.random() * 100,
    //         // Math.random() * 100,
    //         // Math.random() * 100,
    //         // Math.random() * 100,
    //         // Math.random() * 100,
    //         // Math.random() * 100
    //         100,
    //         50,
    //         300,
    //         70,
    //         200,
    //         450
    //       ]
    //     }
    //   ]
    // }}

    data={chartData}
    width={getWidth(95)} // from react-native
    height={260}
    yAxisLabel=""
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 6,
    }}
  />
</View>    */}













        {/* chart end */}

        <FlatList
          inverted
          data={filteredInvoices}
          renderItem={({ item }) => {
            const { days, hours, minutes, seconds } = calculateTimeDifference(
              item.DueIn
            );
            return (
              <TouchableOpacity
                onLongPress={() => [
                  setOpenDeleteModal(true),
                  setInvoiceId(item.id),
                ]}
                onPress={() =>
                  navigation.navigate("PreviewScreen", { invoiceId: item._id })
                }
                style={styles.invoicesCard}
              >
                <TouchableOpacity
                  onPress={() => {
                    setOpenStatusModal(true), setSelectedInvoice(item._id);
                  }}
                  style={styles.paidstatusWrap}
                >
                  <Text style={styles.invoiceStatus}>{item.Status}</Text>
                </TouchableOpacity>

                {item.Status === "UNPAID" && (
                  <View
                    style={[
                      styles.dueDateWrap,
                      {
                        backgroundColor:
                          days === 0 &&
                          hours === 0 &&
                          minutes === 0 &&
                          seconds === 0
                            ? Theme.colors.Red
                            : Theme.colors.Green,
                      },
                    ]}
                  >
                    <Text style={styles.invoiceStatus}>
                      {days === 0 &&
                      hours === 0 &&
                      minutes === 0 &&
                      seconds === 0
                        ? "OVERDUE"
                        : `DUE IN ${days}D ${hours}H ${minutes}Min ${seconds}Sec`}
                    </Text>
                  </View>
                )}
                {item.Status === "PAID" && (
                  <View style={styles.dueDateWrap}>
                    <Text style={styles.invoiceStatus}>PAID BY CLIENT</Text>
                  </View>
                )}

                <View style={styles.cardInnerWrapper}>
                  <View>
                    <Text
                      onPress={() =>
                        navigation.navigate("CreateInvoice", {
                          invoiceId: item._id,
                        })
                      }
                      style={styles.invoiceNum}
                    >
                      #{item.invoiceNumber}
                    </Text>
                    <Text style={styles.invoiceDate}>
                      {new Date(item.dateCreated).toISOString().split("T")[0]}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.clientName}>{item.clientName}</Text>
                    <Text style={styles.invoiceAmount}>
                      {item.currency}
                      {item.amount}
                    </Text>
                  </View>
                </View>

                <NativeModal
                  visible={openStatusModal}
                  modalTitle={"Change Status"}
                  children={
                    <View style={{ height: getHeight(15) }}>
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        data={StatusData}
                        renderItem={({ item }) => (
                          // <TouchableOpacity
                          //   onPress={() => {
                          //     // setStatus(item.status),
                          //     setStatus((prevStatus) =>
                          //       prevStatus === "PAID" ? "UNPAID" : "PAID"
                          //     );
                          //     setOpenStatusModal(false), updateInvoicesList();
                          //   }}
                          //   style={styles.LanguageDataMainWrap}
                          // >
                          //   <Text style={styles.currencyName}>
                          //     {item.status}
                          //   </Text>
                          // </TouchableOpacity>

                          <TouchableOpacity
                            onPress={async () => {
                              setStatus(item.status); // set the selected status
                              setOpenStatusModal(false); // close modal
                              setSelectedInvoice(item._id); // make sure selectedInvoice is set
                              await updateInvoice(item._id, item.status); // call API to update
                            }}
                            style={styles.LanguageDataMainWrap}
                          >
                            <Text style={styles.currencyName}>
                              {item.status}
                            </Text>
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

                <NativeModal
                  visible={openDeleteModal}
                  modalTitle={"Delete Invoice"}
                  children={
                    <View style={{ height: getHeight(9) }}>
                      <View style={styles.deleteModalButtons}>
                        <TouchableOpacity
                          onPress={() => setOpenDeleteModal(false)}
                          style={[
                            styles.saveButtonWrapLanguage,
                            { backgroundColor: Theme.colors.Red },
                          ]}
                        >
                          <Text style={styles.btnText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            deleteInvoice(item.id), setOpenDeleteModal(false);
                          }}
                          style={[
                            styles.saveButtonWrapLanguage,
                            { backgroundColor: Theme.colors.primary },
                          ]}
                        >
                          <Text style={styles.btnText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  }
                />
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={<View style={styles.flatListWrap} />}
        />
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate("CreateInvoice")}
        style={styles.plusButton}
      >
        <AppIcons.PlusIcon
          disabled={true}
          size={30}
          color={Theme.colors.white}
        />
      </TouchableOpacity>

      <NativeModal
        visible={openDateModal}
        modalTitle={"Filter Invoices By Date"}
        children={
          <View style={{ paddingVertical: getHeight(1) }}>
          <View style={styles.datePickerMainWrapper}>

          <TouchableOpacity
          
          onPress={() => {
            setOpenDatePicker(true);
          
          }}
          
          
          style={styles.dateWrapper}>
              <Text style={styles.dateText}>{selectedDate ? selectedDate : 'Start Date'}</Text>
            </TouchableOpacity>
            <AppIcons.ArrowDown color={Theme.colors.black} size={23}/>
            <TouchableOpacity

               
          onPress={() => {
            setOpenDateEndPicker(true);
           
          }}
            
            style={styles.dateWrapper}>
              <Text style={styles.dateText}>{selectedEndDate ? selectedEndDate :'End Date'}</Text>
            </TouchableOpacity>

            <DatePicker
            modal
            open={openDatePicker}
            date={selectedDate ? new Date(selectedDate) : new Date()} 
            title="Select Start Date"
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
            date={selectedEndDate ? new Date(selectedDate) : new Date()} 
            
            title="Select End Date"
            mode="date"
            onConfirm={(date) =>{
              setSelectedEndDate(dayjs(date).format("YYYY-MM-DD"));
              setOpenDateEndPicker(false);
            }}
            onCancel={() => setOpenDateEndPicker(false)}
          />




          </View>

           
              <View style={styles.actionButtonWrapper}>
              <TouchableOpacity
              onPress={() => setOpenDateModal(false)}
              style={[
                styles.saveButtonWrapLanguage,
                { backgroundColor: Theme.colors.Red },
              ]}
            >
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
           onPress={() => {
            getInvoicesList(selectedDate, selectedEndDate);
            
            setOpenDateModal(false); // ✅ close modal
          }}

            
             
              style={[
                styles.saveButtonWrapLanguage,
                { backgroundColor: Theme.colors.Green },
              ]}
            >
              <Text style={styles.btnText}>Filter</Text>
            </TouchableOpacity>
            
              </View>
          </View>
        }
      />
    </View>
  );
}
