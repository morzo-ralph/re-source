import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inteface',
  templateUrl: './inteface.component.html',
  styleUrls: ['./inteface.component.scss']
})
export class IntefaceComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.checkIfMobile()
  }

  isMobile!: boolean

  checkIfMobile() {
    this.isMobile = this.dataService.getIsMobile()
    console.log(this.isMobile)


  }

}
