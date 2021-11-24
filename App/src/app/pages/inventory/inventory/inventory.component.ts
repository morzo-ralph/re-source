import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GalleryServiceService } from 'src/app/services/gallery-service.service';
import Swal from 'sweetalert2';
import { MatTable, MatTableDataSource } from '@angular/material/table';

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
  getInventories() {
    this.dataService.getAllItem('inventories')
      .subscribe((data: any) => {
        console.log(data);
        this.inventoriesPayload = data;
        this.inventoriesDataSource.data = this.inventoriesPayload;
       }); 
  }

  itemAdd() {
    // this.pushItemData.name = this.prodName;
    // this.pushItemData.description = this.prodDesc;
    // this.pushItemData.quantity = this.prodQty;
    // this.pushItemData.price = this.prodPrice;
    // this.pushItemData.image = this.prodImg;
    // this.pushItemData.supplier = this.prodSupp;
    this.pushItemData.isArchive = 0;
    //this.pushItemData = timeStamp();
    console.log(this.pushItemData[0]);
    this.dataService.createItem('inventories', this.pushItemData).subscribe((data: any) => {
      this.inventoriesPayload = data;
      this.getInventories()
      this.clearForm();
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

  itemView(i: any){ 
    console.log(i);
      // const dialogRef = this.dialog.open(ViewComponent, {
      //   width: '50%',
      //   data: i
      // });

      // dialogRef.afterClosed().subscribe(() => this.itemData());
    }

  itemUpdate(i: any){
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
