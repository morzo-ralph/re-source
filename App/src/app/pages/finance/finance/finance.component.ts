import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { ChartType, Row } from 'angular-google-charts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LibraryService } from 'src/app/services/library.service';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
import { AddRevenuesComponent } from './add-revenues/add-revenues.component';
import { EditRevenuesComponent } from './edit-revenues/edit-revenues.component';
import { EditExpensesComponent } from './edit-expenses/edit-expenses.component';
import { Data } from '@angular/router';
import { AddPettyCashComponent } from './add-petty-cash/add-petty-cash.component';
import { ViewPettyCashComponent } from './view-petty-cash/view-petty-cash.component';
import { EditPettyCashComponent } from './edit-petty-cash/edit-petty-cash.component';
import Swal from 'sweetalert2';
import { ViewRevenuesComponent } from './view-revenues/view-revenues.component';
import { ViewExpensesComponent } from './view-expenses/view-expenses.component';



export interface RevenuesData {
  _id: string;
  rev_date: Date;
  rev_desc: string;
  rev_by: string;
  rev_amount: number;

  isArchive: number;
  created_at: Date;
  updated_at: Date;
}

export interface PettyCashData {
  _id: string;
  pet_date: Date;
  pet_amount: number;

  isArchive: number;
  created_at: Date;
  updated_at: Date;
}

export interface ExpensesData {
  _id: string;
  exp_date: Date;
  exp_desc: string;
  exp_by: string;
  exp_amount: number;

