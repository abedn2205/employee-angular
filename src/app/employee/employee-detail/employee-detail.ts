import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee, EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { RupiahPipe } from '../currency-spec';

@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css',
  standalone: true,
})
export class EmployeeDetail {
  form: any;
  employee?: Employee;
  mode: 'detail' | 'edit' = 'detail';
  today = new Date().toISOString().split('T')[0];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {}

  private formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.mode = this.route.snapshot.paramMap.get('mode') as 'detail' | 'edit';
    this.employee = this.employeeService.getEmployeeById(id);

    this.form = this.fb.group({
      username: [this.employee?.username || '', Validators.required],
      firstName: [this.employee?.firstName || '', Validators.required],
      lastName: [this.employee?.lastName || '', Validators.required],
      email: [
        this.employee?.email || '',
        [Validators.required, Validators.email],
      ],
      birthDate: [
        this.employee ? this.formatDate(this.employee.birthDate) : '',
        Validators.required,
      ],
      basicSalary: [
        this.employee?.basicSalary || '',
        [Validators.required, Validators.pattern(/^[0-9]+$/)],
      ],
      status: [this.employee?.status || '', Validators.required],
      group: [this.employee?.group || '', Validators.required],
      description: [
        this.employee ? this.formatDate(this.employee.description) : '',
        Validators.required,
      ],
    });

    if (this.mode === 'detail') {
      this.form.disable(); // readonly
    }
  }

  formatSalary(value: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    }).format(value);
  }

  save() {
    if (this.form.invalid) {
      alert('Please fill the form correctly!');
      return;
    }
    const updated: Employee = {
      ...this.employee!,
      ...this.form.value,
      birthDate: new Date(this.form.value.birthDate),
      description: new Date(this.form.value.description),
      basicSalary: parseFloat(this.form.value.basicSalary),
    };
    // Simpan ke service (sederhana, replace data lama)
    const employees = this.employeeService['employeeSubject'].value.map((e) =>
      e.id === updated.id ? updated : e
    );
    this.employeeService['employeeSubject'].next(employees);

    this.router.navigate(['/employees'], { queryParamsHandling: 'preserve' });
  }

  back() {
    this.router.navigate(['/employees'], { queryParamsHandling: 'preserve' });
  }

  onSalaryInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value.replace(/[^0-9]/g, ''); // hanya angka
    const numericValue = parseFloat(rawValue) || 0;

    // Update form value tanpa format agar validasi angka tetap jalan
    this.form.get('basicSalary')?.setValue(numericValue, { emitEvent: false });

    // Format ulang tampilan di input
    input.value = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    }).format(numericValue);
  }
}
