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
    borderWidth:0.3,
    width: getWidth(94),
    alignSelf:'center',
    borderRadius: Theme.borders.normalRadius,
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: Theme.borders.normalRadius,
    elevation: 5,
    flexDirection:'row',
    paddingLeft:getWidth(3),
    alignItems:"center",
    justifyContent:'space-between',
    paddingHorizontal:getWidth(4)
    
  },
  headingTextAddClient:{
    color:Theme.colors.black,
    marginLeft:getWidth(2),
    fontSize:AppFonts.t0,
    fontFamily:Theme.fontFamily["Montserrat-Medium"],
  },
  headingTextAllClient:{
    marginTop:getHeight(3),
    color:Theme.colors.black,
    marginLeft:getWidth(5),
    fontSize:AppFonts.h6,
    fontFamily:Theme.fontFamily["Montserrat-SemiBold"]
  },


 
  
  saveButtonWrap:{
    
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
