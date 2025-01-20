<div align="center">
  <img src="./public/icons/logo.png" alt="Logo" width="80" height="80" style="vertical-align: middle;"/>
  <h1 style="display: inline; vertical-align: middle;">RIGBA - Game Database and Online Store</h1>
</div>

## Introduction
**RIGBA** is a modern and functional web application that combines a game database with an online store experience. It utilizes live data from APIs and features a REST API architecture with services, interfaces, and classes. The application also incorporates React, React hooks, and Custom hooks.

### Environments
- **Local Version**: Provides full functionality but requires downloading and running the app locally.
- **Live Version**: Offers limited functionality (e.g., restricted Stripe payment processing and email sending via Resend API).

## Key Features
The application includes a comprehensive set of features for users to enjoy a seamless experience:

### Store Features
- **Fully Responsive Design**: Optimized for devices of all sizes.
- **Props Validation**: Ensures data integrity and prevents errors using PropTypes.
- **Authentication Providers**: Log in with Facebook, Google, or Discord for a secure and fast login experience.
- **Cart Management**: Add, remove, and adjust the quantity of games in the cart with dynamic updates.
- **Local Cart and Wishlist Synchronization**: Automatically syncs items between local storage and the database, allowing users to maintain their cart and wishlist across sessions.
- **Wishlist Management**: Save games for later and easily manage the wishlist.
- **Pagination**: Divides large amounts of data into manageable chunks, improving performance and user experience.
- **Filtering and Sorting**: Filter and sort games or wishlist items by genre, price, rating, or release date.
- **Game Interaction**: Write reviews and like or dislike games to share your opinions and preferences.
- **Payments**: Stripe integration in test mode for realistic payment simulations.
- **Purchase Management**: View past purchases and check order status.
- **Dynamic URL Rendering**: Dynamically updates the URL based on filters and sorting, allowing users to bookmark and share filtered views.
- **State Management**: Redux for global state management and custom hooks for component state and side effects.

### User Management
- **Registration and Login**: Secure account creation and login.
- **Password Reset**: Mechanism for resetting forgotten passwords.
- **Email Verification**: Ensures account authenticity with email confirmation.
- **Password Update**: Update passwords via the user dashboard.
- **Two-Factor Authentication (2FA)**: Enhanced security to prevent unauthorized access.
- **Image Update**: Mechanism for updating account image profile.


## Application Screenshots and Demo
- **Home Page**  
  ![Home Page](https://drive.usercontent.google.com/download?id=1K61BzTSIlDpAyfy_h1iXSdiFMxkSgmFi&export=view&authuser=0)
  
- **Filters Page**  
  ![Filters Page](https://drive.usercontent.google.com/download?id=19cCvUgDr0fglwWn-hhypFOP9tZTWxobK&export=view&authuser=0)

- **Game Page**  
  ![Game Page](https://drive.usercontent.google.com/download?id=1_4p4HM0I0dFNIixbkHHCqs7dO68DxLAY&export=view&authuser=0)
  
- **Game Page**  
  ![Game Page](https://drive.usercontent.google.com/download?id=1ONm4_-RPaoNFSacUtxNX1C1omlMi7_FS&export=view&authuser=0)
  
- **Account Page**  
  ![Account Page](https://drive.usercontent.google.com/download?id=1gpi363YrecqHJMzuVDETruX27VTARTKS&export=view&authuser=0)
  
- **Login Page**  
  ![Login Page](https://drive.usercontent.google.com/download?id=1ZAi3UqKsEYUmeodrY3JaQbCcyQJPwsqG&export=view&authuser=0)

- **Demo**  
  [Game Store Demo on YouTube](https://www.youtube.com/watch?v=FaoslE0Mqc4&t=87s)

## Application Tech Stack
  - TypeScript
  - React
  - Next.js
  - NextAuth.js
  - Tailwind CSS
  - React Hook Form
  - Custom React Hooks
  - Prisma
  - REST API
  - PostgreSQL
  - Zod
  - Redux Toolkit
  - Stripe
  - Jest
  - Resend

## Installation Instructions

### Test Account for Live Version (Test Account without emails and payments)
- **Username**: `prispajertestdev@gmail.com`
- **Password**: `123123123123`

### Steps to Run Locally
1. **Download the ZIP File**  
   Download the ZIP file containing the application from the repository.

2. **Extract the ZIP File**  
   Unzip the file to a directory on your computer.

3. **Install Required Dependencies**
   1. Open **Visual Studio Code**.
   2. Go to `File > Open Folder` and select the extracted folder (`rigba-game-store`).
   3. In the top menu, click `View > Terminal` to open the terminal.
   4. Navigate to the folder in the terminal:
      - For C drive:
        ```bash
        cd C:/Users/YourUser/Desktop/rigba-game-store
        ```
      - For other drives (e.g., D drive):
        ```bash
        D:
        cd /Web/rigba-game-store
        ```
   5. Once in the correct folder, run:
      ```bash
      npm install
      ```
   6. After the installation finishes, start the application with:
      ```bash
      npm run dev
      ```

4. **Open the Application**  
   Open your browser and go to [http://localhost:3000](http://localhost:3000).  
   - Note: This is the development version, so expect reduced performance and some missing optimizations.

### Third-Party Service Setup
- **Resend**:  
  1. Create an account on [Resend](https://resend.com).
  2. Generate an API key.
  3. Update the `.env` file with your generated key:
     ```bash
     NEXT_PUBLIC_RESEND_API_KEY=your_generated_key
     ```
  4. The email address used in the Resend account will be used for email-related actions like email verification.

- **Stripe**:  
  1. Create an account on [Stripe](https://stripe.com).
  2. Generate API keys for your account.
  3. Update the `.env` file with the following Stripe variables:
     ```bash
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
     STRIPE_SECRET_KEY=your_secret_key
     ```
  4. Create a `WEBHOOK_SECRET_KEY` by searching for “API” in Stripe and following the steps.
  5. Download and install [Stripe CLI](https://stripe.com/docs/stripe-cli).
  6. Open `CMD` and navigate to your Stripe CLI installation directory:
     ```bash
     cd /path/to/stripe-cli
     ```
  7. Log in to Stripe CLI:
     ```bash
     stripe login
     ```
  8. Start listening for webhooks:
     ```bash
     stripe listen --forward-to localhost:3000/api/stripe/webhook
     ```

### Testing Payments
- **Test Card**:
  - **Card Number**: `4242 4242 4242 4242`
  - **Expiry Date**: `04/44`
  - **CVC**: `444`
