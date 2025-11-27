# IJWIRYACU Project

IJWIRYACU is a web application designed to provide seamless integration with Supabase for backend services. This project leverages modern web development tools and frameworks to deliver a robust and scalable solution.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

IJWIRYACU is built to simplify the management of data and user authentication using Supabase as the backend. It provides a clean and intuitive interface for users and administrators to interact with the system.

---

## Features

- **Supabase Integration**: Utilizes Supabase for database management and authentication.
- **Admin Dashboard**: Includes an admin email configuration for managing the application.
- **Environment Configuration**: Securely manages sensitive keys and URLs using `.env` files.
- **Scalable Architecture**: Designed to handle growth and additional features.

---

## Technologies Used

- **Frontend**: Vite.js
- **Backend**: Supabase
- **Environment Management**: `.env` files
- **Programming Language**: JavaScript/TypeScript

---

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Supabase account and project

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ijwiryacu.git
   cd ijwiryacu

Install dependencies:

install
Environment Variables
Create a .env file in the root directory.

Add the following environment variables:

# Supabase Configuration
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Admin Settings
VITE_ADMIN_EMAIL=your-admin-email@example.com


Usage
Start the development server:

Open your browser and navigate to http://localhost:3000.
