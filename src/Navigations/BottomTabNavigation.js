import { View, Text, Image, StyleSheet, Platform } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Responsive, Theme } from "../libs";

import Home from "../Screens/Home/Home";
import BusinessInfo from "../Screens/BusinessInfo/BusinessInfo";
import ClientInfo from "../Screens/ClientInfo/ClientInfo";
import { images } from "../assets";

const { getWidth, getHeight, AppFonts } = Responsive;

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    // <Tab.Navigator screenOptions={{headerShown:false}}
    // >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon;

            if (route.name === "Home") {
              icon = images.invoiceIcon;
            } else if (route.name === "BusinessInfo") {
              icon = images.invoiceIcon;
            } else if (route.name === "ClientInfo") {
              icon = images.clientIcon;
            }
            return (
              <View style={styles.iconContainer}>
                <Image
                  source={icon}
                  style={[
                    styles.icon,
                    {
                      tintColor: focused
                        ? Theme.colors.primary
                        : Theme.colors.black,
                      width: size,
                      height: size,
                    },
                  ]}
                />
              </View>
            );
          },

          tabBarLabel: ({ focused, color }) => {
            let labelColor = focused ? Theme.colors.primary : Theme.colors.black;

            return (
              <Text
                allowFontScaling={false}
                style={[styles.label, { color: labelColor }]}
              >
                {route.name === "Home"
                  ? "Home"
                  : route.name === "BusinessInfo"
                  ? "Business Info"
                  : route.name === "ClientInfo"
                  ? "Client Info"
                  : "none"}
              </Text>
            );
          },

          headerShown: false,
          tabBarStyle: {
            backgroundColor: Theme.colors.white,

            paddingBottom: Platform.OS === "ios" ? getWidth(1) : getWidth(0),
            height: getHeight(7),

            bottom: getHeight(0.1),
            borderTopWidth: 0,
            elevation: 0,
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />

        <Tab.Screen name="BusinessInfo" component={BusinessInfo} />
        <Tab.Screen name="ClientInfo" component={ClientInfo} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginTop: getHeight(1),
    //   resizeMode: 'contain',
    height: getHeight(40),
    width: getWidth(10),
  },
  label: {
    marginTop: getHeight(0.5),
    fontFamily: Theme.fontFamily["Montserrat-SemiBold"],
    fontSize: AppFonts.t3,
    marginBottom: getHeight(0.5),
  },
});
