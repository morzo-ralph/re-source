import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { LibraryService } from 'src/app/services/library.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-inteface',
  templateUrl: './inteface.component.html',
  styleUrls: ['./inteface.component.scss'],

  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ]
})
export class IntefaceComponent implements OnInit {

  constructor(public dataService: DataService, public libraryService: LibraryService) { }

  ngOnInit(): void {
    this.load();
  }


  async load() {
    /*this.isLooped= false;*/
    //Event Loop Starts Here

    this.checkIfMobile();
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

  isMobile!: boolean

  checkIfMobile() {
    this.isMobile = this.libraryService.getIsMobile()
    /*console.log(this.isMobile)*/
  }

}
