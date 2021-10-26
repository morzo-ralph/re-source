import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  editItem: any;

  prodId: any;
  prodName: any;
  prodDesc: any;
  prodQty: any;
  prodPrice: any;
  prodSupp: any;
  prodImg: any;

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

  updateItem(){
    
  }

}
