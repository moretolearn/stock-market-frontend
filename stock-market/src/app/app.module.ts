import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material.module';
import { MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { StocksListComponent } from './components/stocks-list/stocks-list.component';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import * as moment from 'moment';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'input',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

export class MyDateAdapter extends NativeDateAdapter {

  override format(date: Date, displayFormat: Object): string {
    if (displayFormat == "input") {
      console.log(date)
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return this._to2digit(day) + '-' + this._to2digit(month) + '-' + year;
    } else {
      return date.toDateString();
    }
  }

  override parse(value: any): Date | null {
    console.log(value)
    // var date = new Date(value);
    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();
    // console.log(date)
    const date = moment(value, 'DD/MM/YYYY');

    return date.isValid() ? date.toDate() : null;
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }

}

@NgModule({
  declarations: [
    AppComponent,
    AddCompanyComponent,
    CompaniesListComponent,
    CompanyDetailsComponent,
    LoginComponent,
    HeaderComponent,
    DialogComponent,
    StocksListComponent,
    AddStockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HttpClientModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
