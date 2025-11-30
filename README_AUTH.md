# Coffee Shop Authentication System

Complete authentication service built with Next.js 16, Prisma v7, and PostgreSQL.

## 🚀 Features

### Authentication
- ✅ User registration with email, password, name, phone, and profile image
- ✅ Email/password login
- ✅ OTP email verification for registration
- ✅ OTP-based password reset
- ✅ JWT token-based sessions with HTTP-only cookies
- ✅ Role-based access control (CLIENT, ADMIN, STAFF)
- ✅ Secure password hashing with bcrypt

### User Management
- ✅ User profile viewing and editing
- ✅ Profile image upload and management
- ✅ Role-based dashboards
- ✅ Email verification status tracking

### Security
- ✅ Password strength validation (min 8 chars, uppercase, lowercase, number)
- ✅ Email format validation
- ✅ File upload validation (type, size)
- ✅ Input sanitization
- ✅ XSS protection headers
- ✅ CORS configuration
- ✅ HTTP-only cookies for token storage
- ✅ Secure headers middleware

## 📁 Project Structure

```
coffee-shop/
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register.js       # User registration
│   │   │   ├── login.js          # User login
│   │   │   ├── logout.js         # User logout
│   │   │   ├── send-otp.js       # Send OTP email
│   │   │   └── verify-otp.js     # Verify OTP code
│   │   └── user/
│   │       └── profile.js        # Get/Update user profile
│   ├── client/
│   │   └── dashboard.js          # Client dashboard
│   ├── staff/
│   │   └── dashboard.js          # Staff dashboard
│   ├── admin/
│   │   └── dashboard.js          # Admin dashboard
│   ├── register.js               # Registration page
│   ├── login.js                  # Login page
│   ├── verify-otp.js             # OTP verification page
│   ├── profile.js                # User profile page
│   ├── forgot-password.js        # Forgot password page
│   ├── index.js                  # Home page
│   └── _app.js                   # App wrapper with AuthProvider
├── components/
│   ├── Layout.js                 # Main layout with navigation
│   ├── Card.js                   # Card component
│   ├── Input.js                  # Input component
│   └── Button.js                 # Button component
├── hooks/
│   └── useAuth.js                # Authentication hook
├── lib/
│   ├── prisma.js                 # Prisma client
│   ├── jwt.js                    # JWT utilities
│   ├── email.js                  # Email utilities
│   ├── validation.js             # Validation schemas
│   └── upload.js                 # File upload utilities
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Database migrations
├── public/
│   └── uploads/
│       └── avatars/              # User avatar uploads
├── middleware.js                 # Security headers middleware
└── .env                          # Environment variables
```

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Update `.env` file with your configuration:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/joker_db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_FROM="Coffee Shop <noreply@coffeeshop.com>"
APP_URL="http://localhost:3000"
```

### 3. Run Database Migrations
```bash
npx prisma migrate dev
```

### 4. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user with email, password, name, phone (optional), and avatar (optional).

**Request:** `multipart/form-data`
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  password: "SecurePass123",
  phone: "+1234567890",  // optional
  avatar: File           // optional
}
```

**Response:**
```javascript
{
  success: true,
  message: "Registration successful! Please check your email for verification code.",
  user: { id, name, email, role, ... }
}
```

#### POST /api/auth/login
Login with email and password.

**Request:**
```javascript
{
  email: "john@example.com",
  password: "SecurePass123"
}
```

**Response:**
```javascript
{
  success: true,
  message: "Login successful",
  user: { id, name, email, role, ... },
  token: "jwt-token"
}
```

#### POST /api/auth/logout
Logout current user (clears JWT cookie).

**Response:**
```javascript
{
  success: true,
  message: "Logout successful"
}
```

#### POST /api/auth/send-otp
Send OTP code to email for verification or password reset.

**Request:**
```javascript
{
  email: "john@example.com",
  type: "registration" | "password-reset"
}
```

**Response:**
```javascript
{
  success: true,
  message: "OTP sent successfully. Please check your email."
}
```

