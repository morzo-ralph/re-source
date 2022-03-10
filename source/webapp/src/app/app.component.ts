import { Component } from '@angular/core';
import { DataService } from './services/data/dataservice.service';
import { ConnStatus } from 'src/app/services/data/data.model';

//import { Component } from '@angular/core';
//import { DataService } from './services/data.service';
import { LibraryService } from './services/library.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Re:Source';

  constructor(public dataService: DataService, public libraryService: LibraryService) {}

  ngOnInit(): void {

    this.load();

  }
  async load() {
    /*this.isLooped= false;*/
    //Event Loop Starts Here

    this.checkIfMobile();
    /*this.checkIfServerActive();*/

    await this.delay(1000);
    this.reload();
    /*this.isLooped = true;*/
    //Event Loop End Here
  }

  reload() {
    this.load();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  isMobile: boolean = false;

  checkIfMobile() {
    /*console.log(window.screen.width)*/
    if (window.screen.width <= 480) {
      this.isMobile = true;
    }
    else {
      this.isMobile = false
    }
    /*console.log(this.isMobile)*/
    this.libraryService.setIsMobile(this.isMobile)
  }

  isConn: boolean = false;
  isConnMsg!: ConnStatus;
  isConnStatus: any;


  //checkIfServerActive() {
  //  var conMsg = this.dataService.checkConn().subscribe((data: any) => {      
  //    this.isConnMsg = data;
  //    /console.log(this.isConnMsg);*/
  //    this.isConnStatus = this.isConnMsg.status;
  //  })
  //}




}

//import { Component } from '@angular/core';
//import { DataService } from './services/data.service';
//import { LibraryService } from './services/library.service';

//@Component({
//  selector: 'app-root',
//  templateUrl: './app.component.html',
//  styleUrls: ['./app.component.scss']
//})
//export class AppComponent {
//  title = 'frontend';

//  constructor(public dataService: DataService, public libraryService: LibraryService) { }

//  ngOnInit(): void {
//    this.checkIfMobile()
//    //this.checkIfServerActive()
//  }

//  isMobile: boolean = false;

//  checkIfMobile() {
//    console.log(window.screen.width)
//    if (window.screen.width <= 480) {
//      this.isMobile = true;
//    }
//    console.log(this.isMobile)
//    this.libraryService.setIsMobile(this.isMobile)
//  }
//}
