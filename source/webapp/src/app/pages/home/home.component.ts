import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ChartType, Row } from 'angular-google-charts';
import { LibraryService } from 'src/app/services/library.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ]
  
})
export class HomeComponent implements OnInit {

  constructor(
    private dataService: DataService,
    public libraryService: LibraryService
  ) { }

  ngOnInit(): void {
    this.getAnnouncements();
    this.load();
  }

  async load() {
    //Event Loop Starts Here
    this.checkIfMobile();
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

  activeDiv: any

  onclickDiv(divId: any) {
    if (this.activeDiv == divId) {
      this.activeDiv = null
    }
    else {
      this.activeDiv = divId;
    }   
  }

  getAnnouncements() {
    this.dataService.getAllItem('announcement').subscribe((data : any) => {
      console.log(data);
    })
  }

  addAnnouncement() {

  }

  editAnnouncement() {

  }

  archiveAnnouncement() {
    
  }

  //dummy data
   //CashBalance
   title = "Cash Balance";
   type = ChartType.BarChart;
   chartColumns = ["Months", "Revenue", "Expenses"];
   data = [
     ["Jan",  15000, 12000],
     ["Feb", 14000, 12000],
     ["March", 16000, 12000]
   ];
   dynamicResize = true;
}
