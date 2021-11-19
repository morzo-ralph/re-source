import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(public dataService : DataService) { }

  ngOnInit(): void {
    this.checkIfMobile()
    //this.checkIfServerActive()

  }

  isMobile: boolean = false;

  checkIfMobile() {
    console.log(window.screen.width)
    if (window.screen.width <= 480) {
      this.isMobile = true;      
    }
    console.log(this.isMobile)
    this.dataService.setIsMobile(this.isMobile)
  }
}
