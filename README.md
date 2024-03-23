# EMPOWR - Employee Management System

Confident Management, Stronger Workforce

## About
EMPOWR has been developed as part of the Technical Assessment for Sprout Solutions. It is a straightforward yet powerful system that incorporates CRUD (Create, Read, Update, Delete) functionality along with a secure login feature. Designed to simplify employee management tasks.

## Project Setup

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/mcfltimpug/Sprout-Exam.git

### Frontend

2. Navigate to the frontend directory:

    ```bash
    cd Sprout-Exam

3. Install Dependencies
   ```bash
    npm install

4. Run Frontend
   ```bash
    npm run dev

### Backend

5. Navigate to backend directory (Sprout-Exam/backend):
   ```bash
    cd backend

6. Install Dependencies
   ```bash
    pip install -r requirements.txt

7. Run Backend
   ```bash
    uvicorn employees:app --reload

### Usage
Go to http://localhost:5173/ to use the system. Login with the following credentials:

    username: admin
    password: password

## Question from Tech Exam

If we are going to deploy this on production, what do you think is the next
improvement that you will prioritize next? This can be a feature, a tech debt, or
an architectural design.

If we're planning to deploy this on production, the next improvement I would prioritize is enhancing the employee management process. One key feature to consider is implementing a dashboard with visual representation graphs such as bar charts or pie charts. Incorporating charts can contribute to data analysis, decision-making processes, increased accessibility, performance monitoring, and better understanding of information. Another improvement lies in enhancing the user interface and user experience. For instance, reducing the use of modals, employing consistent design elements, and implementing better responsive design. Lastly, implementing security measures can be beneficial for the system. It can be done by improving a more stricter form or input validation, using data encryption especially for login credentials, conducting testing, and having more secure coding practices. In summary, the next improvement for EMPOWR will be about implementing better features like charts, improving user experience, and making sure that it can address the common security threats by implementing effective measures.

