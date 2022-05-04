import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/dataservice.service';
import { ChartType, Row } from 'angular-google-charts';
import { LibraryService } from 'src/app/services/library.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, rubberBandAnimation } from 'angular-animations';

import { ConnStatus, Announcement, Employees, TaskBoard } from 'src/app/services/data/data.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    rubberBandAnimation(),
  ]
  
})
export class HomeComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private libraryService: LibraryService
  ) { }

  ngOnInit(): void {
    this.loadOnLoop();
  }


  
  isLoaded: boolean = false;

  async loadOnLoop() {

    //Event Loop Starts Here

    await this.delay(1000);
    this.checkIfMobile();
    this.getTasks();


    
    this.reloadLoop();
    this.isLoaded = true

    //Event Loop End Here
  }

  reloadLoop() {
    this.loadOnLoop()
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //Check if Mobile

  isMobile!: boolean

  checkIfMobile() {
    this.isMobile = this.libraryService.getIsMobile()
  }

  /*Functions*/

  getClockIn(id: any) {
    return (localStorage.getItem("clockinId:" + id))
  }

  getTimeIn(time: any) {

    var oldTime = new Date(time);
    var timeNow = new Date();

    var newTime = Math.abs(oldTime.getTime() - timeNow.getTime());

    var newTimeinSeconds = newTime / 1000;
    var newTimeinMinutes = newTimeinSeconds / 60;
    var newTimeinHours = newTimeinMinutes / 60;

    return (Math.floor(newTimeinHours) + ":" + Math.floor(newTimeinMinutes % 60) + ":" + Math.floor(newTimeinSeconds % 60));
  }

  taskBoardData: TaskBoard[] = [];

  getTasks() {
    this.dataService.getAllItem('taskboard').subscribe((data: any) => {
      if (this.taskBoardData.length == 0) {
        this.taskBoardData = data;
      }

      if (this.taskBoardData.length != data.length) {
        this.taskBoardData = data;
      }
    })
  }





























  activeDiv: any

  onclickDiv(divId: any) {
    if (this.activeDiv == divId) {
      this.activeDiv = null
    }
    else {
      this.activeDiv = divId;
    }   
  }




  

}
