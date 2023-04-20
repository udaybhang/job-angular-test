import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ViewEmployeeComponent } from '../view-employee/view-employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  data!: any[];
  originalData!: any[];
  filterForm!: FormGroup;
  filteredData: any = [];
  model: any = {}
  isAddEmployee!:boolean;
  dialogRef: any;
  @ViewChild('addEmployee', { static: true }) addEmployee!: TemplateRef<any>;
  constructor(private fb: FormBuilder, private matDialog:MatDialog) {
    this.data =  [
      {
        id:1,
        name: 'john Smith',
        jobRole: 'Manager',
        age: 35,
        startDate: '2022-01-01',
        endDate: '2022-12-31'
      },
      {
        id:2,
        name: 'jane Doe',
        jobRole: 'Developer',
        age: 28,
        startDate: '2022-02-15',
        endDate: '2022-08-31'
      },
      {
        id:3,
        name: 'bob Johnson',
        jobRole: 'Designer',
        age: 42,
        startDate: '2022-03-01',
        endDate: '2023-08-31'
      },
      {
        id:4,
        name: 'palak soni',
        jobRole: 'Designer',
        age: 21,
        startDate: '2022-09-15',
        endDate: '2023-08-31'
      },
      {
        id:5,
        name: 'adity panday',
        jobRole: 'Developer',
        age: 24,
        startDate: '2023-04-10',
        endDate: '2023-08-31'
      }
    ];
    this.filterForm = this.fb.group({
      name: [''],
      jobRole: [''],
      age: [null],
      startDate: [null],
      endDate: [null]
    });
   }
 
  ngOnInit(): void {
    this.filterData();
    
  }
  filterData() {
    this.filteredData = this.data.filter((item: any) => {
      const nameFilter = item.name.includes(this.filterForm.get('name')?.value);

      const jobRoleFilter =
        this.filterForm.get('jobRole')?.value === '' || item.jobRole === this.filterForm.get('jobRole')?.value;

      const ageFilter = this.filterForm.get('age')?.value === null || item.age === this.filterForm.get('age')?.value;
  
      const startDateFilter =
        this.filterForm.get('startDate')?.value === null ||
        new Date(item.startDate) >= new Date(this.filterForm.get('startDate')?.value);
  
            const endDateFilter =
        this.filterForm.get('endDate')?.value === null ||
        new Date(item.endDate) <= new Date(this.filterForm.get('endDate')?.value);
      // Filter by start and end date if both dates are selected
  const startAndEndDateFilter =
  this.filterForm.get('startDate')?.value !== null &&
  this.filterForm.get('endDate')?.value !== null &&
  new Date(item.startDate) >= new Date(this.filterForm.get('startDate')?.value) &&
  new Date(item.endDate) <= new Date(this.filterForm.get('endDate')?.value);

      return nameFilter && jobRoleFilter && ageFilter && (startDateFilter || endDateFilter || startAndEndDateFilter);
    });
  }
  
  
  onSubmit() {
    this.filterData();
  }

  addRecord(form:NgForm){    
    if (!form.valid) {
      return;
    }
    const lastEmployee = this.data[this.data.length - 1].id;
    this.data.push({...this.model, id: lastEmployee + 1});
    console.log(this.data);
    
    this.filterData();
    this.dialogRef.close()
  }
  openDialog(){
    this.model = {};
    this.model = {...this.model, jobRole:"Developer"}
   this.dialogRef =  this.matDialog.open(this.addEmployee, {width: "30%"})
  }
  viewEmployee(employee:any){
    const dialogRef = this.matDialog.open(ViewEmployeeComponent, {
      width:"30%",
      data: employee,
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  deleteEmployee(id:number){
const indexToDelete = this.filteredData.findIndex((obj:any) => obj.id === id);
if (indexToDelete !== -1) {
  if(this.filteredData.length > 1)
  this.filteredData.splice(indexToDelete, 1);
}
  }
  checkEndDate(endDate: string): {text: string, class: string} {
    if (new Date(endDate) > new Date()) {
      return {text: "Currently Working", class: "currently-working"};
    }
    return {text: endDate, class: ""};
  }
  onReset() {
    this.filterForm.reset({
      name: '',
      jobRole: '',
      age: null,
      startDate: null,
      endDate: null
    });
    this.filterData();
  }
}
