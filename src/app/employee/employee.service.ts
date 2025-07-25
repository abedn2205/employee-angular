import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Employee {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  basicSalary: number;
  status: string;
  group: string;
  description: Date;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employees: Employee[] = [];
  private employeeSubject = new BehaviorSubject<Employee[]>([]);

  constructor() {
    for (let i = 1; i <= 5; i++) {
      this.employees.push({
        id: i,
        username: `user${i}`,
        firstName: `First${i}`,
        lastName: `Last${i}`,
        email: `user${i}@mail.com`,
        birthDate: new Date(1990, i % 12, (i % 28) + 1),
        basicSalary: Math.floor(Math.random() * 10000000),
        status: i % 2 === 0 ? 'Active' : 'Inactive',
        group: `Group ${i % 10}`,
        description: new Date(),
      });
    }
    this.employeeSubject.next(this.employees);
  }

  getEmployees() {
    return this.employeeSubject.asObservable();
  }

  addEmployee(emp: Employee) {
    const current = this.employeeSubject.value;
    const newId = current.length
      ? Math.max(...current.map((e) => e.id)) + 1
      : 1;

    const newEmployee: Employee = {
      ...emp,
      id: newId,
      birthDate: new Date(emp.birthDate),
      description: new Date(emp.description),
    };

    const updatedList = [...current, newEmployee];
    this.employeeSubject.next(updatedList);
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employeeSubject.value.find((e) => e.id === id);
  }

  deleteEmployee(id: number) {
    const updated = this.employeeSubject.value.filter((e) => e.id !== id);
    this.employeeSubject.next(updated);
  }
}
