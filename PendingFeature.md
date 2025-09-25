## 🔑 Core API Routes

### **1. Auth & User Management**

* `POST /auth/refresh` → Refresh access token.
* `POST /auth/logout` → Logout & invalidate refresh token.
* `POST /auth/forgot-password` → Send reset link/email.
* `GET /auth/me` → Get current user profile (JWT required).

---

### **2. Course Management (Admin only)**

* `PUT /courses/:id` → Update course details.
* `DELETE /courses/:id` → Delete course.
* `POST /courses/:id/videos` → Upload/add videos (YouTube/S3).
* `POST /courses/:id/blogs` → Attach blogs/resources.

---

### **3. Course Browsing (Students)**


* `GET /courses/:id/content` → Fetch lessons, videos (only if enrolled).

---

### **4. Enrollment & Payments**

* `POST /enroll/:courseId` → Enroll a student (initiate payment).
* `POST /webhook/payment` → **Webhook** for Razorpay/Stripe payment success/failure (very important).
* `GET /my-courses` → List of enrolled courses for student.

---

### **5. Blogs / Articles**

* `GET /blogs` → List blogs (**with pagination**).
* `GET /blogs/:id` → Fetch single blog.
* `POST /blogs` → Create blog (Admin).
* `PUT /blogs/:id` → Update blog (Admin).
* `DELETE /blogs/:id` → Delete blog (Admin).

---

### **6. Admin Dashboard**

* `GET /admin/users` → List all users (with filters & pagination).
* `GET /admin/sales` → Sales reports (date range, revenue).
* `GET /admin/analytics` → Platform stats (active users, course sales).

---
