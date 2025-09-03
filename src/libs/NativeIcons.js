import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

import Octicons from 'react-native-vector-icons/Octicons'
import Foundation from 'react-native-vector-icons/Foundation'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import Theme from './Theme.json'
import { create } from 'react-test-renderer'
import { FontAwesome5 } from '../utils/AppConstants'

const createIcon =
  (iconComponent, iconName) =>
  ({ onPress, size, color, disabled }) =>
    (
      <TouchableOpacity
        disabled={disabled || false}
        style={styles(size || 18).wrapper}
        onPress={onPress}
      >
        {React.createElement(iconComponent, {
          name: iconName,
          color: color || Theme.colors.iconColor,
          size: size || 18,
        })}
      </TouchableOpacity>
    )

const AppIcons = {
  FrownoIcon: createIcon(AntDesign, 'frowno'),
  downArrow: createIcon(AntDesign, 'down'),
  message: createIcon(AntDesign, 'message1'),
  like: createIcon(AntDesign, 'like1'),
  logoutIcon: createIcon(AntDesign, 'logout'),
  user: createIcon(AntDesign, 'user'),
  SearchIcon: createIcon(EvilIcons, 'search'),
  MenuIcon: createIcon(MaterialCommunityIcons, 'menu'),
  comment: createIcon(MaterialCommunityIcons, 'comment-multiple'),
  EmailIcon: createIcon(MaterialCommunityIcons, 'email-outline'),
  BackIcon: createIcon(EvilIcons, 'chevron-left'),
  bellIcon: createIcon(Fontisto, 'bell'),
  CardsHeartIcon: createIcon(MaterialCommunityIcons, 'cards-heart'),
  HeartIcon: createIcon(MaterialCommunityIcons, 'heart-multiple-outline'),
  HomeIcon: createIcon(MaterialCommunityIcons, 'home-outline'),
  ShoppingIcon: createIcon(MaterialCommunityIcons, 'shopping-outline'),
  LoginIcon: createIcon(MaterialCommunityIcons, 'login'),
  ErrorIcon: createIcon(MaterialIcons, 'error-outline'),
  DoneIcon: createIcon(MaterialIcons, 'done'),

  
  newsIcon: createIcon(MaterialIcons, 'sync-alt'),
  check: createIcon(AntDesign, 'check'),
  CloseIcon: createIcon(MaterialIcons, 'close'),
  DeleteIcon: createIcon(MaterialIcons, 'delete'),
  EyeIcon: createIcon(MaterialCommunityIcons, 'eye-outline'),
  EyeOffIcon: createIcon(MaterialCommunityIcons, 'eye-off-outline'),
  ImageUpload: createIcon(MaterialCommunityIcons, 'image'),
  Attachment: createIcon(Entypo, 'attachment'),
  LockIcon: createIcon(Entypo, 'lock'),


  users: createIcon(Entypo, 'users'),
  Cake: createIcon(MaterialCommunityIcons, 'cake'),
  Bicycle: createIcon(MaterialCommunityIcons, 'bicycle'),
  Walk: createIcon(MaterialCommunityIcons, 'walk'),
  Car: createIcon(MaterialCommunityIcons, 'car'),
  Security: createIcon(MaterialCommunityIcons, 'security'),
  World: createIcon(Fontisto, 'world-o'),
  Transit: createIcon(MaterialIcons, 'directions-transit'),
  lockIcon: createIcon(Feather, 'lock'),
  list: createIcon(Feather, 'list'),
  camera: createIcon(Feather, 'camera'),
  ThreeDots: createIcon(Entypo, 'dots-three-vertical'),
  star: createIcon(Feather, 'star'),
  music: createIcon(FontAwesome, 'music'),
  backward: createIcon(FontAwesome, 'step-backward'),
  forward: createIcon(AntDesign, 'stepforward'),
  pause: createIcon(AntDesign, 'pause'),
  play: createIcon(Feather, 'play'),
  phone: createIcon(Feather, 'phone'),
  cornerright: createIcon(Feather, 'corner-up-right'),
  backArrow: createIcon(Feather, 'arrow-left'),
  person: createIcon(Ionicons, 'person-outline'),
  globe: createIcon(Ionicons, 'globe-outline'),
  InfoIcon: createIcon(Ionicons, 'information-circle-outline'),
  Like: createIcon(AntDesign, 'like2'),
  dislike: createIcon(AntDesign, 'dislike2'),
  dots: createIcon(Entypo, 'dots-three-vertical'),
  questionIcon: createIcon(FontAwesome, 'question-circle-o'),
  devicePermission: createIcon(Octicons, 'device-desktop'),
  PlusIcon: createIcon(AntDesign, 'plus'),
  UpIcon: createIcon(AntDesign, 'up'),
  arrowleft: createIcon(AntDesign, 'arrowleft'),
  reportIcon: createIcon(Foundation, 'clipboard-notes'),
  share: createIcon(FontAwesome, 'share'),
  Favourite: createIcon(AntDesign, 'hearto'),
  Send: createIcon(FontAwesome, 'send'),
  PlusIconBold: createIcon(FontAwesome5, 'plus'),

  Edit: createIcon(Feather, 'edit-3'),
  CallIcon: createIcon(Feather, 'phone-call'),
  Video: createIcon(Octicons, 'device-camera-video'),
  VolumUp: createIcon(Feather, 'volume-2'),
  ArrowRight: createIcon(AntDesign, 'arrowright'),
  Calendar: createIcon(MaterialCommunityIcons, 'calendar-range-outline'),
  Location: createIcon(Ionicons, 'location-outline'),
  Return: createIcon(MaterialCommunityIcons, 'backup-restore'),
  ShoppingCart: createIcon(Ionicons, 'cart-outline'),
  Pluscircle: createIcon(AntDesign, 'pluscircleo'),
  menuIcon: createIcon(Entypo, 'menu'),
  CheckCircle: createIcon(AntDesign, 'checkcircleo'),
  CameraIcon: createIcon(FontAwesome, 'camera'),
  PlusCircle: createIcon(Feather, 'plus-circle'),
  BurgerMenu: createIcon(SimpleLineIcons, 'menu'),
  MessageBulleted: createIcon(MaterialCommunityIcons, 'message-bulleted'),
  Tag: createIcon(FontAwesome5, 'tag'),
  BellFilled: createIcon(Octicons, 'bell-fill'),
  QuestionCircle: createIcon(AntDesign, 'questioncircle'),
  FriendsIcon: createIcon(FontAwesome6, 'user-group'),
  ArrowForward: createIcon(MaterialIcons, 'arrow-forward-ios'),
  CreditCard: createIcon(Feather, 'credit-card'),
  Paypal: createIcon(Entypo, 'paypal'),
  Apple: createIcon(FontAwesome, 'apple'),
  DollerCard: createIcon(FontAwesome6, 'money-check-dollar'),
  DownIcon: createIcon(Feather, 'chevron-down'),
  appstore: createIcon(AntDesign, 'appstore1'),
  DollarIcon: createIcon(Foundation, 'dollar'),
  CrossIcon: createIcon(Entypo, 'cross'),
  favorite_fill: createIcon(MaterialIcons, 'favorite'),
  favorite: createIcon(MaterialIcons, 'favorite'),
  ChevronRight: createIcon(Entypo, 'chevron-thin-right'),
  ThreeDotsHorizontal: createIcon(Entypo, 'dots-three-horizontal'),
  controllerplay: createIcon(Entypo, 'controller-play'),
  filledStar: createIcon(FontAwesome, 'star'),
  starOutline: createIcon(FontAwesome, 'star-o'),
  halfStar: createIcon(FontAwesome, 'star-half-empty'),
  PhotoIcon: createIcon(FontAwesome, 'photo'),
  LiveCamera: createIcon(Octicons, 'device-camera-video'),
  Refresh: createIcon(MaterialCommunityIcons, 'refresh'),
  arrowDown: createIcon(MaterialIcons, 'keyboard-arrow-down'),
  doubleRight: createIcon(AntDesign, 'doubleright'),
  IconRight: createIcon(AntDesign, 'right'),
  filterIcon: createIcon(Ionicons, 'filter'),
  websiteIcon: createIcon(MaterialCommunityIcons, 'web'),
  groupIcon: createIcon(MaterialIcons, 'groups'),
  officeIcon: createIcon(MaterialCommunityIcons, 'office-building-outline'),
  addressIcon: createIcon(MaterialIcons, 'location-city'),
  editIcon: createIcon(FontAwesome, 'edit'),
  favIcon: createIcon(Fontisto, 'favorite'),
  genderIcon: createIcon(MaterialCommunityIcons, 'gender-male-female-variant'),
  CaretIconRight: createIcon(AntDesign, 'caretright'),
  CaretIconLef: createIcon(AntDesign, 'caretleft'),
  CaretIconDown: createIcon(AntDesign, 'caretdown'),
  CaretIconUp: createIcon(AntDesign, 'caretup'),
  ArrowDown: createIcon(AntDesign, 'arrowdown'),
  ArrowUp: createIcon(AntDesign, 'arrowup'),


  


  


  

  



  



  




  


  



  


  



  








  


  


  
}

export default AppIcons

const styles = (width) =>
  StyleSheet.create({
    wrapper: {
      width: width + 4,
      padding: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
