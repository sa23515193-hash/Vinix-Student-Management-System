# Vinix Student Management System

A polished, responsive full-stack student administration dashboard built for the Vinix Full Stack Development internship task.

## Features
- Student directory with live search and status filtering
- Create, edit and delete student records (CRUD)
- GPA, enrollment status and academic-year tracking
- Live KPI cards and enrollment snapshot
- CSV export for the student directory
- Responsive desktop, tablet and mobile layouts
- Express REST API with JSON-file persistence; records remain saved after restart
- Validation for required fields and duplicate email addresses

## Tech stack
HTML5 · CSS3 · Vanilla JavaScript · Node.js · Express REST API · JSON persistence

## Run locally
1. Install [Node.js](https://nodejs.org/) (LTS).
2. Extract this ZIP and open the extracted folder in a terminal.
3. Run `npm install`
4. Run `npm start`
5. Open **http://localhost:3000**

The API is available at `/api/students` and `/api/health`. The first run seeds the data store with sample records. Replace sample records with your own test data before presenting the project.

## API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/students` | List students; supports `q` and `status` query parameters |
| POST | `/api/students` | Create a student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |
| GET | `/api/health` | API health check |

## Project structure
```
Vinix_Student_Management_System/
├── server.js
├── package.json
├── data/students.json
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── README.md
```

**Note:** This project uses a local JSON data store so it can run without configuring a separate database server. For production deployment, use a database such as PostgreSQL or MongoDB and add authentication/authorization.
