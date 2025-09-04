// import { View, Text, Button, FlatList } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import Purchases from "react-native-purchases";

// export default function SubscriptionScreen() {
//   const [packages, setPackages] = useState([]);

//   useEffect(() => {
//     async function fetchOfferings() {
//       try {
//         const offerings = await Purchases.getOfferings();
//         if (offerings.current) {
//           setPackages(offerings.current.availablePackages);
//         }
//       } catch (e) {
//         console.log("Failed to fetch offerings", e);
//       }
//     }

//     fetchOfferings();
//   }, []);

//   const handlePurchase = async (pkg) => {
//     try {
//       const { customerInfo } = await Purchases.purchasePackage(pkg);
//       if (typeof customerInfo.entitlements.active["pro_access"] !== "undefined") {
//         // 👆 replace "pro" with the identifier of your entitlement in RevenueCat
//         console.log("User now has access to Pro!");
//       }
//     } catch (e) {
//       if (!e.userCancelled) {
//         console.log("Purchase failed:", e);
//       }
//     }
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Text style={{ fontSize: 20, marginBottom: 20 }}>Choose a Subscription</Text>

//       {packages.length > 0 ? (
//         // <FlatList
//         //   data={packages}
//         //   keyExtractor={(item) => item.identifier}
//         //   renderItem={({ item }) => (
//         //     <View style={{ marginBottom: 20 }}>
//         //       <Text style={{ fontSize: 16 }}>{item.product.title}</Text>
//         //       <Text>{item.product.priceString} ({item.product.priceString}/4)Weekly</Text>
//         //       <Button title="Subscribe" onPress={() => handlePurchase(item)} />
//         //     </View>
//         //   )}
//         // />
//         <FlatList
//   data={packages}
//   keyExtractor={(item) => item.identifier}
//   renderItem={({ item }) => {
//     let weeklyPrice = null;

//     if (item.packageType === "MONTHLY") {
//       weeklyPrice = item.product.price / 4; // approx 4 weeks in a month
//     } else if (item.packageType === "ANNUAL") {
//       weeklyPrice = item.product.price / 52; // 52 weeks in a year
//     } else if (item.packageType === "WEEKLY") {
//       weeklyPrice = item.product.price; // already weekly
//     }

//     return (
//       <View style={{ marginBottom: 20 }}>
//         <Text style={{ fontSize: 16 }}>{item.product.title}</Text>
//         <Text>
//           {item.product.priceString}
//           {weeklyPrice
//             ? ` (~${item.product.currencyCode} ${weeklyPrice.toFixed(2)} / week)`
//             : " (Weekly)"}
//         </Text>
//         <Button title="Subscribe" onPress={() => handlePurchase(item)} />
//       </View>
//     );
//   }}
// />

//       ) : (
//         <Text>Loading subscriptions...</Text>
//       )}
//     </View>
//   );
// }


import { View, Text } from 'react-native'
import React from 'react'

export default function SubscriptionScreen() {
  return (
    <View>
      <Text>SubscriptionScreen</Text>
    </View>
  )
}