import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { GoogleChartComponent } from 'angular-google-charts';
import { ChartType, Row } from 'angular-google-charts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LibraryService } from 'src/app/services/library.service';
import Swal from 'sweetalert2';
import { Data } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss']
})
export class TaskboardComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private dialog : MatDialog,
    private httpClient: HttpClient,
    private libraryService: LibraryService
  ) { }
    task : any = {}
  ngOnInit(): void {
    this.getAllTaskBoard();
  }

  getAllTaskBoard() {
    this.dataService.getAllItem('taskboards').subscribe((data : any) => {
      console.log(data);
      this.task = data;
    });

  }

  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      height: '75%',
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(() => this.getAllTaskBoard())
  }

  viewTask(data: any) {
    const dialogRef = this.dialog.open(ViewTaskComponent, {
      height: '75%',
      width: '100%',
      data: data
      
    })
    console.log(data)
    dialogRef.afterClosed().subscribe(()=> this.getAllTaskBoard())
  }

}
