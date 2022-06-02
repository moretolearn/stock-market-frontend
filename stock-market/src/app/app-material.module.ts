import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule}  from '@angular/material/table';
import {MatCardModule}  from '@angular/material/card';
import {MatSortModule}  from '@angular/material/sort';
import {MatPaginatorModule}  from '@angular/material/paginator';
import {MatIconModule}  from '@angular/material/icon';
import {MatFormFieldModule}  from '@angular/material/form-field';
import {MatInputModule}  from '@angular/material/input';
import {MatTooltipModule}  from '@angular/material/tooltip';
import {MatDialogModule}  from '@angular/material/dialog';
import {MatToolbarModule}  from '@angular/material/toolbar';
import {MatGridListModule}  from '@angular/material/grid-list';
import {MatRadioModule}  from '@angular/material/radio';
import {MatSelectModule}  from '@angular/material/select';
import {MatDatepickerModule}  from '@angular/material/datepicker';
import {MatCheckboxModule}  from '@angular/material/checkbox';
import {MatDividerModule}   from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


const AppMaterial = [
  MatButtonModule,
  MatTableModule,
  MatCardModule,
  MatSortModule,
  MatPaginatorModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatDialogModule,
  MatToolbarModule,
  MatGridListModule,
  MatRadioModule,
  MatSelectModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatDividerModule,
  MatProgressSpinnerModule

]

@NgModule({

  exports: [
    AppMaterial
  ]
,
})
export class AppMaterialModule { }
