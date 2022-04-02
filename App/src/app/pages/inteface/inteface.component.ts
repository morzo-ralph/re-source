import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/dataservice.service';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-inteface',
  templateUrl: './inteface.component.html',
  styleUrls: ['./inteface.component.scss']
})
export class IntefaceComponent implements OnInit {

  constructor(public dataService: DataService, public libraryService: LibraryService) { }

  ngOnInit(): void {
    this.checkIfMobile()
  }

  isMobile!: boolean

  checkIfMobile() {
    this.isMobile = this.libraryService.getIsMobile()
    console.log(this.isMobile)


  }

}
