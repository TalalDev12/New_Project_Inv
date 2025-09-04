



import { View, Text, Alert, Platform } from 'react-native';
import React, { useEffect } from 'react';
import StackNavigation from './src/Navigations/StackNavigation';
import { AppProvider } from './src/Context/AppContext';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Purchases from 'react-native-purchases';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '865174620654-olordd82qa67gg8k16s8aaannr6savsg.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }, []);

  // const REVENUECAT_API_KEY = Platform.select({
  //   android: 'goog_dtAWjDAZzGJIPYYBtQeBVcaanlQ',
  //   ios: 'appl_OnaeLjMienSgowklsmhiroopNPx'
  // });

  // Purchases.configure({ apiKey: REVENUECAT_API_KEY });

  // -----------------------------
  // 1️⃣ Request Notification Permission
  // -----------------------------
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    return enabled;
  };

  // -----------------------------
  // 2️⃣ Get FCM Token, save in backend & AsyncStorage
  // -----------------------------
  const saveDeviceToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      const userToken = await AsyncStorage.getItem('userToken'); // JWT

      if (fcmToken && userToken) {
        // Send to backend
        await axios.post(
          'https://invoice-maker-app-wsshi.ondigitalocean.app/api/user/save-token',
          { token: fcmToken },
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
Alert.alert('token save to server',fcmToken)
        // Save locally in AsyncStorage
        await AsyncStorage.setItem('fcmtoken', fcmToken);
        console.log('✅ FCM token saved:', fcmToken);
      }
    } catch (error) {
      console.log('❌ Error saving FCM token:', error.message);
    }
  };

  

  // -----------------------------
  // 3️⃣ Run on app start
  // -----------------------------
  // useEffect(() => {
  //   const initNotifications = async () => {
  //     const permissionGranted = await requestUserPermission();
  //     if (permissionGranted) {
  //       await saveDeviceToken();
  //     } else {
  //       Alert.alert('Permission denied', 'Notification permission is required.');
  //     }

  //     // Optional: listen for token refresh
  //     messaging().onTokenRefresh(async newToken => {
  //       await AsyncStorage.setItem('fcmtoken', newToken);
  //       console.log('🔄 FCM token refreshed:', newToken);
  //     });
  //   };

  //   initNotifications();
  // }, []);

  useEffect(() => {
    const initNotifications = async () => {
      try {
        // 1️⃣ Request permission
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
        if (!enabled) {
          Alert.alert('Permission denied', 'Notification permission is required.');
          return;
        }
  
        // 2️⃣ Register device for remote messages (iOS ONLY)
        if (Platform.OS === 'ios') {
          await messaging().registerDeviceForRemoteMessages();
        }
  
        // 3️⃣ Get & save token
        const fcmToken = await messaging().getToken();
        console.log('FCM Token:', fcmToken);
        const userToken = await AsyncStorage.getItem('userToken');
  
        if (fcmToken && userToken) {
          await axios.post(
            'https://invoice-maker-app-wsshi.ondigitalocean.app/api/user/save-token',
            { token: fcmToken },
            { headers: { Authorization: `Bearer ${userToken}` } }
          );
          await AsyncStorage.setItem('fcmtoken', fcmToken);
          Alert.alert('Token saved to server', fcmToken);
        }
  
        // 4️⃣ Listen for token refresh
        messaging().onTokenRefresh(async newToken => {
          await AsyncStorage.setItem('fcmtoken', newToken);
          console.log('🔄 FCM token refreshed:', newToken);
        });
      } catch (error) {
        console.log('❌ Error saving FCM token:', error);
        Alert.alert('Error saving FCM token', error.message);
      }
    };
  
    initNotifications();
  }, []);

 

  return (
    <AppProvider>
      <StackNavigation />
    </AppProvider>
  );
}






