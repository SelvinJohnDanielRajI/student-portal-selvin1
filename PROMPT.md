# AI Project Prompt for Student Service Portal

The following prompt was designed to generate the Student Service Portal as a full-stack application.

---

### Project Prompt:

"Build a full-stack Student Service Portal as a junior developer.

**Requirements:**
1.  **Tech Stack:**
    *   Frontend: HTML, CSS, JavaScript (Vanilla).
    *   Backend: Node.js with Express.
    *   Database: A local `database.json` file for persistent storage.

2.  **Required Pages (6):**
    *   **Home:** Welcome message and navigation.
    *   **About:** Information about the student portal.
    *   **Services:** List of available student services.
    *   **Contact Form:** A form with fields for 'Name', 'Email', and 'Message' that sends data via a POST request to the backend.
    *   **Admin:** A dashboard that fetches and displays all submitted contact form entries from the backend via a GET request.
    *   **Login:** A simple authentication page that restricts access to the Admin page.

3.  **Core Functionality:**
    *   The backend must handle a `POST` request from the contact form and save the data to `database.json`.
    *   The backend must handle a `GET` request for the Admin page to retrieve all stored submissions.
    *   Data must be persistent (remain after server restart).
    *   The UI must be clean, professional, and mobile-responsive.

4.  **Development Workflow:**
    *   Ensure the code follows a clear project structure (`public/`, `server.js`, `database.json`).
    *   Implement Git version control with `development`, `staging`, and `production` branches."

---
