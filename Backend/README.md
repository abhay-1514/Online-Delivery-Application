Online Delivery Application
This project is an online delivery application built with Node.js, Express, MongoDB for the backend, and React for the frontend. It supports multiple user roles: Customer, Vendor, Delivery Personnel, and Admin. The application includes role-based authentication, product management, order management, and delivery tracking.

Features Overview
User Roles & Authentication

Role-based access for Customers, Vendors, Delivery Personnel, and Admin.
Authentication system using JWT.
APIs:
POST /api/auth/register: Registers a user with a specific role.
POST /api/auth/login: Authenticates the user and returns a JWT token.
Customer Dashboard

View all products listed by vendors.
Add products to wishlist or cart.
Place orders directly from the cart or individual product pages.
APIs:
GET /api/products: Fetches all products for customers.
POST /api/orders: Place an order for products in the cart.
Vendor Dashboard

View and manage products.
Assign delivery personnel to orders.
View orders placed for their products.
APIs:
GET /api/vendor/products: Fetches products added by the vendor.
POST /api/vendor/add-product: Adds a new product (with image support).
PUT /api/vendor/update-product/:productId: Updates a product's details.
DELETE /api/vendor/delete-product/:productId: Deletes a product.
GET /api/vendor/orders: Fetches all orders associated with vendor's products.
PUT /api/vendor/assign-delivery/:orderId: Assigns delivery personnel to an order.
Delivery Personnel Dashboard

View assigned orders.
Update order status (Picked Up, Delivered).
APIs:
GET /api/delivery/assigned-orders: Fetches orders assigned to the delivery personnel.
PUT /api/delivery/update-order-status/:orderId: Updates the status of an order.
Admin Dashboard

View all users (customers, vendors, delivery personnel).
Block or unblock users based on their role.
APIs:
GET /api/admin/users: Fetches all registered users.
PUT /api/admin/block-user/:userId: Blocks a user.
PUT /api/admin/unblock-user/:userId: Unblocks a user.
Cart Management

The cart is managed using a hybrid approach with the Context API and localStorage.
Customers can add products to the cart, view total amounts, and proceed to place orders.
APIs:
POST /api/cart/add: Adds items to the cart.
GET /api/cart/view: Fetches cart items for the customer.
Order Management

Customers can view all placed orders and their current status.
Vendors can view orders for their products.
Delivery personnel can update the status of assigned orders.
APIs:
GET /api/orders/:userId: Fetches all orders for the specified user (based on role).
PUT /api/orders/update-status/:orderId: Updates order status for delivery personnel or vendor.
Product Management

Vendors can add, update, and delete products.
Customers can view product details, add to cart, or wishlist.
APIs:
GET /api/products/:productId: Fetches details of a single product.
POST /api/vendor/add-product: Adds a new product.
PUT /api/vendor/update-product/:productId: Updates an existing product.
DELETE /api/vendor/delete-product/:productId: Deletes a product.
Notifications and Toast Messages

Real-time notifications and toast messages for actions like order updates, product management, and user interactions (registration, login).
Notifications are displayed for success or error based on API responses.
Responsive Design

All dashboards and pages are designed to be responsive using CSS frameworks.
The UI has been enhanced with button and layout styling.
Installation
Prerequisites
Node.js (v14 or higher)
MongoDB
React
Backend Installation
Clone the repository.
Navigate to the backend folder.
Install dependencies:
bash
Copy code
npm install
Create a .env file and add your environment variables (e.g., MongoDB URI, JWT Secret, etc.).
Start the backend server:
bash
Copy code
npm run server
Frontend Installation
Navigate to the frontend folder.
Install dependencies:
bash
Copy code
npm install
Start the frontend server:
bash
Copy code
npm start
API Endpoints
Authentication
POST /api/auth/register: Register a new user.
POST /api/auth/login: Log in and receive a token.
Customer APIs
GET /api/products: Fetch all products.
POST /api/orders: Place an order.
Vendor APIs
GET /api/vendor/products: Fetch all products added by the vendor.
POST /api/vendor/add-product: Add a new product.
PUT /api/vendor/update-product/:productId: Update a product.
DELETE /api/vendor/delete-product/:productId: Delete a product.
GET /api/vendor/orders: View orders for vendor's products.
PUT /api/vendor/assign-delivery/:orderId: Assign delivery personnel to an order.
Delivery Personnel APIs
GET /api/delivery/assigned-orders: Fetch all assigned orders.
PUT /api/delivery/update-order-status/:orderId: Update the status of an order.
Admin APIs
GET /api/admin/users: View all registered users.
PUT /api/admin/block-user/:userId: Block a user.
PUT /api/admin/unblock-user/:userId: Unblock a user.
Tech Stack
Backend: Node.js, Express, MongoDB, JWT for authentication.
Frontend: React, Axios for API requests, Context API, and localStorage for state management.
CSS Framework: For responsiveness and styling.
Future Enhancements
Implement payment methods.
Add push notifications for real-time updates.
Improve order tracking features.