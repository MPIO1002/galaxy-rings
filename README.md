# Galaxy Ring - E-Commerce Landing Page & Admin Dashboard

> *E-Commerce Landing Page and Product Showcase for Samsung Galaxy Ring.*

<!-- INSERT BANNER OR FULL PAGE SCREENSHOT HERE -->
![Project Banner](YOUR_BANNER_IMAGE_URL_HERE)

This project is a comprehensive solution that includes a **Frontend** (A smooth, interactive product landing page and an admin dashboard) and a **Backend** (API for order processing, lead tracking, and AI integration). The project focuses on delivering a modern User Experience (UX) and optimal business data tracking.

---

## ✨ Key Features

### 🌐 For Customers (Landing Page)
- **Modern & Interactive Design:** Premium Dark mode interface with smooth scroll reveal effects, background autoplay videos, and modern UI components.
- **Visual Purchase Customization:** Allows users to choose ring sizes and colors with dynamically updated carousel images. Includes an interactive video popup guide for ring sizing.
- **Order & Subscription Forms:** Professional lead capture forms for pre-orders and newsletters.
- **AI Virtual Assistant (Chatbot):** Integrated with Google Gemini AI to provide health consultations and answer customer queries directly on the landing page.

### ⚙️ For Administrators (Admin & System)
- **Admin Dashboard:** Manage lists of orders and subscribers. Features include data pagination, live search, deletion, and real-time updates.
- **Real-time Discord Notifications:** Whenever there is a new order or subscription, the system pushes a highly professional, formatted notification (complete with emojis) directly to a Discord channel via Webhook.
- **Vercel Analytics & Tracking:** Tracks user click behaviors on crucial Call-to-Action (CTA) buttons.
- **Security:** Secure admin login system using JWT and password hashing via bcrypt.

---

## 📸 Screenshots

<!-- YOU CAN INSERT SCREENSHOTS HERE FOR BETTER VISUALIZATION -->

### 1. Landing Page Interface
![Landing Page Screenshot](YOUR_LANDING_PAGE_IMAGE_URL_HERE)

### 2. Order & Configuration Section
![Buy Section Screenshot](YOUR_BUY_SECTION_IMAGE_URL_HERE)

### 3. Admin Dashboard
![Admin Dashboard Screenshot](YOUR_ADMIN_DASHBOARD_IMAGE_URL_HERE)

### 4. Discord Webhook Notifications
![Discord Webhook Screenshot](YOUR_DISCORD_WEBHOOK_IMAGE_URL_HERE)

---

## 💻 Tech Stack

**Frontend (`/landing-page`):**
- [Next.js (App Router)](https://nextjs.org/) - React Framework
- React 19 & TypeScript
- Tailwind CSS v4 & Tailwind Merge & clsx
- Shadcn UI & Base UI Components
- Vercel Analytics (User Tracking)
- Zod (Form Validation)

**Backend (`/backend`):**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- TypeScript & OOP Architecture
- [PostgreSQL](https://www.postgresql.org/) (Using `pg` package)
- JWT (JSON Web Token) & Bcryptjs
- Google Generative AI (Gemini)

---

## 📂 Project Structure

```bash
galaxy-rings/
├── backend/                  # API Server Source Code (Node.js/Express)
│   ├── src/
│   │   ├── controllers/      # Request Handling & Discord Webhook Logic
│   │   ├── services/         # Business Logic
│   │   ├── routes/           # API Routing
│   │   ├── models/           # Data Models (DB)
│   │   └── app.ts            # Server Entry Point
│   ├── .env                  # Backend Environment Variables
│   └── package.json
│
└── landing-page/             # Frontend Source Code (Next.js)
    ├── app/                  # App Router Pages & Layout
    ├── components/           # UI Components (Hero, BuySection, Chatbot, etc.)
    ├── hooks/                # Custom React Hooks for API calls and logic
    ├── public/               # Static Assets (Images, Videos, Icons, Fonts)
    ├── .env.local            # Frontend Environment Variables
    └── package.json
```

---

## 🚀 Getting Started (Local Development)

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure your environment variables:
   ```env
   # Database Configuration
   DB_USER=your_postgres_user
   DB_PASSWORD=your_postgres_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=galaxy_rings_db

   # JWT Secret Key
   JWT_SECRET=your_jwt_secret_key

   # Google Gemini API Key for Chatbot
   GEMINI_API_KEY=your_gemini_key

   # Discord Webhook URL (For order & subscription notifications)
   DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/..."
   ```
4. Start the backend server in development mode:
   ```bash
   npm run dev
   ```
   *(The backend server will run on `http://localhost:5000` by default)*

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd landing-page
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file and configure the backend URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
4. Start the frontend application in development mode:
   ```bash
   npm run dev
   ```
   *(The website will be available at `http://localhost:3000`)*

---

## 🤝 Contact & Contributing
This project is built and maintained for learning and demonstration purposes. If you have any questions or would like to contribute, please feel free to open an Issue or contact the author.