<p align="center">
  <img src="public/text.png" alt="Mystery Message Logo" width="70" style="vertical-align: middle;"/>
  <span style="font-size: 42px; font-weight: 700; margin-left: 10px; vertical-align: middle;">
    Mystery Message
  </span>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232a?logo=react&logoColor=61dafb"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/NextAuth.js-2d3748?logo=nextdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/ShadCN_UI-000000?logo=radixui&logoColor=white"/>
  <img src="https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white"/>
  <img src="https://img.shields.io/badge/Resend-000000?logo=resend&logoColor=white"/>
</p>


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

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/ajilkumar/Mystery-Message.git
cd mystery-message
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
MONGODB_URI=

RESEND_API_KEY=

NEXT_AUTH_SECRET=

OPENAI_API_KEY=
```

Replace the placeholder values with your real credentials.

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

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
