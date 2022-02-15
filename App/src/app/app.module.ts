import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { CommonModule, DatePipe } from '@angular/common';

//Material Modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
//charts
import { GoogleChartsModule } from 'angular-google-charts';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

//sweetalert
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { TestComponent } from './pages/test/test/test.component';
import { ViewComponent } from './pages/test/test/view/view.component';
import { EditComponent } from './pages/test/test/edit/edit.component';
import { IntefaceComponent } from './pages/inteface/inteface.component';
import { HomeComponent } from './pages/home/home.component';
import { HrComponent } from './pages/hr/hr/hr.component';
import { FinanceComponent } from './pages/finance/finance/finance.component';
import { AddRevenuesComponent } from './pages/finance/finance/add-revenues/add-revenues.component';
import { EditRevenuesComponent } from './pages/finance/finance/edit-revenues/edit-revenues.component';
import { EditExpensesComponent } from './pages/finance/finance/edit-expenses/edit-expenses.component';
import { AddExpensesComponent } from './pages/finance/finance/add-expenses/add-expenses.component';
import { AddPettyCashComponent } from './pages/finance/finance/add-petty-cash/add-petty-cash.component';
import { EditPettyCashComponent } from './pages/finance/finance/edit-petty-cash/edit-petty-cash.component';
import { LoginComponent } from './login/login/login.component';
import { InventoryComponent } from './pages/inventory/inventory/inventory.component';
import { AddItemComponent } from './pages/inventory/inventory/add-item/add-item.component';
import { EditItemComponent } from './pages/inventory/inventory/edit-item/edit-item.component';
import { AddPurchasesComponent } from './pages/inventory/inventory/add-purchases/add-purchases.component';
import { EditPurchasesComponent } from './pages/inventory/inventory/edit-purchases/edit-purchases.component';
import { AddSalesComponent } from './pages/inventory/inventory/add-sales/add-sales.component';
import { EditSalesComponent } from './pages/inventory/inventory/edit-sales/edit-sales.component';
import { ViewPettyCashComponent } from './pages/finance/finance/view-petty-cash/view-petty-cash.component';
import { ViewExpensesComponent } from './pages/finance/finance/view-expenses/view-expenses.component';
import { ViewRevenuesComponent } from './pages/finance/finance/view-revenues/view-revenues.component';
import { GalleryComponent } from './pages/test/test/gallery/gallery.component';
import { TaskboardComponent } from './pages/taskboard/taskboard.component';
import { AddSalessComponent } from './pages/finance/finance/add-saless/add-saless.component';
import { AddPayrollFinanceComponent } from './pages/finance/finance/add-payroll-finance/add-payroll-finance.component';
import { AddPurchaseFinanceComponent } from './pages/finance/finance/add-purchase-finance/add-purchase-finance.component';
import { ViewItemComponent } from './pages/inventory/inventory/view-item/view-item.component';
import { BundyComponent } from './bundy/bundy.component';
import { MarketComponent } from './market/market.component';
import { AddTaskComponent } from './pages/taskboard/add-task/add-task.component';
import { ViewTaskComponent } from './pages/taskboard/view-task/view-task.component';
import { ViewPayrollFinanceComponent } from './pages/finance/finance/view-payroll-finance/view-payroll-finance.component';



@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    ViewComponent,
    EditComponent,
    IntefaceComponent,
    HomeComponent,
    HrComponent,
    FinanceComponent,
    AddRevenuesComponent,
    EditRevenuesComponent,
    EditExpensesComponent,
    AddExpensesComponent,
    AddPettyCashComponent,
    EditPettyCashComponent,
    LoginComponent,
    InventoryComponent,
    AddItemComponent,
    EditItemComponent,
    AddPurchasesComponent,
    EditPurchasesComponent,
    AddSalesComponent,
    EditSalesComponent,
    ViewPettyCashComponent,
    ViewExpensesComponent,
    ViewRevenuesComponent,
    GalleryComponent,
    TaskboardComponent,
    AddSalessComponent,
    AddPayrollFinanceComponent,
    AddPurchaseFinanceComponent,
    ViewItemComponent,
    BundyComponent,
    MarketComponent,
    AddTaskComponent,
    ViewTaskComponent,
    ViewPayrollFinanceComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    //Materials Declarations

    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,

    //Googlechart declaration

    GoogleChartsModule,

    SweetAlert2Module.forRoot(),

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
