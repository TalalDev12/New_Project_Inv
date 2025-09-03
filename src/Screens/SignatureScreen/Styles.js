import { useState } from "react";
import { StyleSheet } from "react-native";
import { Responsive, Theme } from "../../libs";
const { getHeight, getWidth, AppFonts } = Responsive;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Theme.colors.white,

      },
      title: {
        fontSize: AppFonts.h4,
        fontFamily:Theme.fontFamily["Montserrat-SemiBold"],
        textAlign: "center",
        marginBottom: getHeight(1),
        marginTop:getHeight(3)
      },
      signatureContainer: {
        height:getHeight(36),
        // flex: 1,
        // borderWidth: 2,
        // borderColor:Theme.colors.primary,
        borderRadius: Theme.borders.normalRadius,
        backgroundColor: 'red',
        marginBottom: 16,
        elevation: 4, // Shadow for Android
        shadowColor: "#000", // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius:Theme.borders.normalRadius,
      },
      buttonsWrapper: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: getHeight(5),
      },
      signaturePadStyle: `
        .m-signature-pad {
          box-shadow: none;
          border: none;
        }
        .m-signature-pad--body {
          border: 2px solid #ccc;
        }
        .m-signature-pad--footer {
          display: none;
          margin: 0px;
        }
      `,
      previewContainer: {
        alignItems: "center",
        marginTop: 16,
      },
      previewText: {
        fontSize: 16,
        marginBottom: 8,
        color: "#333",
      },
      image: {
        width: 300,
        height: 200,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
      },
      button:{
        height:getHeight(5),
        width:getWidth(30),
        backgroundColor:Theme.colors.primary,
        borderRadius:Theme.borders.normalRadius,
        alignItems:'center',
        justifyContent:'center'
      },
      buttonTitle:{
        fontSize:AppFonts.t0,
        color:Theme.colors.white,
        fontFamily:Theme.fontFamily["Montserrat-SemiBold"]

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
})

export default styles