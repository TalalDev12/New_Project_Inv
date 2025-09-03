import { Platform, StyleSheet } from "react-native";
import { Responsive, Theme } from "../../../libs";
const { getHeight, getWidth, AppFonts } = Responsive;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.white,
    height: getHeight(10),
    flex: 1,
  },
  loginText:{
    marginLeft:getWidth(6),
    marginTop:getHeight(6),
    fontSize:AppFonts.h3,
    fontFamily:Theme.fontFamily["Poppins-Bold"]
  },
  emailText:{
    marginLeft:getWidth(6),
    marginTop:getHeight(2.5),
    fontSize:AppFonts.t1,
    fontFamily:Theme.fontFamily["Poppins-Medium"]
  },
  InputWrap:{
    marginTop:getHeight(0.5),
    height:Platform.OS === 'android' ? getHeight(6.5): getHeight(6),
    width:getWidth(89),
    alignSelf:'center',
    borderRadius:Theme.borders.normalRadius,
    backgroundColor:Theme.colors.inputBackground,
    borderWidth:0.5,
    borderColor:Theme.colors.DarkGray,
    justifyContent:'center'
  },
  InputWrapPassword:{
    marginTop:getHeight(0.5),
    height:getHeight(6.5),
    width:getWidth(89),
    alignSelf:'center',
    borderRadius:Theme.borders.normalRadius,
    backgroundColor:Theme.colors.inputBackground,
    borderWidth:0.5,
    borderColor:Theme.colors.DarkGray,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:"center"
  },
  inputTextStyle:{
    fontSize:AppFonts.t1,
    fontFamily:Theme.fontFamily["Poppins-Medium"],
    color:Theme.colors.black,
    paddingLeft:getWidth(5),
    marginTop:getHeight(0.5),
  },
  eyeWrapper:{
    marginRight:getWidth(5)
  },
  forgotPasswordText:{
    marginLeft:getWidth(6.5),
    marginTop:getHeight(2),
    fontSize:AppFonts.t2,
    fontFamily:Theme.fontFamily["Poppins-Medium"],
    color:Theme.colors.primary
  },
  forgotPasswordTextLogin:{
    marginLeft:getWidth(6.5),
    marginTop:getHeight(2),
    fontSize:AppFonts.t2,
    fontFamily:Theme.fontFamily["Montserrat-Bold"],
    color:Theme.colors.primary
  },
  Button:{
    marginTop:Platform.OS === 'android' ? getHeight(1): getHeight(34)
  },
  termsAgreeText: {
    textAlign: "center",
    marginTop: getHeight(2),
    fontSize: AppFonts.t4,
    color: Theme.colors.black,
    fontFamily: Theme.fontFamily["Poppins-Regular"],
    alignSelf: "center",
  },
  termsBoldText: {
    textAlign: "center",
    marginTop: getHeight(1.5),
    fontSize: AppFonts.t4,
    color: Theme.colors.black,
    fontFamily: Theme.fontFamily["Poppins-SemiBold"],
    textDecorationLine: "underline",
  },
 
  
});

export default styles;
