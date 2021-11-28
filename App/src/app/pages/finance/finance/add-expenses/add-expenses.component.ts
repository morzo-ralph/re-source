import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.scss']
})
export class AddExpensesComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<AddExpensesComponent>
  ) { }

  ngOnInit(): void {
  }
  expensesData: any = {};
  expAmount: any;
  expBy: any;
  expDate: any;
  expDesc: any;

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  addExpenses() {
    this.expensesData.rev_amount = this.expAmount;
    this.expensesData.rev_by =  this.expBy;
    this.expensesData.rev_date = this.expDate;
    this.expensesData.rev_desc = this.expDesc;
    this.expensesData.isArchive = 0;
    this.dataService.createItem('expenses', this.expensesData).subscribe(( data: any) => {
      Swal.fire(
        'Item Added!',
        '',
        'success'
      )
      this.dialogRef.close();
      console.log(data)
    });
  }

}

