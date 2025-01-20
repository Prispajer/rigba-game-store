# RIGBA - Game Database and Online Store

## Project Objective
The goal of the **"RIGBA"** project is to create a modern and functional game database that also serves as an online store. The application provides intuitive navigation, allowing users to browse, rate, add games to their wishlist, and purchase "fake" online game keys. The database stores details about games and available genres. Through integration with public APIs, users can stay updated with the latest news and trends in the gaming world. Additionally, the project includes test payment features to simulate the purchase process and payment system integration.

## Project Scope
The scope of the store's functionality includes:
- **Cart Management**: Add, remove, and adjust the quantity of games in the cart.
- **Wishlist Management**: Add and remove games from the wishlist.
- **Pagination**: All data-related sections use pagination for improved user experience.
- **Filtering and Sorting**: Sort games and filter them based on current data.
- **Game Interaction**: Features to write reviews and like/unlike them.
- **Payments**: Integration with the test payment gateway Stripe, simulating the real payment process with proper messages and steps.
- **User Management**: Handles authentication and authorization, including registration, login, password reset, email verification, and more.

## Installation Instructions

### 1. Download the ZIP File
Download the ZIP file containing the application from the `Microservices-Based Applications Programming – Adrian Kozieł 55252` folder.

### 2. Extract the ZIP File
Unzip the file to a chosen folder on your computer.

### 3. Install Required Dependencies
1. Open **Visual Studio Code**.
2. In the top-left corner, click on `File > Open Folder`.
3. Select the extracted folder named `rigba-game-store`.
4. Once the folder is open in the Explorer, click `View > Terminal`.
5. In the terminal, navigate to the folder by typing:
   - If the folder is on drive C:
     ```bash
     cd C:/Users/YourUser/Desktop/rigba-game-store
     ```
   - If it's on another drive (e.g., D):
     ```bash
     D:
     cd /Web/rigba-game-store
     ```
6. Once the terminal shows the correct path, install the required dependencies:
   ```bash
   npm install
