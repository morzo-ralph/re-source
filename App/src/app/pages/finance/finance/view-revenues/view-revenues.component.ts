import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-view-revenues',
  templateUrl: './view-revenues.component.html',
  styleUrls: ['./view-revenues.component.scss']
})
export class ViewRevenuesComponent implements OnInit {

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
