import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../../services/data.service';
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
import { catchError } from 'rxjs/operators';

export interface InventoriesData {
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

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private dialog : MatDialog,
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void { 
    this.load();
    this.getInventories();
  }

  //OOP
  isLoaded: boolean = false
  async load() {
    this.isLoaded = false
    await this.delay(1000)
    //Event Loop Starts Here

    this.isLoaded = true
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  inventoriesPayload: any;
  inventoriesData: InventoriesData[] = [];
  inventoriesDataSource = new MatTableDataSource(this.inventoriesData);
  inventoriesDisplayedColumns = [];

  pushItemData: any = {};
  idArchive: any;
  handleError: any;
  getInventories() {
    this.dataService.getAllItem('inventories')
      .subscribe((data: any) => {
        console.log(data);
        this.inventoriesPayload = data;
        this.inventoriesDataSource.data = this.inventoriesPayload;
       }); 
  }

  getImage(imageUrl: string): Observable<any> {
    return this.httpClient.get(imageUrl).pipe(
      catchError(this.handleError));
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
    console.log(data);
      // const dialogRef = this.dialog.open(ViewComponent, {
      //   width: '50%',
      //   data: i
      // });

      // dialogRef.afterClosed().subscribe(() => this.itemData());
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

}
