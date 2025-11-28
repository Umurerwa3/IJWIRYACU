# IJWIRYACU Project

Ijwiryacu is a simple and practical reporting platform designed to help users easily submit concerns, issues, or incidents, while giving administrators a central place to view and manage those reports. The project focuses on creating a one-way communication flow where users can report, and admins can review those reports in an organized and accessible dashboard.
The platform aims to provide a reliable, lightweight solution for situations where quick reporting and efficient monitoring are required whether for community issues, safety concerns, or general feedback.

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

Before you begin, ensure you have the following installed on your machine:

1. **Node.js**: Download and install [Node.js](https://nodejs.org/) (v16 or higher).
2. **npm**: Comes bundled with Node.js. Alternatively, you can use [yarn](https://yarnpkg.com/).
3. **Git**: Download and install [Git](https://git-scm.com/).
4. **Supabase Account**: Create a free account at [Supabase](https://supabase.com/) and set up a new project.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ijwiryacu.git
   cd ijwiryacu

Install dependencies:

Setting Up Environment Variables
The project uses a .env file to manage sensitive configuration details. Follow these steps to set it up:

1. Create a .env file in the root directory of the project:

  # touch .env

2. Open the .env file in your preferred text editor and add the following variables:


A# Get these values from your Supabase project settings
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co  # Replace with your Supabase URL
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key            # Replace with your Supabase anon key

# Admin Settings
VITE_ADMIN_EMAIL=your-admin-email@example.com            # Replace with your admin email

3. Replace the placeholder values with your actual Supabase project details:

VITE_SUPABASE_URL: Found in your Supabase project settings under "API".
VITE_SUPABASE_ANON_KEY: Found in your Supabase project settings under "API Keys".
VITE_ADMIN_EMAIL: Your admin email address for managing the application.

# Installing Dependencies

1. Install the required dependencies by running:
   # npm install

This will install all the packages listed in the package.json file.

# Running the Development Server
Start the development server by running:
  # npm run dev

2. Open your browser and navigate to http://localhost:3000 to view the application.

# Project Structure
The project follows a standard structure for modern web applications:

ijwiryacu/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Application pages
│   ├── services/         # API and Supabase service integrations
│   ├── styles/           # Global and component-specific styles
│   └── main.js           # Entry point for the application
├── public/               # Static assets
├── .env                  # Environment variables
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation