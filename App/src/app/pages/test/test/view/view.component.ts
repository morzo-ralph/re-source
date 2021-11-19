import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
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
