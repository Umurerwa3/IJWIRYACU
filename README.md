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
