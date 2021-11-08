import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './pages/test/test/test.component';
import { HrComponent } from './pages/hr/hr/hr.component';
import { IntefaceComponent } from './pages/inteface/inteface.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

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

  
]
  



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
