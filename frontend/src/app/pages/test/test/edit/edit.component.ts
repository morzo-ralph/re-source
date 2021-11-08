import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private task: TaskService,

  ) { }

  editItem: any;

  prodId: any;
  prodName: any;
  prodDesc: any;
  prodQty: any;
  prodPrice: any;
  prodSupp: any;
  prodImg: any;

  updatePushItem: any = {};
  id: any;

  ngOnInit(): void {
    this.editItem = this.data
    this.prodId =  this.editItem._id;
    this.prodName = this.editItem.name
    this.prodDesc = this.editItem.description
    this.prodQty = this.editItem.quantity
    this.prodPrice = this.editItem.price
    this.prodSupp = this.editItem.supplier
    this.prodImg = this.editItem.image
  }

  getItem(){
    this.id = this.editItem._id;

    //this.getItem().subscribe((data: any)=> {});
  }

  updateItem(){
    console.log(this.prodId);
    this.id =  this.prodId;
    this.updatePushItem.name = this.prodName;
    this.updatePushItem.description = this.prodDesc;
    this.updatePushItem.quantity = this.prodQty;
    this.updatePushItem.price = this.prodPrice;
    this.updatePushItem.supplier = this.prodSupp;
    this.updatePushItem.image = this.prodImg;

    console.log(this.updatePushItem.name);
    //console.log('clicked')
    this.task.updateItem(this.id, this.updatePushItem).subscribe((data: any) =>
    {
      
    });
    
  }

}
