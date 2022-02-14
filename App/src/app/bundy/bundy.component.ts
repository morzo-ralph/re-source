import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { ChartType, Row } from 'angular-google-charts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LibraryService } from 'src/app/services/library.service';
import Swal from 'sweetalert2';
import { Data } from '@angular/router';
import { DatePipe } from '@angular/common';

export interface Employees_Data {
  number: number;
  _id: string;
  id: string;
  name: string;
  position: string;
}

const EMP_DATA: Employees_Data[] = [
  { number: 1, _id: '1111', id: '1111', name: "John Doe", position: 'admin' },
  { number: 2, _id: '2222', id: '2222', name: "Jobs Steve", position: 'admin' },
  { number: 1, _id: '3333', id: '3333', name: "John Doe", position: 'admin' },
  { number: 2, _id: '4444', id: '4444', name: "Jobs Steve", position: 'admin' },
];

@Component({
  selector: 'app-bundy',
  templateUrl: './bundy.component.html',
  styleUrls: ['./bundy.component.scss']
})
export class BundyComponent implements OnInit {

  constructor(public datepipe: DatePipe,) { }

  ngOnInit(): void {

    this.load();  
    
  }

  isLoaded: boolean = false

  async load() {
    this.isLoaded = false
    await this.delay(1000)
    //Event Loop Starts Here

    this.getTime();
    this.loadSample();
    this.getEmployees();

    //Event Loop Ends Here
    this.isLoaded = true
    console.log(this.isLoaded)
    /*this.activeReload()*/
  }

  //async activeReload() {

  //  await this.delay(1000);

  //  this.getEmployees();

  //  this.activeReload();

  //}



//  export interface Employees_Data {
//  number: number;
//  id: string;
//  name: string;
//  position: string;
//  status: string;
//}

  employeesPayload: any;
  employeesData: Employees_Data[] = [];
  employeesDataSource = new MatTableDataSource(this.employeesData);
  employeesDisplayedColumns = ['number','name', 'position', 'status', 'time'];

  employeesIdArchive: any;

  loadSample() {
    this.employeesData = EMP_DATA;
  }

  getEmployees() {

    this.employeesDataSource.data = this.employeesData;

    //this.dataService.getAllItem('inventories')
    //  .subscribe((data: any) => {
    //    console.log(data);
    //    this.inventoriesPayload = data;
    //    this.inventoriesData = this.inventoriesPayload;
    //    this.inventoriesDataSource.data = this.inventoriesPayload;
    //  });
  }

  clockInID: any;

  checkStatus(id: any) {
    var status
    if (localStorage.getItem(id) !== null) {
      status = 1
    }
    else {
      status = 0
    }
    return (status)
  }

  clockIn() {

    let employeesdata = this.employeesData;
    for (var data of employeesdata) {
      if (data.id == this.clockInID) {

        if (this.checkStatus(this.clockInID) == 0) {
          localStorage.removeItem(this.clockInID);
          localStorage.setItem(this.clockInID, this.date);
        }
        else if (this.checkStatus(this.clockInID) == 1)
        {

          //PUSH TO ATTENDANCE

          localStorage.removeItem(this.clockInID);
        }
      }    
    }

    
    this.clockInID = null;

    /*localStorage.setItem(this.clockInID, );*/

    /*localStorage.setItem(this.clockInID, this.clockInID.toString(this.timeinhours + this.timeinminutes));*/
  }

  getClockIn(id: any) {
    return (localStorage.getItem(id));
  }

  getTimeIn(time: any) {

    var oldTime = new Date(time);
    var timeNow = new Date();

    var newTime = Math.abs(oldTime.getTime() - timeNow.getTime());

    var newTimeinSeconds = newTime / 1000;
    var newTimeinMinutes = newTimeinSeconds / 60;
    var newTimeinHours = newTimeinMinutes / 60;

    //var timeInMinutes = this.datepipe.transform(time, "hh");
    //var timeInSeconds= this.datepipe.transform(time, "ss")
    return (Math.floor(newTimeinHours) + ":" + Math.floor(newTimeinMinutes % 60) + ":" + Math.floor(newTimeinSeconds % 60)) ;
  }



  timeinhours!: any
  timeinminutes!: any
  timeinseconds!: any
  timeinmeri!: any
  day!: any
  date!: any

  async getTime() {
    while (true) {
      this.date = new Date
      this.day = this.datepipe.transform(this.date, "fullDate")
      this.timeinhours = this.datepipe.transform(this.date, "hh")
      this.timeinminutes = this.datepipe.transform(this.date, "mm")
      this.timeinseconds = this.datepipe.transform(this.date, "ss")
      this.timeinmeri = this.datepipe.transform(this.date, "a")
      await this.delay(1000)
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
