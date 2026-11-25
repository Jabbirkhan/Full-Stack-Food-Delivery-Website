# Food Delivery Website

A modern, full-stack **Food Delivery Platform** built using the **MERN Stack** (**MongoDB, Express.js, React.js, and Node.js**).
This application provides a seamless online food ordering experience with dedicated interfaces for **Customers** and a **Single Administrator**.
Customers can browse food items, manage their carts, place orders using **Cash on Delivery (COD)** or **Stripe**, track order history, and manage their accounts. Administrators can manage food products, monitor orders, update order statuses, and oversee platform operations through a dedicated **Admin Dashboard**.

---

# 🚀 Features
## 👤 Customer Features
- ✅ User Registration & Login
- ✅ Email Verification with OTP
- ✅ Forgot Password & Password Reset
- ✅ Google OAuth Authentication
- ✅ GitHub OAuth Authentication
- ✅ Browse Food Products
- ✅ Search & Filter Products by Category
- ✅ Server-Side Pagination
- ✅ Product Detail Pages
- ✅ Half Plate / Full Plate Selection
- ✅ Shopping Cart Management
- ✅ Quantity Management
- ✅ Stripe Online Payments
- ✅ Cash on Delivery (COD)
- ✅ Order History & Status Tracking
- ✅ Profile Management
- ✅ Contact Form
- ✅ Responsive Design
---
## 👨💼 Admin Features
- ✅ Single Admin Account Restriction
- ✅ Secure Authentication
- ✅ OTP-Based Password Recovery
- ✅ Dashboard Operations
### 🍽️ Product Management
- Add Products
- Update Products
- Delete Products
- Manage Categories
- Manage Pricing
### 📦 Order Management
- View All Orders
- Monitor Payments
- Update Order Status
---
# 🛠️ Technology Stack
## 🎨 Frontend
| Technology | Purpose |
|------------|----------|
| React.js | Customer Interface |
| Tailwind CSS | Styling |
| React Router DOM | Client-Side Routing |
| Context API | State Management |
| Axios | HTTP Requests |
---
## ⚡ Backend
| Technology | Purpose |
|------------|----------|
| Node.js | JavaScript Runtime |
| Express.js | Backend Framework |
| REST APIs | API Architecture |
---
## ☁️ Database & Storage
| Technology | Purpose |
|------------|----------|
| MongoDB Atlas | Database |
| Cloudinary | Media Storage |
| Multer | File Upload Handling |
---
## 🔐 Authentication & Security
| Technology | Purpose |
|------------|----------|
| JWT | Authentication |
| bcrypt | Password Hashing |
| Cookie-Based Authentication | Secure Session Handling |
| Google OAuth | Google Authentication |
| GitHub OAuth | GitHub Authentication |
---
## 💳 Payment Integration
| Technology | Purpose |
|------------|----------|
| Stripe | Online Payments |
| Cash on Delivery (COD) | Offline Payment Method |
---
## 📧 Email Services
| Technology | Purpose |
|------------|----------|
| Nodemailer | Email Delivery |
| SMTP | Email Transport |
---
## 🚦 Performance & Security
| Technology | Purpose |
|------------|----------|
| Upstash Redis | API Rate Limiting |
---
## 🚀 Deployment
| Component | Platform |
|------------|------------|
| Customer Frontend | Vercel |
| Admin Dashboard | Vercel |
| Backend API | Render |
| Database | MongoDB Atlas |
---
# 📂 Project Structure
```text
Food-Delivery-Website/
│
├── frontend/        # Customer Frontend
├── admin/           # Admin Dashboard
├── backend/         # Express API & Business Logic
└── README.md
```
---
# 🍔 Food Browsing
Authenticated users can:
- Browse Food Items
- Search Products
- Filter Products by Category
- View Product Details
- Navigate Through Pagination
---
## 🍽️ Product Information
Each food item contains:
- Product Image
- Title
- Description
- Category
- Available Plate Sizes
- Price Information
---
# 🍽️ Plate Size Options
Products can be configured with different serving sizes.
## Half Plate
- Half Plate Availability
- Half Plate Pricing
## Full Plate
- Full Plate Availability
- Full Plate Pricing
## Both Sizes
- Half Plate & Full Plate Support
- Independent Pricing for Each Size
---
# 🛒 Shopping Cart System
Customers can:
- Add Products to Cart
- Select Plate Size
- Increase Quantity
- Decrease Quantity
- Remove Items
- Track Cart Count in Navbar
---
## Cart Features
- Real-Time Cart Updates
- Quantity Management
- Automatic Total Calculation
- Checkout Integration
---
# 📦 Order Management
## Customer Order Workflow
1. Register or Login
2. Browse Food Products
3. Add Products to Cart
4. Select Plate Size
5. Enter Shipping Address
6. Choose Payment Method
7. Place Order
8. Track Order Status
---
## 💳 Payment Methods
### Cash on Delivery (COD)
- Offline Payment Method
- Order Placed Instantly
- Payment Collected Upon Delivery
### Stripe Payment Gateway
- Secure Online Payments
- Stripe Checkout Flow
- Payment Verification
- Order Confirmation
---
## 📋 Order Information
Customers can view:
- Order Number
- Order Status
- Order Amount
- Payment Method
- Ordered Items
- Shipping Address
- Order Date
---
# 👤 Customer Account Management
## 🔐 Profile Management
Customers can:
- View Profile
- Verify Email
- Reset Password
- Logout Securely
---
## 📬 Communication Pages
### ℹ️ About Page
Provides information about the restaurant or business.
### 📞 Contact Page
Allows customers to contact support through email notifications.
### 🔒 Privacy Policy
Accessible from the website footer for privacy and data usage information.
---
# 👨💼 Admin Dashboard
The Admin Dashboard provides centralized management of products, orders, and platform operations.
---
## 🍽️ Product Management
Administrators can create products with:
- Title
- Description
- Category
- Product Image
- Plate Size Availability
- Half Plate Price
- Full Plate Price
### Available Operations
| Operation | Description |
|------------|------------|
| Create | Add New Products |
| Read | View Existing Products |
| Update | Edit Product Information |
| Delete | Remove Products |
---
## 📦 Order Management
Administrators can:
- View Customer Orders
- Track Payment Methods
- Review Shipping Information
- Update Order Status
- Monitor Order Activity
### Order Details
Each order includes:
- Order Number
- Customer Information
- Delivery Address
- Ordered Products
- Product Quantities
- Total Amount
- Payment Method
- Current Status
---
# 📱 Pages & Screens
## Customer Frontend
| Page | Description |
|--------|------------|
| Register | Customer Registration |
| Login | Customer Authentication |
| Home | Landing Page |
| Product Catalogue | Browse Food Products |
| Product Detail | Food Item Information |
| Cart | Manage Cart Items |
| Checkout | Place Orders |
| Orders | Order History & Status |
| About | Restaurant Information |
| Contact | Support Form |
| Privacy Policy | Privacy Information |
| Forgot Password | Password Recovery |
| Verify Email | OTP Verification |
---
## Admin Dashboard
| Page | Description |
|--------|------------|
| Register | Admin Registration |
| Login | Admin Authentication |
| Add Product | Create Food Products |
| Product List | Manage Existing Products |
| Update Product | Edit Product Details |
| Orders | View and Manage Orders |
| Forgot Password | Password Recovery |
| Password Reset | Reset Admin Password |
| Email Verification | Verify Admin Email |
---
# 🌐 API Architecture
The backend follows a REST API architecture with separate routes for customer and administrator operations.
## Base Routes
```js
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
```
---
## 👤 Customer APIs
### Base URL
```text
/api/v1/user
```
| Method | Endpoint | Description |
|----------|-------------|-------------|
| POST | /register | Customer Registration |
| POST | /login | Customer Login |
| GET | /verify | Verify Customer |
| POST | /logout | Logout Customer |
| GET | /profile | Customer Profile |
| GET | /send-verify-email-otp | Send Verification OTP |
| POST | /verify-email-otp | Verify Email |
| POST | /send-reset-password-otp | Send Reset OTP |
| POST | /verify-reset-password-otp | Verify Reset OTP |
| POST | /reset-password | Reset Password |
| GET | /allproducts | Fetch Products |
| POST | /addtocart | Add To Cart |
| PATCH | /updatecart | Update Cart |
| GET | /cart | Get Cart |
| POST | /placeorder | Place COD Order |
| POST | /placestripeorder | Stripe Checkout |
| POST | /verifystripeorder | Verify Stripe Order |
| GET | /orders | Customer Orders |
| POST | /send-contact-message | Contact Support |
---
## 👨💼 Admin APIs
### Base URL
```text
/api/v1/admin
```
| Method | Endpoint | Description |
|----------|-------------|-------------|
| POST | /register | Register Admin |
| POST | /login | Admin Login |
| GET | /verify | Verify Admin |
| POST | /logout | Logout Admin |
| POST | /send-reset-password-otp | Send Reset OTP |
| POST | /verify-reset-password-otp | Verify OTP |
| POST | /reset-password | Reset Password |
| POST | /addproduct | Add Product |
| GET | /allproducts | Get Products |
| PATCH | /updateproduct/:id | Update Product |
| DELETE | /deleteproduct/:id | Delete Product |
| GET | /orders | Get Orders |
| PATCH | /updatestatus/:id | Update Order Status |
| PATCH | /autostatusupdate | Automatic Status Update |
---
# ☁️ Database & Storage
## MongoDB Atlas
Stores:
- Users
- Products
- Orders
- Cart Data
- Shipping Addresses
- Authentication Records
- Image URLs
---
## Cloudinary
Used for storing:
- Product Images
- Media Assets
- Uploaded Files
- PDF Documents
---
# 📧 Email Services
The application uses **Nodemailer** and **SMTP** for:
- Email Verification
- Password Reset OTPs
- Contact Form Messages
- Account Notifications
---
# ⚙️ Environment Variables
## Backend (.env)
```env
PORT=
ADMIN_EMAIL=
MONGODB_URI=
DB_NAME=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SENDER_EMAIL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_WEBHOOK_ENDPOINT=
```
---
## Frontend (.env)
```env
VITE_BACKEND_URL=http://localhost:8004
```
---
## Admin Dashboard (.env)
```env
VITE_BACKEND_URL=http://localhost:8004
```
---
# 🚀 Installation & Setup
## 1️⃣ Clone Repository
```bash
git clone https://github.com/Jabbirkhan/Full-Stack-Food-Delivery-Website.git
```
---
## 2️⃣ Install Dependencies
### Backend
```bash
cd backend
npm install
```
### Customer Frontend
```bash
cd frontend
npm install
```
### Admin Dashboard
```bash
cd admin
npm install
```
---
## 3️⃣ Configure Environment Variables
Create:
```text
backend/.env
frontend/.env
admin/.env
```
Configure credentials for:
- MongoDB Atlas
- Cloudinary
- SMTP
- Google OAuth
- GitHub OAuth
- Stripe
- Upstash Redis
---
## 4️⃣ Start Development Servers
### Backend
```bash
cd backend
npm run server
```
### Customer Frontend
```bash
cd frontend
npm run dev
```
### Admin Dashboard
```bash
cd admin
npm run dev
```
✅ Run all applications in separate terminals.
---
# 🔒 Security Features
- bcrypt Password Hashing
- JWT Authentication
- Cookie-Based Authentication
- Protected Routes
- Google OAuth Authentication
- GitHub OAuth Authentication
- Email Verification
- OTP-Based Password Recovery
- Input Validation
- Error Handling Middleware
- Upstash Rate Limiting
- Secure File Uploads
---
# 📱 Responsive Design
Optimized for:
- 💻 Desktop
- 📱 Mobile Devices
- 📟 Tablets
---
# ☁️ Deployment Architecture
| Component | Platform |
|------------|------------|
| Customer Frontend | Vercel |
| Admin Dashboard | Vercel |
| Backend API | Render |
| Database | MongoDB Atlas |
| Media Storage | Cloudinary |
---
# ✅ Testing Checklist
### Authentication
- [ ] User Registration & Login
- [ ] OAuth Authentication
- [ ] Email Verification Flow
- [ ] Password Reset Flow
### Product Management
- [ ] Product CRUD Operations
- [ ] Half / Full Plate Pricing
- [ ] Product Image Uploads
### Cart & Checkout
- [ ] Cart Operations
- [ ] COD Checkout
- [ ] Stripe Payment Flow
### Orders
- [ ] Order Tracking
- [ ] Admin Order Management
- [ ] Status Updates
### General
- [ ] Contact Form Email Delivery
- [ ] Responsive Layouts
- [ ] Production Configuration
---
# 📄 License
This project is licensed under the **MIT License**.
---
# 👨💻 Author
Developed using:
- React.js
- Node.js
- Express.js
- MongoDB Atlas
- Cloudinary
- Stripe Integration
- JWT Authentication
- Google & GitHub OAuth
- Tailwind CSS
---
