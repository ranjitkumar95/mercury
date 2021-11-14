export interface offerSummery {
    'Item': any,
    'Plant': any,
    'Material_Number': any, 
    'Applicable_PGL_Base_Price': any,
    'Total_mill_Extra': any,
    'Total_Processing_Extra': any,
    'Total_Transport_Extra': any,
    'Total_Effective_Extra': any,
    'Proposed_Price': any,
    'Volume_Offered_In_Tonnes': any,
    'PCR_Price': any,
    'Gap_With_Applicable_PGL_Base_Price': any
}

export interface customerProduct {
    'HR': any,
    'CR': any,
    'GALV': any,
    'EZN': any,
    'ZM': any,
    'OTH': any
}
export interface customerInvoiceQuantity {
    'Invoiced_Quantity_1': any,
    'Invoiced_Quantity_2': any,
    'Invoiced_Quantity_3': any
}
export interface customerShape {
    'Slit': any,
    'Sheets': any,
    'blanks': any
}