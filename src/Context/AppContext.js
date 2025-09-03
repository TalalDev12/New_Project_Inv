// AppContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context
const AppContext = createContext();

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedTaxItem, setSelectedTaxItem] = useState([]);

  
  const [CapturedSignature, setCapturedSignature] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [shippingCharges, setShippingCharges] = useState(null);
  const [discountNumber, setDiscountNumber] = useState(null);

  const [selectedTerms, setSelectedTerms] = useState(null);
  const [selectedPayments, setSelectedPayments] = useState(null);

  const [selectedCurrency, setSelectedCurrency] = useState();
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [invoiceTitle, setInvoiceTitle] = useState(null);

const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const [newInvoiveStatus, setNewInvoiveStatus] = useState(null);
const [allItemsTotal, setAllItemsTotal] = useState(null);
const [grandTotal, setGrandTotal] = useState(null);










  const resetSelection = () => {
    setSelectedClient(null);
    setSelectedBusiness(null);
    setSelectedItem([]);
    setSelectedTaxItem([]);
    setDiscountNumber(null);
    setCapturedSignature(null);
    setSelectedLanguage(null);
    setShippingCharges(null);
    setSelectedTerms(null);
    setSelectedPayments(null);
    setSelectedCurrency(null);
    setInvoiceNumber(null);
    setInvoiceTitle(null);
    setStartDate(null);
    setEndDate(null)
    setNewInvoiveStatus(null)
    setAllItemsTotal(null)
    setGrandTotal(null)
  };

  return (
    <AppContext.Provider
      value={{
        selectedClient,
        setSelectedClient,
        selectedBusiness,
        setSelectedBusiness,
        selectedItem,
        setSelectedItem,
        selectedTaxItem,
        setSelectedTaxItem,
        CapturedSignature,
        setCapturedSignature,
        selectedLanguage,
        setSelectedLanguage,
        selectedCurrency,
        setSelectedCurrency,
        shippingCharges,
        setShippingCharges,
        discountNumber,
        setDiscountNumber,
        selectedTerms,
        setSelectedTerms,
        selectedPayments,
        setSelectedPayments,
        invoiceNumber,  
        setInvoiceNumber, 
        invoiceTitle,
        setInvoiceTitle,
        startDate, 
        setStartDate, 
        endDate, 
        setEndDate, 
        newInvoiveStatus, setNewInvoiveStatus,
        allItemsTotal,
        setAllItemsTotal,
        grandTotal,
        setGrandTotal,

        resetSelection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};
