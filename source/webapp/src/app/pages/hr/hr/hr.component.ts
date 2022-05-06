import { Component, OnInit, ViewChild, TemplateRef,  } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { ChartType, Row } from 'angular-google-charts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/dataservice.service';

import Swal from 'sweetalert2';
import { Data } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ConnStatus, Announcement, Employees, TaskBoard, Inventories, Attendance, Time } from 'src/app/services/data/data.model';


import { LibraryService } from 'src/app/services/library.service';


import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';



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
    private datepipe: DatePipe,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    /*this.loadOnstart()*/
    this.loadOnLoop()

  }

  @ViewChild(MatPaginator) empPaginator!: MatPaginator;
  @ViewChild('empDialog', { static: true }) empDialog!: TemplateRef<any>;

  openDialogWithoutRef(input: any) {
    console.log(input)
    this.dialog.open(this.empDialog, { data: input });
  }




  //OOP
  isLoaded: boolean = false;

  async loadOnLoop() {

    //Event Loop Starts Here    
    this.checkIfMobile();

    this.loadTab(null);
    this.getStatus();
    




    this.isLoaded = true;
    this.isLoadedTab = true;

    await this.delay(10000);
    this.reloadLoop();
    

    //Event Loop End Here
  }

  //LoadTabData

  isLoadedTab = false;
  activeTab = 0

  async loadTab(event: any) {

    if (event) {
      this.activeTab = event.index
    }
    else {
      this.activeTab = 0
    }
    

    switch (this.activeTab) {
      case 0:

        this.isLoadedTab = false;

        this.getEmployees();
        

        await this.delay(1000);
        this.isLoadedTab = true;

        break;

      case 1:

        this.isLoadedTab = false;

        this.getDays()
        this.getMonths()
        this.fillAttendanceTable()
        this.getAttendance()

        await this.delay(1000);
        this.isLoadedTab = true;

        break;

      default:
    }
  }

  reloadLoop() {
    this.loadOnLoop()
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //Check if Mobile

  isMobile!: boolean

  checkIfMobile() {
    this.isMobile = this.libraryService.getIsMobile()
  }

  //async loadOnstart() {

  //  this.isLoaded = false
  //  await this.delay(1000)
  //  //Event Loop Starts Here
  //  this.getDays()
  //  this.getMonths()
  //  this.fillAttendanceTable()

  //  this.getEmployees();
  //  this.getAttendance();

  //  //Event Loop Ends Here
  //  this.isLoaded = true


  //}


  //async load() {
  //  this.isLoaded = false
  //  await this.delay(1000)
  //  //Event Loop Starts Here
  //  this.getDays()
  //  this.getMonths()
  //  this.fillAttendanceTable()

  //  this.getEmployees();
  //  this.getAttendance()

  //  //Event Loop Ends Here
  //  this.isLoaded = true
  //  console.log(this.isLoaded)
  //}



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
  employeesData: Employees[] = [];
  employeesDataSource = new MatTableDataSource(this.employeesData);
  employeesDisplayedColumns = ['number', 'id', 'name', 'age', 'address','position','department','role', 'status', 'actions'];

  employeesIdArchive: any;

  getEmployees() {

    //this.employeesDataSource.data = this.employeesData;

    this.dataService.getAllItem('employees')
      .subscribe((data: any) => {
        /*console.log(data);*/
        this.employeesPayload = data;
        this.employeesData = this.employeesPayload;
        this.employeesDataSource.data = this.employeesPayload;
        this.employeesDataSource.paginator = this.empPaginator
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeesDataSource.filter = filterValue.trim().toLowerCase();
  }

  timePayload: any;
  timeData: Time[] = []

  getStatus() {

    this.dataService.getTime('times/gettime')
      .subscribe((data) => {


        this.timePayload = data
        this.timeData = this.timePayload

        /*console.log(this.timeData)*/

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

  timeArray: any[] = []

  calendarData: any[] = []
  calendarDataSource = new MatTableDataSource(this.calendarData);

  getAttendance() {

    this.calendarData = []

    /*let req: any*/

    /*req.data= "dsf"*/

    


    this.dataService.getAttendance('attendance/getattendance').subscribe((data) => {
      this.attendancePayload = data;
      this.attendanceData = this.attendancePayload;

      this.calendarData = []

      let container : any[] = []

      this.employeesData.map((data) => {
        if (data.fname == undefined) {
          data.fname = ""
        }
        if (data.lname == undefined) {
          data.lname = ""
        }
        var name = data.fname + ' ' + data.lname
        let varObj: any = []
        this.attendanceData.map((content) => {        
          
          if (data.emp_id == content.emp_id)
          {
            let smolObj: any[] = []
            this.daysArray.map((days) => {
              let date = this.datepipe.transform(new Date(content.attendance_date), 'YYYY-MM-dd')
              var total = 0
              var hours = 0
              if (date == days) {
                total = total + content.attendance_seconds
                hours = (total/10000)
                smolObj.push(JSON.parse(JSON.stringify({ hours: hours })))
              }
              else
              {
                smolObj.push(JSON.parse(JSON.stringify({ hours: "0" })))
              }
              varObj = smolObj
            })         

          }
          else
          {
            let smolObj: any[] = []
            this.daysArray.map((days) => {
              smolObj.push(JSON.parse(JSON.stringify({ hours: "0" })))
              varObj = smolObj
            })
          }
          /*bigJSON.attendance = { attendance: varObj }  */        
        })        
        container.push({ emp_id: data.emp_id, emp_name: name, attendance: varObj  })
        /*console.log(this.calendarData)*/
      })

      this.calendarData = container
      this.calendarDataSource.data = this.calendarData
      console.log(this.calendarDataSource.data)
    })   
  }

  getTotalTime() {

  }

  //dateMatch(attendanceDay: any, calendarDate: any) {

  //  /*var date = new Date;*/
  //  var date = this.datepipe.transform(attendanceDay,"YYYY-MM-dd")

  //  console.log(attendanceDay, calendarDate, date)

  //  if (date === calendarDate) {
  //    return 1;

  //  }
  //  else {
  //    return 0
  //  }

  //}

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
    /*console.log(this.monthsArray)*/
  }

  fillAttendanceTable() {
    this.attendanceDisplayedColumns = []
    this.attendanceDisplayedColumns.push("name")
    this.attendanceDisplayedColumns = this.attendanceDisplayedColumns.concat(this.daysArray)
    this.attendanceDisplayedColumns.push("total")
  }


}
