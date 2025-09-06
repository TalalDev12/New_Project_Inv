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
    borderBottomLeftRadius:getWidth(6),
    borderBottomRightRadius:getWidth(6),
  },
  dataBox: {
    backgroundColor: Theme.colors.white,
    height: getHeight(15),
    width: getWidth(44),
    borderRadius: Theme.borders.normalRadius,
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: Theme.borders.normalRadius,
    elevation: 5,
    alignItems:"center",
  },
  dataBoxWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:getWidth(3.5),
    paddingVertical:getHeight(2)
  },
  boxHeading:{
    color:Theme.colors.black,
    marginTop:getHeight(2),
    fontSize:AppFonts.t1,
    
    fontFamily:Theme.fontFamily["Montserrat-SemiBold"]
  },
  boxAmount:{
    marginTop:getHeight(1.5),
    fontSize:AppFonts.h4,
    color:Theme.colors.Green,
    fontFamily:Theme.fontFamily["Montserrat-SemiBold"]
  },
  filterButton:{
    height:getHeight(3.2),
    paddingHorizontal:getWidth(5),
    backgroundColor:Theme.colors.white,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:Theme.borders.fullRadius,
    marginLeft:getWidth(3.5),
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: Theme.borders.normalRadius,
    elevation: 5,
  },

  activeFilterButton:{
    height:getHeight(3.2),
    paddingHorizontal:getWidth(5),
    backgroundColor:Theme.colors.primary,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:Theme.borders.fullRadius,
    marginLeft:getWidth(3.5),
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: Theme.borders.normalRadius,
    elevation: 5,

  },
  filterbuttonText:{

    color:Theme.colors.purple,
    fontSize:AppFonts.t2,
    fontFamily:Theme.fontFamily["Montserrat-Medium"],
   
  },
  activefilterbuttonText:{
    color:Theme.colors.white,
    fontSize:AppFonts.t2,
    fontFamily:Theme.fontFamily["Montserrat-Medium"],

  },
  filterButtonWrapper:{
    flexDirection:'row',
    alignSelf:'center',
    marginBottom:getHeight(1.5)

    

  },
  plusButton:{
    backgroundColor:Theme.colors.primary,
    height:getHeight(7),
    width:getWidth(15),
    borderRadius:Theme.borders.fullRadius,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    bottom:getHeight(10),
    right:getWidth(7)
  },
  invoicesCard:{
    marginTop:getHeight(1),
   height:getHeight(14.5),
    width:getWidth(90),
    backgroundColor:Theme.colors.white,
    alignSelf:"center",
    borderRadius:Theme.borders.normalRadius,
    flexDirection:'row',
    justifyContent:'space-between',
    // paddingHorizontal:getWidth(5),
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: Theme.borders.normalRadius,
    elevation: 5,
    marginBottom:getHeight(1)
    

  },
  invoiceNum:{
    marginTop:getHeight(5),
    color:Theme.colors.black,
    fontSize:AppFonts.t0,
    fontFamily:Theme.fontFamily["Montserrat-Medium"],

  },
  invoiceDate:{
    marginTop:getHeight(1.5),
    color:Theme.colors.black,
    fontSize:AppFonts.t0,
    fontFamily:Theme.fontFamily["Montserrat-Medium"],

  },
  invoiceDueDate:{
    marginTop:getHeight(1.5),
    color:Theme.colors.black,
    fontSize:AppFonts.t2,
    fontFamily:Theme.fontFamily["Montserrat-Medium"],
  },
  clientName:{
    textAlign:'right',
    marginTop:getHeight(5),
    color:Theme.colors.black,
    fontSize:AppFonts.t0,
    fontFamily:Theme.fontFamily["Montserrat-Medium"],

  },
  invoiceAmount:{
    marginTop:getHeight(1.5),
    color:Theme.colors.black,
    fontSize:AppFonts.t0,
    fontFamily:Theme.fontFamily["Montserrat-SemiBold"],
    textAlign:'right'
  },
  paidstatusWrap:{
    height:getHeight(3.3),
    paddingHorizontal:getWidth(3),
    backgroundColor:Theme.colors.primary,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    top:getHeight(0),
    left:getWidth(0),
    borderTopLeftRadius:Theme.borders.normalRadius,
    borderBottomRightRadius:Theme.borders.normalRadius,

    
  },
  invoiceStatus:{
    color:Theme.colors.white,
    fontSize:AppFonts.t2,
    fontFamily:Theme.fontFamily["Montserrat-SemiBold"]
  },
  dueDateWrap:{
    height:getHeight(3.3),
    paddingHorizontal:getWidth(3),
    backgroundColor:Theme.colors.Green,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    top:getHeight(0),
    right:getWidth(0),
    borderTopRightRadius:Theme.borders.normalRadius,
    borderBottomLeftRadius:Theme.borders.normalRadius,

  },
  cardInnerWrapper:{
    // marginTop:getHeight(5)
    flexDirection:'row',
    justifyContent:'space-between',
    width:getWidth(90),
    paddingHorizontal:getWidth(3)
  },
  flatListWrap:{
    marginBottom:getHeight(2)
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
    marginTop:getHeight(2),
    alignSelf:'center',
    height:getHeight(3),
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
    fontSize:AppFonts.t1
  },
  deleteModalButtons:{
    marginTop:getHeight(2),
    flexDirection:'row',
    alignItems:'center',
    // alignSelf:'center',
    justifyContent:'space-between',
    marginHorizontal:getWidth(12)

  },
  dateWrapper:{
    height:getHeight(3.5),
    width:getWidth(30),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:Theme.borders.normalRadius,
    borderWidth:0.5,


  },
  dateText:{
    fontSize:AppFonts.t2,
    fontFamily:Theme.fontFamily["Montserrat-Medium"],
    color:Theme.colors.black
  },
  datePickerMainWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:getWidth(10)
  },
  actionButtonWrapper:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginHorizontal:getWidth(15)

  }


  
});
export default styles;
