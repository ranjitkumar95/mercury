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

@Component({
  selector: 'app-offer-summery',
  templateUrl: './offer-summery.component.html',
  styleUrls: ['./offer-summery.component.scss']
})
export class OfferSummeryComponent implements OnInit {
  displayedColumns: string[] = [
    'Item',
    'Plant',
    'Material_Number',
    'BOM',
    'BOM_Width',
    'Material_Format',
    'Thickness',
    'Width',
    'Length',
    'Axis',
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
  dataSource: any;
  searchValue: any
  offerSummery: any = offerSummeryList;
  pageEvent: any = PageEvent;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  pageLength: any = 10;
  pageOffset: any = 0;
  totalCount: any = 0;
  constructor(
    private apiString: CitGlobalConstantService,
    private apiMethod: ApiService,
    private router: Router
  ) {

  }
  ngOnInit() {
    this.getOfferSummery()
  }
  getOfferSummery() {
    console.log(this.offerSummery)
    this.dataSource = new MatTableDataSource<offerSummery>(this.offerSummery)
    this.apiMethod.get_request(this.apiString.OfferSummeryList).subscribe((result: any) => {
      console.log(result)
      this.dataSource = new MatTableDataSource<offerSummery>(result.data)
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }, error => {
      console.log(error)
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}