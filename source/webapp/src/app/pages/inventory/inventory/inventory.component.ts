import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data/dataservice.service';
import { LibraryService } from 'src/app/services/library.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AddItemComponent } from './add-item/add-item.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

import { ViewItemComponent } from './view-item/view-item.component';

import { ConnStatus, Announcement, TaskBoard, Inventories } from 'src/app/services/data/data.model';


import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, rubberBandAnimation } from 'angular-animations';

export interface PurchasesData {
  number: number;
  id: string;
  _id: string;

  purc_date: any;  
  purc_supplier: string;
  purc_price: number;
  purc_quantity: any;
  purc_desc: string;
  purc_by: string;
  purc_amount: number;

  isArchive: number;
  created_at: any;
  updated_at: any;
}

//SAMPLE

const PURC_DATA: PurchasesData[] = [
  { number: 1, id: "2021022", _id: '2021022', purc_date: "2022-01-11T16:00:00.000+00:00", purc_supplier: "any", purc_price: 200, purc_quantity: 200, purc_desc: "Stock", purc_by: "Position", purc_amount: 5000, isArchive: 0, created_at: "20011201", updated_at: "20011201" },
  { number: 1, id: "2021022", _id: '2021022', purc_date: "2022-01-11T16:00:00.000+00:00", purc_supplier: "any", purc_price: 200, purc_quantity: 200, purc_desc: "Stock", purc_by: "Position", purc_amount: 5000, isArchive: 0, created_at: "20011201", updated_at: "20011201" },
  { number: 1, id: "2021022", _id: '2021022', purc_date: "2022-01-11T16:00:00.000+00:00", purc_supplier: "any", purc_price: 200, purc_quantity: 200, purc_desc: "Stock", purc_by: "Position", purc_amount: 5000, isArchive: 0, created_at: "20011201", updated_at: "20011201" }
];


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    rubberBandAnimation(),
  ]
})
export class InventoryComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private dialog : MatDialog,
    private httpClient: HttpClient,
    private libraryService: LibraryService
  ) { }

  ngOnInit(): void { 
    /*this.loadOnstart();*/
    this.loadOnLoop();
  }

  //OOP
  isLoaded: boolean = false;

  //async loadOnstart() {

  //  this.isLoaded = false
  //  await this.delay(1000)
  //  //Event Loop Starts Here
  //  this.getInventories();
  //  this.getPurchases();
    

  //  //Event Ends Here
  //  this.isLoaded = true


  //}

  async loadOnLoop() {

    //Event Loop Starts Here
    this.checkIfMobile();



    //Event Ends Here

    await this.delay(1000);
    this.reloadLoop()
    this.isLoaded = true
  }

  reloadLoop() {
    this.loadOnLoop()
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //check if mobile

  isMobile!: boolean

  checkIfMobile() {
    this.isMobile = this.libraryService.getIsMobile()
  }

  

//  export interface Inventories {

//  _id: string;

//  number: number;
//  id: string;
//  name: string;
//  description: string;
//  quantity: number;
//  price: number;
//  imageUrl: string

//  isArchive: number;
//  created_at: Date;
//  updated_at: Date;

//}

  inventoriesPayload: any;
  inventoriesData: Inventories[] = [];
  inventoriesDataSource = new MatTableDataSource(this.inventoriesData);
  inventoriesDisplayedColumns = ['number', 'name', 'id', 'description', 'quantity', 'price', 'actions'];
  inventoriesIdArchive: any;

  getInventories() {
    this.dataService.getAllItem('inventories')
      .subscribe((data: any) => {
        console.log(data);
        this.inventoriesPayload = data;
        this.inventoriesData = this.inventoriesPayload;
        this.inventoriesDataSource.data = this.inventoriesPayload;
      });
  }

  pushItemData: any = {};
  idArchive: any;
  handleError: any;
  filterValue: any;

  applyFilterInventories(filterValue: string){ 
    // this.filterValue = (event.target as HTMLInputElement).value;     
      this.inventoriesDataSource.filter = filterValue.trim().toLowerCase();
  }



  addItem() {
    // const dialogRef = this.dialog.open(AddItemComponent, {
    //   height: '75%',
    //   width: '100%'
    // });

    // dialogRef.afterClosed().subscribe(() => this.getInventories());
    const dialogRef = this.dialog.open(AddItemComponent, {
      height: '75%',
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(result =>
      {
        this.getInventories()
        console.log(result)
      })
  }

  itemView(data: any){ 
    try {
      const dialogRef = this.dialog.open(ViewItemComponent, {
        width: '100%',
        height: '75%',
        data: data
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getInventories();
        console.log(result)
      })
    }
    catch (error) {
      console.log(error);
    }
      
    }

  itemUpdate(data: any){
  // const dialogRef2 = this.dialog.open(EditComponent, {
  //   width: '50%',
  //   data: i
  //  });

  //  dialogRef2.afterClosed().subscribe(() => this.pullInventories());
  }

  clearForm(){
    // this.prodName = '';
    // this.prodDesc = '';
    // this.prodQty = '';
    // this.prodPrice = '';
    // this.prodSupp = '';
    // this.prodImg = '';
  }

  purchasesPayload: any;
  purchasesData: PurchasesData[] = [];
  purchasesDataSource = new MatTableDataSource(this.purchasesData);
  purchasesDisplayedColumns: string[] = ['number', 'id', 'purc_date', 'purc_supplier', 'purc_price', 'purc_quantity', 'purc_desc', 'purc_by', 'actions'];
  purchasesRecentDisplayedColumns: string[] = ['purc_date', 'purc_desc', 'purc_quantity'];
  purchasesDataIsArchived: any;

  getPurchases() {
    this.purchasesData = PURC_DATA;
    this.purchasesDataSource.data = this.purchasesData;

    //this.dataService.getAllItem("expenses").subscribe((data: any) => {
    //  this.expensesPayload = data;
    //  console.log(this.expensesPayload);
    //  this.expensesData = this.expensesPayload;
    //  this.expensesDataSource.data = this.expensesData;
    //});
  }













  activeDiv: any

  onclickDiv(divId: any) {
    if (this.activeDiv == divId) {
      this.activeDiv = null
    }
    else {
      this.activeDiv = divId;
    }
  }





}
