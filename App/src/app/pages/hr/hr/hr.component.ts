import { Component, OnInit } from '@angular/core';

export interface Emp_Data {
  number: number;
  id: string;  
  name: string;
  position: string;
}

const ELEMENT_DATA: Emp_Data[] = [
  { number: 1, id: '2021022', name: "elmar", position: 'admin' },
  { number: 1, id: '2021022', name: "elmar", position: 'admin' },
  { number: 1, id: '2021022', name: "elmar", position: 'admin' },
  { number: 1, id: '2021022', name: "elmar", position: 'admin' },
  { number: 1, id: '2021022', name: "elmar", position: 'admin' },
];

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.scss']
})
export class HrComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['number', 'id', 'name','position', 'actions'];
  dataSource = ELEMENT_DATA;

}