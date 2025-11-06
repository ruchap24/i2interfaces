# 🚀 Setup Instructions - Fullstack LinkedIn Clone

## ⚠️ **FIXING THE CONNECTION ERROR**

### **The Problem**
The error `ERR_CONNECTION_REFUSED` means **the backend server is not running**. The frontend is trying to connect to `http://localhost:4000`, but nothing is listening on that port.

### **The Solution**
You need to start the backend server **before** using the frontend.

---

## 📋 **Step-by-Step Setup**

### **Step 1: Backend Setup**

Open **Terminal 1**:

```bash
cd i2interfaces/backend

# 1. Install dependencies (if not done)
npm install

# 2. Verify .env file exists and has correct values
cat .env
# Should show DATABASE_URL and JWT_SECRET

# 3. Run database migrations
npx prisma migrate dev --name init

# 4. Generate Prisma Client
npx prisma generate

# 5. (Optional) Seed database with dummy data
npm run prisma:seed

# 6. Start the backend server
npm run start:dev
```

**Expected Output:**
```
🚀 Backend server is running on: http://localhost:4000
📡 API endpoints available at: http://localhost:4000/auth, http://localhost:4000/profile
🔒 CORS enabled for: http://localhost:3000
```

**⚠️ Keep this terminal open!** The backend must stay running.

---

### **Step 2: Frontend Setup**

Open **Terminal 2** (new terminal):

```bash
cd i2interfaces/frontend

# 1. Install dependencies (if not done)
npm install

# 2. Start the frontend server
npm run dev
```

**Expected Output:**
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
```

---

### **Step 3: Test the Application**

1. Open browser: `http://localhost:3000`
2. Click "Sign Up" or go to `http://localhost:3000/signup`
3. Fill in the form and submit
4. You should now see success (no more connection error!)

---

## 🌱 **Seeding Dummy Data (Optional)**

To populate the dashboard with sample profiles:

```bash
cd i2interfaces/backend
npm run prisma:seed
```

This will create 5 dummy users:
- **John Doe** - Senior Software Engineer at Google
- **Jane Smith** - Product Manager at Microsoft
- **Mike Johnson** - Full-Stack Developer at Netflix
- **Sarah Williams** - Data Scientist at Tesla
- **David Brown** - DevOps Engineer at AWS

**All test users have password:** `password123`

**Test credentials:**
- Email: `john.doe@example.com`
- Password: `password123`

---

## 🔍 **Verification Checklist**

Before testing signup/login, verify:

- ✅ Backend terminal shows: `🚀 Backend server is running on: http://localhost:4000`
- ✅ Frontend terminal shows: `Local: http://localhost:3000`
- ✅ No errors in either terminal
- ✅ `.env` file exists in `backend/` directory
- ✅ Database migrations completed successfully

---

## 🐛 **Troubleshooting**

### **Error: "Port 4000 already in use"**
```bash
# Find and kill the process
lsof -i :4000
kill -9 <PID>
```

### **Error: "Cannot find module '@prisma/client'"**
```bash
cd backend
npx prisma generate
```

### **Error: "Database connection failed"**
- Check your `.env` file has correct `DATABASE_URL`
- Verify Neon DB connection string is valid
- Test connection: `npx prisma db pull`

### **Error: "CORS policy blocked"**
- Make sure backend is running
- Check backend console shows: `🔒 CORS enabled for: http://localhost:3000`
- Verify frontend is running on port 3000

---

## 📝 **Quick Command Reference**

### **Backend Commands**
```bash
cd i2interfaces/backend

# Start server
npm run start:dev

# Database operations
npx prisma migrate dev          # Run migrations
npx prisma generate             # Generate Prisma Client
npm run prisma:seed             # Seed dummy data

# Build for production
npm run build
npm run start:prod
```

### **Frontend Commands**
```bash
cd i2interfaces/frontend

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

---

## 🔗 **API Endpoints**

Once backend is running, test these endpoints:

**Health Check:**
```bash
curl http://localhost:4000
```

**Signup:**
```bash
curl -X POST http://localhost:4000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

**Login:**
```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## 📊 **Architecture Overview**

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   Frontend      │  HTTP   │    Backend       │   SQL   │   PostgreSQL    │
│   (Next.js)     │ ──────> │   (NestJS)       │ ──────> │   (Neon DB)     │
│   Port: 3000    │         │   Port: 4000     │         │   Cloud DB      │
└─────────────────┘         └─────────────────┘         └─────────────────┘
      │                              │
      │                              │
      └────────── JWT Token ─────────┘
```

**Request Flow:**
1. Frontend sends request to `http://localhost:4000/api/endpoint`
2. Backend processes request (authentication, validation, etc.)
3. Backend queries PostgreSQL via Prisma ORM
4. Backend sends response back to frontend
5. Frontend updates UI based on response

---

## ✅ **Success Indicators**

When everything is working correctly:

1. **Backend Console:**
   - Shows startup messages
   - No error messages
   - Shows "🚀 Backend server is running"

2. **Frontend Console (Browser DevTools):**
   - Network requests show status 200/201
   - No CORS errors
   - No connection refused errors

3. **Application:**
   - Signup works without errors
   - Login works and redirects to profile
   - Dashboard shows all profiles
   - Profile pages load correctly

---

## 🎯 **Next Steps After Setup**

1. ✅ Sign up with a new account
2. ✅ Complete your profile (add experience, education, skills)
3. ✅ View dashboard to see all profiles
4. ✅ Click on profiles to view public profiles
5. ✅ Edit your profile to test CRUD operations

---

**Need help?** Check `CONNECTION_TROUBLESHOOTING.md` for detailed troubleshooting.

