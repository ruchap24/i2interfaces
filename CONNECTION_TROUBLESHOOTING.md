# Connection Troubleshooting Guide

## 🔴 Error: `ERR_CONNECTION_REFUSED` on Signup

### **Root Cause**
The error `POST http://localhost:4000/auth/signup net::ERR_CONNECTION_REFUSED` means the **backend server is not running** or not accessible on port 4000.

### **Solution Steps**

#### 1. **Start the Backend Server**

Open a terminal and navigate to the backend directory:

```bash
cd i2interfaces/backend
```

**Make sure your `.env` file is configured:**
```bash
cat .env
```

You should see:
```
DATABASE_URL="postgresql://..."
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=7d
```

**Install dependencies (if not already done):**
```bash
npm install
```

**Run database migrations:**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

**Start the backend server:**
```bash
npm run start:dev
```

You should see:
```
🚀 Backend server is running on: http://localhost:4000
📡 API endpoints available at: http://localhost:4000/auth, http://localhost:4000/profile
🔒 CORS enabled for: http://localhost:3000
```

#### 2. **Verify Backend is Running**

Test the backend in a new terminal:
```bash
curl http://localhost:4000
```

Or test the signup endpoint:
```bash
curl -X POST http://localhost:4000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

#### 3. **Start the Frontend Server**

Open a **new terminal** (keep backend running) and navigate to frontend:

```bash
cd i2interfaces/frontend
npm install
npm run dev
```

Frontend should start on `http://localhost:3000`

#### 4. **Check Frontend API Configuration**

The frontend is configured to use `http://localhost:4000` by default. Verify in:
- `frontend/src/services/api.ts` - Should have `API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'`

#### 5. **Verify CORS Configuration**

The backend CORS is configured to allow requests from `http://localhost:3000`. This is already set in `backend/src/main.ts`.

---

## 🔍 Common Issues & Solutions

### Issue 1: Port 4000 Already in Use

**Error:** `EADDRINUSE: address already in use :::4000`

**Solution:**
```bash
# Find process using port 4000
lsof -i :4000
# Kill the process (replace PID with actual process ID)
kill -9 <PID>
# Or use a different port
PORT=4001 npm run start:dev
```

Then update frontend `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:4001
```

### Issue 2: Database Connection Error

**Error:** `Can't reach database server`

**Solution:**
1. Check your `.env` file has correct `DATABASE_URL`
2. Verify Neon DB connection string is valid
3. Test connection:
```bash
npx prisma db pull
```

### Issue 3: CORS Error

**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution:**
- Backend CORS is already configured in `main.ts`
- Make sure frontend is running on `http://localhost:3000`
- Check browser console for exact CORS error

### Issue 4: JWT Secret Missing

**Error:** `JWT_SECRET is not defined`

**Solution:**
- Add `JWT_SECRET` to `.env` file
- Restart the backend server

### Issue 5: Prisma Client Not Generated

**Error:** `Cannot find module '@prisma/client'`

**Solution:**
```bash
cd backend
npx prisma generate
```

---

## ✅ Verification Checklist

Before testing signup, ensure:

- [ ] Backend server is running on `http://localhost:4000`
- [ ] Frontend server is running on `http://localhost:3000`
- [ ] `.env` file exists in backend with `DATABASE_URL` and `JWT_SECRET`
- [ ] Database migrations are run (`npx prisma migrate dev`)
- [ ] Prisma client is generated (`npx prisma generate`)
- [ ] No port conflicts (4000 for backend, 3000 for frontend)
- [ ] Backend console shows startup messages
- [ ] Browser console shows no CORS errors

---

## 🧪 Testing the Connection

### Manual Test (Backend)
```bash
# Test health endpoint (if exists)
curl http://localhost:4000

# Test signup endpoint
curl -X POST http://localhost:4000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### Browser Test (Frontend)
1. Open `http://localhost:3000/signup`
2. Fill in the form
3. Open browser DevTools (F12) → Network tab
4. Submit the form
5. Check if request goes to `http://localhost:4000/auth/signup`
6. Check response status (should be 200 or 201)

---

## 📝 Quick Start Commands

**Terminal 1 - Backend:**
```bash
cd i2interfaces/backend
npm install
# Make sure .env is configured
npx prisma migrate dev
npx prisma generate
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd i2interfaces/frontend
npm install
npm run dev
```

**Terminal 3 - Seed Database (Optional):**
```bash
cd i2interfaces/backend
npm run prisma:seed
```

---

## 🆘 Still Having Issues?

1. **Check Backend Logs**: Look at the terminal where backend is running
2. **Check Browser Console**: Look for JavaScript errors
3. **Check Network Tab**: See the actual HTTP request/response
4. **Verify Ports**: Use `netstat -an | grep LISTEN` to see what ports are in use
5. **Restart Everything**: Stop both servers and restart

---

## 🔗 Quick Reference

- **Backend URL**: `http://localhost:4000`
- **Frontend URL**: `http://localhost:3000`
- **API Base**: `http://localhost:4000`
- **Signup Endpoint**: `POST /auth/signup`
- **Login Endpoint**: `POST /auth/login`

