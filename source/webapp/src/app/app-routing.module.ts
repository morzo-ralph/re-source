import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*import { TestComponent } from './pages/test/test/test.component';*/
import { HrComponent } from './pages/hr/hr/hr.component';
import { IntefaceComponent } from './pages/inteface/inteface.component';
import { HomeComponent } from './pages/home/home.component';
import { FinanceComponent } from './pages/finance/finance/finance.component';
import { LoginComponent } from './login/login/login.component';
import { InventoryComponent } from './pages/inventory/inventory/inventory.component';
/*import { GalleryComponent } from './pages/test/test/gallery/gallery.component';*/
import { TaskboardComponent } from './pages/taskboard/taskboard.component';
import { BundyComponent } from './bundy/bundy.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'login', component: LoginComponent
  },

  {
    path: 'bundy', component: BundyComponent
  },

  //{
  //  path: 'test', component: IntefaceComponent, children:
  //    [
  //      { path: '', component: TestComponent },
  //    ]
  //},

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

  {
    path: 'inventory', component: IntefaceComponent, children:
      [
        { path: '', component: InventoryComponent },
      ]
  },

  {
    path: 'taskboard', component: IntefaceComponent, children:
      [
        { path: '', component: TaskboardComponent },
      ]
  },
  //{
  //  path: 'gallery',
  //  component: GalleryComponent,
  //  data: { title: 'List of Sales' }
  //},
  // {
  //   path: 'gallery-details/:id',
  //   component: GalleryDetailsComponent,
  //   data: { title: 'Sales Details' }
  // },
  // { path: '',
  //   redirectTo: '/gallery',
  //   pathMatch: 'full'
  // }


]




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
