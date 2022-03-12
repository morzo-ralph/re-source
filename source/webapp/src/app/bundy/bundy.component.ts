import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { ChartType, Row } from 'angular-google-charts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DataService } from 'src/app/services/data/dataservice.service';
import { LibraryService } from 'src/app/services/library.service';
import Swal from 'sweetalert2';
import { Data } from '@angular/router';
import { DatePipe } from '@angular/common';

import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, rubberBandAnimation } from 'angular-animations';

import { ConnStatus, Announcement, Employees, TaskBoard } from 'src/app/services/data/data.model';

//import { time } from 'console';


//export interface Employee {
//  number: number,
//  id: string,
//  name: string,
//  age: number,
//  address: string,
//  position: string,
//  department: string,
//  start_Date: Date,

//  role: number,

//  isArchive: number,
//  created_at: Date,
//  updated_at: Date

//}


@Component({
  selector: 'app-bundy',
  templateUrl: './bundy.component.html',
  styleUrls: ['./bundy.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ]
})
export class BundyComponent implements OnInit {

  constructor(
    public datepipe: DatePipe,
    private dataService: DataService,
    private libraryService: LibraryService,
  )
  { }

  ngOnInit(): void {

    this.loadOnStart()
    this.loadOnLoop();
    
  }

  //OOP
  isLoaded: boolean = false;

  async loadOnStart() {

    this.isLoaded = false

    
    await this.delay(1000);

    //Event Loop Starts Here
    this.getTime();
    this.getEmployees();
    this.getAttendance();
    this.checkIfAvailable();


    //Event Loop End Here
    this.isLoaded = true

  }

  async loadOnLoop() {

    //Event Loop Starts Here
    this.checkIfMobile();
    this.getAnnouncements();

    


    await this.delay(1000);
    this.reloadLoop();
    //Event Loop End Here
  }

  reloadLoop() {
    this.loadOnLoop()
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //check if mobile

  isMobile!: boolean

  checkIfMobile() {
    this.isMobile = this.libraryService.getIsMobile()
  }

  announcementData: Announcement[] = []

  announcementTitle: string = ""
  announcementContent: string = ""

  getAnnouncements() {
    this.dataService.getAllItem('announcements').subscribe((data: any) => {
      /*console.log(data);*/
      this.announcementData = data;

      var currentDate = new Date();
      /*console.log (currentDate);*/

      for (var announcement of this.announcementData) {
        var announcementDate = new Date(announcement.announcement_end_date)
        /*console.log(announcementDate);*/

        if (currentDate <= announcementDate) {
          this.announcementTitle = announcement.announcement_title;
          this.announcementContent = announcement.announcement_content;
          /*console.log("OK")*/
        }
        else {
          this.announcementTitle = "";
          this.announcementContent = "";
        }
      }


    })
  }

//}

  employeesPayload: any;
  employeesData: Employees[] = [];
  employeesDataSource = new MatTableDataSource(this.employeesData);
  employeesDisplayedColumns = ['number', 'name', 'position', 'department', 'status', 'time'];

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
    /*console.log(localStorage.getItem("clockInId:" + id))*/
    if (localStorage.getItem("clockinId:" + id) !== null) {
      status = 1
    }
    else {
      status = 0
    }
    return (status)
  }

  isclockedIn: boolean = false;

  clockinId: any;

  checkIfAvailable() {
    this.clockinId = localStorage.getItem("id")

    if (localStorage.getItem("clockinId:" + this.clockinId) !== null) {
      this.isclockedIn = true
    }
    else {
      this.isclockedIn = false
    }

  }

  // clockIn2() {
  //  var timeIn : any
  //  timeIn = localStorage.setItem('time-in', Date.now().toString())
  //  if(timeIn != '') {
  //    var timeOut = localStorage.setItem('time-out', Date.now().toString())
  //    console.log(localStorage.getItem('time-out') + 'time out')
    
  //    this.subtractHours(timeOut, timeIn)
  //  } else {
  //    localStorage.setItem('time-in', Date.now().toString())
  //  }
    
  //}

  attendance: any = {}
  attendanceData: any = {}
  attendanceBool: boolean = false
  attendanceCount: any
  attendanceId: any

  getAttendance() {
    this.dataService.getAllItem('attendance').subscribe((data: any) => {
      this.attendance = data
      this.attendanceCount = data.length
    })
  }


  timeIn() {

    this.isclockedIn = true

    this.clockinId = localStorage.getItem("id")

    localStorage.removeItem("clockinId:" + this.clockinId)
    localStorage.setItem("clockinId:" + this.clockinId, this.date)
    console.log((localStorage.getItem("clockinId:" + this.clockinId)))


   // this.attendanceData.number = parseInt(this.attendanceCount) + 1
   // this.attendanceData.id = localStorage.getItem('_id')
   // var name : any = localStorage.getItem('fname') + ' ' + localStorage.getItem('lname')
   // this.attendanceData.name = name
   // this.attendanceData.attendance_date_in = new Date()
   //localStorage.setItem('try-in', this.attendanceData.attendance_date_in)
   //this.dataService.createItem('attendance', this.attendanceData).subscribe((data: any) => {
   //  console.log(data)
   //   this.attendanceId = data._id
   //   this.attendanceBool = true
   //   this.getAttendance()
   // })
  }

  timeOut() {

    this.isclockedIn = false
    
    console.log(localStorage.getItem("clockinId:" + this.clockinId));

    localStorage.removeItem("clockinId:" + this.clockinId)


    //this.attendanceData.id = this.attendanceId
    ////this.attendanceData.attendance_date_out = new Date()
    //localStorage.setItem('try-out', new Date().toDateString())
    //this.dataService.archiveItem('attendance', this.attendanceData.id, { 'attendance_date_out': new Date() } ).subscribe((data : any) => {
    //  console.log(data)
    //  this.attendanceBool = false
    //  this.getAttendance()
    //})

  }

  subtractHours(old: any, now: any){
    var diffInMS = now - old
    var msInHour = Math.floor(diffInMS/1000/60)
    /*console.log(msInHour)*/

    localStorage.removeItem('time-in');
    localStorage.removeItem('time-out');
    if (msInHour < 60) {
      /*console.log('Within hour')*/
    } else {
      /*console.log('Not within the hour')*/
    }
  }

  getClockIn(id: any) {
    return (localStorage.getItem("clockinId:" + id))


  }

  getTimeIn(time: any) {

    var oldTime = new Date(time);
    var timeNow = new Date();

    var newTime = Math.abs(oldTime.getTime() - timeNow.getTime());

    var newTimeinSeconds = newTime / 1000;
    var newTimeinMinutes = newTimeinSeconds / 60;
    var newTimeinHours = newTimeinMinutes / 60;

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



}
