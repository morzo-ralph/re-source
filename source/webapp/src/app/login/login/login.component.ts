import { Component, OnInit } from '@angular/core';
import { swalProviderToken } from '@sweetalert2/ngx-sweetalert2/lib/di';
import { RouterLink, Router } from '@angular/router';
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
    private dataService: DataService,
    private libraryService: LibraryService,
    private router: Router
  ) {}
  
 

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

  id: any
  password: any

  loginData: any = {}

  login() {
    this.loginData.id = this.id
    this.loginData.password = this.password
    
    console.log(this.loginData);

    //createitem is just post -- auth sa future
    this.dataService.createItem('employees/login', this.loginData).subscribe((data: any) => {

      console.log(data.status);
      /*localStorage.clear;*/

      //masyado ka na ata nawiwili sa localstorage ah, ciniclear to dapat
      localStorage.setItem('id', data.employee.id);
      localStorage.setItem('imgUrl', data.employee.imgUrl);
      localStorage.setItem('lname', data.employee.lname);
      localStorage.setItem('fname', data.employee.fname);
      localStorage.setItem('mname', data.employee.mname);
      localStorage.setItem('contact_list', data.employee.list);

      console.log(localStorage.getItem('id'))
      console.log(localStorage.getItem('fname'))

      var id = localStorage.getItem('id');

      if (id != ''){
        var name = localStorage.getItem('fname') + ' ' + localStorage.getItem('lname')
        Swal.fire(
          'Logged in Successfully!',
          'Welcome '+ name,
          'success'
        )
        this.router.navigate(['home'])
      } else {

        //Swal.fire(
        //  'Credentials does not matched!',
        //  '',
        //  'error'
        //)
      }

    }, (error : any) => {
      Swal.fire(
        'Credentials does not matched!',
        '',
        'error'
      )
    })
  }
}
