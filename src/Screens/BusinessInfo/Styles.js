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
  plusIconWrap:{
    alignSelf:'center',
    height:getHeight(11),
    width:getWidth(25),
    borderWidth:1.8,
    borderRadius:Theme.borders.normalRadius,
    alignItems:"center",
    justifyContent:"center",
    marginVertical:getHeight(2)
  },
  businessLogo:{
    height:getHeight(11),
    width:getWidth(25),
    borderRadius:Theme.borders.normalRadius,
    // resizeMode:'contain'

    

  }
 
  
  
 
  
 
 

});
export default styles;
