import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { customerProduct, customerInvoiceQuantity, customerShape } from '../offer-interface';
import { Router } from '@angular/router';
import { CitGlobalConstantService } from 'src/app/services/api-collection';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  loadingRouteConfig: boolean = false
  systemYear: any;
  salesOrganisationList: any = [];
  shipToCustomer: any = [];
  selectedSalesOrganisation: any = [];
  selectedShipToCustomer: any = [];
  customerForm: any = FormGroup;
  minDate = new Date()
  PeriodList = [
    { 'value': '0', name: 'Spot' },
    { 'value': '1', name: 'Monthly' },
    { 'value': '3', name: 'Quarterly' },
    { 'value': '6', name: 'Semisterly' },
    { 'value': '12', name: 'Yearly' }
  ]
  productDisplayedColumns: any = ['HR', 'CR', 'GALV', 'EZN', 'ZM', 'OTH']
  invoiceQuantityDisplayedColumns: any = ['Invoiced_Quantity_1', 'Invoiced_Quantity_2', 'Invoiced_Quantity_3']
  shapeDisplayedColumns: any = ['Slit', 'Sheets', 'blanks']

  CustomerControl = new FormControl('', Validators.required);
  productDataSource: any
  invoiceQuantityDataSource: any
  shapeDataSource: any
  timeoutId: any = 0;
  customerList: any = [];
  loadingAutoSuggestion: boolean = false;

  constructor(private fb: FormBuilder,
    private apiString: CitGlobalConstantService,
    private apiMethod: ApiService,
    private router: Router) {
    this.systemYear = new Date().getFullYear()

  }

  ngOnInit(): void {

    console.log("Customer module working")
    this.customerForm = this.fb.group({
      Customer: ['', Validators.required],
      soldto: [''],
      Sales_Organisation: ['', Validators.required],
      Customer_Periodicity: ['', Validators.required],
      Ship_to_Customer: ['', Validators.required],
      Customer_Segment: ['', Validators.required],
      Ship_to_Post_Code: ['', Validators.required],
      Credit_Limit: ['', Validators.required],
      Ship_to_Country: ['', Validators.required],
      Offer_valid_From: ['', Validators.required],
      Period: ['', Validators.required],
      Offer_Valid_To: ['', Validators.required],
      Total_Orderbook: ['', Validators.required],
      Open_Orderbook: ['', Validators.required],
      Invoice_quantity: ['', Validators.required],
      Sales_by_Product_HR: ['', Validators.required],
      Sales_by_Product_CR: ['', Validators.required],
      Sales_by_Product_GALV: ['', Validators.required],
      Sales_by_Product_EZN: ['', Validators.required],
      Sales_by_Product_ZM: ['', Validators.required],
      Sales_by_Product_OTH: ['', Validators.required],
      Invoiced_Quantity_1: ['', Validators.required],
      Invoiced_Quantity_2: ['', Validators.required],
      Invoiced_Quantity_3: ['', Validators.required],
      Sales_by_Shape_Slit: ['', Validators.required],
      Sales_by_Shape_Sheets: ['', Validators.required],
      Sales_by_Shape_blanks: ['', Validators.required]
    })
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {

    console.log(event.value)
    const dateSendingToServer = new DatePipe('en-GB').transform(event.value, 'dd-MM-yyyy')
    console.log(dateSendingToServer);
    if (this.customerForm.value.Period) {
      this.periodChange(this.customerForm.value.Period)
    }
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
  periodChange(eventValue: any) {
    console.log(eventValue, "event value")
    console.log(this.customerForm.value.Offer_valid_From)
    if (this.customerForm.value.Offer_valid_From && eventValue) {
      let date: any = ''
      var newDate: any = ''
      let newDate2: any = ''
      date = this.customerForm.value.Offer_valid_From
      console.log(this.customerForm.value.Offer_valid_From, "Period Change")
      newDate = new Date(date.setMonth(date.getMonth() + Number(eventValue)));
      newDate2 = new Date(date.setMonth(date.getMonth() - Number(eventValue)));
      this.customerForm.patchValue({
        Offer_Valid_To: newDate,
        Offer_valid_From: newDate2
      })
    }
  }
  select(query: string, searchTo: any): any {
    let result: string[] = [];
    query = query.toLowerCase()
    if (searchTo === 'SalesOrganisation') {

      for (let a of this.salesOrganisationList) {
        console.log(a.salesOrganization.toLowerCase().indexOf(query))
        if (a.salesOrganization.toLowerCase().indexOf(query) > -1) {
          result.push(a)
        }
      }
    } else {
      console.log(this.shipToCustomer)
      for (let a of this.shipToCustomer) {
        if (a.shipTo.toLowerCase().indexOf(query) > -1) {
          result.push(a)
        }
      }
    }
    return result
  }
  getCustomerList() {
    clearTimeout(this.timeoutId);
    let that = this
    this.loadingAutoSuggestion = true
    this.timeoutId = setTimeout(function () {
      that.apiMethod.get_request_Param(that.apiString.CustomerList, { "searchtext": that.CustomerControl.value }).subscribe(result => {
        that.customerList = result
        that.loadingAutoSuggestion = false
      })
    }, 2000 || 0);
    console.log(this.timeoutId)

  }
  customerSelected(changeValue: any) {
    console.log(changeValue)
    this.customerForm.patchValue({
      soldto: changeValue.soldto,
      Customer: changeValue.soldtoname
    })
    console.log(this.customerForm.value)
    this.loadingRouteConfig = true
    this.apiMethod.get_request_Param(this.apiString.shipTo, { soldto: changeValue.soldto }).subscribe(result => {
      console.log(result)
      this.salesOrganisationList = result
      this.selectedSalesOrganisation = Array.from(this.salesOrganisationList.reduce((m: any, t: any) => m.set(t.salesOrganization, t), new Map()).values());
      this.loadingRouteConfig = false
    }, error => {
      this.loadingRouteConfig = false
    })
  }
  orgChange(changeValue: any) {
    this.shipToCustomer = []
    this.salesOrganisationList.forEach((element: any) => {
      if (element.salesOrganization === changeValue.salesOrganization) {
        this.shipToCustomer.push(element)
      }
    });
    this.selectedShipToCustomer = this.shipToCustomer

  }
  shipToCustomerChange(changeValue: any) {
    let body = {
      "organization": changeValue.salesOrganization,
      "soldTo": this.customerForm.value.soldto,
      "shipTo": changeValue.shipTo
    }
    console.log(body)
    console.log(changeValue)
    this.loadingRouteConfig = true
    this.apiMethod.post_request(this.apiString.customerDetails, body).subscribe((result: any) => {
      console.log(result)
      this.loadingRouteConfig = false
      this.customerForm.patchValue({
        Customer_Periodicity: result[0]?.periodicity,
        Customer_Segment: result[0]?.priceSegment,
        Ship_to_Post_Code: result[0]?.shiptoPostCode,
        Credit_Limit: result[0]?.creditLimit,
        Ship_to_Country: result[0]?.shiptoCountry,
        Total_Orderbook: result[0]?.totalOrderbook,
        Open_Orderbook: result[0]?.openorderbook,
        Invoice_quantity: result[0]?.invoicedQuantity,
      })

      this.productDataSource = new MatTableDataSource<customerProduct>([
        {
          'HR': result[0]?.productHR,
          'CR': result[0]?.productCR,
          'GALV': result[0]?.productGALV,
          'EZN': result[0]?.productEZN,
          'ZM': result[0]?.productZM,
          'OTH': result[0]?.productOTH
        }
      ])
      this.invoiceQuantityDataSource = new MatTableDataSource<customerInvoiceQuantity>([
        {
          'Invoiced_Quantity_1': result[0]?.invoicedQtyinCY,
          'Invoiced_Quantity_2': result[0].invoicedQtyinCY1,
          'Invoiced_Quantity_3': result[0]?.invoicedQtyinCY2
        }
      ])
      this.shapeDataSource = new MatTableDataSource<customerShape>([
        {
          'Slit': result[0]?.shapecoil,
          'Sheets': result[0]?.shapeSheet,
          'blanks': result[0]?.shapeblank
        }
      ])
    }, error => {
      this.loadingRouteConfig = false
    })
  }
  submit() {
    console.log(this.customerForm.value)

  }
}

