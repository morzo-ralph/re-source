import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
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




export class HrComponent implements OnInit{

  constructor(
    private libraryService: LibraryService,
    private dataService: DataService,
    private datepipe: DatePipe,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    /*this.loadOnstart()*/

    this.loadOnLoop()

  }

  @ViewChild('empPaginator', { static: false })
  set empPaginator(value: MatPaginator) {
    if (this.employeesDataSource) {
      this.employeesDataSource.paginator = value;
    }
  }

  @ViewChild('attPaginator', { static: false })
  set attPaginator(value: MatPaginator) {
    if (this.calendarDataSource) {
      this.calendarDataSource.paginator = value;
    }
  }

  @ViewChild('timePaginator', { static: false })
  set timePaginator(value: MatPaginator) {
    if (this.attendanceDataSource) {
      this.attendanceDataSource.paginator = value;
    }
  }
  
  @ViewChild('empDialog', { static: true }) empDialog!: TemplateRef<any>;
  @ViewChild('empNewDialog', { static: true }) empNewDialog!: TemplateRef<any>;
  @ViewChild('attEditDialog', { static: true }) attEditDialog!: TemplateRef<any>;
  @ViewChild('attNewDialog', { static: true }) attNewDialog!: TemplateRef<any>;

  @ViewChild('addEditDialog', { static: true }) addEditDialog!: TemplateRef<any>;

  @ViewChild('dedEditDialog', { static: true }) dedEditDialog!: TemplateRef<any>;

  @ViewChild(MatSort) empSort!: MatSort;

  openDialogEditEmp(input: any) {
    console.log(input)
    this.dialog.open(this.empDialog, { data: input });
  }

  openDialogNewEmp() {
    var input = {}
    this.dialog.open(this.empNewDialog, { data: input });
  }

  openDialogAttEdit(input: any) {
    this.dialog.open(this.attEditDialog, { data: input });
  }

  openDialogAttNew() {
    var input = {}
    this.dialog.open(this.attNewDialog, { data: input });
  }

  openDialogAddEdit(input: any) {
    this.dialog.open(this.addEditDialog, { data: input });
  }

  openDialogDedEdit(input: any) {
    this.dialog.open(this.dedEditDialog, { data: input });
  }


  //OOP
  isLoaded: boolean = false;

  async loadOnLoop() {

    //Event Loop Starts Here    
    this.checkIfMobile();

    this.loadTab(this.activeTab);
    this.getStatus();  

    this.isLoaded = true;
    this.isLoadedTab = true;

    await this.delay(5000);
    this.reloadLoop();
    

    //Event Loop End Here
  }

  //LoadTabData

  isLoadedTab = false;
  activeTab = 0

