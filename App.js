import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import StackNavigation from './src/Navigations/StackNavigation'
import { AppProvider } from './src/Context/AppContext'
import BottomTabNavigation from './src/Navigations/BottomTabNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Purchases from 'react-native-purchases';




export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '865174620654-olordd82qa67gg8k16s8aaannr6savsg.apps.googleusercontent.com', // from step 2.6
      offlineAccess: false,
    });
  }, []);
  const REVENUECAT_API_KEY = Platform.select({
    android: 'goog_dtAWjDAZzGJIPYYBtQeBVcaanlQ',
    ios: 'appl_OnaeLjMienSgowklsmhiroopNPx'
  });

  Purchases.configure({ apiKey: REVENUECAT_API_KEY });


  return (
    <AppProvider>
    <StackNavigation/>


    </AppProvider>
  )
}



// import { View, Text, Alert, Platform } from 'react-native';
// import React, { useEffect } from 'react';
// import StackNavigation from './src/Navigations/StackNavigation';
// import { AppProvider } from './src/Context/AppContext';
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import Purchases from 'react-native-purchases';
// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import notifee from '@notifee/react-native';

// export default function App() {
//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId: '865174620654-olordd82qa67gg8k16s8aaannr6savsg.apps.googleusercontent.com',
//       offlineAccess: false,
//     });
//   }, []);

//   const REVENUECAT_API_KEY = Platform.select({
//     android: 'goog_dtAWjDAZzGJIPYYBtQeBVcaanlQ',
//     ios: 'appl_OnaeLjMienSgowklsmhiroopNPx'
//   });

//   Purchases.configure({ apiKey: REVENUECAT_API_KEY });

//   // -----------------------------
//   // 1️⃣ Request Notification Permission
//   // -----------------------------
//   const requestUserPermission = async () => {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
//     return enabled;
//   };

//   // -----------------------------
//   // 2️⃣ Get FCM Token, save in backend & AsyncStorage
//   // -----------------------------
//   const saveDeviceToken = async () => {
//     try {
//       const fcmToken = await messaging().getToken();
//       const userToken = await AsyncStorage.getItem('userToken'); // JWT

//       if (fcmToken && userToken) {
//         // Send to backend
//         await axios.post(
//           'https://invoice-maker-app-wsshi.ondigitalocean.app/api/user/save-token',
//           { token: fcmToken },
//           { headers: { Authorization: `Bearer ${userToken}` } }
//         );
// Alert.alert('token save to server',fcmToken)
//         // Save locally in AsyncStorage
//         await AsyncStorage.setItem('fcmtoken', fcmToken);
//         console.log('✅ FCM token saved:', fcmToken);
//       }
//     } catch (error) {
//       console.log('❌ Error saving FCM token:', error.message);
//     }
//   };

//   // const saveDeviceToken = async () => {
//   //   try {
//   //     const fcmToken = await messaging().getToken();
//   //     const userToken = await AsyncStorage.getItem('userToken');
  
//   //     if (fcmToken && userToken) {
//   //       await axios.post(
//   //         'https://invoice-maker-app-wsshi.ondigitalocean.app/api/user/save-token',
//   //         { token: fcmToken },
//   //         { headers: { Authorization: `Bearer ${userToken}` } }
//   //       );
//   //       await AsyncStorage.setItem('fcmtoken', fcmToken);
//   //       console.log('✅ FCM token saved:', fcmToken);
//   //     }
//   //   } catch (error) {
//   //     console.log('❌ Error saving FCM token:', error.message);
//   //   }
//   // };
  

//   // -----------------------------
//   // 3️⃣ Run on app start
//   // -----------------------------
//   useEffect(() => {
//     const initNotifications = async () => {
//       const permissionGranted = await requestUserPermission();
//       if (permissionGranted) {
//         await saveDeviceToken();
//       } else {
//         Alert.alert('Permission denied', 'Notification permission is required.');
//       }

//       // Optional: listen for token refresh
//       messaging().onTokenRefresh(async newToken => {
//         await AsyncStorage.setItem('fcmtoken', newToken);
//         console.log('🔄 FCM token refreshed:', newToken);
//       });
//     };

//     initNotifications();
//   }, []);

//   useEffect(() => {
//     messaging().onMessage(async remoteMessage => {
//       await notifee.displayNotification({
//         title: remoteMessage.notification.title,
//         body: remoteMessage.notification.body,
//       });
//     });
//   }, []);

//   return (
//     <AppProvider>
//       <StackNavigation />
//     </AppProvider>
//   );
// }






// import { View, Text } from 'react-native'
// import React from 'react'
// import { Theme } from './src/libs'

// export default function App() {
//   return (
//     <View style={{flex:1, backgroundColor:Theme.colors.Red}}>
//       <Text>App</Text>
//     </View>
//   )
// }