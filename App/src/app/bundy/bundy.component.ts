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
//import { time } from 'console';

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

  constructor(
    public datepipe: DatePipe,
    private dataService: DataService) { }

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
    this.getAttendance();

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
          localStorage.removeItem(this.clockInID)
          localStorage.setItem(this.clockInID, this.date)
          console.log(localStorage.getItem(this.clockInID))
        }
        else if (this.checkStatus(this.clockInID) == 1)
        {

          //PUSH TO ATTENDANCE
          console.log(localStorage.getItem(this.clockInID))
         

          localStorage.removeItem(this.clockInID)
        }
      }    
    }

    
    this.clockInID = null;

    /*localStorage.setItem(this.clockInID, );*/

    /*localStorage.setItem(this.clockInID, this.clockInID.toString(this.timeinhours + this.timeinminutes));*/
  }

   clockIn2() {
    var timeIn : any
    timeIn = localStorage.setItem('time-in', Date.now().toString())
    if(timeIn != '') {
      var timeOut = localStorage.setItem('time-out', Date.now().toString())
      console.log(localStorage.getItem('time-out') + 'time out')
    
      this.subtractHours(timeOut, timeIn)
    } else {
      localStorage.setItem('time-in', Date.now().toString())
    }
    
  }

  attendance: any = {}
  attendanceData: any = {}
  attendanceBool: boolean = false
  attendanceCount: any
  attendanceId: any

  getAttendance() {
    this.dataService.getAllItem('attendances').subscribe((data: any) => {
      this.attendance = data
      this.attendanceCount = data.length
    })
  }

  timeIn(){
   // localStorage.setItem('attendance', this.attendanceBool)
    this.attendanceData.number = parseInt(this.attendanceCount) + 1
    this.attendanceData.id = localStorage.getItem('_id')
    var name : any = localStorage.getItem('fname') + ' ' + localStorage.getItem('lname')
    this.attendanceData.name = name
    this.attendanceData.attendance_date_in = new Date()
   localStorage.setItem('try-in', this.attendanceData.attendance_date_in)
   this.dataService.createItem('attendances', this.attendanceData).subscribe((data: any) => {
     console.log(data)
      this.attendanceId = data._id
      this.attendanceBool = true
      this.getAttendance()
    })
  }

  timeOut(){
    this.attendanceData.id = this.attendanceId
    //this.attendanceData.attendance_date_out = new Date()
    localStorage.setItem('try-out', new Date().toDateString())
    this.dataService.archiveItem('attendances', this.attendanceData.id, { 'attendance_date_out': new Date() } ).subscribe((data : any) => {
      console.log(data)
      this.attendanceBool = false
      this.getAttendance()
    })

  }

  subtractHours(old: any, now: any){
    var diffInMS = now - old
    var msInHour = Math.floor(diffInMS/1000/60)
    console.log(msInHour)
          localStorage.removeItem('time-in');
      localStorage.removeItem('time-out');
    if (msInHour < 60) {
      console.log('Within hour')
    } else {
      console.log('Not within the hour')
    }
  }

  getClockIn(id: any) {
    return (localStorage.getItem(id))
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
