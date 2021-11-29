import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { GalleryServiceService } from 'src/app/services/gallery-service.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null):boolean {
  const isSubmitted = form && form.submitted;
  return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})  
export class TestComponent implements OnInit {
  //gallerytry
  galleryForm!: FormGroup;
  imageFile!: File;
  imageTitle = '';
  imageDesc = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  //product inputs
  prodName: any;
  prodDesc: any;
  prodQty: any;
  prodPrice: any;
  prodSupp: any;
  prodImg: any;

  pcAmount: any;
  pcDate: any;

  idArchive: any;

  constructor(
    private dataService: DataService,
    private galleryService: GalleryServiceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.itemData();
    this.getAllPettyCash();
    this.galleryForm = this.formBuilder.group({
      imageFile : [null, Validators.required],
      imageTitle : [null, Validators.required],
      imageDesc : [null, Validators.required]
    });
  }

  // onFormSubmit(): void {
  //   this.isLoadingResults = true;
  //   this.galleryService.addGallery(this.galleryForm.value, this.galleryForm.get('imageFile').value._files[0])
  //     .subscribe((res: any) => {
  //       this.isLoadingResults = false;
  //       if (res.body) {
  //         this.router.navigate(['', res.body._id]);
  //       }
  //     })
  // }
  
  payload: any;
  //lists: List[] = [];
  pushItemData: any = {};
  itemData() {
    console.log(this.dataService.getAllItem('inventories').subscribe((data: any) => this.payload = data));
    this.dataService.getAllItem('inventories')
      .subscribe((data: any) => {
        this.payload = data;
        
        console.log(this.payload);

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
    console.log(this.pushItemData[0]);
    this.dataService.createItem('inventories', this.pushItemData).subscribe((data: any) => {
      this.payload = data;
      console.log(this.payload);
      this.itemData()
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
          console.log(data);
        });
        this.itemData();
      }
    })
    //this.itemData();
  }

  //modal
  itemView(i: any){ 
    console.log(i);
      const dialogRef = this.dialog.open(ViewComponent, {
        width: '50%',
        data: i
      });

      dialogRef.afterClosed().subscribe(() => this.itemData());
    }

  itemUpdate(i: any){
  const dialogRef2 = this.dialog.open(EditComponent, {
    width: '50%',
    data: i
   });

   dialogRef2.afterClosed().subscribe(() => this.itemData());
  }

  clearForm(){
    this.prodName = '';
    this.prodDesc = '';
    this.prodQty = '';
    this.prodPrice = '';
    this.prodSupp = '';
    this.prodImg = '';
  }
  pushPettyCash: any = {};
  itemAddPettyCash(){
    this.pushPettyCash.pet_amount = this.pcAmount;
    this.pushPettyCash.pet_date = this.pcDate;
    this.pushPettyCash.isArchive = 0;
    console.log(this.pushPettyCash);
    this.dataService.createItem('pettycash', this.pushPettyCash).subscribe(( data: any) => {
      this.payload = data;
      this.getAllPettyCash();
    });
  }
  payloadPetty: any;
  getAllPettyCash(){
    this.dataService.getAllItem('pettycash').subscribe(( data : any) => {
      this.payloadPetty = data;
      console.log(this.payloadPetty);
    });
  }
}