  isArchive: number;
  created_at: Date;
  updated_at: Date;
}

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit{
  constructor
  (
    private matDialog: MatDialog,
    private dataService: DataService,
    private libraryService: LibraryService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.load();
    this.getPettyCash();
    this.getRevenues();
    this.getExpenses();
    /*this.dataSource.paginator = this.paginator;*/
  }

  //OOP

  isLoaded: boolean = false
  async load() {
    this.isLoaded = false
    await this.delay(1000)
    //Event Loop Starts Here

    this.getRevenues();

    this.isLoaded = true
    //Event Loop End Here
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //FUNCTIONS
  pettyCashPayload: any;
  pettyCashData: PettyCashData[] = [];
  pettyCashDataSource = new MatTableDataSource(this.pettyCashData);
  pettyCashDisplayedColumns = ['_id', 'pet_amount', 'pet_date', 'actions'];
  pettyCashIdArchive: any;

  getPettyCash() {
    this.dataService.getAllItem('pettycash').subscribe(( data : any) => {
      this.pettyCashPayload = data;
      console.log(this.pettyCashPayload);
      this.pettyCashData = this.pettyCashPayload;
      this.pettyCashDataSource.data = this.pettyCashPayload;
    });
  }

  addPettyCash() {
    const dialogRef = this.matDialog.open(AddPettyCashComponent, {
      height: '75%',
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(() => this.getPettyCash());
  }

  viewPettyCash(pettyCash: any) {
    const dialogRef = this.matDialog.open(ViewPettyCashComponent, {
      height: '75%',
      width: '100%',
      data: pettyCash
    });

    dialogRef.afterClosed().subscribe(() => this.getPettyCash() );
  }
  
  editPettyCash(pettyCash: any) {
    const dialogRef = this.matDialog.open(EditPettyCashComponent, {
      height: '75%',
      width: '100%',
      data: pettyCash
    });

    dialogRef.afterClosed().subscribe(() => this.getPettyCash() );
  }

  archivePettyCash(_id: any) {
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
        this.pettyCashIdArchive = _id;
        this.dataService.archiveItem('pettycash', this.pettyCashIdArchive, {"isArchive": 1}).subscribe((data: any) => {
          console.log(data);
        });
        this.getPettyCash();
      }
    })
  }

  //revenues
  revenuesPayload: any;
  revenuesData: RevenuesData[] = [];
  revenuesDataSource = new MatTableDataSource(this.revenuesData);

  revenuesDisplayedColumns = ['_id', 'rev_date', 'rev_amount', 'rev_desc', 'rev_by', 'actions'];
  revenuesDataIsArchived: any;

  getRevenues() {
    this.dataService.getAllItem("revenues").subscribe((data: any) => {
      this.revenuesPayload = data
      console.log(this.revenuesPayload);
      this.revenuesData = this.revenuesPayload;
      this.revenuesDataSource.data = this.revenuesData;  
    });
  }

  addRevenues() {
    const dialogRef = this.matDialog.open(AddRevenuesComponent, {
      height: '75%',
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(() => this.getRevenues());
  }

  viewRevenues(revenues: any) {
    const dialogRef = this.matDialog.open(ViewRevenuesComponent, {
      height: '75%',
      width: '100%',
      data: revenues
    });

    dialogRef.afterClosed().subscribe(() => this.getRevenues() );
  }
  
  editRevenues(revenues: any) {
    const dialogRef = this.matDialog.open(EditRevenuesComponent, {
      height: '75%',
      width: '100%',
      data: revenues
    });

    dialogRef.afterClosed().subscribe(() => { this.getRevenues()} );
    //this.getRevenues(), this.load()
  }

  archiveRevenues(_id: any) {
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
          'Archived!',
          'Your file has been archived.',
          'success'
        )
        this.revenuesDataIsArchived = _id;
        this.dataService.archiveItem('revenues', this.revenuesDataIsArchived, {"isArchive": 1}).subscribe((data: any) => {
          console.log(data);
        });
        this.getRevenues();
      }
    })
  }

  //expenses
  expensesPayload: any;
  expensesData: ExpensesData[] = [];
  expensesDataSource = new MatTableDataSource(this.expensesData);
  expensesDisplayedColumns = ['_id', 'exp_date', 'exp_amount', 'exp_desc', 'exp_by', 'actions'];
  expensesDataIsArchived: any;

  getExpenses() {
    this.dataService.getAllItem("expenses").subscribe((data: any) => {
      this.expensesPayload = data;
      console.log(this.expensesPayload);
      this.expensesData = this.expensesPayload;
      this.expensesDataSource.data = this.expensesData;  
    });
  }

  addExpenses() {
    const dialogRef = this.matDialog.open(AddExpensesComponent, {
      height: '75%',
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(() => this.getExpenses());
  }

  viewExpenses(expenses: any) {
    const dialogRef = this.matDialog.open(ViewExpensesComponent, {
      height: '75%',
      width: '100%',
      data: expenses
    });

    dialogRef.afterClosed().subscribe(() => this.getExpenses() );
  }
  
  editExpenses(expenses: any) {
    const dialogRef = this.matDialog.open(EditExpensesComponent, {
      height: '75%',
      width: '100%',
      data: expenses
    });

    dialogRef.afterClosed().subscribe(() => this.getExpenses() );
  }

  archiveExpenses(_id: any) {
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
          'Archived!',
          'Your file has been archived.',
          'success'
        )
        this.expensesDataIsArchived = _id;
        this.dataService.archiveItem('expenses', this.expensesDataIsArchived, {"isArchive": 1}).subscribe((data: any) => {
          console.log(data);
        });
        this.getExpenses();
        this.load();
      }
    })
  }


  dynamicResize = true;

  //DATA

  title = 'Revenues for the past past months';
  myType = ChartType.LineChart;
  data = [
      ["2017",  15000, 15000],
      ["2018",  14000, 13000],
      ["2019",  16000, 18000],
      ["2020",  17500, 17000]
   ];
   chartColumns = ["Revenues", "Net Income", "Revenue"];
   options = {   
      hAxis: {
         title: 'Month'
      },
      vAxis:{
         title: 'Cash'
      },
   }; 

   //CashBalance
   titleBalance = "Cash Balance";
   typeBalance = ChartType.Bar;
   chartColumnsBalance = ["Months", "Revenue", "Expenses"];
   dataBalance = [
     ["Jan",  15000, 12000],
     ["Feb", 14000, 12000],
     ["March", 16000, 12000],
     ["April", 17500, 12000],
     ["May", 17500, 12000],
     ["June", 17500, 12000],
     ["Junly", 17500, 12000],
   ];

   //Sales
   titleSales = "Sales";
   typeSales = ChartType.Bar;
   chartColumnsSales = ["Cash", "AR", "AP"];
   dataSales = [
    ["2017",  5, 6],
    ["2018",  6, 5],
    ["2019",  8, 4],
    ["2020",  9, 3]
   ];

   //table
    displayedColumns: string[] = ['Description', 'Amount', 'Date', 'Noted By', 'Actions'];
   
}
