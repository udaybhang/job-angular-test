import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { TableFilterRoutingModule } from './table-filter-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';


@NgModule({
  declarations: [
    EmployeeListComponent,
    ViewEmployeeComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    TableFilterRoutingModule, FormsModule
  ]
})
export class TableFilterModule { }
