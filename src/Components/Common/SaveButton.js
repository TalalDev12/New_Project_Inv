import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Responsive, Theme } from "../../libs";
import styles from "../../Screens/Home/Styles";
import { AppFonts } from "../../utils/AppConstants";

export default function SaveButton({title,onPress, buttonStyle}) {
  const { getHeight, getWidth,AppFonts } = Responsive;
  return (
    <TouchableOpacity
    style={[
    
      {
        height: getHeight(6),
        width: getWidth(88),
        marginTop: getHeight(3.5),
        alignSelf: "center",
        backgroundColor: Theme.colors.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: Theme.borders.normalRadius,
      },
      buttonStyle, 
    ]}
    onPress={onPress}
  >
    <Text
      style={{
        color: Theme.colors.white,
        fontSize: AppFonts.h5,
        fontFamily: Theme.fontFamily["Montserrat-Medium"],
      }}
      allowFontScaling={false}
    >
      {title}
    </Text>
  </TouchableOpacity>
  );
}
