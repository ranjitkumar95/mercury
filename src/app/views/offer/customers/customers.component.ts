import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { customerProduct, customerInvoiceQuantity, customerShape } from '../offer-interface';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CitGlobalConstantService } from 'src/app/services/api-collection';
import { ApiService } from 'src/app/services/api.service';
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
  CustomerList: string[] = ['One', 'Two', 'Three'];
  options: string[] = ['One', 'Two', 'Three'];
  CustomerControl = new FormControl('', Validators.required);
  filteredOptions: Observable<string[]>;
  productDataSource: any
  invoiceQuantityDataSource: any
  shapeDataSource: any
  timeoutId: any = 0;

  constructor(private fb: FormBuilder,
    private apiString: CitGlobalConstantService,
    private apiMethod: ApiService,
    private router: Router) {
    this.systemYear = new Date().getFullYear()
    this.filteredOptions = this.CustomerControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCustomer(value)),
    );
  }

  ngOnInit(): void {

    console.log("Customer module working")
    this.customerForm = this.fb.group({
      Customer: ['', Validators.required],
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

    this.productDataSource = new MatTableDataSource<customerProduct>([
      {
        'HR': 122,
        'CR': 12,
        'GALV': 22,
        'EZN': 62,
        'ZM': 154,
        'OTH': 10
      }
    ])
    this.invoiceQuantityDataSource = new MatTableDataSource<customerInvoiceQuantity>([
      {
        'Invoiced_Quantity_1': "580",
        'Invoiced_Quantity_2': "540",
        'Invoiced_Quantity_3': "410"
      }
    ])
    this.shapeDataSource = new MatTableDataSource<customerShape>([
      {
        'Slit': 439,
        'Sheets': 539,
        'blanks': -939
      }
    ])

  }
  private _filterCustomer(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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
  getCustomerList() {
    clearTimeout(this.timeoutId);
    let that = this
    this.timeoutId = setTimeout(function () {
      that.apiMethod.get_request_Param(that.apiString.CustomerList, { "searchtext": "" }).subscribe(result => {

      })
    }, 3000 || 0);
    console.log(this.timeoutId)

  }
  submit() {
    console.log(this.customerForm.value)
  }
}

