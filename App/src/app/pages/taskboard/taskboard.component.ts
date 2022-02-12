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

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss']
})
export class TaskboardComponent implements OnInit {

  constructor(
    private dataService: DataService,
  ) { }
    task : any = {}
  ngOnInit(): void {
    this.getAllTaskBoard();
  }

  getAllTaskBoard() {
    this.dataService.getAllItem('taskboard').subscribe((data : any) => {
      console.log(data);
      this.task = data;
    });
  }

  addTask() {

  }

  archiveTask() {

  }

  editTask() {

  }
}
