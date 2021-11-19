import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-expenses',
  templateUrl: './edit-expenses.component.html',
  styleUrls: ['./edit-expenses.component.scss']
})
export class EditExpensesComponent implements OnInit {

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
