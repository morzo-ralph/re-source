import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-view-petty-cash',
  templateUrl: './view-petty-cash.component.html',
  styleUrls: ['./view-petty-cash.component.scss']
})
export class ViewPettyCashComponent implements OnInit {

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

