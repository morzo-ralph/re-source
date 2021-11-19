import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { LibraryService } from './services/library.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(public dataService: DataService, public libraryService: LibraryService) { }

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
    this.libraryService.setIsMobile(this.isMobile)
  }
}
