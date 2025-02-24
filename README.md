# Sistema de Controle de Reembolsos

This project is a refund control system developed in Vue 3 with TypeScript, using Pinia for state management and Axios for communicating with the API. The system allows employees and managers to manage reimbursement payments, including creating, listing, editing and deleting expenses. Additionally, there are features for project management, tags and subordinate association.

## Índice

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Running the Project](#running-the-project)
- [Running Tests](#running-tests)
- [CI/CD with GitHub Actions](#cicd-with-github-actions)
- [Contribution](#contribution)
- [License](#license)

## Features

- **Expense Management:** Create, edit, view, and delete expense requests.
- **Project Management:** Manage projects with associated tags and subordinate assignments.
- **File Uploads:** Attach receipts and fiscal coupons (JPEG or PDF) to expense requests.
- **Modal Views:** Detailed views for expense requests with the ability to edit.
- **Pagination:** Handle large lists of projects or expenses with a pagination component.
- **State Management:** Centralized state management with Pinia.
- **Automated Testing:** Unit tests using Vitest and Vue Test Utils.

## Technologies Used

- **Vue 3:** Front-end framework.
- **TypeScript:** Strongly typed superset of JavaScript.
- **Pinia:** State management.
- **Axios:** HTTP client.
- **Vitest:** Testing framework.
- **Vue Test Utils:** Testing utilities for Vue.
- **GitHub Actions:** CI/CD pipeline.

## Setup and Installation

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/alyssonjs/reimbursement_system.git
cd reimbursement-system

docker-compose up --build

docker exec -it reimbursement_api rake db:create db:migrate db:seed
```
One should be able to access the project on the browser using the route http://localhost:5173/

## Project Routes

This project uses Vue Router. Below are the available routes:

- **Home** (`/`):  
  Displays the HomeView. Requires authentication.

- **Login** (`/login`):  
  Displays the LoginView. No authentication required.

- **Employee Expenses** (`/employee/expenses`):  
  Displays the EmployeeExpensesView. Requires authentication and the user must have the "employee" role.

- **Manager Dashboard** (`/manager/dashboard`):  
  Displays the ManagerDashboardView. Requires authentication and the user must have the "manager" role.

- **Manager Projects** (`/manager/projects`):  
  Displays the ManagerProjectsView. Requires authentication and the user must have the "manager" role.

- **Catch-all Route** (`/:catchAll(.*)*`):  
  Redirects any unknown paths to `/login`.

### Navigation Guards

- Routes with `requiresAuth: true` require the user to be authenticated.
- If a user is already authenticated and navigates to the Login page, they are redirected based on their role:
  - Managers are redirected to the Manager Dashboard.
  - Employees are redirected to the Employee Expenses page.
- If a user tries to access a route that does not match their role, they are redirected to their appropriate dashboard.


The project includes sample accounts for testing purposes:

Manager:
email: "manager1@example.com"
password: "password"

Employee:
email: "employee1@example.com"
password: "password"