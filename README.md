# FoodApp - React + Manifest

This is a complete food ordering application built with React for the frontend and Manifest for the backend.

## Features

- **User Authentication**: Sign up, log in, and session management.
- **Restaurant Browsing**: View a list of all restaurants.
- **Menu Viewing**: Select a restaurant to see its menu items.
- **Order Placement**: Add items to a cart and place an order.
- **Order History**: View your past orders.
- **Admin Panel**: A complete admin interface to manage all data (Users, Restaurants, Menu Items, Orders).

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation & Setup

1.  **Clone the repository** (or unzip the provided files).

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root of the project and add the credentials provided after your Manifest backend is deployed:
    ```
    VITE_BACKEND_URL=your_manifest_backend_url
    VITE_APP_ID=your_manifest_app_id
    ```

4.  **Run the application**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Demo Credentials

- **User**: `user@manifest.build` / `password`
- **Admin**: `admin@manifest.build` / `admin` (Access via the Admin Panel link)
