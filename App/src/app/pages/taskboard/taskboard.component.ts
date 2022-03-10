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

export interface TaskBoardData {
  number: number;
  id: string;
  _id: string;

  taskBoard_name: string;
  taskBoard_content: string
  imageUrl: string

  isArchive: number;
  created_at: Date;
  updated_at: Date;
}

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
    this.getAllTaskBoard()
  }

  taskBoardPayload: any
  taskBoardData: TaskBoardData[] = []
  taskBoardDataSource = new MatTableDataSource(this.taskBoardData)
  inventoriesDisplayedColumns = ['taskBoard_name', 'taskBoard_content', 'imageurl'];
  inventoriesIdArchive: any

  getAllTaskBoard() {
    this.dataService.getAllItem('taskboards').subscribe((data : any) => {
      console.log(data)
      this.task = data
      this.taskBoardPayload = data
      this.taskBoardData = this.taskBoardPayload
      this.taskBoardDataSource = this.taskBoardPayload
    });

  }

  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      height: '75%',
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllTaskBoard()
    })
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
