import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss']
})
export class ViewItemComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dataService: DataService,
    private dialogRef: MatDialogRef<ViewItemComponent>
  ) { }

  number: any;
  itemName: any;
  itemDesc: any;
  itemQty: any;
  itemPrice: any;
  itemIsArchive: any;
  
  sellQty: any;

  ngOnInit(): void {
    this.number = this.data.number
    this.itemName = this.data.name
    this.itemDesc = this.data.description
    this.itemQty = this.data.quantity
    this.itemPrice= this.data.price
    this.itemIsArchive = this.data.isArchive
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateItem() {

  }

  archiveItem() {

  }

  restoreItem() {

  }

  sellItem() {
    this.sellQty
  }
  
}
