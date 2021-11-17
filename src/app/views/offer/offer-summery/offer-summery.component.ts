import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CitGlobalConstantService } from 'src/app/services/api-collection';
import { ApiService } from 'src/app/services/api.service';
import { offerSummeryList } from '../../../../assets/dummy-data/offer-summery';
import { offerSummery } from '../offer-interface';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-offer-summery',
  templateUrl: './offer-summery.component.html',
  styleUrls: ['./offer-summery.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),

  ],
})
export class OfferSummeryComponent implements OnInit {
  data: any = offerSummeryList
  loadingRouteConfig: boolean = false
  columnsToDisplay = [
    'select',
    'Item',
    'Plant',
    'Material_Number',
    'Applicable_PGL_Base_Price',
    'Total_mill_Extra',
    'Total_Processing_Extra',
    'Total_Transport_Extra',
    'Total_Effective_Extra',
    'Proposed_Price',
    'Volume_Offered_In_Tonnes',
    'PCR_Price',
    'Gap_With_Applicable_PGL_Base_Price'
  ];
  expandedElement: any = null;
  displayedColumns: string[] = [
    'select',
    'Item',
    'Plant',
    'Material_Number',
    'Applicable_PGL_Base_Price',
    'Total_mill_Extra',
    'Total_Processing_Extra',
    'Total_Transport_Extra',
    'Total_Effective_Extra',
    'Proposed_Price',
    'Volume_Offered_In_Tonnes',
    'PCR_Price',
    'Gap_With_Applicable_PGL_Base_Price'
  ];


  //  @ViewChild(MatPaginator) paginator:any= MatPaginator;
  dataSource = new MatTableDataSource<offerSummery>();
  selection = new SelectionModel<offerSummery>(true, []);
  materialList: any = [];
  characteristics: any;
  offerSummery: any;
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
      this.offerSummery = JSON.parse(headeEvent.value)
      console.log(this.offerSummery, 'TEST')
      localStorage.setItem('matCharacteristics', headeEvent.value)
    });
    setTimeout(() => {
      if (localStorage.getItem('matCharacteristics')) {
        let localData: any = localStorage.getItem('matCharacteristics')
        this.offerSummery = JSON.parse(localData)
        this.getCharacteristics(this.offerSummery)
      } else {
        this.getCharacteristics(this.offerSummery)

      }
    })
  }


  getMaterialsList(soldTo: any) {
    this.loadingRouteConfig = true
    this.apiMethod.post_request(this.apiString.materialList + "?soldto=" + soldTo, '').subscribe(result => {
      console.log(result)
      this.loadingRouteConfig = false
      this.materialList = result
    }, error => {
      this.loadingRouteConfig = false
      this.apiMethod.popupMessage('error', "Error while fatching material list")
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
    this.apiMethod.post_request(this.apiString.characteristics + '?Material=' + changeValue.material + '&Plant=' + changeValue.plant, '').subscribe((result: any) => {
      console.log(result)
      this.loadingRouteConfig = false
      this.characteristics = result
      this.dataSource = new MatTableDataSource<offerSummery>(result);
      this.selection = new SelectionModel<offerSummery>(true, []);
    }, error => {
      this.loadingRouteConfig = false
      this.apiMethod.popupMessage('error', "Error While fatching the characteristics")
    })
  }
}
