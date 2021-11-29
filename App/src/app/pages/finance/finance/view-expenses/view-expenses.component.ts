import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-view-expenses',
  templateUrl: './view-expenses.component.html',
  styleUrls: ['./view-expenses.component.scss']
})
export class ViewExpensesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  itemData: any;
  ngOnInit(): void {
    console.log(this.data)
    console.log("modalopened")
    this.itemData = this.data;
  }
}
