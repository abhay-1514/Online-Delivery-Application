
Online Delivery Application

Overview
This is a complete online delivery application built with Node.js, Express, MongoDB for the backend, and React for the frontend. The application allows users to act as Customers, Vendors, Delivery Personnel, and Admins, each with distinct roles and functionality. The app features user authentication, product and order management, delivery assignment, and much more.

Features
Authentication & Authorization:

Role-based login system for Customers, Vendors, Delivery Personnel, and Admins.
Secure authentication using JSON Web Tokens (JWT).
Product Management:

Vendors can add, edit, and delete products.
Products include pictures and other relevant details.
Order Management:

Customers can place orders, add products to the wishlist, and view order history.
Vendors can view and manage orders for their products.
Delivery Personnel can see assigned orders and update the delivery status.
Admins can view all users and orders and manage the platform.
Dashboard for Each Role:

Separate dashboards for Customers, Vendors, Delivery Personnel, and Admins, with role-specific actions.
Order Status Update:

Real-time order status updates for Customers and Vendors.
Delivery Personnel can update order status to "Picked Up" or "Delivered."
Mobile Responsive Design:

The application is fully responsive and works well on mobile devices.
Toast Notifications:

Success and error messages displayed using toast notifications.
Tech Stack
Backend: Node.js, Express, MongoDB
Frontend: React, Axios for API calls, React Router for navigation
CSS Frameworks: Custom CSS for styling, responsive layout using media queries
Authentication: JSON Web Tokens (JWT)
File Uploads: Multipart form data handling for image uploads
Installation
Backend Setup
Clone the repository.

bash
Copy code
git clone https://github.com/your-repo.git
Install the dependencies.

bash
Copy code
cd backend
npm install
Create a .env file with the following environment variables:

makefile
Copy code
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
Run the server locally:

bash
Copy code
npm run dev
Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd frontend
Install the dependencies:

bash
Copy code
npm install
Start the React development server:

bash
Copy code
npm start
API Endpoints
User Routes:

POST /api/users/register - Register a new user
POST /api/users/login - Login and receive a JWT
Product Routes (Vendor):

GET /api/products - Get all products (only those added by the logged-in vendor)
POST /api/products - Add a new product
PUT /api/products/:id - Edit an existing product
DELETE /api/products/:id - Delete a product
Order Routes (Customer, Vendor, Delivery Personnel):

POST /api/orders - Place a new order
GET /api/orders - Get orders based on role (Customers get their own orders, Vendors get orders for their products, Delivery Personnel get assigned orders)
PUT /api/orders/:id/status - Update the status of an order (delivery personnel only)
Deployment
Backend Deployment (Glitch)
Create a project on Glitch.
Upload your backend files one by one (as Glitch doesn’t allow uploading whole folders).
Configure your environment variables on Glitch.
Start the backend service.
Frontend Deployment (Netlify)
Create a project on Netlify.
Connect your frontend GitHub repository.
Configure the build settings and deploy the site.
Future Improvements
Payment Integration:

Stripe/Razorpay integration is planned but not currently implemented due to regional constraints.
Real-time Notifications:

Potential to add real-time notifications for order updates via email or SMS.
License
This project is licensed under the MIT License.