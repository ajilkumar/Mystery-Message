# Mystery Message

<p align="center">
  <img src="public/text.png" alt="Mystery Message Logo" width="120"/>
</p>

## Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232a?logo=react&logoColor=61dafb"/>
  <img src="https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/NextAuth.js-2d3748?logo=nextdotjs&logoColor=fff"/>
  <img src="https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white"/>
  <img src="https://img.shields.io/badge/ShadCN-%23423674?logo=radixui&logoColor=white"/>
  <img src="https://img.shields.io/badge/Zod-d4679b?logo=data%3Aimage%2Fsvg%2Bxml;base64&logoColor=white"/>
  <img src="https://img.shields.io/badge/Resend-black?logo=data%3Aimage%2Fsvg%2Bxml;base64&logoColor=white"/>
</p>

---

## Table of Contents
- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Quick Start](#quick-start)
- [Folder Structure](#folder-structure)

---

## Introduction
Mystery Message is a modern, full-stack web application for sending and receiving anonymous messages securely. Built with Next.js, it allows you to share your profile link, receive anonymous feedback or messages, and interact with your audience while respecting privacy.

---

## Tech Stack
- **Frontend:** Next.js 16, React, TypeScript, Tailwind CSS, Radix UI
- **Backend:** Next.js API Routes, NextAuth.js, Mongoose (MongoDB)
- **Authentication:** NextAuth.js
- **Validation:** Zod
- **Forms:** React Hook Form
- **Email:** Resend, React Email
- **Utilities:** clsx, axios, usehooks-ts, class-variance-authority, tailwind-merge

---

## Features
- Anonymous message receiving & sending
- Secure email-based authentication
- Profile creation & username validation
- Modern carousel of sample messages
- Responsive UI with theme support
- Spam prevention & verification via codes
- Custom notification system (Sonner)
- MongoDB integration for storage
- Automated email delivery (Resend)
- User-friendly UI with Radix UI and custom components
- Strong validations on both frontend and backend

---

## Quick Start

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/mysterymessage.git
   cd mysterymessage
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   # or
yarn install
   ```
3. **Copy Environment Variables:**
   ```bash
   cp env.sample.txt .env
   # Fill in your credentials in .env
   ```
4. **Run the App:**
   ```bash
   npm run dev
   # or
yarn dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

---

## Folder Structure
```
 mysterymessage/
 ├─ app/
 │  ├─ (app)/
 │  │  ├─ dashboard/
 │  │  ├─ layout.tsx
 │  │  └─ page.tsx
 │  ├─ (auth)/
 │  │  ├─ sign-in/
 │  │  ├─ sign-up/
 │  │  └─ verify/ [username]/
 │  ├─ api/
 │  │  ├─ accept-messages/
 │  │  ├─ auth/ [...nextauth]/
 │  │  ├─ ...other-routes
 │  ├─ globals.css
 │  ├─ layout.tsx
 │  ├─ page.tsx
 │  └─ u/[username]/
 ├─ components/
 │  ├─ MessageCard.tsx
 │  ├─ Navbar.tsx
 │  └─ ui/
 │     ├─ alert-dialog.tsx
 │     ├─ ... other UI components
 ├─ context/ (AuthProvider)
 ├─ data/ (sample messages)
 ├─ helpers/ (utility functions)
 ├─ lib/ (dbConnect, resend, utils)
 ├─ middleware/
 ├─ models/ (User model)
 ├─ public/ (static assets)
 ├─ schema/ (Zod validation schemas)
 ├─ templates/ (verification email)
 ├─ types/ (custom types)
 ├─ package.json
 ├─ tsconfig.json
 └─ ...other config and support files
```

---

## License
This project is licensed under the MIT License.

---

## Contributing
Feel free to open issues or submit PRs for improvements, bug fixes, or suggestions!
