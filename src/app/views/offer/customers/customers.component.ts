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
    private router: Router,) {
    this.systemYear = new Date().getFullYear()

  }

  ngOnInit(): void {
    this.apiMethod.ee.subscribe(headeEvent => {
      console.log(headeEvent);
    });

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
      Price_valid_From: ['', Validators.required],
      Price_Valid_To: ['', Validators.required],
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
      Sales_by_Shape_blanks: ['', Validators.required],
      totalDays: ['']
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
    console.log(eventValue)
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    console.log(this.customerForm.value.Price_valid_From && eventValue)
    if (this.customerForm.value.Price_valid_From && eventValue) {
      let date = this.customerForm.value.Price_valid_From
      let oneDayBefore: any
      if (Number(eventValue) === 0) {
        oneDayBefore = date
      } else {
        oneDayBefore = new Date(date.getTime() - oneDay)
      }
      console.log(oneDayBefore, "TIME")
      var newDate: any = new Date(oneDayBefore.setMonth(oneDayBefore.getMonth() + Number(eventValue)));
      this.customerForm.patchValue({
        Price_Valid_To: newDate,
        Price_valid_From: date,
        totalDays: Math.round(Math.abs((newDate - date) / oneDay))
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
    console.log(changeValue)
    let body = {
      "organization": changeValue[0].salesOrganization,
      "soldTo": this.customerForm.value.soldto,
      "shipTo": changeValue[0].shipTo
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
        Total_Orderbook: result[0]?.totalOrderbook?.toFixed(2),
        Open_Orderbook: result[0]?.openorderbook?.toFixed(2),
        Invoice_quantity: result[0]?.invoicedQuantity?.toFixed(2),
      })

      this.productDataSource = new MatTableDataSource<customerProduct>([
        {
          'HR': result[0]?.productHR?.toFixed(2),
          'CR': result[0]?.productCR?.toFixed(2),
          'GALV': result[0]?.productGALV?.toFixed(2),
          'EZN': result[0]?.productEZN?.toFixed(2),
          'ZM': result[0]?.productZM?.toFixed(2),
          'OTH': result[0]?.productOTH?.toFixed(2)
        }
      ])
      this.invoiceQuantityDataSource = new MatTableDataSource<customerInvoiceQuantity>([
        {
          'Invoiced_Quantity_1': result[0]?.invoicedQtyinCY?.toFixed(2),
          'Invoiced_Quantity_2': result[0].invoicedQtyinCY1?.toFixed(2),
          'Invoiced_Quantity_3': result[0]?.invoicedQtyinCY2?.toFixed(2)
        }
      ])
      this.shapeDataSource = new MatTableDataSource<customerShape>([
        {
          'Slit': result[0]?.shapecoil?.toFixed(2),
          'Sheets': result[0]?.shapeSheet?.toFixed(2),
          'blanks': result[0]?.shapeblank?.toFixed(2)
        }
      ])
    }, error => {
      this.loadingRouteConfig = false
    })
  }
  submit() {
    console.log(this.customerForm.value)
    this.apiMethod.clickEvent({
      type: 'next',
      value: JSON.stringify({
        "fromDate": this.customerForm.value.Offer_valid_From,
        "toDate": this.customerForm.value.Offer_Valid_To,
        "salesOrg": this.customerForm.value.Sales_Organisation.salesOrganization,
        "customer": this.customerForm.value.Customer,
        "shipTo": this.customerForm.value.Ship_to_Customer.shipTo,
        "material": '',
        "plant": '',
        'soldto': this.customerForm.value.soldto,
      })
    })
    localStorage.setItem('matCharacteristics', JSON.stringify(this.customerForm.value))
    this.router.navigate(['/offer/material'])
  }
  roundUp(value: any) {
    if (typeof value === 'object') {
      return ''
    } else {
      if (Number(value)) {
        return Math.round(value)
      } else {
        return value
      }
    }

  }
}

