import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { ChartType, Row } from 'angular-google-charts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

import Swal from 'sweetalert2';
import { Data } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ConnStatus, Announcement, Employee, TaskBoard, Inventories, Attendance } from 'src/app/services/data/data.model';


import { LibraryService } from 'src/app/services/library.service';


import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';





const ATT_DATA: Attendance[] = [
  { number: 1, _id: '1111', id: '1111', name: "John Doe", attendance_date: '2022-02-11T16:00:00.000+00:00', attendance_hours: 8},
  { number: 2, _id: '2222', id: '2222', name: "Jobs Steve", attendance_date: '2022-02-11T16:00:00.000+00:00', attendance_hours: 8},
  { number: 3, _id: '3333', id: '3333', name: "John Doe", attendance_date: '2022-02-11T16:00:00.000+00:00', attendance_hours: 8},
  { number: 4, _id: '4444', id: '4444', name: "Jobs Steve", attendance_date: '2022-02-11T16:00:00.000+00:00', attendance_hours: 8 },
  { number: 1, _id: '1111', id: '1111', name: "John Doe", attendance_date: '2022-02-12T16:00:00.000+00:00', attendance_hours: 8 },
  { number: 2, _id: '2222', id: '2222', name: "Jobs Steve", attendance_date: '2022-02-12T16:00:00.000+00:00', attendance_hours: 8 },
  { number: 3, _id: '3333', id: '3333', name: "John Doe", attendance_date: '2022-02-12T16:00:00.000+00:00', attendance_hours: 8 },
  { number: 4, _id: '4444', id: '4444', name: "Jobs Steve", attendance_date: '2022-02-12T16:00:00.000+00:00', attendance_hours: 8 },
];


@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.scss'],


  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ]
})
export class HrComponent implements OnInit {

  constructor(
    private libraryService: LibraryService,
    private dataService: DataService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadOnstart()
    this.loadOnLoop()

  }

  //@ViewChild(MatPaginator) paginator!: MatPaginator

  //OOP
  isLoaded: boolean = false;

  async loadOnstart() {

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

  async loadOnLoop() {

    //Event Loop Starts Here
    this.checkIfMobile();



    //Event Ends Here
    this.reloadLoop()
  }

  reloadLoop() {
    this.loadOnLoop()
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


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

  //check if mobile

  isMobile!: boolean

  checkIfMobile() {
    this.isMobile = this.libraryService.getIsMobile()
  }


  //number: number,
  //id: string,
  //name: string,
  //age: number,
  //address: string,
  //position: string,
  //department: string,
  //start_Date: Date,

  //role: number,

  //isArchive: number,
  //created_at: Date,
  //updated_at: Date


  employeesPayload: any;
  employeesData: Employee[] = [];
  employeesDataSource = new MatTableDataSource(this.employeesData);
  employeesDisplayedColumns = ['number', 'id', 'name', 'age', 'address','position','department','role', 'status', 'actions'];

  employeesIdArchive: any;

  getEmployees() {

    //this.employeesDataSource.data = this.employeesData;

    this.dataService.getAllItem('employees')
      .subscribe((data: any) => {
        console.log(data);
        this.employeesPayload = data;
        this.employeesData = this.employeesPayload;
        this.employeesDataSource.data = this.employeesPayload;
      });
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
  attendanceData: Attendance[] = [];
  attendanceDataSource = new MatTableDataSource(this.attendanceData); 

  attendanceIdArchive: any;
  attendanceDisplayedColumns: string[] = [];

  getAttendance() {

    this.attendanceData = ATT_DATA;
    this.attendanceDataSource.data = this.attendanceData;
    

  }

  dateMatch(attendanceDay: any, calendarDate: any) {

    /*var date = new Date;*/
    var date = this.datepipe.transform(attendanceDay,"YYYY-MM-dd")

    console.log(attendanceDay, calendarDate, date)

    if (date === calendarDate) {
      return 1;

    }
    else {
      return 0
    }

  }

  getDate() {
    return this.libraryService.getDate("EEEE, MMMM d, y")
  }

  getMonth() {
    return Number(this.libraryService.getDate("M")) - 1
  }

  getLastDate() {
    return this.libraryService.getLastDayofMonth(this.getMonth())
  }

  daysArray: string[] = []

  getDays() {
    this.daysArray = this.libraryService.generateDaysArray(this.getMonth())
  }

  monthsArray: string[] = []

  getMonths() {
    this.monthsArray = this.libraryService.generateMonthsArray()
    console.log(this.monthsArray)
  }

  fillAttendanceTable() {
    this.attendanceDisplayedColumns = []
    this.attendanceDisplayedColumns.push("name")
    this.attendanceDisplayedColumns = this.attendanceDisplayedColumns.concat(this.daysArray)
    this.attendanceDisplayedColumns.push("total")
  }


}
