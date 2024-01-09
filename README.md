# POC-Assessment
# Web Application Setup Guide

Welcome to our web application! This guide will walk you through the steps to get both the backend and frontend up and running on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:
- Node.js and npm (Node Package Manager)
- Python (with pip for package installation)
- MySQL Server

## Setup Instructions

### 1. Clone the Repository

First, clone the repository to your local machine using your preferred method (SSH or HTTPS).

### 2. Install Dependencies

#### Backend Setup

1. Navigate to the `backend` folder:
   ```sh
   cd backend
2. Install the required Node.js packages:
   ```sh
   npm install
#### Frontend Setup
1. Navigate to the poc-assessment folder:
    ```sh
    cd ../poc-assessment
2. Install the required Node.js packages:
    ```sh
    npm install
### 3. Database Setup
1. Ensure your MySQL server is running.
2. Navigate to the backend folder:
    ```sh
    cd ../backend
3. Locate the db.sql file and run its contents on your MySQL server to create the necessary database and tables.
### 4. Setup Mock Data for the Database
1. Navigate to the setup folder:
    ```sh
    cd ../setup
2. Install the necessary Python packages:
- For Windows/Linux:
    ```sh
    pip install mysql-connector-python mysql
- For macOS:
    ```sh
    pip3 install mysql-connector-python mysql
### 5. Running the Application
#### Starting the Backend
1. Open a console/terminal window.
2. Navigate to the backend folder and start the server:
    ```sh
    cd backend
    npm start
#### Starting the Frontend
1. Open another console/terminal window.
2. Navigate to the poc-assessment folder and start the frontend:
    ```sh
    cd poc-assessment
    npm start
Your application should now be running, with the backend on localhost and the frontend accessible through your browser.

## Troubleshooting
If you encounter any issues during setup, please ensure that:

- All prerequisites are correctly installed.
- You have the necessary permissions to run MySQL commands and start servers on your local machine.
- Ports required by the backend and frontend are not being used by other processes.
