import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

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
