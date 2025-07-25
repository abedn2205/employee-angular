import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
  standalone: true,
})
export class AddEmployee {
  today = new Date().toISOString().split('T')[0]; // Batas max tanggal hari ini
  groupList = Array.from({ length: 10 }).map((_, i) => `Group ${i + 1}`);
  filteredGroups = [...this.groupList];

  form: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      basicSalary: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  filterGroups(search: string) {
    this.filteredGroups = this.groupList.filter((g) =>
      g.toLowerCase().includes(search.toLowerCase())
    );
  }

  save() {
    if (this.form.invalid) {
      alert('Please fill all fields correctly!');
      return;
    }
    const newEmployee = {
      ...this.form.value,
      birthDate: new Date(this.form.value.birthDate),
      description: new Date(this.form.value.description),
      basicSalary: parseFloat(this.form.value.basicSalary),
    };
    this.employeeService.addEmployee(newEmployee);
    this.router.navigate(['/employees']);
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}
