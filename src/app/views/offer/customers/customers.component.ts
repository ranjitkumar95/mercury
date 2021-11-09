import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  systemYear: any;
  salesOrganisation: string[] = ['Tokyo', 'NewYork', 'Portland'];
  shipToCustomer: string[] = ['1', '2', '3'];
  selectedSalesOrganisation: string[] = this.salesOrganisation;
  selectedShipToCustomer: string[] = this.shipToCustomer;
  customerForm: any = FormGroup;
  minDate = new Date()

  constructor(private fb: FormBuilder) {
    this.systemYear = new Date().getFullYear()
  }

  ngOnInit(): void {
    console.log("Customer module working")
    this.customerForm = this.fb.group({
      Customer: ['',Validators.required],
      Sales_Organisation: [''],
      Customer_Periodicity: [''],
      Ship_to_Customer: [''],
      Customer_Segment: [''],
      Ship_to_Post_Code: [''],
      Credit_Limit: [''],
      Ship_to_Country: [''],
      Offer_valid_From: [''],
      Period: [''],
      Offer_Valid_To: [''],
      Total_Orderbook: [''],
      Open_Orderbook: [''],
      Invoice_quantity: [''],
      Sales_by_Product_HR: [''],
      Sales_by_Product_CR: [''],
      Sales_by_Product_GALV: [''],
      Sales_by_Product_EZN: [''],
      Sales_by_Product_ZM: [''],
      Sales_by_Product_OTH: [''],
      Invoiced_Quantity_1: [''],
      Invoiced_Quantity_2: [''],
      Invoiced_Quantity_3: [''],
      Sales_by_Shape_Slit: [''],
      Sales_by_Shape_Sheets: [''],
      Sales_by_Shape_blanks: ['']
    })
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  
    console.log(event.value)
    const dateSendingToServer = new DatePipe('en-US').transform(event.value, 'dd-MM-yyyy')
    console.log(dateSendingToServer);
  }
  search(query: any, searchTo: any) {
    console.log('query', query)
    let result = this.select(query, searchTo)
    if (searchTo === 'SalesOrganisation') {
      this.selectedSalesOrganisation = result;
    } else {
      this.selectedShipToCustomer = result
    }
  }

  select(query: string, searchTo: any): any {
    let result: string[] = [];
    if (searchTo === 'SalesOrganisation') {

      for (let a of this.salesOrganisation) {
        if (a.toLowerCase().indexOf(query) > -1) {
          result.push(a)
        }
      }
    } else {
      for (let a of this.shipToCustomer) {
        if (a.toLowerCase().indexOf(query) > -1) {
          result.push(a)
        }
      }
    }
    return result
  }
  submit() {
    console.log(this.customerForm.value)
  }
}

