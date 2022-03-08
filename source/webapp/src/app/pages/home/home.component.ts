import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
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
    
    this.load();
  }

  async load() {    
    //Event Loop Starts Here
    this.checkIfMobile();
    this.getAnnouncements();
    this.getTasks();


    await this.delay(1000);
    this.reload();
    //Event Loop End Here
  }

  reload() {
    this.load();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

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

      //for (var data of revenuesData) {
      //  this.graphVar.date = data.rev_date
      //  this.graphVar.amount = data.rev_amount
      //  this.graphVar.type = "rev"
      //  this.revenuesDataGraph.push(this.graphVar)
      //  console.log(this.graphVar)
      //  this.graphVar = [];
      //}

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
        console.log("isnull")
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

  arraysEqual(a : any, b: any) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }



  

}
