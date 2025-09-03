import { StyleSheet } from "react-native";
import { Responsive, Theme } from "../../libs";
const { getHeight, getWidth, AppFonts } = Responsive;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: getWidth(4),
    marginTop: getHeight(2),
    backgroundColor: Theme.colors.white,
    paddingVertical: getHeight(0.7),
    width: getWidth(94),
    alignSelf: "center",
    borderRadius: Theme.borders.normalRadius,
    // shadowColor: Theme.colors.black,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: Theme.borders.normalRadius,
    // elevation: 5,
    borderWidth:0.3
  },
  dataBoxSec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: getWidth(4),
    marginTop: getHeight(1),
    backgroundColor: Theme.colors.white,
    paddingVertical: getHeight(0.7),
    width: getWidth(94),
    alignSelf: "center",
    borderRadius: Theme.borders.normalRadius,
    // shadowColor: Theme.colors.black,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: Theme.borders.normalRadius,
    // elevation: 3,
    borderWidth:0.3

  },

  boxHeading: {
    color: Theme.colors.black,
    fontSize: AppFonts.h3,
    fontFamily: Theme.fontFamily["Montserrat-SemiBold"],
  },
  boxHeadingSingle: {
    color: Theme.colors.black,
    fontSize: AppFonts.t0,
    marginLeft: getWidth(2),
    fontFamily: Theme.fontFamily["Montserrat-SemiBold"],
  },
  boxAmount: {
    fontSize: AppFonts.t2,
    color: Theme.colors.gray20,
    fontFamily: Theme.fontFamily["Montserrat-SemiBold"],
  },

  plusButton: {
    backgroundColor: Theme.colors.primary,
    height: getHeight(7),
    width: getWidth(15),
    borderRadius: Theme.borders.fullRadius,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: getHeight(10),
    right: getWidth(7),
  },
  boxHeadingWithIcon: {
    flexDirection: "row",
  },
  boxDesc: {
    marginLeft: getWidth(2.5),
    fontSize: AppFonts.t2,
    color: Theme.colors.gray20,
    fontFamily: Theme.fontFamily["Montserrat-Regular"],
  },
  doubleTextHeading: {
    flexDirection: "row",
    alignItems: "center",
  },
  singleItemWrap: {
    backgroundColor: Theme.colors.lightgray,
    width: getWidth(73),
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: getHeight(1),
    padding: getHeight(0.8),
    borderRadius: Theme.borders.normalRadius,
    alignItems: "center",
    paddingHorizontal: getWidth(6),
    borderWidth:0.3
  },
  innerItemWrapPQ: {
    flexDirection: "row",
  },
  itemName: {
    fontSize: AppFonts.t2,
    fontFamily: Theme.fontFamily["Montserrat-SemiBold"],
    color: Theme.colors.black,
    width:getWidth(40)
  },
  itemPQ: {
    fontSize: AppFonts.t4,
    fontFamily: Theme.fontFamily["Montserrat-Medium"],
    color: Theme.colors.black,
  },
  itemTotalPrice: {
    fontSize: AppFonts.t4,
    fontFamily: Theme.fontFamily["Montserrat-Medium"],
    color: Theme.colors.black,
  },
  currencyDataMainWrap: {
    marginTop:getHeight(1),
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: getWidth(8),
  },
  currecySymbolsWrap:{
    flexDirection:'row'
  },
  currencyName:{
    color:Theme.colors.black,
    fontFamily:Theme.fontFamily["Montserrat-Medium"],
    fontSize:AppFonts.h6
  },
  currencyNameFirst:{
    color:Theme.colors.black,
    fontFamily:Theme.fontFamily["Montserrat-Medium"],
    fontSize:AppFonts.h6
  },
  currencyNameLast:{
    marginLeft:getWidth(7),
    color:Theme.colors.black,
    fontFamily:Theme.fontFamily["Montserrat-Medium"],
    fontSize:AppFonts.h6
  },
  saveButtonWrap:{
    
    height:getHeight(4),
    width:getWidth(25),
    backgroundColor:Theme.colors.primary,
    alignItems:"center",
    justifyContent:'center',
    borderRadius:Theme.borders.normalRadius,
  },
  saveButtonWrapLanguage:{
    alignSelf:'center',
    height:getHeight(4),
    width:getWidth(25),
    backgroundColor:Theme.colors.primary,
    alignItems:"center",
    justifyContent:'center',
    borderRadius:Theme.borders.normalRadius,
  },
  saveCancelButton:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:getWidth(18),
    paddingTop:getHeight(1)

  },
  btnText:{
    color:Theme.colors.white,
    fontFamily:Theme.fontFamily["Montserrat-Medium"],
    fontSize:AppFonts.t0
  },
  LanguageDataMainWrap: {
    alignSelf:'center',
    marginTop:getHeight(1),
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: getWidth(8),
  },
  
  inputStyle:{
    backgroundColor:Theme.colors.inputBackground,
    width:getWidth(82),
    alignSelf:'center',
    borderRadius:Theme.borders.normalRadius,
    paddingLeft:getWidth(4),
    height:getHeight(6),
    marginTop:getHeight(0.5),
    fontSize:AppFonts.h7,
    fontFamily:Theme.fontFamily["Montserrat-Medium"]
  },

  inputStyleTerms:{

    backgroundColor:Theme.colors.inputBackground,
    width:getWidth(82),
    alignSelf:'center',
    borderRadius:Theme.borders.normalRadius,
    paddingLeft:getWidth(4),
    height:getHeight(6),
    marginTop:getHeight(0.5),
    fontSize:AppFonts.h7,
    fontFamily:Theme.fontFamily["Montserrat-Medium"]

  },
  totalEstimatedWrap:{
    marginTop:getHeight(1),
    height:getHeight(5),
    width:getWidth(73),
    backgroundColor:Theme.colors.purple,
    alignSelf:'center',
    borderRadius:Theme.borders.normalRadius,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:getWidth(6),
    alignItems:'center',
    
  },
  totalEstimatedText:{
    color:Theme.colors.white,
    fontSize:AppFonts.t1,
    fontFamily:Theme.fontFamily["Montserrat-SemiBold"]
  }

});
export default styles;
