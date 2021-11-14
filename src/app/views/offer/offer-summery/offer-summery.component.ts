import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CitGlobalConstantService } from 'src/app/services/api-collection';
import { ApiService } from 'src/app/services/api.service';
import { offerSummeryList } from '../../../../assets/dummy-data/offer-summery';
import { offerSummery } from '../offer-interface';
import { SelectionModel } from '@angular/cdk/collections';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 12, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 13, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 14, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 15, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 16, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 17, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 18, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 19, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 20, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 21, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 22, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 23, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 24, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 25, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 26, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 27, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 28, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

/**
 * @title Table with selection
 */

@Component({
  selector: 'app-offer-summery',
  templateUrl: './offer-summery.component.html',
  styleUrls: ['./offer-summery.component.scss']
})
export class OfferSummeryComponent implements OnInit {
  data: any = offerSummeryList
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
  dataSource = new MatTableDataSource<offerSummery>(this.data);
  selection = new SelectionModel<offerSummery>(true, []);

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
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
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */