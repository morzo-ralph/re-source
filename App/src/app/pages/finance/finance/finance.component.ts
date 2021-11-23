import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { ChartType, Row } from 'angular-google-charts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
import { AddRevenuesComponent } from './add-revenues/add-revenues.component';
import { EditRevenuesComponent } from './edit-revenues/edit-revenues.component';
import { EditExpensesComponent } from './edit-expenses/edit-expenses.component';
import { DataService } from '../../../services/data.service';
import { Data } from '@angular/router';
import { AddPettyCashComponent } from './add-petty-cash/add-petty-cash.component';



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
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.load();
    this.getPettyCash();
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
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //FUNCTIONS
  pettyCashPayload: any;
  pettyCashData: PettyCashData[] = [];
  pettyCashDataSource = new MatTableDataSource(this.pettyCashData);
  pettyCashDisplayedColumns = ['_id', 'pet_amount', 'pet_date', 'actions'];

  getPettyCash() {
    this.dataService.getAllItem('pettycash').subscribe(( data : any) => {
      this.pettyCashPayload = data;
      console.log(this.pettyCashPayload);
      this.pettyCashData = this.pettyCashPayload;
      this.pettyCashDataSource.data = this.pettyCashPayload;
    // this.dataService.getAllItem("pettycash").subscribe((data: any) => {
    //   console.log(this.pettyCashPayload);
    //   this.pettyCashData = this.pettyCashPayload;
    //   this.pettyCashDataSource.data = this.pettyCashPayload;
    });
  }

  addPettyCash() {
    const dialogRef = this.matDialog.open(AddPettyCashComponent, {
      height: '75%',
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(() => null );
    this.getPettyCash();
  }

  viewPettyCash(_id: any) {
    console.log(_id);
  }
  editPettyCash(_id: any) {}
  archivePettyCash(_id: any) {}



  revenuesPayload: any;
  revenuesData: RevenuesData[] = [];
  revenuesDataSource = new MatTableDataSource(this.revenuesData);

  getRevenues() {
    this.dataService.getAllItem("revenues").subscribe((data: any) => this.revenuesPayload = data);
    console.log(this.revenuesPayload);
    this.revenuesData = this.revenuesPayload;
    this.revenuesDataSource.data = this.revenuesData;     

  }


//  console.log(this.dataService.getAllItem('inventories').subscribe((data: any) => this.payload = data));
//this.dataService.getAllItem('inventories')
//  .subscribe((data: any) => {
//    this.payload = data;

//    console.log(this.payload);


  //Arguments

  dynamicResize = true;

  //DATA

  title = 'Revenues for the past 4 years';
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
         title: ''
      },
   }; 

   //CashBalance
   titleBalance = "Cash Balance";
   typeBalance = ChartType.Bar;
   chartColumnsBalance = ["Cash", "Balance"];
   dataBalance = [
    ["2017",  15000],
    ["2018",  14000],
    ["2019",  16000],
    ["2020",  17500]
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

   

   addExpenses(){
    const dialogRef = this.matDialog.open(AddExpensesComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(() => null );
   }
   
}
