import { Component } from '@angular/core';
import { Employee, EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
  standalone: true,
})
export class EmployeeList {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchName: string = '';
  searchEmail: string = '';
  page: number = 1;
  pageSize: number = 10;
  sortField: keyof Employee = 'firstName';
  sortDirection: 'asc' | 'desc' = 'asc';
  notification = '';
  notificationColor = '';
  private sub?: Subscription;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = [...data];
      this.applyFilters();
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEmployees.length / this.pageSize);
  }

  applyFilters() {
    let filtered = this.employees.filter(
      (emp) =>
        emp.firstName.toLowerCase().includes(this.searchName.toLowerCase()) &&
        emp.email.toLowerCase().includes(this.searchEmail.toLowerCase())
    );
    filtered = this.sort(filtered);
    this.filteredEmployees = filtered;
  }

  sort(data: Employee[]) {
    return data.sort((a, b) => {
      const valueA = a[this.sortField];
      const valueB = b[this.sortField];
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
      return 0;
    });
  }

  changeSort(field: keyof Employee) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.page = 1;
  }

  get paginatedEmployees() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredEmployees.slice(start, end);
  }
  private showNotification(message: string, color: 'red' | 'yellow' | 'green') {
    this.notification = message;
    this.notificationColor = color;
    setTimeout(() => (this.notification = ''), 3000);
  }

  editEmployee(id: number) {
    alert(`Edit Employee ID ${id}`);
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id);
      this.showNotification('Employee deleted', 'red');
    }
  }

  addEmployee() {
    this.router.navigate(['/employees/add']);
  }

  viewEmployee(id: number, mode: 'detail' | 'edit') {
    this.router.navigate(['/employees', id, mode], {
      queryParamsHandling: 'preserve',
    });
  }
}
