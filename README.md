# Expense Tracker App

## Description - A robust and scalable REST API for tracking personal expenses, built with Node.js, Express, and MongoDB.

## How to start the project -

1. git clone <https://github.com/Isha2109/expenseTracker.git>

2. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/expense-tracker?directConnection=true&serverSelectionTimeoutMS=5000
JWT_SECRET=secretKey
NODE_ENV=development
```

3. docker-compose up -d

## API available at - http://localhost:3000

4. Start MongoDB:
Make sure MongoDB is running on your system.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user
- `POST /api/auth/login` - Login and get token

### Expenses
- `POST /api/expenses` - Create a new expense
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/:id` - Get expense by ID
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/report/summary` - Get expense reports

## Curls

### Sign Up
```bash
curl --location --request POST 'http://localhost:3000/api/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Isha lalchandani",
    "email": "isha.lalchandani@gmail.com",
    "password": "password@123"
  }'
```

### Login
```bash
curl --location --request POST 'http://localhost:3000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "isha.lalchandani@gmail.com",
    "password": "password@123"
  }'
```

### Create Expense
```bash
curl --location --request POST 'http://localhost:3000/api/expenses' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODNmNjNjMTk4ZjI1N2Q5OWZiZTg4YzQiLCJpYXQiOjE3NDg5ODQ3ODgsImV4cCI6MTc0OTU4OTU4OH0.x1GsVre8wIJKj8IjkSBVfmpiipqo2xH7_iY8cRW1sbM' \
--data-raw '{
    "amount": 50.25,
    "category": "food",
    "description": "Lunch at restaurant",
    "date": "2025-06-03T12:00:00Z"
  }'
```

### Get All Expenses
```bash
curl --location --request GET 'http://localhost:3000/api/expenses?page=1&limit=10' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODNmNWQ4YTI3MDI3OWQxZjYzNDZiZTAiLCJpYXQiOjE3NDg5ODM1MjQsImV4cCI6MTc0OTU4ODMyNH0.-VFFvJgMmtYISvaBVAn-GN7WnW30aa8SG7u_CLPHArM'
```

### Get Expense By ID
```bash
curl --location --request GET 'http://localhost:3000/api/expenses/683f5f22270279d1f6346be5' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODNmNWQ4YTI3MDI3OWQxZjYzNDZiZTAiLCJpYXQiOjE3NDg5ODM1MjQsImV4cCI6MTc0OTU4ODMyNH0.-VFFvJgMmtYISvaBVAn-GN7WnW30aa8SG7u_CLPHArM'
```

### UpdateExpense
```bash
curl --location --request PUT 'http://localhost:3000/api/expenses/683f5f22270279d1f6346be5' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODNmNWQ4YTI3MDI3OWQxZjYzNDZiZTAiLCJpYXQiOjE3NDg5ODM1MjQsImV4cCI6MTc0OTU4ODMyNH0.-VFFvJgMmtYISvaBVAn-GN7WnW30aa8SG7u_CLPHArM' \
--data-raw '{
    "amount": 75.50,
    "category": "food",
    "description": "Updated lunch description",
    "date": "2024-02-15T12:00:00Z"
  }'
```

### Delete Expense
```bash
curl --location --request DELETE 'http://localhost:3000/api/expenses/683f5f22270279d1f6346be5' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODNmNWQ4YTI3MDI3OWQxZjYzNDZiZTAiLCJpYXQiOjE3NDg5ODM1MjQsImV4cCI6MTc0OTU4ODMyNH0.-VFFvJgMmtYISvaBVAn-GN7WnW30aa8SG7u_CLPHArM'
```

### Get Expense report
```bash
curl --location --request GET 'http://localhost:3000/api/expenses/report/summary' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODNmNWQ4YTI3MDI3OWQxZjYzNDZiZTAiLCJpYXQiOjE3NDg5ODM1MjQsImV4cCI6MTc0OTU4ODMyNH0.-VFFvJgMmtYISvaBVAn-GN7WnW30aa8SG7u_CLPHArM'
```

### Get Expense Report by date range
```bash
curl --location --request GET 'http://localhost:3000/api/expenses/report/summary?startDate=2025-06-01&endDate=2025-06-30' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODNmNWQ4YTI3MDI3OWQxZjYzNDZiZTAiLCJpYXQiOjE3NDg5ODM1MjQsImV4cCI6MTc0OTU4ODMyNH0.-VFFvJgMmtYISvaBVAn-GN7WnW30aa8SG7u_CLPHArM'
```

### Get Expense Report by date range and category
```bash
curl --location --request GET 'http://localhost:3000/api/expenses/report/summary?startDate=2025-06-01&endDate=2025-06-30&category=food' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODNmNWQ4YTI3MDI3OWQxZjYzNDZiZTAiLCJpYXQiOjE3NDg5ODM1MjQsImV4cCI6MTc0OTU4ODMyNH0.-VFFvJgMmtYISvaBVAn-GN7WnW30aa8SG7u_CLPHArM'
```
