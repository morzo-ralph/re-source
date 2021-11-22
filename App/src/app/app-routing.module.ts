import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './pages/test/test/test.component';
import { HrComponent } from './pages/hr/hr/hr.component';
import { IntefaceComponent } from './pages/inteface/inteface.component';
import { HomeComponent } from './pages/home/home.component';
import { FinanceComponent } from './pages/finance/finance/finance.component';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'login', component: LoginComponent
  },

  {
    path: 'test', component: TestComponent
  },

  {
    path: 'home', component: IntefaceComponent, children:
      [
        { path: '', component: HomeComponent },
      ]
  },

  {
    path: 'hr', component: IntefaceComponent, children:
      [
        { path: '', component: HrComponent },
      ]
  },

  {
    path: 'finance', component: IntefaceComponent, children:
      [
        { path: '', component: FinanceComponent },
      ]
  },

  
]
  



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
