import { Component } from '@angular/core';

import { DataService } from './services/data/dataservice.service';

import { Get } from './services/data/data.model';


/*import { LibraryService } from './services/library.service';*/



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webapp';

  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.checkIfMobile()
    this.checkIfServerActive()
  }

  isMobile: boolean = false;

  checkIfMobile() {
    console.log(window.screen.width)
    if (window.screen.width <= 480) {
      this.isMobile = true;
    }
    console.log(this.isMobile)
    /*this.libraryService.setIsMobile(this.isMobile)*/
  }

  isConn: boolean = false;
  isConnMsg!: Get;
  isConnStatus: any;

  //salesPayload: any;
  //salesData: SalesData[] = [];
  //salesDataSource = new MatTableDataSource(this.salesData);
  //salesDisplayedColumns: string[] = ['number', '_id', 'sales_date', 'sales_desc', 'sales_by', 'sales_amount', 'sales_supplier', 'actions'];
  //salesDataIsArchived: any;

   //this.dataService.getAllItem('pettycash').subscribe((data: any) => {
    //  this.pettyCashPayload = data;
    //  console.log(this.pettyCashPayload);
    //  this.pettyCashData = this.pettyCashPayload;
    //  this.pettyCashDataSource.data = this.pettyCashPayload;
    //});


  checkIfServerActive() {
    var conMsg = this.dataService.checkConn().subscribe((data: any) => {
      
      this.isConnMsg = data;
      console.log(this.isConnMsg);
      this.isConnStatus = this.isConnMsg.status;
    })
  }


}
