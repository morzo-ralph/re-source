import { Component, OnInit } from '@angular/core';
import { swalProviderToken } from '@sweetalert2/ngx-sweetalert2/lib/di';

import { DataService } from 'src/app/services/data/dataservice.service';
import { LibraryService } from 'src/app/services/library.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private dataService: DataService, private libraryService: LibraryService,
  ) {}
  
  account_id: any
  password: any

  loginData: any = {}

  ngOnInit(): void {

    this.loadOnLoop()
  }

  async loadOnLoop() {
    //Event Loop Starts Here
    this.checkIfMobile();


    await this.delay(1000);
    this.reloadLoop();
    //Event Loop End Here
  }

  reloadLoop() {
    this.loadOnLoop()
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  isMobile: boolean = false

  checkIfMobile() {
    this.isMobile = this.libraryService.getIsMobile();
  }

  // login = async () : Promise <void> => {
  //   try {
  //     this.loginData.accountId = this.account_id
  //     this.loginData.password = this.password

  //     await this.dataService.createItemss('users/login', this.loginData)

  //   } catch(error) {
  //     console.log(error);
  //   }    
  // }

  login() {
    this.loginData.username = this.account_id
    this.loginData.password = this.password
    
    console.log(this.loginData);

    //createitem is just post -- auth sa future
    this.dataService.createItem('users/login', this.loginData).subscribe((data: any) => {
      console.log(data.user);
      localStorage.setItem('_id', data.user._id);
      localStorage.setItem('lname', data.user.lname);
      localStorage.setItem('fname', data.user.fname);
      localStorage.setItem('mname', data.user.mname);
      if(data) {
        Swal.fire(
          'Login Successful!',
          data.user.lname,
          'success'
        )
        
      } else {

      }
    })
  }
}
