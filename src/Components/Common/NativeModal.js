// components/CustomModal.js
import React from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Responsive, Theme } from "../../libs";
import { Images } from "../../assets/Images";

const NativeModal = ({
  visible,
  onClose,
  children,
  customModalStyles,
  modalTitle,
  modalTitleStyle,
  modalDesc,
  ActionButtonTitle,
  onActionButtonPress,
  ImageSource,
}) => {
  const { getHeight, getWidth, AppFonts } = Responsive;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            customModalStyles,
            {
              width: getWidth(90),
              paddingVertical: getWidth(1),
            //   height:getHeight(70),
              backgroundColor: Theme.colors.white,
              borderRadius: Theme.borders.regularRadius,
              //   alignItems: "center",
              //   justifyContent: "center",
            },
          ]}
        >
          <Text
            style={[
              modalTitleStyle,
              {
                textAlign: "center",
                fontSize: AppFonts.h5,
                fontFamily: Theme.fontFamily["Montserrat-SemiBold"],
                marginTop: getHeight(1),
                marginBottom:getHeight(1)
              },
            ]}
          >
            {modalTitle}
          </Text>
          {/* <Text
            style={{
              color: Theme.colors.black,
              fontSize: AppFonts.t1,
              fontFamily: Theme.fontFamily["Montserrat-Regular"],
              marginTop: getHeight(0.3),
              textAlign: "center",
            }}
          >
            {modalDesc}
          </Text> */}
          {/* <TouchableOpacity
            onPress={onActionButtonPress}
            style={{
              height: getHeight(6),
              width: getWidth(65),
              backgroundColor: Theme.colors.primary,
              borderRadius: Theme.borders.fullRadius,
              marginTop: getHeight(2),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: Theme.colors.black,
                fontSize: AppFonts.t1,
                fontFamily: Theme.fontFamily["Poppins-SemiBold"],
                marginTop: getHeight(0.3),
              }}
            >
              {ActionButtonTitle}
            </Text>
          </TouchableOpacity> */}
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default NativeModal;
