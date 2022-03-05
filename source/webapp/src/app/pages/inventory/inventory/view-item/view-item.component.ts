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

  itemEdit: any = {}

  number: any;
  itemId: any;
  itemName: any;
  itemDesc: any;
  itemQty: any;
  itemPrice: any;
  itemIsArchive: any;
  
  sellQty: any;

  ngOnInit(): void {
    this.itemId = this.data._id
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
    this.itemEdit.name = this.itemName
    this.itemEdit.description = this.itemDesc
    this.itemEdit.quantity = this.itemQty
    this.itemEdit.price = this.itemPrice

    this.dataService.updateItem('inventories',this.itemId, this.itemEdit).subscribe((data : any) => {
      Swal.fire(
        'Item Updated!',
        '',
        'success'
      )
      this.onNoClick();
      console.log(data);
    });
  }

  archiveItem() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes,archive it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Archived!',
            'Your file has been archived.',
            'success'
          )
          //console.log(i);
          //this.itemId = this.;
          this.dataService.archiveItem('inventories', this.itemId, {"isArchive": 1}).subscribe((data: any) => {
            console.log(data);
          });
        }
      })
      this.dialogRef.close();
    }

  kekw() {
    Swal.fire({}).then()
  }

  restoreItem() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, restore it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Item Restored!',
          'Your file has been restored.',
          'success'
        )
        //console.log(i);
        //this.itemId = this.;
        this.dataService.archiveItem('inventories', this.itemId, {"isArchive": 0}).subscribe((data: any) => {
          console.log(data);
        });
      }
    })
    this.dialogRef.close();
  }

  sellItem() {
    this.sellQty
  }
  
}
