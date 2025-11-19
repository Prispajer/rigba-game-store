<div align="center">
  <img src="./public/icons/logo.png" alt="Logo" width="300" height="300" style="vertical-align: middle;"/>
  <h1 style="display: inline; vertical-align: middle;">RIGBA - Game Database and Online Store</h1>
</div>

# Introduction
**RIGBA** is a modern and functional web application that combines a game database with an online store experience. It utilizes live data from APIs and features a **REST API architecture with services, interfaces, and classes**. The application also incorporates **React, React hooks, Custom hooks and including Dependency Injection (DI)**.

# Environments
- **Local Version**: Provides full functionality but requires downloading and running the app locally.
- **Live Version**: Offers limited functionality (email sending via the Resend API is not supported).

# Key Features
The application includes a comprehensive set of features for users to enjoy a seamless experience:

## Roadmap
### 🔐 Authentication & User Management
✅ Registration and Login with NextAuth  
✅ OAuth Integration (Google, Facebook, Discord)  
✅ Email Verification via Resend  
✅ Two-Factor Authentication (2FA)  
✅ Password Reset Functionality  
✅ Password Change via Dashboard  
✅ User Profile Update (name, phone, zip code, etc.)  
✅ Profile Image Upload  
✅ Session Management and Data Synchronization between Local Storage and Account  

### 🛒 Store Features
✅ Stripe Payment Integration (Test Mode)  
✅ Resend Email API Setup  
✅ Review and Rating System  
✅ Game Filtering by Tags, Platforms, and Publishers  
✅ Fully Responsive Design for Desktop and Mobile  
✅ Cart and Wishlist Management  
✅ Dynamic URL Rendering for Filters and Sorting  
✅ Purchase History and Order Status  

### 🧪 Infrastructure & Testing
✅ Unit Tests for Core Features  
✅ Final Deployment on Vercel  

### 🔧 Planned Improvements
🔧 Full Refactor of Project Structure  
🔧 Accessibility Enhancements  

## Store Features
- **Fully Responsive Design**: Optimized for devices of all sizes.
- **Props Validation**: Ensures data integrity and prevents errors using PropTypes.
- **Authentication Providers**: Log in with Facebook, Google, or Discord for a secure and fast login experience.
- **Cart Management**: Add, remove, and adjust the quantity of games in the cart with dynamic updates.
- **Local Cart and Wishlist Synchronization**: Automatically syncs items between local storage and the database, allowing users to maintain their cart and wishlist across sessions.
- **Wishlist Management**: Save games for later and easily manage the wishlist.
- **Pagination**: Divides large amounts of data into manageable chunks, improving performance and user experience.
- **Filtering and Sorting**: Filter and sort games or wishlist items by various criteria.
- **Game Interaction**: Write reviews and like or dislike games to share your opinions and preferences.
- **Payments**: Stripe integration in test mode for realistic payment simulations.
- **Purchase Management**: View past purchases and check order status.
- **Dynamic URL Rendering**: Dynamically updates the URL based on filters and sorting, allowing users to bookmark and share filtered views.
- **State Management**: Redux for global state management and custom hooks for component state and side effects.

## User Management
- **Registration and Login**: Secure account creation and login.
- **Password Reset**: Mechanism for resetting forgotten passwords.
- **Email Verification**: Ensures account authenticity with email confirmation.
- **User Data Update**: Mechanism for updating user data like phone number, name, zip code etc.
- **Password Update**: Update password via the user dashboard.
- **Two-Factor Authentication (2FA)**: Enhanced security to prevent unauthorized access.
- **Image Update**: Mechanism for updating account image profile.

# Application Screenshots and Demo
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
 <div align="center">
  <a href="https://www.youtube.com/watch?v=FaoslE0Mqc4" target="_blank">
    <img src="https://img.youtube.com/vi/FaoslE0Mqc4/0.jpg" alt="Game Store Demo on YouTube" />
  </a>
</div>

# Application Tech Stack
  - TypeScript
  - React
  - NextJS
  - NextAuthJS
  - InversifyJS
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

# Testing Data
## Testing Payments
- **Test Card**:
  - **Card Number**: `4242 4242 4242 4242`
  - **Expiry Date**: `04/44`
  - **CVC**: `444`
 
## Test Account for Live Version (Test Account without emails and payments)
- **Username**: `prispajertestdev@gmail.com`
- **Password**: `123123123123`
    
# Installation Local Environments 
This guide walks you through the process of setting up accounts, APIs, and credentials for various services required to run **Rigba Game Store**.

> ⚠️ **IMPORTANT:** YOU NEED TO CREATE A `.env` FILE IN THE ROOT FOLDER OF `rigba-game-store`.
> 
> 🔑 **AND PASTE THE ENVIRONMENT KEYS PROVIDED BELOW!**
> 
> 🌐 **YOU NEED TO CREATE ACCOUNTS ON EACH SITE!**