  async loadTab(event: any) {


    let tab = 0
    /*this.activeTab = event.index*/

    if (typeof event == 'object') {
      tab = event.index
      this.activeTab = tab
    }
    else {
      tab = this.activeTab
    }
    

    switch (tab) {
      case 0:

        this.isLoadedTab = false;

        this.getEmployees();
        this.getStatus();
        /*!this.employeesDataSource.paginator ? this.employeesDataSource.paginator = this.empPaginator : null;*/

        await this.delay(1000);
        this.isLoadedTab = true;
        

        break;

      case 1:

        this.isLoadedTab = false;

        this.getEmployees();
        this.setupDate();
        this.fillAttendanceTable()
        this.getAttendance()

        //!this.calendarDataSource.paginator ? this.calendarDataSource.paginator = this.attPaginator : null;
        //!this.attendanceDataSource.paginator ? this.attendanceDataSource.paginator = this.timePaginator : null;

        await this.delay(1000);
        this.isLoadedTab = true;

        break;

      case 2:

        this.isLoadedTab = false;

        this.getEmployees();
        this.setupDate();
        this.fillAttendanceTable()
        this.getAttendance()

        //!this.calendarDataSource.paginator ? this.calendarDataSource.paginator = this.attPaginator : null;
        //!this.attendanceDataSource.paginator ? this.attendanceDataSource.paginator = this.timePaginator : null;

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
  employeesDisplayedColumns = ['name', 'number', 'emp_id', 'age', 'address', 'position', 'department', 'rate', 'rate_type', 'role', 'status', 'actions'];

  isToggleArchive = false

  getEmployees() {

    this.dataService.getAllItem('employees')
      .subscribe((data: any) => {
        /*console.log(data);*/
        this.employeesPayload = data;

        if (this.isToggleArchive == true) {
          let array: any[] = []
          this.employeesPayload.map((data) => { if (data.isArchive != 0) { array.push(data) } })
          this.employeesData = array
        }
        else {
          this.employeesData = this.employeesPayload
          
        }    
        
        this.employeesDataSource.data = this.employeesData
        this.employeesDataSource.paginator = this.empPaginator
        this.employeesDataSource.sort = this.empSort;
      });
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

  calendarDisplayedColumns: string[] = [];

  fillAttendanceTable() {

    
    this.calendarDisplayedColumns = []
    this.calendarDisplayedColumns.push("name")
    this.calendarDisplayedColumns = this.calendarDisplayedColumns.concat(this.daysArray)
    this.calendarDisplayedColumns.push("total")

    console.log(this.calendarDisplayedColumns)

  }

  fillPayrollTable() {


    this.calendarDisplayedColumns = []
    this.calendarDisplayedColumns.push("name")
    this.calendarDisplayedColumns = this.calendarDisplayedColumns.concat(this.daysArray)
    this.calendarDisplayedColumns.push("rate")
    this.calendarDisplayedColumns.push("rate_type")
    this.calendarDisplayedColumns.push("total")

    console.log(this.calendarDisplayedColumns)

  }

  buildJSON() {
    let Obj: any = []
    this.employeesData.map((emp) => {
      let json

      if (emp.fname == undefined) {
        emp.fname = " "
      }
      if (emp.lname == undefined) {
        emp.lname = " "
      }

      let emp_name = emp.fname + ' ' + emp.lname

      json = { emp_id: emp.emp_id, emp_name: emp_name, rate: emp.rate, attendance: this.buildDays(emp.emp_id), total: (this.getTotal(emp.emp_id) / 3600000).toFixed(0), salary: this.getSalary(emp.rate, emp.rate_Type, (this.getTotal(emp.emp_id) / 3600000).toFixed(0)) }

      Obj.push(json)
    })

    return Obj
  }

  getTotal(emp: any) {  

    let total = 0

    this.attendanceData.map((atten) => {
      let date = this.datepipe.transform(new Date(atten.attendance_date), 'YYYY-MM-dd')
      this.daysArray.map((days) => {
        if (emp == atten.emp_id && date == days) {
          total = total + atten.attendance_seconds
        }
      })

      })      

    return total
  }

  getSalary(emp_rate: any, emp_rate_type: any, total: any) {

    let salary = 0

    let days = this.daysArray.length

    switch (emp_rate_type) {
      case "daily":
        salary = Math.floor(total / 8) * emp_rate
        break
      case "weekly":
        salary = (Math.floor(days / 7)) * emp_rate
        break
      case "monthly":
        salary = (Math.floor(days / 28)) * emp_rate
        break
     default:

    }

    if (isNaN(salary)) {
      salary = 0
    }
   

    return salary 
  }

  buildDays(emp: any) {
    let Obj: any = []
    this.daysArray.map((days) => {
      let json
      json = { hours: (this.buildHours(days, emp) / 3600000).toFixed(0), date: days }
      Obj.push(json)
    })
    return Obj
  }

  buildHours(day: any, emp: any) {
    let hours = 0
    this.attendanceData.map((atten) => {
      if (emp == atten.emp_id) {
        let date = this.datepipe.transform(new Date(atten.attendance_date), 'YYYY-MM-dd')
        if (day == date) {
          hours = hours + atten.attendance_seconds
        } 
      }
      else {
        hours = 0
      }
    })
    return hours
  }

  getName(id: any) {

    let name = ''

    this.employeesData.map((data) => {
      if (data.emp_id == id) {
        name = data.fname + " " + data.lname
      }

    })

    return name

  }

  formatAtt() {
    this.attendanceData.map((data) => {
      data.name = this.getName(data.emp_id)
    })
    console.log(this.attendanceData)
  }

  attendancePayload: any;
  attendanceData: Attendance[] = [];
  attendanceDataSource = new MatTableDataSource(this.attendanceData);
  attendanceDisplayedColumns = ['name', 'id', 'date', 'hours', 'actions'];

  calendarData: any[] = []
  calendarDataSource = new MatTableDataSource(this.calendarData);

  getAttendance() {

    this.calendarData = []

    this.dataService.getAttendance('attendance/getattendance').subscribe((data) => {

      this.attendancePayload = data;  
      this.attendanceData = this.attendancePayload;
      this.formatAtt()
      this.attendanceDataSource.data = this.attendanceData
      this.attendanceDataSource.paginator = this.timePaginator


      this.calendarData = []
      this.calendarData = this.buildJSON()
      this.calendarDataSource.data = this.calendarData
      this.calendarDataSource.paginator = this.attPaginator


      console.log(this.calendarDataSource.data)
      console.log(this.attendanceDataSource.data)
    })   
  }

  editAtt(input: any) {
    console.log(input)

    //this.dataService.editEmp('employees/edit', input).subscribe((data) => {
    //  console.log(data)

    //})

  }

  payrollData: any[] = []
  payrollDataSource = new MatTableDataSource();
  payrollDisplayedColumns = ['name', 'id', 'additions', 'deductions', 'total', 'computed'];

  makePayroll() {
    this.buildPayroll(this.calendarDataSource.data)


  }

  buildPayroll(data: any) {


    this.payrollData = data

    this.payrollData.map((content) => {
      delete content.attendance
      content.addition = 0
      content.deduction = 0
      content.computed = content.salary
    })

    this.payrollDataSource.data = this.payrollData

    this.calculateGrossTotal()

    console.log(this.payrollDataSource.data)   


  }

  addAddition(data: any) {

    this.payrollData = this.payrollDataSource.data
    this.payrollData.map((content) => {
      if (content.emp_id == data.emp_id) {
        content.computed = Number(content.salary) + Number(content.addition)
      }
    })

    this.payrollDataSource.data = this.payrollData

    this.calculateGrossTotal()

  }

  addDeduction(data: any) {

    this.payrollData = this.payrollDataSource.data

    this.payrollData.map((content) => {

      if (content.emp_id == data.emp_id) {
        content.computed = Number(content.salary) - Number(content.deduction)

      }

    })

    this.payrollDataSource.data = this.payrollData

    this.calculateGrossTotal()

  }

  grossTotal = 0

  calculateGrossTotal() {

    this.payrollData = this.payrollDataSource.data

    this.payrollData.map((content) => {
      this.grossTotal = this.grossTotal + Number(content.computed)

    })

  }

  

  



































  applyFilterEmp(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeesDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterCalendar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.calendarDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterTimeIn(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.attendanceDataSource.filter = filterValue.trim().toLowerCase();
  }




  getTotalTime() {

  }

  getFirstDayMonth() {

    let day = this.libraryService.getFirstDayMonth()
    return day

  }

  getLastDayMonth() {
    return this.libraryService.getLastDayMonth()
  }


  getDays() {

  }

  getMonths() {

  }

  startDate = this.getFirstDayMonth()

  endDate = this.getLastDayMonth()


  setupDate() {

    this.getDaysArray()

    console.log(this.startDate, this.endDate)

  }

  daysArray: any[] = []

  getDaysArray() {

    this.daysArray = this.libraryService.generateDaysArray(this.startDate, this.endDate)
    
    

  }



  //getDate() {
  //  return this.libraryService.getDate("EEEE, MMMM d, y")
  //}

  //getMonth() {
  //  return Number(this.libraryService.getDate("M")) - 1
  //}

  //getFirstDateofMonth() {
  //  return Number(this.libraryService.getDate("M")) - 1
  //}

  //getLastDate() {
  //  return this.libraryService.getLastDayofMonth(this.getMonth())
  //}

  //daysArray: string[] = []

  //startMonth = this.Mon

  //getDays() {
  //  this.daysArray = this.libraryService.generateDaysArray(this.getMonth())
  //}

  //monthsArray: string[] = []

  //getMonths() {
  //  this.monthsArray = this.libraryService.generateMonthsArray()
  //  /*console.log(this.monthsArray)*/
  //}

  


}
