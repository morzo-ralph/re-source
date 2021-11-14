import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.scss']
})
export class AddExpensesComponent implements OnInit {

  expFname: any;
  expLname: any;
  expMname: any;
  expExt: any;
  expPurpose: any;
  expDesc: any;
  expFrom: any;
  expTo: any;
  constructor() { }

  ngOnInit(): void {
  }

}
