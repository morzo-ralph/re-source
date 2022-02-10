import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private dataService: DataService,
  ) { 
    
  }
  
  account_id: any
  password: any

  loginData: any = {}

  ngOnInit(): void {
  }

  // addExpenses = async () : Promise <void> => {
  //   try {
  //     this.expensesData.exp_amount = this.expAmount;
  //     this.expensesData.exp_by =  this.expBy;
  //     this.expensesData.exp_date = this.expDate;
  //     this.expensesData.exp_desc = this.expDesc;
  //     this.expensesData.isArchive = 0;
      
  //     await this.dataService.createItemss('expenses', this.expensesData);
  //       Swal.fire(
  //         'Item Added!',
  //         '',
  //         'success'
  //       )
  //       this.dialogRef.close();
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }

  login = async () : Promise <void> => {
    try {
      this.loginData.accountId = this.account_id
      this.loginData.password = this.password

      await this.dataService.createItemss('users/login', this.loginData)

    } catch(error) {
      console.log(error);
    }    
  }
}
