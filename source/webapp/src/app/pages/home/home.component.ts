import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/dataservice.service';
import { ChartType, Row } from 'angular-google-charts';
import { LibraryService } from 'src/app/services/library.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, rubberBandAnimation } from 'angular-animations';

import { ConnStatus, Announcement, Employee, TaskBoard } from 'src/app/services/data/data.model';

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
    public libraryService: LibraryService
  ) { }

  ngOnInit(): void {

    this.loadOnStart()
    this.loadOnLoop();
  }


  //OOP
  isLoaded: boolean = false;

  async loadOnStart() {

    this.isLoaded = false

    //Event Loop Starts Here
    await this.delay(1000);


    //Event Loop End Here
    this.isLoaded = true

  }

  async loadOnLoop() {
    //Event Loop Starts Here
    this.checkIfMobile();
    this.getAnnouncements();
    this.getTasks();


    await this.delay(1000);
    this.reloadLoop();
    //Event Loop End Here
  }

  reloadLoop() {
    this.loadOnLoop()
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //check if mobile

  isMobile!: boolean

  checkIfMobile() {
    this.isMobile = this.libraryService.getIsMobile()
  }

  announcementData: Announcement[] = []

  announcementTitle: string = ""
  announcementContent: string = ""

  getAnnouncements() {
    this.dataService.getAllItem('announcements').subscribe((data: any) => {
      /*console.log(data);*/
      this.announcementData = data;

      var currentDate = new Date();
      /*console.log (currentDate);*/

      for (var announcement of this.announcementData) {
        var announcementDate = new Date(announcement.announcement_end_date)
        /*console.log(announcementDate);*/

        if (currentDate <= announcementDate) {
          this.announcementTitle = announcement.announcement_title;
          this.announcementContent = announcement.announcement_content;
          /*console.log("OK")*/
        }
        else {
          this.announcementTitle = "";
          this.announcementContent = "";
        }
      }


    })
  }

  addAnnouncement() {

  }

  editAnnouncement() {

  }

  archiveAnnouncement() {

  }

  taskBoardData: TaskBoard[] = [];



  getTasks() {
    this.dataService.getAllItem('taskboard').subscribe((data: any) => {
      /*console.log(data);*/
      /*this.taskBoardData = data;*/

      //console.log(this.taskBoardData)
      if (this.taskBoardData.length == 0) {
        this.taskBoardData = data;
        /*console.log("isnull")*/
      }

      if (this.taskBoardData.length != data.length) {
        this.taskBoardData = data;
      }

      //if (this.arraysEqual(this.taskBoardData, data) == false) {
      //  /*console.log("NOT MATCH")*/
      //}

      //if (this.arraysEqual(this.taskBoardData, data) == true) {
      //  console.log("MATCH")
      //}
      //else {
      // /* this.taskBoardData = this.taskBoardData;*/
      //}

      /*console.log(data)*/
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
