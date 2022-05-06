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

import { ConnStatus, Announcement, Employees, TaskBoard , Time} from 'src/app/services/data/data.model';

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

    this.loadOnLoop();
    
  }

  //OOP
  isLoaded: boolean = false;

  async loadOnLoop() {

    //Event Loop Starts Here
    this.checkIfMobile();
    this.getTime();
    this.getEmployees();
    this.getAnnouncements();
    this.checkIfAvailable();
    this.getStatus();

    

    this.isLoaded = true;

    await this.delay(10000);
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
    //this.dataService.getAllItem('announcements').subscribe((data: any) => {
    //  /*console.log(data);*/
    //  this.announcementData = data;

    //  var currentDate = new Date();
    //  /*console.log (currentDate);*/

    //  for (var announcement of this.announcementData) {
    //    var announcementDate = new Date(announcement.announcement_end_date)
    //    /*console.log(announcementDate);*/

    //    if (currentDate <= announcementDate) {
    //      this.announcementTitle = announcement.announcement_title;
    //      this.announcementContent = announcement.announcement_content;
    //      /*console.log("OK")*/
    //    }
    //    else {
    //      this.announcementTitle = "";
    //      this.announcementContent = "";
    //    }
    //  }


    //})
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


  employeesPayload: any;
  employeesData: Employees[] = [];
  employeesDataSource = new MatTableDataSource(this.employeesData);
  employeesDisplayedColumns = ['number', 'name', 'position', 'department', 'status', 'time'];

  employeesIdArchive: any;

  getEmployees() {

    this.dataService.getAllItem('employees')
      .subscribe((data: any) => {
        this.employeesPayload = data;
        this.employeesData = this.employeesPayload;
        this.employeesDataSource.data = this.employeesPayload;
      });
  }

  timePayload: any;
  timeData: Time[] = []
  
  getStatus() {

    this.dataService.getTime('times/gettime')
      .subscribe((data) => {


        this.timePayload = data
        this.timeData = this.timePayload

        //console.log(this.timeData)
        ///*console.log(this.clockinId)*/

      })

  }

  checkStatus(id: any) {

    let status = false

    if (this.timeData.length == 0) {
      status = false
    }

    let array = this.timeData 
      .map((time) => {
        if (time.emp_id == id) {
          status = true
        }
      })    


    return status

  }

  isclockedIn: boolean = false;

  clockinId = localStorage.getItem("id")  

  checkIfAvailable() {

    this.dataService.checkTime('times/checktime', this.clockinId)
      .subscribe((data: any) => {
        /*console.log(data)*/

        if (data.code == 200) {
          this.isclockedIn = true
        }
        else {
          this.isclockedIn = false
        }

      })

  }

  timeIn() {

    this.isclockedIn = true
    this.clockinId = localStorage.getItem("id")
    console.log(this.clockinId)

    let req = { "emp_id" : this.clockinId }

    /*console.log(this.clockinId)*/

    this.dataService.timeIn('times/timein', req).
      subscribe((data: any) => {
        /*console.log(data)*/

      })
  }

  timeOut() {

    this.isclockedIn = false
    this.clockinId = localStorage.getItem("id")

    let req = { "emp_id" : this.clockinId }

    this.dataService.timeOut('times/timeout', req).
      subscribe((data: any) => {

        /*console.log(data)*/

        let date = this.datepipe.transform(new Date(data.time.createdAt), 'YYYY-MM-dd')
        console.log(data)
        let req = { "emp_id": data.time.emp_id, "attendance_seconds": data.seconds, "attendance_date": this.datepipe.transform(date, 'YYYY-MM-dd') }
        
        this.dataService.addTime('attendance/newattendance', req).subscribe((data) => {
          //console.log(req)
          console.log(data)
        })

      })


  }

  getTimeTable(id: any) {

    let timeIn = null
    let timeObject = new Date()


    if (this.timeData.length == 0) {
      timeIn = null
    }

    let array = this.timeData
      .map((time) => {

        if (time.emp_id == id) {
          timeIn = "Has Time"
          timeObject = time.createdAt
          timeIn = this.getTimeIn(timeObject)
        }
      })

    return timeIn

  }


  getTimeIn(time: any) {

    var oldTime = new Date(time);
    var timeNow = new Date();

    var newTime = Math.abs(oldTime.getTime() - timeNow.getTime());

    var newTimeinSeconds = newTime / 1000;
    var newTimeinMinutes = newTimeinSeconds / 60;
    var newTimeinHours = newTimeinMinutes / 60;

    return (Math.floor(newTimeinHours) + "h : " + Math.floor(newTimeinMinutes % 60) + "m : " + Math.floor(newTimeinSeconds % 60) + "s");
  }




  

  

 



}
