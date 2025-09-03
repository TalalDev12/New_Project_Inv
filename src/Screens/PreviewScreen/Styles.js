import { StyleSheet } from "react-native";
import { Responsive, Theme } from "../../libs";
import BusinessInfo from "../BusinessInfo/BusinessInfo";

const { getHeight, getWidth, AppFonts } = Responsive;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.lighIcon,
  },
  header: {
    height: getHeight(12),
    backgroundColor: Theme.colors.primary,
    alignItems: "center",
    flexDirection: "row",
    paddingTop: getHeight(3),
    paddingHorizontal: getWidth(5),
    justifyContent: "space-between",
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: Theme.borders.normalRadius,
    elevation: 5,
  },
  headerArrowAndText: {
    flexDirection: "row",
    alignItems: "center",
  },
  headingText: {
    color: Theme.colors.white,
    marginLeft: getWidth(2),
    fontSize: AppFonts.h4,
    fontFamily: Theme.fontFamily["Montserrat-SemiBold"],
  },
  dataBox: {
    // marginTop: getHeight(2),
    paddingTop: getHeight(1),
    paddingBottom: getHeight(5),
    width: getWidth(88),
    alignSelf: "center",
    // borderRadius: Theme.borders.normalRadius,
    // shadowColor: Theme.colors.black,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: Theme.borders.normalRadius,
    // elevation: 5,
    // paddingHorizontal: getWidth(1.5),
  },
  dataBoxInner: {
    flexDirection: "row",
  },
  invAndMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: getWidth(3.5),
    paddingVertical: getWidth(3.5),
    height: getHeight(9),
    // marginTop: getHeight(1),
  },
  invTitle: {
    color: Theme.colors.black,
    fontSize: AppFonts.h5,
    fontFamily: Theme.fontFamily["Montserrat-Bold"],
  },
  metaWrap: {
    // marginTop:getHeight(2.2),
    marginLeft: getWidth(12),
    width: getWidth(40),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  invTitleText: {
    color: Theme.colors.black,
    fontSize: AppFonts.t5,
    fontFamily: Theme.fontFamily["Montserrat-Bold"],
  },
  invDescText: {
    color: Theme.colors.black,
    fontSize: AppFonts.t5,
    fontFamily: Theme.fontFamily["Montserrat-Medium"],
  },
  border: {
    borderBottomWidth: 0.5,
    width: getWidth(83.5),
    alignSelf: "center",
    borderBottomColor: Theme.colors.black,
    paddingVertical: getHeight(0.1),
  },
  fromandToWrap: {
    paddingVertical: getHeight(1),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: getWidth(6),
  },
  fromTitle: {
    color: Theme.colors.black,
    fontSize: AppFonts.t4,
    fontFamily: Theme.fontFamily["Montserrat-SemiBold"],
  },
  fromDesc: {
    color: Theme.colors.black,
    fontSize: AppFonts.t5,
    fontFamily: Theme.fontFamily["Montserrat-Medium"],
  },
  ActionsBox: {
    marginTop: getHeight(4),
    height: getHeight(15),
    width: getWidth(88),
    alignSelf: "center",
    borderRadius: Theme.borders.regularRadius,
    justifyContent: "space-between",
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: Theme.borders.regularRadius,
    elevation: 4,
    paddingLeft: getWidth(3),
  },
  itemsMainWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: getHeight(0.5),
    borderBottomWidth: 0.25,
  },
  itemsWrap: {
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  itemName: {
    marginLeft: getWidth(3),
    fontSize: AppFonts.t6,
    fontFamily: Theme.fontFamily["Montserrat-SemiBold"],
  },
  itemDesc: {
    fontSize: getHeight(1),
    fontFamily: Theme.fontFamily["Montserrat-Medium"],
    width: getWidth(26),
    marginLeft: getWidth(3),
  },
  perItemStyle: {
    fontSize: AppFonts.t5,
    textAlign: "center",
  },
 
  paymentAndgrandsMainWrap:{
    // backgroundColor:'red',
    marginHorizontal:getHeight(1),
    flexDirection:'row',
     marginTop: getHeight(1),
     alignItems:'center',
     justifyContent:'center',

  },


  singleGrandRow: {
    flexDirection: "row",       // horizontal
    justifyContent: "space-between", // left/right spacing
    alignItems: "center",       // vertically center
    paddingVertical: getHeight(0.1),         // optional spacing
    paddingHorizontal: getWidth(3),
    marginLeft:getWidth(2)
  },
  grandTotalText: {
    fontSize: AppFonts.t5,
      fontFamily: Theme.fontFamily["Montserrat-SemiBold"],
  },
  grandTotalWrap: {
    // marginTop: getHeight(1),
    paddingHorizontal: 10,
  },






  qrMainWrap:{
flexDirection:'row',
alignItems:'center'
  },

  signatureWrap: {
    // position: "absolute",
    // top: getHeight(2),
    // left: getWidth(65),
    borderBottomWidth: 0.3,
    width:getWidth(20),
    alignSelf:'flex-end',
    marginRight:getWidth(10),
  },
  signatureStyle: {
    height: getHeight(8),
    width: getWidth(18),
    resizeMode: "contain",
    alignSelf: "center",
  },
  logoWrapper: {
    width: getWidth(13),
    height:getHeight(6.5),
    alignSelf:'center'
  },
  businessLogo: {
    height: getHeight(6.5),
    width: getWidth(13),
    resizeMode: "contain",
    borderRadius: Theme.borders.normalRadius,
  },
  paidIcon: {
    height: getHeight(9),
    width: getWidth(18),
    position: "absolute",
    resizeMode: "contain",
    bottom: getHeight(25),
    left: getWidth(30),
    transform: [{ rotate: "-7deg" }],
  },
  termsTitle: {
    marginLeft: getWidth(2),
    color: Theme.colors.black,
    fontSize: AppFonts.t6,
    fontFamily: Theme.fontFamily["Montserrat-SemiBold"],
  },
  termsDesc: {
    // width:getWidth(40),
    marginLeft: getWidth(2),
    color: Theme.colors.black,
    fontSize: AppFonts.t6,
    fontFamily: Theme.fontFamily["Montserrat-Regular"],
  },
  itemHeadWrap: {
    height: getHeight(2),
    // backgroundColor:Theme.colors.black,
    alignItems: "center",
    justifyContent: "center",
    // borderRightWidth:1.5,
    borderRightColor: Theme.colors.white,
  },
  headText: {
    color: Theme.colors.white,
    fontFamily: Theme.fontFamily["Montserrat-SemiBold"],
    fontSize: AppFonts.t6,
  },
  headingMainWrap: {
    flexDirection: "row",
  },
  itemDataCell: {
    // backgroundColor:Theme.colors.Red,
    // alignItems:"center",
    justifyContent: "center",
    marginBottom: getHeight(0.5),
  },


  blueTemplate: {
    marginTop: getHeight(3),
    width: getWidth(95),
    alignSelf: "center",
  },
  
  paymentAndTermsWrap: {
    // marginLeft: getWidth(4),
    // backgroundColor:'red',
    // width: getWidth(50),
  },

  







});
export default styles;
