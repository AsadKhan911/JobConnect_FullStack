# MERN JobConnect

A full-stack, real-time job posting web application built on the MERN stack (MongoDB, Express, React, Node.js). This platform connects **students** and **recruiters**, providing an efficient way for job seekers to apply for jobs and for recruiters to manage applications dynamically.

---

## 🚀 Features

### Recruiter Features:
- **Register Companies:** A recruiter can register one or multiple companies.

- **Post Jobs:** Create job postings under any registered company.
  
- **Manage Applications:**  
  - View a list of applicants for each job, along with their relevant details and resumes.  
  - Accept or reject applications in real time, dynamically updating the student's application status.
    
- **Edit Details:** Update company information or job descriptions.

### Student Features:
- **Browse Jobs:** Explore all jobs posted by recruiters.
  
- **Search and Filter:** Find jobs based on:
  
  - Salary
  - Location
  - Role
  - Custom keyword search
    
- **Apply for Jobs:** Submit applications for jobs and track their status in real time.
  
- **Application Tracking:** View the total number of jobs applied for and their statuses (e.g., Accepted, Rejected, Pending).

### Real-Time Updates:
- Job postings, applications, and status updates happen dynamically without refreshing the page.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind, Redux Toolkit, ShadCN UI, Framer Motion  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **File Uploads:** Multer + Cloudinary  
- **State Management:** Redux Toolkit  

---

## 📂 Folder Structure
. ├── backend │ ├── controllers │ ├── models │ ├── middleware │ ├── routes │ ├── server.js │ └── config ├── frontend │ ├── src │ │ ├── components │ │ ├── pages │ │ ├── hooks │ │ ├── store │ │ └── App.jsx └── README.md



---

## 📸 Screenshots

### Login/Signup Screenshots

<img src="./screenshots/login.png" width="400" /> <img src="./screenshots/signup.png" heigh="200" width="400" /> 

### Student Section Screenshots

<img src="./screenshots/studentHome.png" width="300" /> <img src="./screenshots/studentHome1.png" width="300" /> <img src="./screenshots/filterJobs.png" width="300" /> <img src="./screenshots/filterJobs1.png" width="300" /> <img src="./screenshots/jobDetails.png" width="300" /> <img src="./screenshots/appliedJobs.png" width="300" />

### Recruiter Section Screenshots

<img src="./screenshots/companySetup.png" width="300" /> <img src="./screenshots/registeredCompanies.png" width="300px" /> <img src="./screenshots/postedJobs.png" width="300" /> 
<img src="./screenshots/postJob.png" width="300" /> <img src="./screenshots/editJob.png" width="300px" /> <img src="./screenshots/applicants.png" width="300" /> 



---

## 🚀 Deployment

This full-stack **MERN JobConnect** project has been deployed on **Render**, a cloud platform that supports web applications, databases, and file storage. You can access the live version of the application here:

<a href="https://jobconnect-fullstack.onrender.com/" target="_blank">🔗 Live Demo on Render</a>

---


## ⏱️ Development Timeline (Key Highlights)

1. **Backend Setup**
   - Connected MongoDB, created models, and implemented controllers for users, companies, jobs, and applications.  
   - API routes and middleware for security and validation.  

2. **Frontend Development**
   - React and Vite setup with Redux Toolkit for state management.  
   - Built dynamic pages like Home, Login/Signup, Jobs, User Profile, and Admin Dashboard.  

3. **File Uploads and Cloudinary Integration**
   - Set up **Multer** for handling file uploads on the backend.  
   - Integrated **Cloudinary** for secure and efficient file storage for resumes and images.  

---

## 🔒 Security

To ensure data security, the following measures have been implemented:

- **Encrypted Passwords:** All user passwords are securely hashed using `bcrypt.js`, ensuring that passwords are not stored in plain text.
- **Authentication:** Users are authenticated using **JSON Web Tokens (JWT)**. After successful login, a JWT is issued to maintain secure sessions. This token is sent in the Authorization header of each request to protected routes.

---

## 📈 State Management with Redux Persist

To ensure a smooth user experience, **Redux Persist** is used to persist state across browser sessions. This ensures that:
- **User Authentication:** The authentication state (e.g., whether a user is logged in) is saved even after the browser is closed or refreshed.
- **Job Applications:** User applications for jobs and job filters persist across page reloads, allowing users to pick up where they left off without losing any data.

---

## 🧑‍💻 Getting Started

### Prerequisites:
- Node.js installed
- MongoDB set up locally or using a cloud service (e.g., MongoDB Atlas)
- A Cloudinary account for file storage

 **Clone the Repository** 
 
   ```bash
   git clone https://github.com/AsadKhan911/JobConnect_FullStack.git

