# Loan Collection Management System - Frontend (React)

A responsive frontend application for the Loan Collection Management System built with React, TypeScript, and Vite. The application integrates with the Laravel backend REST APIs and provides role-based access for Admin and Field Agents.

---

## 🚀 Tech Stack

| Layer | Technology |
|------|------|
| Frontend | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Form Handling | React Hook Form |
| Validation | Zod |
| Notifications | React Toastify |

---

## 📌 Features Implemented

### Authentication
- Login page
- Protected routes
- Token-based authentication
- Automatic logout on unauthorized requests

### Dashboard
- Total loans
- Total collected today
- Pending amount
- Collection by payment mode
- Best collection time slot

### Customer Management
- Customer listing with pagination
- Create customer
- Edit customer
- Assign customer to field agent

### Loan Management
- Loan listing
- Create loan
- Edit loan

### Collection Management
- Collection listing
- Add collection entry

### Validation
- Client-side validation using React Hook Form and Zod
- Indian mobile number validation
- Numeric field coercion

---

## 📂 Project Structure

```text
src/
├── api/
├── components/
│   ├── common/
│   └── layout/
├── pages/
│   ├── auth/
│   ├── dashboard/
│   ├── customers/
│   ├── loans/
│   └── collections/
├── routes/
├── schemas/
├── types/
├── utils/
└── main.tsx
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone <repository-url>
cd loan-collection-management-frontend-react
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

### 4. Start Development Server

```bash
npm run dev
```

Application URL:

```text
http://localhost:5173
```

### 5. Build for Production

```bash
npm run build
```

---

## 🔐 Authentication Flow

1. User logs in with email and password.
2. Backend returns a Sanctum token.
3. Token is stored in local storage.
4. Axios automatically attaches the token to API requests.
5. Protected routes redirect unauthenticated users to the login page.

---

## 📌 Main Routes

| Route | Description |
|------|------|
| `/login` | Login page |
| `/dashboard` | Dashboard summary |
| `/customers` | Customer list |
| `/customers/create` | Add customer |
| `/customers/:id/edit` | Edit customer |
| `/loans` | Loan list |
| `/loans/create` | Add loan |
| `/loans/:id/edit` | Edit loan |
| `/collections` | Collection list |
| `/collections/create` | Add collection |

---

## 📝 Form Validation

Validation is implemented using Zod schemas.

Examples:
- Mobile number must be a valid 10-digit Indian mobile number.
- Amount fields must be greater than 0.
- Required fields are validated before submission.

---

## 🔌 API Integration

The frontend communicates with the Laravel backend using Axios.

API modules:
- `auth.api.ts`
- `user.api.ts`
- `customer.api.ts`
- `loan.api.ts`
- `collection.api.ts`
- `dashboard.api.ts`

---

## 🧪 Quality Checks

### Type Check and Production Build

```bash
npm run build
```

### Linting (if configured)

```bash
npm run lint
```

---

## 🎨 UI Features

- Responsive layout
- Sidebar navigation
- Reusable page components
- Loading and disabled states
- Validation error messages

---

## 📦 Repository Name

Recommended GitHub repository name:

```text
loan-collection-management-frontend-react
```

---

## 🔗 Backend Repository

This frontend is designed to work with the Laravel backend repository:

```text
loan-collection-management-backend-laravel
```
