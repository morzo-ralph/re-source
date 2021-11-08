import { Component, OnInit } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { ChartType, Row } from 'angular-google-charts';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
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
   dynamicResize = true;


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
   //dynamicResize = true;

   //table
   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

}