## 1. NeonTech (Database Setup)
1. Go to [NeonTech](https://neon.tech).
2. Create a new project named **rigba-game-store**.
3. Choose **Postgres Version 16** and **Cloud Service Provider AWS**.
4. Once the project is created, go to the **Dashboard**.
5. Copy the connection strings:
   - **Pooled connection** (`DATABASE_URL`)
   - **Unpooled connection** (`DATABASE_URL_UNPOOLED`)
6. Paste these connection strings into your `.env` file in the appropriate variables.

```env
DATABASE_URL=your_pooled_connection_string
DATABASE_URL_UNPOOLED=your_unpooled_connection_string
```

## 2. Facebook Developer Setup
1. Go to [Facebook for Developers](https://developers.facebook.com).
2. Click on **My Apps** and create a new app called **rigba-game-store**.
3. Get your **App ID** and **App Secret** from the app settings.
4. Go to the https://developers.facebook.com/apps/**YOUR_APP_ID**/use_cases/customize/settings/?product_route=fb-login.
5. Enable **Client OAuth Login** and **Web OAuth Login**.
6. Use **Strict Mode for Redirect URLs** and **Enforce HTTPS**.
7. In the **Valid OAuth Redirect URIs** and **Deauthorize callback URL** fields, add: **https://localhost:3000/api/auth/callback/facebook**
8. In the permissions section, grant **Public Profile** and **Email** full access.

```env
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
```

## 3. Discord Developer Setup
1. Go to [Discord Developer Portal](https://discord.com/developers/applications).
2. Create a new app named **rigba-game-store**.
3. Click on the **OAuth2** option.
4. Get the **CLIENT ID** and **CLIENT SECRET**.
5. In the **Redirects** field, add: **http://localhost:3000/api/auth/callback/discord**

```env
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
```

## 4. Google Developer Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com).
2. Create a new app named **rigba-game-store**.
3. Click on **API & Services** > **Login Data/Details**.
4. Click on **CREATE LOGIN DATA/DETAILS**.
5. Choose **Web Application** then **Identifier Client OAuth**.
6. Add **Authorized JavaScript Sources** with: **http://localhost:3000**.
7. Add **Authorized Redirect URIs** with: **http://localhost:3000/api/auth/callback/google**.
8. Get your **Client ID** and **Client Secret**.

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 5. UploadThing Setup
1. Go to [UploadThing](https://uploadthing.com).
3. Create a new app named **rigba-game-store**.
4. Go to **API Keys** and get the **UPLOADTHING_SECRET** and **UPLOADTHING_TOKEN**.

```env
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_TOKEN=your_uploadthing_token
```

## 6. RAWG API Setup
1. Go to [RAWG API](https://rawg.io/apidocs).
2. Click on **Get API Key**.
3. In the description, write: **I want to use RAWG Database on my non-commercial personal project.**.
4. Write your **contact email:your_email**.
5. Get your **API Key**.

```env
NEXT_PUBLIC_RAWG_API_KEY=your_rawg_api_key
```

## 7. Stripe Setup
1. Go to [Stripe API Keys](https://dashboard.stripe.com/test/apikeys) and get your **Publishable Key** and **Secret Key**.
2. Go to **Webhooks** and add local listeners.
3. Download and install [Stripe CLI](https://stripe.com/docs/stripe-cli).
4. Open `CMD` and navigate to your Stripe CLI (stripe.exe) installation directory:
   ```bash
   cd /path/to/stripe-cli (stripe.exe)
     ```
  5. Log in to Stripe CLI:
     ```bash
     stripe login
     ```
  6. Confirm your Stripe computer connection by pressing enter to verify the account and allow access.
  7. Start listening for webhooks:
     ```bash
     stripe listen --forward-to localhost:3000/api/stripe/webhook
     ```
  8. Get your Stripe Webhook Key from the cmd console. The message will be: **Your webhook signing secret is YOUR_WEBHOOK_KEY**

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
WEBHOOK_SECRET_KEY=your_stripe_webhook_key
```

## 8. Resend Setup
1. Go to [Resend](https://resend.com).
2. Go to **API Keys** and generate a new key.
3. **The email address used in the Resend account will be used for email-related actions like email verification!**.

```env
NEXT_PUBLIC_RESEND_API_KEY=your_resend_api_key
```

## 9. Auth Setup
1. Go to [RandomKeyGenerator](https://randomkeygen.com) or **generate a secret key manually** by writing a random combination of letters, numbers, and symbols.
2. Generate your **Secret Key**.

```env
AUTH_SECRET=your_auth_secret_key
```

Your .env file should look like:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_RAWG_BASE_URL=https://api.rawg.io/api
AUTH_TRUST_HOST=true
DATABASE_URL=your_pooled_connection_string
DATABASE_URL_UNPOOLED=your_unpooled_connection_string
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_TOKEN=your_uploadthing_token
NEXT_PUBLIC_RAWG_API_KEY=your_rawg_api_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
WEBHOOK_SECRET_KEY=your_stripe_webhook_key
NEXT_PUBLIC_RESEND_API_KEY=your_resend_api_key
AUTH_SECRET=your_auth_secret_key
```

# Installation Instructions
### 🛠️ Installation Instructions

1. **Download the ZIP File**  
   - Download the ZIP file containing the application from the repository.

2. **Extract the ZIP File**  
   - Unzip the file to a directory on your computer.

3. **Install Required Dependencies**  
   - Open **Visual Studio Code**.
   - Go to `File > Open Folder` and select the extracted folder (`rigba-game-store`).
   - Open the terminal:
     - **For C drive:**
       ```bash
       cd C:/Users/YourUser/Desktop/rigba-game-store
       ```
     - **For other drives (e.g., D drive):**
       ```bash
       D:
       cd /Web/rigba-game-store
       ```
   - Run the following commands:
     ```bash
     npm install
     npm run dev
     ```

4. **Open the Application**  
   - Open your browser and go to `http://localhost:3000`.
   - Note: This is the development version, so expect reduced performance and some missing optimizations.

