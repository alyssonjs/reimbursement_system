# Sistema de Controle de Reembolsos

Este projeto é um sistema de controle de reembolsos desenvolvido em Vue 3 com TypeScript, utilizando Pinia para gerenciamento de estado e Axios para comunicação com a API. O sistema permite que funcionários e gerentes gerenciem solicitações de reembolso, incluindo a criação, listagem, edição e exclusão de despesas. Além disso, há funcionalidades para gerenciamento de projetos, tags e associação de subordinados.

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

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Yarn](https://classic.yarnpkg.com/lang/en/) or npm

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/sistema-reembolsos.git
cd sistema-reembolsos
npm install
# or
yarn install

Create a .env file based on the provided .env.example (if available) and set the required environment variables. For example:

VITE_API_URL=http://localhost:3000/api

Running the Project
npm run dev
# or
yarn dev