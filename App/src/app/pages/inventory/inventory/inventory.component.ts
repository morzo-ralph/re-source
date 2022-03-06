import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { LibraryService } from 'src/app/services/library.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatTable, MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { AddItemComponent } from './add-item/add-item.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

import { ViewItemComponent } from './view-item/view-item.component';
import { MatPaginator } from '@angular/material/paginator';

export interface InventoriesData {
  number: number;
  id: string;
  _id: string;

  name: string;
  description: string;
  quantity: number;
  price: number;
  imageUrl: string

  isArchive: number;
  created_at: Date;
  updated_at: Date;
}

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
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  @Input() tableHeaderTitles!: string[]
  @Input() tableModelRows!: Object[]
  @ViewChild(MatPaginator) paginator !: MatPaginator

  constructor(
    private dataService: DataService,
    private dialog : MatDialog,
    private httpClient: HttpClient,
    private libraryService: LibraryService
  ) { }

  ngOnInit(): void { 
    this.load()
    this.inventoriesDataSource.paginator = this.paginator

    
  }

  //OOP
  isLoaded: boolean = false;

  async load() {
    this.isLoaded = false
    await this.delay(1000)
    //Event Loop Starts Here
    this.getInventories();
    this.getPurchases();
    console.log('limit')    
    this.getInventoriess();
    

    //Event Ends Here
    this.isLoaded = true


  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  
  //obs: Observable<any>;
  pageSize = 10
  lenght : any


  inventoriesPayload: any;
  inventoriesData: InventoriesData[] = [];
  inventoriesDataSource = new MatTableDataSource(this.inventoriesData);
  inventoriesDisplayedColumns = ['name', 'description', 'quantity', 'price', 'imageUrl'];
  inventoriesIdArchive: any;
  itemLength: any;

  getInventories() {
    this.dataService.getAllItem('inventories')
      .subscribe((data: any) => {
        console.log(data);
        this.inventoriesPayload = data;
        this.inventoriesData = this.inventoriesPayload;
        this.inventoriesDataSource.data = this.inventoriesPayload;
        this.itemLength = data.length + 1;
        this.inventoriesDataSource.paginator = this.paginator
        this.lenght = data.lenght
        //dataSource: MatTableDataSource<Card> = new MatTableDataSource<Card>(data);
      });
  }

  
  //page limit
  page: any
  limit: any
  getInventoriess() {
    
    this.dataService.getPost('inventories', this.limit, this.page).subscribe((data: any) => {
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

    dialogRef.afterClosed().subscribe(() => this.getInventories())
    
  }
  
  itemArchive(i:any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        //console.log(i);
        this.idArchive = i;
        this.dataService.archiveItem('inventories', this.idArchive, {"isArchive": 1}).subscribe((data: any) => {
          
        });
        this.getInventories();
      }
    })
    //this.itemData();
  }

  itemView(data: any){ 
    try {
      const dialogRef = this.dialog.open(ViewItemComponent, {
        width: '100%',
        height: '75%',
        data: data
      });

      dialogRef.afterClosed();
      
    } catch (error) {
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





}
