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
  headerArrowAndText:{
    flexDirection:"row",
    alignItems:"center",

  },
  headingText:{
    color:Theme.colors.white,
    marginLeft:getWidth(2),
    fontSize:AppFonts.h4,
    fontFamily:Theme.fontFamily["Montserrat-SemiBold"]
  },
  dataBox: {
    marginTop:getHeight(2),
    backgroundColor: Theme.colors.white,
    paddingVertical: getHeight(1.5),
    width: getWidth(94),
    alignSelf:'center',
    borderRadius: Theme.borders.normalRadius,
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: Theme.borders.normalRadius,
    elevation: 5,
  },
  inputHeading:{
    marginTop:getHeight(1),
    color:Theme.colors.black,
    marginLeft:getWidth(3.5),
    fontSize:AppFonts.t1,
    fontFamily:Theme.fontFamily["Montserrat-SemiBold"],

  },
  inputStyle:{
    backgroundColor:Theme.colors.inputBackground,
    width:getWidth(88),
    alignSelf:'center',
    borderRadius:Theme.borders.normalRadius,
    paddingLeft:getWidth(4),
    height:getHeight(6),
    marginTop:getHeight(0.5),
    fontSize:AppFonts.h7,
    fontFamily:Theme.fontFamily["Montserrat-Medium"]
  },
 
 
  
  datePickerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  datePickerDoneButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Theme.colors.primary,
    borderRadius: 5,
    alignItems: "center",
  },
  datePickerBox:{
    height:getHeight(6),
    width:getWidth(88),
    backgroundColor:Theme.colors.inputBackground,
    alignSelf:"center",
    marginTop:getHeight(0.5),
    borderRadius:Theme.borders.normalRadius,
    justifyContent:'center'

  },
  dateText:{
    paddingLeft:getWidth(4),
    fontSize:AppFonts.h7,
    fontFamily:Theme.fontFamily["Montserrat-Medium"],
    color:Theme.colors.black

  },
  dateTextExpire:{
    paddingLeft:getWidth(4),
    fontSize:AppFonts.h6,
    fontFamily:Theme.fontFamily["Montserrat-Medium"],
    color:Theme.colors.black,
    textAlign:'center',
    marginTop:getHeight(2)

  },
  calenderText:{
    fontFamily:Theme.fontFamily["Montserrat-Medium"],
    color:Theme.colors.black,
  },
  LanguageDataMainWrap: {
    alignSelf:'center',
    marginTop:getHeight(1),
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: getWidth(8),
  },
  currencyName:{
    color:Theme.colors.black,
    fontFamily:Theme.fontFamily["Montserrat-Medium"],
    fontSize:AppFonts.h6
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

  
 
  
 
 

});
export default styles;
