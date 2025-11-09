# I2Interfaces

A fullstack web application built with NestJS, Next.js, PostgreSQL, and Prisma.

## Features

-  Manual JWT Authentication (signup, login, logout)
- User Profile Management
- Experience, Education, and Skills CRUD
- Dashboard with all user profiles
- Public profile viewing
- Responsive UI with Tailwind CSS & Shadcn UI
- State management with Zustand

## Tech Stack

**Backend:**
- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Zustand (State Management)
- Axios

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

## Project Structure
```
linkedin-profile-app/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── profile/
│   │   ├── experience/
│   │   ├── education/
│   │   ├── skill/
│   │   ├── prisma/
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
└── frontend/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── services/
│   ├── store/
│   └── types/
└── package.json
```
Database Schema

User: Authentication credentials
Profile: User profile information
Experience: Work experience records
Education: Educational background
Skills: User skills
