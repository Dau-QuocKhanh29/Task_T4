## MODULE: QUẢN LÝ HỆ THỐNG (SYSTEM MANAGEMENT)

Module **Quản lý hệ thống (System Management)** đóng vai trò là trung tâm điều phối và kiểm soát toàn bộ hệ thống CRM, chịu trách nhiệm quản lý người dùng, phân quyền truy cập, cấu trúc tổ chức và các cấu hình hệ thống.

---

## Tính năng nổi bật

### 1. Quản lý Người dùng (User Management)

* **CRUD Hoàn chỉnh**: Thêm mới, xem chi tiết, cập nhật và xóa người dùng với đầy đủ thông tin (tài khoản, email, trạng thái, thông tin cá nhân).
* **Soft Delete**: Hỗ trợ xóa mềm (cập nhật `is_deleted` hoặc `status`) để đảm bảo an toàn dữ liệu.
* **Bộ lọc Nâng cao (Advanced Filter)**: Lọc theo nhiều điều kiện (Tên, Email, Vai trò, Trạng thái, Phòng ban, Ngày tạo...).
* **Phân trang (Pagination)**: Xử lý dữ liệu lớn mượt mà, tối ưu hiệu năng.
* **Thống kê & Báo cáo**: Tổng hợp số lượng user theo vai trò, trạng thái hoạt động.

---

### 2. Phân quyền & Vai trò (Role & Authorization)

* **Phân quyền đa vai trò (Multi-Role Management)**: Một user có thể có nhiều role (Admin, Manager, Staff...).
* **Phân quyền chi tiết (RBAC)**: Kiểm soát truy cập theo vai trò, đảm bảo đúng quyền hạn.

---

## ông nghệ sử dụng & Phiên bản

### Backend (RESTful API)

* **Ngôn ngữ**: Java 21
* **Framework**: Spring Boot 4.0.5
* **Project Builder**: Maven
* **Packaging**: JAR
* **ORM & Database Access**: Spring Data JPA / Hibernate
* **Database**: MySQL 9.2.0

#### 📚 Thư viện hỗ trợ:

* **Spring Web**: Xây dựng RESTful API (Apache Tomcat nhúng)
* **Lombok**: Giảm boilerplate code (`@Getter`, `@Setter`, `@Builder`, ...)
* **MapStruct**: Mapping dữ liệu, giảm code khởi tạo

---

### Frontend (Giao diện người dùng)

* **Core**: ReactJS (v18+) + Vite
* **Styling**: Tailwind CSS (v4 - Utility-first)
* **HTTP Client**: Axios (GET, POST, PUT, DELETE)
* **Routing**: React Router DOM (v6)

---

## Kiến trúc dữ liệu (Database Schema)

* **Users**: Lưu thông tin người dùng
  *(Email, Tên < 50 ký tự, SĐT = 10 ký tự)*

* **Role**: Nhóm vai trò (Admin, Manager, Staff...)

* **Permission**: Quyền truy cập chức năng

* **Module**: Các chức năng trong hệ thống

---

## Hướng dẫn cài đặt & chạy dự án (Local)

### 1. Yêu cầu hệ thống (Prerequisites)

* Node.js (v18+)
* JDK 21
* Maven
* MySQL Server (hoặc XAMPP / DBeaver)

---

### 2. Thiết lập Database

```sql
CREATE DATABASE crm_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
```

Cấu hình trong `application.properties` hoặc `application.yml`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/crm_db
spring.datasource.username=root
spring.datasource.password=your_password
```

---

### 3. Chạy Backend

* Mở project bằng IntelliJ IDEA hoặc Eclipse
* Chạy file `Application.java`

Server chạy tại: `http://localhost:8080`

---

### 4. Chạy Frontend

```bash
# Cài đặt thư viện
npm install

# Chạy project
npm run dev
```

---
<img width="1917" height="944" alt="image" src="https://github.com/user-attachments/assets/89f048c4-cbcd-49f3-a426-efc426c77e94" />
<img width="1916" height="943" alt="image" src="https://github.com/user-attachments/assets/4acf3fac-91f2-446a-9511-88802f5bbce0" />
<img width="1911" height="944" alt="image" src="https://github.com/user-attachments/assets/5f668d12-c25f-4f36-8106-63305cc39119" />



## Danh sách API cơ bản (Endpoints)

### Users API

| Method | Endpoint    | Mô tả                      |
| ------ | ----------- | -------------------------- |
| GET    | /users      | Lấy danh sách người dùng   |
| GET    | /users/{id} | Lấy thông tin 1 người dùng |
| POST   | /users      | Tạo người dùng mới         |
| PUT    | /users/{id} | Cập nhật người dùng        |
| DELETE | /users/{id} | Xóa người dùng             |

---

### Roles API

| Method | Endpoint    | Mô tả                 |
| ------ | ----------- | --------------------- |
| GET    | /roles      | Lấy danh sách vai trò |
| GET    | /roles/{id} | Lấy thông tin vai trò |
| POST   | /roles      | Tạo vai trò mới       |
| PUT    | /roles/{id} | Cập nhật vai trò      |
| DELETE | /roles/{id} | Xóa vai trò           |

---

## Ghi chú

* Áp dụng mô hình **RBAC** giúp dễ mở rộng hệ thống.
* Thiết kế đảm bảo **bảo mật & toàn vẹn dữ liệu**.
* Có thể tích hợp thêm **JWT / OAuth2** để nâng cao bảo mật.

---
