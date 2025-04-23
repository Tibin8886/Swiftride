# NovaRide - Car Rental Website

![NovaRide Logo](src/assets/logo.png)

NovaRide is a modern, responsive car rental website built with React and Tailwind CSS. This project provides a complete solution for car rental businesses, featuring a user-friendly interface for browsing, booking, and managing car rentals.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Technologies Used](#technologies-used)
- [Pages Overview](#pages-overview)
- [Components](#components)
- [Authentication](#authentication)
- [Dashboard](#dashboard)
- [Payment System](#payment-system)
- [Crypto Wallet](#crypto-wallet)
- [Future Enhancements](#future-enhancements)

## ✨ Features

- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices
- **Car Listings**: Browse available cars with detailed specifications
- **Car Details**: View comprehensive information about each car
- **Booking System**: Easy-to-use booking form with date selection
- **User Authentication**: Login and signup functionality
- **User Dashboard**: Manage bookings, profile, and payment information
- **Admin Dashboard**: Manage cars, bookings, and users (for administrators)
- **Payment System**: Multiple payment methods including credit card, PayPal, and cryptocurrency
- **Crypto Wallet**: Integrated cryptocurrency wallet for managing digital assets

## 📁 Project Structure

\`\`\`
novaride-clone/
├── public/
│   └── index.html
├── src/
│   ├── assets/            # Images and static assets
│   │   ├── visa.svg       # Payment method icons
│   │   ├── mastercard.svg
│   │   ├── amex.svg
│   │   └── discover.svg
│   ├── components/        # Reusable UI components
│   │   ├── dashboard/     # Dashboard-specific components
│   │   ├── PaypalLogo.jsx # PayPal icon component
│   │   └── ui/            # UI components (buttons, forms, etc.)
│   ├── pages/             # Page components
│   │   ├── Payment.jsx    # Payment system page
│   │   └── CryptoWallet.jsx # Crypto wallet page
│   ├── App.jsx            # Main application component
│   ├── index.css          # Global styles
│   └── main.jsx           # Entry point
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # Project documentation
\`\`\`

## 🚀 Setup Instructions

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/novaride-clone.git
   cd novaride-clone
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Build for production**
   \`\`\`bash
   npm run build
   \`\`\`

## 💻 Technologies Used

- **React**: Frontend library for building user interfaces
- **React Router**: For navigation and routing
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Vite**: Build tool and development server

## 📄 Pages Overview

### Home Page (`src/pages/Home.jsx`)
The landing page featuring hero section, booking form, features, about section, services, and contact form.

### About Page (`src/pages/About.jsx`)
Information about the company, team members, and statistics.

### Services Page (`src/pages/Services.jsx`)
Detailed information about the services offered, pricing, and process.

### Contact Page (`src/pages/Contact.jsx`)
Contact information, form, and FAQ section.

### Car Details Page (`src/pages/CarDetails.jsx`)
Detailed information about a specific car, including specifications, features, reviews, and booking form.

### Login Page (`src/pages/Login.jsx`)
User authentication page for existing users.

### Signup Page (`src/pages/Signup.jsx`)
Registration page for new users.

### Dashboard Page (`src/pages/Dashboard.jsx`)
User dashboard with booking management, profile settings, and payment history.

### Payment Page (`src/pages/Payment.jsx`)
Comprehensive payment system with multiple payment methods including credit card, PayPal, and cryptocurrency.

### Crypto Wallet Page (`src/pages/CryptoWallet.jsx`)
Cryptocurrency wallet for managing digital assets, viewing transaction history, and sending/receiving crypto.

## 🧩 Components

### Navigation (`src/components/Navbar.jsx`)
The main navigation bar with responsive mobile menu.

### Footer (`src/components/Footer.jsx`)
Website footer with links, contact information, and social media.

### Booking Form (`src/components/BookingForm.jsx`)
Form for booking a car with location, date, and personal information fields.

### Hero Section (`src/components/HeroSection.jsx`)
Main banner section on the home page with call-to-action buttons.

### Features Section (`src/components/FeaturesSection.jsx`)
Highlights the main features of the car rental service.

### About Section (`src/components/AboutSection.jsx`)
Brief overview of the company on the home page.

### Services Section (`src/components/ServicesSection.jsx`)
Overview of services offered on the home page.

### Contact Section (`src/components/ContactSection.jsx`)
Contact form and information on the home page.

### Protected Route (`src/components/ProtectedRoute.jsx`)
Route wrapper that requires authentication to access.

### PayPal Logo (`src/components/PaypalLogo.jsx`)
Custom PayPal logo component for the payment system.

### Dashboard Components
- **DashboardHome** (`src/components/dashboard/DashboardHome.jsx`): Main dashboard overview
- **DashboardBookings** (`src/components/dashboard/DashboardBookings.jsx`): Manage bookings
- **DashboardProfile** (`src/components/dashboard/DashboardProfile.jsx`): User profile management
- **DashboardPayments** (`src/components/dashboard/DashboardPayments.jsx`): Payment history
- **DashboardSettings** (`src/components/dashboard/DashboardSettings.jsx`): Account settings

## 🔐 Authentication

The project uses a simple authentication system with localStorage for demo purposes. In a production environment, this would be replaced with a proper backend authentication system.

Authentication features include:
- User registration
- Login/logout functionality
- Protected routes
- User profile management

## 📊 Dashboard

The user dashboard provides the following features:
- Overview of active, pending, and completed bookings
- Detailed booking history
- Profile management
- Payment history
- Account settings

## 💳 Payment System

The payment system offers a comprehensive solution for processing rental payments:

- **Multiple Payment Methods**:
  - Credit/debit card payments with card type detection
  - PayPal integration
  - Cryptocurrency payment options

- **Credit Card Processing**:
  - Real-time card number formatting
  - Card type detection (Visa, Mastercard, Amex, Discover)
  - Secure CVV and expiry date input
  - Save card for future payments option

- **Order Summary**:
  - Detailed breakdown of rental costs
  - Taxes and fees calculation
  - Total amount display
  - Booking details summary

- **Security Features**:
  - Secure payment processing
  - Encrypted data transmission
  - Payment confirmation and receipt

## 💰 Crypto Wallet

The integrated cryptocurrency wallet provides users with the ability to manage digital assets:

- **Asset Management**:
  - View and manage multiple cryptocurrencies (Bitcoin, Ethereum, USDC)
  - Real-time balance updates
  - Price charts and performance tracking

- **Transaction Capabilities**:
  - Send cryptocurrency to other wallets
  - Receive cryptocurrency via QR code or wallet address
  - View detailed transaction history

- **Wallet Features**:
  - Secure wallet connection
  - Balance hiding for privacy
  - QR code generation for receiving funds
  - Copy wallet address functionality

- **Market Information**:
  - Cryptocurrency price information
  - Market capitalization data
  - Trading volume statistics
  - Price change indicators

## 🚗 Car Details

The car details page (`src/pages/CarDetails.jsx`) provides comprehensive information about each car:

- High-quality images
- Pricing information
- Detailed specifications (doors, passengers, transmission, etc.)
- Features list
- Customer reviews
- Booking form
- Related cars

## 🔮 Future Enhancements

- **Real-time Availability**: Implement a calendar showing real-time car availability
- **Payment Gateway Integration**: Add more payment gateway integrations
- **Multi-language Support**: Add support for multiple languages
- **Dark Mode**: Implement dark mode theme
- **Advanced Filtering**: Add more advanced car filtering options
- **Car Comparison**: Allow users to compare multiple cars side by side
- **User Reviews**: Allow authenticated users to leave reviews
- **Notifications**: Email and SMS notifications for bookings
- **Recurring Payments**: Support for subscription-based rentals
- **Payment Confirmation Page**: Detailed receipt and booking confirmation
- **Multi-currency Support**: Support for payments in different currencies
- **Enhanced Crypto Integration**: Support for more cryptocurrencies and blockchain networks

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.


 Beckend part .......



