# 🍽️ FoodAxis — Restaurant Operations Platform

**FoodAxis** is a next-generation, AI-powered restaurant operations platform built with **React.js** and **Tailwind CSS**. It unifies digital menu management, online food ordering, real-time delivery tracking, automated inventory control, and AI-driven analytics into a single, responsive web application.

> **Course:** SE231 — System Analysis & Design Capstone Project  
> **Semester:** Summer 2026  
> **Group:** 4  
> **Submission Date:** 10/08/2026

---

## 👥 Team Members

| Name | ID | Batch | Section |
|------|-----|-------|---------|
| **Fahmida Faruk** | 242-35-615 | 43 | F2 |
| **Farhana Faruk** | 242-35-614 | 43 | F2 |
| **Orny Ghosh** | 242-35-678 | 43 | F2 |

**Course Teacher:** Md. Selim Reja (Assistant Professor)

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, React Router DOM, Redux Toolkit |
| **Styling** | Tailwind CSS 3, Custom CSS Utilities |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Build Tool** | Vite |
| **State Management** | Redux + React Context |
| **Notifications** | React Hot Toast |

---

# ✨ Key Features

## 🍽️ Customer Portal

- Browse digital menu with categories, filters, and search
- Add items to cart with quantity and customization
- Place orders:
  - Dine-in
  - Takeaway
  - Delivery
- Real-time order tracking with live timeline
- Live GPS delivery tracking
- Order history
- Loyalty rewards program
- Customer support
- Feedback and reviews

---

## 🏪 Restaurant Admin

- Dashboard with sales KPIs and analytics
- Menu management with CRUD operations
- Inventory tracking
- Low-stock alerts
- Order management with status updates
- Delivery management
- Rider assignment
- Staff management
- Role assignments
- AI-powered demand forecasting
- Waste reduction recommendations
- Customer feedback management
- Analytics and reporting

---

## 👨‍🍳 Kitchen Display System

- Real-time order queue
- Kanban-based kitchen workflow
- Color-coded urgency indicators
- One-click order status updates
- Order workflow:
  - Received
  - Preparing
  - Ready
- Daily preparation guide
- AI-powered preparation recommendations
- Waste logging and tracking

---

## 🛵 Delivery Rider

- Rider dashboard
- Earnings overview
- Assigned delivery orders
- Customer details
- One-tap navigation
- Delivery confirmation
- Live map integration
- Delivery history
- Earnings reports

---

## 🌐 Super Admin

- System-wide dashboard
- Multi-restaurant management
- User management across all roles
- Global analytics
- System health monitoring
- System configuration
- Security settings

---

# 📁 Project Structure

```text
foodaxis-frontend/
│
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       └── images/
│           ├── logo
│           ├── food-images
│           └── empty-states
│
├── src/
│   │
│   ├── assets/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button
│   │   │   ├── Input
│   │   │   ├── Modal
│   │   │   ├── Card
│   │   │   ├── Badge
│   │   │   ├── Table
│   │   │   ├── Loader
│   │   │   ├── EmptyState
│   │   │   ├── Toast
│   │   │   └── Avatar
│   │   │
│   │   ├── layout/
│   │   │   ├── AuthLayout
│   │   │   ├── CustomerLayout
│   │   │   ├── AdminLayout
│   │   │   ├── KitchenLayout
│   │   │   ├── RiderLayout
│   │   │   └── SuperAdminLayout
│   │   │
│   │   ├── menu/
│   │   │   ├── MenuItemCard
│   │   │   ├── CategoryFilter
│   │   │   └── CartBadge
│   │   │
│   │   ├── order/
│   │   │   ├── OrderCard
│   │   │   ├── OrderStatusBadge
│   │   │   ├── OrderTimeline
│   │   │   └── LiveMap
│   │   │
│   │   └── analytics/
│   │       ├── SalesChart
│   │       ├── StatCard
│   │       └── WasteReport
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login
│   │   │   ├── Register
│   │   │   ├── ForgotPassword
│   │   │   └── ResetPassword
│   │   │
│   │   ├── customer/
│   │   │   ├── Home
│   │   │   ├── Menu
│   │   │   ├── MenuItemDetail
│   │   │   ├── Cart
│   │   │   ├── Checkout
│   │   │   ├── OrderConfirmation
│   │   │   ├── OrderTracking
│   │   │   ├── OrderHistory
│   │   │   ├── DeliveryTracking
│   │   │   ├── Profile
│   │   │   ├── LoyaltyRewards
│   │   │   └── Support
│   │   │
│   │   ├── admin/
│   │   │   ├── Dashboard
│   │   │   ├── MenuManagement
│   │   │   ├── Inventory
│   │   │   ├── InventoryAlerts
│   │   │   ├── Orders
│   │   │   ├── OrderDetail
│   │   │   ├── DeliveryManagement
│   │   │   ├── StaffManagement
│   │   │   ├── Analytics
│   │   │   ├── CustomerFeedback
│   │   │   ├── Settings
│   │   │   └── AIRecommendations
│   │   │
│   │   ├── kitchen/
│   │   │   ├── KitchenDisplay
│   │   │   ├── OrderQueue
│   │   │   ├── PrepGuide
│   │   │   └── WasteLog
│   │   │
│   │   ├── rider/
│   │   │   ├── RiderDashboard
│   │   │   ├── AssignedOrders
│   │   │   ├── LiveTracking
│   │   │   ├── DeliveryHistory
│   │   │   └── Earnings
│   │   │
│   │   └── superadmin/
│   │       ├── SuperDashboard
│   │       ├── Restaurants
│   │       ├── UserManagement
│   │       ├── SystemSettings
│   │       └── GlobalAnalytics
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useOrders.js
│   │   ├── useInventory.js
│   │   ├── useMenu.js
│   │   ├── useDelivery.js
│   │   ├── useAnalytics.js
│   │   ├── useLocalStorage.js
│   │   ├── useDebounce.js
│   │   ├── useGeolocation.js
│   │   └── useNotifications.js
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── OrderContext.jsx
│   │   ├── NotificationContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── menuService.js
│   │   ├── orderService.js
│   │   ├── inventoryService.js
│   │   ├── deliveryService.js
│   │   ├── paymentService.js
│   │   ├── analyticsService.js
│   │   ├── aiService.js
│   │   ├── notificationService.js
│   │   └── userService.js
│   │
│   ├── store/
│   │   ├── store.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── cartSlice.js
│   │       ├── orderSlice.js
│   │       ├── inventorySlice.js
│   │       └── uiSlice.js
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── formatters.js
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   ├── roles.js
│   │   └── mockData.js
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── RoleBasedRoute.jsx
│   │   └── routePaths.js
│   │
│   ├── styles/
│   │   ├── index.css
│   │   └── globals.css
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── config.js
│
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
├── .env
├── .env.example
├── .eslintrc.cjs
├── .gitignore
└── README.md