#### POST /api/auth/verify-otp
Verify OTP code sent to email.

**Request:**
```javascript
{
  email: "john@example.com",
  code: "123456"
}
```

**Response:**
```javascript
{
  success: true,
  message: "Email verified successfully. You can now log in."
}
```

### User Endpoints

#### GET /api/user/profile
Get current user profile (requires authentication).

**Response:**
```javascript
{
  success: true,
  user: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatarUrl: "/uploads/avatars/...",
    phone: "+1234567890",
    role: "CLIENT",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /api/user/profile
Update user profile (requires authentication).

**Request:** `multipart/form-data`
```javascript
{
  name: "John Updated",
  phone: "+9876543210",
  avatar: File  // optional
}
```

**Response:**
```javascript
{
  success: true,
  message: "Profile updated successfully",
  user: { ... }
}
```

## 🎨 Frontend Pages

### Public Pages
- `/` - Home page with welcome message
- `/register` - User registration form
- `/login` - User login form
- `/verify-otp` - Email verification with OTP
- `/forgot-password` - Password reset request

### Protected Pages (Require Authentication)
- `/profile` - User profile view/edit
- `/client/dashboard` - Client dashboard
- `/staff/dashboard` - Staff dashboard
- `/admin/dashboard` - Admin dashboard

## 🔐 Security Features

1. **Password Security**
   - Bcrypt hashing with salt rounds
   - Minimum 8 characters
   - Must contain uppercase, lowercase, and number

2. **Token Security**
   - JWT tokens with 7-day expiration
   - HTTP-only cookies (not accessible via JavaScript)
   - Secure flag in production
   - SameSite: strict

3. **Input Validation**
   - Zod schema validation for all inputs
   - Email format validation
   - File type and size validation
   - Input sanitization

4. **Security Headers**
   - X-Frame-Options: SAMEORIGIN
   - X-Content-Type-Options: nosniff
   - X-XSS-Protection: 1; mode=block
   - Strict-Transport-Security
   - Content Security Policy

5. **File Upload Security**
   - Max file size: 5MB
   - Allowed types: image/jpeg, image/png, image/gif, image/webp
   - Unique filenames to prevent overwrites
   - Stored in public/uploads/avatars/

## 🧪 Testing

### Manual Testing Checklist

1. **Registration Flow**
   - [ ] Register with valid data
   - [ ] Upload profile image
   - [ ] Receive OTP email
   - [ ] Verify email with OTP
   - [ ] Login after verification

2. **Login Flow**
   - [ ] Login with verified account
   - [ ] Redirect to role-based dashboard
   - [ ] Cannot login with unverified account

3. **Profile Management**
   - [ ] View profile information
   - [ ] Update name and phone
   - [ ] Change profile picture
   - [ ] See updated information

4. **Role-Based Access**
   - [ ] CLIENT sees client dashboard
   - [ ] STAFF sees staff dashboard
   - [ ] ADMIN sees admin dashboard

5. **Security**
   - [ ] Cannot access protected routes without login
   - [ ] Token stored in HTTP-only cookie
   - [ ] Logout clears session

## 📝 Database Schema

### User Model
```prisma
model User {
  id         Int      @id @default(autoincrement())
  name       String
  email      String   @unique
  password   String
  avatarUrl  String?
  phone      String?
  role       Role     @default(CLIENT)
  isVerified Boolean  @default(false)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  otps       Otp[]
}
```

### OTP Model
```prisma
model Otp {
  id        Int      @id @default(autoincrement())
  userId    Int
  code      String
  expiresAt DateTime
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@index([userId])
}
```

### Role Enum
```prisma
enum Role {
  CLIENT
  ADMIN
  STAFF
}
```

## 🎯 Next Steps

1. Implement password reset functionality
2. Add refresh token mechanism
3. Implement rate limiting for API endpoints
4. Add unit and integration tests
5. Set up email templates with better styling
6. Add social authentication (Google, Facebook)
7. Implement two-factor authentication (2FA)
8. Add audit logging for security events

## 📄 License

This project is part of the Coffee Shop application.

