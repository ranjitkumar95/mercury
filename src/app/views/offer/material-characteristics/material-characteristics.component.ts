import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CitGlobalConstantService } from 'src/app/services/api-collection';
import { ApiService } from 'src/app/services/api.service';
import { offerSummeryList } from '../../../../assets/dummy-data/offer-summery';
import { materialCharacteristics } from '../offer-interface';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-material-characteristics',
  templateUrl: './material-characteristics.component.html',
  styleUrls: ['./material-characteristics.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),

  ],
})
export class MaterialCharacteristicsComponent implements OnInit {

  data: any = offerSummeryList
  loadingRouteConfig: boolean = false
  columnsToDisplay = [
    'select',
    "material",
    "plant",
    "bOM",
    "bOMWidth",
    "grade",
    "materialFormat",
    "thickness",
    "width",
    "Length",
    "axis",
    "bundleWeightMin",
    "bundleWeightMax",

  ];
  expandedElement: any;



  //  @ViewChild(MatPaginator) paginator:any= MatPaginator;
  dataSource = new MatTableDataSource<materialCharacteristics>();
  selection = new SelectionModel<materialCharacteristics>(true, []);
  materialList: any = [];
  characteristics: any;
  matCharacteristics: any;
  constructor(
    private fb: FormBuilder,
    private apiString: CitGlobalConstantService,
    private apiMethod: ApiService,
    private router: Router
  ) {
  }
  ngOnInit() {
    // this.dataSource.paginator = this.paginator;\
    this.apiMethod.ee.subscribe((headeEvent: any) => {
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
    this.loadingRouteConfig = true
    let body = {
      "material": "000000000008004809",
      "plant": "DES1"
    }
    // this.apiMethod.post_request(this.apiString.characteristics + '?Material=' + changeValue.material + '&Plant=' + changeValue.plant, '').subscribe((result: any) => {
    this.apiMethod.post_request(this.apiString.characteristics, body).subscribe((result: any) => {
      console.log(result)
      this.loadingRouteConfig = false
      this.characteristics = result
      this.dataSource = new MatTableDataSource<materialCharacteristics>(result);
      this.selection = new SelectionModel<materialCharacteristics>(true, []);
    }, error => {
      this.loadingRouteConfig = false
      this.apiMethod.popupMessage('error', "Error While fatching the characteristics")
    })
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
      this.apiMethod.clickEvent({
        type: 'next',
        value: JSON.stringify(this.matCharacteristics)
      })
      this.router.navigate(['/offer/offer-summary'])
    }
  }
}
