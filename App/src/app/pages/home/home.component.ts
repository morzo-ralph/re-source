import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/dataservice.service';
import { ChartType, Row } from 'angular-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private dataService : DataService,
  ) { }

  ngOnInit(): void {
    this.getAnnouncements();
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
