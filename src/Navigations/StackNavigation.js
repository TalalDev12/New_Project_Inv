import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../Screens/Home/Home";
import CreateInvoice from "../Screens/CreateInvoice/CreateInvoice";
import BusinessInfo from "../Screens/BusinessInfo/BusinessInfo";
import ClientInfo from "../Screens/ClientInfo/ClientInfo";
import PdfScreen from "../Screens/PdfScreen/PdfScreen";
import BottomTabNavigation from "./BottomTabNavigation";
import Signup from "../Screens/Auth/Signup/Signup";
import Login from "../Screens/Auth/Login/Login";
import AllClientList from "../Screens/AllClientList/AllClientList";
import AllBusinessList from "../Screens/AllBusinessList/AllBusinessList";
import Template1 from "../Screens/Template1/Template1";
import Template2 from "../Screens/Template2/Template2";
import Template3 from "../Screens/Template3/Template3";
import AddNewItem from "../Screens/AddNewItem/AddNewItem";
import AllItemsList from "../Screens/AllItemsList/AllItemsList";
import DetailScreen from "../Screens/DetailScreen";
import EditItem from "../Screens/EditItem/EditItem";
import SignatureScreen from "../Screens/SignatureScreen/SignatureScreen";
import InvoiceIntro from "../Screens/InvoiceIntro/InvoiceIntro";
import AllTermsList from "../Screens/AllTermsList/AllTermsList";
import TermsInfo from "../Screens/TermsInfo/TermsInfo";
import PaymentInfo from "../Screens/PaymentInfo/PaymentInfo";
import AllPaymentsList from "../Screens/AllPaymentsList/AllPaymentsList";
import PreviewScreen from "../Screens/PreviewScreen/PreviewScreen";
import Template4 from "../Screens/Template4/Template4";
import TaxInfo from "../Screens/TaxInfo/TaxInfo";
import AllTaxList from "../Screens/AllTaxList/AllTaxList";
import AllSignatureList from "../Screens/AllSignatureList/AllSignatureList";
import UpdateInvoice from "../Screens/UpdateInvoice/UpdateInvoice";
import SubscriptionScreen from "../Screens/SubscriptionScreen/SubscriptionScreen";

export default function StackNavigation() {
  const stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false, animation: "none" }}
      >
        <stack.Screen component={Home} name="Home" />
        <stack.Screen component={CreateInvoice} name="CreateInvoice" />
        <stack.Screen component={UpdateInvoice} name="UpdateInvoice" />

        <stack.Screen component={BusinessInfo} name="BusinessInfo" />
        <stack.Screen component={ClientInfo} name="ClientInfo" />

        <stack.Screen component={PdfScreen} name="PdfScreen" />
        <stack.Screen
          component={BottomTabNavigation}
          name="BottomTabNavigation"
        />
        <stack.Screen component={Signup} name="Signup" />
        <stack.Screen component={Login} name="Login" />
        <stack.Screen component={AllClientList} name="AllClientList" />
        <stack.Screen component={AllBusinessList} name="AllBusinessList" />
        <stack.Screen component={PreviewScreen} name="PreviewScreen" />
        <stack.Screen component={Template1} name="Template1" />
        <stack.Screen component={Template2} name="Template2" />
        <stack.Screen component={Template3} name="Template3" />
        <stack.Screen component={Template4} name="Template4" />


        <stack.Screen component={AddNewItem} name="AddNewItem" />
        <stack.Screen component={AllItemsList} name="AllItemsList" />
        <stack.Screen component={DetailScreen} name="DetailScreen" />
        <stack.Screen component={EditItem} name="EditItem" />
        <stack.Screen component={SignatureScreen} name="SignatureScreen" />
        <stack.Screen component={InvoiceIntro} name="InvoiceIntro" />
        <stack.Screen component={AllTermsList} name="AllTermsList" />
        <stack.Screen component={TermsInfo} name="TermsInfo" />
        <stack.Screen component={PaymentInfo} name="PaymentInfo" />
        <stack.Screen component={TaxInfo} name="TaxInfo" />
        <stack.Screen component={AllTaxList} name="AllTaxList" />
        <stack.Screen component={AllSignatureList} name="AllSignatureList" />
        <stack.Screen component={SubscriptionScreen} name="SubscriptionScreen" />

        




        <stack.Screen component={AllPaymentsList} name="AllPaymentsList" />
      </stack.Navigator>
    </NavigationContainer>
  );
}
