import { Dimensions } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage as rf } from 'react-native-responsive-fontsize';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from "react-native-vector-icons/Ionicons"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const dimensionized = { SCREEN_WIDTH, SCREEN_HEIGHT };
export const normalized = { hp, wp };
export const normalizedFont = { rf };
export const AppFonts = {
  commonFont: {
    smallest: rf(1.5),
    smaller: rf(1.75),
    small: rf(2),
    lessMedium: rf(2.25),
    medium: rf(2.5),
    large: rf(3),
    extraLarge: rf(5),
  },
};
export const AppIcons = {
  commonIcons: {
    smallest: 18,
    small: 24,
    medium: 28,
    large: 32,
    extraLarge: 30,
  },
};
export const AppColors = {
  primaryColor: {
    white: "#ffffff",
    navy: "#171775", //"#0D345F",
    black: '#000000',
    blue: "#1560F9",
    grey: "#808080",
    hardPurple: '#fc8403',
  },
  secondaryColor: {
    darkBlack: '#000000',
    lightBlack: '#182233',
    shadedBlack: '#364257',
    lightWhite: '#C3CBD8',
    placeHolderCol: '#7587A6',
    darkBlue: '#3083FF',
  },
  radiantColor: {
    darkBlue: '#0551BF',
    lightBlue: '#CADEFF',
  },

  errorColor: {
    red: '#f44336',
  },
};
export {
  AntDesign,
  Feather,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
  EvilIcons,
  MaterialCommunityIcons,
  Entypo,
  Ionicons
};
