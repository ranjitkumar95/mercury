import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CitGlobalConstantService } from 'src/app/services/api-collection';
import { ApiService } from 'src/app/services/api.service';
import { offerSummeryList } from '../../../../assets/dummy-data/offer-summery';
import { materialCharacteristics } from '../offer-interface';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-material-characteristics',
  templateUrl: './material-characteristics.component.html',
  styleUrls: ['./material-characteristics.component.scss']
})
export class MaterialCharacteristicsComponent implements OnInit {

  data: any = offerSummeryList
  loadingRouteConfig: boolean = false
  columnsToDisplay: any = [];
  expandedElement: any;
  dataSource = new MatTableDataSource<materialCharacteristics>();
  selection = new SelectionModel<materialCharacteristics>(true, []);
  @ViewChild(MatSort) sort: any = MatSort;

  materialList: any = [];
  characteristics: any;
  matCharacteristics: any;
  pricingList: any = [];
  constructor(
    private fb: FormBuilder,
    private apiString: CitGlobalConstantService,
    private apiMethod: ApiService,
    private router: Router
  ) {
  }
  ngOnInit() {
    this.apiMethod.ee.subscribe((headeEvent: any) => {
      console.log(headeEvent)
      this.matCharacteristics = JSON.parse(headeEvent.value)
      console.log(this.matCharacteristics, 'TEST')
      localStorage.setItem('matCharacteristics', headeEvent.value)
    });
    setTimeout(() => {
      if (localStorage.getItem('matCharacteristics')) {
        let localData: any = localStorage.getItem('matCharacteristics')
        this.matCharacteristics = JSON.parse(localData)
        this.getCharacteristics(this.matCharacteristics)
      } else {
        this.getCharacteristics(this.matCharacteristics)

      }
    })

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    console.log("CLICKED ON CHECKBOX 1")
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  logSelection() {
    this.selection.selected.forEach(s => console.log(s));
  }
  saveChage(event: any) {
    console.log(event)
  }
  getCharacteristics(changeValue: any) {
    console.log(changeValue, this.matCharacteristics)
    this.loadingRouteConfig = true

    let body = {
      "soldto": changeValue.soldto,
      "org": changeValue.Sales_Organisation.salesOrganization
    }
    console.log(body, "request body ")
    this.apiMethod.post_request(this.apiString.materialList, body).subscribe((result: any) => {
      console.log(result)
      this.loadingRouteConfig = false
      this.characteristics = result
      let that = this
      that.columnsToDisplay.push('select')
      that.columnsToDisplay.push('item')
      Object.keys(this.characteristics[0])
        .forEach(function eachKey(key) {
          that.columnsToDisplay.push(key);
        });
      this.dataSource = new MatTableDataSource<materialCharacteristics>(result);
      this.selection = new SelectionModel<materialCharacteristics>(true, []);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
      }, 1000);
    }, error => {
      this.loadingRouteConfig = false
      this.apiMethod.popupMessage('error', "Error While fatching the characteristics")
    })
  }
  selectedMaterials(event: any, data: any) {
    console.log(event, data)
    if (event.checked === true) {
      if (this.pricingList.length >= 0) {
        console.log(event.checked === true)
        let body = {
          "fromDate": "20210101",
          "toDate": "20210101",
          "salesOrg": "DE07",
          "customer": "0002004085",
          "shipTo": "0002004085",
          "material": "000000000008005700",
          "plant": "DEN1",
          "view": 'D',
          "period": "Y1",

        }
        this.apiMethod.post_request(this.apiString.pricing, body).subscribe((result: any) => {
          this.pricingList.push(
            {
              "Plant": "DEN1",
              "Material": "000000000008005700",
              "Base_Price": 573,
              "Processing_Extras": 45.22,
              "Transport_Extras": 41.46,
              "Mill_Extras": 143
            }
          )
          console.log("CLICKED ON CHECKBOX 1", this.pricingList)

        })
      } else {
        this.pricingList = []
      }
    } else {
      this.pricingList.forEach((element: any) => {
        if (element[0].material === data.material && element[0].plant === data.plant) {
          this.pricingList.splice(element, 1);
        }
      });
    }
  }
  submit() {
    console.log(this.selection.selected, this.matCharacteristics)
    let plant: any = []
    let Material: any = []
    if (this.selection.selected.length > 0) {
      this.selection.selected.forEach((element) => {
        plant.push(element.plant)
        Material.push(element.material)
      })
      this.matCharacteristics['material'] = Material
      this.matCharacteristics['plant'] = plant
      console.log(this.matCharacteristics)
      this.apiMethod.newOfferData({
        type: 'next',
        value: { pricing: this.pricingList, selectedMaterials: this.selection.selected }
      })
      console.log({
        type: 'next',
        value: { pricing: this.pricingList, selectedMaterials: this.selection.selected }
      })
      this.router.navigate(['/offer/offer-summary'])
    }
  }
  getName(value: any) {
    return value.replace(/_/g, ' ').trim()
  }
  roundUp(value: any, keyName: any) {
    if(typeof value === 'object'){
      return ''
    }else{
      if (Number(value)) {
        return Math.round(value)
      } else {
        return value
      }
    }
  
  }
}
