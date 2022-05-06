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
  @ViewChild('empNewDialog', { static: true }) empNewDialog!: TemplateRef<any>;

  openDialogEditEmp(input: any) {
    console.log(input)
    this.dialog.open(this.empDialog, { data: input });
  }

  openDialogNewEmp() {

    var input = {}


    this.dialog.open(this.empNewDialog, { data: input });
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

  //Function

  employeesPayload: any[] = [];
  employeesData: Employees[] = [];
  employeesDataSource = new MatTableDataSource(this.employeesData);
  employeesDisplayedColumns = ['name', 'number', 'id', 'age', 'address', 'position', 'department', 'rate', 'role', 'status', 'actions'];

  isToggleArchive = true

  getEmployees() {

    this.dataService.getAllItem('employees')
      .subscribe((data: any) => {
        /*console.log(data);*/
        this.employeesPayload = data;

        if (this.isToggleArchive == true) {
          let array: any[] = []
          this.employeesPayload.map((data) => { if (data.isArchive == 0) { array.push(data) } })
          this.employeesData = array
        }
        else {
          this.employeesData = this.employeesPayload
          
        }    
        
        this.employeesDataSource.data = this.employeesData
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

        console.log(this.timeData)

      })

  }

  checkStatus(id: any) {

    let status = false

    if (this.timeData.length == 0) {
      status = false
    }

    this.timeData
      .map((time) => {
        if (time.emp_id == id) {
          status = true
        }
      })

    return status

  }

  newEmp(input : any) {
    console.log(input)

    delete input.password2

    this.dataService.signUp('employees/signup', input).subscribe((data) => {
      console.log(data)

    })

  }

  editEmp(input: any) {
    console.log(input)

    this.dataService.editEmp('employees/edit', input).subscribe((data) => {
      console.log(data)

    })

  }

  archiveEmp(input: any) {

    input.isArchive = 1;

    this.dataService.editEmp('employees/edit', input).subscribe((data) => {
      console.log(data)

    })

  }

  toggleArchive() {
    if (this.isToggleArchive) {
      this.isToggleArchive = false
    }
    else {
      this.isToggleArchive = true
    }

    this.getEmployees
  }




  attendancePayload: any;
  attendanceData: Attendance[] = [];
  attendanceDataSource = new MatTableDataSource(this.attendanceData);

  attendanceDisplayedColumns: string[] = [];

  fillAttendanceTable() {
    this.attendanceDisplayedColumns = []
    this.attendanceDisplayedColumns.push("name")
    this.attendanceDisplayedColumns = this.attendanceDisplayedColumns.concat(this.daysArray)
    this.attendanceDisplayedColumns.push("total")
  }

  calendarData: any[] = []
  calendarDataSource = new MatTableDataSource(this.calendarData);

  getAttendance() {

    this.calendarData = []

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
        })        
        container.push({ emp_id: data.emp_id, emp_name: name, attendance: varObj  })
      })
      this.calendarData = container
      this.calendarDataSource.data = this.calendarData
      console.log(this.calendarDataSource.data)
    })   
  }

  getTotalTime() {

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
    /*console.log(this.monthsArray)*/
  }

  


}
