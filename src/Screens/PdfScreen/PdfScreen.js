import React, { useContext, useEffect, useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { useNavigation } from "@react-navigation/native";
import Print from "react-native-print";
import { useAppContext } from "../../Context/AppContext";

export default function PdfScreen({ route }) {
  const navigation = useNavigation();
  const [pdfPath, setPdfPath] = useState(null);
  const {selectedClient,selectedBusiness} = useAppContext()

  const generateHTML = () => `
  <html>
  <body style="font-family: Arial, sans-serif; margin: 20px; color: #333;">
    <h1 style="text-align: center; color: #ff5733;">Business Info</h1>
    
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border:1.5px solid black; padding:20px;border-radius:40px;">
      <p style="color: #1f77b4; font-size: 26px; font-weight: bold;">Business Name:</p>
      <p style="color: #ff5733; font-size: 26px;">${selectedClient.email}</p>
    </div>
   

    <div style="height: 20%; width: 100%; margin-top: 10%; background-color: purple; border-radius: 20%; display: flex; justify-content: center; align-items: center;">
   <h1 style="color: white; font-size: 26px;">Hello this is new test</h1>
</div>

   



   
  </body>
</html>

  `;

  const createPDF = async () => {
    try {
      const options = {
        html: generateHTML(),
        fileName: "Business_Info",
        directory: "Documents",
      };

      const file = await RNHTMLtoPDF.convert(options);
      setPdfPath(file.filePath);
      return file.filePath; // Return the generated file path
    } catch (error) {
      Alert.alert("Error", "Failed to create PDF");
      return null;
    }
  };

  const printPDF = async (filePath) => {
    try {
      if (filePath) {
        await Print.print({ filePath });
      } else {
        Alert.alert("Error", "PDF file not found.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to print PDF.");
    }
  };

  useEffect(() => {
    const handlePDFCreationAndPrint = async () => {
      const filePath = await createPDF(); // Generate the PDF
      if (filePath) {
        printPDF(filePath); // Immediately print the PDF
      }
    };

    handlePDFCreationAndPrint(); // Call the function when the screen loads
  }, []);

  return (
    <View style={styles.container}>
      {/* Optionally show a message or spinner while the PDF is generated */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
