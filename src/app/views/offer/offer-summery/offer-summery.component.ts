import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CitGlobalConstantService } from 'src/app/services/api-collection';
import { ApiService } from 'src/app/services/api.service';
import { offerSummeryList } from '../../../../assets/dummy-data/offer-summery';
import { offerSummery } from '../offer-interface';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  columnsToDisplay: any = [];
  expandedElement: any = null;
  displayedColumns: string[] = [
    'select',
    'item',
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

  extrasColumns1: string[] = ['code', 'description', 'amount']
  extrasColumns2: string[] = ['code', 'description', 'amount']
  extrasColumns3: string[] = ['code', 'description', 'amount']
  processingExtras: any = [
    {
      code: 'ZV80',
      description: 'Extra Slitting',
      amount: '12'
    }
  ]
  millExtras: any = [
    {
      code: 'ZV80',
      description: 'Extra Slitting',
      amount: '12'
    }
  ]
  transportExtras: any = [
    {
      code: 'ZV80',
      description: 'Extra Slitting',
      amount: '12'
    }
  ]
  //  @ViewChild(MatPaginator) paginator:any= MatPaginator;
  dataSource = new MatTableDataSource<offerSummery>();
  selection = new SelectionModel<offerSummery>(true, []);
  materialList: any = [];
  offerSummery: any = [];
  offerSummeryOldRecord: any = []
  offerSummayForm: any = FormGroup
  constructor(
    private fb: FormBuilder,
    private apiString: CitGlobalConstantService,
    private apiMethod: ApiService,
    private router: Router
  ) {
  }
  ngOnInit() {

    this.apiMethod.newOffer.subscribe((headeEvent: any) => {
      this.offerSummery = (headeEvent.value)
      console.log(this.offerSummery, 'TEST')
      localStorage.setItem('offerSummery', JSON.stringify(headeEvent.value))
    });
    setTimeout(() => {
      if (localStorage.getItem('offerSummery')) {
        let localData: any = localStorage.getItem('offerSummery')
        this.offerSummery = JSON.parse(localData)
        this.getOfferSummery(this.offerSummery)
        console.log(this.offerSummery)
      } else {
        this.getOfferSummery(this.offerSummery)

      }
    })
    this.offerSummayForm = this.fb.group({
      "BOM": ['', Validators.required],
      "BOM_Width": ['', Validators.required],
      "Grade": ['', Validators.required],
      "Material_Format": ['', Validators.required],
      "Thickness": ['', Validators.required],
      "Width": ['', Validators.required],
      "Length": ['', Validators.required],
      "Axis": ['', Validators.required],
      "PGL_Base_Price": ['', Validators.required],
      "Proposed_Price": ['', Validators.required],
      "Volume": ['', Validators.required],
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
  getOfferSummery(changeValue: any) {
    console.log(this.offerSummery)
    this.loadingRouteConfig = true
    let that = this
    that.columnsToDisplay.push('item')
    Object.keys(this.offerSummery.pricing[0])
      .forEach(function eachKey(key) {
        that.columnsToDisplay.push(key);
      });
    this.offerSummayForm.patchValue({
      "BOM": changeValue?.selectedMaterials[0]?.BOM_raw_material,
      "BOM_Width": changeValue?.selectedMaterials[0]?.BOM_Width,
      "Grade": changeValue?.selectedMaterials[0]?.Grade,
      "Material_Format": changeValue?.selectedMaterials[0]?.Material_Format,
      "Thickness": changeValue?.selectedMaterials[0]?.Total_thickness_mm,
      "Width": changeValue?.selectedMaterials[0]?.Width_max,
      "Length": changeValue?.selectedMaterials[0]?.Length_max_mm?.one,
      "Axis": changeValue?.selectedMaterials[0]?.Axis,
      "PGL_Base_Price": changeValue?.selectedMaterials[0]?.Calculated_weight_pce_max,


    })
    this.dataSource = new MatTableDataSource<offerSummery>(changeValue.pricing);
    this.selection = new SelectionModel<offerSummery>(true, []);
    this.loadingRouteConfig = false
  }
  getName(value: any) {
    return value.replace(/_/g, ' ').trim()
  }
  selectedMaterials(event: any, data: any) {
    console.log(event, data)
  }
  roundUp(value:any){
    if(Number(value)){
    return Math.round(value)
    }else{
      return value
    }
  }
}
