# AWS Shopello

## Section 1: Project Description

**Project Name:** Shopello

**Description:**  
This project is a scalable, secure, and highly available e-commerce application deployed on AWS. It allows users to browse products, add items to a shopping cart, and securely check out. User authentication is managed by AWS Cognito, while backend operations utilize AWS Lambda, API Gateway, and other serverless services to ensure high availability and auto-scaling during traffic spikes. This solution addresses common challenges in traditional hosting such as scalability issues, security risks, and high operational overhead.

---

## Section 2: Overview

**Purpose:**  
The purpose of this project is to deliver an end-to-end e-commerce solution that can handle real-world usage scenarios, from secure user registration and login to product browsing, shopping cart management, and order processing. The system is designed with performance and security in mind, ensuring that both users and administrators have a reliable and responsive experience.

**Scope:**  
- **Included Features:**  
  - **User Authentication:** Secure sign-up and sign-in via AWS Cognito with MFA.
  - **Product Catalog:** Browsing and filtering of products stored in DynamoDB (or RDS).
  - **Shopping Cart & Checkout:** Adding, updating, and processing orders.
  - **Order Processing & Notifications:** Using AWS Lambda, SQS, and SNS/SES.
  - **Monitoring & Alerts:** Through AWS CloudWatch for system metrics and performance tracking.
- **Excluded Features:**  
  - Third-party payment gateway integrations (e.g., Stripe, PayPal).

**Requirements:**  
- **Functional:**  
  - User registration and secure authentication.
  - Dynamic product listing with search and filtering.
  - Shopping cart management and secure checkout.
  - Real-time order processing and notification system.
- **Non-Functional:**  
  - Scalability to handle traffic spikes.
  - High availability and robust performance.
  - Secure data handling and encrypted communications.
- **Technical:**  
  - AWS services: Cognito, API Gateway, Lambda, DynamoDB/RDS, S3, SQS, SNS/SES, CloudWatch.
  - Backend: Node.js with Express.
  - Frontend: React.js or Vue.js.
- **Security:**  
  - Utilization of AWS-managed security features.
  - JWT-based authentication for API security.
  - Encryption for sensitive data in transit and at rest.

---

## Section 3: System Architecture

**High-Level Components:**
- **User Authentication:**  
  AWS Cognito handles user registration, sign-in, and multi-factor authentication.
  
- **API Management:**  
  AWS API Gateway exposes RESTful endpoints to the frontend and secures access using JWT tokens validated against Cognito.
  
- **Business Logic:**  
  AWS Lambda functions, written in Node.js, implement backend operations such as order processing and product management.
  
- **Data Storage:**  
  Product, user, and order data is stored in Amazon DynamoDB (or optionally Amazon RDS for relational data requirements). Product images and other static assets are hosted on AWS S3.
  
- **Asynchronous Processing:**  
  AWS SQS manages the order queue, and SNS/SES is used to send notifications like order confirmations.
  
- **Monitoring & Logging:**  
  AWS CloudWatch collects logs and metrics from all services, ensuring the system’s health and triggering alarms if performance thresholds are breached.

**Interaction Flow:**
1. The user accesses the frontend and initiates authentication via Cognito.
2. Once authenticated, the user can browse products and add them to the cart.
3. API Gateway forwards requests to Lambda functions that handle business logic.
4. Data is stored and retrieved from DynamoDB/RDS and S3.
5. Orders are queued in SQS and processed asynchronously with notifications sent via SNS/SES.
6. CloudWatch continuously monitors the application performance.

---

## Section 4: Data Dictionary

| **Table Name** | **Field Name**  | **Type**     | **Description**                                  |
|----------------|-----------------|--------------|--------------------------------------------------|
| **Users**      | UserID          | String (PK)  | Unique identifier for each user                  |
|                | Username        | Varchar      | User’s chosen name for login                     |
|                | Email           | Varchar      | User’s email address                             |
|                | PasswordHash    | Varchar      | Securely stored hashed password                  |
| **Products**   | ProductID       | String (PK)  | Unique identifier for each product               |
|                | Name            | Varchar      | Name of the product                              |
|                | Description     | Text         | Detailed description of the product              |
|                | Price           | Decimal      | Price of the product                             |
| **Orders**     | OrderID         | String (PK)  | Unique order identifier                          |
|                | UserID          | String (FK)  | Identifier of the user placing the order         |
|                | OrderDate       | DateTime     | Timestamp of when the order was placed           |
|                | TotalAmount     | Decimal      | Total monetary value of the order                |
| **Cart**       | CartID          | String (PK)  | Unique identifier for the shopping cart          |
|                | UserID          | String (FK)  | Identifier of the user owning the cart           |
|                | Items           | JSON         | List of products with quantities in the cart     |

---

## Section 5: Data Design

**Logical Data Model:**
- **Users:**  
  - **Attributes:** UserID (PK), Username, Email, PasswordHash  
  - **Relationships:** One-to-Many with Orders; One-to-One with Cart
- **Products:**  
  - **Attributes:** ProductID (PK), Name, Description, Price  
  - **Relationships:** Products can be associated with multiple orders
- **Orders:**  
  - **Attributes:** OrderID (PK), UserID (FK), OrderDate, TotalAmount  
  - **Relationships:** Each order is linked to one user
- **Cart:**  
  - **Attributes:** CartID (PK), UserID (FK), Items (list of product IDs and quantities)  
  - **Relationships:** Each user has one active shopping cart

An Entity Relationship Diagram (ERD) would visually represent these entities and their relationships, illustrating the flow of data within the system.

---

## Section 6: User Interface Design

**User Interface Design Overview:**
The application’s frontend is designed to provide a seamless and intuitive user experience. It is developed using React.js (or Vue.js), with the following key interfaces:

- **Home Page:**  
  Displays featured products, navigation menus, and promotional banners.
  
- **Product Catalog:**  
  A grid or list view showcasing products with options for filtering and sorting by category, price, or rating.
  
- **Product Details Page:**  
  Provides detailed information about a product, including images, description, pricing, and reviews.
  
- **User Authentication Pages:**  
  Includes Sign-Up, Sign-In, and Password Recovery pages, integrated with AWS Cognito.
  
- **Shopping Cart:**  
  Allows users to view and modify the items they have added, displaying quantities and total pricing.
  
- **Checkout Page:**  
  A secure form for users to review their cart, enter shipping details, and place an order.
  
- **User Profile:**  
  Enables users to manage their account information, view past orders, and update settings.

**User Interface Navigation Flow:**
1. **Entry:** The user lands on the Home Page.
2. **Product Browsing:** The user navigates to the Product Catalog and selects a product to view its details.
3. **Authentication:** If not logged in, the user is prompted to sign in or register via Cognito-powered pages.
4. **Shopping Experience:** The user adds desired products to the cart and proceeds to the Checkout Page.
5. **Order Confirmation:** After order placement, the user is redirected to an order confirmation page and can view order details in the User Profile section.

---

*Note:* This README provides a high-level design outline based on the project proposal. It is intended to serve as a living document that can be updated as the project evolves.

