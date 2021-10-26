import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { DataService } from '../../../services/data.service';
import { TaskService } from '../../../services/task.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})  
export class TestComponent implements OnInit {
  //product inputs
  prodName: any;
  prodDesc: any;
  prodQty: any;
  prodPrice: any;
  prodSupp: any;
  prodImg: any;

  idArchive: any;

  constructor(
    private task: TaskService,
    private route: ActivatedRoute,
    private router: ActivatedRoute,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.itemData();
  }
  
  a: any;
  //lists: List[] = [];
  pushItemData: any = {};
  itemData() {
    console.log(this.task.getAllItem().subscribe((data: any) => this.a = data));
    this.task.getAllItem()
      .subscribe((a: any) => {
        this.a = a;
        
        console.log(this.a);

      }); 
  }

  itemAdd() {
    this.pushItemData.name = this.prodName;
    this.pushItemData.description = this.prodDesc;
    this.pushItemData.quantity = this.prodQty;
    this.pushItemData.price = this.prodPrice;
    this.pushItemData.image = this.prodImg;
    this.pushItemData.supplier = this.prodSupp;
    this.pushItemData.isArchive = 0;
    //this.pushItemData = timeStamp();
    console.log(this.pushItemData);
    this.task.createItem(this.pushItemData).subscribe((data: any) => {
      this.a = data;
      console.log(this.a);
      this.itemData()
      this.clearForm();
    });
  }
  
  
  itemArchive(i:any){
    console.log(i);
    this.idArchive = i;
    this.task.archiveItem(this.idArchive, {"isArchive": 1}).subscribe((data: any) => {

    })
  }

  //modal
  itemView(i: any){ 
    console.log(i);
      const dialogRef = this.dialog.open(ViewComponent, {
        width: '50%',
        data: i
      });
    }

  itemUpdate(i: any){
  const dialogRef2 = this.dialog.open(EditComponent, {
    width: '50%',
    data: i
   });
  }

  clearForm(){
    this.prodName = '';
    this.prodDesc = '';
    this.prodQty = '';
    this.prodPrice = '';
    this.prodSupp = '';
    this.prodImg = '';
  }

  
}
