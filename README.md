# Employee Management (Angular 17 + TailwindCSS)

Aplikasi manajemen karyawan sederhana menggunakan **Angular 17** dan **TailwindCSS**, dengan fitur:

- **Login (dummy validation)**.
- **Employee List** dengan:
  - Paging, Sorting, Searching (AND filter).
  - Tambah, Edit, Detail, Delete Employee.
  - Notifikasi warna berbeda untuk Edit (kuning) dan Delete (merah).
- **Add Employee**:
  - Semua field wajib diisi.
  - Validasi email, salary numeric, birthDate tidak boleh melebihi hari ini.
  - Group dropdown dengan search (10 dummy group).
- **Edit/Detail Employee (1 halaman)**:
  - Detail (readonly) dan Edit (editable).
  - Basic Salary diformat otomatis ke **Rupiah (Rp)** di input field.
- **Responsive Web Design (TailwindCSS)**.

---

## **Environment**

Pastikan sudah install:

- **Node.js v18+** (disarankan LTS)
- **Angular CLI 17+**
- **npm** (terpasang otomatis bersama Node.js)

Cek versi:

```bash
node -v
npm -v
ng version

```
