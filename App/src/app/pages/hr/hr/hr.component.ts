import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../../services/library.service';

export interface Emp_Data {
  number: number;
  id: string;  
  name: string;  
  position: string;
  status: string;
}

const HR_DATA: Emp_Data[] = [
  { number: 1, id: '2021022', name: "John Doe", position: 'admin', status: 'status_code' },
  { number: 2, id: '2021023', name: "Jobs Steve", position: 'admin', status: 'status_code' },
  { number: 3, id: '2021024', name: "Adeg", position: 'admin', status: 'status_code' },
  { number: 4, id: '2021025', name: "Wisofi", position: 'admin', status: 'status_code' },
  { number: 5, id: '2021026', name: "Disury", position: 'admin', status: 'status_code' },
  { number: 6, id: '2021027', name: "Dies Irae", position: 'admin', status: 'status_code' },
  { number: 7, id: '2021028', name: "Bob", position: 'admin', status: 'status_code' },
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
    this.fillAtt()






    //Event Loop Ends Here
    this.isLoaded = true
    console.log(this.isLoaded)
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  empColumns: string[] = ['number', 'id', 'name', 'department', 'position', 'status', 'actions'];
  empDataSource = HR_DATA;

  attColumns: string[] = [];
  attDataSource = HR_DATA;

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

  fillAtt() {
    this.attColumns = []
    this.attColumns.push("name")
    this.attColumns = this.attColumns.concat(this.daysArray)
    console.log(this.attColumns)
    this.attColumns.push("total")
  }


}
