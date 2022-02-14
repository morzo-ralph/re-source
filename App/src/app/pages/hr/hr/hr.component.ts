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

export interface Attendance_Data {
  number: number;
  _id: string;
  id: string;
  name: string;
  attendance_date: string;
  attendance_hours: number;
}

const EMP_DATA: Employees_Data[] = [
  { number: 1, _id: '1111', id: '1111', name: "John Doe", position: 'admin' },
  { number: 2, _id: '2222', id: '2222', name: "Jobs Steve", position: 'admin' },
  { number: 1, _id: '3333', id: '3333', name: "John Doe", position: 'admin' },
  { number: 2, _id: '4444', id: '4444', name: "Jobs Steve", position: 'admin' },
];

const ATT_DATA: Attendance_Data[] = [
  { number: 1, _id: '1111', id: '1111', name: "John Doe", attendance_date: '2022-02-11T16:00:00.000+00:00', attendance_hours: 8},
  { number: 2, _id: '2222', id: '2222', name: "Jobs Steve", attendance_date: '2022-02-11T16:00:00.000+00:00', attendance_hours: 8},
  { number: 3, _id: '3333', id: '3333', name: "John Doe", attendance_date: '2022-02-11T16:00:00.000+00:00', attendance_hours: 8},
  { number: 4, _id: '4444', id: '4444', name: "Jobs Steve", attendance_date: '2022-02-11T16:00:00.000+00:00', attendance_hours: 8},
];


@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.scss']
})
export class HrComponent implements OnInit {

  constructor(private library: LibraryService) { }

  ngOnInit(): void {
    this.load()
  }

  isLoaded: boolean = false

  async load() {
    this.isLoaded = false
    await this.delay(1000)
    //Event Loop Starts Here
    this.getDays()
    this.getMonths()
    this.fillAttendanceTable()

    this.getEmployees();
    this.getAttendance()

    //Event Loop Ends Here
    this.isLoaded = true
    console.log(this.isLoaded)
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  employeesPayload: any;
  employeesData: Employees_Data[] = [];
  employeesDataSource = new MatTableDataSource(this.employeesData);
  employeesDisplayedColumns = ['number', 'id', 'name', 'position', 'status', 'actions'];

  employeesIdArchive: any;

  getEmployees() {

    this.employeesData = EMP_DATA;
    this.employeesDataSource.data = this.employeesData;
    

  }


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



  //empDataSource = EMP_DATA;

  //employeesPayload: any;
  //employeesData: Employees_Data[] = [];
  //employeesDataSource = new MatTableDataSource(this.employeesData);
  //employeesDisplayedColumns = ['number', 'id', 'name', 'position', 'status', 'actions'];

 
  /*attendanceDataSource = ATT_DATA;*/


  attendancePayload: any;
  attendanceData: Attendance_Data[] = [];
  attendanceDataSource = new MatTableDataSource(this.attendanceData); 

  attendanceIdArchive: any;
  attendanceDisplayedColumns: string[] = [];

  getAttendance() {

    this.attendanceData = ATT_DATA;
    this.attendanceDataSource.data = this.attendanceData;
    

  }

  dateMatch(date: any) {

  }

  getDate() {
    return this.library.getDate("EEEE, MMMM d, y")
  }

  getMonth() {
    return Number(this.library.getDate("M")) - 1
  }

  getLastDate() {
    return this.library.getLastDayofMonth(this.getMonth())
  }

  daysArray: string[] = []

  getDays() {
    this.daysArray = this.library.generateDaysArray(this.getMonth())
  }

  monthsArray: string[] = []

  getMonths() {
    this.monthsArray = this.library.generateMonthsArray()
    console.log(this.monthsArray)
  }

  fillAttendanceTable() {
    this.attendanceDisplayedColumns = []
    this.attendanceDisplayedColumns.push("name")
    this.attendanceDisplayedColumns = this.attendanceDisplayedColumns.concat(this.daysArray)
    this.attendanceDisplayedColumns.push("total")
  }


}
